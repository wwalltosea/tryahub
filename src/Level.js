import level1 from './levels/level1.js'
import level2 from './levels/level2.js'
import level3 from './levels/level3.js'

const levels = {
  1: level1,
  2: level2,
  3: level3,
}

export function loadLevel(id) {
  const level = levels[id]
  if (!level) {
    throw new Error(`Level ${id} not found. Available: ${Object.keys(levels).join(', ')}`)
  }
  return level
}
