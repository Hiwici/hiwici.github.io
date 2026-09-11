<script setup lang="ts">
/** Props */
interface Props {
  data: TileDetailData
}
const props = withDefaults(defineProps<Props>(), {
  //
})

// Sample skill tree data
const skills = [
  { name: 'Vue 3 / Nuxt 3', level: '90%', color: 'bg-emerald-400' },
  { name: 'TypeScript', level: '85%', color: 'bg-sky-400' },
  { name: 'Three.js / TresJS', level: '75%', color: 'bg-amber-400' },
  { name: 'TailwindCSS', level: '95%', color: 'bg-cyan-400' },
]

// Sample portfolio data
const projects = [
  {
    title: '3D 卡坦島作品集',
    desc: '採用 Nuxt 3 與 TresJS 打造的日系二次元互動網站。',
    tag: '3D Web',
  },
  // { title: 'Anime SaaS 控制台', desc: '動漫風格的全棧數據儀表板系統。', tag: 'Fullstack' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header section -->
    <div class="border-b-2 border-slate-200/80 pb-4">
      <h2 class="text-2xl font-black tracking-wide text-slate-800 md:text-3xl">
        {{ data.title }}
      </h2>
      <p class="mt-1 text-sm font-bold text-sky-600">{{ data.subtitle }}</p>
    </div>

    <!-- Case A: About -->
    <div
      v-if="data.type === 'about'"
      class="space-y-4 text-sm leading-relaxed font-medium text-slate-600"
    >
      <p>👋 哈囉！我是前端工程師，熱衷於將 WebGL / 3D 視覺互動體驗融入網頁設計中。</p>
      <p>
        喜歡探索 Vue 3 生態系與 Three.js 互動動畫，目標是打造出令人印象深刻且富有趣味性的數位產品。
      </p>

      <div class="grid grid-cols-2 gap-3 pt-2">
        <div class="rounded-2xl border border-sky-100 bg-sky-50 p-3">
          <span class="block text-xs font-black text-sky-500">📍 居住地</span>
          <span class="text-sm font-bold text-slate-700">Taipei, Taiwan</span>
        </div>
        <div class="rounded-2xl border border-amber-100 bg-amber-50 p-3">
          <span class="block text-xs font-black text-amber-500">🎮 興趣</span>
          <span class="text-sm font-bold text-slate-700">遊戲、動漫、程式設計</span>
        </div>
      </div>
    </div>

    <!-- Case B: Skills -->
    <div v-else-if="data.type === 'skills'" class="space-y-4">
      <div v-for="skill in skills" :key="skill.name" class="space-y-1.5">
        <div class="flex justify-between text-xs font-black text-slate-700">
          <span>{{ skill.name }}</span>
          <span>{{ skill.level }}</span>
        </div>
        <div
          class="h-3 w-full overflow-hidden rounded-full border border-slate-200 bg-slate-100 p-0.5"
        >
          <div
            class="h-full rounded-full transition-all duration-1000"
            :class="skill.color"
            :style="{ width: skill.level }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Case C: Projects -->
    <div v-else-if="data.type === 'projects'" class="grid grid-cols-1 gap-4">
      <div
        v-for="p in projects"
        :key="p.title"
        class="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 shadow-sm transition-all duration-200 hover:border-sky-400 hover:shadow-md"
      >
        <div class="mb-1 flex items-center justify-between">
          <h4 class="font-black text-slate-800">{{ p.title }}</h4>
          <span class="rounded-md bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700">
            {{ p.tag }}
          </span>
        </div>
        <p class="text-xs font-medium text-slate-500">{{ p.desc }}</p>
      </div>
    </div>

    <!-- Case D: Contact -->
    <div v-else-if="data.type === 'contact'" class="space-y-3">
      <a
        href="https://github.com"
        target="_blank"
        class="flex items-center justify-between rounded-2xl bg-slate-900 p-4 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-800"
      >
        <span>🐙 GitHub Profile</span>
        <span>→</span>
      </a>
      <a
        href="mailto:example@gmail.com"
        class="flex items-center justify-between rounded-2xl bg-sky-500 p-4 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-sky-600"
      >
        <span>✉️ Email Me</span>
        <span>→</span>
      </a>
    </div>
  </div>
</template>
