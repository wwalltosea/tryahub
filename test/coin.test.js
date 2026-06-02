import { describe, it, expect, vi } from 'vitest'
import { Coin } from '../src/sprites/Coin.js'

function createMockScene() {
  const mockSprite = { x: 0, y: 0, destroy: vi.fn(), setOrigin: vi.fn() }
  return {
    mockScene: {
      add: { circle: vi.fn(() => mockSprite) },
    },
    mockSprite,
  }
}

describe('Coin', () => {
  it('should create coin at the specified position', () => {
    const { mockScene } = createMockScene()
    const coin = new Coin(mockScene, 200, 400)

    const args = mockScene.add.circle.mock.calls[0]
    expect(args[0]).toBe(200) // x
    expect(args[1]).toBe(400) // y
    expect(coin).toBeInstanceOf(Coin)
  })

  it('should mark coin as collected', () => {
    const { mockScene } = createMockScene()
    const coin = new Coin(mockScene, 0, 0)

    expect(coin.isCollected()).toBe(false)
    coin.collect()
    expect(coin.isCollected()).toBe(true)
  })

  it('should hide sprite when collected', () => {
    const { mockScene, mockSprite } = createMockScene()
    const coin = new Coin(mockScene, 0, 0)

    coin.collect()
    expect(mockSprite.destroy).toHaveBeenCalled()
  })
})
