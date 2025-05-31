FROM php:8.2-fpm

# نصب ابزارها و کتابخانه‌های مورد نیاز
RUN apt-get update && apt-get install -y \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    unzip \
    zip \
    curl \
    && docker-php-ext-install bcmath curl mbstring pdo pdo_mysql zip xml exif fileinfo

# نصب Composer از ایمیج رسمی
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# کپی پروژه
COPY . .

# نصب بسته‌های PHP لاراول
RUN composer install --no-dev --optimize-autoloader

CMD ["php-fpm"]
