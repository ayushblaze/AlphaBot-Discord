const { Client, IntentsBitField } = require("discord.js");
const axios = require("axios");
require("dotenv").config();

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

const rapidApi = async () => {
  let message = "";
    const options = {
      method: 'GET',
      url: 'https://word-of-the-day2.p.rapidapi.com/word/today',
      headers: {
        'X-RapidAPI-Key': '4bfa517ac1mshf78c6c042ab48f6p151beajsn2cd4ac687e6d',
        'X-RapidAPI-Host': 'word-of-the-day2.p.rapidapi.com'
      },
    };

    try {
      const response = await axios.request(options);
      const wordObj = response.data[1];
      message = `
        Date: ${wordObj.date}
        Word: ${(wordObj.word).toUpperCase()}
        Meaning: ${wordObj.mean}
      `;
      return message;
    } catch (err) {
      console.error(err);
    }
    console.log("from the async function", message);
};

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content == "ping")  {
    message.reply("pong!");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    interaction.reply("Hey!!");
  }

  if (interaction.commandName === "word") {
    // interaction.reply("okay");
    try {
      const message = await rapidApi();
      await interaction.reply(message);
    } catch (err) {
      console.log("error inside if", err.requestBody);
    }
  }
});

client.login(process.env.TOKEN);
