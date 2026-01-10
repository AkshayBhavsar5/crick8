import { BattingStats } from '@/types/cricket';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface BattingCardProps {
  stats: BattingStats[];
  title?: string;
}

export const BattingCard = ({ stats, title = 'Batter' }: BattingCardProps) => {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[200px]">Batter</TableHead>
            <TableHead className="text-center">R</TableHead>
            <TableHead className="text-center">B</TableHead>
            <TableHead className="text-center">4s</TableHead>
            <TableHead className="text-center">6s</TableHead>
            <TableHead className="text-center">SR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.map((player) => (
            <TableRow key={player.playerId}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">
                    {player.playerName}
                  </span>
                  {player.isOnStrike && (
                    <span className="text-primary">*</span>
                  )}
                  {player.isOut && (
                    <span className="text-xs text-muted-foreground">
                      ({player.dismissalType})
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center font-mono font-semibold">
                {player.runs}
              </TableCell>
              <TableCell className="text-center font-mono text-muted-foreground">
                {player.balls}
              </TableCell>
              <TableCell className="text-center font-mono text-four">
                {player.fours}
              </TableCell>
              <TableCell className="text-center font-mono text-six">
                {player.sixes}
              </TableCell>
              <TableCell className="text-center font-mono">
                {player.strikeRate.toFixed(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
