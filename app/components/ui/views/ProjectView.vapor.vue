<script setup lang="ts">
/** Interfaces */
interface ProjectItem {
  title: string
  desc: string
  tag: string
  cover?: string
}

/** Constant Data */
const PROJECTS: ProjectItem[] = [
  {
    title: 'catan.title',
    desc: 'catan.desc',
    tag: 'catan.tag',
    cover: '',
  },
  {
    title: 'profile.title',
    desc: 'profile.desc',
    tag: 'profile.tag',
    cover: '',
  },
  {
    title: 'component_lib.title',
    desc: 'component_lib.desc',
    tag: 'component_lib.tag',
    cover: '',
  },
]

/** Composables */
const { tt } = useAppI18n()
</script>

<template>
  <section
    class="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur-sm sm:p-5"
  >
    <div
      class="pointer-events-none absolute -top-12 -left-14 h-36 w-36 rounded-full bg-sky-200/30 blur-2xl"
    />
    <div
      class="pointer-events-none absolute -right-10 -bottom-16 h-40 w-40 rounded-full bg-amber-200/20 blur-2xl"
    />

    <div class="relative grid grid-cols-1 gap-4">
      <article
        v-for="(project, projectIndex) in PROJECTS"
        :key="'project-' + projectIndex"
        class="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
      >
        <div class="relative">
          <img
            v-if="project.cover"
            :src="project.cover"
            :alt="tt(`content.projects.${project.title}`)"
            class="aspect-16/8 w-full object-cover"
          />
          <div
            v-else
            class="relative flex aspect-16/8 w-full items-end overflow-hidden bg-linear-to-br from-slate-100 via-sky-100/75 to-amber-100/85 p-3"
          >
            <div class="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-white/60 blur-xl" />
            <div class="absolute -bottom-10 left-8 h-24 w-24 rounded-full bg-sky-200/50 blur-xl" />
            <span
              class="relative rounded-md border border-white/70 bg-white/80 px-2 py-1 text-[10px] font-black tracking-wider text-slate-500"
            >
              {{ tt(`content.projects.${project.title}.image_soon`) }}
            </span>
          </div>
        </div>

        <div class="space-y-2 p-4">
          <div class="flex items-center justify-between gap-2">
            <h4 class="line-clamp-1 text-sm font-black text-slate-800 sm:text-base">
              {{ tt(`content.projects.${project.title}`) }}
            </h4>
            <span
              class="shrink-0 rounded-md border border-sky-200 bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700"
            >
              {{ tt(`content.projects.${project.tag}`) }}
            </span>
          </div>

          <p class="text-xs leading-relaxed font-medium text-slate-500">
            {{ tt(`content.projects.${project.desc}`) }}
          </p>

          <div
            class="h-1 w-full rounded-full bg-linear-to-r from-sky-400 to-cyan-500 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
      </article>
    </div>
  </section>
</template>
