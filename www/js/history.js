$.getJSON('/json/history.json', write);
let jsonData;
let languageIsSwedish;
function write(historyTrans) {
  jsonData = historyTrans;
  let lang = languageIsSwedish ? 'sv' : 'en';

  $('.historic h4').text(historyTrans.title[lang]);

  $('.historic article').empty();
  for (let text of historyTrans.text[lang]) {
    let pTag = '<p>' + text + '</p>';
    $('.historic article').append(pTag);
  }
}

$('.flag').click(function () {
  $('#engelska').toggle();
  $('#sverige').toggle();
  
   
  languageIsSwedish = !languageIsSwedish;
  write(jsonData);
});

