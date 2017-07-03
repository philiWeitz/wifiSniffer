//#define DEBUG 1

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
    #ifdef DEBUG
      Serial.println("New Client");
      Serial.println(clientList.size());
    #endif
    
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
    if((millis() - it->timeStamp) > 5000) {
      #ifdef DEBUG
        Serial.println("Erase client");
        Serial.println(clientList.size());
      #endif

      // potential memory leak here!
      clientList.erase(it);
      // iterator is now invalid! -> calls itself
      removeOldClients();
      break;
      
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
    delay(20);
  }
  Serial.print(stopChar);
}


#endif
