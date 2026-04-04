export type RuleFunction = (currentState: number, neighbors: number) => number;

export interface AutomataRule {
  name: string;
  description: string;
  calculate: RuleFunction;
  states: number; // e.g., 2 for binary (alive/dead)
  colors: string[]; // Color mapping for each state
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
    colors: ["#111111", "#ff0099"],
    calculate: (current, neighbors) => {
      return current === 0 && neighbors === 2 ? 1 : 0;
    },
  },
  highlife: {
    name: "HighLife",
    description: "Similar to Conway but with B36/S23.",
    states: 2,
    colors: ["#111111", "#00d4ff"],
    calculate: (current, neighbors) =>
      neighbors === 3 || (current === 1 && neighbors === 2) || (current === 0 && neighbors === 6) ? 1 : 0,
  },
  custom: {
    name: "Custom Labyrith set",
    description: "experimental labyrith rule-set",
    states: 2,
    colors: ["#111111", "#ffbb00"],
    calculate: (current, neighbors) =>
      current === 1 ? (neighbors === 2 || neighbors === 3 ? 1 : 0) : (neighbors === 1 ? 1 : 0),
  },
  coral: {
    name: "Coral Growth",
    description: "Organic creeping patterns. Birth on 3, survival on 4–8.",
    states: 2,
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
    calculate: (current, neighborsNext) => {
      // neighborsNext = number of neighbors in (current + 1) % states
      const threshold = 3;
      const next = (current + 1) % 8;
      return neighborsNext >= threshold ? next : current;
    },
  },
  wireish: {
    name: "Wireworld‑like",
    description:
      "Simplified Wireworld behavior: electrons move through conductive paths.",
    states: 4,
    colors: ["#111111", "#ffff00", "#ff8800", "#0000ff"], // empty, conductor, tail, head
    calculate: (current, neighbors) => {
      // neighbors = number of HEAD neighbors
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
    colors: ["#111111", "#55ff55", "#33aa33", "#116611"], // off → active → fading → faint
    calculate: (current, neighbors) => {
      // neighbors = number of ACTIVE neighbors (state 1)
      if (current === 0 && neighbors >= 2) return 1; // activation
      if (current === 1) return 2; // active → fading
      if (current === 2) return 3; // fading → faint
      if (current === 3) return 0; // faint → off
      return 0;
    },
  },
  daynight: {
    name: "Day & Night",
    description: "B3678/S34678. A symmetric rule where dead and alive cells behave similarly.",
    states: 2,
    colors: ["#111111", "#ffffff"],
    calculate: (current, neighbors) =>
      neighbors === 3 || neighbors >= 6 || (current === 1 && neighbors === 4) ? 1 : 0,
  },
  walledcities: {
    name: "Walled Cities",
    description: "B45678/S2345. Creates dense, square structures that look like fortresses.",
    states: 2,
    colors: ["#111111", "#9dff00"],
    calculate: (current, neighbors) =>
      current === 1 ? (neighbors >= 2 && neighbors <= 5 ? 1 : 0) : (neighbors >= 4 ? 1 : 0),
  },
};
