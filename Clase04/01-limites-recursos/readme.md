# Límites de uso de memoria y procesador

### Memoria
```
docker run -d --name server-nginx01 --memory=10m nginx:alpine
docker run -d --name server-nginx02 --memory=1g nginx:alpine
docker run -d --name server-nginx03 --memory=700m --memory-swap=1g nginx:alpine
```

### Procesador
```
docker run -d --name server-nginx04 --cpus="1.5" nginx:alpine
docker run -d --name server-nginx05 --cpuset-cpus=0-2 nginx:alpine
docker run -d --name server-nginx06 --cpuset-cpus=0-2 nginx:alpine
```