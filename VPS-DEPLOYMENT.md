# Instrukcja wdrożenia przekierowań na VPS

## Wymagania
- Ubuntu/Debian VPS z nginx
- PHP 8.1 lub nowszy z PHP-FPM
- Uprawnienia sudo

## Automatyczne wdrożenie

1. **Pobierz pliki z projektu:**
   ```bash
   # Skopiuj te pliki na swój VPS:
   - nginx.conf
   - redirect-checker.php
   - deploy-redirects.sh
   ```

2. **Uruchom skrypt wdrożenia:**
   ```bash
   chmod +x deploy-redirects.sh
   sudo ./deploy-redirects.sh
   ```

## Ręczne wdrożenie

### Krok 1: Backup istniejącej konfiguracji
```bash
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backup
```

### Krok 2: Aktualizacja konfiguracji nginx
```bash
sudo cp nginx.conf /etc/nginx/sites-available/default
sudo nginx -t  # Test konfiguracji
sudo systemctl reload nginx
```

### Krok 3: Instalacja PHP script
```bash
sudo cp redirect-checker.php /var/www/html/
sudo chown www-data:www-data /var/www/html/redirect-checker.php
sudo chmod 644 /var/www/html/redirect-checker.php
```

### Krok 4: Sprawdzenie PHP-FPM
```bash
sudo systemctl status php8.1-fpm
sudo systemctl start php8.1-fpm  # Jeśli nie działa
sudo systemctl enable php8.1-fpm
```

## Testowanie

1. **Sprawdź czy nginx działa:**
   ```bash
   sudo systemctl status nginx
   ```

2. **Przetestuj przekierowanie:**
   ```bash
   curl -I http://twoja-domena.com/szkolenia-na-wozki-widlowe-na-dolnym-slasku/szkolenia-wozki-widlowe-wroclaw/
   ```
   Powinno zwrócić: `HTTP/1.1 301 Moved Permanently`

3. **Sprawdź logi w razie problemów:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/access.log
   ```

## Aktualizacja przekierowań

Aby dodać nowe przekierowania, edytuj plik `/var/www/html/redirect-checker.php` i zaktualizuj tablicę `$redirects`.

## Rozwiązywanie problemów

### Problem: 502 Bad Gateway
```bash
sudo systemctl restart php8.1-fpm
sudo systemctl restart nginx
```

### Problem: PHP nie działa
```bash
sudo apt update
sudo apt install php8.1-fpm
sudo systemctl enable php8.1-fpm
sudo systemctl start php8.1-fpm
```

### Przywracanie backup
```bash
sudo cp /etc/nginx/sites-available/default.backup /etc/nginx/sites-available/default
sudo systemctl reload nginx
```

## Struktura plików na VPS po wdrożeniu

```
/etc/nginx/sites-available/default  # Nowa konfiguracja nginx
/var/www/html/redirect-checker.php  # PHP script przekierowań
/var/www/html/index.html            # Twoja aplikacja React
```