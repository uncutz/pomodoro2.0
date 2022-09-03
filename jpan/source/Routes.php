<?php declare(strict_types=1);

namespace jpan\source;

use Slim\Interfaces\RouteCollectorProxyInterface;

final class Routes
{

    /** @var array<array> */
    private array $routes = [];

    /**
     * @param array<array> $routes
     */
    public function append(array $routes): self
    {
        $this->routes = array_replace_recursive($this->routes, $routes);
        return $this;
    }

    /**
     * @param RouteCollectorProxyInterface $routeCollector
     */
    public function publish(RouteCollectorProxyInterface $routeCollector): void
    {
        foreach ($this->routes as $routeName => $route) {
            $routeCollector
                ->map(array_map('strtoupper', (array)$route['type']), $route['path'], $route['class'])
                ->setName($routeName);
        }
    }
}
