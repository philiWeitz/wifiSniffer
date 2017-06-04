
#ifndef __SERIAL_READER_H__
#define __SERIAL_READER_H__

#define DELIMITER ",\n"
#define POST_CHAR '$'
#define COMMAND_END_CHAR ';'
#define MAX_INPUT_BUFFER_SIZE 50

#include <queue>
#include "wifiUtil.h"

uint8_t inputBufferPointer = 0;
char* inputBuffer = new char[MAX_INPUT_BUFFER_SIZE];

std::queue<char*> postQueue;


void readInput() {
  while(Serial.available() > 0) {
    char input = Serial.read();

    // ---- post the whole queue ----
    if(input == POST_CHAR) {
      while (!postQueue.empty())
      {
        char *item = postQueue.front();
        postQueue.pop();
        postData(item);
        delete[] item;
      }
      
    } else if(input == COMMAND_END_CHAR && inputBufferPointer > 0) {
      // ---- full command received ----
      
      // terminate string
      inputBuffer[inputBufferPointer] = '\0';
      
      // push to post queue
      char* item = new char[inputBufferPointer+1];
      memcpy(item, inputBuffer, inputBufferPointer+1);
      postQueue.push(item);
      
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

#endif
