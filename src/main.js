import Phaser from 'phaser'
import TitleScene from './scenes/TitleScene.js'
import GameScene from './scenes/GameScene.js'

export function createGame(container) {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 960,
      height: 540,
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
