<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { Vector3 } from 'three'

/** Props */
interface Props {
  expression: string
  badgeText: string
  quote: string
}
const props = withDefaults(defineProps<Props>(), {
  //
})

/** Tres Data */
const perspectiveCameraPosition = new Vector3(0, 1.2, 3)
const directionalLightPosition = new Vector3(2, 4, 2)
const characterMeshPosition = new Vector3(0, 0.8, 0)
</script>

<template>
  <div class="relative flex h-full w-full flex-col items-center justify-between">
    <!-- Anime-style dialog bubble -->
    <div
      class="animate-bounce-slow relative mb-4 w-full rounded-2xl border-2 border-sky-300 bg-white p-4 shadow-lg"
    >
      <p class="mb-1 text-xs font-black tracking-wider text-sky-600">💬 提示</p>
      <p class="text-sm leading-relaxed font-bold text-slate-700">{{ quote }}</p>
      <!-- Bubble tail -->
      <div
        class="absolute -bottom-2.5 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-sky-300 bg-white"
      ></div>
    </div>

    <!-- Character showcase area (can use a standalone 3D canvas or anime portrait) -->
    <div class="relative my-2 flex h-56 w-48 items-center justify-center">
      <!-- Background glow decoration -->
      <div class="absolute inset-0 animate-pulse rounded-full bg-sky-300/30 blur-2xl"></div>

      <!-- Mini 3D character canvas rendering (with subtle idle/nod motion) -->
      <ClientOnly>
        <TresCanvas alpha class="h-full w-full">
          <TresPerspectiveCamera :position="perspectiveCameraPosition" :look-at="[0, 1, 0]" />
          <TresAmbientLight :intensity="1.5" />
          <TresDirectionalLight :position="directionalLightPosition" :intensity="2" />

          <OrbitControls :enable-zoom="false" :enable-pan="false" />

          <Suspense>
            <!-- A standalone 3D character head model can be imported here -->
            <TresMesh :position="characterMeshPosition">
              <TresSphereGeometry :args="[0.7, 32, 32]" />
              <TresMeshToonMaterial color="#fcd34d" />
            </TresMesh>
          </Suspense>
        </TresCanvas>
      </ClientOnly>
    </div>

    <!-- Bottom character status badge -->
    <div class="mt-2 rounded-full border-2 border-amber-600 bg-amber-400 px-4 py-1.5 shadow-md">
      <span class="text-xs font-black tracking-wide text-slate-900"> STATUS: {{ badgeText }} </span>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 3s infinite ease-in-out;
}
</style>
