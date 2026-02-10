import { LeaveStatus } from '@/types/leave';
import { Badge } from '@/components/ui/badge';

const statusConfig: Record<LeaveStatus, { label: string; className: string }> = {
  approved: { label: 'Approved', className: 'status-approved' },
  rejected: { label: 'Rejected', className: 'status-rejected' },
  pending: { label: 'Pending', className: 'status-pending' },
  forwarded: { label: 'Forwarded', className: 'status-forwarded' },
};

export const StatusBadge = ({ status }: { status: LeaveStatus }) => {
  const config = statusConfig[status];
  return (
    <Badge className={`${config.className} font-medium text-xs px-2.5 py-0.5 border-0`}>
      {config.label}
    </Badge>
  );
};
