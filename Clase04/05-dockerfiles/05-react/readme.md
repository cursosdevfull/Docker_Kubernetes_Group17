# React

### Crear la imagen
```
docker build -f app-simple/dockerfile-react -t app-simple:6 ./app-simple
docker build -f app-simple/dockerfile-react-arg -t app-simple:9 --build-arg DIRECTORY=app-simple .
```

### Crear el contenedor
```
docker run -d --name server-react01 -p 9000:80 app-simple:6
docker run -d --name server-react02 -p 9010:80 app-simple:9
```