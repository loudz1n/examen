#!/bin/bash
echo "============================================"
echo "  SOLEMARK - Tienda de Calzado"
echo "============================================"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# ---- BACKEND ----
echo "[1/4] Configurando backend..."
cd "$SCRIPT_DIR/backend"
python3 -m venv venv
source venv/bin/activate

echo "[2/4] Instalando dependencias..."
pip install -r requirements.txt

echo "[3/4] Migraciones..."
python manage.py makemigrations
python manage.py migrate
python manage.py shell -c "
from django.contrib.auth import get_user_model
U = get_user_model()
if not U.objects.filter(username='admin').exists():
    U.objects.create_superuser('admin','admin@mail.com','admin123')
    print('Superusuario creado: admin / admin123')
else:
    print('Superusuario ya existe')
"

echo "[4/4] Iniciando backend..."
python manage.py runserver &
BACKEND_PID=$!

# ---- FRONTEND ----
cd "$SCRIPT_DIR/frontend"
echo "Instalando dependencias frontend..."
npm install

echo "Iniciando frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "============================================"
echo " Backend:  http://localhost:8000"
echo " Frontend: http://localhost:5173"
echo " Admin:    http://localhost:8000/admin"
echo " Usuario:  admin / admin123"
echo "============================================"
echo ""
echo "Presiona Ctrl+C para detener todo"
wait $BACKEND_PID $FRONTEND_PID
