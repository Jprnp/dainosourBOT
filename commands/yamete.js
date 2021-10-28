const { SlashCommandBuilder } = require('@discordjs/builders');
const { playTrackCommand } = require('../util/audio-command');

const FILE_PATH = 'https://cdn.discordapp.com/attachments/882977572554670093/903355787190104085/xD.mp3';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yamete')
        .setDescription('Sei lá vei'),
    async execute(interaction) {
        await playTrackCommand(interaction, FILE_PATH, '(づ｡◕‿‿◕｡)づ');
    },
    filePath: FILE_PATH,
};