const { AudioController } = require('../util/audio-controller');
const { filePath: dinoFilePath, volume: dinoVolume } = require('../commands/dainosour');
const { filePath: tzDaCoro, volume: tzVolume } = require('../commands/tz_da_coro');
const { filePath: yameteFilePath, volume: yameteVolume } = require('../commands/yamete');

module.exports = {
    async handleStateChange(oldState, newState) {
        channel = newState.guild.channels.cache.find(c => c.rawPosition == 0 && c.type == 'GUILD_TEXT');
        if (!oldState.channel && newState.channel) {
            const audioController = AudioController.getInstance(newState.channel);
            const nickname = newState.member.nickname || newState.member.user.username;
            switch (newState.member.user.id) {
                case '180302316145082368':                                                  // MINI
                    audioController.playTrack(dinoFilePath, dinoVolume);
                    channel.send(`${nickname} entrou e tá de sacanagem`)
                    break;
                case '243070073349210112':                                                  // HYAGO
                    audioController.playTrack(tzDaCoro, tzVolume);
                    channel.send(`${nickname} entrou com um peixe no bolso`)
                    break;
                case '277210762613751808':                                                  // PEDRO
                    audioController.playTrack(dinoFilePath, dinoVolume);
                    channel.send(`${nickname} entrou e tá de sacanagem`)
                    break;
                case '465601161098166272':                                                  // PP
                    audioController.playTrack(yameteFilePath, yameteVolume);
                    channel.send(`${nickname} saiu da chamada`)
                    break;
            }
        }

    }
}
