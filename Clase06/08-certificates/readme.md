# Certificados

### Crear el certificado privado
```
openssl genrsa -out course17.key 2048
```
### Crear la solicitud
```
openssl req -new -key course17.key -out course17.csr -subj "/CN=course17/O=developers"
```
### Crear el certificado final
```
openssl x509 -req -in course17.csr -CA \\wsl.localhost\docker-desktop\tmp\docker-desktop-root\run\config\pki\ca.crt -CAkey \\wsl.localhost\docker-desktop\tmp\docker-desktop-root\run\config\pki\ca.key -CAcreateserial -out course17.crt --days 365
```