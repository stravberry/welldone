-- Dodanie przekierowań dla popularnych wariantów URL
INSERT INTO redirects (source_url, target_url, redirect_type, is_active, description) VALUES
('/udt-konserwatorzy', '/udt-konserwatorze', 301, true, 'Przekierowanie z błędnej pisowni konserwatorzy -> konserwatorze'),
('/operatorzy', '/udt-operatorzy', 301, true, 'Przekierowanie z skróconej wersji operatorzy -> udt-operatorzy'),
('/udt-operatorzy', '/uslugi/udt-operatorzy', 301, true, 'Przekierowanie ze starej struktury URL na nową'),
('/konserwatorzy', '/udt-konserwatorze', 301, true, 'Przekierowanie z skróconej wersji konserwatorzy -> udt-konserwatorze'),
('/szkolenia-sep', '/sep', 301, true, 'Przekierowanie z długiej nazwy SEP na krótką'),
('/uprawnienia-sep', '/sep', 301, true, 'Przekierowanie z wariantu uprawnienia SEP'),
('/szkolenia-elektryczne', '/sep', 301, true, 'Przekierowanie z ogólnej nazwy szkoleń elektrycznych');