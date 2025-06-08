# Drupal

### Crear la red
```
docker network create net-drupal
```

### Crear contenedor de mysql
```
docker run -d \
    --name server-mysql \
    -e MYSQL_ROOT_PASSWORD=12345 \
    -e MYSQL_USER=user \
    -e MYSQL_PASSWORD=12345 \
    -e MYSQL_DATABASE=drupal_db \
    -v vol-drupal-mysql:/var/lib/mysql \
    --network net-drupal \
    mysql:8
```

### Crear contenedor de drupal
```
docker run -d \
    --name server-drupal \
    -p 8081:80 \
    --network net-drupal \
    -v drupal-modules:/var/www/html/modules \
    -v drupal-profiles:/var/www/html/profiles \
    -v drupal-sites:/var/www/html/sites \
    -v drupal-themes:/var/www/html/themes \
    drupal
```