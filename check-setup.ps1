Write-Host "HealthBridge AI - Setup Verification" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

Write-Host "Checking directories..." -ForegroundColor Yellow
if (Test-Path "web\Backend") { Write-Host "  OK: Backend directory" -ForegroundColor Green } else { Write-Host "  ERROR: Backend not found" -ForegroundColor Red; $allGood = $false }
if (Test-Path "web\Frontend") { Write-Host "  OK: Frontend directory" -ForegroundColor Green } else { Write-Host "  ERROR: Frontend not found" -ForegroundColor Red; $allGood = $false }
if (Test-Path "app") { Write-Host "  OK: Mobile app directory" -ForegroundColor Green } else { Write-Host "  ERROR: App not found" -ForegroundColor Red; $allGood = $false }
Write-Host ""

Write-Host "Checking environment files..." -ForegroundColor Yellow
if (Test-Path "web\Backend\.env") { Write-Host "  OK: Backend .env exists" -ForegroundColor Green } else { Write-Host "  ERROR: Backend .env not found" -ForegroundColor Red; $allGood = $false }
if (Test-Path "web\Frontend\.env") { Write-Host "  OK: Frontend .env exists" -ForegroundColor Green } else { Write-Host "  ERROR: Frontend .env not found" -ForegroundColor Red; $allGood = $false }
if (Test-Path "app\.env") { Write-Host "  OK: Mobile .env exists" -ForegroundColor Green } else { Write-Host "  ERROR: Mobile .env not found" -ForegroundColor Red; $allGood = $false }
Write-Host ""

Write-Host "Checking configuration..." -ForegroundColor Yellow
if (Test-Path "web\Frontend\src\styles\responsive.css") { Write-Host "  OK: Responsive CSS created" -ForegroundColor Green } else { Write-Host "  ERROR: Responsive CSS not found" -ForegroundColor Red; $allGood = $false }
if (Test-Path "vercel.json") { Write-Host "  OK: Vercel config exists" -ForegroundColor Green } else { Write-Host "  ERROR: vercel.json not found" -ForegroundColor Red; $allGood = $false }
Write-Host ""

Write-Host "Testing services..." -ForegroundColor Yellow
try {
    $null = Invoke-WebRequest -Uri "http://localhost:5002/api/v1/test" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    Write-Host "  OK: Backend running on port 5002" -ForegroundColor Green
} catch {
    Write-Host "  WARNING: Backend not running" -ForegroundColor Yellow
}

try {
    $null = Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    Write-Host "  OK: Frontend running on port 5173" -ForegroundColor Green
} catch {
    Write-Host "  WARNING: Frontend not running" -ForegroundColor Yellow
}
Write-Host ""

if ($allGood) {
    Write-Host "SUCCESS: All checks passed! Ready for deployment." -ForegroundColor Green
} else {
    Write-Host "WARNING: Some issues found. Please fix them." -ForegroundColor Yellow
}
Write-Host ""
