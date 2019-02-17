// Represents the sound board the user will interact with
class SoundBoard {
    constructor(name, fileName, rows, columns){
        this.buttons = []
        this.name = name
        this.rows = rows
        this.cols = columns
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

    
}