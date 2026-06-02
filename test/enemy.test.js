import { describe, it, expect, vi } from 'vitest'
import { Enemy } from '../src/sprites/Enemy.js'

function createMockScene() {
  const mockSprite = {
    x: 0, y: 0,
    body: {
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      maxVelocity: { x: 9999, y: 9999 },
      touching: { down: false },
      blocked: { left: false, right: false, down: false },
      enable: true,
      setSize: vi.fn(),
      setOffset: vi.fn(),
      setBounce: vi.fn(),
      setCollideWorldBounds: vi.fn(),
    },
    setOrigin: vi.fn(),
    setDisplaySize: vi.fn(),
    setTint: vi.fn(),
    setFillStyle: vi.fn(),
    setVisible: vi.fn(),
    destroy: vi.fn(),
  }

  return {
    mockScene: {
      add: { sprite: vi.fn(() => mockSprite) },
      physics: { add: { existing: vi.fn(() => mockSprite) } },
      textures: { exists: vi.fn(() => true) },
      time: { delayedCall: vi.fn() },
    },
    mockSprite,
  }
}

describe('Enemy', () => {
  it('should create enemy at the specified position', () => {
    const { mockScene } = createMockScene()
    const enemy = new Enemy(mockScene, 400, 500, 300, 500)

    const spriteArgs = mockScene.add.sprite.mock.calls[0]
    expect(spriteArgs[0]).toBe(400)
    expect(spriteArgs[1]).toBe(500)
    expect(enemy).toBeInstanceOf(Enemy)
  })

  it('should start moving immediately on creation', () => {
    const { mockScene, mockSprite } = createMockScene()
    new Enemy(mockScene, 400, 500, 300, 500)

    // Enemy should be moving (non-zero velocity)
    expect(mockSprite.body.velocity.x).not.toBe(0)
  })

  it('should reverse direction when reaching patrol left boundary', () => {
    const { mockScene, mockSprite } = createMockScene()
    const enemy = new Enemy(mockScene, 400, 500, 300, 500)

    // Move enemy to left boundary
    mockSprite.x = 298 // just left of patrolLeft (300)
    mockSprite.body.velocity.x = -80

    enemy.update()

    // Should have reversed to positive velocity (moving right)
    expect(mockSprite.body.velocity.x).toBeGreaterThan(0)
  })

  it('should reverse direction when reaching patrol right boundary', () => {
    const { mockScene, mockSprite } = createMockScene()
    const enemy = new Enemy(mockScene, 500, 500, 300, 500)

    // Move enemy to right boundary
    mockSprite.x = 502 // just right of patrolRight (500)
    mockSprite.body.velocity.x = 80

    enemy.update()

    // Should have reversed to negative velocity (moving left)
    expect(mockSprite.body.velocity.x).toBeLessThan(0)
  })

  it('should mark enemy dead on stomp', () => {
    const { mockScene, mockSprite } = createMockScene()
    const enemy = new Enemy(mockScene, 400, 500, 300, 500)

    expect(enemy.isDead()).toBe(false)
    enemy.stomp()
    expect(enemy.isDead()).toBe(true)
  })

  it('should disable physics and change color when stomped', () => {
    const { mockScene, mockSprite } = createMockScene()
    const enemy = new Enemy(mockScene, 400, 500, 300, 500)

    enemy.stomp()

    expect(mockSprite.body.enable).toBe(false)
    expect(mockSprite.setTint).toHaveBeenCalledWith(0x555555)
  })

  it('should not patrol update when dead', () => {
    const { mockScene, mockSprite } = createMockScene()
    const enemy = new Enemy(mockScene, 400, 500, 300, 500)

    enemy.stomp()

    // After death, force position past boundary — update should ignore
    mockSprite.x = 200
    mockSprite.body.velocity.x = -80
    enemy.update()

    // Velocity should remain whatever it was (update does nothing when dead)
    expect(mockSprite.body.velocity.x).toBe(-80)
  })
})
