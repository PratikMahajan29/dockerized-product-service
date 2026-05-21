@echo off
REM Quick Start Script for Product Service UI + Backend

echo.
echo ========================================
echo Product Service - Quick Start Guide
echo ========================================
echo.

echo This script will help you start the development environment.
echo.
echo Choose your preferred development mode:
echo.
echo [1] Start Backend Only (Spring Boot on http://localhost:8080)
echo [2] Start Frontend Only (Vite Dev Server on http://localhost:5173)
echo [3] Build for Production (React + Spring Boot JAR)
echo [4] Run Full Stack Production JAR (http://localhost:8080)
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo Starting Spring Boot Backend...
    echo Backend will be available at http://localhost:8080
    echo API available at http://localhost:8080/api
    echo.
    mvn spring-boot:run
) else if "%choice%"=="2" (
    echo.
    echo Installing dependencies and starting Vite Dev Server...
    cd ui
    call npm install
    echo.
    echo Frontend will be available at http://localhost:5173
    echo Backend requests will be proxied to http://localhost:8080
    echo.
    call npm run dev
) else if "%choice%"=="3" (
    echo.
    echo Building frontend and creating production JAR...
    echo This will take a few minutes...
    echo.
    call mvn clean package
    echo.
    echo Build complete!
    echo JAR file: target/product-service-1.0.0.jar
    echo.
) else if "%choice%"=="4" (
    echo.
    echo Starting Production JAR...
    echo Full application available at http://localhost:8080
    echo.
    if exist "target/product-service-1.0.0.jar" (
        java -jar target/product-service-1.0.0.jar
    ) else (
        echo JAR file not found. Please build first using option 3.
    )
) else (
    echo Invalid choice. Please run the script again.
)

pause

