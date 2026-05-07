#!/bin/zsh

export MAIL_ENABLED=true
export MAIL_TO=info@valglobalcommodities.com
export MAIL_FROM=valglobalcommodities@gmail.com
export DB_URL='jdbc:mysql://127.0.0.1:3306/val_global_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC'
export DB_USERNAME=root
export DB_PASSWORD='pooja19'
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USERNAME=valglobalcommodities@gmail.com
export SMTP_PASSWORD='rbbw usfv tgpm dmad'
export SMTP_STARTTLS_ENABLE=true
export SMTP_STARTTLS_REQUIRED=true
export SMTP_SSL_ENABLE=false
export MAIL_DEBUG=false

mvn spring-boot:run
