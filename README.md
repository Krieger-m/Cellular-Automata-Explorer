# 🧬 Cellular Automata Explorer

A visual, interactive tool for exploring a curated collection of **cellular automata** systems where simple rules give rise to surprisingly complex, organic behavior.  
This project lets you experiment with different automata, tweak parameters, and watch patterns evolve in real time.

live version available here: [Cellular-Automata-Explorer](https://automata.mk-dev.org/)

## 🌟 Overview

Cellular automata are rule‑based grids where each cell updates based on its neighbors.  
Despite their simplicity, they produce intricate structures: oscillators, gliders, chaotic fields, crystal‑like growth, and more.

This explorer provides a clean interface to browse, visualize, and understand a variety of well‑known and lesser‑known automata.

## 🧱 Features

- Interactive canvas with smooth rendering  
- Modular rule system (easy to add new automata)  
- Click any rule to explore its behavior  
- Responsive UI built with modern web technologies  
- A curated library of automata with unique dynamics

## 🧬 Included Automata

Based on the live explorer, the project currently includes:

- **Conway’s Game of Life**  
- **Seeds**  
- **Star Wars**  
- **Amoeba**  
- **HighLife**  
- **Labyrinth**  
- **Coral Growth**  
- **Crackle**  
- **Cyclic CA**  
- **Brian’s Brain‑like**  
- **Crystal Growth**  
- **Slime Mold**  
- **Day & Night**  
- **Walled Cities**  
- **Fire Spread**  
- **Maze**  
- **Assimilation**  
- **Spaceships**  
- **Wireworld‑like**  
- …and more

(Each rule has its own personality, visual style, and emergent behavior.)  


## 📁 Project Structure

The repository is organized into modular components and rule definitions:

```
public/
src/
  _components/
    Canvas.tsx
    ModularCanvas.tsx
    Header.tsx
    Navbar.tsx
    Spacing.tsx
  app/
    [slug]/
      page.tsx
  icon.png
  layout.tsx
  page.tsx
  styles/
  lib/
    automata-rules.ts
package.json
tsconfig.json
next.config.ts
eslint.config.mjs
README.md
```

## 🛠️ Tech Stack

- **Next.js**  
- **TypeScript**  
- **React**  
- **Custom Canvas Rendering**  
- **Modular rule engine** for defining automata behavior

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/Krieger-m/Cellular-Automata-Explorer
cd Cellular-Automata-Explorer
```
Install dependencies:

```bash
npm install
```
Start the development server:

```bash
npm run dev
```
Then open:

```
http://localhost:3020
```
  
## 🧩 How It Works
Each automaton is defined by:
- A neighborhood rule
- A state transition function
- Optional coloring logic
- Optional multi‑state behavior
- Rules are stored in lib/automata-rules.ts, making it easy to add new ones or modify existing ones.

## 📦 Deployment
The project runs in any Node.js environment.

Build and start:

```bash
npm run build
npm start
```
  
## 📜 License
MIT — feel free to explore, modify, and extend.
  
