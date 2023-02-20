package com.reactnativehybrid.ReactNativeModules

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class LoggerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val moduleName = "LoggerModule"

    override fun getName() = moduleName

    @ReactMethod
    fun log(message: String) {
        Log.v(moduleName, message)
    }
}
