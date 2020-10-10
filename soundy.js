const Discord = require("discord.js");
const Client = new Discord.Client();
const token = require("./token.js");
const prefix = "soundy "
const fs = require('fs')
const os = require("os-utils")
var isReady = true;

const HelpMenu = new Discord.MessageEmbed()
    .setColor('#bc02d9')
    .setTitle('Invite me!')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=723495135635308604&permissions=116780352&scope=bot')
    .setAuthor('Soundy Bot', 'https://media.discordapp.net/attachments/679757991771242497/761301672927428618/logo.png?width=677&height=677')
    .setDescription('\nsoundy help (This command)\n\n**SOUND EFFECTS**\nsoundy stop - Stops the fun u-u\n\nsoundy works - The first sound\nsoundy bruh - Deception in a nutshell\nsoundy cash - yea monehh!\nsoundy crickets - Silence\nsoundy dial - Wait did we get back to the 90\'?\nsoundy fbi - Fb1 0p3N Up!!1!\nsoundy illuminati - *Content moderated*\nsoundy oof - We both know you already know\nsoundy ps2 - SO LOUDDDDDDD\nsoundy sad - When soundy stop becomes your friend\nsoundy wow - WOAAAAH\nsoundy yay - Happiness in a nutshell\nsoundy bulding - Don\'t be racist! >:\"(\nsoundy hello - H3l0u\nsoundy nope - TF2 in a nutshell\nsoundy thanks - Ugly god\n\n**FUN**\nsoundy flipacoin - Flips a coin\n\n**INFO**\nsoundy ping - Shows the bot ping\nsoundy invite - Invite me! ^^')
    .setFooter('Logo design by TriyPlus', 'https://media.discordapp.net/attachments/679757991771242497/729002585041928252/unknown.png?width=677&height=677');

const InviteMenu = new Discord.MessageEmbed()
    .setColor('#bc02d9')
    .setTitle('Invite me! :\")')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=723495135635308604&permissions=116780352&scope=bot')

Client.on('ready', () => {
    console.log("Logged in!");
    Client.user.setActivity("Type \'soundy help\'", { type: "PLAYING" });
});

Client.on('message', message => {
    function Play(Filename) {
        var voiceChannel = message.member.voice.channel;
        console.log(voiceChannel)
        if (voiceChannel != null)
        {
            isReady = false
            console.log (isReady)
            voiceChannel.join().then(connection =>
            {
                message.guild.me.voice.setDeaf(true);
                const dispatcher = connection.play('./Audio/' + Filename);
                dispatcher.on("finish", end => {
                    voiceChannel.leave()
                    isReady = true;
                });
            }).catch(err => console.log(err));
        }else{
            message.channel.send("You\'re not in a voice channel! I don't know what to do :(")
        }
    }

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    else if (isReady || command == "stop") {
        console.log(command)
        console.log(args)
        switch(command){
            case "stop":
                if (message.guild.me.voice.channel != null){
                    message.guild.me.voice.channel.leave();
                    isReady = true
                }else
                message.channel.send("Umm what do you want to stop? xD")
                break
            case "help":
                message.channel.send(HelpMenu);
                console.log("Help needed!")
                break
            case "flipacoin":
                if (Math.floor((Math.random() * 2) + 1) == 1){
                    message.channel.send("You got head :\"\"0")
                }else{
                    message.channel.send("You got tail :\"\"0")
                }
                break
            case "ping":
                var ping = Date.now() - message.createdTimestamp + " ms";
                message.channel.send("The ping is \"" + `${message.createdTimestamp - Date.now()}` + " ms\"");
                break
            case "invite":
                message.channel.send(InviteMenu)
                break
            case "info":
                os.cpuUsage(function(v){
                    message.channel.send("Take some info about my life!\n\n**System Info**:\n```\nCpu Usage: " + Math.round(v) + "%\nUsed Memory: " + Math.round(os.freememPercentage()) + "%\n```")
                });
                break
            default:
                console.log(command + ".mp3")
                try {
                    if (fs.existsSync('./Audio/' + command + ".mp3")) {
                      //file exists
                      console.log(("./Audio/" + command + ".mp3" + " Exists!"))
                      message.delete();
                      Play(command + ".mp3")
                    }else
                    message.channel.send("I can't find that! o.O")
                } catch(err) {
                    console.error(err)
                  }
                break
        }
    }
    else if (isReady == false)
    {
        message.channel.send("Hold on a second! I'm busy ")
    }
});

Client.login(token);