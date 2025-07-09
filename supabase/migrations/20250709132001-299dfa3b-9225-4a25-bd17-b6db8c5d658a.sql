-- Add existing site redirects
INSERT INTO redirects (source_url, target_url, redirect_type, is_active, description) VALUES
('/admin', '/cms-login', 301, true, 'Redirect from /admin to CMS login page'),
('/admin/', '/cms-login', 301, true, 'Redirect from /admin/ to CMS login page'),
('/cms', '/cms-login', 301, true, 'Redirect from /cms to CMS login page'),
('/panel', '/cms-login', 301, true, 'Redirect from /panel to CMS login page'),
('/login', '/cms-login', 301, true, 'Redirect from /login to CMS login page');