package com.reactnativehybrid.ReactNativeModules

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import kotlin.random.Random


class RandomModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val moduleName = "RandomModule"

    override fun getName() = moduleName

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun rand() = Random.nextFloat()
}
