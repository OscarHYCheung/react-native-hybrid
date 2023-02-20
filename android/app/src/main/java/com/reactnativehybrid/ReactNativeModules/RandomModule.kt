package com.reactnativehybrid.ReactNativeModules

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import kotlin.random.Random


class RandomModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val moduleName = "RandomModule"

    override fun getName() = moduleName

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun randSync() = Random.nextFloat()

    @ReactMethod
    fun rand(promise: Promise) {
        try {
            promise.resolve(Random.nextFloat())
        } catch (e: Throwable) {
            promise.reject("Error occurred", e)
        }
    }
}
