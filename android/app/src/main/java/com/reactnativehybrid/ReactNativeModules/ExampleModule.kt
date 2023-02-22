package com.reactnativehybrid.reactnativemodules

import android.util.Log
import com.facebook.react.bridge.*
import kotlin.random.Random


class ExampleModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val moduleName = "ExampleModule"

    override fun getName() = moduleName

    @ReactMethod
    fun log(message: String) {
        Log.v(moduleName, message)
    }

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

    @ReactMethod
    fun triggerEvent(eventName: String, eventParams: ReadableMap?) {
        EventEmitter.emitEventFromNative(this.reactApplicationContext, eventName, eventParams)
    }
}
