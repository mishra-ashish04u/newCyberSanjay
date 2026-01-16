-- Create user_downloads table to track downloads
CREATE TABLE IF NOT EXISTS public.user_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  order_id UUID REFERENCES public.orders(id),
  downloaded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_downloads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to create download records"
  ON public.user_downloads FOR INSERT
  TO AUTHENTICATED
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to view their own downloads"
  ON public.user_downloads FOR SELECT
  TO AUTHENTICATED
  USING (auth.uid() = user_id);
