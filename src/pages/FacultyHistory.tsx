import DashboardLayout from '@/components/DashboardLayout';
import { LeaveRequestsTable } from '@/components/LeaveRequestsTable';
import { mockLeaveRequests } from '@/data/mockData';

const FacultyHistory = () => {
  const myRequests = mockLeaveRequests.filter(r => r.facultyId === '1');
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Leave History</h1>
          <p className="text-muted-foreground text-sm">Complete history of your leave applications</p>
        </div>
        <LeaveRequestsTable requests={myRequests} />
      </div>
    </DashboardLayout>
  );
};

export default FacultyHistory;
