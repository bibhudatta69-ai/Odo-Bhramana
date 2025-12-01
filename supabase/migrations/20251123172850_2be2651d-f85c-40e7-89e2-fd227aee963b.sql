-- Add foreign key from stays_hosts to profiles
ALTER TABLE public.stays_hosts 
DROP CONSTRAINT IF EXISTS stays_hosts_user_id_fkey;

ALTER TABLE public.stays_hosts
ADD CONSTRAINT stays_hosts_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES public.profiles(id) 
ON DELETE CASCADE;

-- Create messages table for host-surfer communication
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stay_request_id uuid REFERENCES public.stay_requests(id) ON DELETE CASCADE,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Users can view messages they sent or received
CREATE POLICY "Users can view own messages"
ON public.messages
FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Users can send messages
CREATE POLICY "Users can send messages"
ON public.messages
FOR INSERT
WITH CHECK (auth.uid() = sender_id);

-- Create host_photos table for photo gallery
CREATE TABLE IF NOT EXISTS public.host_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id uuid NOT NULL REFERENCES public.stays_hosts(id) ON DELETE CASCADE,
  photo_url text NOT NULL,
  caption text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on host_photos
ALTER TABLE public.host_photos ENABLE ROW LEVEL SECURITY;

-- Anyone can view host photos
CREATE POLICY "Anyone can view host photos"
ON public.host_photos
FOR SELECT
USING (true);

-- Hosts can manage their own photos
CREATE POLICY "Hosts can manage own photos"
ON public.host_photos
FOR ALL
USING (host_id IN (SELECT id FROM stays_hosts WHERE user_id = auth.uid()));

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_messages_sender ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_host_photos_host_id ON public.host_photos(host_id);