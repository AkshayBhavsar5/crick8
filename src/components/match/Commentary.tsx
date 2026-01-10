import { BallEvent } from '@/types/cricket';
import { BallEventBadge } from './BallEventBadge';
import { Button } from '@/components/ui/button';
import { Pencil, Target } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface CommentaryProps {
  events: BallEvent[];
}

export const Commentary = ({ events }: CommentaryProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const getEventHighlight = (event: BallEvent) => {
    if (event.isSix) return 'SIX';
    if (event.isFour) return 'FOUR';
    if (event.isWicket) return 'WICKET';
    if (event.extraType === 'wide') return 'Wide';
    if (event.extraType === 'no-ball') return 'No Ball';
    if (event.runs === 0) return 'Dot';
    return `${event.runs} Run${event.runs > 1 ? 's' : ''}`;
  };

  const getHighlightColor = (event: BallEvent) => {
    if (event.isSix) return 'bg-six text-foreground';
    if (event.isFour) return 'bg-four text-primary-foreground';
    if (event.isWicket) return 'bg-wicket text-primary-foreground';
    return 'bg-muted text-muted-foreground';
  };

  const handleEditClick = (eventId: string) => {
    navigate(`/match/${id}/commentary/${eventId}/edit`);
  };

  const handleWagonWheelClick = (eventId: string) => {
    navigate(`/match/${id}/commentary/${eventId}/wagon-wheel`);
  };

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        No ball events yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="animate-fade-in rounded-lg border border-border bg-card p-4"
        >
          <div className="mb-2 flex items-center gap-3">
            <span className="font-mono text-sm font-semibold text-primary">
              {event.over}.{event.ball}
            </span>
            <span className="text-sm text-muted-foreground">
              {event.bowlerName} to {event.batsmanName}
            </span>
            <span
              className={`ml-auto rounded-full px-3 py-1 text-xs font-bold ${getHighlightColor(
                event
              )}`}
            >
              {getEventHighlight(event)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={() => handleEditClick(event.id)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={() => handleWagonWheelClick(event.id)}
              title="View Wagon Wheel"
            >
              <Target className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm leading-relaxed text-foreground">
            {event.commentary}
          </p>
          {event.shotType && (
            <p className="mt-2 text-xs text-muted-foreground">
              Shot: {event.shotType}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
