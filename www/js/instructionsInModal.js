(function($) {
    let infoModal = $('#myModal');
    $.getJSON('/json/instructions.json', instructions){
        $.ajax({ 
          type: "GET", 
          url: 'getJson.php?id='+$(this).data('id'),
          dataType: 'json',
          success: function(data){ 
            htmlData = '<ul><li>title: '+data.desc+'</li><li>age: '+data.age+'</li></ul>';
            infoModal.find('.modal-body').html(htmlData);
            infoModal.modal('show');
          }
        });

        return false;
    };
})(jQuery);