// Make Connection

var url = window.location.host;

var connectBtn = document.getElementById('connect');

connectBtn.addEventListener('click', connect);

function connect(){

  var socket = io.connect('http://' + url)

  console.log(url)

}
