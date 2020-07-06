# MQTT_contorl_Relay
### 練習用nodejs使用MQTT去控制arduino的繼電器

### 使用套件
npm install mqtt 
npm install serialport

### 使用4連繼電器
![](https://cdn.discordapp.com/attachments/625953483576705024/729622663026442240/DSC_0209.JPG)
繼電器 IN1 =d2
      IN2 =d3
      IN3 =d4
      IN4 =d5
      
### 繼電器原理
![](https://cdn.discordapp.com/attachments/625953483576705024/729623734146695198/b3-1.png)
繼電器IN低電位時會裡面的鐵片會往左切讓左邊的電路導通,而繼電器的燈會亮起來(依照不同的型號可能會不同)
而高電位會往右,燈會暗掉
利用這個原理可以來控制燈的亮暗,或是風扇的轉向(正轉或反轉)
#### 繼電器控制=LOW
![](https://cdn.discordapp.com/attachments/625953483576705024/729627810477506560/DSC_0212.JPG)
#### 繼電器控制=HIGH
![](https://cdn.discordapp.com/attachments/625953483576705024/729626539632885780/DSC_0211.JPG)
### aruduino 程式碼
``` c= char receivedChar;
int RELAY1 = 2; //繼電器IN1腳位 設為digital輸出腳2
int RELAY2 = 3; //繼電器IN2腳位 設為digital輸出腳3
int RELAY3 = 4; //繼電器IN3腳位 設為digital輸出腳4
int RELAY4 = 5; //繼電器IN4腳位 設為digital輸出腳5

void setup() 
{ 
  Serial.begin(9600); 
  pinMode(RELAY1, OUTPUT); //數位腳位設為輸出 
  pinMode(RELAY2, OUTPUT);
  pinMode(RELAY3, OUTPUT);
  pinMode(RELAY4, OUTPUT);
}
void loop() 
{ 
  while(Serial.available()>0){ //serial有連線到的時候執行內容
    receivedChar = Serial.read(); //把收到的值給receivedChar
    Serial.println(receivedChar); 
    if(receivedChar=='1') //收到的訊息=1時 D2輸出為HIGH
    {
      digitalWrite(RELAY1, HIGH );
      delay(300);
    }
    else if(receivedChar=='2')
      {
      digitalWrite(RELAY1, LOW );
      delay(300);
      }
    if(receivedChar=='3')
    {
      digitalWrite(RELAY2, HIGH );
      delay(300);
    }
    else if(receivedChar=='4')
    {
      digitalWrite(RELAY2, LOW );
      delay(300);
    }
    if(receivedChar=='5')
    {
      digitalWrite(RELAY3, HIGH );  
      delay(300);
    }
    else if(receivedChar=='6')
    {
      digitalWrite(RELAY3, LOW );
      delay(300);
    }
    if(receivedChar=='7')
    {
      digitalWrite(RELAY4, HIGH );
      delay(300);
    }
    else if (receivedChar=='8')
    {
      digitalWrite(RELAY4, LOW );
      delay(300);
    }    
  }
}
```
### serialport 和 mqtt sub程式碼
``` javascript=
const Readline = require('@serialport/parser-readline')
const parser = new Readline()
var SerialPort = require("serialport");
var arduinoCOMPort = "COM5";
var arduinoport = new SerialPort(arduinoCOMPort, {baudRate: 9600}) // arduino連線的COM port與鮑率(如果鮑率沒有一樣會連不到或是亂碼)
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.43.129') //MQTT連線的ip
arduinoport.on("open", () => {
  console.log('serial port open');// serial port連線到時顯示 serial port open
},20);
client.on('connect', function () {
  client.subscribe('presence', function (err) {
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
```
### mqtt_pub程式碼
``` javascript=
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.43.129')
client.on('connect', function () {
    client.publish('presence', '1357')
    client.end()
  })
```
目前還在測試arduino傳送後用陣列儲存如何轉成字串 (2020/7/6)
