<script setup lang="ts">
/** Components */
import Select from '~/components/shared/Select.vapor.vue'

/** Stores */
const localeStore = useLocaleStore()
const timeStore = useTimeStore()

/** Composables */
const { setTimeOfDay } = useTimeOfDay()
const { tt } = useAppI18n()

/** Ref Properties */
const refSelectedLanguage = ref<LocaleCode>(localeStore.locale)
const refSelectedTimeOfDay = ref<TimeMode>(timeStore.time)

/** Watchers */
watch(refSelectedLanguage, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    localeStore.setLocale(newValue)
  }
})
watch(refSelectedTimeOfDay, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    setTimeOfDay(newValue)
  }
})
</script>

<template>
  <div
    class="fixed top-6 right-6 z-50 flex h-10 items-center gap-x-4 rounded-full border border-white/40 bg-white/70 px-1 shadow-lg backdrop-blur-md select-none"
  >
    <div class="ml-3 flex items-center gap-x-2">
      <div class="text-xs font-bold text-slate-700">{{ tt('Language') }}</div>
      <Select v-model="refSelectedLanguage" id="language" :options="localeStore.options()" />
    </div>
    <div class="flex items-center gap-x-2">
      <div class="text-xs font-bold text-slate-700">{{ tt('Time') }}</div>
      <Select
        v-model="refSelectedTimeOfDay"
        id="time-of-day"
        :options="timeStore.options()"
        transPrefix="time"
      />
    </div>
  </div>
</template>
