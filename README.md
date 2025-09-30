# Team Generator App

A React Native app that randomly generates teams from a list of names. Perfect for organizing groups, sports teams, or any activity that requires random team assignment.

## Features

- Add multiple names to the list
- Specify the number of teams to generate
- Randomly distribute names across teams
- Clean, intuitive interface
- Cross-platform (iOS and Android)

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (version 20.19.4 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

### For iOS Development (macOS only)
- **Xcode** (latest version) - Available on Mac App Store
- **CocoaPods** - Install with: `sudo gem install cocoapods`
- **iOS Simulator** (comes with Xcode)

### For Android Development
- **Android Studio** - [Download here](https://developer.android.com/studio)
- **Java Development Kit (JDK)** - Version 11 or higher
- **Android SDK** (installed via Android Studio)

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd team-generator-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup (macOS only)**
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

## Development

### Running the App

#### iOS Simulator (macOS only)
```bash
npx react-native run-ios
```

#### Android Emulator/Device
```bash
npx react-native run-android
```

### Development Tips

1. **Metro Bundler**: The development server will start automatically when you run the app
2. **Hot Reload**: Shake your device/simulator and select "Enable Hot Reloading" for instant updates
3. **Debugging**: Use React Native Debugger or Chrome DevTools for debugging

### Testing on Physical Devices

#### iOS Device
1. Connect your iPhone via USB
2. Open Xcode and select your device
3. Run: `npx react-native run-ios --device`

#### Android Device
1. Enable Developer Options and USB Debugging on your Android device
2. Connect via USB
3. Run: `npx react-native run-android`

## Project Structure

```
team-generator-app/
├── App.tsx                 # Main app component
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/           # Screen components
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript type definitions
├── android/               # Android-specific code
├── ios/                   # iOS-specific code
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **iOS build issues**: Clean build folder in Xcode (Product → Clean Build Folder)
3. **Android build issues**: Run `cd android && ./gradlew clean && cd ..`
4. **Node version issues**: Use Node Version Manager (nvm) to switch Node versions

### Getting Help

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Native Community](https://github.com/react-native-community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React Native
- Icons and UI components from React Native Elements
- Inspired by the need for fair team generation