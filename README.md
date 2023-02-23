# ReactNative Hybrid

Hybrid Android and iOS React Native app with WebView

## Pre-requisite

- Homebrew, `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- RVM, `curl -sSL https://get.rvm.io | bash`
- NVM, `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`
- Ruby 2.7.6, `rvm install 2.7.6 && rvm --default use 2.7.6`
- Node.js 18.14.0, `nvm install 18.14.0 && nvm alias default 18.14.0`
- Watch, `brew install watchman`
- Open JDK 11, `brew tap homebrew/cask-versions && brew install --cask zulu11`
- CocoaPods, `rvm use 2.7.6 && gem install cocoapods`
- Xcode tools installed
- Ensure all paths are set correctly, i.e. RVM, NVM, JDK, CocoaPods, Android home, etc.

## Get started

- Get into project base folder
- Run `yarn install`
- Run `yarn pod-install`
- Run `yarn serve-webview-content`
- Then run `yarn ios` or `yarn android` to build the app

## Message passing from WebView content to React Native

The content of WebView can use `window.ReactNativeWebView.postMessage()` to send message, the message can only be a string. In the demo, the message is expected to be a JSON string:

```json
{
  "action": "open-url",
  "params": {
    "url": "https://reactnative.dev/"
  }
}
```

### Remarks of postMessage()

- The method `window.ReactNativeWebView.postMessage` only got injected if the attribute `onMessage` is set in the `<WebView>`
- The method `window.ReactNativeWebView.postMessage` cannot be stored to another variable, i.e. `const postMessage = window.ReactNativeWebView.postMessage; postMessage('SomeMessage');` will cause an error

## Event handling between React Native (JavaScript) and native

### Adding new event type

- Add event name to `supportedEvents` and handling to `EventEmitter.swift` and `EventEmitter.kt`
- Add event name to the interface in `EventEmitter.ts`

### Emit from React Native (JavaScript)

```javascript
import { NativeModules } from 'react-native';

const { EventEmitter } = NativeModule;
const { EXAMPLE_EVENT_NAME } = EventEmitter.getConstants();
const params = {
  // Optional params
  foo: 'bar',
};
EventEmitter.emitEventFromReactNative(EXAMPLE_EVENT_NAME, params);
```

### Emit from Android

You can use `EventEmitter.emitEventFromNative()` and get available event names from `EventEmitter.Companion.SupportedEventNames`.
Beware that you need to provide the `ReactContext` to the emitter. This implies that event emission can only happen inside a `ReactActivity` or a native module, but not in services. It makes sense because the JavaScript part only involved when the app is in foreground.

```kotlin
val targetEventName = EventEmitter.Companion.SupportedEventNames.EXAMPLE_EVENT_NAME
val array = Arguments.createArray().apply {
  pushInt(0)
  pushInt(1)
  pushInt(2)
}
val map = Arguments.createMap().apply {
  putString("number", 1.23)
}
val params = Arguments.createMap().apply {
  putString("eventName", targetEventName)
  putString("foo", "bar")
  putArray("array", array)
  putMap("map", map)
}
EventEmitter.emitEventFromNative(reactContext, targetEventName, params)
```

### Emit from iOS

Similar to Android, but with slightly different function signatures.

```swift

let targetEventName = EventEmitter.supportedEventMap.EXAMPLE_EVENT_NAME
let array = [0, 1, 2]
let map = ["number": 1.23]
let params = [
  "eventName": targetEventName,
  "foo": "bar",
  "array": array,
  "map": map
]
EventEmitter.shared!.sendEvent(withName: eventName, body: eventParams)
```

## React Native modules

React Native modules allow the React Native (JavaScript) to call the native modules (Java / Kotlin / Objective-C / Swift).

### React Native module examples

- `ExampleModule.log(message: string)`: Has a parameter, no return, async
- `ExampleModule.rand()`: No parameter, has return with promise, async
- `ExampleModule.randSync()`: No parameter, has return, sync
- `ExampleModule.triggerEvent(eventMap: string, eventParams?: any)`: Has parameters, no return, async. Simulating triggering a event from native code.

### Create an Android React Native module

- Create a Kotlin class under the folder `ReactNativeModules`
- Implement the `getName()` which the name will be mapped to JavaScript, i.e. `NativeModules.<moduleName>`
- Implement the methods needed
- Load the module to the list of `createNativeModules()` in `ReactNativeModulePackage.kt`
- Create a TypeScript file in `src/react-native-modules` to export the module with interface, only one file need for both Android and iOS

### Create an iOS React Native module

- Create a Swift class under the group `ReactNativeModules`
- Implement the `requiresMainQueueSetup()` which indicates the module should run in the main queue or a background queue
- Implement the methods needed
- Create a Objective-C file to map the Swift module to Objective-C
- Create a TypeScript file in `src/react-native-modules` to export the module with interface, only one file need for both Android and iOS

### Remarks of React Native modules

- Beware that limited support of types for parameters and returns, check <https://reactnative.dev/docs/native-modules-ios#argument-types> and <https://reactnative.dev/docs/native-modules-android#argument-types>
- Beware when using synchronous methods, which are blocking
- The return value of a synchronous method of iOS must be wrapped by an array, check the implementation of `randSync()`
- If using UI related, i.e. `Alert`, the module must be loaded in main queue, so `requiresMainQueueSetup()` must returns `true`
- There is another option to implement async method, which is callback, but `Promise` is preferred

## Debugging

Check documentation page <https://reactnative.dev/docs/debugging>.

### Debug React Native codes

Need to enable debugging with Chrome as instructed in <https://reactnative.dev/docs/hermes#debugging-js-on-hermes-using-google-chromes-devtools>.

### Debug native codes

Need to build and debug directly with Xcode or Android Studio.

### Debug content in WebView

Got to the view that contains the `WebView`, then:

- For Android go to `chrome://inspect` using Chrome, need to ensure `WebView.setWebContentsDebuggingEnabled(true)` is set in `MainActivity`
- For iOS, open Safari, in top menu bar select `developer` => `<device> - <app_project>` => `<url> - <title>`
