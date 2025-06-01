# Nginx Personalizado

```
docker run -d \
    --name server-nginx \
    -p 9000:4200 \
    -v $(pwd -W)/www:/app \
    -v $(pwd -W)/config/nginx.conf:/etc/nginx/conf.d/default.conf \
    nginx:alpine
```