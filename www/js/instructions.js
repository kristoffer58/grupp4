function start(instructions){
    
console.log('we have json');

let ul = $('<ul/>');
for(let explanation of instructions){

    // append - add something
    // last inside me

    let li = $('<li/>');
    li.append('<h4>' + explanation.desc + '</h4>');

    li.append('<p class="none-yet">' + explanation.desc + '</p>');

    ul.append(li);

  }

  // jQuery grab the body element
  // and append the ul inside it
  $('body').append(ul);
}

$.getJSON('/json/instructions.json', start);