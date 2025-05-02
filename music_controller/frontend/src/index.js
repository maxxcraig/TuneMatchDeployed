import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import $ from "jquery";
import "./global.css";

// 🎨 Gradient animation colors
const colors = [
  [62, 35, 255],
  [60, 255, 60],
  [255, 35, 98],
  [45, 175, 230],
  [255, 0, 255],
  [255, 128, 0],
];

let step = 0;
let colorIndices = [0, 1, 2, 3];
const gradientSpeed = 0.002;

function updateGradient() {
  if (typeof window.$ === "undefined") return;

  const c0_0 = colors[colorIndices[0]];
  const c0_1 = colors[colorIndices[1]];
  const c1_0 = colors[colorIndices[2]];
  const c1_1 = colors[colorIndices[3]];

  const istep = 1 - step;
  const r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  const g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  const b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  const color1 = `rgb(${r1},${g1},${b1})`;

  const r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  const g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  const b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  const color2 = `rgb(${r2},${g2},${b2})`;

  const gradientDiv = $("#gradient");
  if (gradientDiv.length > 0) {
    console.log("✅ #gradient found, setting background");
    gradientDiv.css({
      background: `linear-gradient(to right, ${color1}, ${color2})`,
    });
  } else {
    console.warn("❌ #gradient NOT found");
  }

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    colorIndices[1] =
      (colorIndices[1] +
        Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
    colorIndices[3] =
      (colorIndices[3] +
        Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
  }
}

// ⏳ Wait until DOM is ready and React has mounted
document.addEventListener("DOMContentLoaded", () => {
  setInterval(updateGradient, 10);
});

// 🔁 Mount React app
const root = createRoot(document.getElementById("root"));
root.render(<App />);
