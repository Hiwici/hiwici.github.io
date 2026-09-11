import { ref } from 'vue'
import gsap from 'gsap'

/** Character Global Ref Properties */
const refPosition = ref<[number, number, number]>([0, 0.3, 0]) // [X, Y, Z], 0.3 Height offset of the hexagonal base
const refRotationY = ref<number>(0)
const refIsMoving = ref<boolean>(false)
const refCurrentAnimation = ref<
  'Idle' | 'Walk' | 'Death' | 'Headbuff' | 'Idle_Eating' | 'Jump_Loop' | 'Jump_Start' | 'Run'
>('Idle')

export const useCharacterController = () => {
  /**
   * Move the character to a target 3D world position
   * @param targetPos [X, Y, Z] target position
   * @param onComplete callback after movement completes (e.g. open a two-column UI)
   */
  const moveTo = (targetPos: [number, number, number], onComplete?: () => void) => {
    // Prevent duplicate triggers while movement is in progress
    if (refIsMoving.value) return

    const [startX, startY, startZ] = refPosition.value
    const [targetX, , targetZ] = targetPos

    const dx = targetX - startX
    const dz = targetZ - startZ

    // Do nothing if the current point overlaps with the target point
    if (Math.abs(dx) < 0.01 && Math.abs(dz) < 0.01) return

    refIsMoving.value = true

    // 1. Calculate the facing angle to the target (radians)
    const targetRotation = Math.atan2(dx, dz)

    // 2. Dynamically calculate movement time based on distance (constant speed)
    const distance = Math.hypot(dx, dz) // planar distance sqrt(dx² + dz²)
    const moveSpeed = 5 // units moved per second
    const moveDuration = distance / moveSpeed

    // 3. Create a GSAP animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        refIsMoving.value = false
        refCurrentAnimation.value = 'Idle' // Return to idle animation
        if (onComplete) onComplete()
      },
    })

    // Step A: Smoothly rotate to face the destination
    tl.to(refRotationY, {
      value: targetRotation,
      duration: 0.25,
      ease: 'power2.out',
      onStart: () => {
        refCurrentAnimation.value = 'Walk' // Start walk/run animation
      },
    })

    // Step B: Smoothly move to target (slightly overlap with rotation for natural motion)
    const tweenState = {
      x: startX,
      z: startZ,
    }

    tl.to(
      tweenState,
      {
        x: targetX,
        z: targetZ,
        duration: moveDuration,
        ease: 'power1.inOut',
        onUpdate: () => {
          // Emit a new tuple each frame so render bindings are updated reliably
          refPosition.value = [tweenState.x, startY, tweenState.z]
        },
        onComplete: () => {
          refPosition.value = [targetX, startY, targetZ]
        },
      },
      '-=0.1', // Start movement 0.1s earlier
    )
  }

  return {
    refPosition,
    refRotationY,
    refIsMoving,
    refCurrentAnimation,
    moveTo,
  }
}
