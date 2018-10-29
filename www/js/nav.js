$.getJSON('/json/navFot.json', function (navData) {
    start(navData, true);
  });
  let navMenu = '';
  
  function start(navData, inSwedish) {
    navMenu = navData;
    let languageObject = navData.en;
    if (inSwedish == true) {
      languageObject = navData.sv
    }
    for (let className in languageObject) {
      $('nav .' + className + ', footer .' + className).text(languageObject[className])
      // example result: 'nav .home, footer .home'
    }
  }
  $('#engelska').on('click', function () {
    start(navMenu, false);
  });
  $('#svenska').on('click', function () {
    start(navMenu, true);
  });

  
  
  // Class active follow the click on links 
  $(".nav-link").on("click", function () {
    $("a.nav-link").removeClass("active");
    $(this).addClass("active");
  });