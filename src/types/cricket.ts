export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  color: string;
}

export interface Player {
  id: string;
  name: string;
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicketkeeper';
  teamId: string;
}

export interface BattingStats {
  playerId: string;
  playerName: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isOut: boolean;
  dismissalType?: string;
  dismissedBy?: string;
  isOnStrike?: boolean;
}

export interface BowlingStats {
  playerId: string;
  playerName: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  dots?: number;
  wides?: number;
  noBalls?: number;
}

export interface BallEvent {
  id: string;
  over: number;
  ball: number;
  batsmanId: string;
  batsmanName: string;
  bowlerId: string;
  bowlerName: string;
  runs: number;
  extras: number;
  extraType?: 'wide' | 'no-ball' | 'bye' | 'leg-bye' | 'penalty';
  isWicket: boolean;
  wicketType?: string;
  isBoundary: boolean;
  isSix: boolean;
  isFour: boolean;
  shotType?: string;
  commentary: string;
  timestamp: Date;
}

export interface Innings {
  battingTeamId: string;
  bowlingTeamId: string;
  runs: number;
  wickets: number;
  overs: number;
  balls: number;
  extras: {
    wides: number;
    noBalls: number;
    byes: number;
    legByes: number;
    penalty: number;
  };
  battingStats: BattingStats[];
  bowlingStats: BowlingStats[];
  ballEvents: BallEvent[];
  currentPartnership?: {
    runs: number;
    balls: number;
    batsman1: string;
    batsman2: string;
  };
}

export interface Match {
  id: string;
  tournament: string;
  matchType: 'T20' | 'ODI' | 'Test';
  venue: string;
  status: 'live' | 'upcoming' | 'completed';
  tossWinner?: string;
  tossDecision?: 'bat' | 'bowl';
  team1: Team;
  team2: Team;
  innings: Innings[];
  currentInnings: number;
  targetScore?: number;
  requiredRunRate?: number;
  currentRunRate?: number;
  lastWicket?: string;
  matchInfo?: string;
  startTime: Date;
}

export type ActivityType = 
  | 'batting'
  | 'bowling'
  | 'fielding'
  | 'wicketkeeping'
  | 'match_event';

export interface Activity {
  id: string;
  type: ActivityType;
  action: string;
  player: string;
  description: string;
  timestamp: Date;
  highlight?: boolean;
}
