# Testing Your Team Generator App

## Quick Start Guide

Your React Native team generator app is now ready! Here's how to test it:

### Prerequisites Check
Before running the app, make sure you have:
- ✅ Node.js installed (you have v18.16.0 - note: React Native 0.81.4 recommends v20.19.4+)
- ✅ React Native development environment set up

### Running the App

#### Option 1: iOS Simulator (macOS only)
```bash
# Install iOS dependencies
cd ios
bundle install
bundle exec pod install
cd ..

# Run on iOS simulator
npx react-native run-ios
```

#### Option 2: Android Emulator/Device
```bash
# Make sure you have an Android emulator running or device connected
npx react-native run-android
```

### Testing the App Features

1. **Add Names**: 
   - Type a name in the input field
   - Tap "Add" or press Enter
   - Names will appear in a list below
   - Tap any name to remove it

2. **Set Number of Teams**:
   - Enter the desired number of teams (e.g., "3")
   - Must be between 1 and the number of names

3. **Generate Teams**:
   - Tap "Generate Teams" button
   - Teams will be randomly distributed
   - Each team shows its members

4. **Reset**:
   - Tap "Reset" to clear everything and start over

### Troubleshooting

#### If you get Node.js version warnings:
The app should still work with Node.js v18.16.0, but for optimal performance, consider upgrading to Node.js v20.19.4+.

#### If iOS build fails:
```bash
cd ios
bundle exec pod install
cd ..
npx react-native run-ios
```

#### If Android build fails:
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

#### If Metro bundler has issues:
```bash
npx react-native start --reset-cache
```

### Development Tips

- **Hot Reload**: Shake your device/simulator and enable "Hot Reloading" for instant updates
- **Debugging**: Use React Native Debugger or Chrome DevTools
- **Testing**: Try different scenarios:
  - Add 10+ names and generate 3-4 teams
  - Test edge cases (1 name, same number of teams as names)
  - Verify random distribution works

### Next Steps

Once you've tested the basic functionality, you can:
- Customize the UI colors and styling
- Add more features (team names, save teams, etc.)
- Deploy to app stores
- Add animations and transitions

Happy coding! 🚀
