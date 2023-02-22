package com.reactnativehybrid.utils

import com.facebook.react.bridge.*

class Convertor {
    companion object {
        fun convertToWritable(readableMap: ReadableMap): WritableMap {
            val writableMap = Arguments.createMap()
            val iterator = readableMap.keySetIterator()
            while (iterator.hasNextKey()) {
                val key = iterator.nextKey()
                when (readableMap.getType(key)) {
                    ReadableType.Map -> {
                        val value = convertToWritable(readableMap.getMap(key) as ReadableMap)
                        writableMap.putMap(key, value)
                    }
                    ReadableType.Array -> {
                        val value = convertToWritable(readableMap.getArray(key) as ReadableArray)
                        writableMap.putArray(key, value)
                    }
                    ReadableType.String -> {
                        writableMap.putString(key, readableMap.getString(key))
                    }
                    ReadableType.Number -> {
                        writableMap.putDouble(key, readableMap.getDouble(key))
                    }
                    ReadableType.Boolean -> {
                        writableMap.putBoolean(key, readableMap.getBoolean(key))
                    }
                    ReadableType.Null -> {
                        writableMap.putNull(key)
                    }
                    else -> {
                        writableMap.putNull(key)
                    }
                }
            }

            return writableMap
        }

        fun convertToWritable(readableArray: ReadableArray): WritableArray {
            val writableArray = Arguments.createArray()
            for (entry in readableArray.toArrayList()) {
                when (entry) {
                    is ReadableMap -> {
                        val value = convertToWritable(entry)
                        writableArray.pushMap(value)
                    }
                    is ReadableArray -> {
                        val value = convertToWritable(entry)
                        writableArray.pushArray(value)
                    }
                    is String -> {
                        writableArray.pushString(entry)
                    }
                    is Int -> {
                        writableArray.pushInt(entry)
                    }
                    is Boolean -> {
                        writableArray.pushBoolean(entry)
                    }
                    is Double -> {
                        writableArray.pushDouble(entry)
                    }
                    else -> {
                        writableArray.pushNull()
                    }
                }
            }
            return writableArray
        }
    }
}
