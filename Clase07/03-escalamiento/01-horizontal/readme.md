# Horizontal Pod Autoscaler

### Insertar el servidor de métricas

```
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

### Verificar que el servidor de métricas funcione

```
kubectl get deploy metrics-server -n kube-system
```

### Crear un deployment y un service para las pruebas

```
kubectl apply -f https://k8s.io/examples/application/php-apache.yaml
```

### Crear la regla para autoescalar

```
kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10
```

### Listar las reglas de HPA

```
kubectl get hpa
```

### Generar la carga para el service

```
kubectl run -i --tty load-generator2 --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://php-apache; done"
```
