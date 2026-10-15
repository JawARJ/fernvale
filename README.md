# Fernvale — source 0.67

Single-player browser pixel RPG using HTML, CSS, JavaScript and Canvas. No build step or backend required.

Play: https://fernvale-adventure.ochremouse32.chatgpt.site/

## Run locally

From this folder, run `python -m http.server 8000 --directory dist` and open http://localhost:8000. Saves stay in each browser under localStorage.

## Current features

- 48 Active skills across 12 weapons and four tiers, with charges, hold channels, toggles, poison, fields, summons and movement.
- Fixed tier damage totals of 100/120/150/200% per target per round; MP is tier × (skill rank + 5). Toggle skills consume the formula each second.
- 128 Buff/Passive skills across four tiers: two Buff and two Passive per weapon/tier (one shared family and one unique). Main weapon and Emblem unlock support effects that work across weapons. Select skills in the Buff/Passive tabs; activate Buffs with keys 1–8. Ranks and selections persist.
- Life steal, mana steal, sword-wave assistance and invulnerability last 10 seconds with 60-second cooldowns. Generated damage cannot trigger special effects again.
- Legacy retired skills migrate without resetting character level, stats, money, equipment or boxes. Existing Active ranks remain; new support skills start at rank 1.
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

Current browser checks: `tests/active60.cjs`, `tests/combat60.cjs` and `tests/stages61.cjs` and `tests/emblem62.cjs`. They use Playwright and Edge against a local server on port 8765; set `PLAYWRIGHT_MODULE` to the installed Playwright module path. Older test files document earlier releases and may assert retired behavior.

See [skill rules](SKILLS-REFERENCE.md), [validation notes](VALIDATION.md) and [development history](PROJECT-HISTORY.md). Font licensing is in `dist/FONT-OFL.txt`.

Hosting configuration and credentials are excluded from this public repository.

## Emblems (0.62)
The secondary weapon slot is now an Emblem slot. Emblems identify any of twelve weapon types and are wearable by every class. Active skills still require the main weapon; Buff/Passive comes later. Separate Emblem boxes drop under existing level rules and Lv.10 boxes cost 1,000 in the town shop. Old secondary equipment migrates into its matching Emblem, preserving id, rarity, level and Options. See `dist/emblem.js` for item generation, migration, icons and equip/unequip.


## Buff / Passive 0.63

See [all Lv.1/Lv.30 support values](BUFF-PASSIVE-REFERENCE.md) and [validation](VALIDATION.md). Support definitions, runtime and UI live in dist/supportdata.js, dist/support.js and dist/support-ui.js.

## Ground drops 0.64

Round results and end bonuses removed. All monsters drop level × 10 money. Boxes drop on the ground with their existing ordinary/Elite rates; bosses drop weapon boxes. Walk near on the same platform to collect. Boss clear leaves the arena open for pickup and retains advancement marks. Leaving or defeat returns to town. Party and Enchant are locked, including shortcuts.

## Tutorial and town 0.65

New characters enter a guided tutorial: left/right movement, trainer dialog, real Active/Buff installation and activation, ladder, two jumps, Down+Space and portal. Select one of twelve Common Emblems at completion; progress and pending reward persist. Existing saves remain in town. The new town has bottom-left spawn, four left shop spaces (only potion shop active), a ladder, GM at lower right, and ramp to the right-side stage portal. Weapon boxes only roll the three weapons of the character stat family.

## Mobile controls 0.66

Upper-left level/HP/MP/EXP and upper-right Status/Skill/locked Party/Enchant/Settings. Joystick at lower left; jump/interact, all four Active buttons, two pages of four Buff cells and round HP/MP potions at lower right. Includes stock/CD displays, touch hold/release and responsive portrait/landscape layouts. See tests/mobile66.cjs and VALIDATION.md for touch-input checks.

## Mobile layout 0.67

Compact lower-right controls follow the annotated reference: Buff page and potions above the Buff strip, Active arc around Jump/Interact. Joystick, Jump and Active backgrounds are more transparent with readable icons/borders. Touch-input and viewport checks pass.
