function start(instrTrans){

console.log('we have json');

let ul = $('<ul/>');
for(let explanation in instrTrans){

    // append - add something
    // last inside me

    let li = $('<li/>');

    for(let lnagSv of instrTrans[explanation].sv){
      
        li.append('<h4>' + lnagSv.desc + '</h4>');
    }

    for(let lnagEn of instrTrans[explanation].en){
        
        li.append('<h4>' + lnagEn.desc + '</h4>');
    }

    ul.append(li);

  }

  // jQuery grab the body element
  // and append the ul inside it
  $('body').append(ul);
}

$.getJSON('/json/instructions.json', start);