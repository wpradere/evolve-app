# Usa la imagen de Node.js
FROM node:22.11


WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código
COPY . .

# Build de Next.js
RUN npm run build

# Exponer puerto
EXPOSE 3002

# Comando para ejecutar
CMD ["npm", "start"]