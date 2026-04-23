'use client'
import React, { useState } from 'react'
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
  const [hovered, setHovered] = useState(false)
  const idx = STAGES.findIndex(s => s.key === currentStage)
  // Progress bar fills only through completed stages (not the active one)
  const pct = idx <= 0 ? 0 : Math.round(((idx - 1) / (STAGES.length - 1)) * 100)

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

      {/* Dots row — hover reveals all labels */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'default' }}
      >
        <LayoutGroup>
          <motion.div layout style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
            {STAGES.map((s, i) => {
              const done = i <= idx
              const active = i === idx
              const open = hovered || active

              return (
                <React.Fragment key={s.key}>
                {i > 0 && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: hovered ? 0.6 : 0, scale: hovered ? 1 : 0.4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    style={{
                      fontSize: 14,
                      color: '#fff',
                      lineHeight: 1,
                      pointerEvents: 'none',
                      userSelect: 'none',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    ›
                  </motion.span>
                )}
                <motion.div
                  layout
                  animate={{
                    height: open ? 28 : 8,
                    paddingLeft: open ? 14 : 0,
                    paddingRight: open ? 14 : 0,
                    // done = filled; active = hollow outline; future = empty
                    background: done
                      ? hovered ? 'rgba(196,84,26,0.55)' : ACCENT
                      : 'transparent',
                    boxShadow: active
                      ? `0 0 0 2px ${ACCENT}`
                      : '0 0 0 1px rgba(255,255,255,0.12)',
                  }}
                  transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
                  style={{
                    borderRadius: 999,
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 8,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <AnimatePresence>
                    {open && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          fontSize: active ? 14 : 12,
                          fontWeight: active ? 700 : 400,
                          color: active ? ACCENT : done ? 'rgba(255,255,255,0.65)' : MUTED,
                          lineHeight: 1,
                          pointerEvents: 'none',
                        }}
                      >
                        {s.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
                </React.Fragment>
              )
            })}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  )
}
