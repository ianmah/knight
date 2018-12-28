// Make Connection

var url = window.location.host;
var socket = io.connect('http://' + url)

console.log(url)


$(function(){
  //$('#scoreboard').hide()
});

// Listen for addEventListener
socket.on('update', function(){
  game.innerHTML += '<p>Hi</p>';
  //$('#word').show()
})
