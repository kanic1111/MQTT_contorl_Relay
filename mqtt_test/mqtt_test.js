var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://127.0.0.1:1883')
const Readline = require('@serialport/parser-readline')
var SerialPort = require("serialport");
const parser = new Readline()
// var arduinoCOMPort = "/dev/ttyUSB0";
// var arduinoport = new SerialPort(arduinoCOMPort, {baudRate: 9600}).setEncoding('utf8');
var MongoClient=require('mongodb').MongoClient, assert = require('assert');;
const request = require('request-promise');
var CO2sum
MongoClient.connect("mongodb://127.0.0.1:27017/test",function(err,client){
    if(err){
        console.log(err);
        console.log('connecting fail');
        return;
    }
    console.log('connecting');
    let udate = new Date();
    let nowtime = udate.toLocaleString('zh-hant', { timeZone: 'Asia/Taipei' })
    var db_client = client.db('data_test')
    var db_table = db_client.collection('data')
    // console.log('connection success')
    // for(var i=0 ; i<Sensor_key.length;i++){
    db_client.collection('data',function(err,collection){
this.avgPower = function (col) {
    return new Promise(function (resolve, reject) {
        let collection = db.collection(col);
        let sumPower = 0
        collection.aggregate(
            [
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%G/%m/%d",
                                date: "$time",
                                timezone: "Asia/Taipei"
                            }
                        },
                        avgPower: { $avg: "$power" }
                    }
                },
                { $sort: { _id: -1 } }
            ], (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(data);
                    if (data.length != 0) {
                        data.map((obj) => {
                            // 將平均功耗 * 24 hr
                            sumPower += obj.avgPower * 24
                        })
                    }
                    console.log(`${col}:${sumPower}`)
                    resolve(sumPower);
                }
            });
    });
};
    });
});

let push = async () => {
    data = await this.avgPower('CO2');
    return data;
}
console.log(push())