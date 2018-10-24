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
      //this will be optimized changes current site to active in navbar
      $('.history').removeClass('active');
      $('.play-game').removeClass('active');
      $('.home').addClass('active');
      changeActiveLink('/');
    },
    '/history': () => {
      $('body main > *').hide(); $('.Historia').show();
      //this will be optimized changes current site to active in navbar
      $('.home').removeClass('active');
      $('.play-game').removeClass('active');
      $('.history').addClass('active');
      changeActiveLink('/');
    },
    '/game': () => {
      $('body main > *').hide(); $('.Spela').show();
      //this will be optimized changes current site to active in navbar
      $('.home').removeClass('active');
      $('.history').removeClass('active');
      $('.play-game').addClass('active');
      changeActiveLink('/');
      loadGame();
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


//Still working on it Lukas
// optymized ver of active class change in nav bar 
function changeActiveLink(activeLink) {

  let links = $("a").toArray();
  console.log(links.toString());

}