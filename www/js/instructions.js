$.getJSON('/json/instructions.json', instructions);

let instructionData;

function instructions(instructionTrans) {
  instructionData = instructionTrans;
  lang = languageIsSwedish ? 'sv' : 'en';

  
  $('#instructionsModal .modal-body').empty();
  $('#instructionsModal .modal-body').append('<h4>' + instructionTrans.title[lang] + '</h4>');
  for (let desc of instructionTrans.desc[lang]) {
    let pTag = '<p>' + desc + '</p>'
    $('#instructionsModal .modal-body').append(pTag);
  }
}

$('.flag').click(function () {
  instructions(instructionData);
});





