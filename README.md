# Fernvale — source 0.79

Browser pixel RPG with local saves and Auto Farm while the game is open. Online work is deferred; Party remains locked; Enchant is available.

Play: https://fernvale-adventure.ochremouse32.chatgpt.site/

## Run locally

From this folder, run `python -m http.server 8000 --directory dist` and open http://localhost:8000. Saves stay in each browser under localStorage.

## Current changes in 0.79

- Bosses no longer award advancement marks; the victory toast no longer mentions them. All three boss reward/save paths are tested. Equipment and skill-Emblem box rewards are retained.

- Elite/Boss drop an extra guaranteed skill-Emblem material box alongside equipment. Tier quantities are uniformly 0–2 / 1–3 / 2–4 / 2–5; each material picks one of twelve weapon types.
- Active/Buff/Passive upgrades consume one matching weapon material, separate from equipment Emblems. Shared-family skills allow a material from the family. Failure retains rank; max rank 30. Target-rank success rates: 1–10 100%, 11–15 90%, 16–20 70%, 21–25 50%, 26–30 30%.
- Material inventory, old-save migration, full-equipment-bag opening, zero-result feedback and desktop/mobile upgrade controls are tested in `tests/emblems78.cjs`.

- Auto keeps targets through ladder traversal and rotates across connected surfaces despite ground respawns.
- Skill tiers 2/3/4 automatically unlock at Lv.10/20/30, including older saves. Boss levels remain unchanged.
- Mobile training guidance is compact with full help available; joystick has additional safe-edge inset.
- Validation: `tests/refinements77.cjs` simulates movement/combat in all ten stages and tests level boundaries and actual joystick input in three phone viewports.

- Main weapon uses gold borders and Emblem uses cyan. Armor boxes generate hat, shirt, pants or gloves; legacy shoes remain usable. Shop sells HP/MP potions only. Stage cards show normal chances clearly.
- JS/CSS use content-fingerprinted paths to prevent mixed browser caches. After source edits run `node scripts/fingerprint-assets.cjs` before publishing.

- Weapon/armor/accessory boxes only for new drops; exact stage level becomes item level, with tiers grouped by Stage 1–3 / 4–6 / 7–9 / 10+. Normal chance per type cycles 1/3/5%; Elite/Boss always choose one box type. Money and boxes enter inventory immediately. Legacy box data is retained.
- Free twelve-type Emblem selection from the equipment slot preserves the current item's options, level and enhancement.
- Status/Skill/Enchant and ordinary windows no longer pause combat or Auto. The Auto button is disabled while using windows. Explicit pause/hidden tabs still suspend play.
- Four unique Auto actions can include normal attack; a visible DEX note states 4 DEX = 1 ATKSPD.
- Zero HP immediately respawns in town and costs 10% of the XP required for the current level, capped at available XP with no level loss. Positive fractional HP displays at least 1.
- Enchant retains +20, success/price/downgrade rules; the compact view shows base-stat deltas and cost/wallet/button at the bottom. Online/Party remain deferred.

References: [LOOT-REFERENCE.md](LOOT-REFERENCE.md), [AUTO-FARM.md](AUTO-FARM.md), [ENCHANT.md](ENCHANT.md).

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

## Full-window gameplay 0.68

Gameplay fills PC and mobile browser windows. An aspect-aware canvas/camera removes fixed-ratio letterboxing without stretching sprites; physics remains unchanged. Desktop HUD stays at the bottom; mobile controls overlay the full scene in either orientation. PC fullscreen toggle and a mobile Settings fullscreen action are available where the browser supports them. See tests/viewport68.cjs.

## Stage drop previews 0.69

Stage cards show item icons, box level/skill tier, money quantity and actual drop rates. Dungeon box cells list Normal / Elite odds; boss cells show guaranteed weapon boxes and money. Metadata shares the real drop probability, tier and money rules. Tests cover RNG boundaries and responsive layouts.

## Tutorial, patrols and stats 0.70

Buff training moves to the upper tutorial platform, followed by three Active-only training monsters with no farming rewards. Monsters traverse connected flat/ramp/flat routes. Skill pages label equipped main weapon and Emblem. DEX grants +1 ATKSPD per four points instead of ACC; STR/INT add HP/MP regen, baseline mana regen is slower. Status and Bonus Stat are separate pages; see STATS-REFERENCE.md for exact formulas. New end-to-end and mobile tests cover the changes.
