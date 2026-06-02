// Bush creature — wider at bottom, 3 thick tufts on top, two big eyes
// 16×16 design, 2px per cell → 32×32 texture

const PIXEL_MAP = [
  // 0     1     2     3     4     5     6     7     8     9     A     B     C     D     E     F
  '.',  '.',  '.',  '.',  '.',  'g',  'g',  '.',  'g',  'g',  '.',  'g',  'g',  '.',  '.',  '.',  // 0  3 thick tufts
  '.',  '.',  '.',  '.',  'g',  'G',  'G',  'g',  'G',  'G',  'g',  'G',  'G',  '.',  '.',  '.',  // 1
  '.',  '.',  '.',  'g',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'g',  '.',  '.',  // 2  narrow top
  '.',  '.',  'g',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'g',  '.',  // 3
  '.',  '.',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  '.',  // 4  widening
  '.',  'g',  'G',  'G',  'G',  'W',  'W',  'G',  'G',  'W',  'W',  'G',  'G',  'G',  'G',  'g',  // 5  eyes
  '.',  'g',  'G',  'G',  'G',  'W',  'K',  'G',  'G',  'W',  'K',  'G',  'G',  'G',  'G',  'g',  // 6  pupils
  '.',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  // 7  wide
  'g',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  // 8  wider
  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  // 9  widest
  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  'G',  // A  flat base
  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // B
  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // C
  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // D
  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // E
  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // F
]

const PIXEL_SIZE = 2
const MAP_SIZE = 16
const TEXTURE_SIZE = MAP_SIZE * PIXEL_SIZE

const COLORS = {
  g: '#1a8a3a',  // dark green tuft
  G: '#3ddc6e',  // bright green body
  W: '#ffffff',  // white eye
  K: '#1a1a1a',  // black pupil
}

export function createEnemyTexture(scene) {
  const key = 'enemy-bush'
  if (scene.textures.exists(key)) return key

  const canvasTexture = scene.textures.createCanvas(key, TEXTURE_SIZE, TEXTURE_SIZE)
  const ctx = canvasTexture.getContext()

  for (let row = 0; row < MAP_SIZE; row++) {
    for (let col = 0; col < MAP_SIZE; col++) {
      const pixel = PIXEL_MAP[row * MAP_SIZE + col]
      const color = COLORS[pixel]
      if (color) {
        ctx.fillStyle = color
        ctx.fillRect(col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
      }
    }
  }

  canvasTexture.refresh()
  return key
}
