var e = element.getElementsByTagName('html');
if (e.length == 1) {
  var l = window.location;
  var p = l.pathname;
  if ((blms_location() && blms_date()) || blms_is_forced()) {
    e[0].setAttribute("style", "-moz-filter: grayscale(100%); -webkit-filter: grayscale(100%); filter: gray; filter: grayscale(100%);");
  }
}

function blms_location() {
  if (typeof force_blms !== 'undefined' && force_blms) {
    return true;
  }
  
  if ('/' == window.location.pathname) {
    return true;
  }
  return false;
}

function blms_date() {
  var d = new Date();
  if (d.getMonth() == 5 && (d.getDate() == 11 || d.getDate() == 12)) {
    return true;
  }
  return false;
}

function blms_is_forced() {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == 'blms_force') {
      return true;
    }
  }
  return false;
}
