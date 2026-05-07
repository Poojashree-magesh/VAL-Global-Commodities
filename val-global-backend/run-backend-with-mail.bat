@echo off
set "DB_URL=jdbc:mysql://127.0.0.1:3306/val_global_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
set DB_USERNAME=root
set DB_PASSWORD=pooja19

set MAIL_ENABLED=true
set MAIL_TO=info@valglobalcommodities.com
set MAIL_FROM=valglobalcommodities@gmail.com
set SMTP_HOST=smtp.gmail.com
set SMTP_PORT=587
set SMTP_USERNAME=valglobalcommodities@gmail.com
set SMTP_PASSWORD=rbbw usfv tgpm dmad
set SMTP_STARTTLS_ENABLE=true
set SMTP_STARTTLS_REQUIRED=true
set SMTP_SSL_ENABLE=false
set MAIL_DEBUG=false

mvn spring-boot:run
