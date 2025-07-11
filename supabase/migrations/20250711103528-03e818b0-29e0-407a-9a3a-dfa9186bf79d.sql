-- Deactivate admin redirects that are causing login loop
UPDATE redirects 
SET is_active = false 
WHERE source_url IN ('/admin', '/admin/') 
AND target_url = '/cms-login';