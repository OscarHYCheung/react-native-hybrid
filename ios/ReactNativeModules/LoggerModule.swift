//
//  LoggerModule.swift
//  ReactNativeHybrid
//
//  Created by Oscar Cheung on 20/02/2023.
//

@objc(LoggerModule)
class LoggerModule: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool { return false }

  @objc
  func log(_ message: String) -> Void {
    print("LoggerModule:", message)
  }
}
