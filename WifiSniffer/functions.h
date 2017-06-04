

#ifndef __FUNCTIONS_H__
#define __FUNCTIONS_H__


extern "C" {
  #include "user_interface.h"
  
  typedef void (*freedom_outside_cb_t)(uint8 status);
  int  wifi_register_send_pkt_freedom_cb(freedom_outside_cb_t cb);
  void wifi_unregister_send_pkt_freedom_cb(void);
  int  wifi_send_pkt_freedom(uint8 *buf, int len, bool sys_seq);
}

#include <ESP8266WiFi.h>
#include "./structures.h"
#include "./beaconUtil.h"
#include "./clientUtil.h"


void promisc_cb(uint8_t *buf, uint16_t len)
{
  if (len == 12) {
    /**** RC Controll ****/
  
  } else if (len == 128) {
    /**** BEACON ****/

  } else {
    /**** CLIENT ****/
    struct snifferClientBuffer *sniffer = (struct snifferClientBuffer*) buf;
    
    //Is data or QOS?
    if ((sniffer->buf[0] == 0x08) || (sniffer->buf[0] == 0x88)) {
      struct clientinfo ci = parse_data(sniffer->buf, 36, sniffer->rx_ctrl.rssi, sniffer->rx_ctrl.channel); 
      addDevice(ci);
    }
  }
}


#endif
