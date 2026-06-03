@echo off
echo ============================================
echo   SOLEMARK - Tienda de Calzado
echo ============================================
echo.

:: ---- BACKEND ----
echo [1/5] Creando entorno virtual Python...
cd /d "%~dp0backend"
python -m venv venv
call venv\Scripts\activate.bat

echo [2/5] Instalando dependencias backend...
pip install -r requirements.txt

echo [3/5] Migraciones...
python manage.py makemigrations
python manage.py migrate

echo [4/5] Creando superusuario admin/admin123...
python manage.py shell -c "from django.contrib.auth import get_user_model; U=get_user_model(); U.objects.filter(username='admin').exists() or U.objects.create_superuser('admin','admin@mail.com','admin123')"

echo [5/5] Iniciando backend...
start "Django Backend" cmd /k "cd /d \"%~dp0backend\" && venv\Scripts\activate.bat && python manage.py runserver"

:: ---- FRONTEND ----
cd /d "%~dp0frontend"
echo.
echo Instalando dependencias frontend...
call npm install

echo Iniciando frontend...
start "React Frontend" cmd /k "cd /d \"%~dp0frontend\" && npm run dev"

echo.
echo ============================================
echo  Backend:  http://localhost:8000
echo  Frontend: http://localhost:5173
echo  Admin:    http://localhost:8000/admin
echo  Usuario:  admin / admin123
echo ============================================
echo.
echo Abre http://localhost:5173 en tu navegador
pause
