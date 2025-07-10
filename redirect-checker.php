<?php
// Plik: redirect-checker.php
// Umieść w głównym katalogu serwera

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
    
    // Wykonaj przekierowanie 301
    header("HTTP/1.1 301 Moved Permanently");
    header("Location: " . $targetUrl);
    exit();
}

// Jeśli nie ma przekierowania, załaduj normalnie React app
// Ten kod powinien być w pliku index.php który obsługuje wszystkie trasy
?>