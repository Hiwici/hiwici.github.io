export default defineNuxtPlugin(() => {
  // Only run this code on the server during the initial app setup
  if (import.meta.server) {
    // Initialize the app store
    const mapStore = useMapStore()
    mapStore.init()
  }
})
