const { SlashCommandBuilder } = require('@discordjs/builders');
const { playTrackCommand } = require('../util/audio-command');

const FILE_PATH = '/media/HDDEXTRA/Downloads/DainosourBot/resources/francaipira2.mp3';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('frango')
        .setDescription('É bão'),
    async execute(interaction) {
        await playTrackCommand(interaction, FILE_PATH, 'Uuuugh');
    },
};