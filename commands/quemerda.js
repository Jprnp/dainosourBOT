const { SlashCommandBuilder } = require('@discordjs/builders');
const { playTrackCommand } = require('../util/audio-command');

const FILE_PATH = 'https://www.myinstants.com/media/sounds/quemerdasabianao.mp3';
const VOLUME = 0.3;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kimerda')
        .setDescription('hein'),
    async execute(interaction) {
        await playTrackCommand(interaction, FILE_PATH, 'Sabia n!', VOLUME);
    },
    filePath: FILE_PATH,
    volume: VOLUME,
};