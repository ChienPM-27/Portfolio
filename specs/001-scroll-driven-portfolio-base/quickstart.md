# Quickstart & Validation Guide

**Feature**: Scroll-Driven Interactive Portfolio (Base & Project Registry)  
**Branch**: `001-scroll-driven-portfolio-base`  

This document outlines the validation procedures to confirm the baseline application, project registry, and scroll infrastructure function correctly.

---

## 1. Prerequisites & Installation

Verify that Node.js (v18+) and npm are available:

```bash
node -v
npm -v
```

Install project dependencies (Next.js, React, Three.js, R3F, Drei, GSAP, Tailwind CSS):

```bash
npm install
```

---

## 2. Development Mode & Sanity Checks

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

### Expected Behavior:
- The Hero section renders immediately with the name **Pham Minh Chien**, role **AI Engineer**, and technical positioning statement.
- Scrolling down reveals `project-a` with its visual scene entering from the left.
- Continuing to scroll reveals `project-b` with its visual scene entering from the right.
- Continuing to scroll reveals `project-c` with its visual scene entering from the left.
- Reaching the bottom reveals the About/Contact section with verified resume details (Sai Gon University) and GitHub link (`ChienPM-27`).
- Zero console runtime errors in browser developer tools.

---

## 3. Production Build Validation

Validate TypeScript typing and compilation:

```bash
npm run build
```

### Expected Behavior:
- `next build` finishes with exit code 0.
- Zero TypeScript type errors or implicit `any` violations.
- Static assets and bundles are generated cleanly without hydration errors.

---

## 4. Modular Registry Proof Test

To verify Principle I of the Constitution (Modular Project Architecture):

1. Duplicate `projects/project-a` to create `projects/test-project`.
2. In `projects/test-project/data.ts`, update `slug: "test-project"` and `title: "Test Modular Project"`.
3. In `projects/registry.ts`, import `test-project` and add it to the `projects` array.
4. Reload the page:
   - The new project appears in the scroll sequence.
   - Zero modifications were made to `projects/project-a`, `project-b`, `project-c`, or any global shell components.

---

## 5. Mobile Responsiveness & Overflow Test

1. In Google Chrome or Edge, open Developer Tools (F12) and toggle Device Toolbar.
2. Select iPhone SE or set viewport dimensions to `375px x 667px`.
3. Scroll through the entire page from top to bottom.
4. Open the Developer Console and run:
   ```javascript
   document.documentElement.scrollWidth <= window.innerWidth
   ```
   **Expected result**: `true` (indicating zero horizontal overflow).
5. Verify that text remains legible, touch scrolling is natural, and visual scenes render smoothly without clipping.

---

## 6. Privacy & Security Audit

Inspect the DOM markup on the live page:
1. Search for `0766 302 634` -> MUST return 0 occurrences.
2. Search for plain text `pminhchien2006@gmail.com` in static DOM -> MUST NOT appear as plain un-obfuscated text.