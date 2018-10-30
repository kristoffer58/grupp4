function instructions(instrTrans) {
    // swedish instructions
    let ul = $('<ul class="langSv"/>');
    for (let explanation in instrTrans) {
        let li = $('<li/>');
        for (let langSv of instrTrans[explanation].sv) {
            li.append('<p>' + langSv.desc + '</p>');
        }
        ul.append(li);
        $('.modal-body').append(ul);


        // english instructions
        ul = $('<ul class="langEn"/>');
        for (let explanation in instrTrans) {
            let li = $('<li/>');
            for (let langEn of instrTrans[explanation].en) {
                li.append('<p>' + langEn.desc + '</p>');
            }
            ul.append(li);
        }
        $('.modal-body').append(ul);
    }
}
$.getJSON('/json/instructions.json', instructions);




/*
function instruct(instructionTrans) {
  jsonData = instructionTrans;
  let lang = langIsSwedish ? 'sv' : 'en';

  $('.modal-body h1').text(instructionTrans.title[lang]);

  $('.modal-body').empty();
  for (let text of instructionTrans.text[lang]) {
    let pTag = '<p>' + text + '</p>';
    $('.modal-body').append(pTag);
  }
}

$('.flag').click(function () {
  $('#engelska').toggle();
  $('#sverige').toggle();
  langIsSwedish = !langIsSwedish;
  instruct(jsonData);
});
*/




