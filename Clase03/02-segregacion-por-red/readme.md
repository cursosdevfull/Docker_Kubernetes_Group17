# Segregación por red

### Creación de redes
```
docker network create net-01 -d bridge
docker network create net-02 -d bridge
```

### Crear contenedores
```
docker run -d --name frontend -p 5000:80 --network net-01 nginx:alpine
docker run -d --name backend --network net-01 --network net-02 nginx:alpine
docker run -d --name database --network net-02 nginx:alpine
```