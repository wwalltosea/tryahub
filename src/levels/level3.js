// Level 3 — Challenge
// Most pits, trickiest platform placement, highest enemy density
const GROUND_Y = 568
const GW = 64

export default {
  id: 3,
  width: 4000,
  height: 600,

  ground: [
    { x: 0,    y: GROUND_Y, width: 350, height: GW },
    { x: 450,  y: GROUND_Y, width: 300, height: GW },  // gap 350-450
    { x: 850,  y: GROUND_Y, width: 250, height: GW },  // gap 750-850
    { x: 1200, y: GROUND_Y, width: 300, height: GW },  // gap 1100-1200
    { x: 1600, y: GROUND_Y, width: 400, height: GW },  // gap 1500-1600
    { x: 2100, y: GROUND_Y, width: 250, height: GW },  // gap 2000-2100
    { x: 2500, y: GROUND_Y, width: 350, height: GW },  // gap 2350-2500
    { x: 2950, y: GROUND_Y, width: 300, height: GW },  // gap 2850-2950
    { x: 3400, y: GROUND_Y, width: 600, height: GW },  // gap 3250-3400
  ],

  platforms: [
    { x: 410,  y: 440, width: 64, height: 16 },
    { x: 780,  y: 400, width: 96, height: 16 },
    { x: 1140, y: 390, width: 80, height: 16 },
    { x: 1550, y: 370, width: 80, height: 16 },
    { x: 2040, y: 420, width: 80, height: 16 },
    { x: 2400, y: 380, width: 64, height: 16 },
    { x: 2440, y: 320, width: 64, height: 16 },
    { x: 2900, y: 390, width: 80, height: 16 },
    { x: 3300, y: 380, width: 80, height: 16 },
  ],

  playerStart: { x: 64, y: GROUND_Y - 32 },

  enemies: [
    { x: 200,  y: GROUND_Y - 16, patrolLeft: 50,   patrolRight: 330 },
    { x: 550,  y: GROUND_Y - 16, patrolLeft: 460,  patrolRight: 730 },
    { x: 950,  y: GROUND_Y - 16, patrolLeft: 860,  patrolRight: 1080 },
    { x: 1350, y: GROUND_Y - 16, patrolLeft: 1210, patrolRight: 1480 },
    { x: 1750, y: GROUND_Y - 16, patrolLeft: 1610, patrolRight: 1980 },
    { x: 2200, y: GROUND_Y - 16, patrolLeft: 2110, patrolRight: 2330 },
    { x: 2600, y: GROUND_Y - 16, patrolLeft: 2510, patrolRight: 2830 },
    { x: 3100, y: GROUND_Y - 16, patrolLeft: 2960, patrolRight: 3230 },
    { x: 3600, y: GROUND_Y - 16, patrolLeft: 3410, patrolRight: 3950 },
  ],

  goal: { x: 3900, y: GROUND_Y - 32 },

  // Coins — 40 coins
  coins: [
    { x: 100, y: GROUND_Y - 48 }, { x: 150, y: GROUND_Y - 48 },
    { x: 200, y: GROUND_Y - 48 }, { x: 250, y: GROUND_Y - 48 },
    { x: 500, y: GROUND_Y - 48 }, { x: 560, y: GROUND_Y - 48 },
    { x: 620, y: GROUND_Y - 48 }, { x: 680, y: GROUND_Y - 48 },
    { x: 900, y: GROUND_Y - 48 }, { x: 960, y: GROUND_Y - 48 },
    { x: 1020, y: GROUND_Y - 48 },
    { x: 1250, y: GROUND_Y - 48 }, { x: 1350, y: GROUND_Y - 48 },
    { x: 1450, y: GROUND_Y - 48 },
    { x: 1650, y: GROUND_Y - 48 }, { x: 1750, y: GROUND_Y - 48 },
    { x: 1850, y: GROUND_Y - 48 }, { x: 1950, y: GROUND_Y - 48 },
    { x: 2150, y: GROUND_Y - 48 }, { x: 2250, y: GROUND_Y - 48 },
    { x: 2350, y: GROUND_Y - 48 },
    { x: 2550, y: GROUND_Y - 48 }, { x: 2650, y: GROUND_Y - 48 },
    { x: 2750, y: GROUND_Y - 48 },
    { x: 3000, y: GROUND_Y - 48 }, { x: 3100, y: GROUND_Y - 48 },
    { x: 3200, y: GROUND_Y - 48 },
    { x: 3450, y: GROUND_Y - 48 }, { x: 3550, y: GROUND_Y - 48 },
    { x: 3650, y: GROUND_Y - 48 }, { x: 3750, y: GROUND_Y - 48 },
    { x: 3850, y: GROUND_Y - 48 },
    { x: 400,  y: GROUND_Y - 100 }, { x: 790,  y: GROUND_Y - 100 },
    { x: 1140, y: GROUND_Y - 100 }, { x: 1550, y: GROUND_Y - 100 },
    { x: 2400, y: GROUND_Y - 100 }, { x: 3300, y: GROUND_Y - 100 },
  ],
}
