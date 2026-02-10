
-- Create departments enum/table
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Departments viewable by all authenticated" ON public.departments FOR SELECT TO authenticated USING (true);

-- Seed departments
INSERT INTO public.departments (name) VALUES
  ('Computer Science'),
  ('Electronics'),
  ('Mechanical'),
  ('Civil'),
  ('Electrical'),
  ('Mathematics'),
  ('Physics'),
  ('Chemistry');

-- Create app roles
CREATE TYPE public.app_role AS ENUM ('faculty', 'hod', 'junior_assistant', 'principal');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  department_id UUID REFERENCES public.departments(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Leave balances table
CREATE TABLE public.leave_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  leave_type TEXT NOT NULL CHECK (leave_type IN ('casual', 'earned', 'medical', 'od')),
  opening NUMERIC NOT NULL DEFAULT 0,
  used NUMERIC NOT NULL DEFAULT 0,
  available NUMERIC GENERATED ALWAYS AS (opening - used) STORED,
  academic_year TEXT NOT NULL,
  UNIQUE (user_id, leave_type, academic_year)
);
ALTER TABLE public.leave_balances ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own balances" ON public.leave_balances FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all balances" ON public.leave_balances FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'principal') OR public.has_role(auth.uid(), 'junior_assistant'));

-- Leave requests table
CREATE TABLE public.leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  leave_type TEXT NOT NULL CHECK (leave_type IN ('casual', 'earned', 'medical', 'od')),
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  number_of_days NUMERIC NOT NULL,
  reason TEXT NOT NULL,
  assigned_faculty TEXT,
  is_half_day BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'forwarded')),
  approved_by UUID REFERENCES auth.users(id),
  department_id UUID REFERENCES public.departments(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own requests" ON public.leave_requests FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own requests" ON public.leave_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "HOD can view dept requests" ON public.leave_requests FOR SELECT TO authenticated USING (
  public.has_role(auth.uid(), 'hod') AND department_id IN (SELECT department_id FROM public.profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Principal can view all requests" ON public.leave_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'principal'));
CREATE POLICY "Assistant can view all requests" ON public.leave_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'junior_assistant'));
CREATE POLICY "HOD can update dept requests" ON public.leave_requests FOR UPDATE TO authenticated USING (
  public.has_role(auth.uid(), 'hod') AND department_id IN (SELECT department_id FROM public.profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Principal can update all requests" ON public.leave_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'principal'));

-- Notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Auto-create profile trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, department_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    (NEW.raw_user_meta_data->>'department_id')::UUID
  );
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, (NEW.raw_user_meta_data->>'role')::app_role);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_leave_requests_updated_at BEFORE UPDATE ON public.leave_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
