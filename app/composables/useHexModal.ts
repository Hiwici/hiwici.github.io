/** Ref Properties */
const refIsOpen = ref(false)
const refActiveData = ref<HexModalData | null>(null)

/**
 * Composable for managing the state of a hex modal,
 * including opening and closing the modal and storing the active data.
 */
export const useHexModal = () => {
  const openModal = (data: HexModalData) => {
    refActiveData.value = data
    refIsOpen.value = true
  }

  const closeModal = () => {
    refIsOpen.value = false
    refActiveData.value = null
  }

  return {
    isHexModalOpen: refIsOpen,
    activeData: refActiveData,
    openModal,
    closeModal,
  }
}
