<?php


use Backend\Controller\IndexController;

return [
    'index' => [
        'type' => 'GET',
        'path' => '/',
        'class' => IndexController::class . ':index'
    ],
];
