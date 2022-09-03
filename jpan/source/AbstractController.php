<?php declare(strict_types=1);

namespace jpan\source;

abstract class AbstractController
{
    private Dependencies $dependencies;

    /**
     * @param Dependencies $dependencies
     */
    public function __construct(Dependencies $dependencies)
    {
        $this->dependencies = $dependencies;
    }

    /**
     * @return Dependencies
     */
    public function getDependencies(): Dependencies
    {
        return $this->dependencies;
    }
}
