const { Discord, Client, token, prefix, fs, os, HelpMenu, InviteMenu, tts, util, ActivitiesList } = require("./Modules/Variables.js");
const { SaveTTS } = require("./Modules/Functions.js");

isReady = true;

Client.on('ready', () => {
    console.log("Logged in!");
    var SoundyHelp = true
    setInterval(() => {
        if (SoundyHelp == true){
            Client.user.setActivity("Type \"soundy help\"");
            SoundyHelp = false
        }else{
            const index = Math.floor(Math.random() * ActivitiesList.length + 1)
            Client.user.setActivity(ActivitiesList[index])
            SoundyHelp = true
        }
    }, 10000)
});

Client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift()
    function Play(Wtp) {
        try{
            voiceChannel = message.member.voice.channel;
            if (voiceChannel != null)
            {
                isReady = false
                voiceChannel.join().then(connection =>
                {
                    message.guild.me.voice.setSelfDeaf(true)
                    const dispatcher = connection.play(Wtp);
                    dispatcher.on("finish", end => {
                        voiceChannel.leave()
                        isReady = true;
                    })

                    dispatcher.on("error", end => {
                        console.error()
                        voiceChannel.leave()
                        isReady = true;
                    })
                }).catch(err => console.log(err));
            }else{
                message.channel.send("You\'re not in a voice channel! I don't know what to do :(")
            }
        }catch(err){
            console.log("Failed to play an audio")
            console.log(err)
            Client.users.cache.get("561560432100245520").send("An error ocurred playing an audio btw, lemme give you more info: \n```\n" + err + "\n```");
        }
    }
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    else if (isReady || command.toLowerCase() == "stop" || command.toLowerCase() == "eval" || command.toLowerCase() == "eval") {
        switch(command.toLowerCase()){
            case "stop":
                if (message.guild.me.voice.channel != null){
                    message.guild.me.voice.channel.leave();
                    isReady = true
                }else
                message.channel.send("Umm what do you want to stop? xD")
                break
            case "help":
                message.react("☑")
                message.author.send(HelpMenu);
                break
            case "flipacoin":
                if (Math.floor((Math.random() * 2) + 1) == 1){
                    message.channel.send("You got head :\"\"0")
                }else{
                    message.channel.send("You got tail :\"\"0")
                }
                break
            case "ping":
                let Ping = message.createdTimestamp - Date.now()
                message.channel.send("The ping is \"" + `${Ping.toString().slice(1)}` + " ms\"");
                break
            case "invite":
                message.channel.send(InviteMenu)
                break
            case "info":
                os.cpuUsage(function(v){
                    message.channel.send("Take some info about my life!\n\n**System Info**:\n```\nCpu Usage: " + Math.round(v) + "%\nUsed Memory: " + Math.round(os.freememPercentage()) + "%\n```")
                });
                break
            case "eval":
                if(message.author.id !== "561560432100245520"){
                    message.channel.send("Woah there you know Eval is dangerous af");
                    return;
                }
                try {
                    const code = args.join(" ");
                    let evaled = eval(code);
 
                    if (typeof evaled !== "string")
                        evaled = require("util").inspect(evaled);
 
                    message.channel.send(evaled, {code:"xl"});
                } catch (err) {
                    message.channel.send("\`ERROR\` \`\`\`xl\n " + err + "\n\`\`\`");
                }
                break
            case "tts":
                if (args.length > 0){
                        SaveTTS(Play("TTS.mp3"), message.content.split(' ').splice(2).join(' '))
                }else
                message.channel.send("It would be good if you uuuh... Provided text")
                break
            case "say":
                if (args.length > 0){
                    message.delete()
                    message.channel.send("Sending message...").then((sentMessage) => sentMessage.edit(message.content.split(' ').splice(2).join(' ')))
                }else
                message.channel.send("*says nothing*")
                break
            case "snipe":
                message.channel.send("Here you have", {files: ["./TTS.mp3"]})
                break
            default:
                try {
                    if (fs.existsSync('./Audio/' + command.toLowerCase() + ".mp3")) {
                      message.delete();
                      Play('./Audio/' + command.toLowerCase() + ".mp3")
                    }else{
                        message.channel.send("I can't find that! o.O")
                    }
                } catch(err) {
                    console.error(err)
                  }
                break
        }
    }
    else if (isReady == false)
    {
        if (isReady == true){
            message.channel.send("Hold on! An unknown error occured")
            Client.users.cache.get("561560432100245520").send("An error occured, check it lazy dumbass https://cp.something.host/services/1509%22%22 ");
            const { Discord, Client, token, prefix, fs, os, HelpMenu, InviteMenu, tts, util, ActivitiesList } = require("./Modules/Variables.js");
            const { SaveTTS } = require("./Modules/Functions.js");

            isReady = true;
        }else
        message.channel.send("Hold on a second! I'm busy")
    }
});

Client.login(token);