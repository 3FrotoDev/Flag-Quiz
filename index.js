const Discord = require("discord.js")
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const config = require("./config.json")
const mongoose = require('mongoose');
const chalk = require('chalk')
const fs = require("fs")
const client = new Discord.Client({  
    intents: [
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildModeration,
    ]
})
client.on('ready', async (client) => {
	mongoose.set('strictQuery', false);
	mongoose.connect("mongodb+srv://lool:lol@cluster0.ofbs0.mongodb.net/food_data?retryWrites=true&");
	mongoose.connection.on("connected", () => console.log(chalk.green(`> Database connection has been connected`)));
	mongoose.connection.on("disconnected", () => console.log(chalk.red(`> Database connection has been disconnected`)));
	mongoose.connection.on("error", (error) => console.log(chalk.red(` > Database has encountered an error: ${error.message}`)));
    console.log(`logged in as ${client.user.username}`)
})
client.slashCommands = new Discord.Collection();
const eventFiles = fs
.readdirSync("./events")
.filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
const event = require(`./events/${file}`);
if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
} else {
    client.on(event.name, async (...args) => await event.execute(...args, client));
}
}
const slashCommands = fs.readdirSync("./SlashCommands");
for (const module of slashCommands) {
	const commandFiles = fs
		.readdirSync(`./SlashCommands`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./SlashCommands/${commandFile}`);
		client.slashCommands.set(command.data.name, command);
	}
}
const rest = new REST({ version: "10" }).setToken(config.token);
const commandJsonData = [
	...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
];
(async () => {
	try {
		console.log(chalk.green("Started refreshing application (/) commands."));
		await rest.put(Routes.applicationGuildCommands(config.clientId, config.serverId), { body: commandJsonData });
		/// if u wanna make bot puplic you need to replace line to await rest.put(Routes.applicationCommands(config.clientId),{body:commandJsonData},);
		console.log(chalk.green("Successfully reloaded application (/) commands."));
	} catch (error) {
		console.error(error);
	}
})();
client.login(config.token)