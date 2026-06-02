// Level 2 — Intermediate
// More pits, narrower ground segments, more enemies
const GROUND_Y = 568
const GW = 64

export default {
  id: 2,
  width: 3600,
  height: 600,

  ground: [
    { x: 0,    y: GROUND_Y, width: 500, height: GW },
    { x: 600,  y: GROUND_Y, width: 400, height: GW },  // gap 500-600
    { x: 1100, y: GROUND_Y, width: 300, height: GW },  // gap 1000-1100
    { x: 1500, y: GROUND_Y, width: 500, height: GW },  // gap 1400-1500
    { x: 2100, y: GROUND_Y, width: 400, height: GW },  // gap 2000-2100
    { x: 2600, y: GROUND_Y, width: 400, height: GW },  // gap 2500-2600
    { x: 3100, y: GROUND_Y, width: 500, height: GW },  // gap 3000-3100
  ],

  platforms: [
    { x: 560,  y: 450, width: 64, height: 16 },
    { x: 1050, y: 420, width: 80, height: 16 },
    { x: 1450, y: 400, width: 80, height: 16 },
    { x: 2060, y: 430, width: 64, height: 16 },
    { x: 2550, y: 390, width: 80, height: 16 },
    { x: 3050, y: 410, width: 80, height: 16 },
  ],

  playerStart: { x: 64, y: GROUND_Y - 32 },

  enemies: [
    { x: 300,  y: GROUND_Y - 16, patrolLeft: 100,  patrolRight: 450 },
    { x: 800,  y: GROUND_Y - 16, patrolLeft: 610,  patrolRight: 980 },
    { x: 1300, y: GROUND_Y - 16, patrolLeft: 1110, patrolRight: 1380 },
    { x: 1800, y: GROUND_Y - 16, patrolLeft: 1510, patrolRight: 1980 },
    { x: 2300, y: GROUND_Y - 16, patrolLeft: 2110, patrolRight: 2480 },
    { x: 2800, y: GROUND_Y - 16, patrolLeft: 2610, patrolRight: 2980 },
    { x: 3300, y: GROUND_Y - 16, patrolLeft: 3110, patrolRight: 3550 },
  ],

  goal: { x: 3500, y: GROUND_Y - 32 },

  // Coins — 40 coins
  coins: [
    { x: 150, y: GROUND_Y - 48 }, { x: 200, y: GROUND_Y - 48 },
    { x: 250, y: GROUND_Y - 48 }, { x: 350, y: GROUND_Y - 48 },
    { x: 400, y: GROUND_Y - 48 },
    { x: 630, y: GROUND_Y - 90 }, { x: 670, y: GROUND_Y - 120 },
    { x: 700, y: GROUND_Y - 48 }, { x: 800, y: GROUND_Y - 48 },
    { x: 900, y: GROUND_Y - 48 },
    { x: 1150, y: GROUND_Y - 48 }, { x: 1250, y: GROUND_Y - 48 },
    { x: 1350, y: GROUND_Y - 48 },
    { x: 1550, y: GROUND_Y - 48 }, { x: 1600, y: GROUND_Y - 48 },
    { x: 1650, y: GROUND_Y - 48 }, { x: 1750, y: GROUND_Y - 48 },
    { x: 1850, y: GROUND_Y - 48 }, { x: 1950, y: GROUND_Y - 48 },
    { x: 2130, y: GROUND_Y - 90 }, { x: 2160, y: GROUND_Y - 120 },
    { x: 2200, y: GROUND_Y - 48 }, { x: 2300, y: GROUND_Y - 48 },
    { x: 2400, y: GROUND_Y - 48 }, { x: 2500, y: GROUND_Y - 48 },
    { x: 2630, y: GROUND_Y - 48 }, { x: 2720, y: GROUND_Y - 48 },
    { x: 2810, y: GROUND_Y - 48 }, { x: 2900, y: GROUND_Y - 48 },
    { x: 3130, y: GROUND_Y - 90 }, { x: 3160, y: GROUND_Y - 120 },
    { x: 3200, y: GROUND_Y - 48 }, { x: 3300, y: GROUND_Y - 48 },
    { x: 3400, y: GROUND_Y - 48 }, { x: 3500, y: GROUND_Y - 48 },
  ],
}
