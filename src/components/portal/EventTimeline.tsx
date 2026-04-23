'use client'
import { motion } from 'motion/react'

const ACCENT = '#C4541A'
const MUTED = 'rgba(255,255,255,0.45)'
const BORDER = 'rgba(255,255,255,0.08)'
const SURFACE = 'rgba(255,255,255,0.04)'

const ICONS: Record<string, string> = {
  check: '✓',
  clock: '·',
  star: '★',
  alert: '!',
  celebration: '🎉',
}

interface PortalEvent {
  id: string
  occurred_at: string
  stage: string
  display_label: string
  display_message: string | null
  is_milestone: boolean
  icon: string
}

interface Props { events: PortalEvent[] }

export function EventTimeline({ events }: Props) {
  if (events.length === 0) {
    return <p style={{ color: MUTED, fontSize: 16 }}>No updates yet.</p>
  }

  return (
    <ol style={{ listStyle: 'none', padding: 0 }}>
      {events.map((ev, i) => (
        <motion.li
          key={ev.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          style={{
            display: 'flex',
            gap: 16,
            padding: '14px 0',
            borderBottom: `1px solid ${BORDER}`,
          }}
        >
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            flexShrink: 0,
            // i === 0 = current stage (in progress) → hollow with accent ring
            // i > 0   = completed stage            → filled accent
            background: ev.is_milestone ? ACCENT : SURFACE,
            border: `1px solid ${ev.is_milestone ? ACCENT : BORDER}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            color: ev.is_milestone ? '#fff' : MUTED,
          }}>
            {ICONS[ev.icon] ?? '·'}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 2 }}>
              {ev.display_label}
            </div>
            {ev.display_message && (
              <div style={{ fontSize: 15, color: MUTED }}>
                {ev.display_message}
              </div>
            )}
            <div style={{ fontSize: 13, color: MUTED, marginTop: 4, letterSpacing: '0.05em' }}>
              {new Date(ev.occurred_at).toLocaleDateString('en-ZA', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}
