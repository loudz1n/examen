import axios from 'axios'

// URL actualizada a tu despliegue en PythonAnywhere
const BASE = 'https://junior22333w.pythonanywhere.com'

const api = axios.create({ baseURL: BASE })

// ── MARCAS ──────────────────────────────────────────
export const getMarcas = () => api.get('/api/marcas/')
export const getMarca = (id) => api.get(`/api/marcas/${id}/`)
export const createMarca = (data) => api.post('/api/marcas/', data, { headers: { 'Content-Type': 'multipart/form-data' } })
export const updateMarca = (id, data) => api.put(`/api/marcas/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
export const deleteMarca = (id) => api.delete(`/api/marcas/${id}/`)

// ── CALZADOS ────────────────────────────────────────
export const getCalzados = (marcaId) => {
  const params = marcaId ? { marca: marcaId } : {}
  return api.get('/api/calzados/', { params })
}
export const getCalzado = (id) => api.get(`/api/calzados/${id}/`)
export const createCalzado = (data) => api.post('/api/calzados/', data, { headers: { 'Content-Type': 'multipart/form-data' } })
export const updateCalzado = (id, data) => api.put(`/api/calzados/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
export const deleteCalzado = (id) => api.delete(`/api/calzados/${id}/`)

export const getMediaUrl = (path) => path ? (path.startsWith('http') ? path : `${BASE}${path}`) : null