var MongoClient = require('mongodb').MongoClient; 
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
setInterval(function(){
    arduinoport.write('g')
  },1000)
arduinoport.pipe(parser)
parser.on('data', line =>{
console.log(line)
  
    MongoClient.connect("mongodb://localhost:27017/var/lib/mongo", function (err, client) {
        if(err){
            console.log(err);
            console.log('connecting fail');
            return;
        }
        console.log('connecting');
        var db_client = client.db('sensor')
        var db_table = db_client.collection('person')
        console.log('connection success')
        db_client.collection('data',function(err,collection){
            if(err) throw err;
            collection.insertOne({ id:1, firstName:'Steve', lastName:'Jobs' });
            collection.insertOne({ id:2, firstName:'Bill', lastName:'Gates' });
        
            collection.countDocuments(function(err,count){
                if(err) throw err;
                console.log('Total Rows:'+count);
            });
        });
        db_table.find({}).toArray(function(err, result){
            if (err) throw err;
            console.log (result)
            client.close;
        }); 
    }); 
})