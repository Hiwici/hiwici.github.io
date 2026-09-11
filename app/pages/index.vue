<script setup lang="ts">
import SceneCanvas from '~/components/3d/SceneCanvas.vue'
</script>

<template>
  <main class="relative h-screen w-screen overflow-hidden bg-sky-100">
    <ClientOnly>
      <SceneCanvas />
    </ClientOnly>
  </main>
</template>
