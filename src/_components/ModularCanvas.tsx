'use client';

import { useEffect, useRef } from "react";
import { AutomataRule, Rules } from "@/lib/automata-rules";

interface Props {
  width?: number;
  height?: number;
  cellSize?: number;
  ruleKey: keyof typeof Rules;
}

export function ModularCanvas({ width = 1000, height = 600, cellSize = 6, ruleKey }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const currentRule = Rules[ruleKey];

  const density = currentRule.density ?? 0.85

  const cols = Math.floor(width / cellSize);
  const rows = Math.floor(height / cellSize);
  const gridRef = useRef<number[][]>(
    Array.from({ length: rows }, () => 
      Array.from({ length: cols }, () => (Math.random() > density ? 1 : 0))
    )
  );

  const draw = (ctx: CanvasRenderingContext2D, grid: number[][]) => {
    ctx.fillStyle = currentRule.colors[0]; // Background
    ctx.fillRect(0, 0, width, height);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const state = grid[r][c];
        if (state > 0) {
          ctx.fillStyle = currentRule.colors[state];
          ctx.fillRect(c * cellSize, r * cellSize, cellSize - 1, cellSize - 1);
        }
      }
    }
  };

  const computeNext = (grid: number[][]) => {
    const next = grid.map(row => [...row]);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let neighbors = 0;
        // Optimization: Standard 3x3 neighborhood check
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const x = (r + i + rows) % rows; // Toroidal (wrapping) grid
            const y = (c + j + cols) % cols;
            neighbors += grid[x][y] === 1 ? 1 : 0;
          }
        }
        next[r][c] = currentRule.calculate(grid[r][c], neighbors);
      }
    }
    return next;
  };

  useEffect(() => {
    const loop = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      gridRef.current = computeNext(gridRef.current);
      draw(ctx, gridRef.current);
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
