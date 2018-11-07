

$('.highScoreButton, .highScoreButtonOver').click(showResults);

  function showResults() {
    resetHighscoreList()
  $.getJSON('/json/highscore.json', show);


  function show(highScoreJson) {
    console.log(highScoreJson);

    let jasonData = highScoreJson;


    $(".highscore .lista").append('<div class="list col-4" id="col1">#Rank</div>');
    $(".highscore .lista").append('<div class="list col" id="col2">Name</div>');
    $(".highscore .lista").append('<div class="list col" id="col3">Score</div>');
   



    for (i = 0; i < jasonData.length; i++) {
      $("#col1").append('<div>' + (i+1) + '</div>');
      $("#col2").append('<div>' + highScoreJson[i].name + '</div>');
      $("#col3").append('<div>' + highScoreJson[i].score + '</div>');
      
    }
  }
}
function resetHighscoreList(){
  $("#col1, #col2, #col3").remove();
}