import { Match } from '@/types/cricket';
import { LiveBadge } from '../LiveBadge';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScoreHeaderProps {
  match: Match;
}

export const ScoreHeader = ({ match }: ScoreHeaderProps) => {
  const getTeamScore = (teamId: string) => {
    const innings = match.innings.find((i) => i.battingTeamId === teamId);
    if (!innings) return null;
    return {
      runs: innings.runs,
      wickets: innings.wickets,
      overs: innings.overs,
      balls: innings.balls,
    };
  };

  const team1Score = getTeamScore(match.team1.id);
  const team2Score = getTeamScore(match.team2.id);

  const getMatchStatus = () => {
    if (match.targetScore) {
      const currentInnings = match.innings[match.currentInnings];
      const runsNeeded = match.targetScore - currentInnings.runs;
      const oversRemaining = 20 - currentInnings.overs;
      const ballsInCurrentOver = 6 - currentInnings.balls;
      
      if (runsNeeded > 0) {
        return `${match.innings[match.currentInnings].battingTeamId === match.team1.id 
          ? match.team1.shortName 
          : match.team2.shortName} needs ${runsNeeded} runs in ${oversRemaining > 0 ? `${oversRemaining - 1}.${ballsInCurrentOver}` : `0.${ballsInCurrentOver}`} overs`;
      }
    }
    return `${match.matchType} Match • ${match.venue}`;
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      {/* Header Row */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-muted/80"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </Link>
          <div>
            <h2 className="font-semibold text-foreground">{match.tournament}</h2>
            <p className="text-xs text-muted-foreground">
              {match.matchType} • Match {match.id.split('-')[1]} of 60
            </p>
          </div>
        </div>
        {match.status === 'live' && <LiveBadge />}
      </div>

      {/* Team Scores */}
      <div className="space-y-3">
        {/* Team 1 */}
        <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-primary-foreground"
              style={{ backgroundColor: match.team1.color }}
            >
              {match.team1.shortName.slice(0, 2)}
            </div>
            <span className="font-semibold text-foreground">{match.team1.name}</span>
          </div>
          {team1Score ? (
            <div className="text-right">
              <span className="font-mono text-xl font-bold text-foreground">
                {team1Score.runs}/{team1Score.wickets}
              </span>
              <span className="ml-2 text-sm text-muted-foreground">
                ({team1Score.overs}.{team1Score.balls || 0})
              </span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">Yet to bat</span>
          )}
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-primary-foreground"
              style={{ backgroundColor: match.team2.color }}
            >
              {match.team2.shortName.slice(0, 2)}
            </div>
            <span className="font-semibold text-foreground">{match.team2.name}</span>
            {match.innings[match.currentInnings]?.battingTeamId === match.team2.id && (
              <span className="text-xs text-primary">*</span>
            )}
          </div>
          {team2Score ? (
            <div className="text-right">
              <span className="font-mono text-xl font-bold text-foreground">
                {team2Score.runs}/{team2Score.wickets}
              </span>
              <span className="ml-2 text-sm text-muted-foreground">
                ({team2Score.overs}.{team2Score.balls || 0})
              </span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">Yet to bat</span>
          )}
        </div>
      </div>

      {/* Match Status */}
      <div className="mt-4 rounded-lg bg-primary/10 px-3 py-2">
        <p className="text-sm font-medium text-primary">{getMatchStatus()}</p>
      </div>
    </div>
  );
};
