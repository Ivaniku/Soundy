const Discord = require("discord.js");
const util = require("util");
const path = require('path');
const tts = require("google-tts-api");
const http = require('http');
const https = require('https');
const fs = require("fs")
const os = require("os")
const urlm = require("url")
const Client = new Discord.Client();
const prefix = "beta "
const token = require("./Token.js");

const ActivitiesList = [
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
    "Users = Stonks",
    "Hiding in a nuclear bunker",
    "Insert JoJo refrence here",
    "With your feelings",
    "Starting a riot",
    "Locating area 52",
    "Listening to some Vocaloid tunes",
    "Translating some tohou songs to english",
    "Cats are modern",
    "Minecraft is cool!"
];

const Languages = [
    "en",
    "es",
    "fr",
    "ja",
    "ru"
]

const HelpMenu = new Discord.MessageEmbed()
    .setColor('#0f27ff')
    .setTitle('Invite me!')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=723495135635308604&permissions=116780352&scope=bot')
    .setAuthor('Soundy Bot', 'https://cdn.discordapp.com/avatars/723495135635308604/0bf58bdb05d831ddb38f18ddd12dd7ca.png?size=4096')
    .setDescription('Prefix: "soundy "\n\nsoundy help (This command)\n\n**SOUND EFFECTS**\nleave - Leaves the VC u-u\n\nworks - The first sound\nbruh - Deception in a nutshell\ncash - yea monehh!\ncrickets - Silence\ndial - Wait did we get back to the 90\'?\nfbi - Fb1 0p3N Up!!1!\nilluminati - *Content moderated*\noof - We both know you already know\nps2 - SO LOUDDDDDDD\nsad - When stop\nwow - WOAAAAH\nyay - Happiness in a nutshell\nbulding - Don\'t be racist! >:\"(\nhello - H3l0u\nnope - TF2 in a nutshell\nthanks - Ugly god\n\n**FUN**\nflipacoin - Flips a coin\ntts <text> - Plays a tts audio in VC\nsay <text> - Says something for you\nsnipe - Sends the last TTS message\n\n**INFO**\nping - Shows the bot ping\ninvite - Invite me to your server! ^^\nvote - Vote me!\n\n**UTILITY**\nconfig - Customise Soundy for your server!')
    .addField("_ _", "[Join the support server](https://discord.gg/FSzH9Wsr9U)")
    .setFooter('Logo design by TriyPlus', 'https://cdn.discordapp.com/avatars/678328276573225034/c8919017ebe77b5016d5fe1770918cfa.png?size=4096');

const ConfigMenu = new Discord.MessageEmbed()
    .setColor('#0f27ff')
    .setTitle('Invite me!')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=723495135635308604&permissions=116780352&scope=bot')
    .setAuthor('Soundy Bot', 'https://cdn.discordapp.com/avatars/723495135635308604/0bf58bdb05d831ddb38f18ddd12dd7ca.png?size=4096')
    .setDescription("Note: Only people with the manage server permission can modify the configurations!\n\nlang <language code> - Change the language of the tts\ndisable <command> - Disable a specific command\nenable <command> - Enable a disabled command\nrestore - Restore the configurations")
    .addField("_ _", "[Join the support server](https://discord.gg/FSzH9Wsr9U)")
    .setFooter('Logo design by TriyPlus', 'https://cdn.discordapp.com/avatars/678328276573225034/c8919017ebe77b5016d5fe1770918cfa.png?size=4096');

const InviteMenu = new Discord.MessageEmbed()
    .setColor('#0f27ff')
    .setTitle('Invite me! :\")')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=723495135635308604&permissions=116780352&scope=bot')

const VoteMenu = new Discord.MessageEmbed()
    .setColor('#0f27ff')
    .setTitle('Vote me!')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=723495135635308604&permissions=116780352&scope=bot')
    .setAuthor('Soundy Bot', 'https://cdn.discordapp.com/avatars/723495135635308604/0bf58bdb05d831ddb38f18ddd12dd7ca.png?size=4096')
    .setDescription("I\'m in a variety of bot lists and it would really help me out if you vote me in one of those ^^\n")
    .addField("My Top.gg page", "[top.gg](https://top.gg/bot/723495135635308604)")
    .addField("Me DiscordBotList page", "[discordbotlist.com](https://discordbotlist.com/bots/soundy-1861)")
    .addField("My Discord Bots page", "[discord.bots.gg](https://discord.bots.gg/bots/723495135635308604)")
    .setFooter('Logo design by TriyPlus', 'https://cdn.discordapp.com/avatars/678328276573225034/c8919017ebe77b5016d5fe1770918cfa.png?size=4096');

module.exports = { Discord, Client, token, prefix, fs, os, HelpMenu, InviteMenu, tts, util, ActivitiesList, VoteMenu, Languages, ConfigMenu, path, http, https, urlm };
