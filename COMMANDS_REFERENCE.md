# Product Service - Command Quick Reference

## 🚀 Quick Start

### Windows (Easiest)
```powershell
# Option 1: Using PowerShell script
.\start-dev.ps1

# Option 2: Using Batch script
start-dev.bat
```

### macOS / Linux
```bash
# Terminal 1: Frontend
cd ui
npm install
npm run dev

# Terminal 2: Backend (new terminal)
mvn spring-boot:run
```

---

## 📝 Development Commands

### Frontend (in `ui/` directory)

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

### Backend (project root)

```bash
# Start Spring Boot
mvn spring-boot:run

# Build JAR (includes React UI)
mvn clean package

# Run the built JAR
java -jar target/product-service-1.0.0.jar

# Skip tests during build
mvn clean package -DskipTests

# View test results
mvn test

# Clean build artifacts
mvn clean
```

---

## 🌐 Access Points

### Development
| Component | URL | Purpose |
|-----------|-----|---------|
| **Frontend** | http://localhost:5173 | React app |
| **Backend API** | http://localhost:8080/api | REST endpoints |
| **Backend Health** | http://localhost:8080/api/health | Service status |

### Production
| Component | URL | Purpose |
|-----------|-----|---------|
| **Full App** | http://localhost:8080 | UI + API |
| **API** | http://localhost:8080/api | REST endpoints |

---

## 🔧 Troubleshooting Commands

### Port Already in Use

```bash
# Find process using port 5173 (Windows)
netstat -ano | findstr :5173

# Kill process using port 5173 (Windows)
taskkill /PID <PID> /F

# Find process using port 5173 (macOS/Linux)
lsof -i :5173

# Kill process using port 5173 (macOS/Linux)
kill -9 <PID>

# Use different port
npm run dev -- --port 3001
```

### Clear npm Cache

```bash
cd ui
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Rebuild Everything

```bash
# From project root
mvn clean install -DskipTests

# Or just rebuild frontend
cd ui
rm -rf dist node_modules
npm install
npm run build
```

---

## 📁 File Locations

| Item | Location |
|------|----------|
| React App | `ui/` |
| Backend Code | `src/main/java/` |
| Database Config | `src/main/resources/application.yml` |
| Static Files | `src/main/resources/static/` |
| Built JAR | `target/product-service-1.0.0.jar` |
| React Build Output | `ui/dist/` |
| env Variables (Dev) | `ui/.env.development` |

---

## 🎨 Customization Quick Fixes

### Change Primary Color
Edit `ui/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color-hex'
    }
  }
}
```

### Change App Title
Edit `ui/index.html`:
```html
<title>Your New Title</title>
```

### Change Header Text
Edit `ui/src/App.tsx`:
```typescript
<h1 className="text-2xl font-bold">Your Title</h1>
```

### Change API Base URL (Dev)
Edit `ui/.env.development`:
```env
VITE_API_BASE_URL=http://your-api-server:8080
```

---

## 🔒 Database Setup

### MySQL Setup
```sql
-- Create database (auto-created with createDatabaseIfNotExist=true)
CREATE DATABASE IF NOT EXISTS product;

-- Create user (optional)
CREATE USER 'root'@'localhost' IDENTIFIED BY 'Admin';
GRANT ALL PRIVILEGES ON product.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### Update Connection (in application.yml)
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/product
    username: root
    password: your_password
```

---

## 📊 API Endpoints Reference

### Products

```bash
# Get all products
curl http://localhost:8080/api/products

# Get single product
curl http://localhost:8080/api/products/1

# Create product
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "Test",
    "price": 29.99,
    "quantity": 10
  }'

# Update product
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product",
    "description": "Updated",
    "price": 39.99,
    "quantity": 5
  }'

# Delete product
curl -X DELETE http://localhost:8080/api/products/1

# Health check
curl http://localhost:8080/api/health
```

---

## 🐳 Docker Commands (Optional)

### Build Docker Image
```bash
mvn clean package -DskipTests
docker build -t product-service:1.0.0 .
```

### Run Docker Container
```bash
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/product \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=Admin \
  product-service:1.0.0
```

---

## 📋 Check Installation

### Verify Node.js & npm
```bash
node --version    # Should be 18+
npm --version     # Should be 10+
```

### Verify Java & Maven
```bash
java -version     # Should be 21+
mvn --version     # Should be 3.6+
```

### Verify MySQL
```bash
mysql -u root -p -e "SELECT VERSION();"
```

---

## 🎯 Common Workflows

### Workflow 1: Feature Development
```bash
# Start dev servers
.\start-dev.ps1 # Windows
# Or manually:
npm run dev            # Terminal 1: Frontend
mvn spring-boot:run    # Terminal 2: Backend

# Make changes, see instant hot reload
# Edit files in ui/src/

# Test in browser: http://localhost:5173
```

### Workflow 2: Backend Testing
```bash
# Run backend tests
mvn test

# Run specific test class
mvn test -Dtest=ProductControllerTest

# Skip tests during build
mvn clean package -DskipTests
```

### Workflow 3: Production Deployment
```bash
# Build everything (React + Backend)
mvn clean package

# Run the JAR
java -jar target/product-service-1.0.0.jar

# Access at http://localhost:8080
```

### Workflow 4: Debug Frontend
```bash
# Start dev server
npm run dev

# Open browser DevTools (F12)
# → Console: Check for errors
# → Network: Inspect API calls
# → Elements: Inspect DOM

# React DevTools extension helps too!
```

---

## 🆘 Help Resources

### Documentation Files
- `UI_README.md` - Detailed UI documentation
- `GETTING_STARTED_UI.md` - Quick start guide
- `UI_IMPLEMENTATION_SUMMARY.md` - What was built
- `README.md` - Original project readme

### Online Resources
- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- Tailwind Docs: https://tailwindcss.com
- TypeScript Docs: https://www.typescriptlang.org
- Spring Boot Docs: https://spring.io/projects/spring-boot

---

## ✅ Pre-Deployment Checklist

- [ ] All tests pass: `mvn test`
- [ ] Frontend builds: `npm run build` (in ui/)
- [ ] No console errors in browser
- [ ] All CRUD operations work
- [ ] Health check endpoint responds
- [ ] Database connection verified
- [ ] Build JAR successfully: `mvn clean package`
- [ ] JAR runs without errors: `java -jar target/product-service-1.0.0.jar`

---

**Version**: 1.0.0
**Last Updated**: May 20, 2026
**Status**: Ready to Use 🚀

