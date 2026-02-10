// Player types
export interface Player {
  id: string;
  name: string;
  team: string;
  position: 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DEF';
}

export interface PlayerStats extends Player {
  recentAverage: number;
  opponent: string;
  projectedPoints?: number;
}

// API response types
export interface PlayersResponse {
  players: Player[];
  count: number;
}

export interface ComparisonResult {
  player1: PlayerStats;
  player2: PlayerStats;
  winner: 'player1' | 'player2';
  confidence: number;
}

// Database models (for future use)
export interface PlayerRecord {
  id: string;
  name: string;
  team: string;
  position: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameStats {
  id: string;
  playerId: string;
  week: number;
  season: number;
  opponent: string;
  points: number;
  passingYards?: number;
  rushingYards?: number;
  receivingYards?: number;
  touchdowns: number;
  receptions?: number;
  createdAt: Date;
}
