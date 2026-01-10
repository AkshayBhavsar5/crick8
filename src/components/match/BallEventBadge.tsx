import { cn } from '@/lib/utils';

interface BallEventBadgeProps {
  runs: number;
  isSix?: boolean;
  isFour?: boolean;
  isWicket?: boolean;
  isWide?: boolean;
  isNoBall?: boolean;
  isDot?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BallEventBadge = ({
  runs,
  isSix,
  isFour,
  isWicket,
  isWide,
  isNoBall,
  isDot,
  size = 'md',
}: BallEventBadgeProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
  };

  const getStyles = () => {
    if (isSix) {
      return 'bg-six text-foreground font-bold';
    }
    if (isFour) {
      return 'bg-four text-primary-foreground font-bold';
    }
    if (isWicket) {
      return 'bg-wicket text-primary-foreground font-bold';
    }
    if (isWide || isNoBall) {
      return 'bg-muted text-muted-foreground border border-border';
    }
    if (isDot || runs === 0) {
      return 'bg-muted text-muted-foreground';
    }
    return 'bg-run text-primary-foreground';
  };

  const getContent = () => {
    if (isWicket) return 'W';
    if (isWide) return 'WD';
    if (isNoBall) return 'NB';
    return runs.toString();
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full font-mono',
        sizeClasses[size],
        getStyles()
      )}
    >
      {getContent()}
    </div>
  );
};
