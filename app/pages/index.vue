<script setup lang="ts">
/** Components */
import DetailModal from '~/components/ui/DetailModal.vue'
import SceneCanvas from '~/components/3d/SceneCanvas.vue'
import TimeToggle from '~/components/ui/TimeToggle.vue'
</script>

<template>
  <main class="relative h-screen w-screen overflow-hidden bg-sky-100 select-none">
    <!-- 1. Day/Night Toggle UI -->
    <TimeToggle />

    <!-- 2. Fullscreen 3D Catan Island Scene -->
    <ClientOnly>
      <SceneCanvas />
    </ClientOnly>

    <!-- 3. Two-column detailed content modal -->
    <DetailModal />
  </main>
</template>
