const { tts, fs, path, http, https, urlm } = require("./Variables.js");


function ValidURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function DownloadURL(url, dest) {
    return new Promise((resolve, reject) => {
      const info = urlm.parse (url);
      const httpClient = info.protocol === 'https:' ? https : http;
      const options = {
        host: info.host,
        path: info.path,
        headers: {
          'user-agent': 'WHAT_EVER',
        },
      };
  
      httpClient
        .get(options, (res) => {
          // check status code
          if (res.statusCode !== 200) {
            const msg = `request to ${url} failed, status code = ${res.statusCode} (${res.statusMessage})`;
            reject(new Error(msg));
            return;
          }
  
          const file = fs.createWriteStream(dest);
          file.on('finish', function () {
            // close() is async, call resolve after close completes.
            file.close(resolve);
          });
          file.on('error', function (err) {
            // Delete the file async. (But we don't check the result)
            fs.unlink(dest);
            reject(err);
          });
  
          res.pipe(file);
        })
        .on('error', reject)
        .end();
    });
  }

async function SaveTTS(_callback, Input, Lang){
    try{
        const url = tts.getAudioUrl(Input, { lang: Lang });
        DownloadURL(url, "./TTS.mp3")
        _callback
    } catch(err) {
        console.log("TTS error")
        console.log(err)
    }
};

function Play(Wtp, message) {
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

module.exports = { SaveTTS, ValidURL, Play };