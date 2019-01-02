var express = require('express');
var socket = require('socket.io');

// App Setup
var app = express();
var server = app.listen(4000, function(){
  console.log('listening to requests on port 4000');
});

// Static fils
app.use(express.static('public'));

var users = [];
var players = [];

// Socket Setup
var io = socket(server);

io.on('connection', function(socket){
  console.log('made socket connection ' + socket.id);
  users.push(socket.id)
  console.log(users);
  io.to(socket.id).emit('id', socket.id);

  socket.on('playerUpdate', function(data){
    if (data.id == users[0]){
      socket.broadcast.emit('update', data)
    }
  })

  socket.on('playerNew', function(data){
    players.push(data);
    console.log('added player: ' + data)
  })

});
