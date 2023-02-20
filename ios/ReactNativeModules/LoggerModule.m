//
//  LoggerModule.m
//  ReactNativeHybrid
//
//  Created by Oscar Cheung on 20/02/2023.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(LoggerModule, NSObject)

  RCT_EXTERN_METHOD(log:(NSString *) message)

@end
