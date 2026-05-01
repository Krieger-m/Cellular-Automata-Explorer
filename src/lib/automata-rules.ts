export type RuleFunction = (currentState: number, neighbors: number) => number;

export interface AutomataRule {
  name: string;
  description: string;
  calculate: RuleFunction;
  states: number; // e.g., 2 for binary (alive/dead)
  density?: number;
  colors: string[]; // Color mapping for each state
  neighborFilter?: (state: number, current: number) => boolean;
  targetFps?: number; // Optional target updates per second
}

export const Rules: Record<string, AutomataRule> = {
  conway: {
    name: "Conway's Game of Life",
    description: "Standard B3/S23 rules.",
    states: 2,
    colors: ["#111111", "#00ff00"],
    calculate: (current, neighbors) =>
      neighbors === 3 || (current === 1 && neighbors === 2) ? 1 : 0,
  },
  seeds: {
    name: "Seeds",
    description:
      "Cells are born if they have exactly 2 neighbors. Everything else dies.",
    states: 2,
    density: 0.24, // Adjusted to represent chance of being ALIVE
    colors: ["#111111", "#ff0099"],
    calculate: (current, neighbors) => {
      // Birth on 2, No survival
      return current === 0 && neighbors === 2 ? 1 : 0;
    },
  },
  starwars: {
    name: "Star Wars",
    description:
      "B2/S345 with 4 states. Produces chaotic, high-speed 'spaceships' and complex structures.",
    states: 4,
    colors: ["#111111", "#ffffff", "#0088ff", "#004488"],
    calculate: (current, neighbors) => {
      if (current === 0) return neighbors === 2 ? 1 : 0; // Birth
      if (current === 1) {
        // Survival
        return neighbors >= 3 && neighbors <= 5 ? 1 : 2;
      }
      // Decay for states 2 and 3
      return (current + 1) % 4;
    },
  },
  amoeba: {
    name: "Amoeba",
    description: "Life-like rule B357/S1358. Produces shifting, organic blobs.",
    states: 2,
    density: 0.89,
    colors: ["#111111", "#ff55ff"],
    calculate: (current, neighbors) => {
      const birth = neighbors === 3 || neighbors === 5 || neighbors === 7;
      const survive =
        neighbors === 1 ||
        neighbors === 3 ||
        neighbors === 5 ||
        neighbors === 8;
      return birth || (current === 1 && survive) ? 1 : 0;
    },
  },
  highlife: {
    name: "HighLife",
    description: "Similar to Conway but with B36/S23.",
    states: 2,
    colors: ["#111111", "#00d4ff"],
    calculate: (current, neighbors) =>
      neighbors === 3 ||
      (current === 1 && neighbors === 2) ||
      (current === 0 && neighbors === 6)
        ? 1
        : 0,
  },
  custom: {
    name: "Labyrith set",
    description: "experimental labyrith rule-set",
    states: 2,
    colors: ["#111111", "#ffbb00"],
    calculate: (current, neighbors) =>
      current === 1
        ? neighbors === 2 || neighbors === 3
          ? 1
          : 0
        : neighbors === 1
          ? 1
          : 0,
  },
  coral: {
    name: "Coral Growth",
    description: "Organic creeping patterns. Birth on 3, survival on 4–8.",
    states: 2,
    density: 0.89,
    colors: ["#111111", "#ff6600"],
    calculate: (current, neighbors) =>
      neighbors === 3 || (current === 1 && neighbors >= 4) ? 1 : 0,
  },
  crackle: {
    name: "Crackle",
    description:
      "Chaotic lightning-like activity. Birth on 1, survival on 1–2.",
    states: 2,
    colors: ["#111111", "#aaff00"],
    calculate: (current, neighbors) =>
      neighbors === 1 || (current === 1 && neighbors === 2) ? 1 : 0,
  },
  cyclic: {
    name: "Cyclic CA",
    description:
      "Each state is replaced by the next if enough neighbors have that next state.",
    states: 8,
    targetFps: 30, // Throttled to make spirals readable
    density: 0.1, // Full grid (low density of 0s) is required for wave propagation
    colors: [
      "#111111",
      "#ff0000",
      "#ffa500",
      "#ffff00",
      "#00ff00",
      "#00ffff",
      "#0000ff",
      "#ff00ff",
    ],
    neighborFilter: (state, current) => state === (current + 1) % 8,
    calculate: (current, neighborsNext) => {
      const threshold = 1; // Lower threshold creates more chaotic, faster spirals
      const next = (current + 1) % 8;
      return neighborsNext >= threshold ? next : current;
    },
  },

  briansbrain: {
    name: "Brian's Brain‑like",
    description:
      "Cells fire if exactly 2 neighbors are firing. Classic excitable medium.",
    states: 3,
    colors: ["#111111", "#00aaff", "#555555"], // off, firing, refractory
    calculate: (current, neighbors) => {
      if (current === 0 && neighbors === 2) return 1; // birth
      if (current === 1) return 2; // firing → refractory
      if (current === 2) return 0; // refractory → off
      return 0;
    },
  },
  crystal: {
    name: "Crystal Growth",
    description:
      "Diffusion-limited crystal growth. Cells freeze when near frozen neighbors.",
    states: 2,
    density: 0.999,
    colors: ["#111111", "#99ddff"],
    calculate: (current, neighbors) => {
      // If a cell has at least 1 frozen neighbor, it freezes.
      if (current === 0 && neighbors >= 1) return 1;
      return current;
    },
  },
  slime: {
    name: "Slime Mold",
    description:
      "Excitable growth with slow decay, forming vein-like networks.",
    states: 4,
    density: 0.9,
    colors: ["#111111", "#55ff55", "#33aa33", "#116611"], // off → active → fading → faint
    neighborFilter: (state) => state === 1, // Only count "ACTIVE" neighbors
    calculate: (current, neighbors) => {
      if (current === 0 && neighbors >= 2) return 1; // activation
      if (current === 1) return 2; // active → fading
      if (current === 2) return 3; // fading → faint
      if (current === 3) return 0; // faint → off
      return 0;
    },
  },
  // daynight: {
  //   name: "Day & Night",
  //   description:
  //     "B3678/S34678. A symmetric rule where dead and alive cells behave similarly.",
  //   states: 2,
  //   colors: ["#111111", "#ffffff"],
  //   calculate: (current, neighbors) =>
  //     neighbors === 3 || neighbors >= 6 || (current === 1 && neighbors === 4)
  //       ? 1
  //       : 0,
  // },
  daynight2: {
    name: "Day & Night",
    description: "B3678/S34678. Symmetric rule where Day and Night are duals.",
    states: 2,
    density: 0.5,
    colors: ["#111111", "#ffffff"],
    calculate: (current, neighbors) => {
      if (current === 1) {
        // Survival: 3, 4, 6, 7, 8
        return neighbors === 3 || neighbors === 4 || neighbors >= 6 ? 1 : 0;
      } else {
        // Birth: 3, 6, 7, 8
        return neighbors === 3 || neighbors >= 6 ? 1 : 0;
      }
    },
  },
  walledcities: {
    name: "Walled Cities",
    description:
      "B45678/S2345. Creates dense, square structures that look like fortresses.",
    states: 2,
    density: 0.8,
    colors: ["#111111", "#9dff00"],
    calculate: (current, neighbors) =>
      current === 1
        ? neighbors >= 2 && neighbors <= 5
          ? 1
          : 0
        : neighbors >= 4
          ? 1
          : 0,
  },
  fire: {
    name: "Fire Spread",
    description:
      "Burning cells ignite trees. Smoldering cells become ash. Empty space regrows trees spontaneously.",
    states: 4, // Increased states to 4
    targetFps: 12, // Slowed down significantly for observation
    density: 0.2, // Keep density low for less initial chaos
    // Tree (1) counts Burning (2) neighbors. Ash (0) counts Tree (1) neighbors for regrowth.
    neighborFilter: (state, current) =>
      current === 1 ? state === 2 : state === 1,
    colors: ["#111111", "#22aa22", "#ff3300", "#884400"], // ash, tree, burning, smoldering
    calculate: (current, neighbors) => {
      switch (current) {
        case 0: // Ash regrows to Tree
          return Math.random() > 0.98 ? 1 : 0; // Spontaneous regrowth is much slower
        case 1: // Tree becomes Burning
          return neighbors >= 1 && neighbors <= 4 ? 2 : 1; // Spread condition
        case 2: // Burning becomes Smoldering
          return 3;
        case 3: // Smoldering becomes Ash
          return 0;
        default:
          return 0;
      }
    },
  },
  maze: {
    name: "Maze",
    description:
      "B3/S12345. Generates stable maze-like patterns and corridors.",
    states: 2,
    density: 0.05,
    colors: ["#111111", "#00ffaa"],
    calculate: (current, neighbors) => {
      const birth = neighbors === 3;
      const survive = neighbors >= 1 && neighbors <= 5;
      return birth || (current === 1 && survive) ? 1 : 0;
    },
  },
  assimilation: {
    name: "Assimilation",
    description:
      "B345/S4567. Creates very stable, organic 'blobs' that slowly merge and move.",
    states: 2,
    density: 0.83,
    colors: ["#111111", "#66ffcc"],
    calculate: (current, neighbors) =>
      current === 1
        ? neighbors >= 4 && neighbors <= 7
          ? 1
          : 0
        : neighbors >= 3 && neighbors <= 5
          ? 1
          : 0,
  },
  spaceships: {
    name: "Spaceships",
    description: "Produces high-speed spaceships and other complex structures.",
    states: 5,
    density: 0.6,
    colors: ["#111111", "#a3a3a3", "#aa00ff", "#680088"],
    calculate: (current, neighbors) => {
      if (current === 0) return neighbors === 2 ? 1 : 0;
      if (current === 1) return neighbors >= 3 && neighbors <= 5 ? 1 : 2;
      if (current === 2) return 3;
      if (current === 3) return 4;
      return 0;
    },
  },
  wireish: {
    name: "Wireworld‑like",
    description:
      "Simplified Wireworld behavior: electrons move through conductive paths.",
    states: 4,
    targetFps: 15, // Significantly slower to see signal propagation
    density: 0.74,
    colors: ["#111111", "#ffff00", "#ff8800", "#0000ff"], // empty, conductor, tail, head
    neighborFilter: (state) => state === 3, // Only count "HEAD" neighbors
    calculate: (current, neighbors) => {
      switch (current) {
        case 3: // HEAD → TAIL
          return 2;
        case 2: // TAIL → CONDUCTOR
          return 1;
        case 1: // CONDUCTOR → HEAD if 1 or 2 head neighbors
          return neighbors === 1 || neighbors === 2 ? 3 : 1;
        default: // EMPTY stays EMPTY
          return 0;
      }
    },
  },
  test: {
    name: "test",
    description: "test structure",
    states: 2,
    density: 0.5,
    colors: ["#111111", "#680088"],
    calculate: (current, neighbors) => {
      if (current === 0 && (neighbors === 4 || neighbors === 6)) {
        return 1;
      }
      return 0;
    },
  },
};
