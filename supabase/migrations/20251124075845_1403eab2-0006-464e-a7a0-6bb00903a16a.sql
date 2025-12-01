-- Add additional fields to profiles for surfer information
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS interests TEXT[],
ADD COLUMN IF NOT EXISTS languages_spoken TEXT[],
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS hometown TEXT;

-- Create surfer_reviews table for hosts to review surfers
CREATE TABLE IF NOT EXISTS public.surfer_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID NOT NULL REFERENCES public.stays_hosts(id) ON DELETE CASCADE,
  surfer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stay_request_id UUID REFERENCES public.stay_requests(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(host_id, surfer_id, stay_request_id)
);

-- Enable RLS on surfer_reviews
ALTER TABLE public.surfer_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view surfer reviews
CREATE POLICY "Anyone can view surfer reviews"
ON public.surfer_reviews
FOR SELECT
USING (true);

-- Hosts can create reviews for their approved surfers
CREATE POLICY "Hosts can create reviews for approved surfers"
ON public.surfer_reviews
FOR INSERT
WITH CHECK (
  host_id IN (
    SELECT id FROM public.stays_hosts WHERE user_id = auth.uid()
  )
  AND EXISTS (
    SELECT 1 FROM public.stay_requests 
    WHERE id = stay_request_id 
    AND status = 'approved'
  )
);

-- Hosts can update their own reviews
CREATE POLICY "Hosts can update own reviews"
ON public.surfer_reviews
FOR UPDATE
USING (
  host_id IN (
    SELECT id FROM public.stays_hosts WHERE user_id = auth.uid()
  )
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_surfer_reviews_surfer_id ON public.surfer_reviews(surfer_id);
CREATE INDEX IF NOT EXISTS idx_surfer_reviews_host_id ON public.surfer_reviews(host_id);