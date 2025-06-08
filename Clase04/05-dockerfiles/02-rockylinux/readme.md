# Rocky Linux

### Crear imagen
```
docker build -t img-rockylinux:1 -f dockerfiles/dockerfile-rockylinux .
```

### Crear el contenedor
```
docker run -d --name server-rockylinux img-rockylinux:1
```

### Realizar ping a google.com
```
docker run -it --rm --name server-rockylinux img-rockylinux:1 ping google.com
docker run -it --name server-rockylinux img-rockylinux:1 ping google.com
```
### Crear imagen con entrypoint modificado
```
docker build -t img-rockylinux:2 -f dockerfiles/dockerfile-rockylinux-entrypoint .
```

### Realizar ping a google.com usando imagen con entrypoint
```
docker run -it --rm --name server-rockylinux img-rockylinux:2 google.com
```