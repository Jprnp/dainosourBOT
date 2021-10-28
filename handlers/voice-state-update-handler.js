const { AudioController } = require('../util/audio-controller');
const { filePath: dinoFilePath } = require('../commands/dainosour');
const { filePath: frangoFilePath } = require('../commands/francaipira');
const { filePath: yameteFilePath } = require('../commands/yamete');

module.exports = {
    async handleStateChange(oldState, newState) {
        channel = newState.guild.channels.cache.find(c => c.rawPosition == 0 && c.type == 'GUILD_TEXT');
        if (!oldState.channel && newState.channel) {
            const audioController = AudioController.getInstance(newState.channel);
            const nickname = newState.member.nickname || newState.member.user.username;
            switch(newState.member.user.id) {
                case '180302316145082368':
                    audioController.playTrack(dinoFilePath);
                    channel.send(`${nickname} entrou e tá de sacanagem`)
                    break;
                case '243070073349210112':
                    audioController.playTrack(frangoFilePath);
                    channel.send(`${nickname} entrou comendo um francaipira`)
                    break;
                case '277210762613751808':
                    audioController.playTrack(dinoFilePath);
                    channel.send(`${nickname} entrou e tá de sacanagem`)
                    break;
                case '465601161098166272':
                    audioController.playTrack(yameteFilePath);
                    channel.send(`${nickname} saiu da chamada`)
                    break;
            }
        }
        
    }
}