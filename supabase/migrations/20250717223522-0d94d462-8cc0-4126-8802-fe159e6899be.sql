-- Create blog categories table
CREATE TABLE public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#FF6B00',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  slug TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'draft' NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  author_id UUID REFERENCES auth.users(id),
  category_id UUID REFERENCES public.blog_categories(id),
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create blog tags table
CREATE TABLE public.blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create blog post tags junction table
CREATE TABLE public.blog_post_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE NOT NULL,
  tag_id UUID REFERENCES public.blog_tags(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(post_id, tag_id)
);

-- Enable RLS on all tables
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to blog_categories" ON public.blog_categories
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to published blog_posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to blog_tags" ON public.blog_tags
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to blog_post_tags" ON public.blog_post_tags
  FOR SELECT USING (true);

-- Create policies for authenticated users with admin roles
CREATE POLICY "Allow admin users to manage blog_categories" ON public.blog_categories
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Allow admin users to manage blog_posts" ON public.blog_posts
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Allow admin users to manage blog_tags" ON public.blog_tags
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Allow admin users to manage blog_post_tags" ON public.blog_post_tags
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for each table
CREATE TRIGGER update_blog_categories_updated_at
BEFORE UPDATE ON public.blog_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_tags_updated_at
BEFORE UPDATE ON public.blog_tags
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample categories
INSERT INTO public.blog_categories (name, slug, description, color, sort_order)
VALUES 
  ('Szkolenia UDT', 'szkolenia-udt', 'Artykuły dotyczące szkoleń UDT', '#FF6B00', 1),
  ('Szkolenia SEP', 'szkolenia-sep', 'Artykuły dotyczące szkoleń SEP', '#3B82F6', 2),
  ('Porady', 'porady', 'Artykuły z poradami', '#10B981', 3),
  ('Aktualności', 'aktualnosci', 'Najnowsze wiadomości', '#8B5CF6', 4);

-- Insert some sample tags
INSERT INTO public.blog_tags (name, slug)
VALUES 
  ('Operatorzy', 'operatorzy'),
  ('Konserwatorzy', 'konserwatorzy'),
  ('Uprawnienia', 'uprawnienia'),
  ('Kursy', 'kursy'),
  ('Certyfikaty', 'certyfikaty');