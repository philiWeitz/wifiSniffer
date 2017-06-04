
#ifndef __IO_UTIL_H__
#define __IO_UTIL_H__

#define CHANNEL_READ_TIME_IN_MS 50


void loopOverChannels(const uint8_t startChannel, const uint8_t endChannel) {
  // loop over all channels
  uint8_t channel = startChannel;
  wifi_set_channel(channel);
  
  // set the timer for each channel
  unsigned long lastTime = millis() + CHANNEL_READ_TIME_IN_MS;
  
  while (true) {
    // increase the channel
    if(lastTime < millis()) {
      ++channel;

      // if last channel is reached -> stop sniffer
      if(channel > endChannel) {
        break;
      }
      // set the new wifi channel
      wifi_set_channel(channel);
      // reset the timer
      lastTime = millis() + CHANNEL_READ_TIME_IN_MS;
    }
    
    delay(1);
  }
}


#endif
