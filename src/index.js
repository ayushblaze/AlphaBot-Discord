const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
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

// const rapidApi = async () => {
//   let message = "";
//     const options = {
//       method: 'GET',
//       url: 'https://word-of-the-day2.p.rapidapi.com/word/today',
//       headers: {
//         'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
//         'X-RapidAPI-Host': 'word-of-the-day2.p.rapidapi.com'
//       },
//     };

//     try {
//       const response = await axios.request(options);
//       const wordObj = response.data[1];
//       message = `
//         Date: ${wordObj.date}
//         Word: ${(wordObj.word).toUpperCase()}
//         Meaning: ${wordObj.mean}
//       `;
//       return message;
//     } catch (err) {
//       console.error(err);
//     }
//     console.log("from the async function", message);
// };

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content == "ping")  {
    message.reply("pong!");
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
