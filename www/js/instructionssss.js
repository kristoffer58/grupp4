function start(instrTrans) {
    let ul = $('<ul class="instrSv"/>');
    for (let explanation in instrTrans) {

        let li = $('<li/>');
        for (let langSv of instrTrans[explanation].sv) {
            li.append('<p>' + langSv.desc + '</p>');
            $('main').append(ul);
        }
    }
    
    // english instructions
    ul = $('<ul class="instrEn"/>');
    for (let explanation in instrTrans) {
        li = $('<li/>');
        for (let langEn of instrTrans[explanation].en) {
            li.append('<p>' + langEn.desc + '</p>');
            $('main').append(ul);
        }
    }
}

$('#flagSv').hide();

$('#flagSv').click(function () {
    $('#flagEn').show();
    $('.instrEn').hide();
    $('.instrSv').show();
    $('#flagSv').hide();
});

$('#flagEn').click(function () {
    $('#flagEn').hide();
    $('.instrEn').show();
    $('.instrSv').hide();
    $('#flagSv').show();
});