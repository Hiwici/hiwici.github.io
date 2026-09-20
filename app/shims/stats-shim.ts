class StatsShim {
  public dom: HTMLDivElement
  public domElement: HTMLDivElement

  constructor() {
    const el =
      typeof document !== 'undefined' ? document.createElement('div') : ({} as HTMLDivElement)

    this.dom = el
    this.domElement = el
  }

  showPanel() {}

  begin() {}

  end() {
    return 0
  }

  update() {}
}

export default StatsShim
