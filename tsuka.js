const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const https = require("https");

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] 
});

client.on("ready", () => {
    console.log(`Starting Tsuka, logged in as ${client.user.tag}`)
})

client.on("messageCreate", msg => {
    if (msg.content === "ping") {
        msg.reply("pong")
    }
});

client.login(token);