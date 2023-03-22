const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js')
const Discord = require("discord.js")
var randomCountry = require('random-country');
const Countries = require('countries-api');
const tempData = [];
module.exports = {
	data: new SlashCommandBuilder()
		.setName('flage_quize')
		.setDescription('Play a good game!'),
	async execute(interaction) {
        try { 
            const data = require("../model/points");
            const countryAlpha2 = randomCountry();
            const flagUrl = `https://flagpedia.net/data/flags/w580/${countryAlpha2.toLowerCase()}.webp`;
            const flag = new Discord.AttachmentBuilder(flagUrl, { name: "flag.png"})
           const name = Countries.findByCountryCode(`${countryAlpha2}`).data.map(n => n.name.common)
           if(!name) return interaction.reply({ content: `Filed try again`, ephemeral: true})
            if (tempData.includes(interaction.guildId)) return interaction.reply({ content: `There is a game already`, ephemeral: true})
            const embed = new EmbedBuilder()
            .setTitle("Guess this flag and win one point")
            .setColor("Aqua")
            .setImage("attachment://flag.png")
            .setAuthor({ name: `${interaction.guild.name}`, iconURL: interaction.guild.icon? interaction.guild.iconURL() : null})
            const choice0 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("yes")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${name}`),
                new Discord.ButtonBuilder()
                .setCustomId("no1")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0] || Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0]}`),
                new Discord.ButtonBuilder()
                .setCustomId("no2")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0] || Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0]}`),
                new Discord.ButtonBuilder()
                .setCustomId("no3")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0] || Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0]}`),
            )
            const choice1 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("no1")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0] || Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0]}`),
                new Discord.ButtonBuilder()
                .setCustomId("yes")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${name}`),
                new Discord.ButtonBuilder()
                .setCustomId("no2")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0] || Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0]}`),
                new Discord.ButtonBuilder()
                .setCustomId("no3")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0] || Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0]}`),
            )
            const choice2 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("no1")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0] || Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0]}`),
                new Discord.ButtonBuilder()
                .setCustomId("no2")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0] || Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0]}`),
                new Discord.ButtonBuilder()
                .setCustomId("yes")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${name}`),
                new Discord.ButtonBuilder()
                .setCustomId("no3")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0] || Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0]}`),
            )
            const choice3 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("no1")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0] || Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0]}`),
                new Discord.ButtonBuilder()
                .setCustomId("no2")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0] || Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0]}`),
                new Discord.ButtonBuilder()
                .setCustomId("no3")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0] || Countries.findByCountryCode(`${randomCountry()}`).data.map(n => n.name.common)[0]}`),
                new Discord.ButtonBuilder()
                .setCustomId("yes")
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel(`${name}`),
            )
            const choices = [choice3, choice2, choice1, choice0];
            const random = choices[Math.floor(Math.random() * choices.length)];
            await interaction.deferReply()
            tempData.push(interaction.guildId)
            const msg = interaction.editReply({ files: [flag], embeds: [embed], components: [random], fetchReply: true, content: `Ends <t:${Math.floor(Date.now() / 1000) + 60}:R>`})
           const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });
           collector.on('collect', async i => {
            if(i.customId.startsWith("no")){
                try {
                const button = i.message.components.find(c => c.type === Discord.ComponentType.ActionRow).components.find(c => c.customId === "yes");
                await i.update({ content: `Nope its ${button.label}`, components: [] });
                await i.followUp(`** Ooh lost np good luck to all try again ?, ${i.user}**`)
                tempData.splice(tempData.indexOf(interaction.guildId), 1);
            } catch {
                tempData.splice(tempData.indexOf(interaction.guildId), 1);
                return 0;
            }
                tempData.splice(tempData.indexOf(interaction.guildId), 1);
            } else if(i.customId === "yes"){
                try {
                    const db = await data.findOne({ guild: i.guildId, user: i.user.id });
                    const db1 = await data.find({ user: i.user.id })
                    const totalPoints = db1.reduce((acc, data) => {
                        return acc + data.point;
                      }, 0);
                    if(db){
                        const pointNow = db.point;
                        db.point = pointNow + 1
                        db.save();
                    } else if(!db){
                        new data({ guild: i.guildId, user: i.user.id, point: 1 }).save()
                    }
                    const button = i.message.components.find(c => c.type === Discord.ComponentType.ActionRow)?.components.find(c => c.customId === "yes");
                   await i.update({ content: `Yees good choice its ${button.label}`, components: [] })
                   await interaction.channel.send(`** congratulations you won one point, ${i.user}**`)
                   await i.followUp({ content: `** You have now a ${db.point} point in this guild and ${totalPoints} in all guild **`, ephemeral: true})
                   tempData.splice(tempData.indexOf(interaction.guildId), 1);
                 } catch(e){
                    tempData.splice(tempData.indexOf(interaction.guildId), 1);
                    return console.log(e);
                }
            }
        });
        collector.on('end', async collected => {
                await interaction.editReply({ content: `Time Ends it's ${name}`, components: [] });
                tempData.splice(tempData.indexOf(interaction.guildId), 1);

        });
        } catch (e){
            tempData.splice(tempData.indexOf(interaction.guildId), 1);
            console.log(e)
            return interaction.reply({ content: `Filed try again`, ephemeral: true})
        }
	},
};