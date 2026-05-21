# Product Service - Architecture & Data Flow

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER BROWSER                               │
│                   (http://localhost:5173 OR                      │
│                    http://localhost:8080)                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ HTTP/REST
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼─────┐     ┌─────▼──────┐    ┌──────▼──────┐
   │  Pages   │     │ Components │    │   Utils     │
   │          │     │            │    │             │
   │ List     │────▶│ ProductTbl │──▶│ API Client  │
   │ Form     │     │ ProductFrm │    │ (Axios)     │
   │ Detail   │     │ Modal      │    │             │
   │ Edit     │     │ Toast      │    │ validators  │
   └──────────┘     └────────────┘    └──────┬──────┘
        │                 │                  │
        │                 │    React Router  │
        │                 │    State Mgmt    │
        │                 │                  │
        └─────────────────┼──────────────────┘
                          │
                    ┌─────▼──────────┐
                    │  Tailwind CSS  │
                    │   Styling      │
                    └────────────────┘
                          │
                    HTTP Requests
                          │
        ┌─────────────────▼─────────────────┐
        │                                   │
        │   SPRING BOOT BACKEND             │
        │   (http://localhost:8080)         │
        │                                   │
        │  ┌────────────────────────────┐   │
        │  │   ProductController        │   │
        │  │ GET    /api/products       │   │
        │  │ GET    /api/products/{id}  │   │
        │  │ POST   /api/products       │   │
        │  │ PUT    /api/products/{id}  │   │
        │  │ DELETE /api/products/{id}  │   │
        │  │ GET    /api/health         │   │
        │  └──────────────┬─────────────┘   │
        │                 │                 │
        │  ┌──────────────▼──────────────┐  │
        │  │  ProductService            │  │
        │  │  - createProduct()          │  │
        │  │  - updateProduct()          │  │
        │  │  - deleteProduct()          │  │
        │  │  - getProduct()             │  │
        │  │  - getAllProducts()         │  │
        │  └──────────────┬──────────────┘  │
        │                 │                 │
        │  ┌──────────────▼──────────────┐  │
        │  │  ProductRepository (JPA)    │  │
        │  │  Spring Data Interface      │  │
        │  └──────────────┬──────────────┘  │
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                   JDBC / SQL
                          │
        ┌─────────────────▼─────────────────┐
        │                                   │
        │      MYSQL DATABASE               │
        │                                   │
        │  ┌──────────────────────────────┐ │
        │  │  PRODUCT TABLE               │ │
        │  │  - id (PK)                   │ │
        │  │  - name                      │ │
        │  │  - description               │ │
        │  │  - price                     │ │
        │  │  - quantity                  │ │
        │  │  - createdAt                 │ │
        │  │  - updatedAt                 │ │
        │  └──────────────────────────────┘ │
        │                                   │
        └───────────────────────────────────┘
```

## 📊 Component Hierarchy

```
App (Main Router)
│
├── Header
│   ├── Logo & Title
│   └── HealthStatus
│
├── Routes
│   │
│   ├── ProductListPage (/)
│   │   ├── ProductTable
│   │   │   ├── ProductRow (map)
│   │   │   │   ├── Edit Button → /edit/:id
│   │   │   │   └── Delete Button → ConfirmDeleteModal
│   │   │   └── No Products Message
│   │   │
│   │   └── ConfirmDeleteModal
│   │
│   ├── ProductFormPage (/create)
│   │   └── ProductForm
│   │       ├── Name Input
│   │       ├── Description Textarea
│   │       ├── Price Input
│   │       ├── Quantity Input
│   │       └── Submit/Cancel Buttons
│   │
│   ├── ProductEditPage (/edit/:id)
│   │   └── ProductForm (with pre-filled data)
│   │
│   ├── ProductDetailPage (/products/:id)
│   │   ├── Product Info Display
│   │   ├── Edit Button → /edit/:id
│   │   ├── Delete Button → ConfirmDeleteModal
│   │   └── Back Button
│   │
│   └── NotFound (404)
│
├── ToastContainer
│   └── Toast[] (messages)
│
└── (Static Files served by Spring Boot)
```

## 🔄 Data Flow - Create Product

```
┌─────────────────────────────────────────────────────────────────┐
│  FRONTEND - ProductFormPage                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. User enters form data:                                      │
│     ├─ name: "iPhone 15"                                        │
│     ├─ description: "Latest Apple phone"                        │
│     ├─ price: 999.99                                            │
│     └─ quantity: 50                                             │
│                                                                 │
│  2. Client-side validation runs:                                │
│     ├─ name length ✓ (2-100)                                    │
│     ├─ description length ✓ (max 500)                           │
│     ├─ price > 0 ✓ (999.99)                                     │
│     └─ quantity >= 0 ✓ (50)                                     │
│                                                                 │
│  3. Form submitted → handleSubmit()                             │
│     └─ Calls: productService.createProduct(data)                │
│                                                                 │
│  4. API Request:                                                │
│     POST /api/products                                          │
│     Content-Type: application/json                              │
│     Body: {                                                     │
│       "name": "iPhone 15",                                      │
│       "description": "Latest Apple phone",                      │
│       "price": 999.99,                                          │
│       "quantity": 50                                            │
│     }                                                           │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ HTTP POST
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│  BACKEND - ProductController.createProduct()                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. @PostMapping                                                │
│  2. @Valid validates request:                                   │
│     ├─ @NotBlank name ✓                                         │
│     ├─ @Size description ✓                                      │
│     ├─ @DecimalMin price ✓                                      │
│     └─ @Min quantity ✓                                          │
│                                                                 │
│  3. Calls: productService.createProduct(request)                │
│                                                                 │
│  4. Service creates Product entity                              │
│  5. Service calls: productRepository.save(product)              │
│                                                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ JDBC INSERT
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│  DATABASE - PRODUCT Table                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  INSERT INTO product (name, description, price, quantity,      │
│                       created_at, updated_at)                   │
│  VALUES ('iPhone 15', 'Latest Apple phone', 999.99, 50,        │
│          NOW(), NOW())                                          │
│                                                                 │
│  ✓ ID auto-generated: 1                                         │
│  ✓ Timestamps auto-set                                          │
│                                                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ RETURN ID
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│  BACKEND - ProductResponse Built                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  {                                                              │
│    "id": 1,                                                     │
│    "name": "iPhone 15",                                         │
│    "description": "Latest Apple phone",                         │
│    "price": 999.99,                                             │
│    "quantity": 50,                                              │
│    "createdAt": "2026-05-20T10:30:45",                          │
│    "updatedAt": "2026-05-20T10:30:45"                           │
│  }                                                              │
│                                                                 │
│  Status: 201 Created                                            │
│                                                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ HTTP 201
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│  FRONTEND - Response Handled                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Axios interceptor receives 201                              │
│  2. handleSubmit() success block:                               │
│     ├─ Show toast: "Product created successfully" ✓             │
│     ├─ Navigate to: "/" (list page)                             │
│     └─ List auto-reloads products                               │
│                                                                 │
│  3. User sees new product in table! ✓                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow - Read Products

```
ProductListPage.useEffect()
         │
         ├─ Component mounts
         │
         ├─ productService.listProducts()
         │
         ├─ GET /api/products
         │
         ├─ ProductController.getAllProducts()
         │
         ├─ productService.getAllProducts()
         │
         ├─ productRepository.findAll()
         │
         ├─ SELECT * FROM product
         │
         ├─ Map entities to ProductResponse[]
         │
         ├─ Return JSON array
         │
         ├─ setProducts(data)
         │
         └─ ProductTable renders rows
```

## 🔄 Data Flow - Update Product

```
ProductEditPage.handleSubmit()
         │
         ├─ Validate form data
         │
         ├─ productService.updateProduct(id, data)
         │
         ├─ PUT /api/products/:id
         │
         ├─ ProductController.updateProduct()
         │
         ├─ productService.updateProduct()
         │
         ├─ productRepository.findById()
         │
         ├─ Update entity fields
         │
         ├─ productRepository.save()
         │
         ├─ UPDATE product SET ... WHERE id = :id
         │
         ├─ Return updated ProductResponse
         │
         ├─ Navigate to "/"
         │
         └─ Toast: "Product updated successfully"
```

## 🔄 Data Flow - Delete Product

```
ConfirmDeleteModal.onConfirm()
         │
         ├─ productService.deleteProduct(id)
         │
         ├─ DELETE /api/products/:id
         │
         ├─ ProductController.deleteProduct()
         │
         ├─ productService.deleteProduct()
         │
         ├─ productRepository.deleteById(id)
         │
         ├─ DELETE FROM product WHERE id = :id
         │
         ├─ Return 204 No Content
         │
         ├─ setProducts(prev => prev.filter(p => p.id !== id))
         │
         ├─ Close modal
         │
         └─ Toast: "Product deleted successfully"
```

## 🌐 Network Requests

### Development Environment
```
Browser (localhost:5173)
         │
         ├─ Static assets (HTML, CSS, JS)
         │  └─ Served by Vite dev server
         │
         └─ API requests to /api/*
            └─ Proxied to http://localhost:8080/api/*
               └─ Spring Boot backend
```

### Production Environment
```
Browser (localhost:8080)
         │
         ├─ Static assets (HTML, CSS, JS)
         │  └─ Served by Spring Boot from /static/*
         │
         └─ API requests to /api/*
            └─ Handled by Spring Boot controllers
               └─ Same server
```

## 📦 Request/Response Examples

### GET /api/products
**Request:**
```
GET /api/products HTTP/1.1
Host: localhost:8080
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "iPhone 15",
    "description": "Latest Apple phone",
    "price": 999.99,
    "quantity": 50,
    "createdAt": "2026-05-20T10:30:45",
    "updatedAt": "2026-05-20T10:30:45"
  },
  {
    "id": 2,
    "name": "MacBook Pro",
    "description": "M3 chip",
    "price": 1999.99,
    "quantity": 25,
    "createdAt": "2026-05-20T10:35:22",
    "updatedAt": "2026-05-20T10:35:22"
  }
]
```

### POST /api/products
**Request:**
```
POST /api/products HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "name": "iPhone 15",
  "description": "Latest Apple phone",
  "price": 999.99,
  "quantity": 50
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "iPhone 15",
  "description": "Latest Apple phone",
  "price": 999.99,
  "quantity": 50,
  "createdAt": "2026-05-20T10:30:45",
  "updatedAt": "2026-05-20T10:30:45"
}
```

### PUT /api/products/{id}
**Request:**
```
PUT /api/products/1 HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "description": "Updated description",
  "price": 1099.99,
  "quantity": 45
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "iPhone 15 Pro",
  "description": "Updated description",
  "price": 1099.99,
  "quantity": 45,
  "createdAt": "2026-05-20T10:30:45",
  "updatedAt": "2026-05-20T10:35:60"
}
```

### DELETE /api/products/{id}
**Request:**
```
DELETE /api/products/1 HTTP/1.1
Host: localhost:8080
```

**Response (204 No Content):**
```
(empty body)
```

### GET /api/health
**Request:**
```
GET /api/health HTTP/1.1
Host: localhost:8080
```

**Response (200 OK):**
```
"Product Service is running"
```

## 🔄 Validation Flow

```
INPUT
  │
  ├─ Client-side validation (Immediate)
  │  ├─ Name: 2-100 chars
  │  ├─ Description: max 500 chars
  │  ├─ Price: > 0
  │  ├─ Quantity: >= 0
  │  │
  │  └─ If invalid:
  │     ├─ Show field errors
  │     ├─ Disable submit button
  │     └─ Don't send to server
  │
  └─ Server-side validation (@Valid, @NotNull, etc.)
     │
     ├─ If valid:
     │  ├─ Save to database
     │  └─ Return 201/200 + data
     │
     └─ If invalid:
        ├─ Return 400 Bad Request
        ├─ Error details in response
        └─ Frontend shows error toast
```

---

## 🎯 Summary

✅ **Frontend** (React + Tailwind)
- User interactions
- Form validation
- API requests
- State management
- Routing

✅ **Backend** (Spring Boot)
- REST endpoints
- Business logic
- Database operations
- Error handling
- CORS support

✅ **Database** (MySQL)
- Data persistence
- Automatic timestamps
- Auto-increment IDs
- Constraints validation

**All layers work together seamlessly!**

