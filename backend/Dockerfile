# Usa PHP 8.2 con FPM
FROM php:8.2-cli

# Instala dependencias del sistema necesarias para Laravel y extensiones
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    curl \
    git \
    unzip \
    zip \
    npm \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Establecer el directorio de trabajo
WORKDIR /var/www

# Copiar archivos del proyecto Laravel al contenedor
COPY . .

# Instalar dependencias del proyecto sin dev para producción
RUN composer install --no-interaction --prefer-dist --optimize-autoloader && \
    if [ ! -f .env ]; then cp .env.example .env; fi && \
    php artisan key:generate && \
    php artisan jwt:secret --force

# Ajustar permisos necesarios para Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# Exponer el puerto del servicio PHP-FPM
EXPOSE 8000

# Comando por defecto para correr el servicio
CMD ["/bin/sh", "-c", "if [ ! -f .env ]; then cp .env.example .env; fi && composer install && php artisan key:generate && php artisan serve --host=0.0.0.0 --port=8000"]
