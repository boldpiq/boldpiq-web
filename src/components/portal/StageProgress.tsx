'use client'
import { motion } from 'motion/react'

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
  const idx = STAGES.findIndex(s => s.key === currentStage)
  const pct = idx < 0 ? 0 : Math.round((idx / (STAGES.length - 1)) * 100)

  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED }}>
          Progress
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

      {/* Stage dots */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
        {STAGES.map((s, i) => {
          const done = i <= idx
          const active = i === idx
          return (
            <div
              key={s.key}
              title={s.label}
              style={{
                height: active ? 28 : 8,
                width: active ? 'auto' : 8,
                minWidth: active ? 'auto' : 8,
                borderRadius: 999,
                background: done ? ACCENT : BORDER,
                padding: active ? '0 16px' : 0,
                display: 'flex',
                alignItems: 'center',
                fontSize: active ? 14 : 10,
                fontWeight: 600,
                color: '#fff',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
              }}
            >
              {active ? s.label : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
