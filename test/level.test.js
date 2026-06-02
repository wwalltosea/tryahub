import { describe, it, expect } from 'vitest'
import { loadLevel } from '../src/Level.js'

describe('loadLevel', () => {
  it('should return an object with ground, platforms, playerStart, and goal', () => {
    const level = loadLevel(1)

    expect(level).not.toBeNull()
    expect(level.id).toBe(1)

    expect(Array.isArray(level.ground)).toBe(true)
    expect(level.ground.length).toBeGreaterThan(0)
    level.ground.forEach(g => {
      expect(g).toHaveProperty('x')
      expect(g).toHaveProperty('y')
      expect(g).toHaveProperty('width')
      expect(g).toHaveProperty('height')
    })

    expect(Array.isArray(level.platforms)).toBe(true)

    expect(level.playerStart).toHaveProperty('x')
    expect(level.playerStart).toHaveProperty('y')

    expect(level.goal).toHaveProperty('x')
    expect(level.goal).toHaveProperty('y')
  })

  it('should have at least one pit between ground segments', () => {
    const level = loadLevel(1)
    // A pit exists if there is a gap between the end of one ground segment
    // and the start of the next
    for (let i = 0; i < level.ground.length - 1; i++) {
      const curr = level.ground[i]
      const next = level.ground[i + 1]
      const currEnd = curr.x + curr.width
      if (next.x > currEnd) {
        // Found a pit! Test passes.
        expect(next.x).toBeGreaterThan(currEnd)
        return
      }
    }
    // If we reach here, no pit was found — fail
    expect.fail('Expected at least one pit (gap between ground segments)')
  })

  it('should have playerStart above ground level', () => {
    const level = loadLevel(1)
    // Player should start somewhere above y=550 (ground is at 568, player at ~536)
    expect(level.playerStart.y).toBeLessThan(570)
    expect(level.playerStart.y).toBeGreaterThan(0)
  })

  it('should have goal on the far right side of the level', () => {
    const level = loadLevel(1)
    // Goal should be near the right end of the level
    expect(level.goal.x).toBeGreaterThan(level.width * 0.8)
    expect(level.goal.x).toBeLessThan(level.width)
  })

  it('should throw an error for invalid level id', () => {
    expect(() => loadLevel(99)).toThrow(/Level 99 not found/)
  })

  it('should load level 2 with valid structure', () => {
    const level = loadLevel(2)
    expect(level.id).toBe(2)
    expect(level.ground.length).toBeGreaterThan(0)
    expect(level.enemies.length).toBeGreaterThan(0)
    expect(level.coins.length).toBeGreaterThan(0)
  })

  it('should load level 3 with valid structure', () => {
    const level = loadLevel(3)
    expect(level.id).toBe(3)
    expect(level.ground.length).toBeGreaterThan(0)
    expect(level.enemies.length).toBeGreaterThan(0)
    expect(level.coins.length).toBeGreaterThan(0)
  })
})
