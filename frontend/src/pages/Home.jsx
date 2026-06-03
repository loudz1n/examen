import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-8">
      {/* Hero */}
      <div className="space-y-4">
        <p className="text-orange-500 font-medium tracking-widest uppercase text-sm">Bienvenido a</p>
        <h1 className="font-display text-8xl md:text-9xl text-white leading-none tracking-widest">
          SOLE<span className="text-orange-500">MARK</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-md mx-auto">
          Gestiona tu catálogo de calzado y marcas con un sistema moderno y completo.
        </p>
      </div>

      {/* Cards CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-4">
        <Link
          to="/marcas"
          className="group bg-zinc-900 border border-zinc-800 hover:border-orange-500 rounded-2xl p-8 text-left transition-all card-hover"
        >
          <div className="text-4xl mb-4">🏷️</div>
          <h3 className="font-display text-3xl text-white tracking-wide mb-2">MARCAS</h3>
          <p className="text-zinc-400 text-sm">Administra las marcas: Nike, Adidas, Puma y más.</p>
          <span className="inline-block mt-4 text-orange-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
            Ver marcas →
          </span>
        </Link>

        <Link
          to="/calzados"
          className="group bg-zinc-900 border border-zinc-800 hover:border-orange-500 rounded-2xl p-8 text-left transition-all card-hover"
        >
          <div className="text-4xl mb-4">👟</div>
          <h3 className="font-display text-3xl text-white tracking-wide mb-2">CALZADOS</h3>
          <p className="text-zinc-400 text-sm">Gestiona modelos, tallas, precios e imágenes.</p>
          <span className="inline-block mt-4 text-orange-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
            Ver calzados →
          </span>
        </Link>
      </div>

      {/* Stats row */}
      <div className="flex gap-12 mt-4 text-center">
        <div>
          <p className="font-display text-4xl text-orange-500">CRUD</p>
          <p className="text-zinc-500 text-xs uppercase tracking-widest">Completo</p>
        </div>
        <div className="w-px bg-zinc-800" />
        <div>
          <p className="font-display text-4xl text-orange-500">REST</p>
          <p className="text-zinc-500 text-xs uppercase tracking-widest">API Django</p>
        </div>
        <div className="w-px bg-zinc-800" />
        <div>
          <p className="font-display text-4xl text-orange-500">2</p>
          <p className="text-zinc-500 text-xs uppercase tracking-widest">Tablas</p>
        </div>
      </div>
    </div>
  )
}
