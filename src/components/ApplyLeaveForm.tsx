import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { LeaveType } from '@/types/leave';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

const leaveTypeOptions: { value: LeaveType; label: string }[] = [
  { value: 'casual', label: 'Casual Leave' },
  { value: 'earned', label: 'Earned Leave' },
  { value: 'medical', label: 'Medical Leave' },
  { value: 'od', label: 'On-Duty (OD)' },
];

export const ApplyLeaveForm = () => {
  const [leaveType, setLeaveType] = useState<LeaveType | ''>('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [isHalfDay, setIsHalfDay] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Leave Applied Successfully',
      description: 'Your leave request has been submitted for approval.',
    });
    setLeaveType('');
    setFromDate('');
    setToDate('');
    setReason('');
    setIsHalfDay(false);
  };

  return (
    <Card className="max-w-2xl border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5" />
          Apply for Leave
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>Leave Type</Label>
            <Select value={leaveType} onValueChange={(v) => setLeaveType(v as LeaveType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                {leaveTypeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From Date</Label>
              <Input id="from" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">To Date</Label>
              <Input id="to" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="halfday"
              checked={isHalfDay}
              onCheckedChange={(v) => setIsHalfDay(v === true)}
            />
            <Label htmlFor="halfday" className="text-sm font-normal cursor-pointer">
              Half-day leave
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="Enter the reason for your leave..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              required
            />
          </div>

          <Button type="submit" className="w-full h-11 font-semibold">
            Submit Leave Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
