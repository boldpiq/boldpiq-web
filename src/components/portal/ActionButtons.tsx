'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

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
        <p style={{ fontSize: 13, color: MUTED, marginBottom: 16 }}>
          {firstName ? `${firstName}, your` : 'Your'} dedicated project folder has been created. All assets, files, and deliverables will be shared here throughout the project.
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
            <svg width="18" height="16" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
              <path fill="#0066da" d="M6.6 66.85 3.1 72.9c-.8 1.4-.5 3.1.6 4.2 1.1 1.1 2.7 1.4 4.1.6l3.5-2L6.6 66.85z"/>
              <path fill="#00ac47" d="M43.65 24.9 29.9 1.2C29.1-.2 27.3-.4 26.1.5L6.6 11.15l20.85 36.1z"/>
              <path fill="#ea4335" d="M80.7 11.15 61.2.5c-1.2-.9-3-.7-3.8.7L43.65 24.9l16.25 22.35 20.85-36.1z"/>
              <path fill="#00832d" d="M27.45 47.25 6.6 11.15 0 22.75c-.8 1.4-.8 3.1 0 4.5L20.85 62.5l6.6-15.25z"/>
              <path fill="#2684fc" d="M59.85 47.25 53.25 62.5l20.85-35.25c.8-1.4.8-3.1 0-4.5L66.45 11.15z"/>
              <path fill="#ffba00" d="M43.65 24.9 27.45 47.25l16.2 15.25 16.2-15.25z"/>
              <path fill="#0066da" d="M43.65 62.5 20.85 62.5 6.6 66.85l37.05 10.85 37.05-10.85-13.2-4.35z"/>
              <path fill="#00ac47" d="M20.85 62.5 6.6 66.85l-.95 1.65c-.8 1.4-.5 3.1.6 4.2l14.6-10.1z"/>
              <path fill="#ea4335" d="M66.45 62.5l14.6 10.1c1.1-1.1 1.4-2.8.6-4.2l-.95-1.65z"/>
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
