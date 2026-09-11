<script setup lang="ts">
import { Vector3, AdditiveBlending, DoubleSide } from 'three'
import type { Mesh, Points } from 'three'

/** Props */
interface Props {
  position?: [number, number, number]
}
const props = withDefaults(defineProps<Props>(), {
  //
})

/** Ref Element Properties */
const refElHalo = ref<Mesh>()
const refElParticles = ref<Points>()

/** Tres Composables */
const { onBeforeRender } = useLoop()

/** Tres Data */
const DEFAULT_SUN_POSITION: [number, number, number] = [25, 35, -40]
const haloPosition = new Vector3(0, 0, 0.1)
const particleCount = 150
const particlePositions = new Float32Array(particleCount * 3)

for (let i = 0; i < particleCount; i++) {
  particlePositions[i * 3] = (Math.random() - 0.5) * 50 // X-axis spread
  particlePositions[i * 3 + 1] = Math.random() * 25 + 1 // Y-axis height (above sea level)
  particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50 // Z-axis spread
}

// Animation: subtle sun-halo pulse and slow floating dust rotation
onBeforeRender(({ elapsed }) => {
  // Breathing halo effect
  if (refElHalo.value) {
    const scale = 1 + Math.sin(elapsed * 1.2) * 0.08
    refElHalo.value.scale.set(scale, scale, 1)
  }

  // Dust particles rotate gently with the breeze
  if (refElParticles.value) {
    refElParticles.value.rotation.y = elapsed * 0.015
  }
})

/** Computed Properties */
const computedPosition = computed(() => {
  const nextPosition = Array.isArray(props.position) ? props.position : DEFAULT_SUN_POSITION
  return new Vector3(nextPosition[0], nextPosition[1], nextPosition[2])
})
</script>

<template>
  <TresGroup>
    <TresGroup :position="computedPosition">
      <!-- 1. Sun core (pure white ultra-bright sphere) -->
      <TresMesh>
        <TresSphereGeometry :args="[3.5, 32, 32]" />
        <TresMeshBasicMaterial color="#ffffff" />
      </TresMesh>

      <!-- 2. Inner warm golden glow (additive blending) -->
      <TresMesh>
        <TresSphereGeometry :args="[4.5, 32, 32]" />
        <TresMeshBasicMaterial
          color="#fef08a"
          :transparent="true"
          :opacity="0.6"
          :blending="AdditiveBlending"
        />
      </TresMesh>

      <!-- 3. Outer camera-facing glow ring (billboard disc) -->
      <TresMesh ref="refElHalo" :position="haloPosition">
        <TresRingGeometry :args="[3.5, 14, 32]" />
        <TresMeshBasicMaterial
          color="#fde047"
          :transparent="true"
          :opacity="0.35"
          :blending="AdditiveBlending"
          :side="DoubleSide"
        />
      </TresMesh>
    </TresGroup>

    <!-- 4. Floating particles that catch sunlight in the air -->
    <TresPoints ref="refElParticles">
      <TresBufferGeometry>
        <TresBufferAttribute attach="attributes-position" :args="[particlePositions, 3]" />
      </TresBufferGeometry>
      <TresPointsMaterial
        color="#fef08a"
        :size="0.3"
        :transparent="true"
        :opacity="0.75"
        :blending="AdditiveBlending"
      />
    </TresPoints>
  </TresGroup>
</template>
