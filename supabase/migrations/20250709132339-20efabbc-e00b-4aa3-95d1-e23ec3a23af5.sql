-- Create table for site pages indexing
CREATE TABLE IF NOT EXISTS site_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_indexed TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE site_pages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow all operations on site_pages" ON site_pages FOR ALL USING (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_site_pages_path ON site_pages(path);
CREATE INDEX IF NOT EXISTS idx_site_pages_title ON site_pages(title);
CREATE INDEX IF NOT EXISTS idx_site_pages_active ON site_pages(is_active);

-- Insert initial site pages
INSERT INTO site_pages (path, title, description) VALUES 
('/', 'Strona główna', 'Strona główna serwisu'),
('/uslugi', 'Usługi', 'Przegląd wszystkich usług'),
('/udt-szkolenia', 'Szkolenia UDT', 'Szkolenia operatorów UDT'),
('/udt-konserwatorzy', 'Konserwatorzy UDT', 'Szkolenia konserwatorów UDT'),
('/udt-operatorzy', 'Operatorzy UDT', 'Szkolenia operatorów UDT'),
('/wozki-unoszace', 'Wózki unoszące', 'Szkolenia na wózki unoszące'),
('/lutowanie', 'Lutowanie', 'Kursy lutowania'),
('/eventy', 'Eventy', 'Organizacja eventów'),
('/sep', 'SEP', 'Szkolenia SEP'),
('/kontakt', 'Kontakt', 'Formularz kontaktowy'),
('/wycena', 'Wycena', 'Formularz wyceny'),
('/audyt', 'Audyt bezpłatny', 'Bezpłatny audyt uprawnień'),
('/o-nas', 'O nas', 'Informacje o firmie'),
('/realizacje', 'Realizacje', 'Nasze realizacje'),
('/wiedza', 'Wiedza', 'Baza wiedzy'),
('/mapa-strony', 'Mapa strony', 'Mapa strony'),
('/polityka-prywatnosci', 'Polityka prywatności', 'Polityka prywatności'),
('/regulamin', 'Regulamin', 'Regulamin serwisu')
ON CONFLICT (path) DO NOTHING;

-- Create trigger for updating timestamps
CREATE TRIGGER update_site_pages_updated_at
  BEFORE UPDATE ON site_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();