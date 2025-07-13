# Despliegue en Google Cloud

### Obtener una cuenta en Google Cloud

- [Google Cloud](https://cloud.google.com)

### Crear un proyecto

### Descargar e instalar el Google Cloud CLI

- [Descargar Google Cloud](https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe?hl=Es)

### Autenticarse con Google Cloud

```
gcloud auth login
```

### Conectar con un proyecto

```
gcloud config set project <PROJECT ID>
gcloud config set project docker07
gcloud auth configure-docker
```

### Habilitar el control de acceso inicial

```
gcloud projects add-iam-policy-binding docker07 --member='serviceAccount:service-61410563976@gcp-sa-artifactregistry.iam.gserviceaccount.com' --role='roles/storage.objectViewer'
```

### Dominios posibles para los repositorios de imágenes

```
    "asia.gcr.io": "gcloud",
    "eu.gcr.io": "gcloud",
    "gcr.io": "gcloud",
    "marketplace.gcr.io": "gcloud",
    "staging-k8s.gcr.io": "gcloud",
    "us.gcr.io": "gcloud"
```

### Estructura del nombre de las imágenes

- [dominio]/[project id]/[nombre del repository]
- gcr.io/docker07/frontend

### Habilitar el api del Container Registry

### Generar las imágenes desde el docker compose

```
docker compose -f compose-gcp.yaml build
```

### Publicar las imágenes

```
docker compose -f compose-gcp.yaml push
```

### Habilitar Kubernetes Engine API

### Conectarnos al cluster

```
gcloud container clusters get-credentials cursodocker15 --region us-central1 --project docker07
```



gcloud auth configure-docker us-central1-docker.pkg.dev