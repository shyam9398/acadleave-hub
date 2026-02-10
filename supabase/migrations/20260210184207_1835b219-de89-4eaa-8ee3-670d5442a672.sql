-- Drop the restrictive policy and replace with a permissive one allowing public read
DROP POLICY IF EXISTS "Departments viewable by all authenticated" ON public.departments;

CREATE POLICY "Departments viewable by everyone"
ON public.departments
FOR SELECT
USING (true);