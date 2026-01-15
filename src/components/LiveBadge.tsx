import { cn } from '@/lib/utils';

interface LiveBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LiveBadge = ({ size = 'md', className }: LiveBadgeProps) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-live font-semibold text-white',
        sizeClasses[size],
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
      </span>
      LIVE
    </div>
  );
};
