const Discord = require("discord.js");
const tts = require('google-translate-tts');
const Client = new Discord.Client();
const token = require("./Token.js");
const prefix = "soundy "
const os = require("os-utils")
const fs = require('fs')
const util = require('util');

const ActivitiesList = [
    "The bot is going through some problems that may be fixed in 3 days. The core features will still work as intended <3",
    "The bot for VC utilities!",
    "Special thanks to TriyPlus",
    "Vote for Soundy next president! #Soundy2024",
    "Ivaniku is crying in his bed",
    "Garfield is sorry",
    "Cats are always welcome",
    "Now with extra raspberry flavour",
    "Samurais were created by the goverment and are corrupting our youth",
    "When you're a synthesizer and you're happy",
    "Soundy likes sneks!",
    "French is spanish but spiced up",
    "Playing sounds with Hatsune Miku",
    "Searching for lost passports",
    "Now with modern ice cream included",
    "MzDesigns 😳",
    "Votiobjective is down!",
    "Robbing your IP",
    "Hacking the NASA",
    "Spying on Dhilly",
    "Listening to the song of the eared robot",
    "Happy birthday from the future Kasane Teto!",
    "Improving myself",
    "Screaming",
    "Rex is coming for you",
    "Watching DhillyHub",
    "Eating lolis",
    "Your left sock is praying Kagamine Rin",
    "Get ready for the Luka Luka night fever",
    "The sun is a deadly lazer",
    "I crashed a server node!",
    "Users = Stonks"
];

const HelpMenu = new Discord.MessageEmbed()
    .setColor('#0f27ff')
    .setTitle('Invite me!')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=723495135635308604&permissions=116780352&scope=bot')
    .setAuthor('Soundy Bot', 'https://cdn.discordapp.com/avatars/723495135635308604/0bf58bdb05d831ddb38f18ddd12dd7ca.png?size=4096')
    .setDescription('Prefix: "soundy "\n\nsoundy help (This command)\n\n**SOUND EFFECTS**\nstop - Stops the fun u-u\n\nworks - The first sound\nbruh - Deception in a nutshell\ncash - yea monehh!\ncrickets - Silence\ndial - Wait did we get back to the 90\'?\nfbi - Fb1 0p3N Up!!1!\nilluminati - *Content moderated*\noof - We both know you already know\nps2 - SO LOUDDDDDDD\nsad - When stop\nwow - WOAAAAH\nyay - Happiness in a nutshell\nbulding - Don\'t be racist! >:\"(\nhello - H3l0u\nnope - TF2 in a nutshell\nthanks - Ugly god\n\n**FUN**\nflipacoin - Flips a coin\ntts <text> - Plays a tts audio in VC\nsay <text> - Says something for you\nsnipe - Sends the last TTS message\n\n**INFO**\nping - Shows the bot ping\ninvite - Invite me! ^^')
    .addField("_ _", "[Join the support server](https://discord.gg/FSzH9Wsr9U)")
    .setFooter('Logo design by TriyPlus', 'https://cdn.discordapp.com/avatars/678328276573225034/c8919017ebe77b5016d5fe1770918cfa.png?size=4096');

const InviteMenu = new Discord.MessageEmbed()
    .setColor('#0f27ff')
    .setTitle('Invite me! :\")')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=723495135635308604&permissions=116780352&scope=bot')

module.exports = { Discord, Client, token, prefix, fs, os, HelpMenu, InviteMenu, tts, util, ActivitiesList };
