const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { apiKey } = require('./config.json');
const { apiSecret } = require('./config.json');
const https = require("https");
const Binance = require('node-binance-api');
const prefix = "$";

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] 
});

const binance = new Binance().options({
    APIKEY: apiKey,
    APISECRET: apiSecret,
});


client.on("ready", () => {
    console.log(`Starting Tsuka, logged in as ${client.user.tag}`)
})

client.on("messageCreate", async msg => {
    let ticker = await binance.prices();
    if (!msg.content.startsWith(prefix)) {
        return;
    } else {
        command = msg.content.slice();
        command = command.replace(prefix,'');
        command = command.split(" ");
        if (command[0] == "ticker") {
            command[1] = command[1].toUpperCase();
            msg.reply(command[1] + `: ${ticker[command[1]]}`);
        }
    }
});

client.on("messageCreate", msg => {
    if (msg.content === "ping") {
        msg.reply("pong")
    }
});

client.login(token);