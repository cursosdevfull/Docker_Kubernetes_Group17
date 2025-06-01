# Commit

### Crear un contenedor
```
docker run -d --name server-nginx -p 5000:80 nginx:alpine
```

### Convertir contenedor en una imagen
```
docker commit <nombre del contenedor> <nombre de la imagen>
```

### Crear un contenedor usando la imagen creada por commit
```
docker run -d --name server-nginx -p 5000:80 <nombre de la imagen del paso anterior>
```