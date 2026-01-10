import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Circle, Target, Zap } from 'lucide-react';

const runButtons = [0, 1, 2, 3, 4, 6];
const extraTypes = ['Wide', 'No Ball', 'Bye', 'Leg Bye'];
const wicketTypes = ['Bowled', 'Caught', 'LBW', 'Run Out', 'Stumped', 'Hit Wicket'];

export const PrimaryScorerPanel = () => {
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [selectedBatsman, setSelectedBatsman] = useState('');
  const [selectedBowler, setSelectedBowler] = useState('');

  const handleRunClick = (runs: number) => {
    setLastAction(`${runs} run${runs !== 1 ? 's' : ''} scored`);
  };

  const handleExtra = (type: string) => {
    setLastAction(`${type} signaled`);
  };

  const handleWicket = (type: string) => {
    setLastAction(`Wicket: ${type}`);
  };

  return (
    <Card className="border-primary/20 bg-card">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-primary" />
            Primary Scorer
          </CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Basic Updates
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Player Selection */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">On Strike</label>
            <Select value={selectedBatsman} onValueChange={setSelectedBatsman}>
              <SelectTrigger>
                <SelectValue placeholder="Select batsman" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kohli">V. Kohli</SelectItem>
                <SelectItem value="rohit">R. Sharma</SelectItem>
                <SelectItem value="pant">R. Pant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Bowler</label>
            <Select value={selectedBowler} onValueChange={setSelectedBowler}>
              <SelectTrigger>
                <SelectValue placeholder="Select bowler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bumrah">J. Bumrah</SelectItem>
                <SelectItem value="shami">M. Shami</SelectItem>
                <SelectItem value="siraj">M. Siraj</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Run Buttons */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Circle className="h-4 w-4" />
            Runs
          </h4>
          <div className="grid grid-cols-6 gap-2">
            {runButtons.map((run) => (
              <Button
                key={run}
                variant={run === 4 ? 'default' : run === 6 ? 'default' : 'outline'}
                className={`h-14 text-lg font-bold ${
                  run === 4 ? 'bg-four hover:bg-four/90' : 
                  run === 6 ? 'bg-six hover:bg-six/90' : ''
                }`}
                onClick={() => handleRunClick(run)}
              >
                {run}
              </Button>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Zap className="h-4 w-4" />
            Extras
          </h4>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {extraTypes.map((extra) => (
              <Button
                key={extra}
                variant="outline"
                className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                onClick={() => handleExtra(extra)}
              >
                {extra}
              </Button>
            ))}
          </div>
        </div>

        {/* Wickets */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-wicket">Wicket</h4>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {wicketTypes.map((wicket) => (
              <Button
                key={wicket}
                variant="outline"
                className="border-wicket/30 text-wicket hover:bg-wicket/10"
                onClick={() => handleWicket(wicket)}
              >
                {wicket}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1">
            Undo Last
          </Button>
          <Button variant="secondary" className="flex-1">
            End Over
          </Button>
          <Button variant="secondary" className="flex-1">
            End Innings
          </Button>
        </div>

        {/* Last Action Display */}
        {lastAction && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
            <p className="text-sm text-muted-foreground">Last Action</p>
            <p className="font-semibold text-primary">{lastAction}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
