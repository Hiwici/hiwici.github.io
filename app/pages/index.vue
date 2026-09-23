<script setup lang="ts">
/** Components */
import ActionBar from '~/components/ui/ActionBar.vapor.vue'
import DetailModal from '~/components/ui/DetailModal.vapor.vue'
import SceneCanvas from '~/components/3d/SceneCanvas.vue'

/** Composables */
const { tt } = useAppI18n()

/** Ref Properties */
const refIsPageLoading = ref<boolean>(true)

/**
 * Handles the event when the 3D scene is ready.
 */
const handleSceneReady = () => {
  refIsPageLoading.value = false
}
</script>

<template>
  <main class="relative h-screen w-screen overflow-hidden bg-sky-100 select-none">
    <ActionBar />

    <!-- 2. Fullscreen 3D Catan Island Scene -->
    <ClientOnly>
      <SceneCanvas @ready="handleSceneReady" />
    </ClientOnly>

    <!-- 3. Two-column detailed content modal -->
    <DetailModal />

    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-400"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="refIsPageLoading"
        class="absolute inset-0 z-50 flex items-center justify-center bg-linear-to-b from-sky-100 via-cyan-50 to-blue-100"
      >
        <div
          class="flex min-w-50 flex-col items-center gap-3 rounded-2xl bg-white/75 px-6 py-5 shadow-xl ring-1 ring-sky-200 backdrop-blur-md"
        >
          <div
            class="h-8 w-8 animate-spin rounded-full border-2 border-sky-500 border-t-transparent"
          ></div>
          <p class="text-xs font-bold tracking-[0.18em] text-sky-700">{{ tt('Loading') }}</p>
        </div>
      </div>
    </Transition>
  </main>
</template>
