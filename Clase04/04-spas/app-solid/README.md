# Solid

### Crear el contenedor
```
docker run -d \
    --name server-solid \
    --publish published=9030,target=80 \
    --mount type=bind,source=$(pwd -W)/dist,target=/usr/share/nginx/html \
    nginx:alpine
```