<script setup lang="ts">
import { computed } from 'vue'

/** Components */
import AboutView from './views/AboutView.vapor.vue'
import SkillView from './views/SkillView.vapor.vue'
import ProjectView from './views/ProjectView.vapor.vue'

/** Interfaces */
interface ContentMeta {
  chip: string
  accentClass: string
  glowClass: string
}

/** Constant Data */
const DEFAULT_CONTENT_META: ContentMeta = {
  chip: 'PROFILE',
  accentClass: 'from-cyan-400 to-sky-500',
  glowClass: 'bg-cyan-200/30',
}

const CONTENT_META: Partial<Record<string, ContentMeta>> = {
  about: {
    ...DEFAULT_CONTENT_META,
  },
  skills: {
    chip: 'STACK',
    accentClass: 'from-emerald-400 to-teal-500',
    glowClass: 'bg-emerald-200/30',
  },
  projects: {
    chip: 'WORK',
    accentClass: 'from-amber-400 to-orange-500',
    glowClass: 'bg-amber-200/30',
  },
}

/** Props */
interface Props {
  data: HexModalData
}
const props = withDefaults(defineProps<Props>(), {
  //
})

/** Composables */
const { closeModal } = useHexModal()
const { tt } = useAppI18n()

/** Computed Properties */
const computedCurrentMeta = computed<ContentMeta>(() => {
  const matchedMeta = CONTENT_META[props.data.type]

  return matchedMeta ?? DEFAULT_CONTENT_META
})
</script>

<template>
  <section
    class="relative overflow-hidden rounded-4xl border border-slate-200/80 bg-linear-to-br from-white via-slate-50/85 to-sky-50/60 shadow-[0_18px_42px_-26px_rgba(15,23,42,0.45)] backdrop-blur-sm"
  >
    <div
      class="pointer-events-none absolute -top-12 -left-14 h-40 w-40 rounded-full blur-3xl"
      :class="computedCurrentMeta.glowClass"
    />
    <div
      class="pointer-events-none absolute -right-10 -bottom-14 h-36 w-36 rounded-full bg-white/70 blur-3xl"
    />

    <div class="relative flex flex-col">
      <header class="space-y-3 px-4 py-4 sm:px-5">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 class="text-2xl leading-tight font-black tracking-wide text-slate-800 md:text-3xl">
              {{ tt(`content_title.${data.title}`) }}
            </h2>
            <!-- <p v-if="data.subtitle" class="mt-1 text-sm leading-relaxed font-bold text-slate-500">
              {{ data.subtitle }}
            </p> -->
          </div>

          <div class="flex items-center gap-x-4">
            <span
              class="inline-flex items-center rounded-full border border-white/80 bg-white/80 px-3 py-1 text-[10px] font-black tracking-[0.14em] text-slate-600 shadow-sm"
            >
              {{ tt(`content_chip.${computedCurrentMeta.chip}`) }}
            </span>
            <button
              class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/75 bg-white/82 text-base font-black text-slate-600 shadow-md backdrop-blur-sm transition-all duration-250 hover:rotate-90 hover:border-rose-300 hover:bg-rose-500 hover:text-white"
              aria-label="Close modal"
              @click="closeModal()"
            >
              ✕
            </button>
          </div>
        </div>

        <div
          class="h-1.5 w-full rounded-full bg-linear-to-r opacity-80"
          :class="computedCurrentMeta.accentClass"
        />
      </header>

      <div class="relative max-h-0 flex-1 overflow-y-auto p-4 sm:p-5 md:max-h-[88vh]">
        <AboutView v-if="data.type === 'about'" />
        <SkillView v-else-if="data.type === 'skills'" />
        <ProjectView v-else-if="data.type === 'projects'" />
      </div>
    </div>
  </section>
</template>
