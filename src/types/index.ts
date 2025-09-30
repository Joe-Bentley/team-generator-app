export interface Team {
  id: number;
  name: string;
  members: string[];
}

export interface TeamGeneratorState {
  names: string[];
  numberOfTeams: number;
  teams: Team[];
  isGenerated: boolean;
}
