import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMatchById } from '@/data/mockMatches';

const WagonWheel = () => {
  const { id, eventId } = useParams<{ id: string; eventId: string }>();
  const navigate = useNavigate();
  const match = getMatchById(id || '');

  const currentInnings = match?.innings[match.currentInnings];
  const event = currentInnings?.ballEvents.find((e) => e.id === eventId);

  // Mock over data
  const [currentOver, setCurrentOver] = useState(18);

  // Mock balls in the current over
  const overBalls = [
    { ball: 1, runs: 4, isWicket: false, shotAngle: 45 },
    { ball: 2, runs: 0, isWicket: false, shotAngle: null },
    { ball: 3, runs: 2, isWicket: false, shotAngle: 120 },
    { ball: 4, runs: 6, isWicket: false, shotAngle: 315 },
  ];

  const [selectedBall, setSelectedBall] = useState(3); // 0-indexed, so ball 4 (18.4)

  const selectedBallData = overBalls[selectedBall];

  const getBallColor = (runs: number, isWicket: boolean) => {
    if (isWicket) return 'bg-red-500';
    if (runs === 6) return 'bg-yellow-500';
    if (runs === 4) return 'bg-emerald-500';
    if (runs >= 1) return 'bg-blue-500';
    return 'bg-muted-foreground/50';
  };

  const getBallTextColor = (runs: number, isWicket: boolean) => {
    if (runs === 0 && !isWicket) return 'text-foreground';
    return 'text-white';
  };

  // Convert angle to cartesian coordinates for shot line
  const polarToCartesian = (
    angle: number,
    distance: number,
    centerX: number,
    centerY: number
  ) => {
    const radian = ((angle - 90) * Math.PI) / 180;
    return {
      x: centerX + distance * Math.cos(radian),
      y: centerY + distance * Math.sin(radian),
    };
  };

  const handlePrevOver = () => {
    if (currentOver > 1) setCurrentOver(currentOver - 1);
  };

  const handleNextOver = () => {
    setCurrentOver(currentOver + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/match/${id}`)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Wagon Wheel</h1>
            {event && (
              <p className="text-sm text-muted-foreground">
                {event.batsmanName} - Over {event.over}.{event.ball}
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-md">
        {/* Wagon Wheel Field */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <svg viewBox="0 0 300 300" className="w-72 h-72">
              {/* Green circular field */}
              <circle cx="150" cy="150" r="140" fill="#22C55E" />

              {/* Inner circle (30 yard circle) */}
              <circle
                cx="150"
                cy="150"
                r="90"
                fill="none"
                stroke="#1D9B4E"
                strokeWidth="2"
                strokeDasharray="8 4"
              />

              {/* Pitch - cream/tan colored rectangle */}
              <rect
                x="140"
                y="100"
                width="20"
                height="100"
                fill="#D4A574"
                rx="2"
              />

              {/* Stumps at batting end (top) */}
              <line
                x1="145"
                y1="110"
                x2="145"
                y2="125"
                stroke="#8B4513"
                strokeWidth="2"
              />
              <line
                x1="150"
                y1="110"
                x2="150"
                y2="125"
                stroke="#8B4513"
                strokeWidth="2"
              />
              <line
                x1="155"
                y1="110"
                x2="155"
                y2="125"
                stroke="#8B4513"
                strokeWidth="2"
              />
              {/* Bails */}
              <line
                x1="144"
                y1="110"
                x2="151"
                y2="110"
                stroke="#8B4513"
                strokeWidth="2"
              />
              <line
                x1="149"
                y1="110"
                x2="156"
                y2="110"
                stroke="#8B4513"
                strokeWidth="2"
              />

              {/* Stumps at bowler end (bottom) */}
              <line
                x1="145"
                y1="175"
                x2="145"
                y2="190"
                stroke="#8B4513"
                strokeWidth="2"
              />
              <line
                x1="150"
                y1="175"
                x2="150"
                y2="190"
                stroke="#8B4513"
                strokeWidth="2"
              />
              <line
                x1="155"
                y1="175"
                x2="155"
                y2="190"
                stroke="#8B4513"
                strokeWidth="2"
              />
              {/* Bails */}
              <line
                x1="144"
                y1="175"
                x2="151"
                y2="175"
                stroke="#8B4513"
                strokeWidth="2"
              />
              <line
                x1="149"
                y1="175"
                x2="156"
                y2="175"
                stroke="#8B4513"
                strokeWidth="2"
              />

              {/* Shot line - if there's a shot angle for selected ball */}
              {selectedBallData?.shotAngle !== null && (
                <>
                  {/* Shot line */}
                  <line
                    x1="150"
                    y1="150"
                    x2={
                      polarToCartesian(
                        selectedBallData.shotAngle,
                        130,
                        150,
                        150
                      ).x
                    }
                    y2={
                      polarToCartesian(
                        selectedBallData.shotAngle,
                        130,
                        150,
                        150
                      ).y
                    }
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Ball marker at the end */}
                  <circle
                    cx={
                      polarToCartesian(
                        selectedBallData.shotAngle,
                        130,
                        150,
                        150
                      ).x
                    }
                    cy={
                      polarToCartesian(
                        selectedBallData.shotAngle,
                        130,
                        150,
                        150
                      ).y
                    }
                    r="8"
                    fill="#EAB308"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Over Navigation */}
        <div className="bg-card border border-border rounded-xl p-4 mb-4">
          {/* Over selector */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevOver}
              disabled={currentOver <= 1}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-foreground font-medium">
              Over <span className="font-bold">{currentOver}</span>
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextOver}
              className="h-8 w-8"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Ball indicators */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {overBalls.map((ball, index) => (
              <button
                key={index}
                onClick={() => setSelectedBall(index)}
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold
                  transition-all duration-200
                  ${getBallColor(ball.runs, ball.isWicket)}
                  ${getBallTextColor(ball.runs, ball.isWicket)}
                  ${
                    selectedBall === index
                      ? 'ring-2 ring-offset-2 ring-primary'
                      : ''
                  }
                `}
              >
                {ball.runs}
              </button>
            ))}
          </div>

          {/* Ball details */}
          <div className="border-t border-border pt-4">
            <p className="text-primary font-semibold mb-1">
              {currentOver}.{selectedBall + 1} Hardik Pandya to Virat Kohli
            </p>

            {selectedBallData.runs === 6 && (
              <span className="inline-block bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                It's a SIX!
              </span>
            )}
            
            {selectedBallData.runs === 4 && (
              <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                FOUR!
              </span>
            )}
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              What a horrid start for the home team. It's a high, high full toss
              (well above the waist) outside off from round the wicket, a tiny
              shuffle and Imad Wasim mauls the pull many-a-mile over mid-wicket
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WagonWheel;
