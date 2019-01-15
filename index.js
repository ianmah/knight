var express = require('express');
var socket = require('socket.io');
var uuidv4 = require('uuid/v4');

// App Setup
var app = express();
var server = app.listen(4000, function(){
  console.log('listening to requests on port 4000');
});

// Static fils
app.use(express.static('public'));

var players = [];  // list of usernames

// Socket Setup
var io = socket(server);

io.on('connection', function(socket){
  console.log('made socket connection ' + socket.id);
  io.to(socket.id).emit('id', socket.id);

  socket.on('newPlayer', function(data){
    if (!contains(data)){
      players.push({player: data});
      console.log(players)
      io.emit('newPlayer', data);
    } else {
      io.to(socket.id).emit('playerAlreadyExist');
    }
  })

  socket.on('disconnect', function(){
    console.log(socket.id + ' disconnected');
    socket.emit('disonnected', socket.id);
  })

});

function contains(player){
  for (i = 0; i < players.length; i++){
    if (players[i].player == player){
      return true;
    }
  }
  return false;
}

function find(player){
  for (i = 0; i < players.length; i++){
    if (players[i].player == player){
      return i;
    }
  }
  return -1;
}
