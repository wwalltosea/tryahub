import { createEnemyTexture } from './EnemyTexture.js'

const ENEMY_SPEED = 80

export class Enemy {
  constructor(scene, x, y, patrolLeft, patrolRight) {
    this._scene = scene
    this._patrolLeft = patrolLeft
    this._patrolRight = patrolRight
    this._dead = false

    // Green bush creature with eyes
    const texKey = createEnemyTexture(scene)
    this.sprite = scene.add.sprite(x, y, texKey)
    this.sprite.setOrigin(0.5)
    this.sprite.setDisplaySize(32, 32)
    scene.physics.add.existing(this.sprite)

    // Start patrolling to the left
    this.sprite.body.velocity.x = -ENEMY_SPEED
  }

  stomp() {
    this._dead = true
    this.sprite.body.velocity.x = 0
    this.sprite.body.velocity.y = 0
    this.sprite.body.enable = false
    this.sprite.setTint(0x555555)
    this._scene.time.delayedCall(300, () => {
      this.sprite.setVisible(false)
    })
  }

  isDead() {
    return this._dead
  }

  getSprite() {
    return this.sprite
  }

  update() {
    if (this._dead) return

    // Patrol: reverse direction at boundaries
    if (this.sprite.x <= this._patrolLeft) {
      this.sprite.body.velocity.x = ENEMY_SPEED
    } else if (this.sprite.x >= this._patrolRight) {
      this.sprite.body.velocity.x = -ENEMY_SPEED
    }
  }
}
