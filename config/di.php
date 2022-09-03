<?php declare(strict_types=1);


use Backend\Container;
use Backend\MySqlConnection;
use jpan\source\Routes;
use Backend\Session;
use Slim\Views\Twig;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\Cache\Adapter\TagAwareAdapter;
use Twig\Extension\DebugExtension;
use Twig\Extra\Cache\CacheExtension;
use Twig\Extra\Cache\CacheRuntime;
use Twig\RuntimeLoader\RuntimeLoaderInterface;

$container = new Container();

$container->add('session', static function (): Session {
    return new Session();
});


$container->add('pdo', function (): PDO {
    $localConf = json_decode(file_get_contents(__DIR__ . '/localconf.json'), true);

    return MysqlConnection::fromConfig($localConf['database']);
});

$container->add('routes', static function (): Routes {
    return new Routes();
});


$container->add('view', static function () {

    $view = Twig::create(
        __DIR__ . '/../template',
        [
            'cache' => false, //__DIR__ . '/../cache',
            'debug' => true,
        ]
    );

    $view->addExtension(new \Backend\Twig\Extension()); //TODO add container as param

    $view->addExtension(new DebugExtension());

    $view->addExtension(new CacheExtension());

    if (!PROJECT_ENV_DEBUG) { //TODO wenn der code ausgeführt wird, kackt jede twig ab mit url_for
        // (jedenfalls bei docker), wie es live mit cache ist, hab ich nicht getestet
        $view->addRuntimeLoader(new class implements RuntimeLoaderInterface {
            public function load($class): CacheRuntime
            {
                if (CacheRuntime::class === $class) {
                    return new CacheRuntime(new TagAwareAdapter(new FilesystemAdapter()));
                }
                throw new RuntimeException('could not load CacheRuntime');
            }
        });
    }

    return $view;
});

return $container;
