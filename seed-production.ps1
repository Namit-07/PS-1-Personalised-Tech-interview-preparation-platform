# Seed Production Database Script
# This script temporarily updates .env with production MongoDB URI, seeds the database, then restores it

Write-Host "🌱 Database Seeding Script for Production" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Step 1: Backup current .env
Write-Host "`n📋 Step 1: Backing up current .env file..." -ForegroundColor Yellow
Copy-Item -Path "backend\.env" -Destination "backend\.env.backup" -Force
Write-Host "✅ Backup created: backend\.env.backup" -ForegroundColor Green

# Step 2: Get production MongoDB URI from user
Write-Host "`n🔗 Step 2: Enter your production MongoDB Atlas URI" -ForegroundColor Yellow
Write-Host "Format: mongodb+srv://username:password@cluster.mongodb.net/techprep" -ForegroundColor Gray
$productionUri = Read-Host "Enter MongoDB Atlas URI"

if ([string]::IsNullOrWhiteSpace($productionUri)) {
    Write-Host "❌ Error: MongoDB URI cannot be empty!" -ForegroundColor Red
    Write-Host "Restoring backup..." -ForegroundColor Yellow
    Copy-Item -Path "backend\.env.backup" -Destination "backend\.env" -Force
    Remove-Item "backend\.env.backup"
    exit 1
}

# Step 3: Update .env with production URI
Write-Host "`n✏️  Step 3: Updating .env with production URI..." -ForegroundColor Yellow
$envContent = Get-Content "backend\.env" -Raw
$envContent = $envContent -replace 'MONGODB_URI=mongodb://localhost:27017/techprep', "MONGODB_URI=$productionUri"
Set-Content -Path "backend\.env" -Value $envContent
Write-Host "✅ .env updated with production MongoDB URI" -ForegroundColor Green

# Step 4: Run seed script
Write-Host "`n🌱 Step 4: Seeding database..." -ForegroundColor Yellow
Write-Host "This will add 30+ coding problems to your Atlas database" -ForegroundColor Gray
Set-Location backend

try {
    node seed.js
    $seedSuccess = $LASTEXITCODE -eq 0
} catch {
    $seedSuccess = $false
    Write-Host "❌ Error running seed script: $_" -ForegroundColor Red
}

Set-Location ..

# Step 5: Restore original .env
Write-Host "`n♻️  Step 5: Restoring original .env file..." -ForegroundColor Yellow
Copy-Item -Path "backend\.env.backup" -Destination "backend\.env" -Force
Remove-Item "backend\.env.backup" -Force
Write-Host "✅ Original .env restored" -ForegroundColor Green

# Final status
Write-Host "`n========================================" -ForegroundColor Cyan
if ($seedSuccess) {
    Write-Host "🎉 Database seeding completed successfully!" -ForegroundColor Green
    Write-Host "✅ 30+ problems added to your Atlas database" -ForegroundColor Green
    Write-Host "✅ Original .env file restored" -ForegroundColor Green
} else {
    Write-Host "⚠️  Seeding may have failed - check errors above" -ForegroundColor Yellow
    Write-Host "✅ Original .env file restored" -ForegroundColor Green
}
Write-Host "========================================" -ForegroundColor Cyan
