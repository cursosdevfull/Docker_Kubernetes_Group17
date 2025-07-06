# Despliegue en AWS

### Herramientas a instalar

- Chocolatey (Windows)
- Brew (Mac)
- aws-cli (https://aws.amazon.com/es/cli)
- helm (choco install kubernetes-helm -y)
- eksctl (choco install eksctl -y)

### Configurar un usuario que acceda a AWS

```
aws configure
```

### Crear Cluster EKS

```
eksctl create cluster --name clusterdocker17 --without-nodegroup --region us-east-1 --zones us-east-1a,us-east-1b,us-east-1c --version 1.27
```

### Crear nodos

```
eksctl create nodegroup --cluster clusterdocker17 --name clusterdocker17-nodegroup --node-type t3.medium --nodes 1 --nodes-min 1 --nodes-max 3 --asg-access
```

### Crear IAM Provider

```
eksctl utils associate-iam-oidc-provider --cluster clusterdocker17 --approve
```

### Descargar política para el cluster

```
curl -o iam_policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.1.2/docs/install/iam_policy.json
```

### Crear la política

```
aws iam create-policy --policy-name AWSLoadBalancerPolicy_clusterdocker17 --policy-document file://iam_policy.json
```

### Crear la cuenta de servicio para el cluster

```
eksctl create iamserviceaccount --cluster clusterdocker17 --namespace=kube-system --name=aws-lb-ms-clusterdocker17 --attach-policy-arn=arn:aws:iam::282865065290:policy/AWSLoadBalancerPolicy_clusterdocker17 --override-existing-serviceaccounts --approve
```

### Verificar si existe el ingress controller del balancedor

```
kubectl get deploy alb-ingress-controller -n kube-system
```

### Instalar el target group binding

```
kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller/crds?ref=master"
```

### Actualizare los repositorios de Helm

```
helm repo update
```

### Instalar ingress controller

```
helm upgrade -i aws-load-balancer-controller eks/aws-load-balancer-controller --set clusterName=clusterdocker17 --set serviceAccount.create=false --set serviceAccount.name=aws-lb-ms-clusterdocker17  -n kube-system
```

### Verificar que se haya instalado el ingress controller

```
kubectl get deploy aws-load-balancer-controller -n kube-system
```

### Crear repositorios de imágenes

- Ir a ECR y crear repositorios por cada imagen
- Usar las urls de los repositorios para crear el compose-aws.yaml

### Generar las imágenes con docker compose

```
docker compose -f compose-aws.yml build
```

### Vincular las cuentas de AWS y de Docker local

```
docker login -u AWS -p $(aws ecr get-login-password --region us-east-1) 282865065290.dkr.ecr.us-east-1.amazonaws.com
```

### Publicar las imágenes locales en el ECR

```
docker compose -f compose-aws.yml push
```

### Registrar el cluster en el kubernetes local

```
aws eks update-kubeconfig --name clusterdocker17 --region us-east-1
```
