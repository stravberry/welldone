-- Create redirects table for managing URL redirects
CREATE TABLE public.redirects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    source_url TEXT NOT NULL,
    target_url TEXT NOT NULL,
    redirect_type INTEGER NOT NULL DEFAULT 301, -- 301 (permanent) or 302 (temporary)
    is_active BOOLEAN NOT NULL DEFAULT true,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_by UUID,
    hit_count INTEGER NOT NULL DEFAULT 0,
    last_accessed TIMESTAMP WITH TIME ZONE
);

-- Create unique index on source_url for active redirects
CREATE UNIQUE INDEX idx_redirects_source_url_active 
ON public.redirects (source_url) 
WHERE is_active = true;

-- Create index for performance
CREATE INDEX idx_redirects_target_url ON public.redirects (target_url);
CREATE INDEX idx_redirects_created_at ON public.redirects (created_at);

-- Enable Row Level Security
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;

-- Create policy for full access (since it's admin-only functionality)
CREATE POLICY "Allow all operations on redirects" 
ON public.redirects 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_redirects_updated_at
BEFORE UPDATE ON public.redirects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create table for sitemap entries and 404 monitoring
CREATE TABLE public.sitemap_entries (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    priority DECIMAL(2,1) DEFAULT 0.5,
    changefreq TEXT DEFAULT 'monthly',
    lastmod TIMESTAMP WITH TIME ZONE DEFAULT now(),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for 404 error monitoring
CREATE TABLE public.not_found_errors (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    url TEXT NOT NULL,
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    occurred_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    resolved BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS on new tables
ALTER TABLE public.sitemap_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.not_found_errors ENABLE ROW LEVEL SECURITY;

-- Create policies for new tables
CREATE POLICY "Allow all operations on sitemap_entries" 
ON public.sitemap_entries 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on not_found_errors" 
ON public.not_found_errors 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_sitemap_entries_url ON public.sitemap_entries (url);
CREATE INDEX idx_not_found_errors_url ON public.not_found_errors (url);
CREATE INDEX idx_not_found_errors_occurred_at ON public.not_found_errors (occurred_at);

-- Create triggers for timestamp updates
CREATE TRIGGER update_sitemap_entries_updated_at
BEFORE UPDATE ON public.sitemap_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();