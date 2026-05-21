#!/usr/bin/env pwsh

# Quick Start Script for Product Service UI + Backend (PowerShell)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Product Service - Quick Start Guide" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This script will help you start the development environment." -ForegroundColor White
Write-Host ""
Write-Host "Choose your preferred development mode:" -ForegroundColor Yellow
Write-Host ""
Write-Host "[1] Start Backend Only (Spring Boot on http://localhost:8080)" -ForegroundColor Green
Write-Host "[2] Start Frontend Only (Vite Dev Server on http://localhost:5173)" -ForegroundColor Green
Write-Host "[3] Build for Production (React + Spring Boot JAR)" -ForegroundColor Green
Write-Host "[4] Run Full Stack Production JAR (http://localhost:8080)" -ForegroundColor Green
Write-Host ""

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Starting Spring Boot Backend..." -ForegroundColor Yellow
        Write-Host "Backend will be available at http://localhost:8080" -ForegroundColor Yellow
        Write-Host "API available at http://localhost:8080/api" -ForegroundColor Yellow
        Write-Host ""
        & mvn spring-boot:run
    }
    "2" {
        Write-Host ""
        Write-Host "Installing dependencies and starting Vite Dev Server..." -ForegroundColor Yellow
        Set-Location ui
        & npm install
        Write-Host ""
        Write-Host "Frontend will be available at http://localhost:5173" -ForegroundColor Yellow
        Write-Host "Backend requests will be proxied to http://localhost:8080" -ForegroundColor Yellow
        Write-Host ""
        & npm run dev
    }
    "3" {
        Write-Host ""
        Write-Host "Building frontend and creating production JAR..." -ForegroundColor Yellow
        Write-Host "This will take a few minutes..." -ForegroundColor Yellow
        Write-Host ""
        & mvn clean package
        Write-Host ""
        Write-Host "Build complete!" -ForegroundColor Green
        Write-Host "JAR file: target/product-service-1.0.0.jar" -ForegroundColor Green
        Write-Host ""
    }
    "4" {
        Write-Host ""
        Write-Host "Starting Production JAR..." -ForegroundColor Yellow
        Write-Host "Full application available at http://localhost:8080" -ForegroundColor Yellow
        Write-Host ""
        if (Test-Path "target/product-service-1.0.0.jar") {
            & java -jar target/product-service-1.0.0.jar
        } else {
            Write-Host "JAR file not found. Please build first using option 3." -ForegroundColor Red
        }
    }
    default {
        Write-Host "Invalid choice. Please run the script again." -ForegroundColor Red
    }
}

Read-Host "Press Enter to exit"

