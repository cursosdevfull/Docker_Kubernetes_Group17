# Namespace

### Listar los pods
```
kubectl get pods -n ns-dev
```
### Port forward
```
kubectl port-forward server-web -n ns-dev 7000:80
```
### Describir un pod
```
kubectl describe po pod-nginx-sonarqube -n ns-dev
```
### Visualizar logs
```
kubectl logs pod-nginx-sonarqube -n ns-dev
kubectl logs pod-nginx-sonarqube -c quality -n ns-dev
```
### Ingresar a un contenedor
```
kubectl exec -it pod-nginx-sonarqube -n ns-dev -- sh
kubectl exec -it pod-nginx-sonarqube -n ns-dev -c web -- sh
```
### Listar pods con sus etiquetas
```
kubectl get po --show-labels -n ns-dev
```
### Listar pods con sus etiquetas y filtro
```
kubectl get po --show-labels -l app=frontend -n ns-dev
```