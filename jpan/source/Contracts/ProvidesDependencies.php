<?php declare(strict_types=1);

namespace jpan\source\Contracts;

use jpan\source\Session;
use PDO;

interface ProvidesDependencies
{
    public function getPdo(): PDO;

    public function getSession(): Session;
}
