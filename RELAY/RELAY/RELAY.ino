#include "DHT.h"
#define dhtPin 10
#define dhtType DHT22 
char receivedChar,data1,data2,data3,data4;
int state1,state2;
int RELAY1 = 2;
int RELAY2 = 3;
int RELAY3 = 4;
int RELAY4 = 5;
int RELAY5 = 6;
int RELAY6 = 7;
int RELAY7 = 8;
int RELAY8 = 9;
int n,VCC,i,count1,count2,count3,count4 = 0 ;
int prestate1,nextstate1,prestate2,nextstate2,prestate3,nextstate3,prestate4,nextstate4 ; 
DHT dht(dhtPin, dhtType);
void setup() 
{ 
  Serial.begin(9600); 
  dht.begin();
  pinMode(VCC, OUTPUT); 
    for(i=2;i<10;i++)
    {
      pinMode(i, OUTPUT);
      digitalWrite(i, HIGH);
    }
  
}
void loop() 
{ 
  while(Serial.available()>0){
  check_Relay();
  } 
}
void tempreceived_init()
{
  for(i=0;i<10;i++)
  {   
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    if (isnan(h)||isnan(t)){
      //Serial.print("無法讀取");
      delay(1000);
      return;
    }
    Serial.print("{\"Humidity\":"); 
    Serial.print(h, 1);
    Serial.print(",\"Temperature\":");
    Serial.print(t, 1);
    Serial.print("}\n");
    delay(1000);
  }
}
void check_Relay()
{
  receivedChar = Serial.read();
  Serial.println(receivedChar);
  if(receivedChar == '1' || receivedChar == '2')
  {
    count1=0;
    data1=receivedChar;
    relay1_control();
  }
  if(receivedChar == '3' || receivedChar == '4')
  {
    count2=0;
    data2=receivedChar;
    relay2_control();
  }
  if(receivedChar == '5' || receivedChar == '6')
  {
    count3=0;
    data3=receivedChar;
    relay3_control();
  }
  if(receivedChar == '7' || receivedChar == '8')
  {
    count4=0;
    data4=receivedChar;
    relay4_control();
  }
}
void relay1_control()
{
  if(data1=='1' && count1 == 0)
    { 
    count1 = 100;
    prestate1 = digitalRead(RELAY1);
    nextstate1 = digitalRead(RELAY2);
    digitalWrite(RELAY1, HIGH );
    digitalWrite(RELAY2, HIGH );
    for(count1;count1>0;count1)
    {
    //Serial.println(count1);
    delay(100);
    if(Serial.available()>0)
      {
       check_Relay();
      }
      Delay_count();
    }
    //Serial.println(count1);
    //Serial.println(prestate1 and nextstate1);
    //Serial.print("data:");
    //Serial.println(data1);
  if((prestate1 or nextstate1) == 1 && count1 == 0 && data1=='1' )
    {
    digitalWrite(RELAY1, LOW );
    digitalWrite(RELAY2, HIGH );
    //Serial.println("OK");
    data1='0';
    n=n-1;
      }  
    }
  if(receivedChar=='2' && count1 == 0)
  { 
    count1 = 100;
    prestate1 = digitalRead(RELAY2);
    nextstate1 = digitalRead(RELAY1);
    digitalWrite(RELAY1, HIGH );
    digitalWrite(RELAY2, HIGH );
    for(count1;count1>0;count1)
    {
    //Serial.println(count1);
    delay(100);
    if(Serial.available()>0)
      {
       check_Relay();
      }
      Delay_count();
    }
    //Serial.print("data1:");
    //Serial.println(data1); 
    if((prestate1 or nextstate1) == 1 && count1 == 0 && data1=='2' )
    {
      digitalWrite(RELAY2, LOW );
      digitalWrite(RELAY1, HIGH );
      //Serial.println("OK2");
      data1='0';
      n=n-1;
    }
  }
    //state1 = digitalRead(RELAY1);
    //state2 = digitalRead(RELAY2);
    //Serial.println(state1);
    //Serial.println(state2);
}
void relay2_control()
{
  if(data2=='3' && count2 == 0)
  { 
  count2 = 100;
  prestate2 = digitalRead(RELAY3);
  nextstate2 = digitalRead(RELAY4); 
  digitalWrite(RELAY3, HIGH );
  digitalWrite(RELAY4, HIGH );
    for(count2;count2>0;count2)
    {
    delay(100);
    if(Serial.available()>0)
      {
       check_Relay();
      }
      Delay_count();
    }
  if((prestate2 or nextstate2) == 1 && count2 == 0 && data2=='3' )
    {
    digitalWrite(RELAY3, LOW );
    digitalWrite(RELAY4, HIGH );
    data2='0';
    n=n-1;
      }  
    }
  if(data2=='4' && count2 == 0)
  { 
    count2 = 100;
    prestate2 = digitalRead(RELAY4);
    nextstate2 = digitalRead(RELAY3);  
    digitalWrite(RELAY3, HIGH );
    digitalWrite(RELAY4, HIGH );    
    for(count2;count2>0;count2)
    {
    delay(100);
    if(Serial.available()>0)
      {
       check_Relay();
      }
      Delay_count();
    }
    if((prestate2 or nextstate2) == 1 && count2 == 0 && data2=='4' )
    {
      digitalWrite(RELAY4, LOW );
      digitalWrite(RELAY3, HIGH );
      data2='0';
      n=n-1;    
    }
  }
}
void relay3_control()
{
  if(data3=='5' && count3 == 0)
  { 
  count3 = 100;
  prestate3 = digitalRead(RELAY5);
  nextstate3 = digitalRead(RELAY6);
  digitalWrite(RELAY5, HIGH );
  digitalWrite(RELAY6, HIGH ); 
    for(count3;count3>0;count3)//變數
    {
    delay(100);
    if(Serial.available()>0)
      {
       check_Relay();
      }
      Delay_count();
    }
  if((prestate3 or nextstate3) == 1 && count3 == 0 && data3=='5' )
    {
    digitalWrite(RELAY5, LOW );
    digitalWrite(RELAY6, HIGH );
    data3='0';
      }  
    }
  if(data3=='6' && count3 == 0)
  { 
    count3 = 100;
    prestate3 = digitalRead(RELAY6);
    nextstate3 = digitalRead(RELAY5);
    digitalWrite(RELAY5, HIGH );
    digitalWrite(RELAY6, HIGH );  
    for(count3;count3>0;count3)
    {
    delay(100);
    if(Serial.available()>0)
      {
       check_Relay();
      }
      Delay_count();
    }
    if((prestate3 or nextstate3) == 1 && count3 == 0 && data3=='6' )
    {
      digitalWrite(RELAY6, LOW );
      digitalWrite(RELAY5, HIGH );
      data3='0';
    }
  }
}
void relay4_control()
{
  if(data4=='7' && count4 == 0)
  { 
  count4 = 100;
  prestate4 = digitalRead(RELAY7);
  nextstate4 = digitalRead(RELAY8);
  digitalWrite(RELAY7, HIGH );
  digitalWrite(RELAY8, HIGH ); 
    for(count4;count4>0;count4)//變數
    {
    delay(100);
    if(Serial.available()>0)
      {
       check_Relay();
      }
      Delay_count();
    }
  if((prestate4 or nextstate4) == 1 && count4 == 0 && data4=='7' )
    {
    digitalWrite(RELAY7, LOW );
    digitalWrite(RELAY8, HIGH );
    data4='0';
      }  
    }
  if(data4=='8' && count4 == 0)
  { 
    count4 = 100;
    prestate4 = digitalRead(RELAY8);
    nextstate4 = digitalRead(RELAY7);
    digitalWrite(RELAY8, HIGH );
    digitalWrite(RELAY7, HIGH );  
    for(count4;count4>0;count4)
    {
    delay(100);
    if(Serial.available()>0)
      {
       check_Relay();
      }
      Delay_count();
    }
    if((prestate4 or nextstate4) == 1 && count4 == 0 && data4=='8' )
    {
      digitalWrite(RELAY8, LOW );
      digitalWrite(RELAY7, HIGH );
      data4='0';
    }
  }
}
void Delay_count()
{
  if(count1>0)
   count1--;
  if(count2>0)
   count2--;
  if(count3>0)
   count3--;
  if(count4>0)
   count4--; 
}
