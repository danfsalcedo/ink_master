# Imagen base con Node.js (compatible con Angular 12)
FROM node:18.19

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código del proyecto
COPY . .

# Exponer el puerto por defecto que usa Angular (4200)
EXPOSE 4200

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "start"]