# Railway CLI Deployment Script
# Run this in PowerShell from your project root

# Install Railway CLI
Write-Host "Installing Railway CLI..." -ForegroundColor Cyan
npm install -g @railway/cli

# Login to Railway
Write-Host "`nLogging into Railway..." -ForegroundColor Cyan
railway login

# Initialize new project
Write-Host "`nCreating new Railway project..." -ForegroundColor Cyan
cd backend
railway init

# Link the service
Write-Host "`nLinking to Railway service..." -ForegroundColor Cyan
railway link

# Add environment variables
Write-Host "`nAdding environment variables..." -ForegroundColor Yellow
Write-Host "Run these commands one by one:" -ForegroundColor Yellow
Write-Host "railway variables set PORT=5000" -ForegroundColor White
Write-Host "railway variables set NODE_ENV=production" -ForegroundColor White
Write-Host "railway variables set MONGODB_URI='your_mongodb_uri'" -ForegroundColor White
Write-Host "railway variables set JWT_SECRET='your_jwt_secret'" -ForegroundColor White
Write-Host "railway variables set GEMINI_API_KEY='your_gemini_key'" -ForegroundColor White

# Deploy
Write-Host "`nDeploying to Railway..." -ForegroundColor Cyan
railway up

Write-Host "`nDeployment complete! Check Railway dashboard for URL" -ForegroundColor Green
