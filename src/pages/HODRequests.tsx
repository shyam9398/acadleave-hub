import DashboardLayout from '@/components/DashboardLayout';
import { LeaveRequestsTable } from '@/components/LeaveRequestsTable';
import { mockLeaveRequests } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const HODRequests = () => {
  const { toast } = useToast();
  const pendingRequests = mockLeaveRequests.filter(r => r.status === 'pending');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Pending Leave Requests</h1>
          <p className="text-muted-foreground text-sm">All pending requests requiring your action</p>
        </div>
        <LeaveRequestsTable
          requests={pendingRequests}
          showActions
          showFaculty
          onApprove={(id) => toast({ title: 'Approved', description: `Request #${id} approved.` })}
          onReject={(id) => toast({ title: 'Rejected', description: `Request #${id} rejected.`, variant: 'destructive' })}
          onForward={(id) => toast({ title: 'Forwarded', description: `Request #${id} forwarded to Principal.` })}
        />
      </div>
    </DashboardLayout>
  );
};

export default HODRequests;
