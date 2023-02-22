//
//  ExampleModule.swift
//  ReactNativeHybrid
//
//  Created by Oscar Cheung on 20/02/2023.
//

@objc(ExampleModule)
class ExampleModule: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool { return false }
  
  @objc(log:)
  func log(_ message: String) -> Void {
    print("LoggerModule:", message)
  }

  @objc
  func randSync() -> [Float] {
    return [Float.random(in: 0...1)]
  }

  @objc
  func rand(_ resolve: RCTPromiseResolveBlock,
            rejecter reject: RCTPromiseRejectBlock) -> Void {
    do {
      try resolve(Float.random(in: 0...1))
    } catch {
      reject("0", "Error occurred", error)
    }
  }

  @objc
  func triggerEvent(_ eventName: String, eventParams: NSDictionary?) -> Void {
    
  }
  
}
