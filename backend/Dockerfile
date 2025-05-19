# Usa PHP 8.2 con FPM
FROM php:8.2-fpm

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
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Establecer el directorio de trabajo
WORKDIR /var/www

# Copiar archivos del proyecto Laravel al contenedor
COPY . .

# Instalar dependencias del proyecto sin dev para producción
RUN composer install --optimize-autoloader --no-dev

# Ajustar permisos necesarios para Laravel
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage

# Exponer el puerto del servicio PHP-FPM
EXPOSE 9000

# Comando por defecto para correr el servicio
CMD ["php-fpm"]
