import { Header } from '@/components/Header';
import { MatchCard } from '@/components/MatchCard';
import { mockMatches } from '@/data/mockMatches';
import { LiveBadge } from '@/components/LiveBadge';

const Index = () => {
  const liveMatches = mockMatches.filter((m) => m.status === 'live');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
       

        {/* Live Matches Section */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">Live Matches</h2>
              <span className="rounded-full bg-live/10 px-3 py-1 text-sm font-medium text-live">
                {liveMatches.length} Live
              </span>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>

          {liveMatches.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16">
              <p className="text-lg font-medium text-muted-foreground">
                No live matches at the moment
              </p>
              <p className="text-sm text-muted-foreground">
                Check back later for live action
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 CricLive. Follow live cricket matches from around the world.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
