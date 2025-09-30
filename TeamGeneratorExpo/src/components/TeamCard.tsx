import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Team } from '../types';

interface TeamCardProps {
  team: Team;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const renderMember = ({ item }: { item: string }) => (
    <View style={styles.memberItem}>
      <Text style={styles.memberText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.teamName}>{team.name}</Text>
      <View style={styles.membersContainer}>
        <FlatList
          data={team.members}
          renderItem={renderMember}
          keyExtractor={(item, index) => `${item}-${index}`}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
