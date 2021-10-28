const got = require('got');
const { Readable } = require('stream');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, NoSubscriberBehavior, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice');

class AudioController {

    static controllerInstance = undefined;

    static getInstance(channel) {
        if (this.controllerInstance == undefined) {
            this.controllerInstance = new AudioController(channel)
        }

        return this.controllerInstance;
    }

    constructor(channel) {
        this.channel = channel
        this.player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play,
            },
        });
        this.player.on(AudioPlayerStatus.Idle, () => this.scheduleDisconnect());
    }

    scheduleDisconnect() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => this.disconnect(), 10000);//300000);
    }

    disconnect() {
        const connection = getVoiceConnection(this.channel.guild.id);
        connection.destroy();
        AudioController.controllerInstance = undefined
    }

    async playTrack(audioPath, retryNo) {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        if (retryNo == undefined) {
            retryNo = 0;
        }

        if (retryNo > 10) {
            return;
        }

        let connection = getVoiceConnection(this.channel.guild.id);
        if (!connection) {
            connection = joinVoiceChannel({
                channelId: this.channel.id,
                guildId: this.channel.guild.id,
                adapterCreator: this.channel.guild.voiceAdapterCreator,
            });
            connection.subscribe(this.player);
        }

        if(connection.state.status === VoiceConnectionStatus.Ready) {
            const resource = audioPath.includes('http') ? this.createAudioResourceFromUrl(audioPath) : createAudioResource(audioPath); 
            this.enqueuePlay(resource);
        } else {
            setTimeout(() => this.playTrack(audioPath, ++retryNo), 300);
        }        
    }

    enqueuePlay(resource) {
        if (this.player.state.status == AudioPlayerStatus.Playing) {
            setTimeout(() => this.enqueuePlay(resource), 1000);
        } else {
            this.player.play(resource);
        }
    }

    createAudioResourceFromUrl(url) {
        const stream = got.stream(url);
        return createAudioResource(stream);
    }

}   

module.exports = { AudioController };