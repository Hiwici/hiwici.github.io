/**
 * A Pinia store for managing the time state of the application.
 *
 * @store useTimeStore
 */
export const useTimeStore = defineStore('time', {
  state: () => ({
    time: 'day' as TimeMode,
  }),
  getters: {
    getTime: (state) => state.time,
  },
  actions: {
    /**
     * Initializes the time of the application. This should be called on app startup
     */
    init() {
      this.loadTime()
    },

    /**
     * Loads the time from cookies or defaults to 'day' if no cookie is set.
     */
    loadTime() {
      const savedTime = useCookie('hiwici.github.io-time').value
      this.time = (savedTime as TimeMode) || 'day'
    },

    /**
     * Sets the time and saves it to cookies.
     */
    setTime(time: TimeMode) {
      this.time = time
      useCookie('hiwici.github.io-time').value = time
    },

    /**
     * Gets the available time options for the application.
     */
    options(): Option[] {
      return [
        { key: 'time-day', label: 'day', value: 'day' },
        { key: 'time-sunset', label: 'sunset', value: 'sunset' },
        { key: 'time-night', label: 'night', value: 'night' },
      ]
    },
  },
})
