const path = require('path');
const express = require('express');
const http = require('http');
const SocketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = SocketIo.listen(server);

var long = -72.545545;
var lat = -38.703032;
// routes
app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
});


app.use(express.static(path.join(__dirname, 'public')));


const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('COM4', { baudRate: 9600 })
const parser = new Readline()
port.pipe(parser)

parser.on('data', function(data){
	console.log(data);
	var today = new Date();
  	io.emit('arduino:data', {date: today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear(), time: (today.getHours())+":"+(today.getMinutes()), temp:data, longitud:long,latitud:lat});
    long = long - 0.0001;
});

parser.on('err', function (data) {
  console.log(err.message);
});

server.listen(3000, () => {
  console.log('Server on port 3000');
});