<template lang="pug">
.shader(ref="container")
</template>

<script>
import { Uniform } from 'three/src/core/Uniform'
import { Vector2 } from 'three/src/math/Vector2'
import { Scene } from 'three/src/scenes/Scene'
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer'
import { OrthographicCamera } from 'three/src/cameras/OrthographicCamera'
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry'
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial'
import { Mesh } from 'three/src/objects/Mesh'
import { DoubleSide } from 'three/src/constants'

export default {
  props: {
    shader: {
      type: String,
      required: true
    },
    yOffset: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    const el = document.createElement('canvas')
    this.$refs.container.appendChild(el)
    this.uniforms = {
      resolution: new Uniform(new Vector2(window.innerWidth, window.innerHeight)),
      time: new Uniform(0),
      yOffset: new Uniform(this.yOffset)
    }
    this.scene = new Scene()
    this.renderer = new WebGLRenderer({ canvas: el })
    this.renderer.setClearColor( '#000000', 1 )
    this.camera = new OrthographicCamera(-1, 1, 1, -1, -1, 1)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    window.renderer = this.renderer
    this.geometry = new PlaneGeometry(2, 2)
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      side: DoubleSide,
      vertexShader: `
        ${this.printUniforms()}
        void main() {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader:`
        ${this.printUniforms()}
        ${this.shader}
      `
    })
    this.mesh = new Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
    window.addEventListener('resize', this.onResize.bind(this))
    this.onResize()
  },
  methods: {
    printUniforms () {
      return Object.keys(this.uniforms).reduce((acc, key) => {
        let { value } = this.uniforms[key]
        const isVec2 = value instanceof Vector2
        let type = isVec2 ? Vector2 : typeof value
        if (type === 'string') {
          value = parseFloat(value)
          type = 'number'
        }
        switch (type) {
          case 'number':
            acc += `uniform float ${key};\n`
            break
          case 'boolean':
            acc += `uniform bool ${key};\n`
            break
          case Vector2:
            acc += `uniform vec2 ${key};\n`
            break
        }
        return acc
      }, `varying vec2 vUv;`)
    },

    onResize () {
      if (this.uniforms) this.uniforms.resolution = new Uniform(new Vector2(window.innerWidth, window.innerHeight))
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },

    tick () {
      this.uniforms.yOffset.value = this.yOffset / 3
      this.uniforms.time.value = window.performance.now() / 1000
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style lang="scss">
.shader {
  @include position(fixed, 0 null null 0);
  @include size(100vw, 100vh);
  z-index: -1;

  canvas {
    @include size(100%);
  }
}
</style>