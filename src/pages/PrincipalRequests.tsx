import DashboardLayout from '@/components/DashboardLayout';
import { LeaveRequestsTable } from '@/components/LeaveRequestsTable';
import { mockLeaveRequests } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const PrincipalRequests = () => {
  const { toast } = useToast();
  const forwardedRequests = mockLeaveRequests.filter(r => r.status === 'forwarded' || r.leaveType === 'od');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">All Requests for Approval</h1>
          <p className="text-muted-foreground text-sm">Forwarded and OD requests requiring final approval</p>
        </div>
        <LeaveRequestsTable
          requests={forwardedRequests}
          showActions
          showFaculty
          onApprove={(id) => toast({ title: 'Approved', description: `Request #${id} given final approval.` })}
          onReject={(id) => toast({ title: 'Rejected', description: `Request #${id} rejected.`, variant: 'destructive' })}
        />
      </div>
    </DashboardLayout>
  );
};

export default PrincipalRequests;
