const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioController } = require('../util/audio-controller');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vaza')
        .setDescription('Kicka o bot do canal'),
    async execute(interaction) {
        if (!interaction.member.voice.channel) {
            interaction.reply({content: 'Você precisa estar em um canal de voz!', ephemeral: true }); 
            return;
        }
        const audioController = AudioController.getInstance(interaction.member.voice.channel);
        audioController.disconnect();
        await interaction.reply({content: 'Faloooooo', ephemeral: true });
    },
};