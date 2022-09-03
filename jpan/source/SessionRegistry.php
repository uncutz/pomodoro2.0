<?php

namespace jpan\source;

use jpan\source\Contracts\Registry;
use RuntimeException;

class SessionRegistry implements Registry
{

    private ArrayAccessor $arrayAccessor;


    public function __construct()
    {
        $this->arrayAccessor = new ArrayAccessor();
    }
    /**
     * @param string $key
     * @param mixed|null $default
     * @return mixed
     */
    public function get(string $key, $default = null)
    {
        try {
            $this->checkSessionIsOpen();
            return $this->arrayAccessor->get($key, $_SESSION) ?? $default;
        } catch (RuntimeException $exception) {
        }
        return $default;
    }

    /**
     * @param string $key
     * @param $value
     * @return Registry
     */
    public function set(string $key, $value): Registry
    {
        try {
            $this->checkSessionIsOpen();

            $this->arrayAccessor->set($key, $value, $_SESSION);
        } catch (RuntimeException $exception) {
        }

        return $this;
    }

    /**
     * @param string $key
     * @return bool
     */
    public function contains(string $key): bool
    {
        try {
            $this->checkSessionIsOpen();
            return $this->arrayAccessor->contains($key, $_SESSION);
        } catch (RuntimeException $exception) {
        }
        return false;
    }

    /**
     * @param string $key
     * @return Registry
     */
    public function unset(string $key): Registry
    {
        try {
            $this->checkSessionIsOpen();

            $this->arrayAccessor->unset($key, $_SESSION);
        } catch (RuntimeException $exception) {
        }
        return $this;
    }

    private function checkSessionIsOpen(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            throw new RuntimeException('session is not initialized');
        }
    }
}
