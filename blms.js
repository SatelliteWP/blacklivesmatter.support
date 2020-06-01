var blms_debug = true;
var e = document.getElementsByTagName('html');
if (e.length == 1) {
  if ((blms_location() && blms_date()) || blms_is_forced()) {
    e[0].setAttribute("style", "-moz-filter: grayscale(100%); -webkit-filter: grayscale(100%); filter: gray; filter: grayscale(100%);");
  }
}
else {
  blms_debug ? console.log('No HTML tag') : '';
}


function blms_location() {
  if (typeof force_blms !== 'undefined' && force_blms) {
    blms_debug ? console.log('Variable force_blms set to true.') : '';
    return true;
  }
  
  if ('/' == window.location.pathname) {
    blms_debug ? console.log('You are on the homepage.') : '';
    return true;
  }
  blms_debug ? console.log('Not the right location') : '';
  return false;
}

function blms_date() {
  var d = new Date();
  if (d.getMonth() == 5 && (d.getDate() == 11 || d.getDate() == 12)) {
    blms_debug ? console.log('It is BLMS day!') : '';
    return true;
  }
  blms_debug ? console.log('Not BLMS day.') : '';
  return false;
}

function blms_is_forced() {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == 'blms_force') {
      blms_debug ? console.log('blms_force found in the URL') : '';
      return true;
    }
  }
  blms_debug ? console.log('blms_force not found in the URL') : '';
  return false;
}
