

$('.highScoreButton').click(function showResults(){
  $.getJSON('/json/highscore.json', show);
  

  function show(highScoreJson){
    console.log(highScoreJson);

    let jasonData = highScoreJson;

    $(".highscore .lista").append('<div class="list col" id="col1">name</div>');
    $(".highscore .lista").append('<div class="list col" id="col2">score</div>');
    $(".highscore .lista").append('<div class="list col" id="col3">#rank</div>');
    
  

    for (i=0; i < jasonData.length; i++){
     
      $("#col1").append('<div>' + highScoreJson[i].name + '</div>');
      $("#col2").append('<div>' + highScoreJson[i].score + '</div>');
      $("#col3").append('<div>' + i + '</div>');       
           
     }

    









  }












})