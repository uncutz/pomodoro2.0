<?php declare(strict_types=1);

namespace Backend\Controller;

use Backend\Container;
use jpan\source\Contracts\ProvidesDependencies;
use LogicException;
use Throwable;

class AbstractController extends \jpan\source\AbstractController
{

    /**
     * @param ProvidesDependencies $dependencies
     */
    public function __construct(ProvidesDependencies $dependencies)
    {
        parent::__construct($dependencies);

        try {
            $session = $this->getContainer()->getSession();
            $env = $this->getContainer()->getView()->getEnvironment();
        } catch (Throwable $exception) {
        }
    }

    /**
     * @return Container
     */
    public function getContainer(): Container
    {
        $container = $this->getDependencies();

        if ($container instanceof Container) {
            return $container;
        }

        throw new LogicException('must be instance of ' . Container::class);
    }
}
