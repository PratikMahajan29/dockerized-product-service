# Product Service - Spring Boot CRUD REST API

A production-quality REST API for managing products built with Spring Boot 3.3.x, Spring Data JPA, and MySQL. This application provides comprehensive CRUD operations with validation, error handling, and persistence.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Building the Project](#building-the-project)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Request/Response Examples](#requestresponse-examples)
- [Error Handling](#error-handling)
- [Running Tests](#running-tests)

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete products
- **Data Validation**: Comprehensive input validation using Jakarta Bean Validation
- **Exception Handling**: Global exception handler with structured error responses
- **MySQL Persistence**: Automatic database creation and schema management via Hibernate
- **Timestamps**: Automatic tracking of creation and modification times
- **RESTful API Design**: Proper HTTP status codes and resource-based endpoints
- **Unit & Integration Tests**: Comprehensive test coverage with MockMvc
- **Clean Architecture**: Separation of concerns with controller, service, and repository layers
- **Constructor Injection**: Best practice dependency injection pattern
- **Comprehensive Logging**: Debug-level logging for troubleshooting

## Technology Stack

- **Java**: 21
- **Spring Boot**: 3.3.2
- **Spring Data JPA**: For ORM and repository pattern
- **Spring Validation**: For input validation
- **MySQL**: Relational database
- **Lombok**: Boilerplate reduction
- **Maven**: Build automation
- **JUnit 5**: Testing framework
- **Mockito**: Mocking library

## Prerequisites

Before running this application, ensure you have the following installed:

1. **Java 21**: Download from [Oracle JDK 21](https://www.oracle.com/java/technologies/downloads/#java21)
   - Verify installation: `java -version`
   - Set JAVA_HOME environment variable

2. **Maven 3.8.1+**: Download from [Apache Maven](https://maven.apache.org/download.cgi)
   - Verify installation: `mvn -version`

3. **MySQL Server 8.0+**: Download from [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
   - Ensure MySQL is running
   - Default credentials used: `root` / `root`
   - If using different credentials, update `application.yml`

### Verify Prerequisites

```powershell
# Check Java version
java -version

# Check Maven version
mvn -version

# Test MySQL connection (if MySQL CLI is installed)
mysql -u root -p -e "SELECT VERSION();"
```

## Project Setup

1. **Clone/Extract the Project**

```powershell
cd "C:\Users\prati\OneDrive\Desktop\Learning Docker\product-service"
```

2. **Verify Directory Structure**

```
product-service/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/com/example/productservice/
│   │   │   ├── ProductServiceApplication.java
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── exception/
│   │   │   ├── mapper/
│   │   │   ├── repository/
│   │   │   └── service/
│   │   └── resources/
│   │       └── application.yml
│   └── test/
│       └── java/com/example/productservice/
└── README.md
```

## Building the Project

Build the project using Maven:

```powershell
cd "C:\Users\prati\OneDrive\Desktop\Learning Docker\product-service"
mvn clean package
```

**Expected Output**:
```
[INFO] BUILD SUCCESS
[INFO] Total time: XX.XXXs
```

To skip tests during build:

```powershell
mvn clean package -DskipTests
```

## Running the Application

### Start the Application

```powershell
cd "C:\Users\prati\OneDrive\Desktop\Learning Docker\product-service"
mvn spring-boot:run
```

**Expected Console Output**:
```
...
 _____            _            _     _____           _     
|  __ \          | |          | |   / ____|         (_)    
| |__) | ___   __| |_   _  ___| |_ | (___   ___ _ __ ___   ___ ___
|  ___/ / _ \ / _` | | | |/ __| __|  \___ \ / _ \ '__| \ \ / / _ \
| |    | (_) | (_| | |_| | (__| |_   ____) |  __/ |  | |\ V /  __/
|_|     \___/ \__,_|\__,_|\___|\__| |_____/ \___|_|  |_| \_/ \___|

2024-XX-XX XX:XX:XX.XXX  INFO XXXX --- [           main] c.e.p.ProductServiceApplication
Started ProductServiceApplication in X.XXX seconds (JVM running for X.XXX)
```

### Verify Application is Running

```powershell
# Health check endpoint
curl http://localhost:8080/api/health
```

**Expected Response**:
```
Product Service is running
```

## API Endpoints

### Base URL

```
http://localhost:8080/api
```

### 1. Health Check

**Endpoint**: `GET /api/health`

**Description**: Verify the service is running

**Response**: 
```
Product Service is running
```

### 2. Create Product

**Endpoint**: `POST /api/products`

**Status Code**: `201 Created`

**Request Body**:
```json
{
  "name": "Laptop",
  "description": "High-performance laptop for professional work",
  "price": 999.99,
  "quantity": 5
}
```

**Response** (201):
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance laptop for professional work",
  "price": 999.99,
  "quantity": 5,
  "createdAt": "2024-05-17T10:30:45",
  "updatedAt": "2024-05-17T10:30:45"
}
```

### 3. Get All Products

**Endpoint**: `GET /api/products`

**Status Code**: `200 OK`

**Response**:
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "quantity": 5,
    "createdAt": "2024-05-17T10:30:45",
    "updatedAt": "2024-05-17T10:30:45"
  },
  {
    "id": 2,
    "name": "Monitor",
    "description": "4K Monitor",
    "price": 399.99,
    "quantity": 10,
    "createdAt": "2024-05-17T10:31:15",
    "updatedAt": "2024-05-17T10:31:15"
  }
]
```

### 4. Get Product by ID

**Endpoint**: `GET /api/products/{id}`

**Status Code**: `200 OK`

**Example**: `GET /api/products/1`

**Response**:
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "quantity": 5,
  "createdAt": "2024-05-17T10:30:45",
  "updatedAt": "2024-05-17T10:30:45"
}
```

### 5. Update Product

**Endpoint**: `PUT /api/products/{id}`

**Status Code**: `200 OK`

**Example**: `PUT /api/products/1`

**Request Body**:
```json
{
  "name": "Gaming Laptop",
  "description": "High-performance gaming laptop",
  "price": 1299.99,
  "quantity": 3
}
```

**Response** (200):
```json
{
  "id": 1,
  "name": "Gaming Laptop",
  "description": "High-performance gaming laptop",
  "price": 1299.99,
  "quantity": 3,
  "createdAt": "2024-05-17T10:30:45",
  "updatedAt": "2024-05-17T10:32:20"
}
```

### 6. Delete Product

**Endpoint**: `DELETE /api/products/{id}`

**Status Code**: `204 No Content`

**Example**: `DELETE /api/products/1`

**Response**: Empty body (204 No Content)

## Request/Response Examples

### Using PowerShell (curl/Invoke-WebRequest)

#### Create a Product

```powershell
$product = @{
    name = "Wireless Mouse"
    description = "Ergonomic wireless mouse"
    price = 29.99
    quantity = 50
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8080/api/products" `
  -Method POST `
  -Body $product `
  -ContentType "application/json"
```

#### Get All Products

```powershell
Invoke-WebRequest -Uri "http://localhost:8080/api/products" `
  -Method GET | Select-Object -ExpandProperty Content
```

#### Get Product by ID

```powershell
Invoke-WebRequest -Uri "http://localhost:8080/api/products/1" `
  -Method GET | Select-Object -ExpandProperty Content
```

#### Update a Product

```powershell
$updateProduct = @{
    name = "Wireless Mouse Pro"
    description = "Advanced ergonomic wireless mouse"
    price = 39.99
    quantity = 45
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8080/api/products/1" `
  -Method PUT `
  -Body $updateProduct `
  -ContentType "application/json"
```

#### Delete a Product

```powershell
Invoke-WebRequest -Uri "http://localhost:8080/api/products/1" `
  -Method DELETE
```

### Using Linux/macOS (curl)

#### Create a Product

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse",
    "price": 29.99,
    "quantity": 50
  }'
```

#### Get All Products

```bash
curl http://localhost:8080/api/products
```

#### Get Product by ID

```bash
curl http://localhost:8080/api/products/1
```

#### Update a Product

```bash
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Mouse Pro",
    "description": "Advanced ergonomic wireless mouse",
    "price": 39.99,
    "quantity": 45
  }'
```

#### Delete a Product

```bash
curl -X DELETE http://localhost:8080/api/products/1
```

## Error Handling

The API uses consistent error response format for all errors:

### Error Response Structure

```json
{
  "timestamp": "2024-05-17T10:35:20",
  "status": 400,
  "error": "Validation Failed",
  "message": "name: Product name is required, price: Product price must be greater than 0",
  "path": "/api/products"
}
```

### Error Scenarios

#### 1. Product Not Found (404)

**Request**: `GET /api/products/999`

**Response**:
```json
{
  "timestamp": "2024-05-17T10:35:20",
  "status": 404,
  "error": "Not Found",
  "message": "Product not found with id: 999",
  "path": "/api/products/999"
}
```

#### 2. Validation Error (400)

**Request**: `POST /api/products` with invalid data

```json
{
  "name": "X",
  "price": 0,
  "quantity": -5
}
```

**Response**:
```json
{
  "timestamp": "2024-05-17T10:35:20",
  "status": 400,
  "error": "Validation Failed",
  "message": "name: Product name must be between 2 and 100 characters, price: Product price must be greater than 0, quantity: Product quantity must be greater than or equal to 0",
  "path": "/api/products"
}
```

#### 3. Internal Server Error (500)

**Response**:
```json
{
  "timestamp": "2024-05-17T10:35:20",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Database connection error",
  "path": "/api/products"
}
```

### Validation Rules

| Field | Rules | Example |
|-------|-------|---------|
| `name` | Required, 2-100 characters | "Laptop" |
| `description` | Optional, max 500 characters | "High-performance laptop" |
| `price` | Required, must be > 0 | 999.99 |
| `quantity` | Required, must be >= 0 | 5 |

## Running Tests

### Run All Tests

```powershell
mvn test
```

### Run Specific Test Class

```powershell
mvn test -Dtest=ProductControllerTest
```

### Run with Coverage Report

```powershell
mvn test
```

**Expected Output**:
```
[INFO] Tests run: XX, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

### Test Coverage

The test suite includes:

1. **Product Controller Tests** (`ProductControllerTest.java`)
   - ✅ Create product successfully
   - ✅ Validation failure - missing name
   - ✅ Validation failure - invalid price
   - ✅ Get all products
   - ✅ Get product by ID - success
   - ✅ Get product by ID - not found
   - ✅ Update product - success
   - ✅ Update product - not found
   - ✅ Delete product - success
   - ✅ Delete product - not found

2. **Application Context Test** (`ProductServiceApplicationTests.java`)
   - ✅ Context loads successfully

## Troubleshooting

### Database Connection Error

**Error**: `Communication link failure: No suitable driver`

**Solution**:
1. Verify MySQL is running: `mysql -u root -p`
2. Check credentials in `application.yml`
3. Ensure MySQL Connector dependency is in pom.xml

### Java Version Error

**Error**: `error: invalid source release: 21`

**Solution**:
1. Verify Java 21: `java -version`
2. Set JAVA_HOME to Java 21 installation
3. Update `pom.xml` compiler configuration if needed

### Port Already in Use

**Error**: `Address already in use`

**Solution**:
1. Kill process on port 8080:
   ```powershell
   # PowerShell
   Get-Process | Where-Object {$_.Name -like "*java*"} | Stop-Process
   ```

2. Or change port in `application.yml`:
   ```yaml
   server:
     port: 8081
   ```

### Build Failures

**Solution**:
```powershell
# Clean Maven cache
mvn clean
# Rebuild
mvn package
```

## Project Structure

```
product-service/
├── pom.xml                              # Maven configuration
├── README.md                            # This file
└── src/
    ├── main/
    │   ├── java/com/example/productservice/
    │   │   ├── ProductServiceApplication.java
    │   │   ├── controller/
    │   │   │   ├── ProductController.java     # REST endpoints
    │   │   │   └── HealthController.java      # Health check
    │   │   ├── dto/
    │   │   │   ├── ProductRequest.java        # Input validation
    │   │   │   └── ProductResponse.java       # Output response
    │   │   ├── entity/
    │   │   │   └── Product.java               # JPA entity
    │   │   ├── exception/
    │   │   │   ├── ProductNotFoundException.java
    │   │   │   ├── ErrorResponse.java         # Error DTO
    │   │   │   └── GlobalExceptionHandler.java # Exception handling
    │   │   ├── mapper/
    │   │   │   └── ProductMapper.java         # DTO conversion
    │   │   ├── repository/
    │   │   │   └── ProductRepository.java     # JPA repository
    │   │   └── service/
    │   │       ├── ProductService.java        # Service interface
    │   │       └── ProductServiceImpl.java     # Service implementation
    │   └── resources/
    │       └── application.yml                # Configuration
    └── test/
        └── java/com/example/productservice/
            ├── ProductServiceApplicationTests.java
            └── controller/
                └── ProductControllerTest.java
```

## Best Practices Implemented

✅ **Clean Architecture**: Separation of concerns with distinct layers
✅ **Constructor Injection**: No field injection, using constructor-based DI
✅ **Service Layer**: Business logic isolated from controllers
✅ **Repository Pattern**: Data access abstraction
✅ **DTOs**: Separate request/response objects
✅ **Validation**: Input validation using Jakarta Bean Validation
✅ **Exception Handling**: Global exception handler with structured responses
✅ **Lifecycle Hooks**: JPA lifecycle callbacks for timestamps
✅ **Transactional**: Proper transaction management
✅ **Testing**: Unit and integration tests with mocking
✅ **Documentation**: JavaDoc and README
✅ **Logging**: Configured debug-level logging

## Next Steps

This application is ready for containerization with Docker and Docker Compose. The following files are recommended for the next phase:

- `Dockerfile` - For building a Docker image
- `docker-compose.yml` - For orchestrating the app and MySQL containers
- `.dockerignore` - To exclude unnecessary files from Docker image
- `docker-entrypoint.sh` - For container startup configuration

## Support and Contact

For issues or questions regarding this project, refer to the Spring Boot documentation:
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Jakarta Bean Validation](https://jakarta.ee/specifications/bean-validation/)

## License

This project is provided as-is for educational purposes.

---

**Last Updated**: May 17, 2024
**Version**: 1.0.0

