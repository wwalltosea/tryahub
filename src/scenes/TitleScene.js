import Phaser from 'phaser'

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' })
  }

  create() {
    const w = this.cameras.main.width
    const h = this.cameras.main.height

    // Deep blue background
    this.cameras.main.setBackgroundColor('#0a0a2e')

    // Rainbow title — 5 characters, each a different color
    const title = '几何马力欧'
    const colors = ['#ff0000', '#ff8800', '#ffdd00', '#00cc44', '#4488ff']
    const fontSize = 96
    const charWidth = fontSize + 8 // 中文字符宽度 ≈ 字体大小，加 8px 间隙
    const totalW = title.length * charWidth
    let offsetX = w / 2 - totalW / 2 + charWidth / 2
    title.split('').forEach((char, i) => {
      this.add.text(offsetX, h / 2 - 60, char, {
        fontSize: `${fontSize}px`, color: colors[i], fontFamily: 'Arial',
        fontStyle: 'bold',
      }).setOrigin(0.5)
      offsetX += charWidth
    })

    // Subtitle
    this.add.text(w / 2, h / 2, 'GEOMETRY MARIO', {
      fontSize: '16px', color: '#888899', fontFamily: 'Arial',
    }).setOrigin(0.5)

    // Blinking hint
    const hint = this.add.text(w / 2, h / 2 + 100, '按空格键 / 点击屏幕开始', {
      fontSize: '20px', color: '#ffffff', fontFamily: 'Arial',
    }).setOrigin(0.5)

    this.tweens.add({
      targets: hint,
      alpha: 0.2,
      duration: 600,
      yoyo: true,
      repeat: -1,
    })

    // Input — keyboard + touch
    const startGame = () => {
      this.scene.start('GameScene', { levelId: 1 })
    }
    this.input.keyboard.once('keydown-SPACE', startGame)
    this.input.once('pointerdown', startGame)
  }
}
