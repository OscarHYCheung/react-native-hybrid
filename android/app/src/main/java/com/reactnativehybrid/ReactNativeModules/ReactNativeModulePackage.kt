package com.reactnativehybrid.ReactNativeModules

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class ReactNativeModulePackage : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> =
        mutableListOf()

    override fun createNativeModules(reactContext: ReactApplicationContext): List<ReactContextBaseJavaModule> =
        listOf(
            LoggerModule(reactContext),
            RandomModule(reactContext),
        )
}
