# Pod

### Crear un pod
```
kubectl run server-web --image=nginx:alpine
```

### Listar los pods
```
kubectl get pods
```

### Port forward
```
kubectl port-forward server-web 7000:80
```

### Listar tipos de recursos
```
kubectl api-resources
```
### Ejecutar un manifiestos
```
kubectl apply -f <nombre manifiesto>
```
### Describir un pod
```
kubectl describe po pod-nginx-sonarqube
```
### Visualizar logs
```
kubectl logs pod-nginx-sonarqube
kubectl logs pod-nginx-sonarqube -c quality
```
### Ingresar a un contenedor
```
kubectl exec -it pod-nginx-sonarqube -- sh
kubectl exec -it pod-nginx-sonarqube -c web -- sh
```
### Listar pods con sus etiquetas
```
kubectl get po --show-labels
```
### Listar pods con sus etiquetas y filtro
```
kubectl get po --show-labels -l app=frontend
```