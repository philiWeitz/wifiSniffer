# WIFI Sniffer project

## Environment
- Arduino IDE 1.8.2 or higher
- NodeJS 6.10.0
- Yarn

## Hardware requiremenrts
- 2 ESP8266 (NodeMCU)

## Setup
- upload the WifiSniffer to one ESP8266
- navigate to the ArduinoServer and create a "credentials.h" file
- inside the "credentials.h" add:
  - const char* WIFI_SSID = "<your wifi name>";
  - const char* WIFI_PASSWORD = "<your wifi password>";
  - const String SERVER_ADDRESS = "<server address e.g. http://192.168.1.230:8080>";
- upload the ArduinoServer to the second one
- connect both to a power supply and connect the Serial port of both ESP8266's (RX and TX)
- navigate to the node-server directory
- type 'yarn install' and yarn start
- navigate to the react-ui directory
- type 'yarn install' and yarn start

## Credits
- Ray Burnette: https://www.hackster.io/rayburne/esp8266-mini-sniff-f6b93a
- Authors of the arduino core for ESP8266 WiFi chip: https://github.com/esp8266/Arduino
