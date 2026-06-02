export class Coin {
  constructor(scene, x, y) {
    this._collected = false
    // Gold circle, radius 6
    this.sprite = scene.add.circle(x, y, 6, 0xffd700)
    this.sprite.setOrigin(0.5)
  }

  collect() {
    if (this._collected) return
    this._collected = true
    this.sprite.destroy()
  }

  isCollected() {
    return this._collected
  }

  getSprite() {
    return this.sprite
  }
}
