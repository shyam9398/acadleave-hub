import DashboardLayout from '@/components/DashboardLayout';
import { LeaveBalanceCards } from '@/components/LeaveBalanceCards';
import { LeaveRequestsTable } from '@/components/LeaveRequestsTable';
import { useMyLeaveRequests } from '@/hooks/useLeaveRequests';
import { useMyLeaveBalances } from '@/hooks/useLeaveBalances';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, CheckCircle, Clock, XCircle } from 'lucide-react';

const FacultyDashboard = () => {
  const { data: requests = [] } = useMyLeaveRequests();
  const { data: balances = [] } = useMyLeaveBalances();

  const stats = {
    total: requests.length,
    approved: requests.filter(r => r.status === 'approved').length,
    pending: requests.filter(r => r.status === 'pending').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Leave Overview</h1>
          <p className="text-muted-foreground text-sm">Track your leave balance and history</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Applied', value: stats.total, icon: <CalendarDays className="w-5 h-5" />, color: 'text-primary' },
            { label: 'Approved', value: stats.approved, icon: <CheckCircle className="w-5 h-5" />, color: 'text-status-approved' },
            { label: 'Pending', value: stats.pending, icon: <Clock className="w-5 h-5" />, color: 'text-status-pending' },
            { label: 'Rejected', value: stats.rejected, icon: <XCircle className="w-5 h-5" />, color: 'text-status-rejected' },
          ].map((stat) => (
            <Card key={stat.label} className="border border-border">
              <CardContent className="pt-4 pb-3 px-4 flex items-center gap-3">
                <div className={stat.color}>{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Leave Balance</h2>
          <LeaveBalanceCards balances={balances} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Recent Leave History</h2>
          <LeaveRequestsTable requests={requests} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
