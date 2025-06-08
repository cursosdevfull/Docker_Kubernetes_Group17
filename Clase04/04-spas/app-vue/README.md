# Vue

### Crear el contenedor
```
docker run -d \
    --name server-vue \
    --publish published=9020,target=80 \
    --mount type=bind,source=$(pwd -W)/dist,target=/usr/share/nginx/html \
    nginx:alpine
```