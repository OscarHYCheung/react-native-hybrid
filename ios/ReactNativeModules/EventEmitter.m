//
//  EventEmitter.m
//  ReactNativeHybrid
//
//  Created by Oscar Cheung on 22/02/2023.
//

#import "React/RCTBridgeModule.h"
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(EventEmitter, RCTEventEmitter)

  RCT_EXTERN_METHOD(supportedEvents)
  RCT_EXTERN_METHOD(emitEventFromReactNative)

@end
