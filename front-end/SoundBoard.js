// Represents the sound board the user will interact with
class SoundBoard {
    constructor(userName, name, fileName, rows, columns){
        this.buttons = []
        this.name = name
        this.rows = rows
        this.cols = columns
        this.board = document.querySelector("#sound_board")

        constructBoard(userName)
        renderitem()
    }

    // Initializes the board with sound buttons for each row and column
    constructBoard(userName) {
        con.query('select pl.filePath from playlists pl where playName = ' + this.name, function (error, results, fields) {
            if (error) throw error;
            
            // Fills buttons with button objects that correspond to the corresponding sound board data
            // from the database. Each button is associated with a sound and image.
            results.forEach(function(result) {
                soundInfo = JSON.parse(result)
                for(let row = 0; 0 < this.rows; row++) {
                    buttonRow = []
                    for(let col = 0; 0 < this.cols; col++) {
                        button = new SoundButton(soundInfo.imageFilePath, 
                                                 soundInfo.filePath)
                        buttonRow.append(button)
                    }
                    this.buttons.append(buttonRow)
                }});

      });
    }

    // Plays the sound associated with audio
    playSound(audio, ev) {
      audio.play()
    }

    // Renders the sound board and each button within it onto the page
    // Each button's background is its corresponding image and
    // its onClick event is handled by playSound with the appropriate audio.
    renderItem() {
        this.buttons.forEach(function(button) {
            soundButton = document.createElement("button")
            soundButton.setAttribute("class", "tile")
            this.board.appendChild(soundButton)
            soundButton.style.backgroundImage = `url(${button.imageFilePath})`
            soundButton.addEventListener('click',
            (ev) => this.playSound(button.audio, ev))
        })
    }
}