# VAL Global Commodities — Spring Boot Backend

## Tech Stack
- **Java 17** + **Spring Boot 3.2**
- **Spring Data JPA** (Hibernate)
- **MySQL 8** via MySQL Workbench
- **Lombok** (reduces boilerplate)
- **Maven** build tool

---

## Project Structure

```
val-global-backend/
├── pom.xml
└── src/main/
    ├── java/com/valglobal/
    │   ├── ValGlobalApplication.java       ← Entry point
    │   ├── config/
    │   │   └── CorsConfig.java             ← CORS for React frontend
    │   ├── model/
    │   │   ├── Enquiry.java                ← enquiries table
    │   │   ├── Product.java                ← products table
    │   │   └── ExportMarket.java           ← export_markets table
    │   ├── dto/
    │   │   ├── EnquiryDTO.java             ← Contact form input
    │   │   └── ApiResponse.java            ← Standard response wrapper
    │   ├── repository/
    │   │   ├── EnquiryRepository.java
    │   │   ├── ProductRepository.java
    │   │   └── ExportMarketRepository.java
    │   ├── service/
    │   │   ├── EnquiryService.java
    │   │   └── ProductService.java
    │   ├── controller/
    │   │   ├── EnquiryController.java      ← /api/enquiries
    │   │   └── ProductController.java      ← /api/products
    │   └── exception/
    │       └── GlobalExceptionHandler.java
    └── resources/
        ├── application.properties          ← DB config
        └── schema.sql                      ← MySQL schema + seed data
```

---

## Step 1 — MySQL Workbench Setup

1. Open **MySQL Workbench**
2. Connect to your local MySQL server
3. Open the file: `src/main/resources/schema.sql`
4. Click **Run All** (⚡ button)
5. This creates:
   - Database: `val_global_db`
   - Tables: `products`, `export_markets`, `enquiries`
   - Seeds all 8 product categories + 3 export markets + 3 sample enquiries

---

## Step 2 — Configure Database Password

Open `src/main/resources/application.properties` and update:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/val_global_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD_HERE
```

---

## Step 3 — Run the Backend

```bash
# In the val-global-backend folder:
mvn spring-boot:run
```

Server starts at: **http://localhost:8080**

## Optional — Enable Email Notifications

By default, enquiry emails are disabled for local development so form submissions can still be saved without SMTP credentials.

The backend now supports generic SMTP environment variables, so you can use Gmail, Brevo, SendGrid, Titan, or any other provider that supports SMTP:

```bash
export MAIL_ENABLED=true
export MAIL_FROM=info@valglobalcommodities.com
export MAIL_TO=info@valglobalcommodities.com
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USERNAME=your-mailbox@gmail.com
export SMTP_PASSWORD=YOUR_APP_PASSWORD
export SMTP_STARTTLS_ENABLE=true
export SMTP_STARTTLS_REQUIRED=true
export SMTP_SSL_ENABLE=false
mvn spring-boot:run
```

Example Brevo SMTP configuration:

```bash
export MAIL_ENABLED=true
export MAIL_FROM=info@valglobalcommodities.com
export MAIL_TO=info@valglobalcommodities.com
export SMTP_HOST=smtp-relay.brevo.com
export SMTP_PORT=587
export SMTP_USERNAME=YOUR_BREVO_LOGIN
export SMTP_PASSWORD=YOUR_BREVO_SMTP_KEY
export SMTP_STARTTLS_ENABLE=true
export SMTP_STARTTLS_REQUIRED=false
export SMTP_SSL_ENABLE=false
mvn spring-boot:run
```

If SMTP fails, the enquiry is still saved in MySQL so catalogue requests are not lost.

## Production Environment Variables

For deployment, set environment variables instead of editing `application.properties`.

Backend example:

```bash
export DB_URL='jdbc:mysql://YOUR_DB_HOST:3306/val_global_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC'
export DB_USERNAME='YOUR_DB_USER'
export DB_PASSWORD='YOUR_DB_PASSWORD'
export CORS_ALLOWED_ORIGINS='https://your-domain.com,https://www.your-domain.com'

export MAIL_ENABLED=true
export MAIL_TO=info@valglobalcommodities.com
export MAIL_FROM=valglobalcommodities@gmail.com
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USERNAME=valglobalcommodities@gmail.com
export SMTP_PASSWORD='YOUR_APP_PASSWORD'
export SMTP_STARTTLS_ENABLE=true
export SMTP_STARTTLS_REQUIRED=true
export SMTP_SSL_ENABLE=false
```

Frontend example:

```bash
VITE_API_BASE_URL=https://api.your-domain.com
```

---

## Step 4 — Connect React Frontend

In your React project, create a file `src/services/api.js`:

```js
const BASE_URL = 'http://localhost:8080/api';

export const submitEnquiry = async (formData) => {
  const res = await fetch(`${BASE_URL}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return res.json();
};

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};
```

Then in `Contact.jsx`, replace the `alert(...)` with:
```js
import { submitEnquiry } from '../services/api';
// inside handleSubmit:
const result = await submitEnquiry(form);
if (result.success) alert('Enquiry submitted!');
```

## GoDaddy Hosting Notes

Before deploying, check whether your GoDaddy hosting plan supports running a Java/Spring Boot application continuously. Many shared hosting plans do not support this.

Typical production setup:

1. Deploy the React frontend as static files.
2. Deploy the Spring Boot backend on a server or platform that supports Java apps.
3. Point the frontend `VITE_API_BASE_URL` to the backend URL.
4. Set `CORS_ALLOWED_ORIGINS` to your production domain.
5. Set SMTP env vars on the backend host so enquiry and catalogue emails are delivered to `info@valglobalcommodities.com`.

---

## API Reference

### Enquiries

| Method | Endpoint                          | Description                        |
|--------|-----------------------------------|------------------------------------|
| POST   | `/api/enquiries`                  | Submit contact form                |
| GET    | `/api/enquiries`                  | Get all enquiries (admin)          |
| GET    | `/api/enquiries/{id}`             | Get single enquiry                 |
| GET    | `/api/enquiries/status/{status}`  | Filter by NEW/IN_PROGRESS/REPLIED  |
| PUT    | `/api/enquiries/{id}/status`      | Update enquiry status              |
| DELETE | `/api/enquiries/{id}`             | Delete enquiry                     |
| GET    | `/api/enquiries/stats`            | Dashboard counts                   |

### Products

| Method | Endpoint                        | Description                    |
|--------|---------------------------------|--------------------------------|
| GET    | `/api/products`                 | Get all active products        |
| GET    | `/api/products/category/{key}` | Filter: agri/healthy/masala    |
| GET    | `/api/products/{id}`            | Get single product             |
| POST   | `/api/products`                 | Add product (admin)            |
| PUT    | `/api/products/{id}`            | Update product (admin)         |
| DELETE | `/api/products/{id}`            | Delete product (admin)         |

---

## Sample API Calls (Postman / curl)

### Submit an Enquiry
```bash
curl -X POST http://localhost:8080/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Ahmed",
    "lastName": "Hassan",
    "email": "ahmed@example.com",
    "phone": "+971501234567",
    "company": "Al Baraka Trading",
    "country": "UAE",
    "productInterest": "Spices",
    "message": "Interested in bulk spice imports.",
    "catalogueRequested": true
  }'
```

### Get All Products
```bash
curl http://localhost:8080/api/products
```

### Filter Products by Category
```bash
curl http://localhost:8080/api/products/category/agri
curl http://localhost:8080/api/products/category/healthy
curl http://localhost:8080/api/products/category/masala
```

### Update Enquiry Status
```bash
curl -X PUT http://localhost:8080/api/enquiries/1/status \
  -H "Content-Type: application/json" \
  -d '{ "status": "REPLIED" }'
```

---

## Database Tables (ER Overview)

```
products                     enquiries
─────────────────────        ──────────────────────────────
id          BIGINT PK        id               BIGINT PK
name        VARCHAR(150)     first_name       VARCHAR(100)
category    VARCHAR(100)     last_name        VARCHAR(100)
category_key VARCHAR(50)     email            VARCHAR(150)
description TEXT             phone            VARCHAR(20)
items       TEXT             company          VARCHAR(200)
tags        VARCHAR(300)     country          VARCHAR(100)
image_path  VARCHAR(300)     product_interest VARCHAR(200)
is_active   TINYINT(1)       message          TEXT
created_at  DATETIME         status           ENUM
                             catalogue_requested TINYINT(1)
                             created_at       DATETIME
export_markets               updated_at       DATETIME
──────────────────
id          BIGINT PK
name        VARCHAR(100)
flag_emoji  VARCHAR(10)
products_exported VARCHAR(500)
is_active   TINYINT(1)
created_at  DATETIME
```

---

## Enquiry Status Flow

```
NEW  →  IN_PROGRESS  →  REPLIED  →  CLOSED
```
