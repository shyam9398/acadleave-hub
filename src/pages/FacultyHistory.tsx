import DashboardLayout from '@/components/DashboardLayout';
import { LeaveRequestsTable } from '@/components/LeaveRequestsTable';
import { useMyLeaveRequests } from '@/hooks/useLeaveRequests';

const FacultyHistory = () => {
  const { data: requests = [] } = useMyLeaveRequests();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Leave History</h1>
          <p className="text-muted-foreground text-sm">Complete history of your leave applications</p>
        </div>
        <LeaveRequestsTable requests={requests} />
      </div>
    </DashboardLayout>
  );
};

export default FacultyHistory;
