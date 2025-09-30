import { Team } from '../types';

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generates teams from a list of names
 * @param names Array of names to distribute
 * @param numberOfTeams Number of teams to create
 * @returns Array of teams with distributed members
 */
export function generateTeams(names: string[], numberOfTeams: number): Team[] {
  if (names.length === 0 || numberOfTeams <= 0) {
    return [];
  }

  // Shuffle the names to ensure random distribution
  const shuffledNames = shuffleArray(names);
  
  // Create teams array
  const teams: Team[] = [];
  for (let i = 0; i < numberOfTeams; i++) {
    teams.push({
      id: i + 1,
      name: `Team ${i + 1}`,
      members: []
    });
  }

  // Distribute names evenly across teams
  shuffledNames.forEach((name, index) => {
    const teamIndex = index % numberOfTeams;
    teams[teamIndex].members.push(name);
  });

  return teams;
}

/**
 * Validates input for team generation
 * @param names Array of names
 * @param numberOfTeams Number of teams
 * @returns Object with validation result and error message
 */
export function validateInput(names: string[], numberOfTeams: number): {
  isValid: boolean;
  errorMessage?: string;
} {
  if (names.length === 0) {
    return {
      isValid: false,
      errorMessage: 'Please add at least one name'
    };
  }

  if (numberOfTeams <= 0) {
    return {
      isValid: false,
      errorMessage: 'Number of teams must be greater than 0'
    };
  }

  if (numberOfTeams > names.length) {
    return {
      isValid: false,
      errorMessage: 'Number of teams cannot be greater than number of names'
    };
  }

  return { isValid: true };
}
