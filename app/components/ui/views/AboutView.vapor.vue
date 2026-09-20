<script setup lang="ts">
/** Constant Data */
const ABOUT_HIGHLIGHTS = [
  {
    titleKey: 'content.about.Daily',
    contentKey: 'content.about.daily',
    icon: 'DAY',
    accentClass: 'from-cyan-400 to-sky-500',
    cardClass: 'border-cyan-200/70 bg-cyan-50/70',
  },
  {
    titleKey: 'content.about.Hobbie',
    contentKey: 'content.about.hobbies',
    icon: 'FUN',
    accentClass: 'from-amber-400 to-orange-500',
    cardClass: 'border-amber-200/70 bg-amber-50/80',
  },
]

/** Composables */
const { tt } = useAppI18n()
</script>

<template>
  <section
    class="relative overflow-hidden rounded-xl border border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur-sm sm:p-5"
  >
    <div
      class="pointer-events-none absolute -top-14 -right-12 h-36 w-36 rounded-full bg-cyan-200/25 blur-2xl"
    />
    <div
      class="pointer-events-none absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-amber-200/25 blur-2xl"
    />

    <div class="relative space-y-4">
      <div class="space-y-2 text-sm leading-relaxed font-medium text-slate-600">
        <p class="text-slate-700">{{ tt('content.about.greeting') }}</p>
        <p>{{ tt('content.about.introduction') }}</p>
      </div>

      <div class="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
        <article
          v-for="(highlight, highlightIndex) in ABOUT_HIGHLIGHTS"
          :key="'about-highlight-' + highlightIndex"
          class="group grid rounded-2xl border p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          :class="highlight.cardClass"
        >
          <div class="mb-2 flex items-center gap-2">
            <span
              class="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-linear-to-br px-1.5 text-[10px] font-black tracking-wider text-white"
              :class="highlight.accentClass"
            >
              {{ highlight.icon }}
            </span>
            <h3 class="text-xs font-black text-slate-700">
              {{ tt(highlight.titleKey) }}
            </h3>
          </div>

          <p class="mb-3 text-sm font-bold text-slate-700">
            {{ tt(highlight.contentKey) }}
          </p>

          <div
            class="mt-auto h-1 w-full rounded-full bg-linear-to-r opacity-75 transition-opacity duration-300 group-hover:opacity-100"
            :class="highlight.accentClass"
          />
        </article>
      </div>
    </div>
  </section>
</template>
