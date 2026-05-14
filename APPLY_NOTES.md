# Patch notes

Changed Home from the Vite placeholder into a JSON-driven game showcase.

## Files

- `src/App.tsx` — loads `public/games.json`, renders game cards, resolves relative URLs with Vite `BASE_URL`.
- `src/App.css` — responsive showcase layout and game card styling.
- `public/games.json` — current game list with one Clockwork Crisis entry.
- `public/images/clockwork-crisis-screenshot.png` — screenshot image used by the Clockwork card.
- `README.md` — updated usage note for the JSON game list.
- `0001-add-json-driven-game-showcase-home.patch` — git patch for the same changes.

## Validation run

```bash
npm install
npm run build
npm run lint
```

Both `npm run build` and `npm run lint` passed in the patch workspace.

## Push status

A local commit was created:

```text
31ac61e Add JSON-driven game showcase home
```

`git push origin main` could not complete from this environment because `github.com` DNS/network access was unavailable.
