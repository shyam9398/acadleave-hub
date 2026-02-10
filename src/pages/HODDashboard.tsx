import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { LeaveRequestsTable } from '@/components/LeaveRequestsTable';
import { mockLeaveRequests } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ClipboardList, Clock, CheckCircle, Forward } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const HODDashboard = () => {
  const { toast } = useToast();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchName, setSearchName] = useState('');

  const departmentRequests = mockLeaveRequests.filter(r => r.facultyId !== '2');

  let filtered = departmentRequests;
  if (filterType !== 'all') filtered = filtered.filter(r => r.leaveType === filterType);
  if (searchName) filtered = filtered.filter(r => r.facultyName.toLowerCase().includes(searchName.toLowerCase()));

  const pending = departmentRequests.filter(r => r.status === 'pending');

  const handleApprove = (id: string) => {
    toast({ title: 'Leave Approved', description: `Request #${id} has been approved.` });
  };
  const handleReject = (id: string) => {
    toast({ title: 'Leave Rejected', description: `Request #${id} has been rejected.`, variant: 'destructive' });
  };
  const handleForward = (id: string) => {
    toast({ title: 'Leave Forwarded', description: `Request #${id} forwarded to Principal.` });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Department Leave Requests</h1>
          <p className="text-muted-foreground text-sm">Review and manage leave applications</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Requests', value: departmentRequests.length, icon: <ClipboardList className="w-5 h-5" />, color: 'text-primary' },
            { label: 'Pending', value: pending.length, icon: <Clock className="w-5 h-5" />, color: 'text-status-pending' },
            { label: 'Processed', value: departmentRequests.length - pending.length, icon: <CheckCircle className="w-5 h-5" />, color: 'text-status-approved' },
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

        {/* Filters */}
        <div className="flex gap-3">
          <Input
            placeholder="Search by faculty name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="max-w-xs"
          />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="earned">Earned</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="od">On-Duty</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <LeaveRequestsTable
          requests={filtered}
          showActions
          showFaculty
          onApprove={handleApprove}
          onReject={handleReject}
          onForward={handleForward}
        />
      </div>
    </DashboardLayout>
  );
};

export default HODDashboard;
