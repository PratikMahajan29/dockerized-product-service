# ============================================================================
# Product Service - Windows PowerShell Setup and Run Script
# ============================================================================
# This script helps setup and run the Product Service Spring Boot application
#

Write-Host ""
Write-Host "============================================================================" -ForegroundColor Cyan
Write-Host "       Product Service - Spring Boot CRUD REST API" -ForegroundColor Cyan
Write-Host "============================================================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-Not (Test-Path "pom.xml")) {
    Write-Host "ERROR: pom.xml not found!" -ForegroundColor Red
    Write-Host "Please run this script from the product-service directory." -ForegroundColor Red
    Write-Host "Expected: C:\Users\prati\OneDrive\Desktop\Learning Docker\product-service" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[*] Current directory: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Show menu
function Show-Menu {
    Write-Host ""
    Write-Host "Choose an option:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  1. Check Prerequisites (Java, Maven, MySQL)" -ForegroundColor White
    Write-Host "  2. Build Project (mvn clean package)" -ForegroundColor White
    Write-Host "  3. Run Application (mvn spring-boot:run)" -ForegroundColor White
    Write-Host "  4. Run Tests (mvn test)" -ForegroundColor White
    Write-Host "  5. Clean Build (mvn clean)" -ForegroundColor White
    Write-Host "  6. Full Build and Run" -ForegroundColor White
    Write-Host "  7. Exit" -ForegroundColor White
    Write-Host ""
}

# Check Prerequisites
function Check-Prerequisites {
    Clear-Host
    Write-Host ""
    Write-Host "[*] Checking Prerequisites..." -ForegroundColor Cyan
    Write-Host ""

    # Check Java
    Write-Host "[*] Checking Java..." -ForegroundColor Yellow
    $javaVersion = (java -version 2>&1 | Select-String "version" | Select-Object -First 1).ToString()
    if ($LASTEXITCODE -eq 0 -and $javaVersion) {
        Write-Host "✓ Java found: $javaVersion" -ForegroundColor Green
    } else {
        Write-Host "✗ Java NOT found" -ForegroundColor Red
        Write-Host "  Please install Java 21 from: https://www.oracle.com/java/technologies/downloads/#java21" -ForegroundColor Yellow
    }

    # Check Maven
    Write-Host ""
    Write-Host "[*] Checking Maven..." -ForegroundColor Yellow
    $mavenVersion = (mvn -v 2>&1 | Select-String "Apache Maven" | Select-Object -First 1).ToString()
    if ($LASTEXITCODE -eq 0 -and $mavenVersion) {
        Write-Host "✓ Maven found: $mavenVersion" -ForegroundColor Green
    } else {
        Write-Host "✗ Maven NOT found" -ForegroundColor Red
        Write-Host "  Please install Maven from: https://maven.apache.org/download.cgi" -ForegroundColor Yellow
    }

    # Check MySQL
    Write-Host ""
    Write-Host "[*] Checking MySQL..." -ForegroundColor Yellow
    try {
        $mysqlVersion = (mysql -u root -p 2>&1 | Select-String "Welcome" | Select-Object -First 1).ToString()
        if ($mysqlVersion) {
            Write-Host "✓ MySQL connection successful" -ForegroundColor Green
        } else {
            Write-Host "- MySQL CLI not found or connection failed (optional)" -ForegroundColor Yellow
            Write-Host "  Ensure MySQL Server is running on localhost:3306 with root/root credentials" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "- MySQL CLI not found (optional)" -ForegroundColor Yellow
        Write-Host "  Ensure MySQL Server is running on localhost:3306 with root/root credentials" -ForegroundColor Yellow
    }

    Write-Host ""
    Write-Host "[!] Prerequisites check complete." -ForegroundColor Cyan
    Read-Host "Press Enter to continue"
}

# Build Project
function Build-Project {
    Clear-Host
    Write-Host ""
    Write-Host "[*] Building Project..." -ForegroundColor Cyan
    Write-Host ""
    mvn clean package -DskipTests

    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "[ERROR] Build failed!" -ForegroundColor Red
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "[SUCCESS] Build completed!" -ForegroundColor Green
        Write-Host ""
    }
    Read-Host "Press Enter to continue"
}

# Run Application
function Run-Application {
    Clear-Host
    Write-Host ""
    Write-Host "[*] Starting Product Service..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "[!] Make sure MySQL Server is running with credentials: root/root" -ForegroundColor Yellow
    Write-Host "[!] Application will start on: http://localhost:8080" -ForegroundColor Yellow
    Write-Host ""
    mvn spring-boot:run
}

# Run Tests
function Run-Tests {
    Clear-Host
    Write-Host ""
    Write-Host "[*] Running Tests..." -ForegroundColor Cyan
    Write-Host ""
    mvn test
    Write-Host ""
    Read-Host "Press Enter to continue"
}

# Clean Build
function Clean-Build {
    Clear-Host
    Write-Host ""
    Write-Host "[*] Cleaning build artifacts..." -ForegroundColor Cyan
    Write-Host ""
    mvn clean
    Write-Host ""
    Write-Host "[SUCCESS] Clean completed!" -ForegroundColor Green
    Write-Host ""
    Read-Host "Press Enter to continue"
}

# Full Build and Run
function Full-Build-Run {
    Clear-Host
    Write-Host ""
    Write-Host "[*] Full Build and Run..." -ForegroundColor Cyan
    Write-Host ""

    Write-Host "Step 1: Building project..." -ForegroundColor Yellow
    mvn clean package -DskipTests

    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "[ERROR] Build failed!" -ForegroundColor Red
        Read-Host "Press Enter to continue"
        return
    }

    Write-Host ""
    Write-Host "Step 2: Starting application..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "[!] Make sure MySQL Server is running with credentials: root/root" -ForegroundColor Yellow
    Write-Host "[!] Application will start on: http://localhost:8080" -ForegroundColor Yellow
    Write-Host ""
    mvn spring-boot:run
}

# Main loop
do {
    Show-Menu
    $choice = Read-Host "Enter option (1-7)"

    switch ($choice) {
        "1" { Check-Prerequisites }
        "2" { Build-Project }
        "3" { Run-Application }
        "4" { Run-Tests }
        "5" { Clean-Build }
        "6" { Full-Build-Run }
        "7" {
            Write-Host ""
            Write-Host "Thank you for using Product Service!" -ForegroundColor Green
            Write-Host "Documentation: README.md" -ForegroundColor Cyan
            Write-Host "Quick Start: QUICK_START.md" -ForegroundColor Cyan
            Write-Host ""
            exit 0
        }
        default {
            Write-Host "Invalid choice. Please try again." -ForegroundColor Red
        }
    }
} while ($true)

