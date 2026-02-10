import { LeaveBalance } from '@/types/leave';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, CalendarCheck, CalendarMinus, Briefcase } from 'lucide-react';

const typeIcons = {
  casual: <CalendarDays className="w-5 h-5" />,
  earned: <CalendarCheck className="w-5 h-5" />,
  medical: <CalendarMinus className="w-5 h-5" />,
  od: <Briefcase className="w-5 h-5" />,
};

export const LeaveBalanceCards = ({ balances }: { balances: LeaveBalance[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {balances.map((b) => {
        const percentage = b.opening > 0 ? ((b.available / b.opening) * 100) : 0;
        return (
          <Card key={b.type} className="border border-border">
            <CardContent className="pt-5 pb-4 px-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground">
                  {typeIcons[b.type]}
                </div>
                <span className="text-2xl font-bold">{b.available}</span>
              </div>
              <h4 className="text-sm font-medium mb-2">{b.label}</h4>
              {b.type !== 'od' ? (
                <>
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Used: {b.used}</span>
                    <span>Total: {b.opening}</span>
                  </div>
                </>
              ) : (
                <p className="text-xs text-muted-foreground">Total OD taken: {b.used}</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
