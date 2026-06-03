import { useState, useEffect } from 'react'
import { getMarcas, createMarca, updateMarca, deleteMarca, getMediaUrl } from '../api'
import Modal from '../components/Modal'

const EMPTY = { nombre: '', pais: '', descripcion: '', logo: null }

export default function MarcasPage() {
  const [marcas, setMarcas] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | 'create' | 'edit'
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [preview, setPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const { data } = await getMarcas()
      setMarcas(data)
    } catch {
      setError('Error al cargar marcas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openCreate = () => {
    setForm(EMPTY)
    setPreview(null)
    setEditId(null)
    setModal('form')
    setError('')
  }

  const openEdit = (m) => {
    setForm({ nombre: m.nombre, pais: m.pais, descripcion: m.descripcion, logo: null })
    setPreview(getMediaUrl(m.logo))
    setEditId(m.id)
    setModal('form')
    setError('')
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setForm(f => ({ ...f, logo: file }))
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!form.nombre || !form.pais) { setError('Nombre y país son obligatorios'); return }
    setSaving(true)
    setError('')
    const fd = new FormData()
    fd.append('nombre', form.nombre)
    fd.append('pais', form.pais)
    fd.append('descripcion', form.descripcion)
    if (form.logo) fd.append('logo', form.logo)
    try {
      if (editId) await updateMarca(editId, fd)
      else await createMarca(fd)
      setModal(null)
      load()
    } catch (e) {
      setError(e.response?.data ? JSON.stringify(e.response.data) : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta marca?')) return
    try {
      await deleteMarca(id)
      load()
    } catch {
      alert('Error al eliminar')
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-5xl text-white tracking-wide">MARCAS</h1>
          <p className="text-zinc-400 mt-1">{marcas.length} marcas registradas</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <span className="text-lg">+</span> Nueva Marca
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-zinc-500">Cargando...</div>
      ) : marcas.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🏷️</p>
          <p className="text-zinc-400">No hay marcas. ¡Crea la primera!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {marcas.map((m) => (
            <div key={m.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden card-hover">
              {/* Logo */}
              <div className="h-40 bg-zinc-800 flex items-center justify-center">
                {m.logo ? (
                  <img src={getMediaUrl(m.logo)} alt={m.nombre} className="h-full w-full object-contain p-4" />
                ) : (
                  <span className="text-5xl opacity-30">🏷️</span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-white tracking-wide">{m.nombre}</h3>
                    <p className="text-orange-400 text-sm mt-0.5">🌍 {m.pais}</p>
                  </div>
                  <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded-full">
                    {m.calzados_count} modelos
                  </span>
                </div>
                {m.descripcion && (
                  <p className="text-zinc-400 text-sm mt-3 line-clamp-2">{m.descripcion}</p>
                )}
                <div className="flex gap-2 mt-4">
                  <button onClick={() => openEdit(m)} className="btn-secondary text-sm flex-1">✏️ Editar</button>
                  <button onClick={() => handleDelete(m.id)} className="btn-danger">🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal === 'form' && (
        <Modal title={editId ? 'Editar Marca' : 'Nueva Marca'} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {error && <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">{error}</p>}

            <div>
              <label className="block text-zinc-300 text-sm mb-1.5">Nombre *</label>
              <input className="input-dark" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} placeholder="Nike, Adidas..." />
            </div>
            <div>
              <label className="block text-zinc-300 text-sm mb-1.5">País *</label>
              <input className="input-dark" value={form.pais} onChange={e => setForm(f => ({ ...f, pais: e.target.value }))} placeholder="EE.UU., Alemania..." />
            </div>
            <div>
              <label className="block text-zinc-300 text-sm mb-1.5">Descripción</label>
              <textarea className="input-dark resize-none h-20" value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} placeholder="Descripción breve..." />
            </div>
            <div>
              <label className="block text-zinc-300 text-sm mb-1.5">Logo</label>
              <input type="file" accept="image/*" onChange={handleFile} className="input-dark text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-orange-500 file:text-white file:text-sm cursor-pointer" />
              {preview && <img src={preview} alt="preview" className="mt-3 h-24 object-contain rounded-lg border border-zinc-700" />}
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setModal(null)} className="btn-secondary flex-1">Cancelar</button>
              <button onClick={handleSubmit} disabled={saving} className="btn-primary flex-1">
                {saving ? 'Guardando...' : editId ? 'Actualizar' : 'Crear Marca'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
