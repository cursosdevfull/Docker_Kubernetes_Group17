# Images

### Listar imágenes
```
docker images
```
### Filtrar un listado
```
docker images | grep <texto buscado>
```

### Inspeccionar una imagen
```
docker image inspect sonarqube:alpine
```
### Descargar imagen
```
docker pull <nombre de la imagen>:<tag de la imagen>
```
### Descargar imagen desde una url
```
docker pull public.ecr.aws/lambda/nodejs:18.2025.05.04.04
```

### Eliminar una imagen
```
docker rmi <nombre de la imagen>:<tag de la imagen>
docker rmi -f <nombre de la imagen>:<tag de la imagen>
```
