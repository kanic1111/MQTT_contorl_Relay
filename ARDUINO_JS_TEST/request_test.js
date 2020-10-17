const Readline = require('@serialport/parser-readline')
const parser = new Readline()
// var SerialPort = require("serialport");
// var arduinoCOMPort = "/dev/ttyACM0";
// var arduinoport = new SerialPort(arduinoCOMPort, {baudRate: 9600}).setEncoding('utf8');
const os = require('os');
const { Console } = require('console');
const request = require('request-promise');
const Router = require('koa-router');
const router = Router();
var ip = 'ip' 
var mac = 'mac'
var mac_check
var Sensor_data , Sensor_key , fandata
// arduinoport.on("open", (err) => { 
//     console.log('serial port open');
//     if(err){
//         console.log("no serial device found")
//     }
//   },20); 
function getLocalnetstate(data) {
    const interfaces = os.networkInterfaces();
    const addresses = [];

Object.keys(interfaces).forEach((netInterface) => {
    interfaces[netInterface].forEach((interfaceObject) => {
     if (interfaceObject.family === 'IPv4' && !interfaceObject.internal) {
         if(data == 'mac'){
            addresses.push(interfaceObject.mac);
            }  
         if(data == 'ip'){
            addresses.push(interfaceObject.address);
        }
     }
    });
   });
   return addresses;
  }

var localmac = getLocalnetstate(mac).toString()
var localip = getLocalnetstate(ip).toString()
console.log(localmac)
console.log(localip)
var mac_value = localmac.replace(/:/g ,'');
console.log(mac_value)
var device = { ip : localip , mac : localmac}
console.log (JSON.stringify(device))
setInterval(function(){
    if(mac_check != "OK")
    {
    let devicedata = {
        method: 'GET',
        uri: 'http://127.0.0.1:30001/devices' ,
        headers: {
            'Content-Type': 'application/json'
        },
            json: true
        }   
    request(devicedata).then(function (message) {
        if(message == '')
        {
            console.log("no mac found regist one")
            let deviceinsertdata = {
                method: 'POST',
                uri: 'http://127.0.0.1:30001/devices' ,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    ip : localip , mac : localmac
                },
                    json: true
                } 
            request(deviceinsertdata).then(function (response) {
                console.log(response)
                console.log("post success")
                mac_check = "OK"
            }).catch(function (err) {
                console.error(err);
            });
        }
        else if(mac_check != "OK"){
            var mac_number = Object.keys(message)
            console.log(message);
            for (var key in mac_number) {
            console.log(message[key].mac)
            if (message[key].mac = localmac){
                mac_check = "OK"
                console.log("device mac found")   
                }
            else{
                mac_check = "NO"
                console.log("mac not found searching another one")
                }
            }
        }
        if(mac_check == "NO")
        {
            console.log("no mac found regist one")
            let deviceinsertdata = {
                method: 'POST',
                uri: 'http://127.0.0.1:30001/devices' ,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    ip : localip , mac : localmac
                },
                    json: true
                } 
            request(deviceinsertdata).then(function (response) {
                console.log(response)
                console.log("post success")
                mac_check = "OK"
            }).catch(function (err) {
                console.error(err);
            });
        }
        console.log(mac_check)
        }).catch(function (err) {
            console.error(err);
            });
    }
},5000)
// arduinoport.pipe(parser)
// setInterval(function(){
//     arduinoport.write('s')
//   },1000)
// parser.on('data', line =>{
//     console.log(line)
//     Arduno_data = JSON.parse(line);
//     console.log(Arduno_data)
//     Sensor_key = Object.keys(Arduno_data)
//     Sensor_data = Object.values(Arduno_data)
//         console.log(Sensor_key)
//         console.log(Sensor_data)
//         // push()
// },)
// let push = async () => {
//     if(Sensor_key[0] == '風扇1'){
//         fandata = {
//             method: 'POST',
//             uri: 'http://127.0.0.1:30001/insert' ,
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: {
//                 mac : localmac,
//                 "sensorData" : {
//                     "風扇1" : Sensor_data[0],
//                     "風扇2" : Sensor_data[1],
//                     "風扇3" : Sensor_data[2],
//                     "風扇4" : Sensor_data[3],
//                     "二氧化碳" : Sensor_data[4],
//                     "揮發性有機物" : Sensor_data[5],
//                 }
//             },
//                 json: true        
//         }
//     }
//     request(fandata).then(function (response) {
//         console.log(response)
//         console.log("post success")
//     }).catch(function (err) {
//         console.error(err);
//         });
            
//     }
// router.post('/7F_left_fan', SevenFloor_left_fan);
// router.post('/7F_right_fan', SevenFloor_right_fan);
// async function SevenFloor_left_fan(ctx) {
//     let fan_control = ctx.request.body.data;
//     switch (fan_control){
//         case 'fan1':
//             if(fanStatus[0] != '正轉' && fanStatus[0] != '反轉'){
//                 mqttClient.publish('arduino', '1');
//             }
//             if(fanStatus[0] != '關閉' && fanStatus[0] != '反轉'){
//                 mqttClient.publish('arduino', '2');
//             }
//             if(fanStatus[0] != '正轉' && fanStatus[0] != '關閉'){
//                 mqttClient.publish('arduino', 'a');
//             }
//             break;
//         case 'fan2':
//             if(fanStatus[1] != '正轉' && fanStatus[1] != '反轉'){
//                 mqttClient.publish('arduino', '3');
//             }
//             if(fanStatus[1] != '關閉' && fanStatus[1] != '反轉'){
//                 mqttClient.publish('arduino', '4');
//             }
//             if(fanStatus[1] != '正轉' && fanStatus[1] != '關閉'){
//                 mqttClient.publish('arduino', 'b');
//             }
//             break;
//     }
// }
// async function SevenFloor_right_fan(ctx) {
//     let fan_control = ctx.request.body.data;
//     switch (fan_control){
//         case 'fan3':
//             if(fanStatus2[0] != '正轉' && fanStatus2[0] != '反轉'){
//                 mqttClient.publish('arduino', '5');
//             }
//             if(fanStatus2[0] != '關閉' && fanStatus2[0] != '反轉'){
//                 mqttClient.publish('arduino', '6');
//             }
//             if(fanStatus2[0] != '正轉' && fanStatus2[0] != '關閉'){
//                 mqttClient.publish('arduino', 'c');
//             }
//             break;
//         case 'fan4':
//             if(fanStatus2[1] != '正轉' && fanStatus2[1] != '反轉'){
//                 mqttClient.publish('arduino', '7');
//             }
//             if(fanStatus2[1] != '關閉' && fanStatus2[1] != '反轉'){
//                 mqttClient.publish('arduino', '8');
//             }
//             if(fanStatus2[1] != '正轉' && fanStatus2[1] != '關閉'){
//                 mqttClient.publish('arduino', 'd');
//             }
//             break;
//     }
// }
