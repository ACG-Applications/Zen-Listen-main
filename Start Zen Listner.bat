@echo off
cd /d "%~dp0"
echo Starting Zen Listen...
start http://localhost:3000/
call npm run dev
pause