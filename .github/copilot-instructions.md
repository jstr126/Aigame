# StarterProject — AI Instructions

This is a high school game development class project. Students are learning to build a 2D browser game using Phaser.js with AI assistance inside VS Code.

## Project Context

- **Engine:** Phaser 3 (loaded from `node_modules/phaser/dist/phaser.min.js`)
- **Language:** Plain JavaScript — no TypeScript, no build step, no bundler
- **Preview:** Live Server extension (right-click `index.html` → Open with Live Server)
- **Entry points:** `index.html` loads Phaser, then `player.js`, then `game.js`
- **Students are beginners.** Prioritize clarity over cleverness.

## Asset Structure

All provided assets live in the `assets/` folder inside this project:

- `assets/2d/` — sprite sheets, backgrounds, tiles, characters, items, traps
- `assets/audio/` — SFX, instruments, voices

Always use **relative paths** when referencing assets. Examples:

```js
this.load.image("bg", "assets/2d/Background/Blue.png");
this.load.spritesheet(
  "player",
  "assets/2d/Main Characters/Pink Man/Run (32x32).png",
  { frameWidth: 32, frameHeight: 32 },
);
this.load.audio("jump", "assets/audio/GameSFX/jump.wav");
```

Never use absolute paths like `C:\Users\...`.

## Game Constraints

- Single player only
- Browser-based, local deploy via Live Server
- No external libraries beyond Phaser
- No backend, no server, no database

## Code Style

- Use `function` declarations (not arrow functions for scene methods)
- Player code lives in `player.js` — keep it there. Only put scene/map setup in `game.js`
- Comment any Phaser-specific API calls so the student understands what it does
- When suggesting Phaser APIs, prefer Phaser 3 syntax

## Starter Project Structure

The starter project includes a working Tiled map and playable character out of the box:

- **Map file:** `maps/level1.tmj` — Tiled JSON, 80×25 tiles at 16×16px (1280×400px total)
- **Tileset:** `assets/2d/Terrain/Terrain (16x16).png` — 22 columns, referenced in the map as `"Terrain"`
- **Background:** `assets/2d/Background/Grid.png` — 64×64 tiling grid texture (minor lines at 16px, major lines at 32px matching player size)
- **Player character:** Pink Man (`assets/2d/Main Characters/Pink Man/`) — 32×32px sprites
  - Idle: 11 frames, Run: 12 frames, Jump: 1 frame, Fall: 1 frame, Crouch: 3-frame sheet (animation plays frames 0–1, holds on frame 1)
- **Spawn point:** Defined as a Tiled point object named `player` in the `spawnpoints` object layer
- **Controls:** Arrow keys — left/right to move, up to jump, down to crouch
- **Physics:** Arcade physics, gravity 600, jump velocity -500, move speed 220, `TILE_BIAS` 32 (prevents corner snagging)
- **Player hitbox:** 20×28px (standing), 20×16px (crouching) — smaller than the 32×32 sprite frame; tunable via constants at the top of `player.js`

**File responsibilities:**

- `player.js` — all player logic: asset loading, sprite creation, animations, movement, crouch. Tuning values (`PLAYER_SPEED`, `PLAYER_JUMP`, `PLAYER_CHAR`, hitbox constants) are at the top. Students edit this file to change how the player feels or looks.
- `game.js` — scene scaffold only: config, map loading, background, camera, input, `TILE_BIAS`, and calls to `playerPreload()` / `playerCreate()` / `playerUpdate()`.

When helping students modify the game, assume this foundation is already in place. Do not rewrite the map loading or player setup unless the student explicitly asks to replace it.

## Branches

- `main` — clean student-facing base
- `MatterTest` — experimental Matter.js physics port; kept as a reference/advanced challenge, not for student distribution

## How to Help Students

- When a student asks to add a feature, ask clarifying questions before writing code if the intent is unclear
- Suggest small, testable steps — one feature at a time
- If something won't work in a browser without a server, say so clearly
- Do not refactor working code unless the student asks

## This Project's Current State (as of May 2026)

This specific student project has diverged from the starter template. Key facts to remember:

### Files in Use

- `game.js` — scene setup, map loading, camera, input, calls player functions; also contains dark overlay / flashlight logic
- `player.js` — all player logic, animations, movement, hitbox constants
- `levels.js` — 5 advanced dungeon levels using DungeonAssetPack assets
- `menu.js` — currently removed/unused
- `index.html` — entry point; loads Phaser, then player.js, then game.js

### Player Character

- Stylized normal male character, 32×32px (replaced the default Pink Man)
- Animations: walking, jumping
- Controls: Arrow keys (left/right move, up jump, down crouch)

### Extra Asset Packs Extracted into Project

- **DungeonAssetPack** — used for all 5 levels (tiles, backgrounds, props)
- **Lanterna** — flashlight/lighting sprites for the dark-environment feature

### Features & Known Issues

- **5 dungeon levels** — implemented in `levels.js`
- **Dark environment + flashlight** — F key should toggle flashlight on/off; dark overlay currently broken (screen goes completely black). Fix needed: ensure flashlight starts ON (or overlay starts fully transparent), and verify the F key listener correctly toggles the overlay opacity/visibility.
- **Game is unplayable** until the dark overlay bug is resolved — restore visibility before adding new features.
