const { tts, fs } = require("./Variables.js");

function validateYouTubeUrl(Link){
    var url = Link
        if (url != undefined || url != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return(true)
            }
            else {
                return(false)
            }
        }
}

async function SaveTTS(_callback, Input){
    try{
        const buffer = await tts.synthesize({
            text: Input,
            voice: 'en-UK',
            slow: false // optional
        });

        fs.writeFileSync('TTS.mp3', buffer);
        _callback
    } catch(err) {
        console.log("TTS error")
        const buffer = await tts.synthesize({
            text: "An error occurred, you probably exceeded the character limit.",
            voice: 'en-UK',
            slow: false // optional
        });

        fs.writeFileSync('TTS.mp3', buffer);
        _callback
    }
};

module.exports = { validateYouTubeUrl, SaveTTS };