export type UserRole = 'faculty' | 'hod' | 'junior_assistant' | 'principal';

export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'forwarded';

export type LeaveType = 'casual' | 'earned' | 'medical' | 'od';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

export interface LeaveBalance {
  type: LeaveType;
  label: string;
  opening: number;
  used: number;
  available: number;
}

export interface LeaveRequest {
  id: string;
  facultyId: string;
  facultyName: string;
  department: string;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  numberOfDays: number;
  reason: string;
  status: LeaveStatus;
  appliedDate: string;
  isHalfDay?: boolean;
  approvedBy?: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}
