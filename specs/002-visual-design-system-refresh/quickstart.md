# Quickstart & Verification Guide: Visual Refresh

**Feature**: Visual Design System Refresh (Tokens & Supporting Sections)  
**Branch**: `002-visual-design-system-refresh`  

This guide provides testing steps to verify the visual design system updates, loading screen, floating pill navbar, restyled hero, and dynamic marquee footer.

---

## 1. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Verification Scenarios

### A. Loading Screen (~2.7s)
1. Hard reload the page (`Ctrl + F5` or `Cmd + Shift + R`).
2. Verify:
   - Full-screen dark overlay appears immediately.
   - Counter counts smoothly from `000` to `100` over ~2.7 seconds.
   - Status words cycle through technical phrases synchronously.
   - Progress bar fills with the blue accent gradient (`#89AACC` to `#4E85BF`).
   - At `100`, the overlay fades out smoothly and reveals the Hero without jumping.

### B. Floating Pill Navbar
1. At the top of the page:
   - Navbar is centered as a rounded pill with a subtle border and backdrop blur.
   - Logo has a distinct gradient ring.
2. Scroll down past 20px:
   - A deeper shadow and crisp border appear seamlessly.
3. Scroll back to top:
   - Shadow eases back to flat pill state.

### C. Restyled Hero & Role Cycling
1. Observe the Hero entrance:
   - Candidate name reveals with a subtle blur-in and translate-up transition.
   - Name features the editorial Instrument Serif italic accent.
2. Observe the role subline:
   - Cycles through verified specializations ("AI Engineer", "Computer Vision & 3D Reconstruction", etc.) every ~3.5s.
3. Verify that all biographical copy matches the verified resume.

### D. Dynamic Footer & Infinite Marquee
1. Scroll down to the bottom:
   - Marquee text loops continuously from right to left without stuttering or breaking.
   - The stats row renders 4 technical benchmark cards.
   - The green "Available for Roles" status badge pulses subtly.

### E. Mobile & Responsive Overflow Check
1. In Developer Tools, set viewport to `375px x 667px`.
2. Scroll from top to bottom.
3. Verify in Console:
   ```javascript
   document.documentElement.scrollWidth <= window.innerWidth
   ```
   **Expected**: `true` (no side-scroll).

---

## 3. Production Build Validation

Run typecheck and production build:

```bash
npm run typecheck
npm run build
```

**Expected**: Exit code 0, 0 TypeScript errors.