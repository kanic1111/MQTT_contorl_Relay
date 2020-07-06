char receivedChar;
int RELAY1 = 2;
int RELAY2 = 3;
int RELAY3 = 4;
int RELAY4 = 5;
int VCC = 6 ;
char getstr; 

void setup() 
{ 
  Serial.begin(9600); 
  pinMode(VCC, OUTPUT); 
  pinMode(RELAY1, OUTPUT); 
  pinMode(RELAY2, OUTPUT);
  pinMode(RELAY3, OUTPUT);
  pinMode(RELAY4, OUTPUT);
}
void loop() 
{ 
  while(Serial.available()>0){
    receivedChar = Serial.read();
    Serial.println(receivedChar); 
    if(receivedChar=='1')
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
