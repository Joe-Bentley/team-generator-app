# 🚀 **Expo Snack Setup - Pure JavaScript Version**

## **Step 1: Go to Expo Snack**

Visit: [snack.expo.dev](https://snack.expo.dev)

## **Step 2: Create New Snack**

1. Click "Create a new Snack"
2. Choose "Blank" template (not TypeScript)

## **Step 3: Replace App.js**

Copy and paste this **pure JavaScript** code into the App.js file:

```javascript
/**
 * Team Generator App - Pure JavaScript Version
 * A React Native app for randomly generating teams from a list of names
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Simple inline components
const Button = ({
  title,
  onPress,
  disabled = false,
  style,
  variant = 'primary',
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
      disabled && styles.disabledButton,
      style,
    ]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.7}
  >
    <Text
      style={[
        styles.buttonText,
        variant === 'primary' ? styles.primaryText : styles.secondaryText,
        disabled && styles.disabledText,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  style,
}) => (
  <View style={styles.inputContainer}>
    {label && <Text style={styles.label}>{label}</Text>}
    <View style={[styles.input, style]}>
      <TextInput
        style={styles.inputText}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

const TeamCard = ({ team }) => (
  <View style={styles.teamCard}>
    <Text style={styles.teamName}>{team.name}</Text>
    <View style={styles.membersContainer}>
      {team.members.map((member, index) => (
        <View key={index} style={styles.memberItem}>
          <Text style={styles.memberText}>{member}</Text>
        </View>
      ))}
    </View>
  </View>
);

// Team generation utility functions
const shuffleArray = array => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateTeams = (names, numberOfTeams) => {
  if (names.length === 0 || numberOfTeams <= 0) {
    return [];
  }

  const shuffledNames = shuffleArray(names);
  const teams = [];

  for (let i = 0; i < numberOfTeams; i++) {
    teams.push({
      id: i + 1,
      name: `Team ${i + 1}`,
      members: [],
    });
  }

  shuffledNames.forEach((name, index) => {
    const teamIndex = index % numberOfTeams;
    teams[teamIndex].members.push(name);
  });

  return teams;
};

const validateInput = (names, numberOfTeams) => {
  if (names.length === 0) {
    return { isValid: false, errorMessage: 'Please add at least one name' };
  }
  if (numberOfTeams <= 0) {
    return {
      isValid: false,
      errorMessage: 'Number of teams must be greater than 0',
    };
  }
  if (numberOfTeams > names.length) {
    return {
      isValid: false,
      errorMessage: 'Number of teams cannot be greater than number of names',
    };
  }
  return { isValid: true };
};

function App() {
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState('');
  const [numberOfTeams, setNumberOfTeams] = useState('');
  const [teams, setTeams] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);

  const addName = () => {
    const trimmedName = currentName.trim();
    if (trimmedName && !names.includes(trimmedName)) {
      setNames([...names, trimmedName]);
      setCurrentName('');
    } else if (names.includes(trimmedName)) {
      Alert.alert('Duplicate Name', 'This name has already been added.');
    }
  };

  const removeName = nameToRemove => {
    setNames(names.filter(name => name !== nameToRemove));
  };

  const generateTeamsHandler = () => {
    const numTeams = parseInt(numberOfTeams, 10);
    const validation = validateInput(names, numTeams);

    if (!validation.isValid) {
      Alert.alert('Invalid Input', validation.errorMessage);
      return;
    }

    const generatedTeams = generateTeams(names, numTeams);
    setTeams(generatedTeams);
    setIsGenerated(true);
  };

  const resetGenerator = () => {
    setNames([]);
    setCurrentName('');
    setNumberOfTeams('');
    setTeams([]);
    setIsGenerated(false);
  };

  const renderNameItem = ({ item }) => (
    <TouchableOpacity
      style={styles.nameItem}
      onPress={() => removeName(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.nameText}>{item}</Text>
      <Text style={styles.removeText}>×</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Team Generator</Text>
          <Text style={styles.subtitle}>
            Add names and specify the number of teams to generate
          </Text>

          {/* Add Names Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add Names</Text>
            <View style={styles.inputRow}>
              <Input
                placeholder="Enter a name"
                value={currentName}
                onChangeText={setCurrentName}
                style={styles.nameInput}
              />
              <Button
                title="Add"
                onPress={addName}
                disabled={!currentName.trim()}
                style={styles.addButton}
              />
            </View>

            {names.length > 0 && (
              <View style={styles.namesList}>
                <Text style={styles.namesTitle}>Names ({names.length}):</Text>
                <FlatList
                  data={names}
                  renderItem={renderNameItem}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </View>

          {/* Number of Teams Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Number of Teams</Text>
            <Input
              placeholder="Enter number of teams"
              value={numberOfTeams}
              onChangeText={setNumberOfTeams}
              keyboardType="numeric"
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              title="Generate Teams"
              onPress={generateTeamsHandler}
              disabled={names.length === 0 || !numberOfTeams}
              style={styles.generateButton}
            />

            {isGenerated && (
              <Button
                title="Reset"
                onPress={resetGenerator}
                variant="secondary"
                style={styles.resetButton}
              />
            )}
          </View>

          {/* Teams Display */}
          {isGenerated && teams.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Generated Teams</Text>
              {teams.map(team => (
                <TeamCard key={team.id} team={team} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  inputText: {
    fontSize: 16,
    color: '#000000',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  nameInput: {
    flex: 1,
  },
  addButton: {
    paddingHorizontal: 20,
    minWidth: 80,
  },
  namesList: {
    marginTop: 16,
  },
  namesTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  nameItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  nameText: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  removeText: {
    fontSize: 20,
    color: '#FF3B30',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabledButton: {
    backgroundColor: '#E5E5E7',
    borderColor: '#E5E5E7',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#007AFF',
  },
  disabledText: {
    color: '#8E8E93',
  },
  generateButton: {
    marginBottom: 8,
  },
  resetButton: {
    marginBottom: 8,
  },
  teamCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    minHeight: 100,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  membersContainer: {
    flex: 1,
  },
  memberItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  memberText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
});

export default App;
```

## **Step 4: Save and Share**

1. Click "Save" in Expo Snack
2. Copy the shareable link
3. Send it to anyone - they can test your app instantly!

## **Step 5: Test Your App**

- **Web**: Click "Run" to test in browser
- **Phone**: Scan QR code with Expo Go app
- **Share**: Send the link to friends

## **🎉 Benefits of Pure JavaScript**

- ✅ **Simpler syntax** - no TypeScript annotations
- ✅ **Easier to learn** - just JavaScript
- ✅ **Faster development** - no type checking delays
- ✅ **More flexible** - easier to experiment
- ✅ **Same functionality** - works exactly the same

## **🔄 What Changed from TypeScript**

- Removed `: React.JSX.Element` return type
- Removed `: string[]` type annotations
- Removed `: boolean` type annotations
- Removed `: { item: string }` parameter types
- Removed `!` non-null assertions
- Changed `index.ts` to `index.js`
- Changed `App.tsx` to `App.js`

**Your team generator app now works in pure JavaScript!** 🎉📱
