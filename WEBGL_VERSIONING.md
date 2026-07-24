# Clockwork Crisis WebGL Versioning

The GitHub Pages workflow now generates `games/clockwork/version.json`
automatically from the current Git commit SHA before copying `games/` into `dist/`.

Each deployment therefore gets a unique version such as:

```json
{
  "version": "a1b2c3d4",
  "buildTime": "2026-07-24T03:15:00Z",
  "commit": "a1b2c3d4..."
}
```

The patched `games/clockwork/index.html` uses that version as a query string for
Unity WebGL build files, preventing stale browser/CDN caches from serving the prior build.
