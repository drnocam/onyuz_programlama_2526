import { useEffect, useMemo, useState } from 'react'
import './App.css'

type FileEntry = {
  name: string
  path: string
  isDirectory: boolean
  size: number
  modifiedAt: number
}

type SpecialPaths = {
  home: string
  desktop: string
  documents: string
  downloads: string
  pictures: string
  music: string
  videos: string
}

const quickAccessItems = [
  { label: 'Ana dizin', key: 'home' as const },
  { label: 'Masaüstü', key: 'desktop' as const },
  { label: 'Belgeler', key: 'documents' as const },
  { label: 'İndirilenler', key: 'downloads' as const },
  { label: 'Resimler', key: 'pictures' as const },
]

const imageExtensions = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg', 'ico'])

const electronAPI = window.electronAPI

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [specialPaths, setSpecialPaths] = useState<SpecialPaths | null>(null)
  const [currentPath, setCurrentPath] = useState('')
  const [entries, setEntries] = useState<FileEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    let cancelled = false

    const initialize = async () => {
      try {
        if (!electronAPI?.getSpecialPaths || !electronAPI?.readDirectory || !electronAPI?.pickDirectory || !electronAPI?.openPath) {
          throw new Error('Electron API yüklenemedi.')
        }

        const resolvedSpecialPaths = await electronAPI.getSpecialPaths()

        if (cancelled) {
          return
        }

        setSpecialPaths(resolvedSpecialPaths)
        await loadDirectory(resolvedSpecialPaths.home)
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Başlangıç dizini yüklenemedi.')
        }
      }
    }

    void initialize()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!currentPath) {
      return
    }

    let cancelled = false

    const refresh = async () => {
      try {
        setLoading(true)
        setError('')
        if (!electronAPI?.readDirectory) {
          throw new Error('Klasör okuma API si yüklenemedi.')
        }

        const directoryEntries = await electronAPI.readDirectory(currentPath)

        if (!cancelled) {
          setEntries(directoryEntries)
        }
      } catch (loadError) {
        if (!cancelled) {
          setEntries([])
          setError(loadError instanceof Error ? loadError.message : 'Dizin okunamadı.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void refresh()

    return () => {
      cancelled = true
    }
  }, [currentPath])

  async function loadDirectory(targetPath: string) {
    setCurrentPath(targetPath)
  }

  async function openEntry(entry: FileEntry) {
    if (entry.isDirectory) {
      await loadDirectory(entry.path)
      return
    }

    if (!electronAPI?.openPath) {
      setError('Dosya açma API si yüklenemedi.')
      return
    }

    await electronAPI.openPath(entry.path)
  }

  async function chooseDirectory() {
    if (!electronAPI?.pickDirectory) {
      setError('Klasör seçme API si yüklenemedi.')
      return
    }

    const selectedPath = await electronAPI.pickDirectory()

    if (selectedPath) {
      await loadDirectory(selectedPath)
    }
  }

  const visibleEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return entries
    }

    return entries.filter((entry) =>
      [entry.name, entry.path, entry.isDirectory ? 'klasör' : 'dosya', formatBytes(entry.size)].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    )
  }, [entries, query])

  const goUp = () => {
    const parentPath = getParentPath(currentPath)

    if (parentPath && parentPath !== currentPath) {
      void loadDirectory(parentPath)
    }
  }

  const goHome = () => {
    if (specialPaths) {
      void loadDirectory(specialPaths.home)
    }
  }

  const selectQuickPath = (key: keyof SpecialPaths) => {
    const selectedPath = specialPaths?.[key]

    if (selectedPath) {
      void loadDirectory(selectedPath)
    }
  }

  return (
    <div className="app-shell">
      <div className="explorer-window drawer lg:drawer-open">
        <input
          id="sidebar-toggle"
          aria-label="Kenar çubuğunu aç kapa"
          className="drawer-toggle"
          type="checkbox"
          checked={sidebarOpen}
          onChange={(event) => setSidebarOpen(event.target.checked)}
        />

        <div className="drawer-content flex flex-col">
          <header className="shell-header">
            <div className="flex items-center gap-3">
              <label htmlFor="sidebar-toggle" className="btn btn-ghost btn-sm drawer-button lg:hidden">
                <LayoutSidebarIcon />
              </label>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">File Explorer</p>
                <h1 className="text-lg font-semibold text-slate-900">Gerçek Dosya Tarayıcısı</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button type="button" className="btn btn-sm btn-primary text-white" onClick={chooseDirectory}>
                Klasör aç
              </button>
            </div>
          </header>

          <main className="shell-main">
            <section className="center-panel">
              <DirectoryPanel
                currentPath={currentPath}
                error={error}
                loading={loading}
                onGoHome={goHome}
                onGoUp={goUp}
                onNavigateTo={loadDirectory}
                onOpenEntry={openEntry}
                onOpenQuickPath={selectQuickPath}
                onQueryChange={setQuery}
                query={query}
                results={visibleEntries}
                specialPaths={specialPaths}
              />
            </section>
          </main>
        </div>

        <aside className="drawer-side">
          <label htmlFor="sidebar-toggle" className="drawer-overlay" aria-label="Kapat" />
          <div className="sidebar-panel min-h-full w-72 bg-slate-50/95 p-4 text-slate-700 backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 shadow-sm">
                <FolderOpenIcon />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Quick Access
                </p>
                <h2 className="text-base font-semibold text-slate-900">Gezinti</h2>
              </div>
            </div>

            <div className="space-y-3">
              <div className="collapse collapse-arrow rounded-2xl border border-slate-200 bg-white/80 shadow-sm">
                <input defaultChecked type="radio" name="sidebar-groups" />
                <div className="collapse-title text-sm font-semibold text-slate-900">Bu bilgisayar</div>
                <div className="collapse-content pt-0">
                  <ul className="menu rounded-box gap-1 p-0 text-sm">
                    {quickAccessItems.map((item) => (
                      <li key={item.label}>
                        <button
                          type="button"
                          className="flex items-center justify-between rounded-xl px-3 py-2 text-left hover:bg-sky-50"
                          onClick={() => selectQuickPath(item.key)}
                        >
                          <span>{item.label}</span>
                          <ChevronRightIcon className="icon-14 text-slate-400" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="collapse collapse-arrow rounded-2xl border border-slate-200 bg-white/80 shadow-sm">
                <input type="radio" name="sidebar-groups" />
                <div className="collapse-title text-sm font-semibold text-slate-900">Durum</div>
                <div className="collapse-content pt-0">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600">
                    {currentPath || 'Bir klasör seçin.'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-linear-to-br from-slate-900 to-slate-700 p-4 text-white shadow-lg">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-300">Durum</p>
              <p className="mt-2 text-sm font-medium">Klasörler ana süreçte okunuyor, dosyalar varsayılan uygulamayla açılıyor.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default App

function DirectoryPanel({
  currentPath,
  error,
  loading,
  onGoHome,
  onGoUp,
  onNavigateTo,
  onOpenEntry,
  onOpenQuickPath,
  onQueryChange,
  query,
  results,
  specialPaths,
}: {
  currentPath: string
  error: string
  loading: boolean
  onGoHome: () => void
  onGoUp: () => void
  onNavigateTo: (folderPath: string) => void
  onOpenEntry: (entry: FileEntry) => void
  onOpenQuickPath: (key: keyof SpecialPaths) => void
  onQueryChange: (value: string) => void
  query: string
  results: FileEntry[]
  specialPaths: SpecialPaths | null
}) {
  const breadcrumbSegments = currentPath ? currentPath.split('/').filter(Boolean) : []

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white/95 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.14)] backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Mevcut dizin</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <button type="button" className="inline-flex items-center gap-2 hover:text-slate-900" onClick={onGoHome}>
              <HouseIcon className="icon-14" />
              <span>Home</span>
            </button>
            {breadcrumbSegments.map((segment, index) => {
              const breadcrumbPath = `/${breadcrumbSegments.slice(0, index + 1).join('/')}`

              return (
                <span key={`${segment}-${index}`} className="inline-flex items-center gap-2">
                  <ChevronRightIcon className="icon-12 text-slate-300" />
                  <button
                    type="button"
                    className={index === breadcrumbSegments.length - 1 ? 'font-semibold text-slate-900' : ''}
                    onClick={() => onNavigateTo(breadcrumbPath)}
                  >
                    {segment}
                  </button>
                </span>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-circle btn-sm border-slate-200 bg-white text-slate-700 shadow-sm"
            onClick={onGoHome}
            aria-label="Ana dizine dön"
          >
            <HouseIcon />
          </button>
          <button
            type="button"
            className="btn btn-circle btn-sm border-slate-200 bg-white text-slate-700 shadow-sm"
            onClick={onGoUp}
            aria-label="Üst dizine çık"
          >
            <ChevronUpIcon />
          </button>
          <button
            type="button"
            className="btn btn-circle btn-sm border-slate-200 bg-white text-slate-700 shadow-sm"
            onClick={() => onOpenQuickPath('documents')}
            aria-label="Belgeler klasörüne git"
          >
            <FolderOpenIcon />
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-sm">
              <SearchIcon />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Arama</p>
              <p className="text-sm text-slate-500">Geçerli dizin içindeki dosya ve klasörlerde arama yapar.</p>
            </div>
          </div>

          <label className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <SearchIcon className="icon-16 text-slate-400" />
            <input
              aria-label="Dizinlerde ara"
              className="w-full border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              placeholder="Dosya, klasör veya etiket ara"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
            />
          </label>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-sky-50 via-white to-rose-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Hızlı yol</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {specialPaths
              ? quickAccessItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="badge badge-lg border-0 bg-white text-slate-700 shadow-sm hover:bg-sky-50"
                    onClick={() => onOpenQuickPath(item.key)}
                  >
                    {item.label}
                  </button>
                ))
              : null}
          </div>
        </div>
      </div>

      {error ? (
        <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
          Dizin okunuyor...
        </div>
      ) : null}

      <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50/80 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Liste</p>
            <h2 className="text-base font-semibold text-slate-900">Dizin içeriği</h2>
          </div>
          <span className="badge badge-neutral badge-outline">{results.length} öğe</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((entry) => (
            <button
              key={entry.path}
              type="button"
              className="rounded-2xl border border-white/80 bg-white p-4 text-left shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
              onDoubleClick={() => onOpenEntry(entry)}
              onClick={() => (entry.isDirectory ? onNavigateTo(entry.path) : undefined)}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  {entry.isDirectory ? <FolderOpenIcon /> : isImageFile(entry.name) ? <ImageIcon /> : <FileIcon />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-slate-900">{entry.name}</h3>
                    <span className="badge badge-sm badge-ghost border-slate-200 text-slate-500">
                      {entry.isDirectory ? 'klasör' : 'dosya'}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-slate-500">{entry.path}</p>
                  <p className="mt-2 text-xs font-medium text-slate-400">
                    {entry.isDirectory ? 'Klasör' : formatBytes(entry.size)} · {formatDate(entry.modifiedAt)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function getParentPath(currentPath: string) {
  if (!currentPath || currentPath === '/') {
    return currentPath
  }

  const normalizedPath = currentPath.endsWith('/') && currentPath.length > 1 ? currentPath.slice(0, -1) : currentPath
  const parentPath = normalizedPath.slice(0, normalizedPath.lastIndexOf('/'))

  return parentPath || '/'
}

function isImageFile(fileName: string) {
  const extension = fileName.split('.').pop()?.toLowerCase()

  return Boolean(extension && imageExtensions.has(extension))
}

function formatBytes(byteSize: number) {
  if (byteSize < 1024) {
    return `${byteSize} B`
  }

  const units = ['KB', 'MB', 'GB', 'TB']
  let size = byteSize / 1024
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex += 1
  }

  return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[unitIndex]}`
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp))
}

function HouseIcon({ className = 'icon-16' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
    </svg>
  )
}

function LayoutSidebarIcon({ className = 'icon-16' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" />
      <path d="M13 4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" />
    </svg>
  )
}

function FolderOpenIcon({ className = 'icon-16' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.516-.56-2.07-1.184C6.424 3.353 5.92 3 5.264 3H2.5a.5.5 0 0 0-.5.5zM1.91 7l.637 5.105a1.5 1.5 0 0 0 1.489 1.395h9.928a1.5 1.5 0 0 0 1.489-1.395L15.09 7z" />
    </svg>
  )
}

function ChevronUpIcon({ className = 'icon-16' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
    </svg>
  )
}

function ChevronRightIcon({ className = 'icon-16' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
    </svg>
  )
}

function SearchIcon({ className = 'icon-16' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
    </svg>
  )
}

function FileIcon({ className = 'icon-16' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4.5V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5zM9 3.5V7h3.5z" />
    </svg>
  )
}

function ImageIcon({ className = 'icon-16' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm-2.5 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M3 12l3-4 2.5 3 2-2.5L13 12z" />
    </svg>
  )
}
