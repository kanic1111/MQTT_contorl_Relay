var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://127.0.0.1:1883')
const Readline = require('@serialport/parser-readline')
var SerialPort = require("serialport");
const parser = new Readline()
var arduinoCOMPort = "/dev/ttyUSB0";
var arduinoport = new SerialPort(arduinoCOMPort, {baudRate: 9600}).setEncoding('utf8');
var MongoClient=require('mongodb').MongoClient, assert = require('assert');;
const request = require('request-promise');
const { Console } = require('console');
var yesterdayStart = new Date(new Date(new Date().setHours(new Date().getHours()-1,00,00 )) );
var yesterdayEnd = new Date(new Date(new Date().setHours(new Date().getHours(),00,00 )) );
var lasttime = yesterdayStart.toLocaleString('zh-hant', { timeZone: 'Asia/Taipei' })
var nowtime = yesterdayEnd.toLocaleString('zh-hant', { timeZone: 'Asia/Taipei' })
var CO2avg,TVOCavg
console.log(lasttime)
console.log(nowtime)
arduinoport.on("open", (err) => {  
  console.log('serial port open'); //成功連接時印出port open
  if(err){
      console.log("no serial device found")//失敗時印出 device not found
  }
},20);
arduinoport.pipe(parser)
parser.on('data', line =>{
  console.log(line)
  Arduno_data = JSON.parse(line);
  Sensor_data = Object.values(Arduno_data)
  Sensor_key = Object.keys(Arduno_data)
  console.log(Sensor_key)
  console.log(Sensor_data)
  push()
})
//   for(var i=0 ; i<Sensor_key.length;i++){
//     switch (Sensor_key[i]) {
//       case 'CO2':
//         console.log(Sensor_data[i])
//         client.publish('CO2', JSON.stringify(Sensor_data[i]))
//         // Sensor_data[i]
//         break;
//       case 'TVOC':
//         console.log(Sensor_data[i])
//         client.publish('TVOC', JSON.stringify(Sensor_data[i]))
//         break;
//       case 'tempareture':
//         console.log(Sensor_data[i])
//         client.publish('tempareture', JSON.stringify(Sensor_data[i]))
//         break;
//       case 'humid':
//         console.log(Sensor_data[i])
//         client.publish('humid', JSON.stringify(Sensor_data[i]))
//         break;
//       default:
//         console.log('pass');
//     }

//   }
// let push = async () => {
  MongoClient.connect("mongodb://127.0.0.1:27017/test", function(err,client){
    if(err){
        console.log(err);
        console.log('connecting fail');
        return;
    }
    console.log('connecting');
    setInterval(function(){
      var yesterdayStart = new Date(new Date(new Date().setHours(new Date().getHours()-1,00,00 )) );
      var yesterdayEnd = new Date(new Date(new Date().setHours(new Date().getHours(),00,00 )) );
    lasttime = yesterdayStart.toLocaleString('zh-hant', { timeZone: 'Asia/Taipei' })
    nowtime = yesterdayEnd.toLocaleString('zh-hant', { timeZone: 'Asia/Taipei' })
    console.log(lasttime)
    console.log(nowtime)
  },3600000)
    let udate = new Date();
    let time = udate.toLocaleString('zh-hant', { timeZone: 'Asia/Taipei' })
    var db_client = client.db('data_test')
    var db_table = db_client.collection('data')
    // console.log('connection success')
    push()
let push = async () => {
    db_client.collection('data',async function(err,collection){
      for(var i=0 ; i<Sensor_key.length;i++){
    collection.insertOne({ time:time, name:Sensor_key[i], data:Sensor_data[i] });
      }
    // if(i == Sensor_key.length-1 ){
    //   collection.countDocuments(function(err,count){
    //     if(err) throw err;
    //     console.log('Total Rows:'+count);
    // });
    // collection.find({time:nowtime}).toArray(function(err,items){
      var getCO2Avg = await collection.aggregate([
        { $match: {'time': {"$gte": lasttime, "$lte": nowtime},'name':'CO2' } },
        {
          $group: {
            _id: "$name",
            avg: {
              $avg: "$data" // in the dataset, each doc has a value field which equals a number
            }
          }
        }
      ]).toArray();
      var getTVOCAvg = await collection.aggregate([
        { $match: {'time': {"$gte": lasttime, "$lte": nowtime},'name':'TVOC' } },
        {
          $group: {_id: "$name",avg: {$avg: "$data" }}
        }
      ]).toArray();
      CO2avg = Math.round(getCO2Avg[0].avg*100)/100
      TVOCavg = Math.round(getTVOCAvg[0].avg*100)/100

      console.log(CO2avg)
      console.log(TVOCavg)

      // console.log(getTVOCAvg[0].avg);
            
    // );
      // collection.aggregate(
      //   [
      //       {
      //           $group: {
      //               _id: {
      //                 $match: {'time': {$gt: '9/22/2020, 00:00:00 PM', $lt:'9/23/2020, 00:00:00 PM'}}
      //               },
      //               avgPower: { $avg: "data" }
      //           }
      //       },
      //       { $sort: {} }
      //   ], (err, data) => {
      //       if (err) {
      //           console.log(err);
      //           reject(err);
      //       } else {
      //           console.log(data);
      //           if (data.length != 0) {
      //               data.map((obj) => {
      //                   // 將平均功耗 * 24 hr
      //                   CO2sum += obj.avgPower * 24
      //               })
      //           }
      //           console.log(`${CO2sum}`)
      //           // resolve(CO2sum);
      //       }
      //   });
        // collection.aggregate([{$group : {_id : "$name", datasum : {$sum : 1}}}],

        //   function(err, results) {
        //       assert.equal(err, null);
      
        //       console.log(results)
        //     }
        // );
       collection.find({'time': {"$gte": lasttime, "$lte": nowtime},'name':'CO2' }).toArray(function(err,items){
      if(err) throw err;
      for(i=0 ; i<items.length-1; i++){
        
        var sum = 0
        sum = sum + items[i].data
        let avgCO2 = (sum/items.length)
        // console.log(avgCO2)
        // console.log(sum)
        if(i = items.length-1){
          console.log(items[i]);
        }
      }
      console.log("DATA FOUND");
    });
  // }
  });
  // }
  // time:nowtime
}
  })
// }
// push()
if(Sensor_key[0] == 'CO2'){
  Sensordata = {
      method: 'POST',
      uri: 'http://127.0.0.1:30001/insert' ,
      headers: {
          'Content-Type': 'application/json'  
      },
      body: {
          mac : "3024324b3a84",
          "sensorData" : {
              "CO2" : Sensor_data[0],
              "TVOC" : Sensor_data[1],
              "CO2平均" : CO2avg,
              "TVOC平均" : TVOCavg,
          }
      },
          json: true        
  }
}
request(Sensordata).then(function (response) {
  console.log(response)
  console.log("post success")
}).catch(function (err) {
  console.error(err);
  });
      
   
setInterval(function(){
  arduinoport.write('g')
},5000)