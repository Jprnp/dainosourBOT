const { AudioController } = require('../util/audio-controller');

async function playTrackCommand(interaction, filePath, response) {
    if (!interaction.member.voice.channel) {
        interaction.reply({content: 'Você precisa estar em um canal de voz!', ephemeral: true }); 
        return;
    }
    const audioController = AudioController.getInstance(interaction.member.voice.channel);
    audioController.playTrack(filePath)
    await interaction.reply({ content: response, ephemeral: true });
}

module.exports = {
    playTrackCommand,
}