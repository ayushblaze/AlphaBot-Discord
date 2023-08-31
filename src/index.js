require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (client) => {
  console.log(
    `---------------------\n${client.user.tag} is ${client.presence.status}🤖✅\n---------------------`
  );
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content == "ping")  {
    message.reply("pong!");
  }

  if (message.content == "word") {
    try {
      const headers = {
        'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'word-of-the-day2.p.rapidapi.com'
      };
      const options = {
        method: "GET",
        headers,
      };
      const response = await fetch("https://word-of-the-day2.p.rapidapi.com/word/today", options);
      const res = await response.json();
      console.log(res);
      let res_word = res[1].word.toUpperCase();
      let res_meaning = res[1].mean.charAt(0).toUpperCase() + res[1].mean.slice(1);
      const embed = new EmbedBuilder()
        .setTitle(res_word)
        .setDescription(res_meaning)
        .setColor("Random");
      message.reply({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
  }
});

client.on("interactionCreate", (interaction) => {
  if (interaction.commandName === "add") {
    const numOne = interaction.options.get("first-number").value;
    const numTwo = interaction.options.get("second-number").value;

    interaction.reply(`The sum is ${numOne + numTwo}`);
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Title")
      .setDescription("This is an embed")
      .setColor("Random")
      .addFields(
        {
          name: "Field title",
          value: "Some random value",
          inline: true,
        },
        {
          name: "Field2 title",
          value: "Some random value",
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);