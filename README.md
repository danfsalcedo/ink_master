# **INK MASTER**

Este proyecto es una aplicación web diseñada para estudios de tatuajes, con el objetivo de facilitar la gestión de citas y la presentación de portafolios de artistas.

## Características principales

- Registro y autenticación de clientes, empleados y administradores.
- Gestión de citas para clientes y empleados.
- Visualización y edición de perfiles de tatuadores.
- Panel de administración para gestionar clientes, empleados y citas.
- Portafolio de artistas con detalles y fotografías.
- Interfaz moderna y responsiva.

## Estructura del proyecto

- **backend/**: API RESTful construida con Laravel para la gestión de datos.
- **frontend/**: Aplicación Angular para la interfaz de usuario.
- **db/**: Archivos de inicialización de la base de datos (MariaDB).

## Requisitos

- Node.js y npm
- Angular CLI
- PHP 8.x
- Composer
- MariaDB o MySQL
- Docker (opcional, para desarrollo rápido)

## Instalación

### Backend (Laravel)

```sh
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
```

### Frontend (Angular)

```sh
cd frontend
npm install
ng serve
```

### Base de datos

Puedes usar Docker para levantar la base de datos:

```sh
cd db
docker build -t inkmaster-db .
docker run --name inkmaster-db -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d inkmaster-db
```

O importar manualmente `db/inkmaster.sql` en tu gestor de base de datos.

## Uso

- Accede al frontend en [http://localhost:4200](http://localhost:4200)
- El backend corre por defecto en [http://localhost:8000](http://localhost:8000)
- Configura las variables de entorno según tus necesidades.

## Scripts útiles

- Levantar backend:  
  ```sh
  php artisan serve
  ```
- Levantar frontend:  
  ```sh
  ng serve
  ```
- Levantar base de datos con Docker:  
  ```sh
  docker-compose up
  ```

## Licencia

MIT

---

> Para más detalles revisa los archivos [backend/README.md](backend/README.md) y [frontend/README.md](frontend/README.md).
