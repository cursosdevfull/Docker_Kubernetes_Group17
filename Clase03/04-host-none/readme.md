# Redes de tipo host y none

### Crear un contenedor en una red host
```
docker run -d --name server-nginx01 --network host nginx:alpine
```

### Crear un contenedor en una red none
```
docker run -d --name server-nginx02 --network none nginx:alpine
```