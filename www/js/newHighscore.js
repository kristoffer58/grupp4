


function sendNewHigscoreToServer(userScore) {
 console.log(userSore);

    $.getJSON('/json/highscore.json', checkIfNewHighscore);
    
function checkIfNewHighscore(jsonObj) {
    
    if(score>jsonObj[9].userScore){
        
        name =  prompt("New highscore whats your name?")
        score = userScore;
        $.post("/add-score",{name,score},null);
            
    }

   
    console.log(jsonObj);
    console.log(jsonObj[5].userScore);



    }
    }
    











