'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const STAGES = [
  { key: 'discovery',               label: 'Discovery' },
  { key: 'estimation_sent',         label: 'Proposal' },
  { key: 'estimation_accepted',     label: 'Accepted' },
  { key: 'deposit_invoice_sent',    label: 'Deposit Invoice' },
  { key: 'deposit_paid',            label: 'Deposit Paid' },
  { key: 'contract_sent',           label: 'Contract' },
  { key: 'contract_signed',         label: 'Signed' },
  { key: 'onboarding',              label: 'Onboarding' },
  { key: 'delivery_active',         label: 'In Development' },
  { key: 'internal_qa',             label: 'QA' },
  { key: 'client_qa',               label: 'Your Review' },
  { key: 'revision',                label: 'Revisions' },
  { key: 'settlement_invoice_sent', label: 'Final Invoice' },
  { key: 'settlement_paid',         label: 'Final Paid' },
  { key: 'handover',                label: 'Handover' },
  { key: 'completed',               label: 'Complete' },
]

const ACCENT = '#C4541A'
const MUTED = 'rgba(255,255,255,0.45)'
const BORDER = 'rgba(255,255,255,0.08)'
const SURFACE = 'rgba(255,255,255,0.04)'

interface Props { currentStage: string }

export function StageProgress({ currentStage }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const idx = STAGES.findIndex(s => s.key === currentStage)
  const pct = idx < 0 ? 0 : Math.round((idx / (STAGES.length - 1)) * 100)

  const displayIdx = hoveredIdx ?? idx
  const displayLabel = STAGES[displayIdx]?.label ?? ''
  const displayPct = hoveredIdx !== null
    ? Math.round((hoveredIdx / (STAGES.length - 1)) * 100)
    : pct

  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={displayLabel}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: hoveredIdx !== null ? '#fff' : MUTED }}
          >
            {displayLabel || 'Progress'}
          </motion.span>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.span
            key={displayPct}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ fontSize: 12, fontWeight: 600, color: ACCENT }}
          >
            {displayPct}%
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: BORDER, borderRadius: 999, overflow: 'hidden', marginBottom: 20 }}>
        <motion.div
          animate={{ width: `${displayPct}%` }}
          transition={{ duration: hoveredIdx !== null ? 0.25 : 1, ease: [0.33, 1, 0.68, 1] }}
          style={{ height: '100%', background: ACCENT, borderRadius: 999 }}
        />
      </div>

      {/* Stage dots */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
        {STAGES.map((s, i) => {
          const done = i <= idx
          const active = i === idx
          const hovered = hoveredIdx === i
          const expanded = active || hovered

          return (
            <motion.div
              key={s.key}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              animate={{
                height: expanded ? 28 : 8,
                width: expanded ? 'auto' : 8,
                background: hovered && !done ? 'rgba(196,84,26,0.4)' : done ? ACCENT : BORDER,
                scale: hovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.22, ease: [0.33, 1, 0.68, 1] }}
              style={{
                minWidth: expanded ? 'auto' : 8,
                borderRadius: 999,
                padding: expanded ? '0 16px' : 0,
                display: 'flex',
                alignItems: 'center',
                fontSize: 14,
                fontWeight: 600,
                color: '#fff',
                whiteSpace: 'nowrap',
                cursor: 'default',
                overflow: 'hidden',
              }}
            >
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {s.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
