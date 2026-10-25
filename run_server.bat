@echo off
setlocal
cd /d "%~dp0server"

echo Starting PetalWish (website + API)...

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js is not installed. Download it from https://nodejs.org ^(LTS^), then run this file again.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing server dependencies ^(first run only^)...
  call npm install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
)

echo Server running at: http://localhost:5000
echo Press Ctrl+C in this window to stop the server.
echo.
start "" http://localhost:5000

if exist .env (
  rem server\.env exists: use the MongoDB database configured there ^(MongoDB Atlas^)
  call npm run dev
) else (
  echo No server\.env found: using a TEMPORARY in-memory database ^(data is lost when you close this window^).
  echo Copy server\.env.example to server\.env and add your MongoDB Atlas URI to keep data.
  echo.
  call npm run dev:memory
)
