<?php

namespace jpan\source\Contracts;

interface Registry
{

    /**
     * @param string $key
     * @param null|mixed $default
     * @return null|mixed
     */
    public function get(string $key, $default = null);

    /**
     * @param string $key
     * @param $value
     * @return Registry
     */
    public function set(string $key, $value): Registry;

    /**
     * @param string $key
     * @return bool
     */
    public function contains(string $key): bool;

    /**
     * @param string $key
     * @return Registry
     */
    public function unset(string $key): Registry;
}
