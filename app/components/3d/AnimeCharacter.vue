<script setup lang="ts">
import { useGLTF, useAnimations } from '@tresjs/cientos'

/** Composables */
const { refPosition, refRotationY, refCurrentAnimation } = useCharacterController()

// Load the 3D character model and its animations
const { state } = await useGLTF('/models/cat.glb')
const computedAnimations = computed(() => state.value?.animations ?? [])
const computedScene = computed(() => state.value?.scene ?? null)
const { actions } = useAnimations(computedAnimations, computedScene)

// Play the idle animation by default
if (actions.Idle) actions.Idle.play()

/** Watchers */
watch(
  () => refCurrentAnimation.value,
  (newAnim, oldAnim) => {
    const currentAction = actions[newAnim]
    const previousAction = oldAnim ? actions[oldAnim] : undefined

    if (previousAction && currentAction) {
      previousAction.fadeOut(0.2)
      currentAction.reset().fadeIn(0.2).play()
      return
    }

    if (currentAction) {
      currentAction.reset().fadeIn(0.2).play()
    }
  },
)
</script>

<template>
  <primitive
    :object="state!.scene"
    :position="refPosition"
    :rotation="[0, refRotationY, 0]"
    :scale="[0.6, 0.6, 0.6]"
    cast-shadow
  />
</template>
