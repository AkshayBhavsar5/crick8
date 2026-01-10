import { Header } from '@/components/Header';
import { PrimaryScorerPanel } from '@/components/scoring/PrimaryScorerPanel';
import { CommentatorPanel } from '@/components/scoring/CommentatorPanel';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Radio, Users } from 'lucide-react';

const ScoringPanel = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Match Scoring Panel</h1>
            <p className="text-muted-foreground">
              IND vs AUS - IPL 2024 Qualifier 1
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="gap-2 bg-live/20 text-live">
              <Radio className="h-3 w-3 animate-pulse" />
              Live
            </Badge>
            <Badge variant="outline" className="gap-2">
              <Users className="h-3 w-3" />
              2 Scorers Active
            </Badge>
          </div>
        </div>

        {/* Current Score Summary */}
        <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Score</p>
              <p className="text-3xl font-bold text-foreground">
                IND <span className="text-primary">187/4</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Overs</p>
              <p className="text-2xl font-bold text-foreground">16.3</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Run Rate</p>
              <p className="text-2xl font-bold text-primary">11.33</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last 5 Overs</p>
              <p className="text-2xl font-bold text-foreground">58 runs</p>
            </div>
          </CardContent>
        </Card>

        {/* Mobile: Tabs View */}
        <div className="lg:hidden">
          <Tabs defaultValue="scorer" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="scorer">Primary Scorer</TabsTrigger>
              <TabsTrigger value="commentator">Commentator</TabsTrigger>
            </TabsList>
            <TabsContent value="scorer">
              <PrimaryScorerPanel />
            </TabsContent>
            <TabsContent value="commentator">
              <CommentatorPanel />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop: Side by Side */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-2">
          <PrimaryScorerPanel />
          <CommentatorPanel />
        </div>

        {/* Instructions */}
        <Card className="mt-6 border-muted">
          <CardContent className="py-4">
            <h3 className="mb-2 font-semibold text-foreground">Scoring Roles</h3>
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <p className="font-medium text-primary">Primary Scorer</p>
                <p className="text-muted-foreground">
                  Updates runs, wickets, extras, and basic match events. Controls the official scorecard.
                </p>
              </div>
              <div>
                <p className="font-medium text-accent">Commentator</p>
                <p className="text-muted-foreground">
                  Adds detailed ball-by-ball commentary, shot types, bowling analysis, and fielding actions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ScoringPanel;
