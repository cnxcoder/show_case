# Game Showcase

React + Vite home page for playable web game builds.

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
npm run build
npm run preview
```
