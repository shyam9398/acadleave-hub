import DashboardLayout from '@/components/DashboardLayout';
import { LeaveRequestsTable } from '@/components/LeaveRequestsTable';
import { mockLeaveRequests } from '@/data/mockData';

const AssistantRecords = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">All Leave Records</h1>
        <p className="text-muted-foreground text-sm">Complete department-wise leave records</p>
      </div>
      <LeaveRequestsTable requests={mockLeaveRequests} showFaculty />
    </div>
  </DashboardLayout>
);

export default AssistantRecords;
