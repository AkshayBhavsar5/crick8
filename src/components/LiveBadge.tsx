import { cn } from '@/lib/utils';

interface LiveBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LiveBadge = ({ className, size = 'md' }: LiveBadgeProps) => {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-live font-semibold uppercase tracking-wider text-primary-foreground',
        sizeClasses[size],
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-foreground" />
      </span>
      Live
    </div>
  );
};
