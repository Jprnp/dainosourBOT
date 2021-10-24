const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vaza')
        .setDescription('Kicka o bot do canal'),
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.member.voice.channel.guild.id);
        connection.destroy();
        await interaction.reply({content: 'Faloooooo', ephemeral: true });
    },
};