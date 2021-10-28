const { SlashCommandBuilder } = require('@discordjs/builders');
const { playTrackCommand } = require('../util/audio-command');

const FILE_PATH = '/media/HDDEXTRA/Downloads/DainosourBot/resources/dainosourTudo.mp3';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dino')
        .setDescription('Ah Pedro, tá de sacanagem!'),
    async execute(interaction) {
        await playTrackCommand(interaction, FILE_PATH, 'Tá de sacanagem');
    },
    filePath: FILE_PATH,
};