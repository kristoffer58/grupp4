$.getJSON('/json/history.json', start);

function start(historyTrans){

let ul = $('<ul class="historySv"/>');
for(let explanation in historyTrans){
    let li = $('<li/>');
    for(let langSv of historyTrans[explanation].sv){
        li.append('<p>' + langSv.desc + '</p>');
    }
    
    $('main').append(ul);

    // english instructions
    ul = $('<ul class="historyEn"/>');
for(let explanation in historyTrans){
    let li = $('<li/>');
    for(let langEn of historyTrans[explanation].en){
        li.append('<p>' + langEn.desc + '</p>');
    }
    ul.append(li);
  }
  // jQuery grab the body element
  // and append the ul inside it
  $('main').append(ul);
}
}

$('#flagSv').hide();

$('#flagSv').click(function(){
  $('#flagEn').show();
  $('.instrEn').hide();
  $('.instrSv').show();
  $('#flagSv').hide();
});

$('#flagEn').click(function(){
  $('#flagSv').show();
  $('.instrSv').hide();
  $('.instrEn').show();
  $('#flagEn').hide();
});
