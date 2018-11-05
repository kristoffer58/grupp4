function start(button){

    let ul = $('<ul class = "langSv"/>');
    for(let tryGame in button){
        let li = $('<li/>');
        for(let langSv of button[tryGame].sv){
            li.append('<p>' + langSv.name + '</p>');
        }
        ul.append(li);
        $('main .card-body a').append(ul);

        ul = $('<ul class = "langEn"/>');
        for(let tryGame in button){
          let li = $('<li/>');
          for(let langEn of button[tryGame].en){
              li.append('<p>' + langEn.name + '</p>');
          }
        ul.append(li);
      }
    
      $('main .card-body a').append(ul);
    }
}
$.getJSON('/json/tryMeButton.json', start);