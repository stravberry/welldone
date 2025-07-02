-- Create services table for managing quote services and pricing
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2),
  is_active BOOLEAN NOT NULL DEFAULT true,
  service_type TEXT NOT NULL, -- 'udt-operator', 'udt-conservator', 'sep', 'forklifts'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create service variants table for specific options within services
CREATE TABLE public.service_variants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price_modifier DECIMAL(10,2) DEFAULT 0, -- Additional cost or discount
  variant_key TEXT NOT NULL, -- 'forklifts', 'cranes', etc.
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quote requests table for CRM functionality
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_type TEXT NOT NULL,
  service_variant TEXT,
  participants_count TEXT NOT NULL,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'in_progress', 'quote_sent', 'completed'
  estimated_price DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Allow all operations on services"
ON public.services
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all operations on service_variants"
ON public.service_variants
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all operations on quote_requests"
ON public.quote_requests
FOR ALL
USING (true)
WITH CHECK (true);

-- Add triggers for updating timestamps
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_variants_updated_at
  BEFORE UPDATE ON public.service_variants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default services data
INSERT INTO public.services (name, description, service_type, base_price) VALUES
('Uprawnienia UDT dla operatorów', 'Szkolenia i egzaminy dla operatorów maszyn i urządzeń', 'udt-operator', 1200.00),
('Uprawnienia UDT dla konserwatorów', 'Szkolenia dla konserwatorów urządzeń technicznych', 'udt-conservator', 1500.00),
('Uprawnienia SEP', 'Szkolenia elektryczne, cieplne i gazowe', 'sep', 800.00),
('Wózki unoszące', 'Szkolenia na wózki widłowe i platformy', 'forklifts', 600.00);

-- Insert service variants
INSERT INTO public.service_variants (service_id, name, description, variant_key, price_modifier) VALUES
-- UDT Operator variants
((SELECT id FROM public.services WHERE service_type = 'udt-operator'), 'Wózki widłowe', 'Wszystkie kategorie', 'forklifts', 0),
((SELECT id FROM public.services WHERE service_type = 'udt-operator'), 'Suwnice', 'Wszystkie kategorie', 'cranes', 200.00),
((SELECT id FROM public.services WHERE service_type = 'udt-operator'), 'Wciągniki i wciągarki', 'Wszystkie kategorie', 'winches', 150.00),
((SELECT id FROM public.services WHERE service_type = 'udt-operator'), 'Podesty ruchome', '', 'platforms', 300.00),
((SELECT id FROM public.services WHERE service_type = 'udt-operator'), 'Układnice magazynowe', '', 'storage-stacker', 250.00),
((SELECT id FROM public.services WHERE service_type = 'udt-operator'), 'Żurawie stacjonarne', '', 'stationary-cranes', 400.00),

-- UDT Conservator variants
((SELECT id FROM public.services WHERE service_type = 'udt-conservator'), 'Suwnice', 'Wszystkie kategorie', 'cranes', 300.00),
((SELECT id FROM public.services WHERE service_type = 'udt-conservator'), 'Wciągniki i wciągarki', 'Wszystkie kategorie', 'winches', 200.00),
((SELECT id FROM public.services WHERE service_type = 'udt-conservator'), 'Żurawie stacjonarne', '', 'stationary-cranes', 500.00),
((SELECT id FROM public.services WHERE service_type = 'udt-conservator'), 'Układnice magazynowe', '', 'storage-stacker', 350.00),

-- SEP variants
((SELECT id FROM public.services WHERE service_type = 'sep'), 'Elektryczne [E1, D1]', '', 'electrical', 0),
((SELECT id FROM public.services WHERE service_type = 'sep'), 'Cieplne [E2, D2]', '', 'thermal', 100.00),
((SELECT id FROM public.services WHERE service_type = 'sep'), 'Gazowe [E3, D3]', '', 'gas', 150.00);