// Represents the sound board the user will interact with
class SoundButton {
    constructor(imageFileName, soundFileName){
        this.imagePath = imageFileName
        this.audio = new Audio(soundFileName)
    }
}