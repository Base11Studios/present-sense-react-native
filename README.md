# Icon Generation

Add an icon (ideally at least 192x192 pixels) named icon.png to your project root. To automatically generate icons of all sizes for all app projects in the same folder, run:
`app-icon generate`

# Run app

Start metro
`npx react-native start`

`npx react-native run-ios`
`npx react-native run-android`
`npx react-native run-ios --simulator="iPhone 12"`

## With built app for release

`npx react-native run-android --variant=release`
`npx react-native run-ios --configuration Release`

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

# Temp fixes

node_modules/react-native-keyboard-aware-scroll-view/lib/KeyboardAwareHOC.js

line 319 - can't have async func with default value, move it to a new line

```
scrollIntoView = async (
element: React.Element<\*>,
options: ScrollIntoViewOptions
) => {
options = options || {}
if (!this.\_rnkasv_keyboardView || !element) {
return
}
```

https://github.com/oblador/react-native-vector-icons/issues/1334#issuecomment-883106346
