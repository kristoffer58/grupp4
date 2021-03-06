$.getJSON('/json/history.json', write);
let jsonData;
let languageIsSwedish = true;

function write(historyTrans) {
  jsonData = historyTrans;
  let lang = languageIsSwedish ? 'sv' : 'en';

  $('.historic h1').text(historyTrans.title[lang]);

  $('.historic article').empty();
  for (let text of historyTrans.text[lang]) {
    let pTag = '<p>' + text + '</p>';
    $('.historic article').append(pTag);
  }
}

$('.flag').click(function () {
  languageIsSwedish = !languageIsSwedish;
  write(jsonData);
});




