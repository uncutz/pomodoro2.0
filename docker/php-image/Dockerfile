FROM php:8.1-fpm

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions \
    mysqli \
    mcrypt \
    mbstring \
    xml \
    openssl \
    json \
    phar \
    zip \
    gd \
    dom \
    session \
    zlib \
    xdebug

# Add and Enable PHP-PDO Extenstions
RUN docker-php-ext-install pdo pdo_mysql mysqli
RUN docker-php-ext-enable pdo_mysql

# Install PHP Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer