
module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
        const { client } = interaction;
		if (!interaction.isChatInputCommand()) return;
		if(!interaction.guild) return interaction.reply({
			content: "You can't use my commands in dm!", ephemeral: true,
		});
        const command = client.slashCommands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction,client);
		} catch (err) {
			console.log(err);
			await interaction.reply({
				content: "There was an issue while executing that command!", ephemeral: true,
			});
		}
	},
};