# Volumen Nombrado (named)

### Crear volumen
```
docker volume create <nombre del volumen>
```

### Listar
```
docker volume ls
```

### Inspeccionar
```
docker volume inspect <nombre del volumen>
```

### Crear un contenedor con un volumen named
```
docker run -d \
    --name server-nginx \
    -p 9000:80 \
    -v vol-server-nginx:/usr/share/nginx/html \
    nginx:alpine
```