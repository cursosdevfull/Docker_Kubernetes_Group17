# Healthchecks Nginx

```
docker run -d \
    --name server-nginx01 \
    --health-cmd="curl http://localhost" \
    --health-interval=10s \
    --health-retries=3 \
    --health-start-period=30s \
    --health-timeout=3s
```