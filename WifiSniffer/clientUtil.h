
#ifndef __CLIENT_UTIL_H__
#define __CLIENT_UTIL_H__

#include <list>

#include "./structures.h"
#include "./structures.h"
#include "./ioUtil.h"

std::list<clientinfo> clientList;


clientinfo* findDeviceInList(const String station) {
  for (std::list<clientinfo>::iterator it = clientList.begin(); it != clientList.end(); it++) {
    if(station == it->station) {
      return &*it;
    }
  }
  return NULL;  
}


void addDevice(const clientinfo ci) {
  clientinfo* device = findDeviceInList(ci.station);

  // add new client
  if(device == NULL) {
    clientList.push_back(ci);

  } else {
    device->timeStamp = millis();
    device->rssi = ci.rssi;
  }
}


// might courses exceptions!
void removeOldClients() {
  // TODO: It would be more save to use cbegin and cend
  for (auto it = clientList.begin(); it != clientList.end();) {
    if((millis() - it->timeStamp) > 30000) {
      // potential memory leak here!
      clientList.erase(it);
    } else {
      ++it;
    }
  }
}


void printDeviceList(const String wifiSnifferId, const char stopChar) {
  for (std::list<clientinfo>::iterator it = clientList.begin(); it != clientList.end(); it++) {
    Serial.print("d,");   
    Serial.print(wifiSnifferId);
    Serial.print(",");
    Serial.print(it->station);
    Serial.print(",");
    Serial.print(it->rssi);
    Serial.print(",");
    Serial.print(millis() - it->timeStamp);
    Serial.print(";");
    delay(30);
  }
  Serial.print(stopChar);
}


#endif
