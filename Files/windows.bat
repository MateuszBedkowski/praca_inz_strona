@echo off
setlocal

set ARCHIVE_NAME=VulnAgent.zip
set TEMP_DIR=%TEMP%\VulnAgent
mkdir %TEMP_DIR%

powershell -command "Expand-Archive -Path %~dp0%ARCHIVE_NAME% -DestinationPath %TEMP_DIR%"

powershell -File %TEMP_DIR%\windows.ps1

endlocal
exit /b
