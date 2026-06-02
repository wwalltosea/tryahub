import Phaser from 'phaser'
import { GRAVITY } from '../Physics.js'
import { loadLevel } from '../Level.js'
import { Player } from '../sprites/Player.js'
import { Enemy } from '../sprites/Enemy.js'
import { Coin } from '../sprites/Coin.js'
import { SFX } from '../SFX.js'
import { createGroundTexture, createPlatformTexture } from '../sprites/TileTexture.js'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
  }

  init(data) {
    this._levelId = data.levelId || 1
    this._carryCoins = data.coins || 0
    this._carryScore = data.score || 0
    this._carryLives = data.lives || 3
    this._levelScores = data.levelScores || []
  }

  create() {
    const level = loadLevel(this._levelId)

    // Gravity
    this.physics.world.gravity.y = GRAVITY
    this._level = level

    // Combo state
    this._combo = 0
    this._comboDeadline = 0

    // Tap-to-restart (mobile)
    this._restartReady = false

    // Build terrain with tiled textures
    const groundTex = createGroundTexture(this)
    const platformTex = createPlatformTexture(this)
    const terrainGroup = this.add.group()

    level.ground.forEach(g => {
      const tile = this.add.tileSprite(
        g.x + g.width / 2, g.y + g.height / 2,
        g.width, g.height, groundTex
      )
      this.physics.add.existing(tile, true)
      terrainGroup.add(tile)
    })

    level.platforms.forEach(p => {
      const tile = this.add.tileSprite(
        p.x + p.width / 2, p.y + p.height / 2,
        p.width, p.height, platformTex
      )
      this.physics.add.existing(tile, true)
      terrainGroup.add(tile)
    })

    // Player
    this.player = new Player(this, level.playerStart.x, level.playerStart.y)
    this.player.carryOver(this._carryCoins, this._carryScore, this._carryLives)
    this.physics.add.collider(this.player.sprite, terrainGroup)

    // Time tracking (after player creation)
    this._levelStartTime = this.time.now
    this._scoreAtLevelStart = this.player.getScore()
    this._goalReached = false

    // Enemies
    this.enemies = []
    level.enemies.forEach(e => {
      const enemy = new Enemy(this, e.x, e.y, e.patrolLeft, e.patrolRight)
      this.enemies.push(enemy)
      // Enemy also collides with terrain
      this.physics.add.collider(enemy.getSprite(), terrainGroup)
    })

    // Coins (no physics — proximity check in update)
    this.coins = level.coins.map(c => new Coin(this, c.x, c.y))

    // Player vs Enemy: use overlap to detect stomp/damage
    this.enemies.forEach(enemy => {
      this.physics.add.overlap(
        this.player.sprite,
        enemy.getSprite(),
        (playerSprite, enemySprite) => {
          this._onPlayerEnemyOverlap(enemy, playerSprite, enemySprite)
        }
      )
    })

    // Input — keyboard
    this.cursors = this.input.keyboard.createCursorKeys()
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)

    // Input — touch (swipe-based)
    this._touchDir = 0           // -1 left, 0 none, 1 right
    this._touchJump = false      // true this frame → trigger jump
    this._pointers = new Map()   // id → { startX, startY, curX, curY, dir, jumped }

    this.input.on('pointerdown', (pointer) => {
      this._pointers.set(pointer.id, {
        startX: pointer.x, startY: pointer.y,
        curX: pointer.x, curY: pointer.y,
        dir: 0, jumped: false,
      })
    })

    this.input.on('pointermove', (pointer) => {
      const p = this._pointers.get(pointer.id)
      if (!p) return
      p.curX = pointer.x
      p.curY = pointer.y
    })

    this.input.on('pointerup', (pointer) => {
      this._pointers.delete(pointer.id)
    })

    // HUD (fixed to camera)
    this.hudScore = this.add.text(10, 10, 'SCORE: 0', {
      fontSize: '24px', color: '#ffffff', fontFamily: 'Arial',
    }).setScrollFactor(0).setDepth(100)
    this.hudCoins = this.add.text(10, 40, 'COINS: 0', {
      fontSize: '18px', color: '#ffd700', fontFamily: 'Arial',
    }).setScrollFactor(0).setDepth(100)
    this.hudLives = this.add.text(10, 64, 'LIVES: 3', {
      fontSize: '18px', color: '#ff4444', fontFamily: 'Arial',
    }).setScrollFactor(0).setDepth(100)
    const comboY = Math.floor(this.cameras.main.height * 0.72)
    this.hudCombo = this.add.text(this.cameras.main.width / 2, comboY, '', {
      fontSize: '40px', color: '#ff8800', fontFamily: 'Arial',
      fontStyle: 'bold',
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(100)
    this.hudComboMult = this.add.text(this.cameras.main.width / 2, comboY + 46, '', {
      fontSize: '28px', color: '#ff8800', fontFamily: 'Arial',
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(100)
    this.hudTimer = this.add.text(this.cameras.main.width - 20, 10, '0.0s', {
      fontSize: '40px', color: '#ffffff', fontFamily: 'Arial',
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(100)

    // Portrait-mode hint (big yellow warning on dark background)
    const hx = this.cameras.main.width / 2
    const hy = this.cameras.main.height / 2
    this._rotateBg = this.add.rectangle(hx, hy, 320, 70, 0x000000, 0.75)
      .setScrollFactor(0).setDepth(200).setVisible(false)
    this._rotateHint = this.add.text(hx, hy - 2, '↻  请旋转手机  ↺', {
      fontSize: '30px', color: '#ffdd00', fontFamily: 'Arial', fontStyle: 'bold',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(201).setVisible(false)

    // Goal flag (white pole + red flag)
    const gx = level.goal.x
    const gy = level.goal.y
    this.add.rectangle(gx, gy - 48, 4, 96, 0xffffff)   // pole
    this.add.rectangle(gx + 12, gy - 80, 24, 16, 0xff0000) // flag

    // Camera
    this.cameras.main.setBounds(0, 0, level.width, level.height)
    this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1)
    this.physics.world.setBounds(0, 0, level.width, level.height + 200)

    // Reposition UI elements on resize
    this.scale.on('resize', (gameSize) => {
      const cx = gameSize.width / 2
      const cy = gameSize.height / 2
      this._rotateBg.setPosition(cx, cy)
      this._rotateHint.setPosition(cx, cy - 2)
      const comboY = Math.floor(gameSize.height * 0.72)
      this.hudCombo.setPosition(cx, comboY)
      this.hudComboMult.setPosition(cx, comboY + 46)
    })
  }

  update() {
    // Game Over or Win — wait for space to go to title
    if (this.player.isDead() || this._won) {
      if (this.cursors.space.isDown) {
        this.scene.start('TitleScene')
      }
      return
    }

    // Portrait / landscape detection (use actual screen)
    const isPortrait = window.innerWidth < window.innerHeight
    this._rotateBg.setVisible(isPortrait)
    this._rotateHint.setVisible(isPortrait)

    this.player.update()

    // Process touch input — read pointer positions directly each frame
    let touchDir = 0
    const activePointers = this.input.manager.pointers.filter(p => p.active)
    for (const pointer of activePointers) {
      const p = this._pointers.get(pointer.id)
      if (!p) continue
      const dx = pointer.x - p.startX
      const dy = pointer.y - p.startY
      // Direction: horizontal swipe dominates
      if (Math.abs(dx) >= Math.abs(dy) && Math.abs(dx) >= 20) {
        p.dir = dx > 0 ? 1 : -1
      }
      if (p.dir !== 0) touchDir = p.dir
      // Jump: upward swipe from ANY pointer
      if (dy <= -25 && !p.jumped) {
        p.jumped = true
        this._touchJump = true
      }
    }
    if (activePointers.length === 0) touchDir = 0

    const left  = this.cursors.left.isDown || this.keyA.isDown || touchDir === -1
    const right = this.cursors.right.isDown || this.keyD.isDown || touchDir === 1
    this.player.move(left, right)

    const keyJump = this.cursors.up.isDown || this.cursors.space.isDown ||
                    this.keyW.isDown
    if (keyJump && this.player.jump()) SFX.jump()
    if (this._touchJump && this.player.touchJump()) SFX.jump()
    this._touchJump = false

    // Combo timeout
    if (this._combo > 0 && this.time.now > this._comboDeadline) {
      this._resetCombo()
    }

    // Update enemies
    this.enemies.forEach(e => e.update())

    // Coin pickup
    const px = this.player.sprite.x
    const py = this.player.sprite.y
    this.coins.forEach(coin => {
      if (coin.isCollected()) return
      const cx = coin.getSprite().x
      const cy = coin.getSprite().y
      if (Math.abs(px - cx) < 22 && Math.abs(py - cy) < 22) {
        coin.collect()
        this.player.collectCoin()
        const mult = this._comboMultiplier()
        if (mult > 1) this.player.addScore(Math.floor(100 * (mult - 1)))
        SFX.coin()
      }
    })

    // Update HUD
    this.hudScore.setText(`SCORE: ${this.player.getScore()}`)
    this.hudCoins.setText(`COINS: ${this.player.getCoins()}`)
    this.hudLives.setText(`LIVES: ${this.player.getLives()}`)
    const elapsed = (this.time.now - this._levelStartTime) / 1000
    this.hudTimer.setText(`${elapsed.toFixed(1)}s`)
    const mult = this._comboMultiplier()
    if (this._combo > 0) {
      this.hudCombo.setText(`COMBO x${mult} !`)
      this.hudComboMult.setText(`金钱倍率 x${mult}`)
      const remaining = Math.max(0, this._comboDeadline - this.time.now)
      const warn = remaining < 1500
      this.hudCombo.setColor(warn ? '#ff4444' : '#ff8800')
      this.hudComboMult.setColor(warn ? '#ff4444' : '#ff8800')
    } else {
      this.hudCombo.setText('')
      this.hudComboMult.setText('')
    }

    // Goal reached?
    if (!this._goalReached &&
        Math.abs(this.player.sprite.x - this._level.goal.x) < 30 &&
        this.player.sprite.y < this._level.goal.y + 16) {
      this._goalReached = true
      this._showLevelComplete()
    }

    // Fall into pit
    if (this.player.sprite.y > 700) {
      this._damagePlayer()
      if (!this.player.isDead()) {
        this.player.respawn(this._level.playerStart.x, this._level.playerStart.y)
      }
    }
  }

  _onPlayerEnemyOverlap(enemy, playerSprite, enemySprite) {
    if (enemy.isDead()) return

    const playerAbove = playerSprite.y < enemySprite.y - 10
    const playerFalling = playerSprite.body.velocity.y >= 0

    if (playerAbove && playerFalling) {
      // Stomp! Player landed on enemy from above
      enemy.stomp()
      playerSprite.body.velocity.y = -250
      // Combo
      this._combo++
      this._comboDeadline = this.time.now + 5000
      const mult = this._comboMultiplier()
      this.player.addScore(Math.floor(200 * mult))
      SFX.stomp()
    } else if (!playerAbove) {
      this._damagePlayer()
    }
    // playerAbove && !playerFalling: player jumped through enemy from below → no effect
  }

  _damagePlayer() {
    if (this.player.isInvincible() || this.player.isDead()) return

    this._resetCombo()
    this.player.takeDamage()

    if (this.player.isDead()) {
      SFX.death()
      this.physics.pause()
      // Touch / space to restart
      this.input.once('pointerdown', () => { this.scene.start('TitleScene') })
      // Hide normal HUD
      this.hudScore.setVisible(false)
      this.hudCoins.setVisible(false)
      this.hudLives.setVisible(false)
      this.hudCombo.setVisible(false)
      this.hudComboMult.setVisible(false)
      // Big centered Game Over (screen-fixed)
      const w = this.cameras.main.width
      const h = this.cameras.main.height
      this.add.text(w / 2, h / 2 - 90, 'GAME OVER', {
        fontSize: '72px', color: '#ff4444', fontFamily: 'Arial',
        fontStyle: 'bold',
      }).setOrigin(0.5).setScrollFactor(0).setDepth(200)

      // Show level scores + total
      let y = h / 2 + 10
      this._levelScores.forEach((s, i) => {
        this.add.text(w / 2, y, `第 ${i + 1} 关: ${s}`, {
          fontSize: '20px', color: '#cccccc', fontFamily: 'Arial',
        }).setOrigin(0.5).setScrollFactor(0).setDepth(200)
        y += 28
      })
      // Add current (incomplete) level score
      const currentLevelScore = this.player.getScore() - this._scoreAtLevelStart
      this.add.text(w / 2, y, `第 ${this._levelId} 关 (未完成): ${currentLevelScore}`, {
        fontSize: '20px', color: '#888888', fontFamily: 'Arial',
      }).setOrigin(0.5).setScrollFactor(0).setDepth(200)
      y += 36

      this.add.text(w / 2, y, `总分: ${this.player.getScore()}`, {
        fontSize: '32px', color: '#ffdd00', fontFamily: 'Arial',
        fontStyle: 'bold',
      }).setOrigin(0.5).setScrollFactor(0).setDepth(200)

      this.add.text(w / 2, y + 40, 'PRESS SPACE TO RESTART', {
        fontSize: '18px', color: '#ffffff', fontFamily: 'Arial',
      }).setOrigin(0.5).setScrollFactor(0).setDepth(200)
    } else {
      // Flash effect during invincibility
      this._flashPlayer()
    }
  }

  _flashPlayer() {
    const sprite = this.player.sprite
    this.time.addEvent({
      delay: 100,
      repeat: 10,
      callback: () => {
        sprite.setVisible(!sprite.visible)
      },
    })
    this.time.delayedCall(2100, () => {
      sprite.setVisible(true)
    })
  }

  _comboMultiplier() {
    return this._combo >= 1 ? Math.pow(2, this._combo - 1) : 1
  }

  _resetCombo() {
    this._combo = 0
    this._comboDeadline = 0
  }

  _showLevelComplete() {
    this.physics.pause()

    const elapsed = (this.time.now - this._levelStartTime) / 1000
    let rating, mult, color

    if (elapsed < 30)      { rating = 'S'; mult = 3.0; color = '#ffdd00' }
    else if (elapsed < 60)  { rating = 'A'; mult = 2.0; color = '#00ff88' }
    else if (elapsed < 90)  { rating = 'B'; mult = 1.5; color = '#4488ff' }
    else                    { rating = 'C'; mult = 1.0; color = '#888888' }

    // Apply multiplier only to score earned in this level
    const levelScore = this.player.getScore() - this._scoreAtLevelStart
    const bonus = Math.floor(levelScore * (mult - 1))
    this.player.addScore(bonus)

    // Record this level's final score
    const finalLevelScore = levelScore + bonus
    this._levelScores = [...this._levelScores, finalLevelScore]

    const w = this.cameras.main.width
    const h = this.cameras.main.height

    // Rating display
    this.add.text(w / 2, h / 2 - 100, `第 ${this._levelId} 关`, {
      fontSize: '24px', color: '#ffffff', fontFamily: 'Arial',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(200)

    this.add.text(w / 2, h / 2 - 50, `评级: ${rating}`, {
      fontSize: '72px', color, fontFamily: 'Arial', fontStyle: 'bold',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(200)

    this.add.text(w / 2, h / 2 + 20, `${elapsed.toFixed(1)}s`, {
      fontSize: '28px', color: '#ffffff', fontFamily: 'Arial',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(200)

    this.add.text(w / 2, h / 2 + 60, `倍率 x${mult.toFixed(1)} | 奖励: +${bonus}`, {
      fontSize: '20px', color: '#ffdd00', fontFamily: 'Arial',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(200)

    const nextId = this._levelId + 1
    if (nextId <= 3) {
      this.add.text(w / 2, h / 2 + 110, '按空格键继续', {
        fontSize: '16px', color: '#aaaaaa', fontFamily: 'Arial',
      }).setOrigin(0.5).setScrollFactor(0).setDepth(200)

      this._waitForSpace(() => {
        this.scene.restart({
          levelId: nextId,
          coins: this.player.getCoins(),
          score: this.player.getScore(),
          lives: this.player.getLives(),
          levelScores: this._levelScores,
        })
      })
    } else {
      // All 3 levels complete
      this.time.delayedCall(1500, () => this._showWin())
    }
  }

  _waitForSpace(cb) {
    const key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    const handler = () => {
      key.removeListener('down', handler)
      this.input.off('pointerdown', handler)
      cb()
    }
    key.on('down', handler)
    this.input.on('pointerdown', handler)
  }

  _showWin() {
    this.physics.pause()
    this.input.once('pointerdown', () => { this.scene.start('TitleScene') })
    const w = this.cameras.main.width
    const h = this.cameras.main.height
    this.add.text(w / 2, h / 2 - 100, '恭喜通关！', {
      fontSize: '64px', color: '#ffdd00', fontFamily: 'Arial',
      fontStyle: 'bold',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(200)

    // Per-level scores
    let y = h / 2
    this._levelScores.forEach((s, i) => {
      this.add.text(w / 2, y, `第 ${i + 1} 关: ${s}`, {
        fontSize: '22px', color: '#cccccc', fontFamily: 'Arial',
      }).setOrigin(0.5).setScrollFactor(0).setDepth(200)
      y += 32
    })

    this.add.text(w / 2, y + 10, `总分: ${this.player.getScore()}`, {
      fontSize: '36px', color: '#ffdd00', fontFamily: 'Arial',
      fontStyle: 'bold',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(200)
    this.add.text(w / 2, y + 60, '按空格键返回标题', {
      fontSize: '18px', color: '#aaaaaa', fontFamily: 'Arial',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(200)
    this._won = true
  }
}
