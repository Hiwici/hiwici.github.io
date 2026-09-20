<script setup lang="ts">
/** Components */
import ContentView from './ContentView.vapor.vue'

/** Composables */
const { isHexModalOpen, activeData, closeModal } = useHexModal()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isHexModalOpen"
        class="fixed inset-0 z-99 flex h-screen w-screen items-center justify-center bg-slate-900/45 backdrop-blur-md"
      >
        <div v-if="activeData" class="relative mx-4">
          <div
            class="relative flex max-h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-slate-200/80 shadow-2xl"
          >
            <ContentView :data="activeData" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
