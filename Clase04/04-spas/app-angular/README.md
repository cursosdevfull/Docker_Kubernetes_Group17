# Angular

### Crear el contenedor
```
docker run -d \
    --name server-angular \
    --publish published=9000,target=80 \
    --mount type=bind,source=$(pwd -W)/dist/app-angular/browser,target=/usr/share/nginx/html \
    nginx:alpine
```