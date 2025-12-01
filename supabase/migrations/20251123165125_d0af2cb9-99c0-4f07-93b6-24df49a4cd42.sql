-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Places table
CREATE TABLE public.places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view places"
  ON public.places FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert places"
  ON public.places FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update places"
  ON public.places FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete places"
  ON public.places FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Foods table
CREATE TABLE public.foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.foods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view foods"
  ON public.foods FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert foods"
  ON public.foods FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update foods"
  ON public.foods FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete foods"
  ON public.foods FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Tribes table
CREATE TABLE public.tribes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  regions TEXT,
  overview TEXT,
  belt_info TEXT,
  communities TEXT,
  responsible_travel TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.tribes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tribes"
  ON public.tribes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage tribes"
  ON public.tribes FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Festivals table
CREATE TABLE public.festivals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  date_info TEXT,
  location TEXT,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.festivals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view festivals"
  ON public.festivals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage festivals"
  ON public.festivals FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Districts table
CREATE TABLE public.districts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image_url TEXT,
  quick_facts TEXT,
  getting_there TEXT,
  about TEXT,
  highlights TEXT[],
  traveller_tips TEXT[],
  famous_foods TEXT[],
  tourist_places TEXT[],
  famous_festivals TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view districts"
  ON public.districts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage districts"
  ON public.districts FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Saved places
CREATE TABLE public.saved_places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  place_id UUID NOT NULL REFERENCES public.places(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, place_id)
);

ALTER TABLE public.saved_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved places"
  ON public.saved_places FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved places"
  ON public.saved_places FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved places"
  ON public.saved_places FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Saved foods
CREATE TABLE public.saved_foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  food_id UUID NOT NULL REFERENCES public.foods(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, food_id)
);

ALTER TABLE public.saved_foods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved foods"
  ON public.saved_foods FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved foods"
  ON public.saved_foods FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved foods"
  ON public.saved_foods FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Saved festivals
CREATE TABLE public.saved_festivals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  festival_id UUID NOT NULL REFERENCES public.festivals(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, festival_id)
);

ALTER TABLE public.saved_festivals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved festivals"
  ON public.saved_festivals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved festivals"
  ON public.saved_festivals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved festivals"
  ON public.saved_festivals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Hosts table for Couchsurfing
CREATE TABLE public.stays_hosts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  address TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  interests TEXT[],
  work_description TEXT,
  offerings TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.stays_hosts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view hosts"
  ON public.stays_hosts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own host profile"
  ON public.stays_hosts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own host profile"
  ON public.stays_hosts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own host profile"
  ON public.stays_hosts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Stay requests
CREATE TABLE public.stay_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID NOT NULL REFERENCES public.stays_hosts(id) ON DELETE CASCADE,
  surfer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.stay_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hosts can view requests to them"
  ON public.stay_requests FOR SELECT
  TO authenticated
  USING (host_id IN (SELECT id FROM public.stays_hosts WHERE user_id = auth.uid()));

CREATE POLICY "Surfers can view own requests"
  ON public.stay_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = surfer_id);

CREATE POLICY "Surfers can create requests"
  ON public.stay_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = surfer_id);

CREATE POLICY "Hosts can update request status"
  ON public.stay_requests FOR UPDATE
  TO authenticated
  USING (host_id IN (SELECT id FROM public.stays_hosts WHERE user_id = auth.uid()));

-- Reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews"
  ON public.reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage reviews"
  ON public.reviews FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user');
  
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_stays_hosts_updated_at
  BEFORE UPDATE ON public.stays_hosts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();