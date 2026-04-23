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
            <svg width="18" height="18" viewBox="0 0 1443.061 1249.993" xmlns="http://www.w3.org/2000/svg">
              <path d="M240.525 1249.993l240.492-416.664H1443.061l-240.492 416.664z" fill="#3777e3"/>
              <path d="M962.055 833.329L721.528 416.664 481 833.329z" fill="#ffcf63"/>
              <path d="M240.525 1249.993L481 833.329 0 833.329z" fill="#11a861"/>
              <path d="M721.528 416.664L481 0 0 833.329l481 0z" fill="#11a861"/>
              <path d="M721.528 416.664L962.055 0 481 0z" fill="#ffcf63"/>
              <path d="M1443.061 833.329L962.055 0l-240.527 416.664 481.028 416.665z" fill="#e53929"/>
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
