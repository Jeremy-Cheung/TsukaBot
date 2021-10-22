const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { apiKey } = require('./config.json');
const { apiSecret } = require('./config.json');
const https = require("https");
const Binance = require('node-binance-api');

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
    if (msg.content === "XRP") {
        msg.reply(`XRPUSDT: ${ticker.XRPUSDT}`)
    }
});

client.on("messageCreate", msg => {
    if (msg.content === "ping") {
        msg.reply("pong")
    }
});

client.login(token);