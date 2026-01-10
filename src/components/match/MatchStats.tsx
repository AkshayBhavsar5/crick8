import { Match } from '@/types/cricket';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MatchStatsProps {
  match: Match;
}

export const MatchStats = ({ match }: MatchStatsProps) => {
  const currentInnings = match.innings[match.currentInnings];
  
  const stats = [
    {
      label: 'Current Run Rate',
      value: match.currentRunRate?.toFixed(2) || '-',
    },
    {
      label: 'Required Run Rate',
      value: match.requiredRunRate?.toFixed(2) || '-',
    },
    {
      label: 'Target',
      value: match.targetScore?.toString() || '-',
    },
    {
      label: 'Partnership',
      value: currentInnings?.currentPartnership
        ? `${currentInnings.currentPartnership.runs} (${currentInnings.currentPartnership.balls})`
        : '-',
    },
  ];

  const extras = currentInnings?.extras;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Match Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between border-b border-border pb-2 last:border-0"
              >
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="font-mono font-semibold text-foreground">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Extras</CardTitle>
        </CardHeader>
        <CardContent>
          {extras ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-sm text-muted-foreground">Wides</span>
                <span className="font-mono font-semibold">{extras.wides}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-sm text-muted-foreground">No Balls</span>
                <span className="font-mono font-semibold">{extras.noBalls}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-sm text-muted-foreground">Byes</span>
                <span className="font-mono font-semibold">{extras.byes}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-sm text-muted-foreground">Leg Byes</span>
                <span className="font-mono font-semibold">{extras.legByes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Total</span>
                <span className="font-mono font-bold text-foreground">
                  {extras.wides + extras.noBalls + extras.byes + extras.legByes + extras.penalty}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No extras data available</p>
          )}
        </CardContent>
      </Card>

      {currentInnings?.currentPartnership && (
        <Card className="sm:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Current Partnership</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">
                  {currentInnings.currentPartnership.batsman1} &{' '}
                  {currentInnings.currentPartnership.batsman2}
                </p>
                <p className="text-sm text-muted-foreground">
                  Building the innings together
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-2xl font-bold text-primary">
                  {currentInnings.currentPartnership.runs}
                </p>
                <p className="text-sm text-muted-foreground">
                  ({currentInnings.currentPartnership.balls} balls)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
