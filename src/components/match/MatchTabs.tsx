import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Match } from '@/types/cricket';
import { Commentary } from './Commentary';
import { BattingCard } from './BattingCard';
import { BowlingCard } from './BowlingCard';
import { MatchStats } from './MatchStats';

interface MatchTabsProps {
  match: Match;
}

export const MatchTabs = ({ match }: MatchTabsProps) => {
  const currentInnings = match.innings[match.currentInnings];

  return (
    <Tabs defaultValue="commentary" className="w-full">
      <TabsList className="w-full justify-start rounded-lg border border-border bg-card p-1">
        <TabsTrigger value="commentary" className="flex-1 sm:flex-none">
          Commentary
        </TabsTrigger>
       
      </TabsList>

      <TabsContent value="commentary" className="mt-4">
        <Commentary events={currentInnings?.ballEvents || []} />
      </TabsContent>

      <TabsContent value="scorecard" className="mt-4 space-y-4">
        {match.innings.map((innings, index) => {
          const battingTeam =
            innings.battingTeamId === match.team1.id ? match.team1 : match.team2;
          return (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                {battingTeam.name} Innings
              </h3>
              <BattingCard stats={innings.battingStats} />
              <BowlingCard stats={innings.bowlingStats} />
            </div>
          );
        })}
      </TabsContent>

      <TabsContent value="stats" className="mt-4">
        <MatchStats match={match} />
      </TabsContent>
    </Tabs>
  );
};
