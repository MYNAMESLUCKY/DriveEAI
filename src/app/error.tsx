"use client";

import React from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <div style={{ color: "red", padding: 20 }}>
          <h2>Something went wrong.</h2>
          <pre>{error.message}</pre>
          <button onClick={reset} style={{ marginTop: 16, padding: 8, background: "#eee" }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
