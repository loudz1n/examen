import { useState, useEffect } from 'react'
import { getMarcas, getCalzados, createCalzado, updateCalzado, deleteCalzado, getMediaUrl } from '../api'
import Modal from '../components/Modal'

const TALLAS = ['35','36','37','38','39','40','41','42','43','44','45']
const EMPTY = { modelo: '', talla: '40', precio: '', color: 'Negro', stock: '0', marca: '', imagen: null }

export default function CalzadosPage() {
  const [calzados, setCalzados] = useState([])
  const [marcas, setMarcas] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [preview, setPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [filterMarca, setFilterMarca] = useState('')

  const load = async () => {
    try {
      const [cRes, mRes] = await Promise.all([getCalzados(filterMarca || undefined), getMarcas()])
      setCalzados(cRes.data)
      setMarcas(mRes.data)
    } catch {
      setError('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [filterMarca])

  const openCreate = () => {
    setForm({ ...EMPTY, marca: marcas[0]?.id || '' })
    setPreview(null)
    setEditId(null)
    setModal('form')
    setError('')
  }

  const openEdit = (c) => {
    setForm({
      modelo: c.modelo, talla: c.talla, precio: c.precio,
      color: c.color, stock: c.stock, marca: c.marca.id, imagen: null
    })
    setPreview(getMediaUrl(c.imagen))
    setEditId(c.id)
    setModal('form')
    setError('')
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setForm(f => ({ ...f, imagen: file }))
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!form.modelo || !form.precio || !form.marca) { setError('Modelo, precio y marca son obligatorios'); return }
    if (!editId && !form.imagen) { setError('La imagen es obligatoria'); return }
    setSaving(true)
    setError('')
    const fd = new FormData()
    fd.append('modelo', form.modelo)
    fd.append('talla', form.talla)
    fd.append('precio', form.precio)
    fd.append('color', form.color)
    fd.append('stock', form.stock)
    fd.append('marca', form.marca)
    if (form.imagen) fd.append('imagen', form.imagen)
    try {
      if (editId) await updateCalzado(editId, fd)
      else await createCalzado(fd)
      setModal(null)
      load()
    } catch (e) {
      setError(e.response?.data ? JSON.stringify(e.response.data) : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este calzado?')) return
    try {
      await deleteCalzado(id)
      load()
    } catch {
      alert('Error al eliminar')
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-5xl text-white tracking-wide">CALZADOS</h1>
          <p className="text-zinc-400 mt-1">{calzados.length} productos</p>
        </div>
        <div className="flex gap-3">
          <select
            value={filterMarca}
            onChange={e => setFilterMarca(e.target.value)}
            className="input-dark w-auto"
          >
            <option value="">Todas las marcas</option>
            {marcas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
          </select>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2 whitespace-nowrap">
            <span>+</span> Nuevo
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-zinc-500">Cargando...</div>
      ) : calzados.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">👟</p>
          <p className="text-zinc-400">No hay calzados. ¡Agrega el primero!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {calzados.map((c) => (
            <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden card-hover group">
              {/* Image */}
              <div className="h-48 bg-zinc-800 overflow-hidden relative">
                {c.imagen ? (
                  <img src={getMediaUrl(c.imagen)} alt={c.modelo} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="h-full flex items-center justify-center text-5xl opacity-20">👟</div>
                )}
                <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  T.{c.talla}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-xl text-white tracking-wide">{c.modelo}</h3>
                <p className="text-zinc-400 text-xs mt-0.5">{c.marca?.nombre} · {c.color}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-orange-400 font-semibold text-lg">S/ {parseFloat(c.precio).toFixed(2)}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${c.stock > 0 ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                    {c.stock > 0 ? `${c.stock} en stock` : 'Agotado'}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => openEdit(c)} className="btn-secondary text-sm flex-1">✏️ Editar</button>
                  <button onClick={() => handleDelete(c.id)} className="btn-danger">🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal === 'form' && (
        <Modal title={editId ? 'Editar Calzado' : 'Nuevo Calzado'} onClose={() => setModal(null)}>
          <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
            {error && <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">{error}</p>}

            <div>
              <label className="block text-zinc-300 text-sm mb-1.5">Modelo *</label>
              <input className="input-dark" value={form.modelo} onChange={e => setForm(f => ({ ...f, modelo: e.target.value }))} placeholder="Air Max, Superstar..." />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-300 text-sm mb-1.5">Talla *</label>
                <select className="input-dark" value={form.talla} onChange={e => setForm(f => ({ ...f, talla: e.target.value }))}>
                  {TALLAS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-zinc-300 text-sm mb-1.5">Precio (S/) *</label>
                <input type="number" step="0.01" min="0" className="input-dark" value={form.precio} onChange={e => setForm(f => ({ ...f, precio: e.target.value }))} placeholder="199.90" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-300 text-sm mb-1.5">Color</label>
                <input className="input-dark" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} placeholder="Negro" />
              </div>
              <div>
                <label className="block text-zinc-300 text-sm mb-1.5">Stock</label>
                <input type="number" min="0" className="input-dark" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 text-sm mb-1.5">Marca *</label>
              <select className="input-dark" value={form.marca} onChange={e => setForm(f => ({ ...f, marca: e.target.value }))}>
                <option value="">Seleccionar marca...</option>
                {marcas.map(m => <option key={m.id} value={m.id}>{m.nombre} ({m.pais})</option>)}
              </select>
            </div>

            <div>
              <label className="block text-zinc-300 text-sm mb-1.5">Imagen {!editId && '*'}</label>
              <input type="file" accept="image/*" onChange={handleFile} className="input-dark text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-orange-500 file:text-white file:text-sm cursor-pointer" />
              {preview && <img src={preview} alt="preview" className="mt-3 h-32 w-full object-contain rounded-lg border border-zinc-700" />}
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setModal(null)} className="btn-secondary flex-1">Cancelar</button>
              <button onClick={handleSubmit} disabled={saving} className="btn-primary flex-1">
                {saving ? 'Guardando...' : editId ? 'Actualizar' : 'Crear Calzado'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
