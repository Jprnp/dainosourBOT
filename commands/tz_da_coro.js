const { SlashCommandBuilder } = require('@discordjs/builders');
const { playTrackCommand } = require('../util/audio-command');
const path = require('path');
const appDir = path.dirname(require.main.filename);

const FILE_PATH = path.join(appDir, 'resources', 'anota-placa-do-freio-da-blazer.mp3');
const VOLUME = 0.2;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tz')
        .setDescription('da coro'),
    async execute(interaction) {
        await playTrackCommand(interaction, FILE_PATH, '', VOLUME);
    },
    filePath: FILE_PATH,
    volume: VOLUME,
};
