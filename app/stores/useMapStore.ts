/** Interfaces */
interface Biome {
  topColor: string
  baseColor: string
}

/**
 * A Pinia store for managing the map state of the application.
 *
 * @store useMapStore
 */
export const useMapStore = defineStore('map', {
  state: () => ({
    biomes: {} as Record<TerrainType, Biome>,
    hexData: [] as HexData[],
  }),
  getters: {
    getBiomes: (state) => {
      return () => state.biomes
    },
    getBiome: (state) => {
      return (terrainType: TerrainType) => state.biomes[terrainType]
    },
    getHexData: (state) => {
      return () => state.hexData
    },
  },
  actions: {
    /**
     * Initialize the map store, setting up any necessary state or data.
     */
    init() {
      this.initBiomes()
      this.initHexData()
    },

    initBiomes() {
      this.biomes = {
        grass_land: {
          topColor: '#4ade80',
          baseColor: '#854d0e',
        },
        desert_land: {
          topColor: '#fb923c',
          baseColor: '#c2410c',
        },
        snow_land: {
          topColor: '#f8fafc',
          baseColor: '#475569',
        },
        forest_land: {
          topColor: '#15803d',
          baseColor: '#713f12',
        },
      }
    },

    initHexData() {
      this.hexData = [
        /** Ring Center hexes */
        {
          key: 'center',
          q: 0,
          r: 0,
          terrain_type: 'grass_land',
          title: 'Center',
          interactive: false,
          showItem: false,
        },
        /** Ring 1 hexes */
        {
          key: 'hex_0_1',
          q: 0,
          r: 1,
          terrain_type: 'grass_land',
          title: 'Ring (0,1)',
          interactive: false,
        },
        {
          key: 'hex_0_-1',
          q: 0,
          r: -1,
          terrain_type: 'grass_land',
          title: 'Ring (0,-1)',
          interactive: false,
        },
        {
          key: 'hex_1_0',
          q: 1,
          r: 0,
          terrain_type: 'grass_land',
          title: 'Ring (1,0)',
          interactive: false,
        },
        {
          key: 'hex_1_-1',
          q: 1,
          r: -1,
          terrain_type: 'grass_land',
          title: 'Ring (1,-1)',
          interactive: false,
        },
        {
          key: 'hex_-1_0',
          q: -1,
          r: 0,
          terrain_type: 'grass_land',
          title: 'Ring (-1,0)',
          interactive: false,
        },
        {
          key: 'hex_-1_1',
          q: -1,
          r: 1,
          terrain_type: 'grass_land',
          title: 'Ring (-1,1)',
          interactive: false,
        },
        /** Ring 2 hexes */
        // North Ring 2 hexes
        {
          key: 'hex_0_-2',
          q: 0,
          r: -2,
          terrain_type: 'snow_land',
          title: 'Ring (0,-2)',
          interactive: false,
        },
        {
          key: 'hex_1_-2',
          q: 1,
          r: -2,
          terrain_type: 'snow_land',
          title: 'Skills',
          interactive: true,
          type: 'skills',
          showItem: false,
        },
        {
          key: 'hex_2_-2',
          q: 2,
          r: -2,
          terrain_type: 'snow_land',
          title: 'Ring (2,-2)',
          interactive: false,
        },
        // West Ring 2 hexes
        {
          key: 'hex_-1_-1',
          q: -1,
          r: -1,
          terrain_type: 'desert_land',
          title: 'Ring (-1,-1)',
          interactive: false,
        },
        {
          key: 'hex_-2_0',
          q: -2,
          r: 0,
          terrain_type: 'desert_land',
          title: 'About',
          interactive: true,
          type: 'about',
          showItem: false,
        },
        {
          key: 'hex_-2_1',
          q: -2,
          r: 1,
          terrain_type: 'desert_land',
          title: 'Ring (-2,1)',
          interactive: false,
        },
        // East Ring 2 hexes
        {
          key: 'hex_2_0',
          q: 2,
          r: 0,
          terrain_type: 'forest_land',
          title: 'Projects',
          interactive: true,
          type: 'projects',
          showItem: false,
        },
        {
          key: 'hex_2_1',
          q: 2,
          r: -1,
          terrain_type: 'forest_land',
          title: 'Ring (2,1)',
          interactive: false,
        },
        {
          key: 'hex_2_2',
          q: 1,
          r: 1,
          terrain_type: 'forest_land',
          title: 'Ring (2,2)',
          interactive: false,
        },
        // South Ring 2 hexes
        // { key: 'hex_0_2', q: -1, r: 2, terrain_type: 'grass_land', title: 'Ring (0,2)', interactive: false },
        /** Ring 3 hexes */
        // North Ring 3 hexes
        {
          key: 'hex_0_-3',
          q: 0,
          r: -3,
          terrain_type: 'snow_land',
          title: 'Ring (0,-3)',
          interactive: false,
          showFoam: true,
        },
        {
          key: 'hex_1_-3',
          q: 1,
          r: -3,
          terrain_type: 'snow_land',
          title: 'Ring (1,-3)',
          interactive: false,
        },
        {
          key: 'hex_2_-3',
          q: 2,
          r: -3,
          terrain_type: 'snow_land',
          title: 'Ring (2,-3)',
          interactive: false,
        },
        {
          key: 'hex_3_-3',
          q: 3,
          r: -3,
          terrain_type: 'snow_land',
          title: 'Ring (3,-3)',
          interactive: false,
          showFoam: true,
        },
        // West Ring 3 hexes
        {
          key: 'hex_-2_-1',
          q: -2,
          r: -1,
          terrain_type: 'desert_land',
          title: 'Ring (-2,-1)',
          interactive: false,
        },
        {
          key: 'hex_-3_0',
          q: -3,
          r: 0,
          terrain_type: 'desert_land',
          title: 'Ring (-3,0)',
          interactive: false,
        },
        {
          key: 'hex_-3_1',
          q: -3,
          r: 1,
          terrain_type: 'desert_land',
          title: 'Ring (-3,1)',
          interactive: false,
        },
        // East Ring 3 hexes
        {
          key: 'hex_2_1',
          q: 2,
          r: 1,
          terrain_type: 'forest_land',
          title: 'Ring (2,1)',
          interactive: false,
        },
        {
          key: 'hex_3_0',
          q: 3,
          r: 0,
          terrain_type: 'forest_land',
          title: 'Ring (3,0)',
          interactive: false,
        },
        {
          key: 'hex_3_-1',
          q: 3,
          r: -1,
          terrain_type: 'forest_land',
          title: 'Ring (3,-1)',
          interactive: false,
        },
        /** Ring 4 hexes */
        // North Ring 4 hexes
        {
          key: 'hex_1_-4',
          q: 1,
          r: -4,
          terrain_type: 'snow_land',
          title: 'Ring (1,-4)',
          interactive: false,
          showFoam: true,
        },
        {
          key: 'hex_2_-4',
          q: 2,
          r: -4,
          terrain_type: 'snow_land',
          title: 'Ring (2,-4)',
          interactive: false,
          showFoam: true,
        },
        {
          key: 'hex_3_-4',
          q: 3,
          r: -4,
          terrain_type: 'snow_land',
          title: 'Ring (3,-4)',
          interactive: false,
          showFoam: true,
        },
      ]
    },
  },
})
