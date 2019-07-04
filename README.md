# Icon Generation

Add an icon (ideally at least 192x192 pixels) named icon.png to your project root. To automatically generate icons of all sizes for all app projects in the same folder, run:
`app-icon generate`

# Run app

`react-native run-ios`
`react-native run-android`

## With built app for release

`react-native run-android --variant=release`
`react-native run-ios --configuration Release`

## Get logs for Android

`adb logcat`

#Build

## Android

Increment version code in app/build.gradle
`cd android && ./gradlew assembleRelease`

## iOS

Info.plist
App Transport Security Settings > Exception Domains > localhost > NSExceptionAllowsInsecureHttp > NO

After release, toggle back.

Build in XCode

# Created key, used:

`keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`
`security find-generic-password -s android_keystore -w`
