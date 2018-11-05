

$('.highScoreButton').click(function showResults() {
  $.getJSON('/json/highscore.json', show);


  function show(highScoreJson) {
    console.log(highScoreJson);

    let jasonData = highScoreJson;

    $(".highscore .lista").append('<div class="list col" id="col1">#rank</div>');
    $(".highscore .lista").append('<div class="list col" id="col2">name</div>');
    $(".highscore .lista").append('<div class="list col" id="col3">score</div>');
   



    for (i = 0; i < jasonData.length; i++) {
      $("#col1").append('<div>' + (i + 1) + '</div>');
      $("#col2").append('<div>' + highScoreJson[i].name + '</div>');
      $("#col3").append('<div>' + highScoreJson[i].score + '</div>');
      
    }
  }
})