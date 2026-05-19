# 🛍️ ShopEase — Full-Stack E-Commerce Application

A complete, production-ready e-commerce platform built with **Java Spring Boot** (backend) and **React** (frontend), featuring JWT authentication, role-based access control, shopping cart, order management, and a full admin panel.

---

## 📸 Screenshots

> 

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 17, Spring Boot 3.2, Spring Security, Spring Data JPA |
| Authentication | JWT (JSON Web Tokens) via JJWT 0.11.5 |
| Database | MySQL 8.x + Hibernate ORM |
| Frontend | React 18, React Router v6, Axios |
| Styling | Custom CSS |
| Build Tool | Maven 3.x |

---

## ✨ Features

### 👤 User Features
- ✅ Register & Login with JWT authentication
- ✅ Browse products with search & category filter
- ✅ Paginated product listing (12 per page)
- ✅ Product detail page with add-to-cart
- ✅ Cart management (add, update quantity, remove)
- ✅ Checkout with mock payment (Card / UPI / COD)
- ✅ Order history with status tracking

### 🔐 Admin Features
- ✅ Dashboard with live stats (users, products, orders, revenue)
- ✅ Full product CRUD (Create, Read, Update, Delete)
- ✅ Category management
- ✅ Order management with status updates
- ✅ User listing and overview

---

## 📁 Project Structure

```
ecommerce/
├── .gitignore
├── README.md
│
├── backend/                              # Spring Boot Application
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/ecommerce/
│       │   ├── EcommerceApplication.java
│       │   ├── config/
│       │   │   ├── SecurityConfig.java   # Spring Security + JWT setup
│       │   │   └── CorsConfig.java       # CORS for React frontend
│       │   ├── controller/
│       │   │   ├── AuthController.java
│       │   │   ├── ProductController.java
│       │   │   ├── CartController.java
│       │   │   ├── OrderController.java
│       │   │   ├── CategoryController.java
│       │   │   └── AdminController.java
│       │   ├── dto/                      # Request & Response objects
│       │   ├── entity/                   # JPA Entities (User, Product, Order...)
│       │   ├── exception/                # Global exception handler
│       │   ├── repository/               # Spring Data JPA Repositories
│       │   ├── security/                 # JWT Filter & UserDetailsService
│       │   └── service/                  # Business Logic
│       └── resources/
│           └── application.properties    # DB & JWT configuration
│
└── frontend/                             # React Application
    ├── package.json
    └── src/
        ├── App.js                        # Routes & protected routes
        ├── index.js
        ├── context/
        │   └── AuthContext.js            # Global auth state
        ├── services/
        │   └── api.js                    # All Axios API calls
        ├── pages/
        │   ├── Home.js
        │   ├── Products.js
        │   ├── ProductDetail.js
        │   ├── Cart.js
        │   ├── Checkout.js
        │   ├── Orders.js
        │   ├── Login.js
        │   ├── Register.js
        │   └── admin/
        │       ├── AdminDashboard.js
        │       ├── AdminProducts.js
        │       ├── AdminOrders.js
        │       └── AdminUsers.js
        ├── components/common/
        │   └── Navbar.js
        └── styles/
            └── global.css


## ⚙️ Prerequisites

Make sure you have these installed before running the project:

| Tool | Version | Download |
|------|---------|----------|
| Java JDK | 17+ | https://adoptium.net |
| Maven | 3.6+ | https://maven.apache.org/download.cgi |
| Node.js | 18+ | https://nodejs.org |
| MySQL | 8.x | https://dev.mysql.com/downloads |

**Verify installations:**
```bash
java -version
mvn -version
node -version
mysql --version


## 🛠️ Setup & Installation

### Step 1 — Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/shopease-ecommerce.git
cd shopease-ecommerce
```



### Step 2 — Database Setup

Open **MySQL Workbench** or MySQL command line and run:

```sql
CREATE DATABASE IF NOT EXISTS ecommerce_db;
```

---

### Step 3 — Configure Backend

Open this file:
```
backend/src/main/resources/application.properties
```

Update these two lines with **your MySQL credentials**:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

> ⚠️ Leave password blank if your MySQL has no password:
> `spring.datasource.password= your password 


### Step 4 — Run the Backend

Open a terminal and run:

```bash
cd backend
mvn clean install -DskipTests
mvn spring-boot:run
```

✅ **Backend is running when you see:**
```
Started EcommerceApplication in 4.3 seconds
Tomcat started on port(s): 8080
```

Test it by opening: **http://localhost:8080/api/categories**  
You should see: `{"success":true,"data":[]}`

---

### Step 5 — Run the Frontend

Open a **new terminal** and run:

```bash
cd frontend
npm install
npm start
```

✅ **Frontend is running when you see:**
```
Compiled successfully!
Local: http://localhost:3000
```

Browser opens automatically at **http://localhost:3000**

---

### Step 6 — Seed the Database (Add Sample Data)

Copy and run this in MySQL Workbench to add categories and 36 products:

```sql
USE ecommerce_db;

INSERT IGNORE INTO categories (id, name, description) VALUES
(1, 'Electronics', 'Phones, Laptops, Gadgets'),
(2, 'Clothing', 'Fashion and Apparel'),
(3, 'Books', 'Fiction and Non-Fiction'),
(4, 'Home & Kitchen', 'Furniture and Appliances'),
(5, 'Sports', 'Fitness and Outdoor gear'),
(6, 'Grocery', 'Food and Daily essentials');
```

> 📄 For full product data (53 products with images), use the `products_seed.sql` file included in the repo.

---

### Step 7 — Create Admin Account

1. Go to **http://localhost:3000/register** and create an account
2. Run this in MySQL to give yourself admin access:

```sql
USE ecommerce_db;
UPDATE users SET role = 'ROLE_ADMIN' WHERE email = 'your@email.com';
```

3. **Log out and log back in** — you'll now see the **Admin** menu in the navbar

---

## 🔌 API Reference

### Auth Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login, returns JWT token |

### Product Endpoints (Public)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | ❌ | Paginated products |
| GET | `/api/products/{id}` | ❌ | Single product |
| GET | `/api/products/featured` | ❌ | Latest 8 products |
| GET | `/api/products/search?keyword=` | ❌ | Search products |
| GET | `/api/products/category/{id}` | ❌ | Filter by category |
| GET | `/api/categories` | ❌ | All categories |

### Cart Endpoints (Login Required)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/cart` | ✅ | Get cart items |
| POST | `/api/cart/add?productId=&quantity=` | ✅ | Add to cart |
| PUT | `/api/cart/{id}?quantity=` | ✅ | Update quantity |
| DELETE | `/api/cart/{id}` | ✅ | Remove item |

### Order Endpoints (Login Required)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders/checkout` | ✅ | Place order |
| GET | `/api/orders/my-orders` | ✅ | View my orders |

### Admin Endpoints (Admin Role Required)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/dashboard` | 🔐 | Stats overview |
| POST | `/api/admin/products` | 🔐 | Create product |
| PUT | `/api/admin/products/{id}` | 🔐 | Update product |
| DELETE | `/api/admin/products/{id}` | 🔐 | Delete product |
| GET | `/api/admin/orders` | 🔐 | All orders |
| PUT | `/api/admin/orders/{id}/status?status=` | 🔐 | Update order status |
| GET | `/api/admin/users` | 🔐 | All users |

---

## 🔐 How JWT Auth Works

```
1. User → POST /api/auth/login  →  Server validates credentials
2. Server → Returns JWT Token
3. Frontend → Stores token in localStorage
4. Every request → Sends: Authorization: Bearer <token>
5. Server → Validates token → Grants/Denies access
```

**Roles:**
- `ROLE_USER` — Browse, add to cart, place orders
- `ROLE_ADMIN` — Everything + full admin panel access

---

## 🗄️ Database Schema

```
users         → id, name, email, password(hashed), role, phone, address, enabled, created_at
categories    → id, name, description, image_url
products      → id, name, description, price, stock, image_url, brand, active, category_id, created_at
cart_items    → id, user_id, product_id, quantity
orders        → id, user_id, total_amount, status, payment_status, shipping_address, payment_id, created_at, updated_at
order_items   → id, order_id, product_id, quantity, price
```

---

## 🧩 Design Patterns Used

| Pattern | Implementation |
|---------|---------------|
| **DTO Pattern** | Separate Request/Response classes from JPA entities |
| **Repository Pattern** | Spring Data JPA interfaces with custom queries |
| **Service Layer** | All business logic in `@Service` classes |
| **Filter Chain** | `JwtAuthFilter` extends `OncePerRequestFilter` |
| **Global Exception Handler** | `@RestControllerAdvice` returns consistent error responses |
| **Context API** | React `AuthContext` for global login state — no Redux needed |

---

## 🔄 Running Again After Closing

Every time you reopen the project:

**Step 1** — Start MySQL (Windows):
```
Win + R → services.msc → Find MySQL → Start
```

**Step 2** — Terminal 1 (Backend):
```bash
cd backend
mvn spring-boot:run
```

**Step 3** — Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

---

## 🚢 Free Deployment Guide

### Backend → Railway.app
1. Push code to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Add a **MySQL** database plugin
4. Set environment variables:
```
SPRING_DATASOURCE_URL=jdbc:mysql://...
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=...
APP_JWT_SECRET=your_secret_key
```

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → New Project → Import GitHub repo
2. Set root directory to `frontend`
3. Add environment variable:
```
REACT_APP_API_URL=https://your-railway-backend-url.railway.app
```
---
