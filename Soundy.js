//This part of the code initializes all variables from the Modules folder. Remember to change it whenever you install a dependency. 
const { Discord, Client, token, prefix, fs, HelpMenu, InviteMenu, tts, util, ActivitiesList, VoteMenu, Languages, ConfigMenu } = require("./Modules/Variables.js");
const { SaveTTS } = require("./Modules/Functions.js");
const { strike } = require("./Modules/Token.js");

//This part of the code is executed when the bot logs in, also used for random status.
Client.on('ready', () => {
    console.log("Logged in!");
    //This whole piece of code is the random status.
    var SoundyHelp = true
    setInterval(() => {
        if (SoundyHelp == true){
            //This is the default status that executes between the random statuses.
            Client.user.setActivity("Type \"soundy help\"");
            SoundyHelp = false
        }else{
            const index = Math.floor(Math.random() * ActivitiesList.length + 1)
            Client.user.setActivity(ActivitiesList[index])
            SoundyHelp = true
        }
    }, 10000)
    //^^ You can change that number to change the interval of time between every status in miliseconds.
});

//This part of the code is executed when a message is sent.
Client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift()
    //This is the Play function, i couldn't declare it in the Modules folder because it wouldn't recognise the variables.
    //I'm pretty sure that declaring it right here is a bad way of doing it and makes the code look messier but it's the only workaround i could find
    function Play(Wtp) {
        try{
            var voiceChannel = message.member.voice.channel;
            if (voiceChannel != null)
            {
                if (voiceChannel.joinable){
                    voiceChannel.join().then(connection =>
                    {
                        message.guild.me.voice.setSelfDeaf(true)
                        const dispatcher = connection.play(Wtp);
                        dispatcher.on("finish", end => {
                            voiceChannel.leave()
                        })
                    }).catch(err => console.log(err));
                }else
                message.channel.send("I don't have access to that voice channel! I don't know what to do :(")
            }else{
                message.channel.send("You\'re not in a voice channel! I don't know what to do :(")
            }
        }catch(err){
            console.log("Failed to play an audio")
            console.log(err)
            Client.users.cache.get("561560432100245520").send("An error ocurred playing an audio btw, lemme give you more info: \n```\n" + err + "\n```");
        }
    }
    //This piece of code is executed when the message that is sent doesn't contain the Soundy prefix. Do not touch.
    if (!message.content.startsWith(prefix) || message.author.bot || message.channel instanceof Discord.DMChannel ) return;
    else if (message.guild.me.voice.channel == null || command.toLowerCase() == "leave" || command.toLowerCase() == "eval" || command.toLowerCase() == "help") {
        //This checks the config file of the server
        if (fs.existsSync("./ServerConfigs/" + message.guild.id + ".json")){
            if (JSON.parse(fs.readFileSync("./ServerConfigs/" + message.guild.id + ".json")).CFVersion != JSON.parse(fs.readFileSync("./ServerConfigs/Template.json")).CFVersion){
                fs.unlinkSync("./ServerConfigs/" + message.guild.id + ".json")
                fs.copyFileSync("./ServerConfigs/Template.json", "./ServerConfigs/" + message.guild.id + ".json", fs.constants.COPYFILE_EXCL, (err) => {
                    if (err) throw err;
                    console.log('File was copied to destination');
                });
            }
        }else
        fs.copyFileSync("./ServerConfigs/Template.json", "./ServerConfigs/" + message.guild.id + ".json", fs.constants.COPYFILE_EXCL, (err) => {
            if (err) throw err;
            console.log('File was copied to destination');
        });

        //This is the switch statement that contains all the commands, i'm pretty happy i used a switch. It makes the code look a lot prettier and more efficient. Adding a command is also very easy.
        if (JSON.parse(fs.readFileSync("./ServerConfigs/" + message.guild.id + ".json")).DisabledCommands.includes(command) == false)
        switch(command.toLowerCase()){
            case "leave":
                if (message.guild.me.voice.channel != null){
                    message.guild.me.voice.channel.leave();
                }else
                message.channel.send("Umm i'm not in a voice channel? xD")
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
                //I'm sure this isn't a very efficient way of converting a negative number to a positive one but i'll find another workaround.
                message.channel.send("The ping is \"" + `${(message.createdTimestamp - Date.now()).toString().slice(1)}` + " ms\"");
                break
            case "invite":
                message.channel.send(InviteMenu)
                break
            case "vote":
                //TODO: Give this thing a use. It's kinda useless and looks ugly.
                message.channel.send(VoteMenu)
                break
            case "eval":
                //The eval command, not the best way of doing eval but it works like a charm ^_^
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
                //The TTS, the API i'm using is kinda unstable so it sometimes throws unwanted results. But i'm still pretty hapy with it.
                if (args.length > 0){
                        if (message.content.split(' ').splice(2).join(' ').length > 200){
                            message.channel.send5("You savage beast you exceeded the 200 character limit")
                        }else
                        SaveTTS(Play("TTS.mp3"), message.content.split(' ').splice(2).join(' '), JSON.parse(fs.readFileSync("./Config.json")).Languages[JSON.parse(fs.readFileSync("./ServerConfigs/" + message.guild.id + ".json")).Lang])
                }else
                message.channel.send("It would be good if you uuuh... Provided text")
                break
            case "say":
                //I'm planning to make this command optional in the config menu i have planned since it can rate limit Soundy and increase raids.
                if (args.length > 0){
                    message.delete()
                    message.channel.send("Sending message...").then((sentMessage) => sentMessage.edit(message.content.split(' ').splice(2).join(' ')))
                }else
                message.channel.send("*says nothing*")
                break
            case "snipe":
                //Hahaha inspiration on dankmemer go brrrrr
                message.channel.send("Here you have", {files: ["./TTS.mp3"]})
                break
            case "config":
                if (message.member.hasPermission('MANAGE_GUILD')) {
                    if (args.length > 0){
                        console.log(args)
                        switch(args[0].toLowerCase()){
                            case "lang":
                                console.log(args.length = 2)
                                console.log(Languages.includes(args[1]))
                                if (args.length == 2 && Languages.includes(args[1])){
                                    let File = JSON.parse(fs.readFileSync("./ServerConfigs/" + message.guild.id + ".json"))
                                    File.Lang = args[1]
                                    fs.writeFileSync("./ServerConfigs/" + message.guild.id + ".json", JSON.stringify(File, null, 2));
                                    message.channel.send("Done!")
                                }else
                                message.channel.send("Not enough arguments or the language code doesn't exist :\"(\n\nCurrent language codes: " + Languages.toString().replace(/,/g, " "))
                                break
                            case "disable":
                                if (args.length == 2 && JSON.parse(fs.readFileSync("./Config.json")).Commands.includes(args[1]) && JSON.parse(fs.readFileSync("./ServerConfigs/" + message.guild.id + ".json")).DisabledCommands.includes(args[1]) == false){
                                    let File = JSON.parse(fs.readFileSync("./ServerConfigs/" + message.guild.id + ".json"))
                                    File.DisabledCommands.push(args[1])
                                    fs.writeFileSync("./ServerConfigs/" + message.guild.id + ".json", JSON.stringify(File, null, 2));
                                    message.channel.send("Done!")
                                }else
                                message.channel.send("Hey that's illegal!")
                                break
                            case "enable":
                                if (args.length == 2 && JSON.parse(fs.readFileSync("./ServerConfigs/" + message.guild.id + ".json")).DisabledCommands.includes(args[1])){
                                    let File = JSON.parse(fs.readFileSync("./ServerConfigs/" + message.guild.id + ".json"))
                                    File.DisabledCommands.splice(File.DisabledCommands.indexOf(args[1]), 1);
                                    fs.writeFileSync("./ServerConfigs/" + message.guild.id + ".json", JSON.stringify(File, null, 2));
                                    message.channel.send("Done!")
                                }else
                                message.channel.send("That command isn't disabled!")
                                break
                            case "restore":
                                fs.unlinkSync("./ServerConfigs/" + message.guild.id + ".json")
                                fs.copyFileSync("./ServerConfigs/Template.json", "./ServerConfigs/" + message.guild.id + ".json", fs.constants.COPYFILE_EXCL, (err) => {
                                    if (err) throw err;
                                });
                                break
                            case "export":
                                if (args.length == 1){
                                    fs.unlinkSync("./Temp/Config.soundy")
                                    fs.copyFileSync("./ServerConfigs/" + message.guild.id + ".json", "./Temp/Config.soundy", fs.constants.COPYFILE_EXCL, (err) => {
                                        if (err) throw err;
                                    });
                                    message.channel.send("Here you have", {files: ["./Temp/Config.soundy"]})
                                }
                                break
                        }
                        message.channel.send
                    }else
                    message.channel.send(ConfigMenu)
                }else
                message.channel.send("You need the manage server permission to change the guild configuration :no_entry:")
                break
            default:
                //This code executes when none of the commands are executed and searchs for a sound. This is a very efficient way fo doing it.
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

    //This piece of code executes when the bot isn't ready to play sounds
    else if (message.guild.me.voice.channel != null)
    {
        message.channel.send("Hold on a second! I'm busy. If you think this is a bug run \"soundy stop\"")
    }
});

Client.login(token);
