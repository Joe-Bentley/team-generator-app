import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { TeamCard } from '../components/TeamCard';
import { generateTeams, validateInput } from '../utils/teamGenerator';
import { Team } from '../types';

export const TeamGeneratorScreen: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);
  const [currentName, setCurrentName] = useState<string>('');
  const [numberOfTeams, setNumberOfTeams] = useState<string>('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const addName = () => {
    const trimmedName = currentName.trim();
    if (trimmedName && !names.includes(trimmedName)) {
      setNames([...names, trimmedName]);
      setCurrentName('');
    } else if (names.includes(trimmedName)) {
      Alert.alert('Duplicate Name', 'This name has already been added.');
    }
  };

  const removeName = (nameToRemove: string) => {
    setNames(names.filter(name => name !== nameToRemove));
  };

  const generateTeamsHandler = () => {
    const numTeams = parseInt(numberOfTeams, 10);
    const validation = validateInput(names, numTeams);
    
    if (!validation.isValid) {
      Alert.alert('Invalid Input', validation.errorMessage!);
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

  const renderNameItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.nameItem}
      onPress={() => removeName(item)}
      activeOpacity={0.7}>
      <Text style={styles.nameText}>{item}</Text>
      <Text style={styles.removeText}>×</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
              onSubmitEditing={addName}
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
              <Text style={styles.namesTitle}>
                Names ({names.length}):
              </Text>
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
            maxLength={2}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  generateButton: {
    marginBottom: 8,
  },
  resetButton: {
    marginBottom: 8,
  },
});
