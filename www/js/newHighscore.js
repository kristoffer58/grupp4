
function sendNewHigscoreToServer(userScore) {
 console.log(userScore);

    $.getJSON('/json/highscore.json', checkIfNewHighscore);
    
function checkIfNewHighscore(jsonObj) {
    
    // allot of stuff happening if user scores going on the highscore list
    //
    if(userScore>jsonObj[9].score){
        //TODO change this to a nice prompt window 
        //with 2 buttons for play again or higscore.
        //this is NOT an invetation to fuck with this.
        //this is just a reminder for me what to do next.
        //make some kind of thread blocking... 
        //merge this shit and connect it with highscore window 
       let name =  prompt("New highscore whats your name?")
       let score = userScore;
       $.post("/add-score",{name,score},null);

    }
    console.log(jsonObj);
    console.log(jsonObj[5].userScore);
    }
    }
    











