$.getJSON('/json/instructions.json', start);

function start(instrTrans){

let ul = $('<ul class="instrSv"/>');
for(let explanation in instrTrans){
    let li = $('<li/>');
    for(let langSv of instrTrans[explanation].sv){
        li.append('<h4>' + langSv.desc + '</h4>');
    }
    
    $('main').append(ul);

    // english instructions
    ul = $('<ul class="instrEn"/>');
for(let explanation in instrTrans){
    let li = $('<li/>');
    for(let langEn of instrTrans[explanation].en){
        li.append('<h4>' + langEn.desc + '</h4>');
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
