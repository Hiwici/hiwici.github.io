<script setup lang="ts">
/** Interfaces */
interface SkillGroup {
  key: 'frontend' | 'backend' | 'framework' | 'devops'
  icon: string
  accentClass: string
  bgClass: string
  chipClass: string
  items: string[]
}

/** Constant Data */
const SKILL_GROUPS: SkillGroup[] = [
  {
    key: 'frontend',
    icon: 'UI',
    accentClass: 'from-cyan-400 to-sky-500',
    bgClass: 'bg-cyan-50/70 border-cyan-200/70',
    chipClass: 'border-cyan-200 bg-cyan-100/90 text-cyan-800 hover:bg-cyan-200/90',
    items: ['Vue', 'React', 'TypeScript', 'TailwindCSS'],
  },
  {
    key: 'backend',
    icon: 'API',
    accentClass: 'from-emerald-400 to-teal-500',
    bgClass: 'bg-emerald-50/70 border-emerald-200/70',
    chipClass: 'border-emerald-200 bg-emerald-100/90 text-emerald-800 hover:bg-emerald-200/90',
    items: ['PHP', 'Python'],
  },
  {
    key: 'framework',
    icon: 'FX',
    accentClass: 'from-amber-400 to-orange-500',
    bgClass: 'bg-amber-50/70 border-amber-200/70',
    chipClass: 'border-amber-200 bg-amber-100/90 text-amber-800 hover:bg-amber-200/90',
    items: ['Nuxt.js', 'Next.js', 'Laravel', 'Django', 'Flask'],
  },
  {
    key: 'devops',
    icon: 'OPS',
    accentClass: 'from-fuchsia-400 to-rose-500',
    bgClass: 'bg-rose-50/70 border-rose-200/70',
    chipClass: 'border-rose-200 bg-rose-100/90 text-rose-800 hover:bg-rose-200/90',
    items: ['Docker', 'CI/CD Pipeline', 'AWS (EC2, S3)', 'Git'],
  },
]

/** Composables */
const { tt } = useAppI18n()
</script>

<template>
  <section
    class="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-5"
  >
    <div
      class="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full bg-cyan-200/25 blur-2xl"
    />
    <div
      class="pointer-events-none absolute -right-12 -bottom-16 h-36 w-36 rounded-full bg-amber-200/30 blur-2xl"
    />

    <div class="relative grid grid-cols-1 gap-3 md:grid-cols-2">
      <article
        v-for="(group, groupIndex) in SKILL_GROUPS"
        :key="'skill-' + group.key"
        class="group rounded-2xl border p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        :class="group.bgClass"
      >
        <header class="mb-3 flex items-center justify-between gap-2">
          <div class="flex min-w-0 items-center gap-2.5">
            <span
              class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br text-[11px] font-black tracking-wide text-white"
              :class="group.accentClass"
            >
              {{ group.icon }}
            </span>
            <h2 class="truncate text-sm font-black text-slate-800 sm:text-base">
              {{ tt(`content.skills.${group.key}`) }}
            </h2>
          </div>
          <span class="rounded-md bg-white/70 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
            {{ group.items.length }}
          </span>
        </header>

        <ul class="flex flex-wrap gap-1.5">
          <li
            v-for="skill in group.items"
            :key="skill"
            class="rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors duration-200"
            :class="group.chipClass"
          >
            {{ skill }}
          </li>
        </ul>

        <div
          class="mt-3 h-1 w-full rounded-full bg-linear-to-r opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          :class="group.accentClass"
        />
      </article>
    </div>
  </section>
</template>
