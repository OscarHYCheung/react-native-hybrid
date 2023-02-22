package com.reactnativehybrid.reactnativemodules

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.reactnativehybrid.utils.Convertor


class EventEmitter(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        object SupportedEventNames {
            const val EXAMPLE_EVENT_NAME = "ExampleEventName"
        }

        private val supportedEventNameMap = hashMapOf<String, String>(
            "EXAMPLE_EVENT_NAME" to SupportedEventNames.EXAMPLE_EVENT_NAME
        )

        fun emitEventFromNative(
            reactContext: ReactContext, eventName: String, params: ReadableMap?
        ) {
            emitEvent(reactContext, eventName, params)
        }

        private fun emitEvent(reactContext: ReactContext, eventName: String, params: ReadableMap?) {
            if (params == null) {
                emitEvent(reactContext, eventName, null)
            } else {
                val writableMap = Convertor.convertToWritable(params)
                emitEvent(reactContext, eventName, writableMap)
            }
        }

        private fun emitEvent(reactContext: ReactContext, eventName: String, params: WritableMap?) {
            if (!supportedEventNameMap.values.contains(eventName)) {
                return
            }

            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
        }
    }

    private val moduleName = "EventEmitter"
    private var eventListenerCount = 0

    override fun getName() = moduleName
    override fun getConstants(): MutableMap<String, String> = supportedEventNameMap

    @ReactMethod
    fun addListener(eventName: String) {
        // This method cannot be removed, even not needed
        if (eventListenerCount == 0) {
            // No listener here before, do lazy init here
            // Set up any upstream listeners or background tasks as necessary
        }

        eventListenerCount += 1
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // This method cannot be removed, even not needed
        eventListenerCount -= count
        if (eventListenerCount == 0) {
            // No listeners anymore, do the clean up
            // Remove upstream listeners, stop unnecessary background tasks
        }
    }

    @ReactMethod
    fun emitEventFromReactNative(eventName: String, params: ReadableMap?) {
        emitEvent(this.reactApplicationContext, eventName, params)
    }
}
