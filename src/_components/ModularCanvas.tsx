"use client";

import { useEffect, useRef } from "react";
import { Rules } from "@/lib/automata-rules";

interface Props {
  width?: number;
  height?: number;
  cellSize?: number;
  ruleKey: keyof typeof Rules;
}

export function ModularCanvas({
  width = 1000,
  height = 600,
  cellSize = 6,
  ruleKey,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);
  const currentRule = Rules[ruleKey];
  const cols = Math.floor(width / cellSize);
  const rows = Math.floor(height / cellSize);
  const gridSize = cols * rows;

  const createGrid = () => {
    const density = currentRule.density ?? 0.85;
    return new Uint8Array(gridSize).map(() => {
      if (Math.random() > density) {
        // Initialize with a random non-zero state (1 to states-1)
        return Math.floor(Math.random() * (currentRule.states - 1)) + 1;
      }
      return 0;
    });
  };

  const gridRef = useRef<Uint8Array>(createGrid());
  const bufferRef = useRef<Uint8Array>(createGrid());

  const draw = (ctx: CanvasRenderingContext2D, grid: Uint8Array) => {
    const colors = currentRule.colors;
    const size = cellSize - 1;

    // 1. Draw background once
    ctx.fillStyle = colors[0];
    ctx.fillRect(0, 0, width, height);

    // 2. Performance: Group draw calls by state to minimize fillStyle changes
    for (let s = 1; s < currentRule.states; s++) {
      ctx.fillStyle = colors[s] || colors[1];
      for (let r = 0; r < rows; r++) {
        const rowOffset = r * cols;
        const y = r * cellSize;
        for (let c = 0; c < cols; c++) {
          if (grid[rowOffset + c] === s) {
            ctx.fillRect(c * cellSize, y, size, size);
          }
        }
      }
    }
  };

  const computeNext = (currentGrid: Uint8Array, nextGrid: Uint8Array) => {
    const rule = currentRule;
    const filter = rule.neighborFilter;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let neighbors = 0;
        const idx = r * cols + c;
        const currentState = currentGrid[idx];

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;

            let neighborR = r + i;
            let neighborC = c + j;

            // Fast Toroidal wrapping
            if (neighborR < 0) neighborR = rows - 1;
            else if (neighborR >= rows) neighborR = 0;
            if (neighborC < 0) neighborC = cols - 1;
            else if (neighborC >= cols) neighborC = 0;

            const neighborState = currentGrid[neighborR * cols + neighborC];
            const isNeighbor = filter
              ? filter(neighborState, currentState)
              : neighborState === 1;
            if (isNeighbor) neighbors++;
          }
        }
        nextGrid[idx] = rule.calculate(currentState, neighbors);
      }
    }
  };

  useEffect(() => {
    // Re-initialize grids when rule changes
    gridRef.current = createGrid();
    bufferRef.current = createGrid();

    const targetFps = currentRule.targetFps ?? 60;
    const frameInterval = 1000 / targetFps;

    const loop = (timestamp: number) => {
      const elapsed = timestamp - lastUpdateRef.current;

      // Only update if the time elapsed exceeds our frame interval
      if (elapsed >= frameInterval) {
        lastUpdateRef.current = timestamp - (elapsed % frameInterval);

        const ctx = canvasRef.current?.getContext("2d", { alpha: false });
        if (!ctx) return;

        computeNext(gridRef.current, bufferRef.current);

        const temp = gridRef.current;
        gridRef.current = bufferRef.current;
        bufferRef.current = temp;

        draw(ctx, gridRef.current);
      }

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [ruleKey]); // Restart loop if rule changes

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded-lg shadow-2xl border border-white/10"
    />
  );
}
