@echo off
rem =====================================================
rem  Hotel Booking - user website launcher
rem  Requires: backend already running on :8000
rem  Starts Vite dev server on http://localhost:5173
rem =====================================================
cd /d "%~dp0"

echo Starting user frontend on http://localhost:5173 ...
echo (backend must be running on http://127.0.0.1:8000)
echo.
call npm install
call npm run dev

pause
