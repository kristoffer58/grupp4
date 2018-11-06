$(".Start .card img").on('click', function(){
  
  $('#cardsModal img').attr('src', $(this).attr('src'));
});

$("#cardsModal").on('click', function(){
  $("#cardsModal").hide();
});