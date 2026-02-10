import DashboardLayout from '@/components/DashboardLayout';
import { LeaveRequestsTable } from '@/components/LeaveRequestsTable';
import { mockLeaveRequests } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, Bell, Download, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AssistantDashboard = () => {
  const { toast } = useToast();

  const stats = {
    total: mockLeaveRequests.length,
    approved: mockLeaveRequests.filter(r => r.status === 'approved').length,
    pending: mockLeaveRequests.filter(r => r.status === 'pending').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Leave Records</h1>
            <p className="text-muted-foreground text-sm">Department-wise leave records and status summaries</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast({ title: 'Printing...', description: 'Preparing leave records for print.' })}
            >
              <Printer className="w-4 h-4 mr-1" /> Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast({ title: 'Downloading...', description: 'Leave records will be downloaded shortly.' })}
            >
              <Download className="w-4 h-4 mr-1" /> Download
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Records', value: stats.total, icon: <FileText className="w-5 h-5" />, color: 'text-primary' },
            { label: 'Approved', value: stats.approved, icon: <Users className="w-5 h-5" />, color: 'text-status-approved' },
            { label: 'Pending', value: stats.pending, icon: <Bell className="w-5 h-5" />, color: 'text-status-pending' },
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

        <LeaveRequestsTable requests={mockLeaveRequests} showFaculty />
      </div>
    </DashboardLayout>
  );
};

export default AssistantDashboard;
