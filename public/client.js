// Make Connection

var url = window.location.host;
var socket = io.connect('http://' + url)

console.log(url)
// var socket = io.connect('http://localhost:4000')


// Query DOM
var jumpBtn = document.getElementById('up');
var leftBtn = document.getElementById('left');
var rightBtn = document.getElementById('right');


function touchHandler(e) {
    if(e.touches) {
        playerX = e.touches[0].pageX;
        playerY = e.touches[0].pageY;
        output.innerHTML = "Touch: "+ " x: " + playerX + ", y: " + playerY;
        e.preventDefault();
    }
}

document.addEventListener("touchstart", touchHandler);
document.addEventListener("touchmove", touchHandler);

$(function(){
  //$('#scoreboard').hide()
});

// Listen for addEventListener
socket.on('update', function(){
  game.innerHTML += '<p>Hi</p>';
  //$('#word').show()
})
