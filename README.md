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



# Amplify

Run `amplify pull` to get the latest configuration

Auth configuration: https://aws-amplify.github.io/docs/js/authentication#using-auth-components-in-react--react-native

`amplify add api` for new GraphQL schema


#### TODO AWS Sync Notes
// Still write to redux store for every change
// Find a meta reducer or something that can look at the redux store and everytime it changes, run the backup process
// Login will be from settings "Link account"
// You can logout or if not authenticated, login which will have the create account flow
// At home screen we can warn if the user is no longer logged in but they were once (store something in redux store once they login once)
// Set token to 3650 days expiration to keep logged in 10 years
// When opening app, if logged in, need to do a merge of online and local data.
// -- The local redux store can hold a timestamp "last synced" and if the timestamp on the AWS data is later than the local, we need to merge.
// -- Also upon login, need to do a sync as well
