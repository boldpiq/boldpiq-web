'use client'
import { useState, useRef, DragEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const ACCENT = '#C4541A'
const MUTED = 'rgba(255,255,255,0.45)'
const BORDER = 'rgba(255,255,255,0.08)'

const ACCEPT = 'image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.txt,.csv,.mp3,.mp4,.mov,.avi,.mkv,.heic,.heif,.raw'

interface UploadedFile { name: string; ok: boolean }
interface Props { token: string; folderUrl: string }

export function FileUpload({ token, folderUrl }: Props) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentFile, setCurrentFile] = useState('')
  const [uploaded, setUploaded] = useState<UploadedFile[]>([])
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFileDirect = (file: File, uploadUrl: string): Promise<void> =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.upload.addEventListener('progress', e => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100))
      })
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve()
        else reject(new Error(`Drive returned ${xhr.status}: ${xhr.responseText.slice(0, 200)}`))
      })
      xhr.addEventListener('error', () => reject(new Error('Network error — check browser console for CORS details')))
      xhr.open('PUT', uploadUrl)
      xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream')
      // Tell Drive this is the complete file (final chunk), required for files under 256 KB
      if (file.size > 0) {
        xhr.setRequestHeader('Content-Range', `bytes 0-${file.size - 1}/${file.size}`)
      }
      xhr.send(file)
    })

  const upload = async (files: FileList | File[]) => {
    const list = Array.from(files)
    if (!list.length) return
    setUploading(true)
    setError('')
    const results: UploadedFile[] = []

    for (const file of list) {
      setCurrentFile(file.name)
      setProgress(0)
      try {
        // Step 1: Get a Google Drive resumable upload URL (only metadata goes through Vercel)
        const initRes = await fetch(`/api/portal/${token}/upload-url`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            fileType: file.type || 'application/octet-stream',
            fileSize: file.size,
            folderUrl,
          }),
        })
        if (!initRes.ok) {
          const errBody = await initRes.text().catch(() => '')
          throw new Error(`Init failed (${initRes.status}): ${errBody.slice(0, 120)}`)
        }
        const { uploadUrl } = await initRes.json()
        if (!uploadUrl) throw new Error('No upload URL returned from server')

        // Step 2: Upload directly to Google Drive — bypasses Vercel entirely
        await uploadFileDirect(file, uploadUrl)

        // Step 3: Log the event (fire-and-forget)
        fetch(`/api/portal/${token}/upload-complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName: file.name }),
        }).catch(() => {})

        results.push({ name: file.name, ok: true })
      } catch (err) {
        results.push({ name: file.name, ok: false })
        setError(err instanceof Error ? err.message : 'Upload failed. Please try again.')
      }
    }

    setUploaded(prev => [...prev, ...results])
    setUploading(false)
    setCurrentFile('')
    setProgress(0)
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files.length) upload(e.dataTransfer.files)
  }

  return (
    <div>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); if (!uploading) setDragging(true) }}
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
          <div>
            <p style={{ color: MUTED, fontSize: 13, marginBottom: 10 }}>
              Uploading{currentFile ? ` "${currentFile}"` : '…'} — {progress}%
            </p>
            <div style={{ width: '100%', height: 3, background: BORDER, borderRadius: 2 }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: ACCENT,
                borderRadius: 2,
                transition: 'width 0.1s linear',
              }} />
            </div>
          </div>
        ) : (
          <>
            <p style={{ color: '#fff', fontSize: 14, marginBottom: 4 }}>
              Drop files here or <span style={{ color: ACCENT, textDecoration: 'underline' }}>browse</span>
            </p>
            <p style={{ color: MUTED, fontSize: 12 }}>Images, videos, PDFs and documents — up to 5 TB</p>
          </>
        )}
      </div>

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
