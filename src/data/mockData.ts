import { LeaveBalance, LeaveRequest, Notification, User } from '@/types/leave';

export const mockUsers: User[] = [
  { id: '1', name: 'Dr. Priya Sharma', email: 'priya@college.edu', role: 'faculty', department: 'Computer Science' },
  { id: '2', name: 'Dr. Rajesh Kumar', email: 'rajesh@college.edu', role: 'hod', department: 'Computer Science' },
  { id: '3', name: 'Mr. Arun Patel', email: 'arun@college.edu', role: 'junior_assistant', department: 'Computer Science' },
  { id: '4', name: 'Dr. Meena Iyer', email: 'meena@college.edu', role: 'principal', department: 'Administration' },
];

export const mockLeaveBalance: LeaveBalance[] = [
  { type: 'casual', label: 'Casual Leave', opening: 12, used: 4, available: 8 },
  { type: 'earned', label: 'Earned Leave', opening: 15, used: 2, available: 13 },
  { type: 'medical', label: 'Medical Leave', opening: 10, used: 1, available: 9 },
  { type: 'od', label: 'On-Duty (OD)', opening: 0, used: 3, available: 0 },
];

export const mockLeaveRequests: LeaveRequest[] = [
  { id: '1', facultyId: '1', facultyName: 'Dr. Priya Sharma', department: 'Computer Science', leaveType: 'casual', fromDate: '2026-01-15', toDate: '2026-01-16', numberOfDays: 2, reason: 'Personal work', status: 'approved', appliedDate: '2026-01-10', approvedBy: 'Dr. Rajesh Kumar' },
  { id: '2', facultyId: '1', facultyName: 'Dr. Priya Sharma', department: 'Computer Science', leaveType: 'medical', fromDate: '2026-02-01', toDate: '2026-02-01', numberOfDays: 1, reason: 'Medical appointment', status: 'pending', appliedDate: '2026-01-28' },
  { id: '3', facultyId: '1', facultyName: 'Dr. Priya Sharma', department: 'Computer Science', leaveType: 'od', fromDate: '2026-02-10', toDate: '2026-02-10', numberOfDays: 1, reason: 'Conference attendance', status: 'forwarded', appliedDate: '2026-02-05' },
  { id: '4', facultyId: '5', facultyName: 'Dr. Anita Desai', department: 'Computer Science', leaveType: 'casual', fromDate: '2026-02-12', toDate: '2026-02-13', numberOfDays: 2, reason: 'Family function', status: 'pending', appliedDate: '2026-02-08' },
  { id: '5', facultyId: '6', facultyName: 'Prof. Vikram Singh', department: 'Computer Science', leaveType: 'earned', fromDate: '2026-02-15', toDate: '2026-02-18', numberOfDays: 4, reason: 'Travel', status: 'pending', appliedDate: '2026-02-09' },
  { id: '6', facultyId: '7', facultyName: 'Dr. Sunita Rao', department: 'Mathematics', leaveType: 'od', fromDate: '2026-02-11', toDate: '2026-02-11', numberOfDays: 1, reason: 'Workshop at IIT', status: 'forwarded', appliedDate: '2026-02-06' },
];

export const mockNotifications: Notification[] = [
  { id: '1', message: 'Your casual leave request has been approved by HOD', type: 'success', read: false, createdAt: '2026-02-09T10:30:00' },
  { id: '2', message: 'New leave request from Dr. Anita Desai pending approval', type: 'info', read: false, createdAt: '2026-02-08T14:20:00' },
  { id: '3', message: 'OD leave request forwarded to Principal', type: 'warning', read: true, createdAt: '2026-02-06T09:15:00' },
];
