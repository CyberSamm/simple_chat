var express = require('express');
const { connect } = require('http2');
const { userInfo } = require('os');
var app = express();
var server  = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

users = [];
connections = [];

io.sockets.on('connection', function(socket){
    console.log("connection success");
    connections.push(socket);

    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("disconnection success");
    });

    socket.on('send mess', function(data){
        io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});

    });
});