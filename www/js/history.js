$.getJSON('/json/history.json', start);
let jsonData;
let languageIsSwedish = true;

function start(historyTrans) {
  jsonData = historyTrans;
  let lang = languageIsSwedish ? 'sv' : 'en';

  $('.history h4').text(historyTrans.title[lang]);

  $('.history article').empty();
  for (let text of historyTrans.text[lang]) {
    let pTag = '<p>' + text + '</p>';
    $('.history article').append(pTag);
  }
}

$('#flagSv, #flagEn').click(function () {
  $('#flagEn').toggle();
  $('#flagSv').toggle();
  languageIsSwedish = !languageIsSwedish;
  start(jsonData);
});
