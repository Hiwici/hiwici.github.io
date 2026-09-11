<script setup lang="ts">
import { OrbitControls, Html } from '@tresjs/cientos'
import { Vector3 } from 'three'
/** Components */
import AnimeCharacter from './AnimeCharacter.vue'
import AnimeCloud from './AnimeCloud.vue'
import AnimeOcean from './AnimeOcean.vue'
import AnimeSun from './AnimeSun.vue'
import MapGrid from './MapGrid.vue'

/** Tres Data */
const cameraPosition = new Vector3(0, 10, 25)
const cameraLookAt = new Vector3(0, 0, 0)
// const directionalLight = new Vector3(15, 25, 10)
const sunPosition = new Vector3(25, 35, -40)

/** Cloud Layers */
const cloudLayers: Array<{
  id: string
  position: [number, number, number]
  scale: number
  speed: number
}> = [
  // Near layer: larger, lower, and faster
  { id: 'near-1', position: [-48, 10.8, -14], scale: 2.8, speed: 1.15 },
  { id: 'near-2', position: [34, 9.7, -18], scale: 2.5, speed: 1.0 },

  // Mid layer: medium size and speed
  { id: 'mid-1', position: [-18, 13.6, -29], scale: 2.0, speed: 0.72 },
  { id: 'mid-2', position: [12, 14.3, -34], scale: 1.8, speed: 0.62 },

  // Far layer: smaller, higher, and slower
  { id: 'far-1', position: [-56, 17.2, -52], scale: 1.3, speed: 0.38 },
  { id: 'far-2', position: [-2, 16.1, -46], scale: 1.2, speed: 0.34 },
  { id: 'far-3', position: [54, 18.4, -58], scale: 1.1, speed: 0.3 },
]
</script>

<template>
  <TresCanvas clear-color="#bae6fd" shadows window-size :dpr="[1, 1.5]">
    <!-- 1. Perspective Camera -->
    <TresPerspectiveCamera
      :position="cameraPosition"
      :look-at="cameraLookAt"
      :fov="45"
      :near="0.1"
      :far="1000"
    />

    <!-- 2. Camera controller -->
    <OrbitControls
      :enable-zoom="true"
      :enable-pan="false"
      :max-polar-angle="Math.PI / 2 - 0.05"
      :min-distance="6"
      :max-distance="28"
      :damping-factor="0.05"
    />

    <!-- 3. Lighting: bright anime-style tone -->
    <!-- Ambient light: keep shadows slightly sky-tinted and avoid crushed dark areas -->
    <TresAmbientLight :intensity="1.1" color="#f0f9ff" />

    <!-- Main directional sunlight: aligned with sunPosition for warm golden light -->
    <TresDirectionalLight
      :position="sunPosition"
      :intensity="2.2"
      color="#fef3c7"
      cast-shadow
      :shadow-mapSize-width="1024"
      :shadow-mapSize-height="1024"
    />

    <!-- Ocean visible in the foreground; distant fog blends sea into sky and softens horizon edges -->
    <TresFog color="#bae6fd" :near="35" :far="90" />
    <!-- <TresFog :color="'#E0F2FE'" :near="40" :far="100" /> -->

    <!-- 5. 3D Content Load Area (use Suspense for async loading) -->
    <Suspense>
      <template #default>
        <TresGroup>
          <!-- Sunlight and glowing dust particle component -->
          <AnimeSun :position="[25, 35, -40]" />

          <!-- 3D cartoon ocean surface -->
          <AnimeOcean />

          <!-- Layered cloud placement with depth-based parallax -->
          <AnimeCloud
            v-for="cloud in cloudLayers"
            :key="cloud.id"
            :position="cloud.position"
            :scale="cloud.scale"
            :speed="cloud.speed"
          />

          <!-- 3D map and character -->
          <MapGrid />
          <AnimeCharacter />
        </TresGroup>
      </template>

      <template #fallback>
        <Html center>
          <div
            class="flex flex-col items-center justify-center rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-md"
          >
            <div
              class="mb-2 h-6 w-6 animate-spin rounded-full border-2 border-sky-500 border-t-transparent"
            ></div>
            <span class="text-xs font-bold tracking-wider text-sky-700">Loading...</span>
          </div>
        </Html>
      </template>
    </Suspense>
  </TresCanvas>
</template>

<style scoped>
:deep(canvas) {
  width: 100vw;
  height: 100vh;
  display: block;
}
</style>
