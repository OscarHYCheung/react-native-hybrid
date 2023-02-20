//
//  RandomModule.swift
//  ReactNativeHybrid
//
//  Created by Oscar Cheung on 20/02/2023.
//

@objc(RandomModule)
class RandomModule: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool { return false }

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

}
