'use client'
import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'

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

interface Props { currentStage: string }

export function StageProgress({ currentStage }: Props) {
  const [expanded, setExpanded] = useState(false)
  const idx = STAGES.findIndex(s => s.key === currentStage)
  const pct = idx < 0 ? 0 : Math.round((idx / (STAGES.length - 1)) * 100)

  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED }}>
          {STAGES[idx]?.label ?? 'Progress'}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: ACCENT }}>{pct}%</span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: BORDER, borderRadius: 999, overflow: 'hidden', marginBottom: 20 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
          style={{ height: '100%', background: ACCENT, borderRadius: 999 }}
        />
      </div>

      {/* Stage dots — hover entire row to reveal all labels */}
      <div
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        style={{ cursor: 'default' }}
      >
        <LayoutGroup>
          <motion.div layout style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
            {STAGES.map((s, i) => {
              const done = i <= idx
              const active = i === idx
              const showLabel = expanded || active

              const bg = active
                ? ACCENT
                : done
                  ? expanded ? 'rgba(196,84,26,0.55)' : ACCENT
                  : expanded ? 'rgba(255,255,255,0.1)' : BORDER

              return (
                <motion.div
                  key={s.key}
                  layout
                  animate={{ background: bg }}
                  transition={{
                    layout: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
                    background: { duration: 0.2 },
                  }}
                  style={{
                    height: showLabel ? (active ? 30 : 26) : 8,
                    borderRadius: 999,
                    padding: showLabel ? '0 14px' : 0,
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 8,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    outline: active && expanded ? `1.5px solid ${ACCENT}` : 'none',
                    boxShadow: active && expanded ? `0 0 10px rgba(196,84,26,0.45)` : 'none',
                  }}
                >
                  <AnimatePresence>
                    {showLabel && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          fontSize: active ? 14 : 12,
                          fontWeight: active ? 700 : 500,
                          color: active ? '#fff' : done ? 'rgba(255,255,255,0.75)' : MUTED,
                          lineHeight: 1,
                        }}
                      >
                        {s.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  )
}
