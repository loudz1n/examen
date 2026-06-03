# 👟 SoleMark — Tienda de Calzado

Aplicación web completa para gestión de tienda de calzado.  
**Backend:** Django + DRF | **Frontend:** React + Vite + Tailwind CSS

---

## 🚀 Cómo ejecutar (Windows)

### Opción A — Script automático (recomendado)
1. Doble clic en `INICIAR.bat`
2. Esperar a que termine la instalación
3. Abrir http://localhost:5173

### Opción B — Manual

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

**Frontend (otra terminal):**
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 URLs

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| API REST | http://localhost:8000/api/ |
| Admin Django | http://localhost:8000/admin |

---

## 📡 Endpoints API

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | /api/marcas/ | Listar marcas |
| POST | /api/marcas/ | Crear marca |
| GET | /api/marcas/{id}/ | Ver marca |
| PUT | /api/marcas/{id}/ | Editar marca |
| DELETE | /api/marcas/{id}/ | Eliminar marca |
| GET | /api/calzados/ | Listar calzados |
| POST | /api/calzados/ | Crear calzado |
| GET | /api/calzados/{id}/ | Ver calzado |
| PUT | /api/calzados/{id}/ | Editar calzado |
| DELETE | /api/calzados/{id}/ | Eliminar calzado |

---

## 🗃️ Modelos

**Marca:** id, nombre, país, logo (imagen), descripción  
**Calzado:** id, modelo, talla, precio, imagen, marca (FK), color, stock

---

## 📋 Requisitos previos
- Python 3.10+
- Node.js 18+
- pip
