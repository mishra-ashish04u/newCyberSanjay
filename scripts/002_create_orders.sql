-- Create orders table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  amount NUMERIC NOT NULL,
  cashfree_order_id TEXT,
  payment_method TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to create orders"
  ON public.orders FOR INSERT
  TO AUTHENTICATED
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to view their own orders"
  ON public.orders FOR SELECT
  TO AUTHENTICATED
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own orders"
  ON public.orders FOR UPDATE
  TO AUTHENTICATED
  USING (auth.uid() = user_id);
