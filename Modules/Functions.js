const { tts, fs } = require("./Variables.js");

async function SaveTTS(_callback, Input){
    try{
        const buffer = await tts.synthesize({
            text: Input,
            voice: 'en-UK',
            slow: false // optional
        });

        fs.writeFileSync('TTS.mp3', buffer)
        _callback
    } catch(err) {
        console.log("TTS error")
        const buffer = await tts.synthesize({
            text: "An error occurred, you probably exceeded the character limit.",
            voice: 'en-UK',
            slow: false // optional
        });

        fs.writeFileSync('TTS.mp3', buffer)
        _callback
    }
};

module.exports = { SaveTTS };