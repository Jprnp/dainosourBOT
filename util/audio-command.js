const { AudioController } = require('../util/audio-controller');

async function playTrackCommand(interaction, filePath, response, volume) {
    if (!interaction.member.voice.channel) {
        interaction.reply({content: 'Você precisa estar em um canal de voz!', ephemeral: true }); 
        return;
    }
    const audioController = AudioController.getInstance(interaction.member.voice.channel);
    audioController.playTrack(filePath, volume)
    await interaction.reply({ content: response || 'OK', ephemeral: true });
}

module.exports = {
    playTrackCommand,
}