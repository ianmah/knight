var express = require('express');
var socket = require('socket.io');

// App Setup
var app = express();
var server = app.listen(4000, function(){
  console.log('listening to requests on port 4000');
});

// Static fils
app.use(express.static('public'));

// Socket Setup
var io = socket(server);

io.on('connection', function(socket){
  console.log('made socket connection ' + socket.id);

  socket.on('click', function(){
    console.log('clicked');
    io.emit('update')
  })

});
