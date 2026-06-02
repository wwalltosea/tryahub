// Mario-like pixel art: red cap with M, side face, black mustache,
// red shirt, blue overalls with yellow buttons, white gloves
// 16×16 design, each pixel = 3×3 → 48×48 texture

const PIXEL_MAP = [
  // 0     1     2     3     4     5     6     7     8     9     A     B     C     D     E     F
  '.',  '.',  '.',  '.',  '.',  'R',  'R',  'R',  'R',  'R',  'R',  '.',  '.',  '.',  '.',  '.',  // 0  cap top
  '.',  '.',  '.',  '.',  'R',  'R',  'W',  'R',  'W',  'R',  'R',  'R',  '.',  '.',  '.',  '.',  // 1  cap with M
  '.',  '.',  '.',  'b',  'R',  'R',  'W',  'W',  'W',  'R',  'R',  'R',  '.',  '.',  '.',  '.',  // 2  cap M bottom + hair
  '.',  '.',  'b',  'b',  'S',  'S',  'S',  'S',  'S',  'S',  'R',  'R',  '.',  '.',  '.',  '.',  // 3  side face
  '.',  '.',  'b',  'S',  'S',  'W',  'W',  'S',  'S',  'S',  '.',  '.',  '.',  '.',  '.',  '.',  // 4  eye
  '.',  '.',  '.',  'b',  'S',  'S',  'K',  'K',  'S',  'b',  '.',  '.',  '.',  '.',  '.',  '.',  // 5  nose + mustache
  '.',  '.',  '.',  '.',  'R',  'R',  'R',  'R',  'R',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // 6  red shirt
  '.',  '.',  '.',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  '.',  '.',  '.',  '.',  '.',  '.',  // 7  blue overalls
  '.',  '.',  '.',  'B',  'B',  'Y',  'B',  'B',  'Y',  'B',  'B',  '.',  '.',  '.',  '.',  '.',  // 8  yellow buttons
  '.',  '.',  '.',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  '.',  '.',  '.',  '.',  '.',  // 9  overalls bottom
  '.',  'W',  'R',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  'R',  'W',  '.',  '.',  '.',  // A  white gloves
  '.',  '.',  'B',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  'B',  '.',  '.',  '.',  '.',  // B  legs
  '.',  '.',  'B',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  'B',  '.',  '.',  '.',  '.',  // C  legs
  '.',  '.',  'b',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  'b',  '.',  '.',  '.',  '.',  // D  shoes
  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // E
  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // F
]

const PIXEL_SIZE = 3
const MAP_SIZE = 16
const TEXTURE_SIZE = MAP_SIZE * PIXEL_SIZE // 48

const COLORS = {
  R: '#e52521',  // red — cap, shirt
  S: '#fbb040',  // skin
  W: '#ffffff',  // white — eyes, gloves, M
  B: '#2e3192',  // blue — overalls
  Y: '#ffdd00',  // yellow — buttons
  K: '#1a1a1a',  // black — mustache
  b: '#8b4513',  // brown — hair, shoes
}

export function createPlayerTexture(scene) {
  const key = 'player-pixel'
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
