$(window).scroll(function() {
  if ($(document).scrollTop() > 100) {
    $('.nav-bar').addClass('shrink');
  } else {
    $('.nav-bar').removeClass('shrink');
  }
});

//padding of page content
var shiftWindow = function() {
  scrollBy(0, -66);
};

if (location.hash) shiftWindow();
window.addEventListener('hashchange', shiftWindow);
