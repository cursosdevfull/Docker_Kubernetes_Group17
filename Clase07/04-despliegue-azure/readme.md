# Despliegue en Azure

### Crear una cuenta en Azure

- [Portal Azure](https://portal.azure.com)

### Crear un Resource Group

### Descargar e instalar el cliente de Azure

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli)

### Loguearse con Azure

```
az login
```

### Crear un Container Registry

### Vincular con el Container Registry

```
az acr login --name docker17
```

### Crear las imágenes usando la url de acr y el docker compose

```
docker compose -f compose-azure.yml build
```

### Publicar las imágenes

```
docker compose -f compose-azure.yml push
```

### Agregar el repositorio de un ingress controller

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
```

### Instalar el ingress controller

```
helm install nginx-ingress ingress-nginx/ingress-nginx --set controller.replicaCount=1     --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux --set controller.admissionWebhooks.patch.nodeSelector."beta\.kubernetes\.io/os"=linux
```
