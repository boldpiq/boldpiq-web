const SURFACE = 'rgba(255,255,255,0.04)'
const BORDER = 'rgba(255,255,255,0.08)'

export default function Loading() {
  return (
    <main style={{ maxWidth: 720, margin: '80px auto', padding: '40px clamp(20px,4vw,48px)' }}>
      {[120, 200, 280].map((h, i) => (
        <div
          key={i}
          style={{
            height: h,
            background: SURFACE,
            border: `1px solid ${BORDER}`,
            borderRadius: 16,
            marginBottom: 16,
            animation: 'portal-pulse 1.5s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes portal-pulse {
          0%, 100% { opacity: 1 }
          50% { opacity: 0.4 }
        }
      `}</style>
    </main>
  )
}
