let score;

function sendNewHigscoreToServer(userScore) {
    console.log(userScore);

    $.getJSON('/json/highscore.json', checkIfNewHighscore);

    function checkIfNewHighscore(jsonObj) {

        // allot of stuff happening if user scores going on the highscore list
        //
       
        if (userScore > jsonObj[jsonObj.length-1].score) {
            //TODO change this to a nice prompt window 
            //with 2 buttons for play again or higscore.
            //this is NOT an invetation to fuck with this.
            //this is just a reminder for me what to do next.
            //make some kind of thread blocking... 
            //merge this shit and connect it with highscore window 
            // let name =  prompt("New highscore whats your name?")
            let form = $('<form id="newHigscoreForm">');
            $(form).append('Your name:<input type="text" id="highscoreName" name="highscoreName">');
            $(form).append('<input type="button" id="highscoreSubmit">');
            $(".newHighscoreInput").append(form);
            $(".newHighscoreInput").append('</form>');


            score = userScore;
           



        }
        console.log(jsonObj);
    }
}
function submit() {
    let name=$("#highscoreName").val();
        $.post("/add-score",{name,score},null);
    console.log(name);
    console.log((score));
    $("#newHigscoreForm").remove();
    $('.game').hide();
    $('.highscore').show();
    showResults();

}

$(document).on('click', '#highscoreSubmit', function() {
    submit();
});










