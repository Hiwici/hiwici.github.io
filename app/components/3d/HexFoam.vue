<script setup lang="ts">
import { Vector3, DoubleSide, type Mesh, type MeshBasicMaterial } from 'three'

/** Props */
interface Props {
  position: [number, number, number]
  radius?: number
}
const props = withDefaults(defineProps<Props>(), {
  radius: 2,
})

/** Ref Element Properties */
const refRing1 = ref<Mesh>()
const refRing2 = ref<Mesh>()
const refMat1 = ref<MeshBasicMaterial>()
const refMat2 = ref<MeshBasicMaterial>()

/** Tres Data */
const foamPosition = new Vector3(props.position[0], 0.25, props.position[2])

/** Tres Composables */
const { onBeforeRender } = useLoop()

// Dual expanding foam-ripple animation in anime style
onBeforeRender(({ elapsed }) => {
  const speed = 0.3 // Ripple expansion speed (cycles/second)
  const maxScale = 0.25 // Maximum expansion amount (1.0 -> 1.25)

  // 1. First foam ripple layer
  const progress1 = (elapsed * speed) % 1
  if (refRing1.value && refMat1.value) {
    const scale1 = 1 + progress1 * maxScale
    refRing1.value.scale.set(scale1, scale1, 1)
    // Opacity fades out linearly as the ripple expands (0.8 -> 0)
    refMat1.value.opacity = (1 - progress1) * 0.8
  }

  // 2. Second foam ripple layer (phase-shifted by 0.5 to create continuous foam)
  const progress2 = (elapsed * speed + 0.5) % 1
  if (refRing2.value && refMat2.value) {
    const scale2 = 1 + progress2 * maxScale
    refRing2.value.scale.set(scale2, scale2, 1)
    refMat2.value.opacity = (1 - progress2) * 0.8
  }
})
</script>

<template>
  <!-- Close to the sea surface (Y = 0.02) and flattened to align with the hex tile -->
  <TresGroup :position="foamPosition" :rotation="[-Math.PI / 2, 0, Math.PI / 6]">
    <!-- First white foam ring -->
    <TresMesh ref="refRing1">
      <!-- RingGeometry(inner radius, outer radius, segments=6) creates an exact hexagonal ring -->
      <TresRingGeometry :args="[props.radius * 0.98, props.radius * 1.1, 6]" />
      <TresMeshBasicMaterial
        ref="refMat1"
        color="#ffffff"
        :transparent="true"
        :depth-write="false"
        :side="DoubleSide"
      />
    </TresMesh>

    <!-- Second soft light-blue foam ring (phase-shifted) -->
    <TresMesh ref="refRing2">
      <TresRingGeometry :args="[props.radius * 0.98, props.radius * 1.1, 6]" />
      <TresMeshBasicMaterial
        ref="refMat2"
        color="#f0f9ff"
        :transparent="true"
        :depth-write="false"
        :side="DoubleSide"
      />
    </TresMesh>
  </TresGroup>
</template>
