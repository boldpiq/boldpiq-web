import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { StageProgress, EventTimeline, ActionButtons, CompletionAnimation } from '@/components/portal'

const N8N_BASE = process.env.N8N_BASE_URL || 'https://n8nservice.boldpiq.com'

const ACCENT = '#C4541A'
const MUTED = 'rgba(255,255,255,0.45)'
const SURFACE = 'rgba(255,255,255,0.04)'
const BORDER = 'rgba(255,255,255,0.08)'

interface PortalEvent {
  id: string
  occurred_at: string
  stage: string
  display_label: string
  display_message: string | null
  is_milestone: boolean
  icon: string
}

interface PortalData {
  portal: {
    token: string
    pipeline_type: string
    current_stage: string
    stage_label: string
    stage_message: string | null
    display_name: string | null
    project_type: string | null
    last_viewed_at: string | null
    view_count: number
    drive_folder_url: string | null
  }
  events: PortalEvent[]
}

async function fetchPortalData(token: string): Promise<PortalData | null> {
  if (!token || !/^[\w\-]{10,64}$/.test(token)) return null
  try {
    const res = await fetch(
      `${N8N_BASE}/webhook/portal-data?token=${encodeURIComponent(token)}`,
      { cache: 'no-store' }
    )
    if (!res.ok) return null
    return res.json() as Promise<PortalData>
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ token: string }> }
): Promise<Metadata> {
  const { token } = await params
  const data = await fetchPortalData(token)
  const name = data?.portal.display_name?.split(' ')[0] ?? 'Your'
  return {
    title: `${name}'s Project | BoldPiq`,
    description: 'Track your BoldPiq project progress.',
    robots: { index: false, follow: false },
  }
}

export default async function TrackPage(
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const data = await fetchPortalData(token)
  if (!data) notFound()

  const { portal, events } = data
  const displayName = portal.display_name ?? 'there'
  const firstName = displayName.split(' ')[0]
  const isClientReview = portal.current_stage === 'client_qa'
  const isOnboarding = portal.current_stage === 'onboarding'
  const isCompleted = portal.current_stage === 'completed'
  const hasActions = isClientReview || isOnboarding

  return (
    <>
      <main style={{ minHeight: '100vh', paddingTop: 80, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse 80% 65% at 76% 36%, rgba(196,84,26,0.38) 0%, transparent 66%)' }} />
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse 44% 38% at 16% 78%, rgba(196,84,26,0.20) 0%, transparent 62%)' }} />
        {isCompleted && <CompletionAnimation />}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px clamp(20px,4vw,48px) 80px', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
              <span style={{ height: 1, width: 24, background: ACCENT, display: 'block', flexShrink: 0 }} />
              <span style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED }}>
                Project Tracker
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)', fontWeight: 700, marginBottom: 6 }}>
              Hi {displayName} 👋
            </h1>
            {portal.project_type && (
              <p style={{ color: MUTED, fontSize: 17 }}>{portal.project_type}</p>
            )}
          </div>

          {/* Progress */}
          <div style={{
            background: SURFACE,
            border: `1px solid ${BORDER}`,
            borderRadius: 16,
            padding: '24px 28px',
            marginBottom: 16,
          }}>
            <p style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, marginBottom: 20 }}>
              Progress
            </p>
            <StageProgress currentStage={portal.current_stage} />
            {portal.stage_message && (
              <p style={{ fontSize: 16, color: MUTED, marginTop: 12 }}>{portal.stage_message}</p>
            )}
          </div>

          {/* Actions — highlighted border when action is needed */}
          <div style={{
            background: SURFACE,
            border: `1px solid ${hasActions ? 'rgba(196,84,26,0.4)' : BORDER}`,
            borderRadius: 16,
            padding: '24px 28px',
            marginBottom: 16,
          }}>
            <p style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, marginBottom: 20 }}>
              Actions
            </p>
            {hasActions ? (
              <ActionButtons token={token} currentStage={portal.current_stage} driveFolderUrl={portal.drive_folder_url} firstName={firstName} />
            ) : (
              <p style={{ fontSize: 16, color: MUTED }}>No actions required at this stage.</p>
            )}
          </div>

          {/* Timeline */}
          <div style={{
            background: SURFACE,
            border: `1px solid ${BORDER}`,
            borderRadius: 16,
            padding: '24px 28px',
          }}>
            <p style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, marginBottom: 20 }}>
              Timeline
            </p>
            <EventTimeline events={events} />
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
