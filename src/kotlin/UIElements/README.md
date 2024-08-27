# Build Android app using CLI

## Pre-requisites

- Android Studio
- Gradle

## Usage

1. build the `apk`

```bash
./gradlew assembleDebug
```

2. connect mobile device with the system using `usb` cable
3. install the `apk` on the mobile device

```bash
adb install -r app/build/outputs/apk/app-debug.apk
```

4. launch the app on device

```bash
adb shell am start -n "<package_name>/<package_name>.MainActivity"
```
