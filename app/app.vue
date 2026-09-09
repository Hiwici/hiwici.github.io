<script setup lang="ts">
import CatanBoard from '~/components/portfolio/CatanBoard.vue'
import PortfolioDetails from '~/components/portfolio/PortfolioDetails.vue'
import { portfolioTiles, type PortfolioTile } from '~/data/portfolio'

const refActiveTileId = ref('about')
const refTargetTileId = ref('about')
const refIsDetailOpen = ref(false)

const computedActiveTile = computed(
  () => portfolioTiles.find((tile) => tile.id === refActiveTileId.value) ?? portfolioTiles[0],
)

const handleSelectTile = (tile: PortfolioTile) => {
  refTargetTileId.value = tile.id
  refIsDetailOpen.value = false
}

const handleCharacterArrival = (tile: PortfolioTile) => {
  refActiveTileId.value = tile.id
  refIsDetailOpen.value = true
}

const handleCloseDetails = () => {
  refIsDetailOpen.value = false
}
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-[#f8f4e9] px-4 py-4 text-slate-800 sm:px-7 sm:py-7">
    <NuxtRouteAnnouncer />
    <div class="mx-auto max-w-[1520px]">
      <header class="mb-5 flex items-center justify-between gap-5 px-3 py-2 sm:px-5">
        <a class="flex items-center gap-3" href="/" aria-label="Catan portfolio home">
          <span
            class="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 font-serif text-xl font-bold text-rose-200"
          >
            H
          </span>
          <span>
            <span class="block font-serif text-lg leading-none font-bold">Hana’s little world</span>
            <span
              class="mt-1 block text-[10px] font-bold tracking-[0.18em] text-slate-500 uppercase"
              >Portfolio map</span
            >
          </span>
        </a>
        <span
          class="hidden rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-500 sm:block"
        >
          Pick a tile to explore
        </span>
      </header>

      <div
        :class="[
          'grid gap-4 transition-all duration-700 ease-out lg:min-h-[calc(100vh-135px)]',
          refIsDetailOpen ? 'lg:grid-cols-[minmax(0,1fr)_minmax(420px,.82fr)]' : 'lg:grid-cols-1',
        ]"
      >
        <section
          :class="[
            'relative overflow-hidden rounded-[2.5rem] border border-white bg-white/55 shadow-[0_30px_80px_rgba(84,105,104,0.12)] backdrop-blur',
            refIsDetailOpen ? '' : 'lg:mx-auto lg:w-full lg:max-w-6xl',
          ]"
        >
          <div class="absolute top-8 left-8 z-20 max-w-xs sm:top-12 sm:left-12">
            <p class="text-xs font-bold tracking-[0.25em] text-rose-500 uppercase">
              A tiny interactive portfolio
            </p>
            <h1
              class="mt-3 font-serif text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl"
            >
              Every tile tells<br />part of my story.
            </h1>
          </div>
          <CatanBoard
            :active-id="refActiveTileId"
            :target-id="refTargetTileId"
            :tiles="portfolioTiles"
            @arrive="handleCharacterArrival"
            @select="handleSelectTile"
          />
          <div
            class="pointer-events-none absolute right-8 bottom-7 z-20 text-right text-xs font-semibold text-slate-500"
          >
            <p>Click a hex to send Hana exploring</p>
            <p class="mt-1 text-slate-400">Use the left mouse button to rotate</p>
          </div>
        </section>

        <Transition name="detail">
          <PortfolioDetails
            v-if="refIsDetailOpen"
            :tile="computedActiveTile"
            @close="handleCloseDetails"
          />
        </Transition>
      </div>
    </div>
  </main>
</template>
