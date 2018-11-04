


function sendNewHigscoreToServer(userScore) {
 console.log(userScore);

    $.getJSON('/json/highscore.json', checkIfNewHighscore);
    
function checkIfNewHighscore(jsonObj) {
    
    if(userScore>jsonObj[9].score){
        
       let name =  prompt("New highscore whats your name?")
       let score = userScore;
        $.post("/add-score",{name,score},null);
            
    }

   
    console.log(jsonObj);
    console.log(jsonObj[5].userScore);



    }
    }
    











