const { SlashCommandBuilder } = require('@discordjs/builders');
const { playTrackCommand } = require('../util/audio-command');

const FILE_PATH = '/media/HDDEXTRA/Downloads/DainosourBot/resources/anota-placa-do-freio-da-blazer.mp3';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tz')
        .setDescription('da coro'),
    async execute(interaction) {
        await playTrackCommand(interaction, FILE_PATH, '');
    },
    filePath: FILE_PATH,
};
