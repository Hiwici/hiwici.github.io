<script setup lang="ts">
import { Vector3 } from 'three'
import { Html } from '@tresjs/cientos'

/** Props */
interface Props {
  position: [number, number, number]
  title: string
  color?: string
  is_selected?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  color: '#86edac',
  is_selected: false,
})

/** Emits */
const emit = defineEmits<{
  (e: 'click'): void
}>()

/** Ref Properties */
const refIsHover = ref(false)

/** Composables */
const { isOpen } = useTileModal()

/**
 * Handles the pointer enter event on the hexagon. Sets the hover state to true and changes the cursor to a pointer.
 */
const handlePointerEnter = (e: PointerEvent) => {
  // Prevent the click event from propagating to parent elements
  e.stopPropagation()

  refIsHover.value = true
  document.body.style.cursor = 'pointer'
}

/**
 * Handles the pointer leave event on the hexagon. Sets the hover state to false and changes the cursor back to the default.
 */
const handlePointerLeave = () => {
  refIsHover.value = false
  document.body.style.cursor = 'default'
}

/**
 * Handles the click event on the hexagon. Prevents the event from propagating and emits a 'click' event.
 */
const handleClick = (e: PointerEvent) => {
  // Prevent the click event from propagating to parent elements
  e.stopPropagation()

  emit('click')
}

/** Computed Properties */
const computedGroupPosition = computed(() => {
  return new Vector3(...props.position)
})
const computedMeshHexPosition = computed(() => {
  return new Vector3(0, 0, 0)
  // return new Vector3(0, refIsHover.value || props.is_selected ? 0.3 : 0, 0)
})
const computedShouldShowTitle = computed(() => {
  return !isOpen.value
})
</script>

<template>
  <TresGroup :position="computedGroupPosition">
    <!-- Hexagonal base body -->
    <TresMesh
      :position="computedMeshHexPosition"
      :rotation="[0, Math.PI, 0]"
      cast-shadow
      receive-shadow
      @pointerenter="handlePointerEnter"
      @pointerleave="handlePointerLeave"
      @click="handleClick"
    >
      <!-- Args: [Top radius, bottom radius, height, number of sides] -->
      <TresCylinderGeometry :args="[2, 2, 0.6, 6]" />
      <TresMeshToonMaterial
        :color="props.is_selected ? '#facc15' : refIsHover ? '#38bdf8' : props.color"
      />
    </TresMesh>

    <!-- 3D Floating Title -->
    <Html
      v-if="computedShouldShowTitle"
      :position="[0, refIsHover || props.is_selected ? 1.5 : 1.2, 0]"
      center
      transform
      :distance-factor="10"
    >
      <div
        class="pointer-events-none rounded-full border-2 px-3 py-1 text-xs font-bold whitespace-nowrap shadow-md transition-all duration-200 select-none"
        :class="[
          props.is_selected
            ? 'scale-110 border-amber-600 bg-amber-400 text-slate-900'
            : refIsHover
              ? 'scale-105 border-sky-600 bg-sky-400 text-white'
              : 'border-slate-300 bg-white/90 text-slate-700',
        ]"
      >
        {{ title }}
      </div>
    </Html>
  </TresGroup>
</template>
