import { Link } from 'react-router-dom';
import { Match } from '@/types/cricket';
import { LiveBadge } from './LiveBadge';
import { Card, CardContent } from '@/components/ui/card';

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const currentInningsData = match.innings[match.currentInnings];
  const firstInningsData = match.innings[0];

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
    if (match.status === 'live' && match.targetScore) {
      const currentInnings = match.innings[match.currentInnings];
      const runsNeeded = match.targetScore - currentInnings.runs;
      const ballsRemaining = (20 - currentInnings.overs) * 6 - currentInnings.balls;
      if (runsNeeded > 0 && ballsRemaining > 0) {
        return `Need ${runsNeeded} runs in ${Math.floor(ballsRemaining / 6)}.${ballsRemaining % 6} overs`;
      }
    }
    return match.matchType + ' Match';
  };

  return (
    <Link to={`/match/${match.id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-2">
              {match.status === 'live' && <LiveBadge size="sm" />}
              <span className="text-xs font-medium text-muted-foreground">
                {match.tournament}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{match.matchType}</span>
          </div>

          {/* Teams */}
          <div className="space-y-3 p-4">
            {/* Team 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-primary-foreground"
                  style={{ backgroundColor: match.team1.color }}
                >
                  {match.team1.shortName.charAt(0)}
                </div>
                <span className="font-semibold text-foreground">
                  {match.team1.shortName}
                </span>
              </div>
              {team1Score && (
                <div className="text-right">
                  <span className="font-mono text-lg font-bold text-foreground">
                    {team1Score.runs}/{team1Score.wickets}
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({team1Score.overs}.{team1Score.balls})
                  </span>
                </div>
              )}
            </div>

            {/* Team 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-primary-foreground"
                  style={{ backgroundColor: match.team2.color }}
                >
                  {match.team2.shortName.charAt(0)}
                </div>
                <span className="font-semibold text-foreground">
                  {match.team2.shortName}
                </span>
              </div>
              {team2Score && (
                <div className="text-right">
                  <span className="font-mono text-lg font-bold text-foreground">
                    {team2Score.runs}/{team2Score.wickets}
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({team2Score.overs}.{team2Score.balls})
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border bg-muted/20 px-4 py-2">
            <p className="text-xs font-medium text-primary">{getMatchStatus()}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
