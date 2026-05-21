@echo off
REM ============================================================================
REM Product Service - Windows Setup and Run Script
REM ============================================================================
REM This script helps setup and run the Product Service Spring Boot application
REM

setlocal enabledelayedexpansion

echo.
echo ============================================================================
echo       Product Service - Spring Boot CRUD REST API
echo ============================================================================
echo.

REM Check if we're in the right directory
if not exist "pom.xml" (
    echo ERROR: pom.xml not found!
    echo Please run this script from the product-service directory.
    echo Expected: C:\Users\prati\OneDrive\Desktop\Learning Docker\product-service
    pause
    exit /b 1
)

echo [*] Current directory: %cd%
echo.

REM Menu
:menu
echo.
echo Choose an option:
echo.
echo   1. Check Prerequisites (Java, Maven, MySQL)
echo   2. Build Project (mvn clean package)
echo   3. Run Application (mvn spring-boot:run)
echo   4. Run Tests (mvn test)
echo   5. Clean Build (mvn clean)
echo   6. Full Build and Run
echo   7. Exit
echo.

set /p choice="Enter option (1-7): "

if "%choice%"=="1" goto check_prerequisites
if "%choice%"=="2" goto build_project
if "%choice%"=="3" goto run_app
if "%choice%"=="4" goto run_tests
if "%choice%"=="5" goto clean_build
if "%choice%"=="6" goto full_build_run
if "%choice%"=="7" goto exit
if "%choice%"=="" goto menu

echo Invalid choice. Please try again.
goto menu

REM ============================================================================
REM Check Prerequisites
REM ============================================================================
:check_prerequisites
cls
echo.
echo [*] Checking Prerequisites...
echo.

REM Check Java
echo [*] Checking Java...
where java >nul 2>nul
if %errorlevel% equ 0 (
    for /f tokens^=2 %%j in ('java -version 2^>^&1 ^| find "version"') do (
        set JAVA_VERSION=%%j
    )
    echo ✓ Java found: !JAVA_VERSION!
) else (
    echo ✗ Java NOT found
    echo   Please install Java 21 from: https://www.oracle.com/java/technologies/downloads/#java21
)

REM Check Maven
echo.
echo [*] Checking Maven...
where mvn >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%m in ('mvn -v 2^>^&1 ^| find "Apache Maven"') do (
        echo ✓ Maven found: %%m
    )
) else (
    echo ✗ Maven NOT found
    echo   Please install Maven from: https://maven.apache.org/download.cgi
)

REM Check MySQL
echo.
echo [*] Checking MySQL...
where mysql >nul 2>nul
if %errorlevel% equ 0 (
    echo ✓ MySQL CLI found
    echo   Verify MySQL Server is running before starting the application
) else (
    echo - MySQL CLI not found (optional)
    echo   Ensure MySQL Server is running on localhost:3306 with root/root credentials
)

echo.
echo [!] Prerequisites check complete. Press any key to continue...
pause >nul
goto menu

REM ============================================================================
REM Build Project
REM ============================================================================
:build_project
cls
echo.
echo [*] Building Project...
echo.
call mvn clean package -DskipTests
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Build failed!
    echo.
) else (
    echo.
    echo [SUCCESS] Build completed!
    echo.
)
pause
goto menu

REM ============================================================================
REM Run Application
REM ============================================================================
:run_app
cls
echo.
echo [*] Starting Product Service...
echo.
echo [!] Make sure MySQL Server is running with credentials: root/root
echo [!] Application will start on: http://localhost:8080
echo.
call mvn spring-boot:run
goto menu

REM ============================================================================
REM Run Tests
REM ============================================================================
:run_tests
cls
echo.
echo [*] Running Tests...
echo.
call mvn test
echo.
pause
goto menu

REM ============================================================================
REM Clean Build
REM ============================================================================
:clean_build
cls
echo.
echo [*] Cleaning build artifacts...
echo.
call mvn clean
echo.
echo [SUCCESS] Clean completed!
echo.
pause
goto menu

REM ============================================================================
REM Full Build and Run
REM ============================================================================
:full_build_run
cls
echo.
echo [*] Full Build and Run...
echo.
echo Step 1: Building project...
call mvn clean package -DskipTests
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Build failed!
    pause
    goto menu
)
echo.
echo Step 2: Starting application...
echo.
echo [!] Make sure MySQL Server is running with credentials: root/root
echo [!] Application will start on: http://localhost:8080
echo.
call mvn spring-boot:run
goto menu

REM ============================================================================
REM Exit
REM ============================================================================
:exit
echo.
echo Thank you for using Product Service!
echo Documentation: README.md
echo Quick Start: QUICK_START.md
echo.
exit /b 0

