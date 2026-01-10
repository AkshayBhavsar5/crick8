import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Wind } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const CommentaryEdit = () => {
  const { id, eventId } = useParams<{ id: string; eventId: string }>();
  const navigate = useNavigate();
  const [fielderName, setFielderName] = useState('');
  const [commentaryText, setCommentaryText] = useState('');
  const [runsSaved, setRunsSaved] = useState<number | null>(null);
  const [extraRunsGiven, setExtraRunsGiven] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('misfield');

  const handleExtraRunClick = (runs: number) => {
    setExtraRunsGiven(runs);
  };

  const handleRunsSavedClick = (runs: number) => {
    setRunsSaved(runs);
  };

  const netImpact = (runsSaved || 0) - (extraRunsGiven || 0);

  const handleSave = () => {
    const commentaryData = {
      fielderImpact: {
        fielderName,
        runsSaved: runsSaved || 0,
        extraRunsGiven: extraRunsGiven || 0,
        activityType: activeTab,
      },
      commentary: commentaryText,
    };

    console.log('Saving commentary:', commentaryData);
    toast({
      title: 'Commentary Saved',
      description: 'The detailed commentary has been saved successfully.',
    });
    navigate(`/match/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
            <h1 className="text-2xl font-bold text-foreground">
              Edit Commentary
            </h1>
            <p className="text-sm text-muted-foreground">
              Ball Event: {eventId || 'New'}
            </p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Wind className="h-5 w-5 text-primary" />
                Fielder Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label>Fielder Name</Label>
                <Input
                  placeholder="Enter fielder name..."
                  value={fielderName}
                  onChange={(e) => setFielderName(e.target.value)}
                  className="border-border bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label>Fielder Activities</Label>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="saverun">Save Run</TabsTrigger>
                    <TabsTrigger value="misfield">Miss Field</TabsTrigger>
                    <TabsTrigger value="dropcatch">Drop Catch</TabsTrigger>
                  </TabsList>

                  <TabsContent value="saverun" className="mt-4 space-y-3">
                    <Label className="text-primary">Runs Saved</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((runs) => (
                        <Button
                          key={runs}
                          variant={runsSaved === runs ? 'default' : 'outline'}
                          size="sm"
                          className={`h-14 text-lg font-bold ${
                            runsSaved === runs
                              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                              : 'border-primary text-primary hover:bg-primary/80'
                          }`}
                          onClick={() => handleRunsSavedClick(runs)}
                        >
                          {runs}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Runs prevented by good fielding
                    </p>
                  </TabsContent>

                  <TabsContent value="misfield" className="mt-4 space-y-3">
                    <Label className="text-wicket">Extra Runs</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((runs) => (
                        <Button
                          key={runs}
                          variant={
                            extraRunsGiven === runs ? 'default' : 'outline'
                          }
                          size="sm"
                          className={`h-14 text-lg font-bold ${
                            extraRunsGiven === runs
                              ? 'bg-wicket text-wicket-foreground hover:bg-wicket/90'
                              : 'border-wicket text-wicket hover:bg-wicket/80'
                          }`}
                          onClick={() => handleExtraRunClick(runs)}
                        >
                          {runs}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Runs conceded due to fielding errors
                    </p>
                  </TabsContent>

                  <TabsContent value="dropcatch" className="mt-4 space-y-3">
                    <Label className="text-wicket">Extra Runs</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((runs) => (
                        <Button
                          key={runs}
                          variant={
                            extraRunsGiven === runs ? 'default' : 'outline'
                          }
                          size="sm"
                          className={`h-14 text-lg font-bold ${
                            extraRunsGiven === runs
                              ? 'bg-wicket text-wicket-foreground hover:bg-wicket/90'
                              : 'border-wicket text-wicket hover:bg-wicket/80'
                          }`}
                          onClick={() => handleExtraRunClick(runs)}
                        >
                          {runs}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Runs conceded due to a dropped catch
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <span className="font-medium text-foreground pr-1">
                  Net Fielding Impact
                </span>
                <span
                  className={`text-lg font-bold ${
                    netImpact > 0
                      ? 'text-primary'
                      : netImpact < 0
                      ? 'text-wicket'
                      : 'text-muted-foreground'
                  }`}
                >
                  {netImpact > 0 ? '' : ''}
                  {netImpact} runs
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-foreground">
                Detailed Commentary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Textarea
                placeholder="Write detailed commentary for this ball event..."
                value={commentaryText}
                onChange={(e) => setCommentaryText(e.target.value)}
                className="min-h-[200px] border-border bg-background"
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={() => navigate(`/match/${id}`)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary text-primary-foreground"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Commentary
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CommentaryEdit;
