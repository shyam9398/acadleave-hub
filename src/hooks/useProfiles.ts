import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useProfilesMap() {
  return useQuery({
    queryKey: ['profiles-map'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id, full_name, department_id');
      if (error) throw error;
      const map: Record<string, { full_name: string; department_id: string | null }> = {};
      data?.forEach((p) => { map[p.user_id] = p; });
      return map;
    },
  });
}

export function useDepartmentsMap() {
  return useQuery({
    queryKey: ['departments-map'],
    queryFn: async () => {
      const { data, error } = await supabase.from('departments').select('id, name');
      if (error) throw error;
      const map: Record<string, string> = {};
      data?.forEach((d) => { map[d.id] = d.name; });
      return map;
    },
  });
}
