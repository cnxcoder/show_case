# Game Showcase

React + Vite home page for playable web game builds.

## Structure

```text
src/
  App.tsx                 # Home page composition
  components/GameCard.tsx # Reusable game card
  lib/games.ts            # Runtime loader for public/games.json
  lib/url.ts              # Vite base-path URL helper
  types/game.ts           # Shared game data types
public/
  games.json              # Editable game catalog
  images/                 # Showcase thumbnails
games/
  clockwork/              # Unity WebGL build served by the game catalog
```

## Game list

The home page loads `public/games.json` at runtime.

```json
{
  "games": [
    {
      "title": "Clockwork Crisis",
      "description": "Cute colorful steampunk isometric puzzle adventure.",
      "url": "games/clockwork/",
      "imageUrl": "images/clockwork-crisis-screenshot.png"
    }
  ]
}
```

`url` and `imageUrl` can be relative to the deployed Vite base path, or absolute `https://` URLs.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```
