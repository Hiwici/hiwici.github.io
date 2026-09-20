export default defineNuxtPlugin(async () => {
  // Only run this code on the server during the initial app setup
  if (import.meta.server) {
    // Initialize the app store
    const mapStore = useMapStore()
    mapStore.init()

    // Initialize the locale store
    const localeStore = useLocaleStore()
    localeStore.init()

    // Initialize the time store
    const timeStore = useTimeStore()
    timeStore.init()
  }
})
