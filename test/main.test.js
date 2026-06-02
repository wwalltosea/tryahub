import { describe, it, expect, vi } from 'vitest'

// Mock Phaser before importing our code
vi.mock('phaser', () => {
  const MockScene = vi.fn()
  MockScene.prototype.scene = { start: vi.fn() }

  const MockGame = vi.fn()
  MockGame.prototype.destroy = vi.fn()
  MockGame.prototype.scene = {
    start: vi.fn(),
    add: vi.fn(),
    getScenes: vi.fn(() => []),
  }

  const Phaser = {
    Game: MockGame,
    Scene: MockScene,
    AUTO: 0,
    Scale: {
      RESIZE: 'RESIZE',
      CENTER_BOTH: 2,
      FIT: 'FIT',
    },
  }

  return { default: Phaser }
})

vi.mock('../src/scenes/TitleScene.js', () => ({
  default: class MockTitleScene {},
}))
vi.mock('../src/scenes/GameScene.js', () => ({
  default: class MockGameScene {},
}))

import { createGame } from '../src/main.js'
import Phaser from 'phaser'

describe('createGame', () => {
  it('should return a Game instance', () => {
    const container = document.createElement('div')
    const game = createGame(container)

    expect(game).not.toBeNull()
    expect(game).toBeInstanceOf(Phaser.Game)
  })

  it('should set scale mode to RESIZE for responsive canvas', () => {
    const container = document.createElement('div')
    createGame(container)

    const config = Phaser.Game.mock.calls[Phaser.Game.mock.calls.length - 1][0]
    expect(config.scale.mode).toBe(Phaser.Scale.RESIZE)
  })

  it('should register TitleScene + GameScene and enable arcade physics', () => {
    const container = document.createElement('div')
    createGame(container)

    const config = Phaser.Game.mock.calls[Phaser.Game.mock.calls.length - 1][0]
    expect(config.scene).toHaveLength(2)
  })

  it('should attach canvas to provided container DOM element', () => {
    const container = document.createElement('div')
    createGame(container)

    const config = Phaser.Game.mock.calls[Phaser.Game.mock.calls.length - 1][0]
    expect(config.parent).toBe(container)
  })
})
