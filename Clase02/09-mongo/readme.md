# Mongo

### Server
```
docker run --name server-mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=12345 -d mongo
```

### Client
```
docker run -d --name client-mongo \
    -e ME_CONFIG_BASICAUTH_USERNAME=user \
    -e ME_CONFIG_BASICAUTH_PASSWORD=12345 \
    -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
    -e ME_CONFIG_MONGODB_ADMINPASSWORD=12345 \
    -e ME_CONFIG_MONGODB_SERVER=172.17.0.2 \
    -p 9000:8081 \
    mongo-express:1.0.2-20-alpine3.19
```