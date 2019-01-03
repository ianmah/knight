// Make Connection

var url = window.location.host;
var socket = io.connect('http://' + url)

console.log(url)

setTimeout(function(){
  socket.emit('load')
}, 1000);
