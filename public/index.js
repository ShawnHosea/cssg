// console.log('Hello world from client-side JS!')

    class ColorScale extends HTMLElement {
      constructor() {
        super()
        this.scalePreview = this.querySelector('#scale-preview')
        this.hueInput = this.querySelector('[name=hue]')
        this.hue = Number(this.hueInput.value)
        this.saturationInput = this.querySelector('[name=saturation]')
        this.saturation = Number(this.saturationInput.value)
        this.lightnessInput = this.querySelector('[name=lightness]')
        this.lightness = Number(this.lightnessInput.value)
        this.preview = this.querySelector('#preview')
        this.stepsInput = this.querySelector('[name=steps]')
        this.steps = Number(this.stepsInput.value)
        this.distanceInput = this.querySelector('[name=distance]')
        this.distance = Number(this.distanceInput.value)
        this.updatePreview = this.updatePreview.bind(this)
        this.hueChange = this.hueChange.bind(this)
        this.saturationChange = this.saturationChange.bind(this)
        this.lightnessChange = this.lightnessChange.bind(this)
        this.stepsChange = this.stepsChange.bind(this)
        this.distanceChange = this.distanceChange.bind(this)
      }

      connectedCallback() {
        this.attachListeners()
        this.updatePreview()
      }

      attachListeners() {
        this.hueInput.addEventListener('input', this.hueChange, false)
        this.saturationInput.addEventListener('input', this.saturationChange, false)
        this.lightnessInput.addEventListener('input', this.lightnessChange, false)
        this.stepsInput.addEventListener('input', this.stepsChange, false)
        this.distanceInput.addEventListener('input', this.distanceChange, false)
      }

      hueChange(e) {
        this.hue = Number(e.target.value)
        this.updatePreview()
      }

      saturationChange(e) {
        this.saturation = Number(e.target.value)
        this.updatePreview()
      }

      lightnessChange(e) {
        this.lightness = Number(e.target.value)
        this.updatePreview()
      }

      stepsChange(e) {
        this.steps = Number(e.target.value)
        this.updatePreview()
      }

      distanceChange(e) {
        this.distance = Number(e.target.value)
        this.updatePreview()
      }

      updatePreview() {
        let h = this.hue
        let s = this.saturation
        let l = this.lightness
        let d = this.distance
        let items = []
        for (let i=0; i<this.steps; i++) {
          items.push(scaleItem({ h, s, l, d: d * i }))
        }
        this.scalePreview.innerHTML = items.join('')
      }
    }

    customElements.define('color-scale', ColorScale)

    function scaleItem(state={}) {
      let { h, s, l, d } = state
      let color = `hsl(${h}, ${s}%, ${ l + d }%)`
      return `
      <li
        style="
          width:4rem;
          height:4rem;
          background-color:${color};
        "
      ></li>
      `
    }
