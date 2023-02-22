//
//  ExampleModule.m
//  ReactNativeHybrid
//
//  Created by Oscar Cheung on 20/02/2023.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(ExampleModule, NSObject)

  RCT_EXTERN_METHOD(log:(NSString *) message)
  RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(randSync)
  RCT_EXTERN_METHOD(rand: (RCTPromiseResolveBlock) resolve
                    rejecter: (RCTPromiseRejectBlock) reject)
  RCT_EXTERN_METHOD(triggerEvent:(NSString *) eventName
                    params: (NSDictionary *) eventParams)

@end
