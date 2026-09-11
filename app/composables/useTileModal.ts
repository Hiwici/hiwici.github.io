/** Interfaces */
export interface TileDetailData {
  id: string
  title: string
  subtitle: string
  type: 'about' | 'skills' | 'projects' | 'contact'
  badgeText: string
  characterQuote: string
  expression: 'happy' | 'cheer' | 'think' | 'welcome'
}

/** Ref Properties */
const refIsOpen = ref(false)
const refActiveData = ref<TileDetailData | null>(null)

export const useTileModal = () => {
  const openModal = (data: TileDetailData) => {
    refActiveData.value = data
    refIsOpen.value = true
  }

  const closeModal = () => {
    refIsOpen.value = false
  }

  return {
    isOpen: refIsOpen,
    activeData: refActiveData,
    openModal,
    closeModal,
  }
}
