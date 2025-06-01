# Redes

### Listar
```
docker network ls
```

### Crear 
```
docker network create <nombre de la red> --driver bridge
docker network create <nombre de la red> -d bridge
```

### Asignar red a contenedor
```
docker run --name server-nginx -d --network net-docker nginx:alpine
```

### Saber a qué red está conectado un contenedor
```
docker inspect <nombre del contenedor>
docker network inspect <nombre de la red>
```

### Crear un red con gateway y subnet
```
docker network create <nombre de la red> -d bridge --gateway 150.25.0.1 --subnet 150.25.0.0/16
```

### Crear un contenedor con más de una red
```
docker run -d --name server-nginx2 --network net-docker --network net-docker-2 nginx:alpine
```

### Crear un contenedor con una dirección ip
```
docker run -d --name server-nginx3 --network net-docker-2 --ip 150.25.0.10 nginx:alpine
```

### Crear un contenedor con la red por defecto de docker
```
docker run -d --name server-nginx4 nginx:alpine
```
### Conectar un contenedor a una red
```
docker network connect <nombre de la red> <nombre del contenedor>
```
### Desconectar un contenedor a una red
```
docker network disconnect <nombre de la red> <nombre del contenedor>
```