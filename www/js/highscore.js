

$('.highScoreButton, .highScoreButtonOver').click(showResults);

  function showResults() {
    resetHighscoreList()
  $.getJSON('/json/highscore.json', show);


  function show(highScoreJson) {
    console.log(highScoreJson);

    let jasonData = highScoreJson;

    $(".highscore .lista").append('<div class="list col-4" id="col1">#</div>');
    $(".highscore .lista").append('<div class="list col langSv" id="col2sv">Namn</div>');
    $(".highscore .lista").append('<div class="list col langSv" id="col3sv">Poäng</div>');
    $(".highscore .lista").append('<div class="list col langEn" id="col2en">Name</div>');
    $(".highscore .lista").append('<div class="list col langEn" id="col3en">Score</div>');
   



    for (i = 0; i < jasonData.length; i++) {
      $("#col1").append('<div>' + (i+1) + '</div>');
      $("#col2sv, #col2en").append('<div>' + highScoreJson[i].name + '</div>');
      $("#col3sv, #col3en").append('<div>' + highScoreJson[i].score + '</div>');
      
    }
  }
}
function resetHighscoreList(){
  $("#col1, #col2, #col3").remove();
}