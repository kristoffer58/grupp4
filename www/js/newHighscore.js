


function sendNewHigscoreToServer(score) {
 console.log(score);

    $.getJSON('/json/highscore.json', checkIfNewHighscore);
    
function checkIfNewHighscore(jsonObj) {
    
    if(score>jsonObj[9].score){
        
        prompt("New highscore whats your name?").catch(error => {
            // Auto-play was prevented
            // Show paused UI.
          });

        $.post("/add-score",{name,score},null);
            
    }

   
    console.log(jsonObj);
    console.log(jsonObj[5].score);



    }
    }
    











