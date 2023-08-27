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

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content == "ping")  {
    message.reply("pong!");
  }
});

client.login(process.env.TOKEN);
