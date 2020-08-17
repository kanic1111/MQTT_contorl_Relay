const express = require('express');
const app = express();
const Readline = require('@serialport/parser-readline')
const parser = new Readline()
const WebSocket = require('ws');
const SocketServer = require('ws').Server
var SerialPort = require("serialport");
var arduinoCOMPort = "/dev/ttyACM0";
var arduinoport = new SerialPort(arduinoCOMPort, {baudRate: 9600}).setEncoding('utf8');
var mqtt = require('mqtt')
var data
const delay = require('delay');
const wss = new WebSocket.Server({ port: 1884 });
const client  = mqtt.connect('mqtt://127.0.0.1')

arduinoport.on("open", () => {
  console.log('serial port open');
},10);
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log(message)
    arduinoport.write(message, (err) => {
      if (err) {
          return console.log('written error:',err.message);
        }
      console.log('message written')
        });
      }); 
    });
arduinoport.pipe(parser)
client.on('connect', function () {
  client.subscribe('arduino');
});
async function arduino_parser(){
parser.on('data', line =>{
  delay(1000)
  console.log(line)
  var Arduno_data = JSON.parse(line);
  // var data = Object.keys(Arduno_data) 
  var data_value = Object.values(Arduno_data)
  data = data_value;
  },100)
}
async function asyncCall() {
  await arduino_parser();
  const client  = mqtt.connect('mqtt://127.0.0.1')
  client.on('connect', function () {
    console.log(data);
    client.publish('7F_FAN',JSON.stringify(data))
    client.end()
  },100); 
}
arduino_parser()