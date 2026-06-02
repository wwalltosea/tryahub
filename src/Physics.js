// Physics constants — sourced from documented Super Mario Bros. physics
// Scaled for Phaser Arcade Physics coordinate system (pixels)
// Tuning: change these values here and the whole game adapts

export const GRAVITY = 600            // pixels/s², pulls player downward
export const PLAYER_ACCELERATION = 600 // pixels/s², horizontal acceleration
export const PLAYER_MAX_SPEED = 200    // pixels/s, max horizontal speed
export const PLAYER_DRAG = 300         // pixels/s², deceleration when no input
export const JUMP_VELOCITY = -480      // pixels/s, negative = upward (jump height ≈192px)
