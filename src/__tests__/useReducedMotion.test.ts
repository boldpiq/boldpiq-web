import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function mockMatchMedia(matches: boolean) {
  const listeners: Array<(e: Partial<MediaQueryListEvent>) => void> = []
  const mq = {
    matches,
    addEventListener: vi.fn((_: string, cb: (e: Partial<MediaQueryListEvent>) => void) => {
      listeners.push(cb)
    }),
    removeEventListener: vi.fn(),
    dispatchChange: (newMatches: boolean) => {
      listeners.forEach(cb => cb({ matches: newMatches }))
    },
  }
  vi.stubGlobal('window', {
    ...window,
    matchMedia: vi.fn(() => mq),
  })
  return mq
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useReducedMotion', () => {
  it('returns false when prefers-reduced-motion is not set', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })

  it('returns true when prefers-reduced-motion is set', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })

  it('updates when media query changes to reduced', () => {
    const mq = mockMatchMedia(false)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)

    act(() => {
      mq.dispatchChange(true)
    })
    expect(result.current).toBe(true)
  })

  it('updates when media query changes back to no preference', () => {
    const mq = mockMatchMedia(true)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)

    act(() => {
      mq.dispatchChange(false)
    })
    expect(result.current).toBe(false)
  })

  it('removes event listener on unmount', () => {
    const mq = mockMatchMedia(false)
    const { unmount } = renderHook(() => useReducedMotion())
    unmount()
    expect(mq.removeEventListener).toHaveBeenCalledOnce()
  })
})
