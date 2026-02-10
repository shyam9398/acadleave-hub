import DashboardLayout from '@/components/DashboardLayout';
import { LeaveRequestsTable } from '@/components/LeaveRequestsTable';
import { useAllLeaveRequests } from '@/hooks/useLeaveRequests';
import { useProfilesMap, useDepartmentsMap } from '@/hooks/useProfiles';

const AssistantRecords = () => {
  const { data: requests = [] } = useAllLeaveRequests();
  const { data: profilesMap = {} } = useProfilesMap();
  const { data: departmentsMap = {} } = useDepartmentsMap();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">All Leave Records</h1>
          <p className="text-muted-foreground text-sm">Complete department-wise leave records</p>
        </div>
        <LeaveRequestsTable requests={requests} showFaculty profilesMap={profilesMap} departmentsMap={departmentsMap} />
      </div>
    </DashboardLayout>
  );
};

export default AssistantRecords;
