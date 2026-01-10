import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ScoreHeader } from '@/components/match/ScoreHeader';
import { FieldVisualization } from '@/components/match/FieldVisualization';
import { OverSummary } from '@/components/match/OverSummary';
import { MatchTabs } from '@/components/match/MatchTabs';
import { BattingCard } from '@/components/match/BattingCard';
import { BowlingCard } from '@/components/match/BowlingCard';
import { getMatchById } from '@/data/mockMatches';

const MatchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const match = getMatchById(id || '');

  if (!match) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Match Not Found
            </h1>
            <p className="text-muted-foreground">
              The match you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentInnings = match.innings[match.currentInnings];
  const latestEvent = currentInnings?.ballEvents[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Field Visualization & Over Summary */}
          <div className="space-y-6 lg:col-span-1">
            {/* <FieldVisualization latestEvent={latestEvent} /> */}
            <OverSummary
              events={currentInnings?.ballEvents || []}
              currentOver={currentInnings?.overs || 0}
            />
          </div>

          {/* Center Column - Score & Tabs */}
          <div className="space-y-6 lg:col-span-2">
            {/* <ScoreHeader match={match} /> */}

            {/* Current Batsmen & Bowler */}
            {/* <div className="grid gap-4 sm:grid-cols-2">
              <BattingCard
                stats={currentInnings?.battingStats.filter((s) => !s.isOut).slice(0, 2) || []}
                title="At the Crease"
              />
              <BowlingCard
                stats={currentInnings?.bowlingStats.slice(0, 2) || []}
                title="Bowling"
              />
            </div> */}

            {/* Match Tabs */}
            <MatchTabs match={match} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 CricLive. All match data is for demonstration purposes.</p>
        </div>
      </footer>
    </div>
  );
};

export default MatchDetail;
