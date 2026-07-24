# Clockwork Crisis WebGL version patch

Replace:
- games/clockwork/index.html

Add:
- games/clockwork/version.json

For each new WebGL deployment, update `version` in version.json.
Recommended format:
YYYY.MM.DD.BUILD

Example:
2026.07.24.2

The patched index.html:
- fetches version.json using `cache: no-store`
- detects a newly deployed version
- clears Cache Storage only (not IndexedDB/save data)
- reloads once with `?v=<version>`
- appends the same version query to loader/data/framework/wasm
