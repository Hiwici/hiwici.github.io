<script setup lang="ts">
const { currentMode, setTimeOfDay } = useTimeOfDay()

/** Data */
const options: { mode: TimeMode; label: string; icon: string }[] = [
  { mode: 'day', label: '白天', icon: '☀️' },
  { mode: 'sunset', label: '夕陽', icon: '🌅' },
  { mode: 'night', label: '星夜', icon: '🌙' },
]
</script>

<template>
  <div
    class="fixed top-6 right-6 z-50 flex rounded-full border border-white/40 bg-white/70 p-1.5 shadow-lg backdrop-blur-md select-none"
  >
    <button
      v-for="opt in options"
      :key="opt.mode"
      @click="setTimeOfDay(opt.mode)"
      class="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300"
      :class="[
        currentMode === opt.mode
          ? 'scale-105 bg-slate-900 text-amber-300 shadow-md'
          : 'text-slate-600 hover:bg-white/50 hover:text-slate-900',
      ]"
    >
      <span>{{ opt.icon }}</span>
      <span>{{ opt.label }}</span>
    </button>
  </div>
</template>
