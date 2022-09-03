<?php declare(strict_types=1);

namespace Backend;

use jpan\source\Contracts\ProvidesDependencies;
use jpan\source\Dependencies;
use jpan\source\Routes;
use PDO;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Slim\Views\Twig;

final class Container extends Dependencies implements ProvidesDependencies
{

    /**
     * @return Session
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function getSession(): Session
    {
        return $this->get('session');
    }

    /**
     * @return PDO
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function getPdo(): PDO
    {
        return $this->get('pdo');
    }

    /**
     * @return Routes
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function getRoutes(): Routes
    {
        return $this->get('routes');
    }

    /**
     * @return Twig
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function getView(): Twig
    {
        return $this->get('view');
    }
}
