// Ground brick texture — 16×16 tile, seamlessly repeatable
// Icy floating platform texture — snow on top, frost body, icicle bottom

const BRICK_PIXELS = [
  // 0     1     2     3     4     5     6     7     8     9     A     B     C     D     E     F
  'a',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'a',  // 0  dark top
  'B',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'B',  // 1
  'B',  'A',  'A',  'a',  'A',  'A',  'a',  'A',  'A',  'a',  'A',  'A',  'a',  'A',  'A',  'B',  // 2  brick lines
  'B',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'B',  // 3
  'a',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'a',  // 4
  'B',  'A',  'A',  'A',  'A',  'a',  'A',  'A',  'A',  'A',  'a',  'A',  'A',  'A',  'A',  'B',  // 5
  'B',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'B',  // 6
  'B',  'A',  'A',  'a',  'A',  'A',  'A',  'A',  'a',  'A',  'A',  'A',  'A',  'a',  'A',  'B',  // 7
  'B',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'B',  // 8
  'B',  'A',  'A',  'A',  'A',  'A',  'a',  'A',  'A',  'A',  'A',  'a',  'A',  'A',  'A',  'B',  // 9
  'B',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'B',  // A
  'a',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'a',  // B
  'B',  'A',  'A',  'a',  'A',  'A',  'A',  'A',  'a',  'A',  'A',  'A',  'A',  'a',  'A',  'B',  // C
  'B',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'B',  // D
  'B',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'A',  'B',  // E
  'a',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'B',  'a',  // F  dark bottom
]

const BRICK_COLORS = {
  A: '#8B6914',  // medium brown
  B: '#6B4F12',  // dark brown
  a: '#A07818',  // light brown
}

// Ice platform — horizontal ice layers, snow cap top, sleek icy bands
const ICE_PIXELS = [
  // 0     1     2     3     4     5     6     7     8     9     A     B     C     D     E     F
  's',  's',  's',  's',  'w',  'w',  'w',  'w',  's',  's',  's',  's',  'w',  'w',  'w',  'w',  // 0  snow cap
  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  // 1  ice
  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  // 2  shimmer band
  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  // 3  ice
  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  // 4  ice
  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  // 5  shimmer band
  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  'I',  // 6  ice
  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  'c',  // 7  shimmer band
  'i',  'i',  'i',  'i',  'i',  'i',  'i',  'i',  'i',  'i',  'i',  'i',  'i',  'i',  'i',  'i',  // 8  dark edge
  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // 9
  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // A
  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // B
  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // C
  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // D
  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // E
  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  '.',  // F
]

const ICE_COLORS = {
  s: '#e8f4f8',  // snow white
  w: '#ffffff',  // pure white
  I: '#4db8e8',  // ice blue
  c: '#80c8f0',  // light ice shimmer
  i: '#2a8abf',  // dark ice edge
  '.': 'transparent',
}

function generateTileTexture(scene, key, pixelMap, colors, mapSize) {
  if (scene.textures.exists(key)) return key

  const canvasTexture = scene.textures.createCanvas(key, mapSize * 2, mapSize * 2)
  const ctx = canvasTexture.getContext()

  for (let row = 0; row < mapSize; row++) {
    for (let col = 0; col < mapSize; col++) {
      const pixel = pixelMap[row * mapSize + col]
      const color = colors[pixel]
      if (color && color !== 'transparent') {
        ctx.fillStyle = color
        ctx.fillRect(col * 2, row * 2, 2, 2)
      }
    }
  }

  canvasTexture.refresh()
  return key
}

export function createGroundTexture(scene) {
  return generateTileTexture(scene, 'ground-brick', BRICK_PIXELS, BRICK_COLORS, 16)
}

export function createPlatformTexture(scene) {
  return generateTileTexture(scene, 'platform-ice', ICE_PIXELS, ICE_COLORS, 16)
}
