<?php declare(strict_types=1);

namespace Backend\Controller;

use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

class IndexController extends AbstractController
{
    /**
     * @throws SyntaxError
     * @throws NotFoundExceptionInterface
     * @throws ContainerExceptionInterface
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function index(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $container = $this->getContainer();

        return $container->getView()->render(
            $response,
            'index.twig',
            [
            ]
        );
    }
}
