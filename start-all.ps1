# Quick Start Script for HealthBridge AI
# Run this script to start all services

Write-Host "🏥 Starting HealthBridge AI..." -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js version: $(node --version)" -ForegroundColor Green
Write-Host ""

# Function to start a service in a new window
function Start-Service {
    param (
        [string]$Name,
        [string]$Path,
        [string]$Command
    )
    
    Write-Host "🚀 Starting $Name..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$Path'; Write-Host '🏥 $Name' -ForegroundColor Cyan; $Command"
    Start-Sleep -Seconds 2
}

# Start Backend Server
Start-Service -Name "Backend Server (Port 5002)" `
              -Path "F:\HealthBridge-AI\web\Backend" `
              -Command "node server.js"

# Start Frontend Server
Start-Service -Name "Frontend Server (Port 5173)" `
              -Path "F:\HealthBridge-AI\web\Frontend" `
              -Command "npm run dev"

# Start Mobile App (optional)
$startMobile = Read-Host "Do you want to start the mobile app? (y/n)"
if ($startMobile -eq 'y' -or $startMobile -eq 'Y') {
    Start-Service -Name "Mobile App (Port 8081)" `
                  -Path "F:\HealthBridge-AI\app" `
                  -Command "npx expo start"
}

Write-Host ""
Write-Host "✅ All services started!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Access your application at:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Backend API: http://localhost:5002/api/v1" -ForegroundColor White
if ($startMobile -eq 'y' -or $startMobile -eq 'Y') {
    Write-Host "   Mobile App: http://localhost:8081" -ForegroundColor White
}
Write-Host ""
Write-Host "📝 To stop all services, close the terminal windows" -ForegroundColor Yellow
Write-Host ""

# Keep this window open
Read-Host "Press Enter to exit this window (services will continue running)"
