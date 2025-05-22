# Usa la imagen base oficial de MariaDB
FROM mysql:latest


# Permite cambiar el archivo SQL al construir (por defecto: pizzapaisa.sql)
ARG SQL_FILE=inkmaster.sql

EXPOSE 3306

# Copia el archivo SQL al directorio de inicialización
COPY ${SQL_FILE} /docker-entrypoint-initdb.d/