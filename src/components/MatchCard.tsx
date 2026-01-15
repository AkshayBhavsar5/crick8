import { Link } from 'react-router-dom';
import { LiveBadge } from './LiveBadge';
import { Card, CardContent } from '@/components/ui/card';

// Match the actual API response structure
interface LiveMatchProps {
  match: {
    matchDate: string;
    matchSummary: string;
    teamName2: string;
    matchName: string;
    matchType: string;
    teamOver1: string;
    teamName1: string;
    teamOver2: string;
    macthId: number;
    teamId1: number;
    tourName: string;
    groundName: string;
    teamId2: number;
    logoImg: string | null;
    teamLogo1: string;
    matchStatus: string;
    teamLogo2: string;
    teamScore2: string;
    teamScore1: string;
    tourId: number;
    location: string | null;
  };
}

export const MatchCard = ({ match }: LiveMatchProps) => {
  // Parse score strings like "150/5" or "200/8"
  const parseScore = (scoreStr: string) => {
    if (!scoreStr || scoreStr === '0' || scoreStr === '') {
      return { runs: 0, wickets: 0, display: 'Yet to bat' };
    }
    const parts = scoreStr.split('/');
    return {
      runs: parseInt(parts[0]) || 0,
      wickets: parseInt(parts[1]) || 0,
      display: scoreStr,
    };
  };

  const team1Score = parseScore(match.teamScore1);
  const team2Score = parseScore(match.teamScore2);

  // Get team initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // Format match status
  const getMatchStatus = () => {
    if (match.matchSummary && match.matchSummary !== '') {
      return match.matchSummary;
    }
    if (match.matchStatus === 'live') {
      return 'Match in progress';
    }
    return match.matchType + ' Match';
  };

  // Generate random colors for teams (or you can store these in your backend)
  const getTeamColor = (teamId: number) => {
    const colors = [
      '#3b82f6', // blue
      '#ef4444', // red
      '#10b981', // green
      '#f59e0b', // amber
      '#8b5cf6', // violet
      '#ec4899', // pink
    ];
    return colors[teamId % colors.length];
  };

  return (
    <Link to={`/match/${match.macthId}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-2">
              {match.matchStatus === 'live' && <LiveBadge size="sm" />}
              <span className="text-xs font-medium text-muted-foreground">
                {match.tourName}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {match.matchType}
            </span>
          </div>

          {/* Teams */}
          <div className="space-y-3 p-4">
            {/* Team 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {match.teamLogo1 ? (
                  <img
                    src={match.teamLogo1}
                    alt={match.teamName1}
                    className="h-8 w-8 rounded-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove(
                        'hidden'
                      );
                    }}
                  />
                ) : null}
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${
                    match.teamLogo1 ? 'hidden' : ''
                  }`}
                  style={{ backgroundColor: getTeamColor(match.teamId1) }}
                >
                  {getInitials(match.teamName1)}
                </div>
                <span className="font-semibold text-foreground">
                  {match.teamName1}
                </span>
              </div>
              <div className="text-right">
                {team1Score.runs > 0 ? (
                  <>
                    <span className="font-mono text-lg font-bold text-foreground">
                      {team1Score.display}
                    </span>
                    {match.teamOver1 && match.teamOver1 !== '0' && (
                      <span className="ml-2 text-sm text-muted-foreground">
                        ({match.teamOver1})
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {team1Score.display}
                  </span>
                )}
              </div>
            </div>

            {/* Team 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {match.teamLogo2 ? (
                  <img
                    src={match.teamLogo2}
                    alt={match.teamName2}
                    className="h-8 w-8 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove(
                        'hidden'
                      );
                    }}
                  />
                ) : null}
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${
                    match.teamLogo2 ? 'hidden' : ''
                  }`}
                  style={{ backgroundColor: getTeamColor(match.teamId2) }}
                >
                  {getInitials(match.teamName2)}
                </div>
                <span className="font-semibold text-foreground">
                  {match.teamName2}
                </span>
              </div>
              <div className="text-right">
                {team2Score.runs > 0 ? (
                  <>
                    <span className="font-mono text-lg font-bold text-foreground">
                      {team2Score.display}
                    </span>
                    {match.teamOver2 && match.teamOver2 !== '0' && (
                      <span className="ml-2 text-sm text-muted-foreground">
                        ({match.teamOver2})
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {team2Score.display}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border bg-muted/20 px-4 py-2">
            <p className="text-xs font-medium text-primary truncate">
              {getMatchStatus()}
            </p>
            {match.groundName && (
              <p className="text-xs text-muted-foreground mt-1 truncate">
                📍 {match.groundName}
                {match.location && `, ${match.location}`}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
