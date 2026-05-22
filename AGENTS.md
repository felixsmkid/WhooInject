# AGENTS.md

## Cursor Cloud specific instructions

### Project Overview
Whoo Inject System is an Electron + React desktop application with a dark futuristic gaming UI.

### Development Commands
- `npm run dev` — Starts Vite dev server + Electron (requires display for Electron)
- `npx vite` — Starts only the Vite dev server at http://localhost:5173 (use this for headless testing)
- `npx vite build` — Production build to `dist/`
- `npx eslint src/ --ext .js,.jsx` — Run linting
- `npm run dist` — Build Windows EXE (requires Windows)

### Notes for Cloud Agents
- The Vite dev server runs on port 5173. The React app is fully testable in a browser without Electron.
- Electron features (window controls, Steam registry detection, Device ID) gracefully degrade when running in a browser — they show fallback values.
- Use `npx vite` (not `npm run dev`) in cloud environments since Electron requires a display server.
- The `postcss.config.js` warning about module type is harmless and does not affect functionality.
- TailwindCSS arbitrary values use bracket notation (e.g., `bg-white/[0.08]`) instead of simple fractions for opacity values not in the default scale.
