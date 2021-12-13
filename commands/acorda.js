const { SlashCommandBuilder } = require('@discordjs/builders');
const { playTrackCommand } = require('../util/audio-command');

const FILE_PATH = 'https://cdn.discordapp.com/attachments/691463109780439041/903716442288062514/gamidao.mp3';
const VOLUME = 0.05;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('acorda')
        .setDescription('Tá mt silencio'),
    async execute(interaction) {
        await playTrackCommand(interaction, FILE_PATH, 'Ahhnnnnn', VOLUME);
    },
    filePath: FILE_PATH,
    volume: VOLUME,
};