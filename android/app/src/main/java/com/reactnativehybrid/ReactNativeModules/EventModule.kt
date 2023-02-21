package com.reactnativehybrid.ReactNativeModules

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import kotlin.random.Random


class EventModule(reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {

    private val moduleName = "EventModule"
    private val eventName = "EventModuleEventName"

    private var eventListenerCount = 0

    override fun getName() = moduleName
    override fun getConstants(): MutableMap<String, String> = hashMapOf<String, String>(
            "EVENT_NAME" to eventName
    )

    private fun sendEvent(reactContext: ReactContext, params: WritableMap?) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
    }

    @ReactMethod
    fun addListener(eventName: String) {
        if (eventListenerCount == 0) {
            // No listener here before, do lazy init here
            // Set up any upstream listeners or background tasks as necessary
        }

        eventListenerCount += 1
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        eventListenerCount -= count
        if (eventListenerCount == 0) {
            // No listeners anymore, do the clean up
            // Remove upstream listeners, stop unnecessary background tasks
        }
    }

    @ReactMethod
    fun triggerEvent() {
        val array = Arguments.createArray().apply {
            pushInt(0)
            pushInt(1)
            pushInt(2)
        }
        val map = Arguments.createMap().apply {
            putString("aStringInNestedMap", "Hello from React Native Module")
        }
        val params = Arguments.createMap().apply {
            putString("eventName", eventName)
            putString("aString", "Hello World from Android")
            putArray("anArray", array)
            putMap("aMap", map)
            putDouble("aDouble", Random.nextDouble())
        }
        sendEvent(this.reactApplicationContext, params)
    }
}
