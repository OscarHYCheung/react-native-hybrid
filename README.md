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

- In project base folder, run `yarn install`
- In folder `ios`, run `pod install`
- Back to project base folder, run `yarn ios` or `yarn android` to build the app

## React Native modules

React Native modules allow the React Native (JavaScript) to call the native modules (Java / Kotlin / Objective-C / Swift).

### React Native module examples

- `LoggerModule.log(message: string)`: Has a parameter, no return, async
- `RandomModule.rand()`: No parameter, has return with promise, async
- `RandomModule.randSync()`: No parameter, has return, sync

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

### Remarks

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
