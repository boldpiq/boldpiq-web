'use client'
import { useEffect, useRef } from 'react'
import { motion, useAnimationFrame } from 'motion/react'

const ACCENT = '#C4541A'

interface Particle {
  id: number; x: number; y: number; vx: number; vy: number
  rotation: number; rotationSpeed: number; color: string
  size: number; shape: 'rect' | 'circle' | 'star'
  opacity: number; life: number; maxLife: number
}

const COLORS = [
  '#C4541A', '#D4601F', '#E8732A', '#FF9A5C', '#FFB380',
  '#FFC89A', '#FFFFFF', 'rgba(255,255,255,0.7)', '#FF6B35', '#F7931E',
]

function rand(min: number, max: number) { return Math.random() * (max - min) + min }

function createParticle(id: number, ox: number, oy: number): Particle {
  const angle = rand(0, Math.PI * 2)
  const speed = rand(4, 18)
  return {
    id, x: ox, y: oy,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - rand(2, 8),
    rotation: rand(0, 360), rotationSpeed: rand(-8, 8),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: rand(5, 14),
    shape: (['rect', 'circle', 'star'] as const)[Math.floor(Math.random() * 3)],
    opacity: 1, life: 0, maxLife: rand(80, 160),
  }
}

function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const counter = useRef(0)
  const burst = useRef(false)

  useEffect(() => {
    if (burst.current) return
    burst.current = true
    const canvas = canvasRef.current
    if (!canvas) return
    const cx = canvas.offsetWidth / 2
    const cy = canvas.offsetHeight * 0.35
    for (let i = 0; i < 120; i++) particles.current.push(createParticle(counter.current++, cx, cy))
    setTimeout(() => {
      if (!canvasRef.current) return
      const cx2 = canvasRef.current.offsetWidth / 2
      const cy2 = canvasRef.current.offsetHeight * 0.35
      for (let i = 0; i < 80; i++)
        particles.current.push(createParticle(counter.current++, cx2 + rand(-80, 80), cy2))
    }, 400)
  }, [])

  useAnimationFrame(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.current = particles.current.filter(p => p.life < p.maxLife)
    for (const p of particles.current) {
      p.life++; p.x += p.vx; p.y += p.vy
      p.vy += 0.4; p.vx *= 0.98; p.rotation += p.rotationSpeed
      const prog = p.life / p.maxLife
      p.opacity = prog < 0.7 ? 1 : 1 - (prog - 0.7) / 0.3
      ctx.save()
      ctx.globalAlpha = p.opacity
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.fillStyle = p.color
      if (p.shape === 'circle') {
        ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill()
      } else if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
      } else {
        ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const oa = (i * 4 * Math.PI) / 5 - Math.PI / 2
          const ia = oa + (2 * Math.PI) / 10
          if (i === 0) ctx.moveTo(Math.cos(oa) * p.size / 2, Math.sin(oa) * p.size / 2)
          else ctx.lineTo(Math.cos(oa) * p.size / 2, Math.sin(oa) * p.size / 2)
          ctx.lineTo(Math.cos(ia) * p.size / 4, Math.sin(ia) * p.size / 4)
        }
        ctx.closePath(); ctx.fill()
      }
      ctx.restore()
    }
  })

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 20,
    }} />
  )
}

function FloatingOrbs() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
      {[
        { x: '20%', y: '25%', size: 180, delay: 0 },
        { x: '75%', y: '20%', size: 120, delay: 0.8 },
        { x: '60%', y: '70%', size: 200, delay: 0.4 },
        { x: '15%', y: '65%', size: 140, delay: 1.2 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.15, 0.08], scale: [0, 1.2, 1] }}
          transition={{ duration: 1.5, delay: orb.delay, ease: 'easeOut' }}
          style={{
            position: 'absolute', left: orb.x, top: orb.y,
            width: orb.size, height: orb.size, borderRadius: '50%',
            background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}

function Sparkles() {
  const sparkles = [
    { x: '12%', y: '30%', scale: 0.8, delay: 0.6 },
    { x: '88%', y: '25%', scale: 1.0, delay: 1.0 },
    { x: '82%', y: '60%', scale: 0.7, delay: 0.3 },
    { x: '10%', y: '55%', scale: 0.9, delay: 1.4 },
    { x: '50%', y: '85%', scale: 0.6, delay: 0.8 },
  ]
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: [0, 1, 0.6, 1, 0], scale: [0, s.scale, s.scale * 0.8, s.scale, 0], rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 3, delay: s.delay, repeat: Infinity, repeatDelay: 2 }}
          style={{ position: 'absolute', left: s.x, top: s.y, fontSize: 24, color: ACCENT }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  )
}

export function CompletionAnimation() {
  return (
    <>
      <ConfettiCanvas />
      <FloatingOrbs />
      <Sparkles />
    </>
  )
}
