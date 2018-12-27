// Make Connection

var url = window.location.host;
var socket = io.connect('http://' + url)

console.log(url)
// var socket = io.connect('http://localhost:4000')


// Query DOM
var send = document.getElementById('send');


$(function(){
  //$('#scoreboard').hide()
});


// Emit events
send.addEventListener('click', function(){
  console.log('hi')
  socket.emit('click')
})

// Listen for addEventListener
socket.on('update', function(){
  game.innerHTML += '<p>Hi</p>';
  //$('#word').show()
})
