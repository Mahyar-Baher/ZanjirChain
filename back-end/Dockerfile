FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    unzip \
    zip \
    curl \
    git \
    libcurl4-openssl-dev \
    libssl-dev \
    pkg-config \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install bcmath curl mbstring pdo pdo_mysql zip xml exif fileinfo intl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader

CMD ["php-fpm"]
