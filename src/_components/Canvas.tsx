"use client";

import { useEffect, useRef } from "react";

interface CanvasProps {
  width?: number;
  height?: number;
  cellSize?: number;
}

export function CanvasElement({
  width = 1000,
  height = 800,
  cellSize = 5,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);

  // Setup grid dimensions
  const cols = Math.floor(width / cellSize);
  const rows = Math.floor(height / cellSize);

  // Initialize grid in a ref to avoid React render cycles
  const gridRef = useRef<number[][]>(
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => (Math.random() > 0.8 ? 1 : 0)),
    ),
  );

  const drawGrid = (ctx: CanvasRenderingContext2D, grid: number[][]) => {
    ctx.clearRect(0, 0, width, height);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c]) {
          const x = c * cellSize;
          const y = r * cellSize;

          // Create a radial gradient centered in the cell
          const gradient = ctx.createRadialGradient(
            x + cellSize / 2, // inner center X
            y + cellSize / 2, // inner center Y
            1, // inner radius
            x + cellSize / 2, // outer center X
            y + cellSize / 2, // outer center Y
            cellSize / 3, // outer radius
          );

          gradient.addColorStop(0, "#ffdd00"); // bright center
          gradient.addColorStop(1, "#00d0ff"); // outer glow

          ctx.fillStyle = gradient;
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      }
    }
  };

  const nextGen = (grid: number[][]) => {
    const next = grid.map((arr) => [...arr]);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let neighbors = 0;

        // Check 8 neighbors
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) continue;
            const x = r + i;
            const y = c + j;
            if (x >= 0 && x < rows && y >= 0 && y < cols) {
              neighbors += grid[x][y];
            }
          }
        }

        // Conway's Game of Life Rules
        if (grid[r][c] === 1 && (neighbors < 2 || neighbors > 3)) {
          next[r][c] = 0;
        } else if (grid[r][c] === 0 && neighbors === 3) {
          next[r][c] = 1;
        }
      }
    }
    return next;
  };

  const update = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    gridRef.current = nextGen(gridRef.current);
    drawGrid(ctx, gridRef.current);

    // Control speed by wrapping in a timeout if needed,
    // or just let it rip at 60fps:
    setTimeout(() => {
      requestRef.current = requestAnimationFrame(update);
    }, 40);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initial draw
    drawGrid(ctx, gridRef.current);

    // Start loop
    requestRef.current = requestAnimationFrame(update);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        background: "#111",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ border: "1px solid #2c2c2c" }}
      />
    </div>
  );
}
