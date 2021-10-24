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

    playTrack(pathToFile, retryNo) {
        if (retryNo == undefined) {
            retryNo = 0;
        }

        if (retryNo > 10) {
            return;
        }

        let connection = getVoiceConnection(this.channel.guild.id);
        const resource = createAudioResource(pathToFile); 

        if (!connection) {
            connection = joinVoiceChannel({
                channelId: this.channel.id,
                guildId: this.channel.guild.id,
                adapterCreator: this.channel.guild.voiceAdapterCreator,
            });
            connection.subscribe(this.player);
        }

        if(connection.state.status === VoiceConnectionStatus.Ready) {
            this.enqueuePlay(resource);
        } else {
            setTimeout(() => this.playTrack(pathToFile, ++retryNo), 300);
        }        
    }

    enqueuePlay(resource) {
        if (this.player.state.status == AudioPlayerStatus.Playing) {
            setTimeout(() => this.enqueuePlay(resource), 1000);
        } else {
            this.player.play(resource);
        }
    }

}

module.exports = { AudioController };