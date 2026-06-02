// Procedural sound effects via Web Audio API oscillators
// No external audio files needed

let ctx = null

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return ctx
}

function playTone(freq, duration, type = 'square', volume = 0.15) {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, c.currentTime)
  gain.gain.setValueAtTime(volume, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start(c.currentTime)
  osc.stop(c.currentTime + duration)
}

function playSweep(startFreq, endFreq, duration, type = 'square') {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(startFreq, c.currentTime)
  osc.frequency.exponentialRampToValueAtTime(endFreq, c.currentTime + duration)
  gain.gain.setValueAtTime(0.15, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start(c.currentTime)
  osc.stop(c.currentTime + duration)
}

export const SFX = {
  jump() {
    playSweep(300, 600, 0.12, 'square')
  },

  coin() {
    playTone(988, 0.06, 'square', 0.1)
    setTimeout(() => playTone(1319, 0.10, 'square', 0.1), 60)
  },

  stomp() {
    playSweep(200, 60, 0.15, 'sawtooth')
  },

  death() {
    playSweep(400, 80, 0.4, 'sawtooth')
  },
}
