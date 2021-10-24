const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioController } = require('../util/audio-controller');

const FILE_PATH = '/media/HDDEXTRA/Downloads/DainosourBot/resources/francaipira2.mp3';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('frango')
        .setDescription('É bão'),
    async execute(interaction) {
        const audioController = AudioController.getInstance(interaction.member.voice.channel);
        audioController.playTrack(FILE_PATH)
        await interaction.reply({content: 'Uuuugh', ephemeral: true });
    },
};