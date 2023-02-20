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
