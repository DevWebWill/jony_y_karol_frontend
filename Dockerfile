# Base image
FROM node:19-alpine3.17 as builder
# Set working directory
WORKDIR /app
# Instalar Vue CLI
# RUN npm install -g @vue/cli
# Copiamos el archivo package.json y package-lock.json al contenedor
COPY package*.json ./
# COPY ./dist /usr/share/nginx/html
# Install dependencies
RUN npm install
# Copy project files
COPY . .
# Build the app
RUN npm run build


# nginx state for serving content
FROM nginx:1.25-alpine
COPY ./.nginx/default.conf /etc/nginx/conf.d
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]





