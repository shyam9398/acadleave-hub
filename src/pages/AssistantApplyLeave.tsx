import DashboardLayout from '@/components/DashboardLayout';
import { ApplyLeaveForm } from '@/components/ApplyLeaveForm';

const AssistantApplyLeave = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Apply for Leave</h1>
        <p className="text-muted-foreground text-sm">Submit your own leave request</p>
      </div>
      <ApplyLeaveForm />
    </div>
  </DashboardLayout>
);

export default AssistantApplyLeave;
