function gametrans(gameText){

    let scorenummber=$('<span>0000</span>');
    let livnummbers = $('<span>3</span>');


    for(let gameTranslation in gameText){
        let phighscore = $('<p class="langSv"/>');
        let pinstuctions = $('<p class="langSv"/>');
        let pback= $('<p class="langSv"/>');
        let pscore= $('<p class="langSvInline"/>');
        let plives = $('<p class="langSvInline"/>');

        for(let langSv of gameText[gameTranslation].sv){
            phighscore.append(langSv.highscore);
            pinstuctions.append(langSv.inst);
            pback.append(langSv.back);
            pscore.append(langSv.score);
            plives.append(langSv.lives);
        }
        $('.highScoreButton, .highscore h1, .highScoreButtonOver').append(phighscore);
        $('.Instructions').append(pinstuctions);
        $('.back, .backGameOver').append(pback);
        $('.score, .scoreGameOver').append(pscore);
        $('.lives').append(plives);
        $('.lives').append(livnummbers);
        $('.score').append(scorenummber);


        for(let gameTranslation in gameText){
            let phighscore = $('<p class="langEn"/>');
            let pinstuctions = $('<p class="langEn"/>');
            let pback= $('<p class="langEn"/>');
            let pscore= $('<p class="langEnInline"/>');
            let plives = $('<p class="langEnInline"/>');


          for(let langEn of gameText[gameTranslation].en){
            phighscore.append(langEn.highscore);
            pinstuctions.append(langEn.inst);
            pback.append(langEn.back);
            pscore.append(langEn.score);
            plives.append(langEn.lives);
          }

          $('.highScoreButton, .highscore h1, .highScoreButtonOver').append(phighscore);
          $('.Instructions').append(pinstuctions);
          $('.back, .backGameOver').append(pback);
          $('.score, .scoreGameOver').append(pscore);
          $('.lives').append(plives);
          $('.lives').append(livnummbers);
          $('.score, .scoreGameOver, .newHighscoreInput').append(scorenummber);

        }
    }
}
$.getJSON('/json/gameText.json', gametrans);