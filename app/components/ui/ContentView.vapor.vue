<script setup lang="ts">
import { type Component } from 'vue'

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

const CONTENT_VIEW_COMPONENTS: Partial<Record<string, Component>> = {
  about: AboutView,
  skills: SkillView,
  projects: ProjectView,
}

/** Props */
interface Props {
  data: HexModalData
}
const props = defineProps<Props>()

/** Composables */
const { closeModal } = useHexModal()
const { tt } = useAppI18n()

/** Computed Properties */
const computedCurrentMeta = computed<ContentMeta>(() => {
  const matchedMeta = CONTENT_META[props.data.type]

  return matchedMeta ?? DEFAULT_CONTENT_META
})

const computedActiveView = computed<Component | null>(() => {
  return CONTENT_VIEW_COMPONENTS[props.data.type] ?? null
})
</script>

<template>
  <section
    class="relative flex flex-col overflow-hidden bg-linear-to-br from-white via-slate-50/85 to-sky-50/60"
  >
    <div class="relative space-y-3 px-4 py-4 sm:px-5">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 class="text-2xl leading-tight font-black tracking-wide text-slate-800 md:text-3xl">
            {{ tt(`content_title.${data.title}`) }}
          </h2>
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
    </div>

    <div class="relative min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
      <component :is="computedActiveView" />
    </div>
  </section>
</template>
