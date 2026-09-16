<script setup lang="ts">
/** Components */
import LeftCharacterView from './LeftCharacterView.vue'
import RightContentView from './RightContentView.vue'

const { isHexModalOpen, activeData, closeModal } = useHexModal()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity ease-linear duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isHexModalOpen" class="fixed inset-0 z-99 bg-slate-900/40 backdrop-blur-md" />
    </Transition>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isHexModalOpen && activeData"
        class="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 md:p-10"
      >
        <div
          class="relative z-10 grid max-h-[85vh] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border-4 border-white/60 bg-white/85 shadow-2xl md:grid-cols-12"
        >
          <button
            @click="closeModal"
            class="absolute top-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-xl font-black text-slate-600 shadow-md transition-all duration-200 hover:rotate-90 hover:bg-rose-500 hover:text-white"
          >
            ✕
          </button>

          <div
            class="relative flex flex-col items-center justify-between overflow-hidden border-b border-sky-200/60 bg-linear-to-b from-sky-100/80 to-indigo-100/80 p-6 md:col-span-5 md:border-r md:border-b-0"
          >
            <!-- <LeftCharacterView
              :expression="activeData.expression"
              :badge-text="activeData.badgeText"
              :quote="activeData.characterQuote"
            /> -->
          </div>

          <div class="max-h-[60vh] overflow-y-auto p-6 md:col-span-7 md:max-h-[85vh] md:p-8">
            <RightContentView :data="activeData" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
