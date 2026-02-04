# Mini Chrome (Toy Browser)

This repository contains a lightweight, static demo that sketches a Chrome-like UI in the browser. It is **not** a full browser engine. It provides a simple shell with navigation controls and an iframe to load pages.

## Tasks (high-level roadmap)
1. **UI Shell**
   - Toolbar with back/forward, reload, and address bar.
   - Tab strip (single-tab placeholder).
   - Status area for load state.
2. **Navigation**
   - Parse/normalize URLs.
   - Load URLs inside a content frame.
   - Basic history (back/forward).
3. **Page Loading**
   - Display loading state.
   - Handle errors (invalid URLs).
4. **Polish**
   - Keyboard shortcuts (Enter to navigate, Ctrl+L focus address).
   - Responsive layout and theme.

## Running locally
Open `src/index.html` in a browser, or serve it via:

```bash
python -m http.server 8000 --directory src
```

Then visit `http://localhost:8000`.
