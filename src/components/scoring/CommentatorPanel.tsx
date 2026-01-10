import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { MessageSquare, Mic, Send, Sparkles } from 'lucide-react';

const shotTypes = [
  'Straight Drive', 'Cover Drive', 'On Drive', 'Square Cut', 'Late Cut',
  'Pull Shot', 'Hook Shot', 'Sweep', 'Reverse Sweep', 'Scoop', 'Upper Cut',
  'Defensive', 'Flick', 'Glance', 'Edge'
];

const bowlingTypes = [
  'Yorker', 'Bouncer', 'Full Toss', 'Slower Ball', 'Off Spin', 'Leg Spin',
  'Outswinger', 'Inswinger', 'Seam Movement', 'Length Ball', 'Good Length'
];

const fieldingActions = [
  'Diving Catch', 'One-handed Catch', 'Boundary Save', 'Direct Hit',
  'Relay Throw', 'Misfield', 'Dropped Catch', 'Run Out Assist'
];

export const CommentatorPanel = () => {
  const [commentary, setCommentary] = useState('');
  const [selectedShot, setSelectedShot] = useState('');
  const [selectedBowling, setSelectedBowling] = useState('');
  const [selectedFielding, setSelectedFielding] = useState('');
  const [ballSpeed, setBallSpeed] = useState('');
  const [recentCommentaries, setRecentCommentaries] = useState<string[]>([]);

  const handleSubmit = () => {
    if (commentary.trim()) {
      setRecentCommentaries((prev) => [commentary, ...prev].slice(0, 5));
      setCommentary('');
      setSelectedShot('');
      setSelectedBowling('');
      setSelectedFielding('');
      setBallSpeed('');
    }
  };

  const insertTemplate = (template: string) => {
    setCommentary((prev) => prev + (prev ? ' ' : '') + template);
  };

  return (
    <Card className="border-accent/20 bg-card">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5 text-accent" />
            Commentator
          </CardTitle>
          <Badge variant="outline" className="bg-accent/10 text-accent">
            Detailed Commentary
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Ball Details */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Shot Type</label>
            <Select value={selectedShot} onValueChange={setSelectedShot}>
              <SelectTrigger>
                <SelectValue placeholder="Select shot" />
              </SelectTrigger>
              <SelectContent>
                {shotTypes.map((shot) => (
                  <SelectItem key={shot} value={shot.toLowerCase().replace(/\s/g, '-')}>
                    {shot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Bowling Type</label>
            <Select value={selectedBowling} onValueChange={setSelectedBowling}>
              <SelectTrigger>
                <SelectValue placeholder="Select delivery" />
              </SelectTrigger>
              <SelectContent>
                {bowlingTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase().replace(/\s/g, '-')}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Ball Speed (km/h)</label>
            <Input
              type="number"
              placeholder="142"
              value={ballSpeed}
              onChange={(e) => setBallSpeed(e.target.value)}
            />
          </div>
        </div>

        {/* Fielding Action */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Fielding Action (if any)</label>
          <Select value={selectedFielding} onValueChange={setSelectedFielding}>
            <SelectTrigger>
              <SelectValue placeholder="Select fielding action" />
            </SelectTrigger>
            <SelectContent>
              {fieldingActions.map((action) => (
                <SelectItem key={action} value={action.toLowerCase().replace(/\s/g, '-')}>
                  {action}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Commentary Templates */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            Quick Templates
          </h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => insertTemplate('What a shot!')}
            >
              What a shot!
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => insertTemplate('Brilliant delivery!')}
            >
              Brilliant delivery!
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => insertTemplate('Edged and gone!')}
            >
              Edged and gone!
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => insertTemplate('That went like a tracer bullet!')}
            >
              Tracer bullet!
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => insertTemplate('Pressure building here...')}
            >
              Pressure building
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => insertTemplate('Excellent fielding!')}
            >
              Excellent fielding
            </Button>
          </div>
        </div>

        {/* Commentary Text Area */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-muted-foreground">
            Ball-by-Ball Commentary
          </label>
          <Textarea
            placeholder="Write detailed commentary for this delivery..."
            className="min-h-[120px] resize-none"
            value={commentary}
            onChange={(e) => setCommentary(e.target.value)}
          />
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Mic className="h-4 w-4" />
              Voice Input
            </Button>
            <Button className="flex-1 gap-2" onClick={handleSubmit}>
              <Send className="h-4 w-4" />
              Submit Commentary
            </Button>
          </div>
        </div>

        {/* Recent Commentaries */}
        {recentCommentaries.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground">Recent Entries</h4>
            <div className="space-y-2">
              {recentCommentaries.map((comm, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-muted/30 p-3 text-sm"
                >
                  {comm}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
