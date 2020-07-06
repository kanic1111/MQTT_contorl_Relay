var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.43.129')
 
client.on('connect', function () {
  client.subscribe('presence', function (err) {

  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})