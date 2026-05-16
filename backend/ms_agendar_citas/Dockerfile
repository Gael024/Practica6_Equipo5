# ---------- Etapa 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias primero (cache de Docker)
COPY package*.json ./

RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar el proyecto NestJS
RUN npm run build

# ---------- Etapa 2: Producción ----------
FROM node:20-alpine

WORKDIR /app

# Copiar solo lo necesario desde la etapa de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

# Ejecutar en modo producción
CMD ["node", "dist/main"]
