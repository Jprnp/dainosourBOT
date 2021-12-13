const { SlashCommandBuilder } = require('@discordjs/builders');
const { playTrackCommand } = require('../util/audio-command');

const FILE_PATH = 'https://cdn.discordapp.com/attachments/515920301171671051/903623153094389842/o-comedor-de-hamburguer_1.mp3';
const VOLUME = 0.2;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hamburguer')
        .setDescription('Gordão do PC'),
    async execute(interaction) {
        await playTrackCommand(interaction, FILE_PATH, 'É o comedor de hamburguer', VOLUME);
    },
    filePath: FILE_PATH,
    volume: VOLUME,
};