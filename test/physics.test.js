import { describe, it, expect } from 'vitest'
import {
  GRAVITY,
  PLAYER_ACCELERATION,
  PLAYER_MAX_SPEED,
  PLAYER_DRAG,
  JUMP_VELOCITY,
} from '../src/Physics.js'

describe('Physics constants', () => {
  it('should have positive gravity that pulls player down', () => {
    expect(GRAVITY).toBeGreaterThan(0)
  })

  it('should have positive acceleration so player can speed up', () => {
    expect(PLAYER_ACCELERATION).toBeGreaterThan(0)
  })

  it('should have positive max speed', () => {
    expect(PLAYER_MAX_SPEED).toBeGreaterThan(0)
  })

  it('should have positive drag so player slows down when releasing key', () => {
    expect(PLAYER_DRAG).toBeGreaterThan(0)
  })

  it('should have negative jump velocity pointing upward', () => {
    expect(JUMP_VELOCITY).toBeLessThan(0)
  })
})
