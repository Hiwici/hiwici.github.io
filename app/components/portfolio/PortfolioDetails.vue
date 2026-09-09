<script setup lang="ts">
import type { PortfolioTile } from '~/data/portfolio'

interface Props {
  tile: PortfolioTile
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <aside
    class="relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[2.5rem] bg-slate-900 p-7 text-white sm:p-10"
  >
    <div
      :class="[
        'absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br opacity-35 blur-2xl',
        tile.accent,
      ]"
    />
    <div class="relative flex items-start justify-between gap-4">
      <div>
        <p class="text-xs font-bold tracking-[0.24em] text-rose-200 uppercase">
          {{ tile.eyebrow }}
        </p>
        <h2 class="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          {{ tile.title }}
        </h2>
      </div>
      <button
        aria-label="Close details"
        class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-xl text-white/80 transition hover:bg-white/10 hover:text-white"
        type="button"
        @click="emit('close')"
      >
        ×
      </button>
    </div>

    <p class="relative mt-8 max-w-lg text-lg leading-8 text-slate-200">{{ tile.introduction }}</p>

    <div class="relative mt-8 space-y-4">
      <article
        v-for="(highlight, index) in tile.highlights"
        :key="highlight"
        class="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
      >
        <span
          class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rose-300 text-xs font-bold text-slate-900"
        >
          0{{ index + 1 }}
        </span>
        <p class="pt-0.5 text-sm leading-6 text-slate-200">{{ highlight }}</p>
      </article>
    </div>

    <div class="relative mt-auto pt-8">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in tile.tags"
          :key="tag"
          class="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85"
        >
          {{ tag }}
        </span>
      </div>
      <button
        v-if="tile.cta"
        class="mt-6 rounded-full bg-rose-300 px-5 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-rose-200"
        type="button"
      >
        {{ tile.cta }} →
      </button>
    </div>
  </aside>
</template>
