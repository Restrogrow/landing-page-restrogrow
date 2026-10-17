<?php
// Shared setup: loads ../.env, connects to MySQL, creates the leads table if missing.

function env_load($file) {
    if (!is_readable($file)) return;
    foreach (file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) continue;
        list($k, $v) = explode('=', $line, 2);
        $v = trim($v);
        if (strlen($v) > 1 && ($v[0] === '"' || $v[0] === "'") && substr($v, -1) === $v[0]) $v = substr($v, 1, -1);
        $_ENV[trim($k)] = $v;
    }
}
env_load(__DIR__ . '/../.env');

function env($k, $default = '') {
    if (isset($_ENV[$k]) && $_ENV[$k] !== '') return $_ENV[$k];
    $v = getenv($k);
    return ($v !== false && $v !== '') ? $v : $default;
}

function json_out($code, $data) {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function body() {
    $j = json_decode(file_get_contents('php://input'), true);
    return is_array($j) ? $j : [];
}

function db() {
    static $pdo = null;
    if ($pdo) return $pdo;
    $pdo = new PDO(
        'mysql:host=' . env('DB_HOST', 'localhost') . ';dbname=' . env('DB_NAME') . ';charset=utf8mb4',
        env('DB_USER'),
        env('DB_PASS'),
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
    );
    $pdo->exec("CREATE TABLE IF NOT EXISTS leads (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        created_at DATETIME NOT NULL,
        name VARCHAR(200) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        brand VARCHAR(200) NOT NULL,
        location VARCHAR(200) NOT NULL,
        outlets VARCHAR(50) NOT NULL,
        orders_day VARCHAR(50) NOT NULL,
        turnover VARCHAR(50) NOT NULL,
        budget VARCHAR(50) NOT NULL,
        page VARCHAR(300) NOT NULL DEFAULT ''
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    // Admin follow-up columns (added after launch, so migrate older tables).
    if (!$pdo->query("SHOW COLUMNS FROM leads LIKE 'status'")->fetch()) {
        $pdo->exec("ALTER TABLE leads ADD COLUMN status VARCHAR(30) NOT NULL DEFAULT 'New', ADD COLUMN notes TEXT NULL");
    }
    return $pdo;
}
