<?php declare(strict_types=1);

namespace jpan\source;

use jpan\source\Contracts\ProvidesDependencies;
use jpan\source\Dependencies\Container;
use LogicException;
use RuntimeException;

class Dependencies extends Container
{
    /**
     * @param string $path
     * @return ProvidesDependencies
     */
    public static function constructFromScheme(string $path): ProvidesDependencies
    {
        $absolutePath = realpath($path);

        if ($absolutePath === false) {
            throw new RuntimeException("could find file in path '$path' ");
        }

        $container = require $absolutePath;

        if ($container instanceof ProvidesDependencies) {
            return $container;
        }

        throw new LogicException('Container must be instance of ' . ProvidesDependencies::class);
    }
}
