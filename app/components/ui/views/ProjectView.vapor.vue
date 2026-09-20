<script setup lang="ts">
/** Components */
import Carousel from '~/components/shared/Carousel.vapor.vue'

/** Interfaces */
interface ProjectItem {
  title: string
  link?: {
    href: string
    title: string
  }
  desc: string
  tag: string
  covers?: string[]
}

/** Constant Data */
const PROJECTS: ProjectItem[] = [
  {
    title: 'profile.title',
    link: {
      href: 'https://hiwici.github.io/nuxt-profile/',
      title: 'Nuxt Profile',
    },
    desc: 'profile.desc',
    tag: 'profile.tag',
    covers: [
      'images/profile/index_light.png',
      'images/profile/index_dark.png',
      'images/profile/skills_light_preview.png',
      'images/profile/app_light_codeview.png',
      'images/profile/readme_light.png',
    ],
  },
]

/** Composables */
const { tt } = useAppI18n()
</script>

<template>
  <!-- <div class="relative grid grid-cols-1 gap-4"> -->
  <article
    v-for="(project, projectIndex) in PROJECTS"
    :key="'project-' + projectIndex"
    class="group rounded-xl border border-slate-200/80 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
  >
    <div class="flex items-center justify-between gap-x-2 p-4">
      <h2 class="line-clamp-1 text-lg font-black text-slate-800 sm:text-xl">
        {{ tt(`content.projects.${project.title}`) }}
      </h2>
      <span
        class="shrink-0 rounded-md border border-sky-200 bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700"
      >
        {{ tt(`content.projects.${project.tag}`) }}
      </span>
    </div>

    <div class="relative">
      <Carousel
        v-if="project.covers && project.covers.length > 0"
        :images="project.covers"
        :alt="tt(`content.projects.${project.title}`)"
        :auto-play="project.covers.length > 1"
        :show-arrows="project.covers.length > 1"
        :show-indicators="project.covers.length > 1"
      />
    </div>

    <div class="space-y-2 p-4">
      <a
        v-if="project.link"
        :href="project.link.href"
        target="_blank"
        rel="noopener noreferrer"
        class="leading-relaxed text-blue-500 underline hover:text-blue-400 sm:text-lg"
      >
        {{ project.link.title }}
      </a>

      <p class="text-xs leading-relaxed font-medium text-slate-500">
        {{ tt(`content.projects.${project.desc}`) }}
      </p>

      <div
        class="h-1 w-full rounded-full bg-linear-to-r from-sky-400 to-cyan-500 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>
  </article>
  <!-- </div> -->
</template>
