var express = require('express'); // Get the module
var app = express(); // Create express by calling the prototype in var express
/*var http = require('http').Server(app);
var io = require('socket.io')(http);*/
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//server.listen(3000);

var state=[];

var users=[];

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

function randomString(length) {
    chars="qweiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
// getAllChanges=function(to){
//   for(subj in state){
//     for(change in state[subj]){
//       //pendiente:probably this is being sent to all users. It should only send to the incoming user
//       socket.emit(change,state[subj][change]);
//       console.log("init"+change,state[subj][change]);
//     }
//   }
// };
io.on('connection', function(socket){

  //user connection protocol
  console.log('a user connected');
  var id=randomString(Math.random()*80);
  var pos=users.push(id)-1;
  console.log('given the '+id+' id at'+pos);
  io.emit('new user',id);
  socket.emit('hello',id,users);
  for(subj in state){
    console.log("init"+subj,state[subj]);
    for(change in subj){
      //pendiente:probably this is being sent to all users. It should only send to the incoming user
      socket.emit(change,state[subj][change]);
      console.log("-init"+change,state[subj][change]);
    }
  }

  socket.on('disconnect', function(){
    console.log('user disconnected');
    users.splice(pos,1);
    io.emit('disconnect',id);
    console.log(state)
  });
  socket.on('change', function(msg){
    console.log(msg);
    //pendant: check if this method only broadcasts to others and not the sender
    socket.broadcast.emit('change',msg);
    state[msg.to]=[];
    state[msg.to][msg.change];
    state[msg.to][msg.change]=msg.val;
  });
  socket.on('sons', function(msg){
    console.log(msg);
    //pendant: check if this method only broadcasts to others and not the sender
    socket.broadcast.emit('sons',msg);
    saveState('sons',msg);
  });
  socket.on('pos', function(msg){
    console.log(msg);
    socket.broadcast.emit('pos',msg);
  });
  socket.on('update', function(who,msg){
    //console.log('update: '+ who +" sent "+ msg);
    socket.broadcast.emit('update',who, msg);
  });
  socket.on('del', function(who,msg){
    //console.log('update: '+ who +" sent "+ msg);
    socket.broadcast.emit('del',who, msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

/*

io.on('connection', function(socket){
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
});
server.listen(3000);
toupéadd that code it works
toupéStarting with 3.0, express applications have become request handler
functions that you pass to http or http Server instances. You need to pass
 the Server to socket.io, and not the express application function.}




 var app = require('koa')();
  var server = require('http').createServer(app.callback());
var io = require('socket.io')(server); io.on('connection', function(){
 }); server.listen(3000);*/
