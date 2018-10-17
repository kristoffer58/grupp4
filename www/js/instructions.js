function start(instrTrans) {
    // swedish instructions
    let ul = $('<ul class="instrSv"/>');
    for (let explanation in instrTrans) {
        let li = $('<li/>');
        for (let langSv of instrTrans[explanation].sv) {
            li.append('<p>' + langSv.desc + '</p>');
        }
        ul.append(li);
        $('main').append(ul);


        // english instructions
        ul = $('<ul class="instrEn"/>');
        for (let explanation in instrTrans) {
            let li = $('<li/>');
            for (let langEn of instrTrans[explanation].en) {
                li.append('<p>' + langEn.desc + '</p>');
            }
            ul.append(li);
        }
        $('main').append(ul);
    }
}

    $.getJSON('/json/instructions.json', start);

    $('#flagSv').click(function () {
        $('#flagEn').show();
        $('.instrEn').hide();
        $('.instrSv').show();
        $('#flagSv').hide();
    });

    $('#flagEn').click(function () {
        $('#flagSv').show();
        $('.instrSv').hide();
        $('.instrEn').show();
        $('#flagEn').hide();
    });

