sudo xcode-select -s ~/development/xcode/Xcode_10.3.app/
nvm use v12.9.1
react-native init Gallery --version next

Run instructions for iOS:
    • cd Gallery && react-native run-ios
    - or -
    • Open Gallery/ios/Gallery.xcworkspace in Xcode or run "xed -b ios"
    • Hit the Run button

Run instructions for Android:
    • Have an Android emulator running (quickest way to get started), or a device connected.
    • cd Gallery && react-native run-android


Issues:
    - Loads of random 500
        - Extra functionality added to reload data
    - Loads of timeouts or super slow responses
        - Extra functionality added to reload data
    - Buckets ordered alphabetically, which is confusing when adding new one
        - No actual solution on that, since the implementation of the API should either enable
        sorting or sort by datetime added
    - Wrong API annotation for POST /buckets
        - Need to update API response object annotation
