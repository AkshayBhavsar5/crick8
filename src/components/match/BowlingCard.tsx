import { BowlingStats } from '@/types/cricket';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface BowlingCardProps {
  stats: BowlingStats[];
  title?: string;
}

export const BowlingCard = ({ stats, title = 'Bowler' }: BowlingCardProps) => {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[200px]">Bowler</TableHead>
            <TableHead className="text-center">O</TableHead>
            <TableHead className="text-center">M</TableHead>
            <TableHead className="text-center">R</TableHead>
            <TableHead className="text-center">W</TableHead>
            <TableHead className="text-center">ECO</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.map((player) => (
            <TableRow key={player.playerId}>
              <TableCell>
                <span className="font-medium text-foreground">
                  {player.playerName}
                </span>
              </TableCell>
              <TableCell className="text-center font-mono text-muted-foreground">
                {player.overs}
              </TableCell>
              <TableCell className="text-center font-mono text-muted-foreground">
                {player.maidens}
              </TableCell>
              <TableCell className="text-center font-mono">
                {player.runs}
              </TableCell>
              <TableCell className="text-center font-mono font-semibold text-wicket">
                {player.wickets}
              </TableCell>
              <TableCell className="text-center font-mono">
                {player.economy.toFixed(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
