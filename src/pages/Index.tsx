import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { MatchCard } from '@/components/MatchCard';
import { Button } from '@/components/ui/button';
import { Filter, AlertCircle } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTournaments, fetchLiveMatches } from '@/Store/Match/matchSlice';

const Index = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'live'>('all');
  const [tournamentFilter, setTournamentFilter] = useState<number | 'all'>(
    'all'
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get orgId and tournamentId from your auth state or props
  // TODO: Replace with actual values from your auth system
  const orgId = 1;
  const selectedTournamentId = 1;

  const dispatch = useDispatch<any>();

  const {
    liveMatches,
    tournaments,
    loading,
    liveMatchesLoading,
    error,
    liveMatchesError,
  } = useSelector((state: any) => state.match);

  useEffect(() => {
    // Check if token exists
    const token =
      localStorage.getItem('token') ||
      localStorage.getItem('authToken') ||
      localStorage.getItem('accessToken');

    console.log('Token exists:', !!token);
    console.log(
      'Token value:',
      token ? token.substring(0, 20) + '...' : 'No token found'
    );

    if (!token) {
      console.error('No authentication token found. Please log in.');
    }

    // Fetch tournaments for the organization
    dispatch(fetchTournaments(orgId));
  }, [dispatch, orgId]);

  useEffect(() => {
    // Fetch live matches when tournaments are loaded
    if (tournaments && tournaments.length > 0) {
      const tournamentId = tournaments[0].id; // Use first tournament or selected one
      dispatch(fetchLiveMatches(tournamentId));
    }
  }, [dispatch, tournaments]);

  const filteredMatches = useMemo(() => {
    if (!liveMatches) return [];

    return liveMatches.filter((match: any) => {
      const statusMatch =
        statusFilter === 'all' || match.matchStatus === 'live';

      const tournamentMatch =
        tournamentFilter === 'all' || match.tourId === tournamentFilter;

      return statusMatch && tournamentMatch;
    });
  }, [liveMatches, statusFilter, tournamentFilter]);

  // Live match count
  const liveCount = useMemo(() => {
    if (!liveMatches) return 0;
    return liveMatches.filter((m: any) => m.matchStatus === 'live').length;
  }, [liveMatches]);

  const activeFiltersCount =
    (statusFilter !== 'all' ? 1 : 0) + (tournamentFilter !== 'all' ? 1 : 0);

  const clearFilters = () => {
    setStatusFilter('all');
    setTournamentFilter('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <section>
          {/* Error Messages */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error === 'Failed to fetch tournaments'
                  ? 'Authentication error. Please check if you are logged in.'
                  : error}
              </AlertDescription>
            </Alert>
          )}

          {liveMatchesError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{liveMatchesError}</AlertDescription>
            </Alert>
          )}

          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">Matches</h2>
              <span className="rounded-full bg-live/10 px-3 py-1 text-sm font-medium text-live">
                {liveCount} Live
              </span>
            </div>

            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="relative gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-72" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Filters</h4>
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-auto p-1 text-xs"
                      >
                        Clear all
                      </Button>
                    )}
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Status
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant={statusFilter === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setStatusFilter('all')}
                      >
                        All
                      </Button>
                      <Button
                        variant={
                          statusFilter === 'live' ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => setStatusFilter('live')}
                        className={
                          statusFilter === 'live'
                            ? 'bg-live hover:bg-live/90'
                            : ''
                        }
                      >
                        Live
                      </Button>
                    </div>
                  </div>

                  {/* Tournament Filter */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Tournament
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={
                          tournamentFilter === 'all' ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => setTournamentFilter('all')}
                      >
                        All
                      </Button>

                      {tournaments?.map((t: any) => (
                        <Button
                          key={t.id}
                          variant={
                            tournamentFilter === t.id ? 'default' : 'outline'
                          }
                          size="sm"
                          onClick={() => setTournamentFilter(t.id)}
                        >
                          {t.tourName || t.shortName}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Loader */}
          {(loading || liveMatchesLoading) && (
            <div className="text-center py-10 text-muted-foreground">
              Loading matches...
            </div>
          )}

          {/* Matches Grid */}
          {!loading && !liveMatchesLoading && filteredMatches.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMatches.map((match: any) => (
                <MatchCard key={match.macthId} match={match} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading &&
            !liveMatchesLoading &&
            filteredMatches.length === 0 &&
            !error &&
            !liveMatchesError && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16">
                <p className="text-lg font-medium text-muted-foreground">
                  No matches found
                </p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters
                </p>
              </div>
            )}
        </section>
      </main>

      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © 2024 CricLive. Follow live cricket matches from around the world.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
