// Level 1 — Tutorial
// Width: 3200px, Height: 600px
// Gaps are between ground segments to create pits

const GROUND_Y = 568   // 600 - 64 (ground height)
const GAP = 96         // pit width
const GW = 64          // ground height

export default {
  id: 1,
  width: 3200,
  height: 600,

  // Ground segments (brown rectangles = static platforms with gaps)
  ground: [
    { x: 0,    y: GROUND_Y, width: 800, height: GW },
    { x: 896,  y: GROUND_Y, width: 704, height: GW },  // gap 800-896
    { x: 1696, y: GROUND_Y, width: 704, height: GW },  // gap 1600-1696
    { x: 2496, y: GROUND_Y, width: 704, height: GW },  // gap 2400-2496
  ],

  // Floating platforms over or near gaps
  platforms: [
    { x: 820,  y: 460, width: 80,  height: 16 },
    { x: 860,  y: 380, width: 80,  height: 16 },
    { x: 1630, y: 440, width: 96,  height: 16 },
    { x: 2440, y: 420, width: 80,  height: 16 },
    { x: 2480, y: 340, width: 80,  height: 16 },
  ],

  // Player starting position
  playerStart: { x: 64, y: GROUND_Y - 32 },

  // Enemies: { x, y, patrolLeft, patrolRight }
  enemies: [
    { x: 400, y: GROUND_Y - 16, patrolLeft: 200, patrolRight: 700 },
    { x: 1100, y: GROUND_Y - 16, patrolLeft: 900, patrolRight: 1500 },
    { x: 1900, y: GROUND_Y - 16, patrolLeft: 1700, patrolRight: 2300 },
    { x: 2700, y: GROUND_Y - 16, patrolLeft: 2500, patrolRight: 3100 },
  ],

  // Goal position (far right, above ground)
  goal: { x: 3100, y: GROUND_Y - 32 },

  // Coins: { x, y } — 40 coins
  coins: [
    // First ground segment (0-800)
    { x: 200, y: GROUND_Y - 48 },  { x: 250, y: GROUND_Y - 48 },
    { x: 300, y: GROUND_Y - 48 },  { x: 350, y: GROUND_Y - 48 },
    { x: 450, y: GROUND_Y - 48 },  { x: 500, y: GROUND_Y - 48 },
    { x: 550, y: GROUND_Y - 48 },  { x: 600, y: GROUND_Y - 48 },
    { x: 700, y: GROUND_Y - 48 },  { x: 750, y: GROUND_Y - 100 },
    // On / above floating platforms over first gap
    { x: 940, y: 480 },  { x: 910, y: 350 },
    // Ground between gaps (896-1600)
    { x: 1000, y: GROUND_Y - 48 }, { x: 1050, y: GROUND_Y - 48 },
    { x: 1150, y: GROUND_Y - 48 }, { x: 1200, y: GROUND_Y - 48 },
    { x: 1300, y: GROUND_Y - 48 }, { x: 1350, y: GROUND_Y - 48 },
    { x: 1450, y: GROUND_Y - 48 }, { x: 1500, y: GROUND_Y - 48 },
    // Over second gap
    { x: 1600, y: GROUND_Y - 90 }, { x: 1670, y: GROUND_Y - 90 },
    // Ground after second gap (1696-2400)
    { x: 1800, y: GROUND_Y - 48 }, { x: 1850, y: GROUND_Y - 48 },
    { x: 1950, y: GROUND_Y - 48 }, { x: 2000, y: GROUND_Y - 48 },
    { x: 2100, y: GROUND_Y - 48 }, { x: 2150, y: GROUND_Y - 48 },
    { x: 2250, y: GROUND_Y - 48 }, { x: 2300, y: GROUND_Y - 48 },
    // Over third gap
    { x: 2410, y: GROUND_Y - 90 }, { x: 2490, y: GROUND_Y - 90 },
    // Final stretch (2496-3200)
    { x: 2600, y: GROUND_Y - 48 }, { x: 2700, y: GROUND_Y - 48 },
    { x: 2800, y: GROUND_Y - 48 }, { x: 2900, y: GROUND_Y - 48 },
    { x: 3000, y: GROUND_Y - 48 }, { x: 3100, y: GROUND_Y - 48 },
  ],
}
