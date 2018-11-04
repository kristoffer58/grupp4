


function sendNewHigscoreToServer(score) {
 console.log(score);

    $.getJSON('/json/highscore.json', checkIfNewHighscore);
    
function checkIfNewHighscore(jsonObj) {
    
    if(score>jsonObj[9].score){
        /*
        if (play() !== undefined) {
            playPromise.then(_ => {
              // Automatic playback started!
              // Show playing UI.
              // We can now safely pause video...
              pause();
            })
            .catch(error => {
              // Auto-play was prevented
              // Show paused UI.
            });
        */prompt("New highscore whats your name?");

        $.post("/add-score",{name,score},null);
            
    }

   
    console.log(jsonObj);
    console.log(jsonObj[5].score);



    }
    }
    











