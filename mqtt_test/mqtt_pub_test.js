var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.43.129')
client.on('connect', function () {
    client.publish('presence', 'Relay2')
    client.end()
  })
   