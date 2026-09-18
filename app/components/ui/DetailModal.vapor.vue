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
      <div v-if="isHexModalOpen" class="fixed inset-0 z-99 bg-slate-900/45 backdrop-blur-md">
        <div
          class="absolute inset-0 bg-linear-to-br from-sky-900/20 via-transparent to-amber-800/20"
        />
      </div>
    </Transition>

    <Transition
      enter-active-class="transition duration-400 ease-out"
      enter-from-class="opacity-0 scale-94 translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-250 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-96 translate-y-1"
    >
      <div
        v-if="isHexModalOpen && activeData"
        class="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 md:p-10"
      >
        <div
          class="relative z-10 grid max-h-[88vh] w-full max-w-6xl overflow-hidden rounded-4xl border border-white/20 bg-linear-to-br from-white/88 via-white/82 to-slate-100/76 shadow-[0_35px_85px_-32px_rgba(15,23,42,0.65)] backdrop-blur-xl"
        >
          <div
            class="pointer-events-none absolute -top-18 -left-18 h-52 w-52 rounded-full bg-cyan-300/28 blur-3xl"
          />
          <div
            class="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-amber-300/24 blur-3xl"
          />
          <div
            class="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-white/45 ring-inset"
          />

          <!-- <div class="max-h-[70vh] overflow-y-auto md:col-span-7 md:max-h-[88vh]"> -->
          <ContentView :data="activeData" />
          <!-- </div> -->
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
