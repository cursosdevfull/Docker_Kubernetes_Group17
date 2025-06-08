# Healthcheck

```
docker run -d \
    --name server-healthcheck \
    --health-cmd "http://localhost:3000/healthcheck" \
    --health-interval 10s \
    --health-retries 3 \
    --health-start-period 3s \
    --health-timeout 3s \
    app-healthcheck
```