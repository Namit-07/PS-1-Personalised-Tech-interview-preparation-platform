# Start both servers

Write-Host "🚀 Starting TechPrep Platform..." -ForegroundColor Cyan
Write-Host ""

# Start Backend
Write-Host "📦 Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; node server.js"

# Wait a moment
Start-Sleep -Seconds 2

# Start Frontend
Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npm run dev"

# Wait a moment
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "✅ Both servers should be starting..." -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to open browser..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Open browser
Start-Process "http://localhost:3000"
