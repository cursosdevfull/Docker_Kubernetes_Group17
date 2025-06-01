# Exec

```
docker run -d --name server-nginx nginx:alpine
docker exec -i -t server-nginx sh
docker exec -i -t server-nginx ls
docker exec -it server-nginx sh
docker exec -ti server-nginx sh
```