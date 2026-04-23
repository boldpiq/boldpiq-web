'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FileUpload } from './FileUpload'

const ACCENT = '#C4541A'
const ACCENT_HOVER = '#D4601F'
const MUTED = 'rgba(255,255,255,0.45)'
const BORDER = 'rgba(255,255,255,0.08)'

interface Props { token: string; currentStage: string; driveFolderUrl?: string | null; firstName?: string }

export function ActionButtons({ token, currentStage, driveFolderUrl, firstName }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  if (currentStage === 'onboarding') {
    return (
      <div>
        <p style={{ fontSize: 14, color: MUTED, marginBottom: 28, lineHeight: 1.6 }}>
          {firstName ? `Welcome aboard, ${firstName}.` : 'Welcome aboard.'} Your project is now set up — use the sections below to access your folder and share any files with us.
        </p>

        {/* ── Project Folder ── */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, marginBottom: 8 }}>
            Project Folder
          </p>
          <p style={{ fontSize: 13, color: MUTED, marginBottom: 14, lineHeight: 1.5 }}>
            All deliverables, drafts, and shared files will appear here throughout the project.
          </p>
          {driveFolderUrl ? (
            <a
              href={driveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '11px 22px',
                background: 'rgba(255,255,255,0.06)',
                border: `1px solid ${BORDER}`,
                borderRadius: 8,
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: 14,
                transition: 'border-color 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(196,84,26,0.5)'
                el.style.background = 'rgba(196,84,26,0.08)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = BORDER
                el.style.background = 'rgba(255,255,255,0.06)'
              }}
            >
              Open in Google Drive
            </a>
          ) : (
            <p style={{ fontSize: 13, color: MUTED }}>Your folder is being prepared — check back shortly.</p>
          )}
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: BORDER, marginBottom: 28 }} />

        {/* ── Share Files ── */}
        <div>
          <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, marginBottom: 8 }}>
            Share Your Assets
          </p>
          <p style={{ fontSize: 13, color: MUTED, marginBottom: 14, lineHeight: 1.5 }}>
            Upload any images, videos, brand files, or references you'd like us to work with.
          </p>
          {driveFolderUrl
            ? <FileUpload token={token} folderUrl={driveFolderUrl} />
            : <p style={{ fontSize: 13, color: MUTED }}>Available once your folder is ready.</p>
          }
        </div>
      </div>
    )
  }

  if (currentStage !== 'client_qa') return null

  const submit = async (action: 'approve' | 'revision') => {
    setStatus('loading')
    try {
      const res = await fetch(`/api/portal/${token}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
      setMessage(
        action === 'approve'
          ? "Project approved — we'll send your final invoice shortly."
          : "Revision request received. We'll be in touch within 24 hours."
      )
    } catch {
      setStatus('error')
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'done' ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '16px 20px',
            background: 'rgba(196,84,26,0.12)',
            border: '1px solid rgba(196,84,26,0.3)',
            borderRadius: 12,
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {message}
        </motion.div>
      ) : (
        <motion.div key="buttons" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <p style={{ fontSize: 13, color: MUTED, marginBottom: 16 }}>
            Your project is ready for review. Please approve or request changes below.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              disabled={status === 'loading'}
              onClick={() => submit('approve')}
              style={{
                padding: '11px 24px',
                background: status === 'loading' ? 'rgba(196,84,26,0.5)' : ACCENT,
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: 14,
                fontFamily: 'var(--font-geist), system-ui, sans-serif',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => {
                if (status !== 'loading') (e.target as HTMLButtonElement).style.background = ACCENT_HOVER
              }}
              onMouseLeave={e => {
                if (status !== 'loading') (e.target as HTMLButtonElement).style.background = ACCENT
              }}
            >
              {status === 'loading' ? 'Submitting…' : 'Approve Project ✓'}
            </button>
            <button
              disabled={status === 'loading'}
              onClick={() => submit('revision')}
              style={{
                padding: '11px 24px',
                background: 'transparent',
                color: status === 'loading' ? MUTED : '#fff',
                border: `1px solid ${BORDER}`,
                borderRadius: 8,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                fontWeight: 500,
                fontSize: 14,
                fontFamily: 'var(--font-geist), system-ui, sans-serif',
                transition: 'border-color 0.15s ease',
              }}
              onMouseEnter={e => {
                if (status !== 'loading') (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)'
              }}
              onMouseLeave={e => {
                if (status !== 'loading') (e.target as HTMLButtonElement).style.borderColor = BORDER
              }}
            >
              Request Revision
            </button>
          </div>
          {status === 'error' && (
            <p style={{ marginTop: 10, fontSize: 13, color: '#ef4444' }}>
              Something went wrong. Please refresh and try again.
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
