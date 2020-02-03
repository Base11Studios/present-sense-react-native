# Icon Generation

Add an icon (ideally at least 192x192 pixels) named icon.png to your project root. To automatically generate icons of all sizes for all app projects in the same folder, run:
`app-icon generate`

# Run app

`react-native run-ios`
`react-native run-android`
`react-native run-ios --simulator="iPhone 11 Pro Max"`

# If Metro server doesn't start automatically

`react-native start --port=8080`

## With built app for release

`react-native run-android --variant=release`
`react-native run-ios --configuration Release`

## Get logs for Android

`adb logcat`

#Build

## Android

After any changes to yarn packages, have to run `npx jetify`

Increment version code in app/build.gradle
`npx jetify && cd android && ./gradlew bundleRelease`

Upload `app.aab`

## iOS

Info.plist
App Transport Security Settings > Exception Domains > localhost > NSExceptionAllowsInsecureHttp > NO

After release, toggle back.

Build in XCode

# Created key, used:

`keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`
`security find-generic-password -s android_keystore -w`




### Yarn package overrides
THIS MAY NOT BE REQUIRED. TRY WITHOUT IT, BUT IF ISSUES, TRY IT:
For react-native-picker, AndroidX support:
https://github.com/beefe/react-native-picker/issues/374

Goto node_modules/react-native-picker/android/build.gradle and change sdk versions to 28 instead of 27



