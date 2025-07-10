#!/bin/bash

# Skrypt wdrożenia przekierowań na VPS
# Uruchom z uprawnieniami sudo

echo "🚀 Rozpoczynam wdrożenie przekierowań na VPS..."

# 1. Backup istniejącej konfiguracji nginx
echo "📋 Tworzenie backup konfiguracji nginx..."
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backup.$(date +%Y%m%d_%H%M%S)

# 2. Kopiowanie nowej konfiguracji nginx
echo "⚙️ Aktualizacja konfiguracji nginx..."
sudo cp nginx.conf /etc/nginx/sites-available/default

# 3. Kopiowanie PHP script do głównego katalogu
echo "📁 Kopiowanie PHP script..."
sudo cp redirect-checker.php /var/www/html/

# 4. Ustawienie uprawnień
echo "🔐 Ustawienie uprawnień..."
sudo chown www-data:www-data /var/www/html/redirect-checker.php
sudo chmod 644 /var/www/html/redirect-checker.php

# 5. Testowanie konfiguracji nginx
echo "🧪 Testowanie konfiguracji nginx..."
if sudo nginx -t; then
    echo "✅ Konfiguracja nginx jest poprawna"
else
    echo "❌ Błąd w konfiguracji nginx!"
    exit 1
fi

# 6. Restart nginx
echo "🔄 Restartowanie nginx..."
sudo systemctl reload nginx

# 7. Sprawdzenie statusu PHP-FPM
echo "🔍 Sprawdzanie statusu PHP-FPM..."
if systemctl is-active --quiet php8.1-fpm; then
    echo "✅ PHP-FPM działa poprawnie"
else
    echo "⚠️ PHP-FPM nie działa! Uruchamiam..."
    sudo systemctl start php8.1-fpm
    sudo systemctl enable php8.1-fpm
fi

# 8. Sprawdzenie statusu nginx
echo "🔍 Sprawdzanie statusu nginx..."
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx działa poprawnie"
else
    echo "❌ Nginx nie działa!"
    exit 1
fi

echo ""
echo "🎉 Wdrożenie zakończone pomyślnie!"
echo ""
echo "📝 Następne kroki:"
echo "1. Przetestuj przekierowania w przeglądarce"
echo "2. Sprawdź logi nginx: sudo tail -f /var/log/nginx/error.log"
echo "3. W razie problemów przywróć backup: sudo cp /etc/nginx/sites-available/default.backup.* /etc/nginx/sites-available/default"
echo ""