# Healthchecks MySQL

```
docker run -d \
    --name server-mysql01 \
    -e MYSQL_ROOT_PASSWORD=12345 \
    --health-cmd="mysqladmin ping -h localhost" \
    --health-interval=10s \
    --health-retries=3 \
    --health-start-period=30s \
    --health-timeout=3s \
    mysql:8
```

