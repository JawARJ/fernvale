# Fernvale — source 0.61

Single-player browser pixel RPG using HTML, CSS, JavaScript and Canvas. No build step or backend required.

Play: https://fernvale-adventure.ochremouse32.chatgpt.site/

## Run locally

From this folder, run `python -m http.server 8000 --directory dist` and open http://localhost:8000. Saves stay in each browser under localStorage.

## Current features

- 48 Active skills across 12 weapons and four tiers, with charges, hold channels, toggles, poison, fields, summons and movement.
- Fixed tier damage totals of 100/120/150/200% per target per round; MP is tier × (skill rank + 5). Toggle skills consume the formula each second.
- Retired skill, Buff and Passive data is removed when upgrading an old save. New skills start at rank 1; character level, stats, money, equipment and boxes remain.
- Ten dungeon stages through level 100, bosses at levels 30/60/100, advancement marks for tiers 2/3/4, and GM level +10.
- Stage 0 removed. Stage 1 is available from level 1; later stage entry requirements remain stage level minus five.
- Stage menu has a shared top toolbar, five stages per page and circular page buttons 1–5. Empty pages display a message; dungeon and boss pages are independent.

## Code

- `dist/game.js`: world, input, combat integration and saves
- `dist/skilldata.js`: current 48-skill catalog
- `dist/skilldesign.js`: Active skill combat and effects
- `dist/loadout.js`: weapon rules and skill save migration
- `dist/skillpicker.js`: skill selection and descriptions
- `dist/character.js`: status and equipment
- `dist/loot.js`: drops, boxes, inventory and shop
- `dist/interface.js` and `dist/career.js`: menus, stage pagination and bosses
- `dist/sword.js` and `dist/second.js`: shared action, potion and projectile helpers
- `dist/navigation.js`: keyboard menus
- `dist/rounds.js`: score and rewards
- `dist/sprites.js`: procedural art
- `dist/index.html` and `dist/style.css`: interface

Controls: arrows move/climb; Space jump/interact; C attack; Q/W/E/R use assigned Active skills; Z/X use potions; A/Tab status; S skills; D party; F enchant; Esc pause. Hold and release the skill key for charge/channel skills; press again to turn a toggle off.

## Validation

Current browser checks: `tests/active60.cjs`, `tests/combat60.cjs` and `tests/stages61.cjs`. They use Playwright and Edge against a local server on port 8765; set `PLAYWRIGHT_MODULE` to the installed Playwright module path. Older test files document earlier releases and may assert retired behavior.

See [skill rules](SKILLS-REFERENCE.md), [validation notes](VALIDATION.md) and [development history](PROJECT-HISTORY.md). Font licensing is in `dist/FONT-OFL.txt`.

Hosting configuration and credentials are excluded from this public repository.
