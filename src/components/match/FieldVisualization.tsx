import { BallEvent } from '@/types/cricket';

interface FieldVisualizationProps {
  latestEvent?: BallEvent;
}

export const FieldVisualization = ({ latestEvent }: FieldVisualizationProps) => {
  const getShotDirection = (shotType?: string) => {
    const directions: Record<string, { x: number; y: number }> = {
      'Straight drive': { x: 50, y: 10 },
      'Cover drive': { x: 75, y: 25 },
      'On drive': { x: 25, y: 25 },
      'Square cut': { x: 95, y: 50 },
      'Late cut': { x: 85, y: 65 },
      'Pull shot': { x: 20, y: 40 },
      'Hook shot': { x: 15, y: 30 },
      'Sweep shot': { x: 15, y: 70 },
      'Reverse sweep': { x: 85, y: 70 },
    };
    return directions[shotType || ''] || { x: 50, y: 30 };
  };

  const shotDirection = latestEvent?.shotType
    ? getShotDirection(latestEvent.shotType)
    : null;

  return (
    <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-full bg-gradient-field p-4">
      {/* Field circles */}
      <div className="absolute inset-4 rounded-full border-2 border-cricket-pitch/30" />
      <div className="absolute inset-8 rounded-full border border-cricket-pitch/20" />
      
      {/* Pitch in center */}
      <div className="absolute left-1/2 top-1/2 h-32 w-8 -translate-x-1/2 -translate-y-1/2 rounded bg-amber-200/80">
        {/* Stumps */}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-[2px]">
          <div className="h-4 w-[2px] bg-amber-700" />
          <div className="h-4 w-[2px] bg-amber-700" />
          <div className="h-4 w-[2px] bg-amber-700" />
        </div>
        <div className="absolute top-2 left-1/2 flex -translate-x-1/2 gap-[2px]">
          <div className="h-4 w-[2px] bg-amber-700" />
          <div className="h-4 w-[2px] bg-amber-700" />
          <div className="h-4 w-[2px] bg-amber-700" />
        </div>
      </div>

      {/* Shot trajectory */}
      {latestEvent && shotDirection && (
        <svg className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="shotGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="white" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <line
            x1="50%"
            y1="50%"
            x2={`${shotDirection.x}%`}
            y2={`${shotDirection.y}%`}
            stroke="url(#shotGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-fade-in"
          />
          <circle
            cx={`${shotDirection.x}%`}
            cy={`${shotDirection.y}%`}
            r="8"
            className={`animate-pulse-live ${
              latestEvent.isSix
                ? 'fill-six'
                : latestEvent.isFour
                ? 'fill-four'
                : 'fill-primary-foreground'
            }`}
          />
        </svg>
      )}

      {/* Live badge */}
      <div className="absolute left-4 top-4">
        <div className="flex items-center gap-1.5 rounded-full bg-live px-2 py-1 text-xs font-semibold text-primary-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-foreground" />
          </span>
          LIVE
        </div>
      </div>
    </div>
  );
};
