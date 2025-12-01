-- Enable realtime for stay_requests table
ALTER PUBLICATION supabase_realtime ADD TABLE public.stay_requests;

-- Enable realtime for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;