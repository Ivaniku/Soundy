const { tts, fs, path, http, https, urlm } = require("./Variables.js");

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

module.exports = { SaveTTS };