import { LeaveRequest } from '@/types/leave';
import { StatusBadge } from './StatusBadge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Check, X, Forward } from 'lucide-react';

interface LeaveRequestsTableProps {
  requests: LeaveRequest[];
  showActions?: boolean;
  showFaculty?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onForward?: (id: string) => void;
}

const leaveTypeLabels: Record<string, string> = {
  casual: 'Casual',
  earned: 'Earned',
  medical: 'Medical',
  od: 'On-Duty',
};

export const LeaveRequestsTable = ({
  requests,
  showActions = false,
  showFaculty = false,
  onApprove,
  onReject,
  onForward,
}: LeaveRequestsTableProps) => {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">S.No</TableHead>
            {showFaculty && <TableHead className="font-semibold">Faculty</TableHead>}
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">From</TableHead>
            <TableHead className="font-semibold">To</TableHead>
            <TableHead className="font-semibold">Days</TableHead>
            <TableHead className="font-semibold">Reason</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            {showActions && <TableHead className="font-semibold">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showActions ? 9 : 8} className="text-center py-8 text-muted-foreground">
                No leave requests found
              </TableCell>
            </TableRow>
          ) : (
            requests.map((req, index) => (
              <TableRow key={req.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                {showFaculty && (
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{req.facultyName}</p>
                      <p className="text-xs text-muted-foreground">{req.department}</p>
                    </div>
                  </TableCell>
                )}
                <TableCell>
                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                    {leaveTypeLabels[req.leaveType]}
                  </span>
                </TableCell>
                <TableCell className="text-sm">{req.fromDate}</TableCell>
                <TableCell className="text-sm">{req.toDate}</TableCell>
                <TableCell className="text-sm font-medium">{req.numberOfDays}</TableCell>
                <TableCell className="text-sm max-w-[200px] truncate">{req.reason}</TableCell>
                <TableCell><StatusBadge status={req.status} /></TableCell>
                {showActions && req.status === 'pending' && (
                  <TableCell>
                    <div className="flex gap-1">
                      {onApprove && (
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-status-approved hover:bg-accent" onClick={() => onApprove(req.id)}>
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      {onReject && (
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-status-rejected hover:bg-accent" onClick={() => onReject(req.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                      {onForward && (
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-status-forwarded hover:bg-accent" onClick={() => onForward(req.id)}>
                          <Forward className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
                {showActions && req.status !== 'pending' && (
                  <TableCell className="text-xs text-muted-foreground">—</TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
