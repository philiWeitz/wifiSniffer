
#ifndef __SERIAL_UTIL_H__
#define __SERIAL_UTIL_H__

#define DELIMITER ",\n "
#define COMMAND_END_CHAR '$' 
#define MAX_INPUT_BUFFER_SIZE 20

#include "./ioUtil.h"
#include "./clientUtil.h"
#include "./beaconUtil.h"

const String WIFI_SNIFFER_ID = "1";

uint8_t inputBufferPointer = 0;
char* inputBuffer = new char[MAX_INPUT_BUFFER_SIZE];

int startChannel = 1;
int stopChannel = 12;


void readLoopParameter() {
  char* ch = strtok(NULL, DELIMITER);
  if(ch == NULL) {
    return;
  }
  startChannel = atoi(ch);

  ch = strtok(NULL, DELIMITER);
  if(ch == NULL) {
    return;
  }
  stopChannel = atoi(ch);
}


void parseInput() {
  char* ch = strtok(inputBuffer, DELIMITER);

  if(strcmp(ch,"LOOP") == 0) {
    // get loop start and end parameter
    readLoopParameter();  
  }
  if(strcmp(ch,"DEVICES") == 0) {
    // print the device list
    printDeviceList(WIFI_SNIFFER_ID, COMMAND_END_CHAR);  
  }
}


void readSerialInput() {
  while(Serial.available() > 0) {
    char input = Serial.read();

    // full command received
    if(input == COMMAND_END_CHAR && inputBufferPointer > 0) {
      // terminate string
      inputBuffer[inputBufferPointer] = '\0';
      // parse input
      parseInput();
      
    } else {
      inputBuffer[inputBufferPointer] = input;
      ++inputBufferPointer;
    }

    // reset input buffer
    if(input == COMMAND_END_CHAR || inputBufferPointer >=  MAX_INPUT_BUFFER_SIZE) {
      inputBufferPointer = 0;
    }
  }
}


void executeAction() {
  loopOverChannels(startChannel, stopChannel);
}


#endif
