const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('points')
		.setDescription('To know ur points!'),
	async execute(interaction) {
        const Points = require('../model/points');
        let db = await Points.find({ user: interaction.user.id });
        let db1 = await Points.findOne({ user: interaction.user.id, guild: interaction.guild.id });
        const totalPoints = db.reduce((acc, data) => {
          return acc + data.point;
        }, 0);
        interaction.reply({ content: `on this guild ${db1.point || 0}, on all guild ${totalPoints || 0} we hope you can earn more`, ephemeral: true})
	},
};