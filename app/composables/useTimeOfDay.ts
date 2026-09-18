import gsap from 'gsap'
import { Vector3 } from 'three'

const dayPeriods: Record<TimeMode, TimeConfig> = {
  day: {
    clearColor: '#9ed2f7',
    ambientColor: '#eaf6ff',
    ambientIntensity: 0.95,
    sunColor: '#fff4dc',
    sunIntensity: 1.85,
    sunPosition: new Vector3(25, 35, -40),
    oceanColor: '#2f9ac8',
    starsOpacity: 0,
  },
  sunset: {
    clearColor: '#f4a06d',
    ambientColor: '#ffdcbf',
    ambientIntensity: 0.75,
    sunColor: '#ffb36b',
    sunIntensity: 1.35,
    sunPosition: new Vector3(35, 6, -40),
    oceanColor: '#8f5f4b',
    starsOpacity: 0.12,
  },
  night: {
    clearColor: '#0b1220',
    ambientColor: '#22344f',
    ambientIntensity: 0.28,
    sunColor: '#c7defa',
    sunIntensity: 0.35,
    sunPosition: new Vector3(-20, 30, -40),
    oceanColor: '#10315c',
    starsOpacity: 0.9,
  },
}

/** Shared State */
let refTimeState: TimeConfig | null = null

/**
 * Composable for managing and transitioning the time of day in the application.
 */
export const useTimeOfDay = () => {
  /** Stores */
  const timeStore = useTimeStore()

  /** Ref Properties */
  if (!refTimeState) {
    refTimeState = reactive<TimeConfig>({ ...dayPeriods[timeStore.time] })
  }

  /**
   * Smoothly transition to a target time mode
   */
  const setTimeOfDay = (mode: TimeMode) => {
    if (!refTimeState) return

    const target = dayPeriods[mode]

    if (!target) return
    if (timeStore.time !== mode) {
      timeStore.setTime(mode)
    }

    gsap.killTweensOf(refTimeState)
    gsap.killTweensOf(refTimeState.sunPosition)

    // GSAP smoothly transitions numeric fields and HEX color strings
    gsap.to(refTimeState, {
      clearColor: target.clearColor,
      ambientColor: target.ambientColor,
      ambientIntensity: target.ambientIntensity,
      sunColor: target.sunColor,
      sunIntensity: target.sunIntensity,
      oceanColor: target.oceanColor,
      starsOpacity: target.starsOpacity,
      duration: 1.5,
      ease: 'power2.inOut',
    })

    // GSAP interpolates the 3D light position
    gsap.to(refTimeState.sunPosition, {
      x: target.sunPosition.x,
      y: target.sunPosition.y,
      z: target.sunPosition.z,
      duration: 1.5,
      ease: 'power2.inOut',
    })
  }

  return {
    timeState: refTimeState,
    setTimeOfDay,
  }
}
