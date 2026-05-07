$env:DB_URL = "jdbc:mysql://127.0.0.1:3306/val_global_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "pooja19"

$env:MAIL_ENABLED = "true"
$env:MAIL_TO = "info@valglobalcommodities.com"
$env:MAIL_FROM = "valglobalcommodities@gmail.com"
$env:SMTP_HOST = "smtp.gmail.com"
$env:SMTP_PORT = "587"
$env:SMTP_USERNAME = "valglobalcommodities@gmail.com"
$env:SMTP_PASSWORD = "rbbw usfv tgpm dmad"
$env:SMTP_STARTTLS_ENABLE = "true"
$env:SMTP_STARTTLS_REQUIRED = "true"
$env:SMTP_SSL_ENABLE = "false"
$env:MAIL_DEBUG = "false"

mvn spring-boot:run
