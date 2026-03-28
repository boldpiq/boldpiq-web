"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AnimatedAccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  className?: string
}

export function AnimatedAccordion({ items, allowMultiple = false, className }: AnimatedAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([])

  function toggle(id: string) {
    if (allowMultiple) {
      setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id)
        return (
          <div
            key={item.id}
            style={{ border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}
          >
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              style={{
                width: "100%",
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 500,
                textAlign: "left",
              }}
            >
              {item.question}
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                style={{ display: "inline-block", fontSize: 20, lineHeight: 1 }}
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding: "0 20px 16px", color: "#6b7280", lineHeight: 1.7 }}>
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
