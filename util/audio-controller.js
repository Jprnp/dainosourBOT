const got = require('got');
const { Readable } = require('stream');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, NoSubscriberBehavior, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice');
const fs = require('fs');

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
        this.clearDisconnectTimeout();
        this.timeoutId = setTimeout(() => this.disconnect(), 10000);//300000);
    }

    disconnect() {
        this.clearDisconnectTimeout();
        const connection = getVoiceConnection(this.channel.guild.id);
        connection.destroy();
        AudioController.controllerInstance = undefined
    }

    clearDisconnectTimeout() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    async playTrack(audioPath, volume, retryNo) {
        this.clearDisconnectTimeout();
        
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
            const resource = audioPath.includes('http') ? this.createAudioResourceFromUrl(audioPath) : this.createAudioResourceFromFile(audioPath);
            resource.volume.setVolume(volume);
            this.enqueuePlay(resource);
        } else {
            setTimeout(() => this.playTrack(audioPath, volume, ++retryNo), 300);
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
        return createAudioResource(stream, { inlineVolume: true });
    }

    createAudioResourceFromFile(filePath) {
        const stream = fs.createReadStream(filePath);
        return createAudioResource(stream, { inlineVolume: true });
    }

}   

module.exports = { AudioController };