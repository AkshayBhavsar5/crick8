import { BallEvent } from '@/types/cricket';
import { BallEventBadge } from './BallEventBadge';
import { ChevronLeft, ChevronRight, Pencil, Target } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface OverSummaryProps {
  events: BallEvent[];
  currentOver: number;
}

export const OverSummary = ({ events, currentOver }: OverSummaryProps) => {
  const [selectedOver, setSelectedOver] = useState(currentOver);

  // Group events by over
  const eventsByOver: Record<number, BallEvent[]> = {};
  events.forEach((event) => {
    if (!eventsByOver[event.over]) {
      eventsByOver[event.over] = [];
    }
    eventsByOver[event.over].push(event);
  });

  // Sort events within each over by ball number
  Object.keys(eventsByOver).forEach((over) => {
    eventsByOver[parseInt(over)].sort((a, b) => a.ball - b.ball);
  });

  const currentOverEvents = eventsByOver[selectedOver] || [];
  const latestEvent = events[0];

  const canGoBack =
    selectedOver > Math.min(...Object.keys(eventsByOver).map(Number));
  const canGoForward = selectedOver < currentOver;

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      {/* Over Navigator */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => canGoBack && setSelectedOver(selectedOver - 1)}
          disabled={!canGoBack}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-muted/80 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-center">
          <span className="text-sm font-medium text-muted-foreground">
            Over
          </span>
          <span className="ml-2 font-mono text-lg font-bold text-foreground">
            {selectedOver}
          </span>
        </div>
        <button
          onClick={() => canGoForward && setSelectedOver(selectedOver + 1)}
          disabled={!canGoForward}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-muted/80 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Ball Events */}
      <div className="flex items-center justify-center gap-2 py-4">
        {currentOverEvents.length > 0 ? (
          currentOverEvents.map((event, index) => (
            <BallEventBadge
              key={event.id}
              runs={event.runs + event.extras}
              isSix={event.isSix}
              isFour={event.isFour}
              isWicket={event.isWicket}
              isWide={event.extraType === 'wide'}
              isNoBall={event.extraType === 'no-ball'}
              isDot={event.runs === 0 && event.extras === 0}
              size="md"
            />
          ))
        ) : (
          <span className="text-sm text-muted-foreground">
            No balls in this over
          </span>
        )}
      </div>

      {/* Latest Event Highlight */}
      {latestEvent && (
        <div className=" flex items-center gap-3 flex-wrap mt-4 rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm font-semibold text-primary">
              {latestEvent.over}.{latestEvent.ball}
            </span>

            <span className="text-sm text-muted-foreground">
              {latestEvent.bowlerName} to {latestEvent.batsmanName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {latestEvent.isSix && (
              <div className=" inline-block rounded-full bg-six px-4 py-1 text-sm font-bold text-foreground">
                It's a SIX!
              </div>
            )}
            {latestEvent.isFour && (
              <div className=" inline-block rounded-full bg-four px-4 py-1 text-sm font-bold text-primary-foreground">
                FOUR!
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="pl-4] h-8 w-8 text-muted-foreground hover:text-primary"
              // onClick={() => handleEditClick(event.id)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              // onClick={() => handleWagonWheelClick(event.id)}
              title="View Wagon Wheel"
            >
              <Target className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-sm text-foreground">
            {latestEvent.commentary}
          </p>
        </div>
      )}
    </div>
  );
};
