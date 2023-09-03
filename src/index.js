require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require("discord.js");
const { DateTime } = require('luxon');
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

  // client.user.setActivity({
  //   name: "Valorant",
  //   type: ActivityType.Streaming,
  //   url: "https://www.youtube.com/watch?v=_qKhUKCeBQw&t",
  // });
});

client.on("guildMemberAdd", (member) => {
  const server = member.guild;
  console.log(member.guild);
  const serverIconURL = server.iconURL({ format: 'png' });
  
  const channelId = "1147471149714903121";

  function convertUnixTimestampToIST(unixTimestamp) {
    // Convert the Unix timestamp to milliseconds
    const timestampInMilliseconds = unixTimestamp;

    // Create a Luxon DateTime object with the converted timestamp
    const dateTime = DateTime.fromMillis(timestampInMilliseconds);

    // Set the time zone to Indian Standard Time (IST)
    const istDateTime = dateTime.setZone("Asia/Kolkata");

    // Format IST time as "HH:mm:ss IST"
    const istTime = istDateTime.toFormat('HH:mm:ss ZZZ', { locale: 'en-IN' });

    // Return the IST time
    return istTime;
  }

  const finalMessage = convertUnixTimestampToIST(member.guild.joinedTimestamp);

  const channel = member.guild.channels.cache.get(channelId);
  channel.send(finalMessage, {
    files: [serverIconURL],
  });
  // channel.send(finalMessage);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

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

// client.on("interactionCreate", (interaction) => {
//   if (interaction.commandName === "add") {
//     const numOne = interaction.options.get("first-number").value;
//     const numTwo = interaction.options.get("second-number").value;

//     interaction.reply(`The sum is ${numOne + numTwo}`);
//   }

//   if (interaction.commandName === "embed") {
//     const embed = new EmbedBuilder()
//       .setTitle("Title")
//       .setDescription("This is an embed")
//       .setColor("Random")
//       .addFields(
//         {
//           name: "Field title",
//           value: "Some random value",
//           inline: true,
//         },
//         {
//           name: "Field2 title",
//           value: "Some random value",
//           inline: true,
//         }
//       );

//     interaction.reply({ embeds: [embed] });
//   }
// });

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    await interaction.deferReply({ ephemeral: true });
    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "I couldn't find that role",
      });
      return;
    }

    const hasRole = interaction.member.roles.cache.get(role.id);

    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`The ${role} has been removed.`);
      return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`The ${role} has been added.`);
  }
});

client.login(process.env.TOKEN);