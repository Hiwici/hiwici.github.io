<script setup lang="ts">
import { Vector3, type Group } from 'three'

/** Props */
interface Props {
  position: [number, number, number]
  scale?: number
  speed?: number
}
const props = withDefaults(defineProps<Props>(), {
  scale: 1,
  speed: 0.5,
})

/** Ref Element Properties */
const refElCloudGroup = ref<Group>()
const refUpdateAccumulator = ref(0)

/** Tres Data */
const cloudMeshPosition1 = new Vector3(0, 0, 0)
const cloudMeshPosition2 = new Vector3(1.8, -0.2, 0.5)
const cloudMeshPosition3 = new Vector3(-1.6, -0.3, -0.3)
const cloudMeshPosition4 = new Vector3(0.8, 0.8, -0.2)

/** Tres Composables */
const { onBeforeRender } = useLoop()

// Slow cloud drifting animation
onBeforeRender(({ delta }) => {
  if (!refElCloudGroup.value) return

  // Update at ~30 FPS to reduce CPU load with many cloud instances.
  refUpdateAccumulator.value += delta
  if (refUpdateAccumulator.value < 1 / 30) return

  const step = refUpdateAccumulator.value
  refUpdateAccumulator.value = 0
  refElCloudGroup.value.position.x += step * props.speed

  // Reset to the left side when the cloud drifts too far
  if (refElCloudGroup.value.position.x > 80) {
    refElCloudGroup.value.position.x = -80
  }
})

/** Computed Properties */
const computedGroupPosition = computed(() => {
  return new Vector3(...props.position)
})
const computedGroupScale = computed(() => {
  return new Vector3(props.scale, props.scale, props.scale)
})
</script>

<template>
  <TresGroup ref="refElCloudGroup" :position="computedGroupPosition" :scale="computedGroupScale">
    <!-- Cartoon cloud composed of multiple low-poly dodecahedrons in different sizes -->
    <TresMesh :position="cloudMeshPosition1">
      <TresDodecahedronGeometry :args="[2, 0]" />
      <TresMeshToonMaterial color="#ffffff" />
    </TresMesh>

    <TresMesh :position="cloudMeshPosition2">
      <TresDodecahedronGeometry :args="[1.4, 0]" />
      <TresMeshToonMaterial color="#f8fafc" />
    </TresMesh>

    <TresMesh :position="cloudMeshPosition3">
      <TresDodecahedronGeometry :args="[1.5, 0]" />
      <TresMeshToonMaterial color="#f8fafc" />
    </TresMesh>

    <TresMesh :position="cloudMeshPosition4">
      <TresDodecahedronGeometry :args="[1.2, 0]" />
      <TresMeshToonMaterial color="#ffffff" />
    </TresMesh>
  </TresGroup>
</template>
