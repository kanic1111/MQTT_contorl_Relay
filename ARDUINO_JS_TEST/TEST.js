var SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')
const parser = new Readline()
var port = new SerialPort('COM5',{ autoOpen: false,
    baudRate: 9600,
    dataBits: 8, 
    parity: 'none', 
    stopBits: 1, 
    flowControl: false,
})
port.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message);
    }
    setTimeout(function() {
        port.write('a');
        setTimeout(function(){
            port.write('b');
        },2000)   
}, 2000);

});
var bufs = [];

port.on('data', function (buf) {
    bufs.push(buf.toString("utf-8"));
    console.log("from arduino:-->"+buf.toString("utf-8"))
    console.log(bufs)
    if(buf.toString("utf-8")=='a\r'){ 
        console.log("get a")
    }
});
port.on('end', function (buf) {
    console.log(buf)
    var buf = Buffer.concat(bufs);
    console.log(buf)
});   
