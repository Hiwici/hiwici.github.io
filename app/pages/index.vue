<script setup lang="ts">
/** Components */
import ActionBar from '~/components/ui/ActionBar.vapor.vue'
import DetailModal from '~/components/ui/DetailModal.vapor.vue'
import SceneCanvas from '~/components/3d/SceneCanvas.vue'
</script>

<template>
  <main class="relative h-screen w-screen overflow-hidden bg-sky-100 select-none">
    <ActionBar />

    <!-- 2. Fullscreen 3D Catan Island Scene -->
    <ClientOnly>
      <SceneCanvas />
    </ClientOnly>

    <!-- 3. Two-column detailed content modal -->
    <DetailModal />
  </main>
</template>
