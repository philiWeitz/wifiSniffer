#include <Arduino.h>
#include "wifiUtil.h"
#include "serialReader.h"

unsigned long configTimer = 0;
unsigned long deviceReadTimer = 0;

void setup() {
  Serial.begin(500000);
  setupWifiClient();
}

void loop() {
  if(configTimer < millis()) {
    getConfig();
    configTimer = millis() + 10 * 1000;
  }

  if(deviceReadTimer < millis()) {
    Serial.print("DEVICES$");
    deviceReadTimer = millis() + snifferConfig.devicePollingTimeInMs;
  }  
  
  readInput();
}

