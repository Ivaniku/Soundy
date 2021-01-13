const Discord = require("discord.js");
const tts = require('google-translate-tts');
const Client = new Discord.Client();
const token = require("./Token.js");
const prefix = "soundy "
const os = require("os-utils")
const fs = require('fs')
const util = require('util');
const ytdl = require("ytdl-core")

const HelpMenu = new Discord.MessageEmbed()
    .setColor('#0f27ff')
    .setTitle('Invite me!')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=723495135635308604&permissions=116780352&scope=bot')
    .setAuthor('Soundy Bot', 'https://cdn.discordapp.com/avatars/723495135635308604/0bf58bdb05d831ddb38f18ddd12dd7ca.png?size=4096')
    .setDescription('\nsoundy help (This command)\n\n**SOUND EFFECTS**\nsoundy stop - Stops the fun u-u\n\nsoundy works - The first sound\nsoundy bruh - Deception in a nutshell\nsoundy cash - yea monehh!\nsoundy crickets - Silence\nsoundy dial - Wait did we get back to the 90\'?\nsoundy fbi - Fb1 0p3N Up!!1!\nsoundy illuminati - *Content moderated*\nsoundy oof - We both know you already know\nsoundy ps2 - SO LOUDDDDDDD\nsoundy sad - When soundy stop becomes your friend\nsoundy wow - WOAAAAH\nsoundy yay - Happiness in a nutshell\nsoundy bulding - Don\'t be racist! >:\"(\nsoundy hello - H3l0u\nsoundy nope - TF2 in a nutshell\nsoundy thanks - Ugly god\n\n**FUN**\nsoundy flipacoin - Flips a coin\n\n**INFO**\nsoundy ping - Shows the bot ping\nsoundy invite - Invite me! ^^')
    .setFooter('Logo design by TriyPlus', 'https://media.discordapp.net/attachments/679757991771242497/729002585041928252/unknown.png?width=677&height=677');

const InviteMenu = new Discord.MessageEmbed()
    .setColor('#0f27ff')
    .setTitle('Invite me! :\")')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=723495135635308604&permissions=116780352&scope=bot')

module.exports = { Discord, ytdl, Client, token, prefix, fs, os, HelpMenu, InviteMenu, tts, util };