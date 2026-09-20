<script setup lang="ts">
/** Props */
interface Props {
  id: string
  options: Option[]
  trackBy?: keyof Option
  labelBy?: keyof Option
  transPrefix?: string
}
const props = withDefaults(defineProps<Props>(), {
  trackBy: 'value',
  labelBy: 'label',
})

/** Composables */
const { tt } = useAppI18n()

/** Models */
const model = defineModel<string>()

/** Template Ref Properties */
const templateRefSelect = useTemplateRef<HTMLElement | null>(`select-${props.id}`)

/** Ref Properties */
const refSelected = ref<Option | null>(
  props.options?.find((option) => option[props.trackBy] === model.value) || null,
)
const refIsOpen = ref(false)

/**
 * Handles the opening and closing of the select menu.
 */
const handleMenuOpen = () => {
  refIsOpen.value = !refIsOpen.value
}

/**
 * Handles the selection of an option from the select menu.
 */
const handleOptionSelect = (option: Option) => {
  refSelected.value = option
  model.value = props.trackBy ? option[props.trackBy] : option.value
  refIsOpen.value = false
}
/**
 * Handles clicks outside the select component to close the menu.
 */
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node | null
  if (!target) return
  if (!templateRefSelect.value?.contains(target)) {
    refIsOpen.value = false
  }
}

/** Lifecycle Hooks */
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div :ref="`select-${props.id}`" class="relative grid gap-y-2 rounded-full">
    <button
      type="button"
      class="flex min-w-20 cursor-pointer items-center justify-between gap-x-2 rounded-full border border-white/60 bg-white/80 px-2 text-sm font-bold text-slate-900 transition-colors duration-300 outline-none hover:bg-white"
      :aria-expanded="refIsOpen"
      aria-haspopup="listbox"
      @click.stop="handleMenuOpen"
    >
      <span v-if="refSelected">
        {{
          props.transPrefix
            ? tt(`${props.transPrefix}.${refSelected[props.labelBy]}`)
            : refSelected[props.labelBy]
        }}
      </span>
      <span class="text-lg text-slate-500">▾</span>
    </button>

    <!-- <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-120 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    > -->
    <div
      v-if="refIsOpen"
      class="absolute top-[calc(100%+8px)] right-0 z-10 w-full min-w-25 rounded-2xl border border-white/70 bg-white/90 shadow-xl"
      role="listbox"
    >
      <div class="grid gap-y-1 p-1">
        <button
          v-for="option in props.options"
          :key="option.key"
          type="button"
          class="flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-bold transition-all duration-200"
          :class="[
            refSelected?.key === option.key
              ? 'bg-slate-900 text-amber-300'
              : 'text-slate-700 hover:bg-slate-300',
          ]"
          @click="handleOptionSelect(option)"
        >
          <span>{{
            props.transPrefix ? tt(`${props.transPrefix}.${option.label}`) : option.label
          }}</span>
          <span v-if="refSelected?.key === option.key">✓</span>
        </button>
      </div>
    </div>
    <!-- </Transition> -->
  </div>
</template>
