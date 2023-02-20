//
//  RandomModule.m
//  ReactNativeHybrid
//
//  Created by Oscar Cheung on 20/02/2023.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(RandomModule, NSObject)

  RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(randSync)
  RCT_EXTERN_METHOD(rand: (RCTPromiseResolveBlock) resolve
                    rejecter: (RCTPromiseRejectBlock) reject)

@end
