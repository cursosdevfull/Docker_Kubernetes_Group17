# Políticas de reinicio

### Reinicia en caso ocurra un error o una falla
```
docker run -d \
    --name server-nginx01 \
    --restart on-failure \
    nginx:alpine \
    sh -c "exit 1"
```

### Reinicia siempre a menos que lo detenga manualmente
```
docker run -d \
    --name server-nginx02 \
    --restart unless-stopped \
    nginx:alpine \
    sh -c "sleep 3; exit 1"
```

### Reinicia siempre
```
docker run -d \
    --name server-nginx03 \
    --restart always \
    nginx:alpine \
    sh -c "sleep 3; exit 1"
```