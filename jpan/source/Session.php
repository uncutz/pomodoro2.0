<?php declare(strict_types=1);

namespace jpan\source;

class Session
{

    /**
     * Session constructor.
     */
    public function __construct()
    {
        session_start();
    }

    /**
     * @param string $key
     * @param mixed $value
     */
    public function set(string $key, $value): void
    {
        $_SESSION[$key] = $value;
    }

    /**
     * @param string $key
     * @param mixed|null $default
     * @return mixed
     */
    public function get(string $key, $default = null)
    {
        return $_SESSION[$key] ?? $default;
    }

    /**
     * @param string $key
     */
    public function unset(string $key): void
    {
        unset($_SESSION[$key]);
    }

    /**
     * @param string $key
     * @return bool
     */
    public function isset(string $key): bool
    {
        return isset($_SESSION[$key]);
    }

    public function destroy(): void
    {
        /*setcookie((string)session_name(), '', 0, '/');*/
        session_destroy();
    }
}