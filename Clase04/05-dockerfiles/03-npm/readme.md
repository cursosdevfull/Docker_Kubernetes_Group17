# NPM

### Crear la imagen
```
docker build -t img-npm:1 .
```

### Crear contenedor para instalar dependencias
```
docker run --rm img-npm:1 install bootstrap
```

### Crear contenedor con un volumen para instalar dependencias
```
docker run --rm -v $(pwd -W)/:/app img-npm:1 install bootstrap
```