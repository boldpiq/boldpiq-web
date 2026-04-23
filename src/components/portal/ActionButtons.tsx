'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const ACCENT = '#C4541A'
const ACCENT_HOVER = '#D4601F'
const MUTED = 'rgba(255,255,255,0.45)'
const BORDER = 'rgba(255,255,255,0.08)'

interface Props { token: string; currentStage: string; driveFolderUrl?: string | null }

export function ActionButtons({ token, currentStage, driveFolderUrl }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  if (currentStage === 'onboarding') {
    return (
      <div>
        <p style={{ fontSize: 13, color: MUTED, marginBottom: 16 }}>
          Your dedicated project folder has been created. All assets, files, and deliverables will be shared here throughout the project.
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
            <svg width="18" height="18" viewBox="0 0 87.3 78" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5L6.6 66.85z" fill="#0066DA"/>
              <path d="M43.65 25L29.9 1.2C28.55.4 27 0 25.45 0c-1.55 0-3.1.4-4.45 1.2L6.6 11.15c1.4.8 2.5 1.95 3.3 3.3L27.5 46.9 43.65 25z" fill="#00AC47"/>
              <path d="M59.8 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75L86.1 35.15c-.8-1.4-1.95-2.5-3.3-3.3L68.05 25H43.65L59.8 53l-13.75 23.8c1.35.8 2.9 1.2 4.45 1.2 1.55 0 3.1-.4 4.45-1.2h.95z" fill="#EA4335"/>
              <path d="M27.5 53l-13.75 23.8c1.35.8 2.9 1.2 4.45 1.2h51.3c1.55 0 3.1-.4 4.45-1.2L59.8 53H27.5z" fill="#00832D"/>
              <path d="M59.8 25L45.05 1.2C43.7.4 42.15 0 40.6 0H25.45C27 0 28.55.4 29.9 1.2L43.65 25H59.8z" fill="#2684FC"/>
              <path d="M43.65 25H59.8l13.75 23.8c1.35-.8 2.5-1.9 3.3-3.3L82.8 39c.8-1.4 1.2-2.95 1.2-4.5 0-1.55-.4-3.1-1.2-4.5L68.05 25 59.8 25z" fill="#FFBA00"/>
            </svg>
            Open Project Folder
          </a>
        ) : (
          <p style={{ fontSize: 13, color: MUTED }}>Your folder is being prepared — check back shortly.</p>
        )}
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
