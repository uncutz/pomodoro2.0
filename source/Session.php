<?php declare(strict_types=1);

namespace Backend;

final class Session extends \jpan\source\Session
{
    public function __construct()
    {
        session_name('user_stuff');
        parent::__construct();
    }

    /**
     * @return int|null
     */
    public function getUserId(): ?int
    {
        return $this->get('user.id');
    }

    public function isAdmin()
    {
        //TODO Wip
    }


}