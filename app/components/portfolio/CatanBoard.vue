<script setup lang="ts">
import type { PortfolioTile } from '~/data/portfolio'
import CatanHexTile from '~/components/portfolio/CatanHexTile.vue'

interface Props {
  activeId: string
  targetId: string
  tiles: PortfolioTile[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  arrive: [tile: PortfolioTile]
  select: [tile: PortfolioTile]
}>()

const refRotation = ref(-8)
const refScale = ref(1)
const refIsDragging = ref(false)
const refStartPointerX = ref(0)
const refStartRotation = ref(0)
const refArrivalTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const computedTargetTile = computed(
  () => props.tiles.find((tile) => tile.id === props.targetId) ?? props.tiles[0],
)
const computedIsTraveling = computed(() => props.targetId !== props.activeId)
const computedBoardStyle = computed(() => ({
  transform: `scale(${refScale.value}) rotate(${refRotation.value}deg)`,
}))
const computedCharacterStyle = computed(() => ({
  transform: `translate(calc(${computedTargetTile.value.x * 170}px - 50%), calc(${computedTargetTile.value.y * 146}px - 50%))`,
}))

const updateScale = (value: number) => {
  refScale.value = Math.min(1.18, Math.max(0.72, value))
}

const handleSelect = (tile: PortfolioTile) => {
  if (!computedIsTraveling.value && tile.id !== props.activeId) {
    emit('select', tile)
  }
}

const handlePointerDown = (event: PointerEvent) => {
  if (event.button !== 0) return

  refIsDragging.value = true
  refStartPointerX.value = event.clientX
  refStartRotation.value = refRotation.value
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

const handlePointerMove = (event: PointerEvent) => {
  if (!refIsDragging.value) return

  refRotation.value = refStartRotation.value + (event.clientX - refStartPointerX.value) * 0.15
}

const handlePointerUp = () => {
  refIsDragging.value = false
}

const handleWheel = (event: WheelEvent) => {
  updateScale(refScale.value - event.deltaY * 0.0008)
}

watch(
  () => props.targetId,
  (targetId) => {
    if (refArrivalTimer.value) clearTimeout(refArrivalTimer.value)
    if (targetId === props.activeId) return

    refArrivalTimer.value = setTimeout(() => {
      emit('arrive', computedTargetTile.value)
    }, 760)
  },
)

onBeforeUnmount(() => {
  if (refArrivalTimer.value) clearTimeout(refArrivalTimer.value)
})
</script>

<template>
  <section class="relative h-full min-h-[420px] overflow-hidden rounded-[2.5rem] bg-[#dff2f2]">
    <div class="pointer-events-none absolute inset-0 opacity-50">
      <div class="absolute top-8 -left-24 h-52 w-52 rounded-full bg-white/80 blur-3xl" />
      <div class="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-sky-200/70 blur-3xl" />
    </div>

    <div
      class="absolute top-6 left-6 z-30 rounded-2xl bg-white/80 px-4 py-3 shadow-sm backdrop-blur"
    >
      <p class="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">Explorer map</p>
      <p class="mt-1 font-serif text-sm font-bold text-slate-700">Drag to rotate</p>
    </div>

    <div
      class="absolute bottom-6 left-6 z-30 flex items-center gap-2 rounded-2xl bg-white/80 p-2 shadow-sm backdrop-blur"
    >
      <button
        aria-label="Zoom out"
        class="grid h-9 w-9 place-items-center rounded-xl text-lg font-bold text-slate-600 hover:bg-slate-100"
        type="button"
        @click="updateScale(refScale - 0.08)"
      >
        −
      </button>
      <input
        aria-label="Map scale"
        class="h-1 w-20 accent-rose-400"
        :value="refScale"
        max="1.18"
        min="0.72"
        step="0.01"
        type="range"
        @input="updateScale(Number(($event.target as HTMLInputElement).value))"
      />
      <button
        aria-label="Zoom in"
        class="grid h-9 w-9 place-items-center rounded-xl text-lg font-bold text-slate-600 hover:bg-slate-100"
        type="button"
        @click="updateScale(refScale + 0.08)"
      >
        +
      </button>
    </div>

    <div
      class="absolute inset-0 touch-none select-none"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerUp"
      @pointercancel="handlePointerUp"
      @wheel.prevent="handleWheel"
    >
      <div
        class="absolute top-1/2 left-1/2 h-[440px] w-[540px] transition-transform duration-300 ease-out"
        :style="computedBoardStyle"
      >
        <CatanHexTile
          v-for="tile in tiles"
          :key="tile.id"
          :is-active="tile.id === activeId"
          :is-locked="computedIsTraveling"
          :tile="tile"
          @select="handleSelect"
        />

        <div
          class="pointer-events-none absolute top-1/2 left-1/2 z-30 h-20 w-16 transition-transform duration-700 ease-in-out motion-reduce:transition-none"
          :style="computedCharacterStyle"
        >
          <div class="animate-float relative mx-auto h-full w-12">
            <div
              class="absolute top-1 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full border-2 border-slate-700 bg-rose-200"
            />
            <div
              class="absolute top-7 left-1/2 h-10 w-9 -translate-x-1/2 rounded-t-full bg-indigo-500"
            />
            <div class="absolute top-11 left-2 h-6 w-2 rotate-12 rounded-full bg-slate-700" />
            <div class="absolute top-11 right-2 h-6 w-2 -rotate-12 rounded-full bg-slate-700" />
            <div class="absolute bottom-0 left-3 h-6 w-2 rounded-full bg-slate-700" />
            <div class="absolute right-3 bottom-0 h-6 w-2 rounded-full bg-slate-700" />
            <div class="absolute top-0 left-1 h-5 w-10 rounded-[100%] bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
