function start(button){

    //text
    //sedish
    let ulText = $('<ul class = "langSv"/>');

    for(let tryGame in button){
        let li = $('<li/>');
        for(let langSv of button[tryGame].sv){
            li.append('<h5>' + langSv.head + '</h5>');
        }
        ulText.append(li);
    }
    $('main .tryIt').append(ulText);

    //english
    ulText = $('<ul class = "langEn"/>');

    for(let tryGame in button){
        let li = $('<li/>');
        for(let langEn of button[tryGame].en){
            li.append('<h5>' + langEn.head + '</h5>');
        }
        ulText.append(li);
    }
    $('main .tryIt').append(ulText);


    //buttons
    //Swedish
    let ulButton = $('<ul class = "langSv"/>');
    for(let tryGame in button){
        let li = $('<li/>');
        for(let langSv of button[tryGame].sv){
            li.append('<p>' + langSv.name + '</p>');
        }
        ulButton.append(li);
    }
    $('main .card-body a').append(ulButton);


    //English
    ulButton = $('<ul class = "langEn"/>');
    for(let tryGame in button){
        let li = $('<li/>');
        for(let langEn of button[tryGame].en){
            li.append('<p>' + langEn.name + '</p>');
        }
        ulButton.append(li);
    }
    $('main .card-body a').append(ulButton);
    
}
$.getJSON('/json/tryMeButton.json', start);


$('.engelska').click(function(){
    $('.langSv').hide();
    $('.langEn').show();
});

$('.sverige').click(function(){
    $('.langEn').hide();
    $('.langSv').show();
});