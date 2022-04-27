# Note Space

## App Main Function

- Drop Note
- Create To Do Task List
- Support CRUD

# RNProject Template

## Prerequisite

- Xcode 13.1
- Android Studio 4.2.1
- Visual Studio Code 1.66.2
- Node v16.14.2
- react-native-cli: 2.0.1
- react-native: 0.68.0
- VS Code Plugin - Prettier, ESLint ( Align Coding Style )

## Installation

```bash
yarn install
npx pod-install ios
```

## Run

To run the app:

`iOS`

```bash
react-native run-ios
```

Or you may choose the scheme in Xcode and click run.

`Android`

```bash
react-native run-android
```

Or you may choose the variant in Android Studio and click run.

To make a release build:

```bash
cd android
./gradlew assembleRelease
```

## Import

All import statement should follow the following:

```javascript
import useAppTheme from '~src/contexts/theme';
```

~src is the root path alias of ~/src

## Coding Style

`Prettier & ESLint` will be used for aligning coding style. Please ensure they are installed.

`Variable / function name` will be named in `Camel Case`.

`js files / class name / component name` will be named in `Pascal Case`.

## Environment

[React Native Config](https://github.com/luggit/react-native-config) has been used for configurating different environment. .env files are located in root directory and environment variables can be found inside it.

## Responsive UI

The design on Figma is using iPhone Pro Max which is 414 X 896. When there is a need for inputting exact value for height/width/padding/margin.

```javascript
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

export const scaleWidth = wp;
export const scaleHeight = hp;
export const scaleFont = hp;
export const scaleVerticalSpace = hp; // margin, padding in vertical
export const scaleHorizontalSpace = wp; // margin, padding in horizontal
```

You can have a look on the project before you write any code.

## Other Useful Links

Please visit below websites before coding:

[React Navigation v5](https://reactnavigation.org/docs/getting-started)

## Can't show image in Non-Prod env

`iOS`
Search RCTHTTPRequestHandler.m file in Xcode

In that file you will see a line like this:

```bash
#pragma mark - NSURLSession delegate
```

Right after that line, add this function

```bash
- (void)URLSession:(NSURLSession *)session didReceiveChallenge:(NSURLAuthenticationChallenge *)challenge completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition disposition, NSURLCredential *credential))completionHandler
{
    NSString *bundleIdentifier = [[NSBundle mainBundle] bundleIdentifier];
    NSLog(@"bundleIdentifier: %@", bundleIdentifier);
    if ([bundleIdentifier rangeOfString:@".dev"].location != NSNotFound ||
        [bundleIdentifier rangeOfString:@".sit"].location != NSNotFound ||
        [bundleIdentifier rangeOfString:@".uat"].location != NSNotFound) {
        if ([challenge.protectionSpace.authenticationMethod isEqualToString:NSURLAuthenticationMethodServerTrust]) {
            if (challenge.previousFailureCount == 0) {
                NSURLCredential *credential = [NSURLCredential credentialForTrust:challenge.protectionSpace.serverTrust];
                completionHandler(NSURLSessionAuthChallengeUseCredential, credential);
            } else {
                completionHandler(NSURLSessionAuthChallengeCancelAuthenticationChallenge, nil);
            }
        }
    }
    else{
        completionHandler(NSURLSessionAuthChallengePerformDefaultHandling, nil);
    }
}
```

## Troubleshoot

App seems like cache / cannot run properly after install new library

1. close metro server (terminal)
2. watchman watch-del-all
3. npm start -- --reset-cache
4. delete app and run the app again

## Production Release Build

- Make sure in "env.prod" all settings are correct
- Update "IOS_APP_VERSION", "AOS_APP_VERSION", "IOS_BUILD_VERSION" and "AOS_BUILD_VERSION"
- Increase "IOS_BUILD_VERSION" and "AOS_BUILD_VERSION" if need to re-submit to AppStore Connect or Google Play Store
- Run command to make sure using the latest library (`yarn install` > `cd ios` > `pod install`)

iOS (in Xcode)

1. Select prodction scheme (RNProject-PROD) and Select Generic iOS Device
2. Clean Build Folder in Xcode (Product > Clean Build Folder)
3. Archive (Product > Archive)
4. Choose archived app and press Distribute App
5. Select App Store Connect > Next
6. Choose Upload > Next (p.s. If wanna to export the ipa file and upload to AppStore Connect later, you can choose "Export")
7. No need to select any checkbox in the following steps until you can see the app is being uploading to the AppStore Connect.

Android (in Android Studio)

1. Sync Gradle Files (File > Sync Project with Gradle files)
2. Select Build Variant to release (Click Project "RNProject" folder > Build > Select Build Variant... > change "app" to release (p.s. below library Build Variant will auto change after changed "app"))
3. Build apk (Build > Build Bundle(s)/APK(s) > Build APK(s))
4. APK will be located at /promon-shielder/android/wrapped-rnproject-release-#-#-#-#.apk
