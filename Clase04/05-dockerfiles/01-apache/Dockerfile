# 200MB
FROM ubuntu:24.04

# 210MB
RUN apt-get update && \
    apt-get install -y apache2

# 270MB
COPY ./mi-web /var/www/html

CMD ["apachectl", "-D", "FOREGROUND"]
