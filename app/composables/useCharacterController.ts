import gsap from 'gsap'

/** Ref Properties */
const refPosition = ref<[number, number, number]>([0, 1, 0]) // [X, Y, Z], 0.3 Height offset of the hexagonal base
const refRotationY = ref<number>(0)
const refIsMoving = ref<boolean>(false)
const refCurrentAnimation = ref<
  'Idle' | 'Walk' | 'Death' | 'Headbuff' | 'Idle_Eating' | 'Jump_Loop' | 'Jump_Start' | 'Run'
>('Idle')

/**
 * Composable for controlling a character's movement and animations in a 3D world.
 */
export const useCharacterController = () => {
  const getShortestRotationTarget = (currentRotation: number, targetRotation: number) => {
    const shortestDelta = Math.atan2(
      Math.sin(targetRotation - currentRotation),
      Math.cos(targetRotation - currentRotation),
    )

    return currentRotation + shortestDelta
  }

  const appendMoveSegment = (
    timeline: gsap.core.Timeline,
    startPos: [number, number, number],
    targetPos: [number, number, number],
    startRotation: number,
  ) => {
    const [startX, startY, startZ] = startPos
    const [targetX, , targetZ] = targetPos

    const dx = targetX - startX
    const dz = targetZ - startZ

    if (Math.abs(dx) < 0.01 && Math.abs(dz) < 0.01) return false

    const targetRotation = Math.atan2(dx, dz)
    const resolvedTargetRotation = getShortestRotationTarget(startRotation, targetRotation)
    const distance = Math.hypot(dx, dz)
    const moveSpeed = 5
    const moveDuration = distance / moveSpeed

    timeline.to(refRotationY, {
      value: resolvedTargetRotation,
      duration: 0.25,
      ease: 'power2.out',
      onStart: () => {
        refCurrentAnimation.value = 'Walk'
      },
    })

    const tweenState = {
      x: startX,
      z: startZ,
    }

    timeline.to(
      tweenState,
      {
        x: targetX,
        z: targetZ,
        duration: moveDuration,
        ease: 'power1.inOut',
        onUpdate: () => {
          refPosition.value = [tweenState.x, startY, tweenState.z]
        },
        onComplete: () => {
          refPosition.value = [targetX, startY, targetZ]
        },
      },
      '-=0.1',
    )

    return resolvedTargetRotation
  }

  /**
   * Move the character through a list of 3D world positions in sequence.
   */
  const moveAlongPath = (path: Array<[number, number, number]>, onComplete?: () => void) => {
    if (refIsMoving.value) return
    if (path.length === 0) {
      if (onComplete) onComplete()
      return
    }

    refIsMoving.value = true

    const timeline = gsap.timeline({
      onComplete: () => {
        refIsMoving.value = false
        refCurrentAnimation.value = 'Idle'
        if (onComplete) onComplete()
      },
    })

    const [, startY] = refPosition.value
    let currentPos: [number, number, number] = [...refPosition.value]
    let currentRotation = refRotationY.value
    let hasMovement = false

    for (const waypoint of path) {
      const targetPos: [number, number, number] = [waypoint[0], startY, waypoint[2]]
      const nextRotation = appendMoveSegment(timeline, currentPos, targetPos, currentRotation)

      if (typeof nextRotation === 'number') {
        hasMovement = true
        currentRotation = nextRotation
      }

      currentPos = targetPos
    }

    if (!hasMovement) {
      timeline.kill()
      refIsMoving.value = false
      refCurrentAnimation.value = 'Idle'
      if (onComplete) onComplete()
    }
  }

  /**
   * Move the character to a target 3D world position
   * @param targetPos [X, Y, Z] target position
   * @param onComplete callback after movement completes (e.g. open a two-column UI)
   */
  const moveTo = (targetPos: [number, number, number], onComplete?: () => void) => {
    moveAlongPath([targetPos], onComplete)
  }

  return {
    refPosition,
    refRotationY,
    refIsMoving,
    refCurrentAnimation,
    moveAlongPath,
    moveTo,
  }
}
