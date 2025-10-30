# Railway Deployment via CLI
# Run from backend directory

Write-Host "🚀 Railway CLI Deployment" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan

# Step 1: Install Railway CLI
Write-Host "`n📦 Step 1: Install Railway CLI" -ForegroundColor Yellow
$railwayInstalled = Get-Command railway -ErrorAction SilentlyContinue
if (-not $railwayInstalled) {
    Write-Host "Installing Railway CLI..." -ForegroundColor White
    npm install -g @railway/cli
} else {
    Write-Host "Railway CLI already installed ✓" -ForegroundColor Green
}

# Step 2: Login
Write-Host "`n🔐 Step 2: Login to Railway" -ForegroundColor Yellow
Write-Host "This will open a browser window..." -ForegroundColor White
railway login

# Step 3: Initialize
Write-Host "`n🎯 Step 3: Initialize Project" -ForegroundColor Yellow
Set-Location backend
railway init

Write-Host "`n✅ Project initialized!" -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Set environment variables:" -ForegroundColor White
Write-Host "   railway variables set PORT=5000" -ForegroundColor Gray
Write-Host "   railway variables set NODE_ENV=production" -ForegroundColor Gray
Write-Host "   railway variables set MONGODB_URI='your_uri'" -ForegroundColor Gray
Write-Host "   railway variables set JWT_SECRET='your_secret'" -ForegroundColor Gray
Write-Host "   railway variables set GEMINI_API_KEY='your_key'" -ForegroundColor Gray
Write-Host "`n2. Deploy:" -ForegroundColor White
Write-Host "   railway up" -ForegroundColor Gray
Write-Host "`n3. Generate domain:" -ForegroundColor White
Write-Host "   Go to Railway dashboard → Settings → Generate Domain" -ForegroundColor Gray
