-- Disable admin redirects that interfere with CMS login
UPDATE redirects 
SET is_active = false 
WHERE source_url IN ('/admin', '/admin/', '/cms', '/panel') 
AND target_url = '/cms-login';