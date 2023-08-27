const { Client, IntentsBitField } = require("discord.js");
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
        'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
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


client.login(process.env.TOKEN);
