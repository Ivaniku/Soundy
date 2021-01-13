const { Discord, ytdl, Client, token, prefix, fs, os, HelpMenu, InviteMenu, tts, util } = require("./Modules/Variables.js");
const { validateYouTubeUrl, SaveTTS } = require("./Modules/Functions.js");

var isReady = true;

Client.on('ready', () => {
    console.log("Logged in!");
    Client.user.setActivity("Type \'soundy help\'", { type: "PLAYING" });
});

Client.on('message', message => {
    function Play(Wtp) {
        try{
            var voiceChannel = message.member.voice.channel;
            if (voiceChannel != null)
            {
                isReady = false
                voiceChannel.join().then(connection =>
                {
                    message.guild.me.voice.setSelfDeaf(true)
                    const dispatcher = connection.play(Wtp);
                    dispatcher.on("finish", end => {
                        console.log("Finished")
                        voiceChannel.leave()
                        isReady = true;
                    })

                    dispatcher.on("error", end => {
                        console.log("Error")
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
        }
    }
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift()
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    else if (isReady || command.toLowerCase() == "stop") {
        switch(command.toLowerCase()){
            case "stop":
                if (message.guild.me.voice.channel != null){
                    message.guild.me.voice.channel.leave();
                    isReady = true
                }else
                message.channel.send("Umm what do you want to stop? xD")
                break
            case "help":
                message.channel.send(HelpMenu);
                break
            case "flipacoin":
                if (Math.floor((Math.random() * 2) + 1) == 1){
                    message.channel.send("You got head :\"\"0")
                }else{
                    message.channel.send("You got tail :\"\"0")
                }
                break
            case "ping":
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
                    message.channel.send("\`ERROR\` \`\`\`xl\n${(err)}\n\`\`\`");
                }
                break
            case "tts":
                message.delete();
                if (args.length > 0){
                        SaveTTS(Play("TTS.mp3"), message.content.split(' ').splice(2).join(' '))
                        message.reply(" said \"" + message.content.split(' ').splice(2).join(' ') + "\" in VC")
                }else
                message.channel.send("It would be good if you uuuh... Provided text")
                break
            default:
                try {
                    if (fs.existsSync('./Audio/' + command.toLowerCase() + ".mp3")) {
                      //file exists
                      console.log(("./Audio/" + command.toLowerCase() + ".mp3" + " Exists!"))
                      message.delete();
                      Play('./Audio/' + command.toLowerCase() + ".mp3")
                    }else{
                        console.log("Unexisting file")
                        try{
                            if (validateYouTubeUrl(command) == true){
                                Play(ytdl(command, {quality: 'highestaudio', filter: "audioonly"}))
                                message.delete();
                            }else
                            message.channel.send("I can't find that! o.O")
                        }catch(err){
                            message.channel.send("I can't find that! o.O")
                            return console.log(err);
                        }
                    }
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