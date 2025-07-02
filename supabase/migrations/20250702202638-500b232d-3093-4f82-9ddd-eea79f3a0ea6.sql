-- Create pricing tiers table for participant count-based pricing
CREATE TABLE public.pricing_tiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  participant_range TEXT NOT NULL, -- '1', '2-5', '6-10', '11-15', '15+'
  price_multiplier DECIMAL(5,2) NOT NULL DEFAULT 1.0, -- Mnożnik ceny bazowej
  fixed_price DECIMAL(10,2), -- Opcjonalna stała cena zamiast mnożnika
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pricing_tiers ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "Allow all operations on pricing_tiers"
ON public.pricing_tiers
FOR ALL
USING (true)
WITH CHECK (true);

-- Add trigger for updating timestamps
CREATE TRIGGER update_pricing_tiers_updated_at
  BEFORE UPDATE ON public.pricing_tiers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default pricing tiers for all services
INSERT INTO public.pricing_tiers (service_id, participant_range, price_multiplier) VALUES
-- UDT Operator
((SELECT id FROM public.services WHERE service_type = 'udt-operator'), '1', 1.0),
((SELECT id FROM public.services WHERE service_type = 'udt-operator'), '2-5', 0.9),
((SELECT id FROM public.services WHERE service_type = 'udt-operator'), '6-10', 0.8),
((SELECT id FROM public.services WHERE service_type = 'udt-operator'), '11-15', 0.75),
((SELECT id FROM public.services WHERE service_type = 'udt-operator'), '15+', 0.7),

-- UDT Conservator
((SELECT id FROM public.services WHERE service_type = 'udt-conservator'), '1', 1.0),
((SELECT id FROM public.services WHERE service_type = 'udt-conservator'), '2-5', 0.9),
((SELECT id FROM public.services WHERE service_type = 'udt-conservator'), '6-10', 0.8),
((SELECT id FROM public.services WHERE service_type = 'udt-conservator'), '11-15', 0.75),
((SELECT id FROM public.services WHERE service_type = 'udt-conservator'), '15+', 0.7),

-- SEP
((SELECT id FROM public.services WHERE service_type = 'sep'), '1', 1.0),
((SELECT id FROM public.services WHERE service_type = 'sep'), '2-5', 0.9),
((SELECT id FROM public.services WHERE service_type = 'sep'), '6-10', 0.8),
((SELECT id FROM public.services WHERE service_type = 'sep'), '11-15', 0.75),
((SELECT id FROM public.services WHERE service_type = 'sep'), '15+', 0.7),

-- Forklifts
((SELECT id FROM public.services WHERE service_type = 'forklifts'), '1', 1.0),
((SELECT id FROM public.services WHERE service_type = 'forklifts'), '2-5', 0.9),
((SELECT id FROM public.services WHERE service_type = 'forklifts'), '6-10', 0.8),
((SELECT id FROM public.services WHERE service_type = 'forklifts'), '11-15', 0.75),
((SELECT id FROM public.services WHERE service_type = 'forklifts'), '15+', 0.7);