import {
  PLAYER_ACCELERATION,
  PLAYER_MAX_SPEED,
  PLAYER_DRAG,
  JUMP_VELOCITY,
  TOUCH_JUMP_VELOCITY,
} from '../Physics.js'
import { createPlayerTexture } from './PlayerTexture.js'

export class Player {
  constructor(scene, x, y) {
    // Generate pixel art texture, then create sprite
    const texKey = createPlayerTexture(scene)
    this.sprite = scene.add.sprite(x, y, texKey)
    this.sprite.setOrigin(0.5)
    this.sprite.setDisplaySize(48, 48)

    // Attach Arcade Physics body
    scene.physics.add.existing(this.sprite)

    // Configure physics body
    this.sprite.body.acceleration.x = PLAYER_ACCELERATION
    this.sprite.body.maxVelocity.x = PLAYER_MAX_SPEED
    this.sprite.body.drag.x = PLAYER_DRAG
    this.sprite.body.setCollideWorldBounds(true)

    this._jumpVelocity = JUMP_VELOCITY
    this._canJump = true
    this._coins = 0
    this._score = 0
    this._lives = 3
    this._invincibleUntil = 0
    this._scene = scene
  }

  carryOver(coins, score, lives) {
    this._coins = coins
    this._score = score
    this._lives = lives
  }

  collectCoin() {
    this._coins++
    this._score += 100
    if (this._coins >= 100) {
      this._lives++
      this._coins = 0
    }
  }

  addScore(points) { this._score += points }

  getCoins() { return this._coins }
  getScore() { return this._score }
  getLives() { return this._lives }

  move(left, right) {
    if (left) {
      this.sprite.body.acceleration.x = -PLAYER_ACCELERATION
      this.sprite.body.maxVelocity.x = PLAYER_MAX_SPEED
    } else if (right) {
      this.sprite.body.acceleration.x = PLAYER_ACCELERATION
      this.sprite.body.maxVelocity.x = PLAYER_MAX_SPEED
    } else {
      this.sprite.body.acceleration.x = 0
    }
  }

  jump() {
    if (!this._canJump) return false
    this.sprite.body.velocity.y = this._jumpVelocity
    this._canJump = false
    return true
  }

  touchJump() {
    if (!this._canJump) return false
    this.sprite.body.velocity.y = TOUCH_JUMP_VELOCITY
    this._canJump = false
    return true
  }

  isOnGround() {
    return this.sprite.body.touching.down || this.sprite.body.blocked.down
  }

  update() {
    if (this.isOnGround()) {
      this._canJump = true
    }
  }

  takeDamage() {
    if (this.isInvincible()) return
    this._lives--
    this._invincibleUntil = this._scene.time.now + 2000 // 2s invincibility
    if (this._lives <= 0) {
      this._lives = 0
    }
  }

  isDead() {
    return this._lives <= 0
  }

  isInvincible() {
    return this._scene.time.now < this._invincibleUntil
  }

  respawn(x, y) {
    this.sprite.x = x
    this.sprite.y = y
    this.sprite.body.velocity.x = 0
    this.sprite.body.velocity.y = 0
    this._canJump = true
  }
}
