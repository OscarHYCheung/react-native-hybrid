//
//  EventEmitter.swift
//  ReactNativeHybrid
//
//  Created by Oscar Cheung on 22/02/2023.
//

@objc(EventEmitter)
class EventEmitter: RCTEventEmitter {
  override static func requiresMainQueueSetup() -> Bool { return false }

  public static var shared: EventEmitter?
  public static let supportedEventMap = [
    "EXAMPLE_EVENT_NAME": "ExampleEventName"
  ]

  public static func emitEventFromNative(eventName: String, eventParams: NSDictionary?) -> Void {
    if (!Array(EventEmitter.supportedEventMap.values).contains(eventName)) {
      return
    }
    EventEmitter.shared!.sendEvent(withName: eventName, body: eventParams)
  }

  override init() {
    super.init()
    EventEmitter.shared = self
  }

  override func supportedEvents() -> [String]! {
    return Array(EventEmitter.supportedEventMap.values)
  }

  override func constantsToExport() -> [AnyHashable : Any]! {
    return EventEmitter.supportedEventMap
  }

  @objc
  func emitEventFromReactNative(eventName: String, eventParams: NSDictionary?) -> Void {
    EventEmitter.emitEventFromNative(eventName: eventName, eventParams: eventParams)
  }
}
