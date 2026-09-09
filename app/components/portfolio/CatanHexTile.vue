<script setup lang="ts">
import type { PortfolioTile } from '~/data/portfolio'

interface Props {
  tile: PortfolioTile
  isActive: boolean
  isLocked: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: [tile: PortfolioTile]
}>()

const computedTileStyle = computed(() => ({
  '--tile-x': `${props.tile.x * 170}px`,
  '--tile-y': `${props.tile.y * 146}px`,
}))

const handleSelect = () => {
  if (!props.isLocked) {
    emit('select', props.tile)
  }
}
</script>

<template>
  <button
    :aria-current="isActive ? 'true' : undefined"
    :aria-label="`Visit ${tile.title}`"
    :class="[
      'group absolute h-44 w-48 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/80 disabled:cursor-wait',
      isActive ? 'z-20 scale-110' : 'z-10 hover:z-20 hover:scale-105',
    ]"
    :disabled="isLocked"
    :style="computedTileStyle"
    type="button"
    @click="handleSelect"
  >
    <span
      :class="[
        'clip-hex absolute inset-0 border-4 border-white/70 bg-gradient-to-br shadow-[0_16px_28px_rgba(37,63,87,0.22)] transition group-hover:border-white',
        tile.accent,
        isActive ? 'ring-4 ring-rose-300 ring-offset-4 ring-offset-[#e4f4f5]' : '',
      ]"
    />
    <span
      class="clip-hex absolute inset-[10px] border border-white/45 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,.7),transparent_24%)]"
    />
    <span class="absolute inset-0 grid place-items-center pt-1 text-center text-slate-800">
      <span>
        <span
          class="mx-auto mb-1 grid h-9 w-9 place-items-center rounded-full border border-white/70 bg-white/55 text-lg shadow-sm"
        >
          {{ tile.icon }}
        </span>
        <span class="block font-serif text-lg font-bold tracking-tight">{{ tile.title }}</span>
        <span
          class="mt-0.5 block text-[10px] font-bold tracking-[0.18em] text-slate-700/70 uppercase"
        >
          {{ tile.eyebrow }}
        </span>
      </span>
    </span>
  </button>
</template>
