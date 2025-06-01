# Nginx con volumen host

### Con ruta absoluta
```
docker run -d \
    --name server-nginx \
    -p 9000:80 \
    -v D:\\Cursos\\Docker_Kubernetes_Group17\\Clase03\\07-volumenes\\01-host\\01-nginx\\mi-web:/usr/share/nginx/html \
    nginx:alpine
```

### Con ruta relativa (Git Bash)
```
docker run -d \
    --name server-nginx \
    -p 9000:80 \
    -v $(pwd -W)/mi-web:/usr/share/nginx/html \
    nginx:alpine
```

### Con ruta relativa (Powershell)
```
docker run -d `
    --name server-nginx `
    -p 9000:80 `
    -v ${PWD}/mi-web:/usr/share/nginx/html `
    nginx:alpine
```