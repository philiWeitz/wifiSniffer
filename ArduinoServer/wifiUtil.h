
#ifndef __WIFI_UTIL_H__
#define __WIFI_UTIL_H__

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

#define DELIMITER ","

#define HEALTH_CHECK_URL "http://192.168.1.230:8080/health"
#define POST_DATA_URL "http://192.168.1.230:8080/data"
#define CONFIG_URL "http://192.168.1.230:8080/nodemcu/config"


struct WifiSnifferConfig {
  int rangeStart = 1;
  int rangeStop = 1;
  int devicePollingTimeInMs = 2000;
};


WifiSnifferConfig snifferConfig;


void setupWifiClient() {

  WiFi.persistent(false);
  WiFi.begin("", "");
  while(WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting to WiFi Network...");
    delay(1000);
  }
  WiFi.persistent(false);
}


void configureWifiSniffer() {
  Serial.print("LOOP,");
  Serial.print(snifferConfig.rangeStart);
  Serial.print(",");
  Serial.print(snifferConfig.rangeStop);
  Serial.print("$");
}


void splitConfig(const String payload) {
  char* ch = strtok((char*) payload.c_str(), DELIMITER);
  int rangeStart = atoi(ch);

  ch = strtok(NULL, DELIMITER);
  if(ch == NULL) {
    return;
  }
  int rangeStop = atoi(ch);

  ch = strtok(NULL, DELIMITER);
  if(ch == NULL) {
    return;
  }
  int devicePollingTimeInMs = atoi(ch);

  // new config found -> set new config
  if(snifferConfig.rangeStart != rangeStart || snifferConfig.rangeStop != rangeStop
    || snifferConfig.devicePollingTimeInMs != devicePollingTimeInMs) {
    // write new config
    snifferConfig.rangeStart = rangeStart;
    snifferConfig.rangeStop = rangeStop;
    snifferConfig.devicePollingTimeInMs = devicePollingTimeInMs;

    configureWifiSniffer();
  }
}


/*bool healthCheck() {
  bool result = false;

  if((WiFiMulti.run() == WL_CONNECTED)) {
    // do health check
    http.begin(HEALTH_CHECK_URL);
    int httpCode = http.GET();
    
    if(httpCode > 0) {
      Serial.printf("Health check code: %d\n", httpCode);
    } else {
      Serial.printf("Health check failed, error: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();
  }
  
  return result;
}*/

bool postData(const char* body) {
  bool result = false;

  if(WiFi.status() == WL_CONNECTED) {

    HTTPClient http;
    http.begin(POST_DATA_URL);
    //http.setReuse(true);
    http.addHeader("Content-Type", "text/plain");
    
    int httpCode = http.POST(body);
      
    if (httpCode < 0) {
      Serial.printf("Post data failed, error: %s\n", http.errorToString(httpCode).c_str());
      
    } else if(httpCode != 200) {      
      Serial.println(httpCode);
      Serial.println(http.getString());
    }
    
    http.end();
    delay(10);
  }
  
  return result;
}


bool getConfig() {
  bool result = false;

  if(WiFi.status() == WL_CONNECTED) {

    HTTPClient http;
    http.begin(CONFIG_URL);
    http.addHeader("Content-Type", "text/plain");

    int httpCode = http.GET();

    if (httpCode == 200) {
      splitConfig(http.getString());
    }
    else if (httpCode < 0) {
      Serial.printf("Post data failed, error: %s\n", http.errorToString(httpCode).c_str());
      
    } else if(httpCode != 200) {      
      Serial.println(httpCode);
      Serial.println(http.getString());
    }
 
    http.end();
  }
  
  return result;
}

#endif
