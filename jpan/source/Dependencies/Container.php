<?php declare(strict_types=1);

namespace jpan\source\Dependencies;

use Psr\Container\ContainerInterface;
use RuntimeException;

class Container implements ContainerInterface
{
    /** @var array<string, callable> */
    private array $factory = [];

    /** @var array<string, mixed> */
    private array $values = [];


    /**
     * @param string $id
     * @param callable $factory
     */
    public function add(string $id, callable $factory): void
    {
        $this->factory[$id] = $factory;
    }

    /**
     * @inheritDoc
     */
    public function get(string $id)
    {
        if (!$this->has($id)) {
            throw new RuntimeException('dependency  could not be found ' . $id);
        }

        if (!isset($this->values[$id])) {
            $this->values[$id] = $this->factory[$id]($this);
        }

        return $this->values[$id];
    }

    /**
     * @inheritDoc
     */
    public function has(string $id): bool
    {
        return isset($this->factory[$id]);
    }
}
