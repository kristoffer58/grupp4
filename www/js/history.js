$.getJSON('/json/history.json', start);

let translateSv = {
  "A brief history of Breakout": 'En kort historia i Breakout',
}

function start(historyTrans) {

  let ul = $('<ul class="historySv"/>');

  for (let explanation in historyTrans) {
    let li = $('<li/>');

    for (let langSv of historyTrans[explanation].sv) {
      
      li.append('<p>' + langSv + '</p>');
      ul.append(li);
    
      $('main').append(ul);
    }
  }

  // english instructions
  ul = $('<ul class="historyEn"/>');

  for (let explanation in historyTrans) {
    li = $('<li/>');
    for (let langEn of historyTrans[explanation].en) {
     
      li.append('<p>' + langEn + '</p>');

      ul.append(li);
    

    // jQuery grab the body element
    // and append the ul inside it
    $('main').append(ul);
    }
  }
}


$('#flagSv').hide();


$('#flagSv').click(function () {
  $('#flagEn').show();
  $('.historyEn').hide();
  $('.historySv').show();
  $('#flagSv').hide();
});

$('#flagEn').click(function () {
  $('#flagEn').hide();
  $('.historyEn').show();
  $('.historySv').hide();
  $('#flagSv').show();
});

