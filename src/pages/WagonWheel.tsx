import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMatchById } from '@/data/mockMatches';
import { FieldVisualization } from '@/components/match/FieldVisualization';

import { Header } from '@/components/Header';
const WagonWheel = () => {
  const { id, eventId } = useParams<{ id: string; eventId: string }>();
  const navigate = useNavigate();
  const match = getMatchById(id || '');

  const currentInnings = match?.innings[match.currentInnings];
  const latestEvent = currentInnings?.ballEvents[0];

  // Mock shot data for the wagon wheel
  const shotData = [
    {
      angle: 45,
      distance: 80,
      runs: 4,
      shotType: 'Cover Drive',
      region: 'Cover',
    },
    {
      angle: 90,
      distance: 60,
      runs: 2,
      shotType: 'Straight Drive',
      region: 'Straight',
    },
    {
      angle: 135,
      distance: 100,
      runs: 6,
      shotType: 'Pull Shot',
      region: 'Mid-wicket',
    },
    {
      angle: 180,
      distance: 40,
      runs: 1,
      shotType: 'Flick',
      region: 'Square Leg',
    },
    {
      angle: 225,
      distance: 90,
      runs: 4,
      shotType: 'Sweep',
      region: 'Fine Leg',
    },
    { angle: 315, distance: 70, runs: 3, shotType: 'Cut', region: 'Point' },
    {
      angle: 0,
      distance: 50,
      runs: 2,
      shotType: 'Late Cut',
      region: 'Third Man',
    },
  ];

  const getRunColor = (runs: number) => {
    if (runs === 6) return '#F59E0B'; // Yellow for six
    if (runs === 4) return '#22C55E'; // Green for four
    if (runs >= 2) return '#3B82F6'; // Blue for 2-3 runs
    return '#94A3B8'; // Gray for singles
  };

  const polarToCartesian = (angle: number, distance: number) => {
    const radian = ((angle - 90) * Math.PI) / 180;
    const scaledDistance = (distance / 100) * 120;
    return {
      x: 150 + scaledDistance * Math.cos(radian),
      y: 150 + scaledDistance * Math.sin(radian),
    };
  };

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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Header */}

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/match/${id}`)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Wagon Wheel</h1>
            {latestEvent && (
              <p className="text-sm text-muted-foreground">
                {latestEvent.batsmanName} - Over {latestEvent.over}.
                {latestEvent.ball}
              </p>
            )}
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Wagon Wheel Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">Wagon Wheel</CardTitle>
            </CardHeader>
            <CardContent className="p-10">
              <FieldVisualization latestEvent={latestEvent} />
            </CardContent>
          </Card>

          {/* Shot Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shot Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {shotData.map((shot, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                        style={{ backgroundColor: getRunColor(shot.runs) }}
                      >
                        {shot.runs}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {shot.shotType}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Region: {shot.region}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {shot.distance}%
                      </p>
                      <p className="text-xs text-muted-foreground">Distance</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg bg-muted/50 p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {shotData.reduce((acc, s) => acc + s.runs, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Runs</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {shotData.filter((s) => s.runs >= 4).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Boundaries</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {shotData.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Shots</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default WagonWheel;
