# MySQL

### Server

```
docker run -d --name server-mysql-01 -e MYSQL_ROOT_PASSWORD=12345 mysql:8
docker run -d --name server-mysql-02 -e MYSQL_ROOT_PASSWORD=12345 -e MYSQL_DATABASE=db -e MYSQL_USER=user -e MYSQL_PASSWORD=12345 mysql:8
```

### Client
```
docker run -d --name client-mysql-02 -p 8100:80 -e PMA_ARBITRARY=1 phpmyadmin:5.2.2
```

