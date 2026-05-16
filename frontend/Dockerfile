# ---------- Etapa 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Compilar Angular en modo producción
RUN npm run build

# ---------- Etapa 2: Servir con Nginx ----------
FROM nginx:alpine

# Copiar el build de Angular al directorio de Nginx
COPY --from=builder /app/dist/salud-agenda/browser /usr/share/nginx/html

# Configuración de Nginx para Angular (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
