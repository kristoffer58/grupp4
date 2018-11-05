$.getJSON('/json/instructions.json', instructions);

let instructionData;

function instructions(instructionTrans) {
  instructionData = instructionTrans;
  lang = languageIsSwedish ? 'sv' : 'en';

  
  $('#instructionsModalCenter .modal-body').empty();
  $('#instructionsModalCenter .modal-body').append('<h5>' + instructionTrans.title[lang] + '</h5>');
  for (let desc of instructionTrans.desc[lang]) {
    let pTag = '<p>' + desc + '</p>';
    $('#instructionsModalCenter .modal-body').append(pTag);
  }
}

$('.flag').click(function () {
  instructions(instructionData);
});





