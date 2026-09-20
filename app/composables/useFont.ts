import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js'
import { Font } from 'three/examples/jsm/loaders/FontLoader.js'

/** Shallow Ref Properties */
const shallowRefFontData = shallowRef<Font | null>(null)

/**
 * Composable for managing the state of a hex modal,
 * including opening and closing the modal and storing the active data.
 */
export const useFont = () => {
  const loadFont = async (path: string) => {
    const loader = new TTFLoader()
    const json = await loader.loadAsync(path)
    shallowRefFontData.value = new Font(json)
  }

  return {
    font: shallowRefFontData,
    loadFont,
  }
}
