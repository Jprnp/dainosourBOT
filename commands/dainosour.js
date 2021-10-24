const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioController } = require('../util/audio-controller');

const FILE_PATH = '/media/HDDEXTRA/Downloads/DainosourBot/resources/dainosourTudo.mp3';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dino')
        .setDescription('Ah Pedro, tá de sacanagem!'),
    async execute(interaction) {
        const audioController = AudioController.getInstance(interaction.member.voice.channel);
        audioController.playTrack(FILE_PATH)
        await interaction.reply({ content: 'Tá de sacanagem', ephemeral: true });
    },
};