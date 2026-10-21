import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return <main style={{ fontFamily: "system-ui", maxWidth: 720, margin: "4rem auto", padding: "1rem" }}>
    <h1>DeployGuard CI Test</h1>
    <p>Node.js + Express API and React + Vite frontend.</p>
    <p>Use this repository to test GitHub Actions failure detection.</p>
  </main>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
