
function sendNewHigscoreToServer(score) {

    $.getJSON('www\json\highscore.json', checkIfNewHighscore());
    

function checkIfNewHighscore(jsonObj) {
    let lowestScor = 0;
    console.log(score);

    console.log(jsonObj[0]);
    
    
    
    }
    
}












//   $('.send-to-highscore').on('click', postNewHighscore);
function postNewHighscore() {
    let name; // fetch the name from your <input>/or otherwhere
    let score;// fetch the score from the game's "score"-variable
    $.post("/add-score", { name, score }, function (responseData) {
        console.log('the new highscore-list is:', responseData);
        console.error('append/use the new highscore-list then remove this console.error');
              });

    }
