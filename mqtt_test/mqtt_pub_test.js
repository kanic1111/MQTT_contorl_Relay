var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.43.129')
client.on('connect', function () {
    client.publish('7F_FAN', '1')
    client.end()
  })
   