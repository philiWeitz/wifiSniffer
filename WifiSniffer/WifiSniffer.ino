
#include <ESP8266WiFi.h>
#include "./functions.h"
#include "./serialUtil.h"
#include "./clientUtil.h"

#define disable 0
#define enable  1

// LOOP,1,12$
// DEVICES$

unsigned long cleanClientTimer = 0;

void setup() {
  Serial.begin(500000);

  wifi_set_opmode(STATION_MODE);
  wifi_set_channel(1);
  wifi_promiscuous_enable(disable);
  wifi_set_promiscuous_rx_cb(promisc_cb);
  wifi_promiscuous_enable(enable);
}


void loop() {

  if(cleanClientTimer < millis()) {
    removeOldClients();
    cleanClientTimer = millis() + 30000;
  }
  
  readSerialInput();
  executeAction();
}

