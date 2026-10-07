# 🌌 Reactive Universe — React + Three.js

This project demonstrates how to integrate **Three.js (imperative rendering)** inside **React’s declarative lifecycle** **without using React Three Fiber**.

The focus is on understanding what actually happens behind the scenes — render loops, refs, lifecycle management, interaction handling, and cleanup — instead of relying on abstractions.

---

## 🧠 Core Principles Followed

- **React State** → UI logic and interaction decisions  
- **Refs (`useRef`)** → Three.js objects (scene, camera, meshes, renderer)  
- **No recreation of Three.js objects on re-render**
- **Manual animation loop using `requestAnimationFrame`**
- **Explicit cleanup to avoid GPU memory leaks**
========
---

## 🚀 Features Implemented

- Three.js scene hosted inside a React component
- Perspective camera with OrbitControls
- Animated rotating sphere (Sun)
- Raycasting for mouse interaction
- Click-based interaction with material changes
- Subtle emissive glow for realism
- Responsive resize handling
- Proper disposal of geometries, materials, renderer, and controls

---

## 🛠 Tech Stack

- **React (Vite)**
- **Three.js**
- **JavaScript (ES6+)**
- **WebGL**
- No React Three Fiber
- No rendering abstractions

---
