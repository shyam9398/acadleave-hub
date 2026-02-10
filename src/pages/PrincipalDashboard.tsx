import DashboardLayout from '@/components/DashboardLayout';
import { LeaveRequestsTable } from '@/components/LeaveRequestsTable';
import { mockLeaveRequests } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ClipboardList, Briefcase, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PrincipalDashboard = () => {
  const { toast } = useToast();

  const forwardedRequests = mockLeaveRequests.filter(r => r.status === 'forwarded');
  const odRequests = mockLeaveRequests.filter(r => r.leaveType === 'od');

  const handleApprove = (id: string) => {
    toast({ title: 'Leave Approved', description: `Request #${id} has been given final approval.` });
  };
  const handleReject = (id: string) => {
    toast({ title: 'Leave Rejected', description: `Request #${id} has been rejected.`, variant: 'destructive' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Principal Dashboard</h1>
          <p className="text-muted-foreground text-sm">Final approval for forwarded and OD leave requests</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Forwarded Requests', value: forwardedRequests.length, icon: <ClipboardList className="w-5 h-5" />, color: 'text-status-forwarded' },
            { label: 'OD Requests', value: odRequests.length, icon: <Briefcase className="w-5 h-5" />, color: 'text-status-pending' },
            { label: 'Total Processed', value: mockLeaveRequests.filter(r => r.status === 'approved').length, icon: <CheckCircle className="w-5 h-5" />, color: 'text-status-approved' },
          ].map(s => (
            <Card key={s.label} className="border border-border">
              <CardContent className="pt-4 pb-3 px-4 flex items-center gap-3">
                <div className={s.color}>{s.icon}</div>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Forwarded Requests */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Forwarded Requests</h2>
          <LeaveRequestsTable
            requests={forwardedRequests}
            showActions
            showFaculty
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </div>

        {/* OD Requests */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg font-semibold">On-Duty Requests</h2>
            <Badge variant="outline" className="text-status-pending border-status-pending">
              Highlighted
            </Badge>
          </div>
          <LeaveRequestsTable
            requests={odRequests}
            showActions
            showFaculty
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PrincipalDashboard;
