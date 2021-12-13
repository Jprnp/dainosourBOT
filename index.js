const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
require('dotenv').config();
const { generateDependencyReport } = require('@discordjs/voice');
const { handleStateChange } = require('./handlers/voice-state-update-handler')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    await handleStateChange(oldState, newState);
})

console.log(generateDependencyReport());

client.login(process.env.BOT_TOKEN);