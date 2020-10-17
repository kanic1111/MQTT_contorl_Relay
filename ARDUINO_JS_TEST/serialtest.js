const Readline = require('@serialport/parser-readline')
var SerialPort = require("serialport");
const parser = new Readline()
var arduinoCOMPort = "/dev/ttyACM0";
var arduinoport = new SerialPort(arduinoCOMPort, {baudRate: 9600}).setEncoding('utf8');

arduinoport.on("open", (err) => {  
    console.log('serial port open');
    if(err){
        console.log("no serial device found")
    }
  },20);
arduinoport.pipe(parser)
parser.on('data', line =>{
console.log(line)

})
setInterval(function(){
    arduinoport.write('g')
  },1000)
