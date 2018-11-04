


function sendNewHigscoreToServer(score) {
<<<<<<< HEAD
 console.log(score);
=======

>>>>>>> newHighScoreJs
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



    /*
    $('.send-to-highscore').on('click', postNewHighscore);
    function postNewHighscore() {
      let name ; // fetch the name from your <input>/or otherwhere
      let score ;// fetch the score from the game's "score"-variable
      $.post( "/add-score", { name, score }, function(responseData) {
        console.log('the new highscore-list is:', responseData);
        console.error('append/use the new highscore-list then remove this console.error');
      });
    
    */
    }
    }
    











