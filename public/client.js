// Make Connection

var url = window.location.host;
var socket = io.connect('http://' + url)

console.log(url)
