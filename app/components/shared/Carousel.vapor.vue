<script setup lang="ts">
/** Props */
interface Props {
  images: string[]
  alt?: string
  autoPlay?: boolean
  interval?: number
  showArrows?: boolean
  showIndicators?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  alt: 'carousel image',
  autoPlay: true,
  interval: 4000,
  showArrows: true,
  showIndicators: true,
})

/** Ref Properties */
const refActiveIndex = ref(0)
const refTouchStartX = ref<number | null>(null)
const refIsHover = ref(false)
const refAutoPlayTimer = ref<ReturnType<typeof setInterval> | null>(null)

/** Computed Properties */
const computedImages = computed(() => {
  return props.images?.filter((image) => Boolean(image)) || []
})
const computedHasImages = computed(() => {
  return computedImages.value.length > 0
})
const computedHasMultiple = computed(() => {
  return computedImages.value.length > 1
})
const computedTrackStyle = computed(() => {
  return {
    transform: `translateX(-${refActiveIndex.value * 100}%)`,
  }
})

/**
 * Clears the existing auto-play timer if it exists.
 */
const clearAutoPlay = () => {
  if (!refAutoPlayTimer.value) return
  clearInterval(refAutoPlayTimer.value)
  refAutoPlayTimer.value = null
}

/**
 * Initializes the auto-play timer if conditions are met.
 */
const initAutoPlay = () => {
  clearAutoPlay()

  if (!props.autoPlay || !computedHasMultiple.value || refIsHover.value) return

  refAutoPlayTimer.value = setInterval(() => {
    handleNext()
  }, props.interval)
}

/**
 * Handles user interactions such as navigation and touch events.
 */ 
const handlePrev = () => {
  if (!computedHasMultiple.value) return
  const total = computedImages.value.length
  refActiveIndex.value = (refActiveIndex.value - 1 + total) % total
}

/**
 * Handles navigation to the next image in the carousel.
 */
const handleNext = () => {
  if (!computedHasMultiple.value) return
  const total = computedImages.value.length
  refActiveIndex.value = (refActiveIndex.value + 1) % total
}

/**
 * Handles navigation to a specific image in the carousel.
 */
const handleGoTo = (index: number) => {
  if (!computedHasMultiple.value) return
  refActiveIndex.value = index
}

/**
 * Handles keyboard navigation for the carousel.
 */
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    handlePrev()
  }

  if (event.key === 'ArrowRight') {
    handleNext()
  }
}

/**
 * Handles the start of a touch event for swipe navigation.
 */
const handleTouchStart = (event: TouchEvent) => {
  refTouchStartX.value = event.touches[0]?.clientX ?? null
}

/**
 * Handles the end of a touch event for swipe navigation.
 */
const handleTouchEnd = (event: TouchEvent) => {
  if (refTouchStartX.value === null) return

  const touchEndX = event.changedTouches[0]?.clientX ?? refTouchStartX.value
  const deltaX = touchEndX - refTouchStartX.value

  if (Math.abs(deltaX) > 40) {
    if (deltaX < 0) {
      handleNext()
    } else {
      handlePrev()
    }
  }

  refTouchStartX.value = null
}

/**
 * Handles the mouse entering the carousel area.
 */
const handleMouseEnter = () => {
  refIsHover.value = true
}

/**
 * Handles the mouse leaving the carousel area.
 */
const handleMouseLeave = () => {
  refIsHover.value = false
}

/** Watchers */
watch(
  () => [props.autoPlay, props.interval, computedImages.value.length, refIsHover.value],
  () => {
    if (refActiveIndex.value >= computedImages.value.length) {
      refActiveIndex.value = 0
    }

    initAutoPlay()
  },
  {
    immediate: true,
  },
)

/** onBeforeUnmount Hook */
onBeforeUnmount(() => {
  clearAutoPlay()
})
</script>

<template>
  <div
    class="group/carousel relative overflow-hidden"
    tabindex="0"
    @keydown="handleKeydown"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
  >
    <div
      v-if="computedHasImages"
      class="flex h-full w-full transition-transform duration-500 ease-out"
      :style="computedTrackStyle"
    >
      <div
        v-for="(image, imageIndex) in computedImages"
        :key="`${image}-${imageIndex}`"
        class="w-full shrink-0"
      >
        <img
          :src="image"
          :alt="`${props.alt} ${imageIndex + 1}`"
          class="aspect-16/8 w-full"
          loading="lazy"
          draggable="false"
        />
      </div>
    </div>

    <div
      v-else
      class="flex aspect-16/8 items-center justify-center bg-slate-100 text-xs font-bold tracking-wide text-slate-400"
    >
      No image
    </div>

    <template v-if="computedHasMultiple">
      <button
        v-if="props.showArrows"
        type="button"
        class="absolute top-1/2 left-3 z-10 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/80 text-slate-700 opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover/carousel:opacity-100 hover:bg-white"
        aria-label="Previous slide"
        @click="handlePrev"
      >
        <span class="text-2xl" aria-hidden="true">‹</span>
      </button>

      <button
        v-if="props.showArrows"
        type="button"
        class="absolute top-1/2 right-3 z-10 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/80 text-slate-700 opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover/carousel:opacity-100 hover:bg-white"
        aria-label="Next slide"
        @click="handleNext"
      >
        <span class="text-2xl" aria-hidden="true">›</span>
      </button>

      <div
        v-if="props.showIndicators"
        class="absolute right-0 bottom-3 left-0 z-10 flex items-center justify-center gap-1.5"
      >
        <button
          v-for="(image, imageIndex) in computedImages"
          :key="`dot-${image}-${imageIndex}`"
          type="button"
          class="h-3 cursor-pointer rounded-full transition-all duration-300"
          :class="[
            imageIndex === refActiveIndex
              ? 'w-8 bg-gray-400 shadow'
              : 'w-3 bg-gray-200 hover:bg-gray-300',
          ]"
          :aria-label="`Go to slide ${imageIndex + 1}`"
          @click="handleGoTo(imageIndex)"
        />
      </div>
    </template>
  </div>
</template>
