"use client";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: open ? "space-between" : "center",
          alignItems: "center",
          border: "1px solid red",
          position: "absolute",
          right: 0,
          width: open ? 256 : 20,
        }}
      >
        {open && <div>nav-bar</div>}

        <div onClick={() => setOpen(!open)} style={{ cursor: "pointer", width: 18}}>
          <h1>X</h1>
        </div>
      </nav>
    </>
  );
}
