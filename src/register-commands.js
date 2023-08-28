const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
require("dotenv").config();

const commands = [
  // {
  //   name: "hey",
  //   description: "Replies with hey!",
  // },
  // {
  //   name: "add",
  //   description: "adds two numbers",
  //   options: [
  //     {
  //       name: "first-number",
  //       description: "The first number.",
  //       type: ApplicationCommandOptionType.Number,
  //       required: true,
  //       choices: [
  //         {
  //           name: "one",
  //           value: 1,
  //         },
  //         {
  //           name: "two",
  //           value: 2,
  //         },
  //         {
  //           name: "three",
  //           value: 3,
  //         },
  //       ],
  //     },
  //     {
  //       name: "second-number",
  //       description: "The second number.",
  //       type: ApplicationCommandOptionType.Number,
  //       required: true,
  //     }
  //   ],
  // },
  {
    name: "embed",
    description: "Sends an embed",
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async() => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log("slash commands were registered successfully!");
  } catch (err) {
    console.log(`An error occured: ${err}`);
  }
})();