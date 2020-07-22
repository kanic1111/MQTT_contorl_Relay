const express = require('express');
const app = express();
const Readline = require('@serialport/parser-readline')
const parser = new Readline()
var SerialPort = require("serialport");
var arduinoCOMPort = "COM4";
var arduinoport = new SerialPort(arduinoCOMPort, {baudRate: 9600}).setEncoding('utf8');
var i;
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.43.129')
arduinoport.on("open", () => {
  console.log('serial port open');
},20);
client.on('connect', function () {
  client.subscribe('arduino', function (err) {
  })
})
client.on('message', function (topic, message) {
  arduinoport.write(message, (err) => {
    if (err) {
        return console.log('written error:',err.message);
      }
    console.log('message written')
      });
      console.log(message.toString())
    })
  arduinoport.pipe(parser)
  parser.on('data', line =>{
      console.log(line)
  },1000)