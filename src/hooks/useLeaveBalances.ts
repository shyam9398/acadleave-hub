import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface LeaveBalanceRow {
  id: string;
  user_id: string;
  leave_type: string;
  opening: number;
  used: number;
  available: number | null;
  academic_year: string;
}

export function useMyLeaveBalances() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['my-leave-balances', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leave_balances')
        .select('*')
        .eq('user_id', user!.id);
      if (error) throw error;
      return data as LeaveBalanceRow[];
    },
  });
}
