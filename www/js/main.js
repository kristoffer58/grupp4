// For details: https://diveinto.html5doctor.com/history.html

// Clicks on links
$(document).on('click', 'a', function (e) {
  // assume all links starting with '/' are internal
  let link = $(this).attr('href');
  if (link.indexOf('/') === 0) {
    e.preventDefault(); // no hard reload of page
    history.pushState(null, null, link); // change url (no reload)
    frontendRouter(link); // tell the router
  }
});

// Listen to back/forward
window.addEventListener("popstate", () => {
  frontendRouter(location.pathname);
});

// On page load
frontendRouter(location.pathname);

// The router (do whatever you want here)
function frontendRouter(path) {
  let routes = {
    '/': () => {
      $('body main > *').hide(); $('.Start').show();
      changeActiveLink('home');
    },
    '/history': () => {
      $('body main > *').hide(); $('.Historia').show();
      changeActiveLink('history');
    },
    '/game': () => {
      $('body main > *').hide(); $('.Spela').show();
      changeActiveLink('play-game');
    },
    '/404': () => {
      $('body main > *').hide(); $('.the404').show();

    },
  };
  
  $('nav li a').removeClass('active');
  $('nav li a[href="' + path + '"]').addClass('active');
  // no path found then change path to '/404';
  path = routes[path] ? path : '/404';
  // run the function associated with the path
  routes[path]();
}

function changeActiveLink(activeLink) {
  let links = $("nav a");
  for(link in links){
    $(link).removeClass('active');
  }
  $(activeLink).addClass('active');
}

//translation
$('#engelska').click(function(){
  $('.langSv, .langSvInline').hide();
  $('.langEn').show();
  $('.langEnInline').css('display', 'inline-block');
  $('#engelska').hide();
  $('#svenska').show();
});

$('#svenska').click(function(){
  $('.langEn, .langEnInline').hide();
  $('.langSv').show();
  $('.langSvInline').css('display', 'inline-block');
  $('#engelska').show();
  $('#svenska').hide();
});