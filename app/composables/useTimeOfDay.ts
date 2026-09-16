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

/**
 * Composable for managing and transitioning the time of day in the application.
 */
export const useTimeOfDay = () => {
  /** Stores */
  const mapStore = useMapStore()

  /** Ref Properties */
  const currentMode = ref<TimeMode>('day')
  const timeState = reactive<TimeConfig>({ ...dayPeriods.day })

  /**
   * Smoothly transition to a target time mode
   */
  const setTimeOfDay = (mode: TimeMode) => {
    if (currentMode.value === mode) return
    currentMode.value = mode
    const target = dayPeriods[mode]

    // GSAP smoothly transitions numeric fields and HEX color strings
    gsap.to(timeState, {
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

    // GSAP interpolates the 3D light position [X, Y, Z]
    gsap.to(timeState.sunPosition, {
      0: target.sunPosition.x,
      1: target.sunPosition.y,
      2: target.sunPosition.z,
      duration: 1.5,
      ease: 'power2.inOut',
    })
  }

  return {
    currentMode,
    timeState,
    setTimeOfDay,
  }
}
