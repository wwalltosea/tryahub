import { describe, it, expect, vi } from 'vitest'
import { Player } from '../src/sprites/Player.js'

function createMockScene() {
  const mockSprite = {
    x: 0,
    y: 0,
    body: {
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      maxVelocity: { x: 9999, y: 9999 },
      drag: { x: 0, y: 0 },
      gravity: { x: 0, y: 0 },
      touching: { down: false },
      blocked: { down: false },
      setSize: vi.fn(),
      setOffset: vi.fn(),
      setBounce: vi.fn(),
      setCollideWorldBounds: vi.fn(),
    },
    setOrigin: vi.fn(),
    setDisplaySize: vi.fn(),
    setTint: vi.fn(),
  }

  const mockScene = {
    add: { sprite: vi.fn(() => mockSprite) },
    physics: {
      add: { existing: vi.fn(() => mockSprite) },
    },
    textures: { exists: vi.fn(() => true) },
    time: { now: 0 },
  }

  return { mockScene, mockSprite }
}

describe('Player', () => {
  // Test 2
  it('should create player at the specified position', () => {
    const { mockScene } = createMockScene()
    const player = new Player(mockScene, 100, 200)

    const spriteArgs = mockScene.add.sprite.mock.calls[0]
    expect(spriteArgs[0]).toBe(100)
    expect(spriteArgs[1]).toBe(200)
    expect(player).toBeInstanceOf(Player)
  })

  // Test 3
  it('should have physics body set up on creation', () => {
    const { mockScene, mockSprite } = createMockScene()
    new Player(mockScene, 0, 0)

    expect(mockScene.physics.add.existing).toHaveBeenCalledWith(mockSprite)
    expect(mockSprite.body.setCollideWorldBounds).toHaveBeenCalledWith(true)
  })

  // Test 4
  it('should jump by setting upward velocity', () => {
    const { mockScene, mockSprite } = createMockScene()
    const player = new Player(mockScene, 0, 400)

    // Simulate on ground
    mockSprite.body.touching.down = true
    player.update()

    const jumped = player.jump()

    expect(jumped).toBe(true)
    expect(mockSprite.body.velocity.y).toBeLessThan(0) // upward = negative y
  })

  // Test 5
  it('should not allow double jump in air', () => {
    const { mockScene, mockSprite } = createMockScene()
    const player = new Player(mockScene, 0, 400)

    // First jump from ground
    mockSprite.body.touching.down = true
    player.update()
    player.jump()

    // Still in air — second jump should fail
    mockSprite.body.touching.down = false
    const secondJump = player.jump()

    expect(secondJump).toBe(false)
  })

  // Test 6
  it('should allow jumping again after landing', () => {
    const { mockScene, mockSprite } = createMockScene()
    const player = new Player(mockScene, 0, 400)

    // Jump
    mockSprite.body.touching.down = true
    player.update()
    player.jump()

    // Still in air
    mockSprite.body.touching.down = false
    mockSprite.body.blocked.down = false
    player.update()
    expect(player.jump()).toBe(false)

    // Land
    mockSprite.body.touching.down = true
    player.update()
    expect(player.jump()).toBe(true)
  })

  // Test 7
  it('should move left and right', () => {
    const { mockScene, mockSprite } = createMockScene()
    const player = new Player(mockScene, 0, 400)

    player.move(true, false)
    expect(mockSprite.body.acceleration.x).toBeLessThan(0) // left = negative

    player.move(false, true)
    expect(mockSprite.body.acceleration.x).toBeGreaterThan(0) // right = positive

    player.move(false, false)
    expect(mockSprite.body.acceleration.x).toBe(0) // stop
  })

  it('should increment coins and score when collecting coin', () => {
    const { mockScene } = createMockScene()
    const player = new Player(mockScene, 0, 400)

    expect(player.getCoins()).toBe(0)
    expect(player.getScore()).toBe(0)

    player.collectCoin()

    expect(player.getCoins()).toBe(1)
    expect(player.getScore()).toBe(100)
  })

  it('should grant extra life at 100 coins and reset counter', () => {
    const { mockScene } = createMockScene()
    const player = new Player(mockScene, 0, 400)

    expect(player.getLives()).toBe(3)

    // Collect 100 coins
    for (let i = 0; i < 100; i++) {
      player.collectCoin()
    }

    expect(player.getLives()).toBe(4)  // +1 life
    expect(player.getCoins()).toBe(0)   // counter reset
    expect(player.getScore()).toBe(10000)
  })

  it('should accumulate score across coin resets', () => {
    const { mockScene } = createMockScene()
    const player = new Player(mockScene, 0, 400)

    // First 100 coins
    for (let i = 0; i < 100; i++) player.collectCoin()
    expect(player.getScore()).toBe(10000)

    // Next 50 coins
    for (let i = 0; i < 50; i++) player.collectCoin()
    expect(player.getScore()).toBe(15000)
    expect(player.getCoins()).toBe(50)
  })

  it('should lose a life on takeDamage', () => {
    const { mockScene } = createMockScene()
    const player = new Player(mockScene, 0, 400)

    expect(player.getLives()).toBe(3)
    player.takeDamage()
    expect(player.getLives()).toBe(2)
  })

  it('should return true from isDead when lives reach zero', () => {
    const { mockScene } = createMockScene()
    const player = new Player(mockScene, 0, 400)

    expect(player.isDead()).toBe(false)
    player.takeDamage() // 2
    mockScene.time.now = 2500 // invincibility expires
    player.takeDamage() // 1
    mockScene.time.now = 5000
    player.takeDamage() // 0
    expect(player.isDead()).toBe(true)
  })

  it('should be invincible after takeDamage', () => {
    const { mockScene } = createMockScene()
    const player = new Player(mockScene, 0, 400)

    expect(player.isInvincible()).toBe(false)
    player.takeDamage()
    expect(player.isInvincible()).toBe(true)
  })

  it('should add arbitrary score via addScore', () => {
    const { mockScene } = createMockScene()
    const player = new Player(mockScene, 0, 400)

    player.addScore(200)
    expect(player.getScore()).toBe(200)
    player.addScore(500)
    expect(player.getScore()).toBe(700)
  })

  it('should preserve coins on respawn', () => {
    const { mockScene, mockSprite } = createMockScene()
    const player = new Player(mockScene, 0, 400)

    // Collect some coins
    for (let i = 0; i < 50; i++) player.collectCoin()
    expect(player.getCoins()).toBe(50)
    const scoreBefore = player.getScore()

    player.respawn(100, 200)

    expect(player.getCoins()).toBe(50)   // coins preserved
    expect(player.getScore()).toBe(scoreBefore) // score preserved
    expect(mockSprite.x).toBe(100)       // position reset
    expect(mockSprite.y).toBe(200)
  })
})
