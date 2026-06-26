# 🛡️ Armory — Next-Gen AI Automation Platform

Armory is a premium, high-converting, and fully responsive landing page for an advanced AI automation and agent deployment platform. It features state-of-the-art interactive 3D assets, high-fidelity responsive layout conversions, and performance-optimized state management.

---

## ✨ Key Features

### 1. ⚡ Zero Re-Render Pricing Engine
- **Granular Updates**: Powered by a custom vanilla TypeScript pub-sub state store (`priceStore.ts`) that holds the active currency (`USD`, `EUR`, `INR`) and billing cycle (`monthly`, `annual`).
- **Isolated Re-renders**: Leaf nodes (`PriceNode.tsx`) subscribe directly to the store on mount, performing isolated updates. The parent cards and sections remain static, resulting in zero paint reflows or component tree updates when toggling options.
- **PPP & regional tariff discounts**: Calculations are performed dynamically using a multi-dimensional matrix (20% regional tariff discount applied on `INR` and 20% annual billing discount).

### 2. 🎛️ Bento-to-Accordion Grid (Context Locked)
- **Viewport Switch**: Integrates a `ResizeObserver` listener via the `useBreakpoint` hook to detect responsive thresholds. 
- **Context Preservation**: Shares a unified index between the desktop bento cards and the mobile accordion list. When resizing the screen, the layout refactors automatically and preserves the active index, smoothly opening the corresponding mobile accordion panel.

### 3. 👤 Interactive 3D Clay Character
- **Mouse Tracking**: Features a 3D clay avatar whose head and gaze track the user's cursor interactively using matrix rotations.
- **Code-Split Loading**: The heavy WebGL elements are code-split and loaded lazily post-initial paint to maximize First Contentful Paint (FCP) performance.
- **Safety Fallbacks**: Includes a `WebGLErrorBoundary` and a secure context check (`crypto.subtle` check) to fall back to a shimmering vector graphic if WebGL or secure APIs are unavailable.

### 4. 🎨 Futuristic Cyberpunk Aesthetics
- **Neon Text Gradients**: Implements custom lavender-rose-orange gradients (`.text-gradient-neon`) on headings.
- **Corner Brackets**: Interactive bounding frames (`.corner-frame`) mimicking modern developer dashboards that highlight dynamically on hover.

---

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript
- **3D Engine**: Three.js, Three-Stdlib
- **Bundler**: Vite
- **Styling**: TailwindCSS, Custom Glassmorphism, Vanilla CSS Transitions

---
