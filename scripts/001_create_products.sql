-- Create products table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  pdf_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to products"
  ON public.products FOR SELECT
  TO PUBLIC
  USING (true);

-- Insert sample products if they don't exist
INSERT INTO public.products (name, description, price, pdf_url)
VALUES
  (
    '7-Day Ethical Hacking Starter Kit',
    'Your complete beginner-friendly guide to ethical hacking fundamentals',
    99,
    '/pdfs/starter-kit.pdf'
  ),
  (
    'Cybersecurity Resume Booster Pack',
    'Stand out to employers with a powerful cybersecurity resume',
    99,
    '/pdfs/resume-booster.pdf'
  )
ON CONFLICT DO NOTHING;
