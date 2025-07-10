<?php
// Plik: redirect-checker.php
// Umieść w głównym katalogu serwera (/var/www/html/)

error_log("Redirect checker started for: " . $_SERVER['REQUEST_URI']);

$requestUri = $_SERVER['REQUEST_URI'];
$requestPath = parse_url($requestUri, PHP_URL_PATH);

// Lista przekierowań - zaktualizuj według swojej bazy danych
$redirects = [
    '/szkolenia-na-wozki-widlowe-na-dolnym-slasku/szkolenia-wozki-widlowe-wroclaw/' => '/uslugi/udt-operatorzy',
    '/admin' => '/cms-login',
    '/admin/' => '/cms-login',
    '/cms' => '/cms-login',
    '/panel' => '/cms-login',
    '/login' => '/cms-login'
];

// Sprawdź czy istnieje przekierowanie
if (isset($redirects[$requestPath])) {
    $targetUrl = $redirects[$requestPath];
    
    error_log("Redirect found: $requestPath -> $targetUrl");
    
    // Wykonaj przekierowanie 301
    header("HTTP/1.1 301 Moved Permanently");
    header("Location: " . $targetUrl);
    exit();
}

error_log("No redirect found for: $requestPath, serving index.html");

// Jeśli nie ma przekierowania, załaduj React app
header('Content-Type: text/html');
readfile('/var/www/html/index.html');
?>