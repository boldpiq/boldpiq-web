'use client'
import { useState, useRef, DragEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const ACCENT = '#C4541A'
const MUTED = 'rgba(255,255,255,0.45)'
const BORDER = 'rgba(255,255,255,0.08)'

const MAX_MB = 500
const ACCEPT = 'image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.txt'

interface UploadedFile { name: string; ok: boolean }
interface Props { token: string; folderUrl: string }

export function FileUpload({ token, folderUrl }: Props) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState<UploadedFile[]>([])
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const upload = async (files: FileList | File[]) => {
    const list = Array.from(files)
    if (!list.length) return
    setUploading(true)
    setError('')
    const results: UploadedFile[] = []
    for (const file of list) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder_url', folderUrl)
      try {
        const res = await fetch(`/api/portal/${token}/upload`, { method: 'POST', body: fd })
        results.push({ name: file.name, ok: res.ok })
        if (!res.ok) setError('One or more files failed to upload.')
      } catch {
        results.push({ name: file.name, ok: false })
        setError('Upload failed. Please try again.')
      }
    }
    setUploaded(prev => [...prev, ...results])
    setUploading(false)
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files.length) upload(e.dataTransfer.files)
  }

  return (
    <div style={{ marginTop: 20 }}>
      <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, marginBottom: 12 }}>
        Upload Files
      </p>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          border: `1px dashed ${dragging ? ACCENT : BORDER}`,
          borderRadius: 10,
          padding: '24px 20px',
          textAlign: 'center',
          cursor: uploading ? 'not-allowed' : 'pointer',
          background: dragging ? 'rgba(196,84,26,0.06)' : 'transparent',
          transition: 'border-color 0.15s ease, background 0.15s ease',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT}
          style={{ display: 'none' }}
          onChange={e => e.target.files && upload(e.target.files)}
          disabled={uploading}
        />
        {uploading ? (
          <p style={{ color: MUTED, fontSize: 14 }}>Uploading…</p>
        ) : (
          <>
            <p style={{ color: '#fff', fontSize: 14, marginBottom: 4 }}>
              Drop files here or <span style={{ color: ACCENT, textDecoration: 'underline' }}>browse</span>
            </p>
            <p style={{ color: MUTED, fontSize: 12 }}>Images, videos, PDFs and documents — up to 500 MB</p>
          </>
        )}
      </div>

      {/* Results */}
      <AnimatePresence>
        {uploaded.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 8,
              fontSize: 13,
              color: f.ok ? 'rgba(255,255,255,0.75)' : '#ef4444',
            }}
          >
            <span>{f.ok ? '✓' : '✗'}</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      {error && (
        <p style={{ marginTop: 8, fontSize: 12, color: '#ef4444' }}>{error}</p>
      )}
    </div>
  )
}
