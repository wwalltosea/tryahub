import Phaser from 'phaser'
import TitleScene from './scenes/TitleScene.js'
import GameScene from './scenes/GameScene.js'

export function createGame(container) {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    backgroundColor: '#1a1a2e',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scene: [TitleScene, GameScene],
    parent: container,
  })

  return game
}
