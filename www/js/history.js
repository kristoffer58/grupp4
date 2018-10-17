$.getJSON('/json/history.json', start);

function start(historyTrans) {

  let ul = $('<ul class="historySv"/>');

  for (let explanation in historyTrans) {

   
    for (let langSv of historyTrans[explanation].sv) {
      let li = $('<li/>');
      li.append('<p>' + langSv.desc + '</p>');
      ul.append(li);
    $('main').append(ul);
    }
  }

  // english instructions
  ul = $('<ul class="historyEn"/>');

  for (let explanation in historyTrans) {

    
    for (let langEn of historyTrans[explanation].en) {
      let li = $('<li/>');
      li.append('<p>' + langEn.desc + '</p>');

      ul.append(li);
    }
  }
  // jQuery grab the body element
  // and append the ul inside it
  $('main').append(ul);
}

$('historySv').hide();
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

