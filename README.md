# Fernvale — source 0.59

Single-player browser pixel RPG using HTML, CSS, JavaScript and Canvas. No build step or backend required.

## Run locally
From this folder, run `python -m http.server 8000 --directory dist` and open http://localhost:8000. Saves stay in each browser under localStorage.

## Code
- dist/game.js: world, input, combat and saves
- dist/character.js: status and equipment
- dist/loot.js: drops, boxes, inventory and shop
- dist/sword.js: swordsman skills
- dist/tutorial.js: Stage 0 tutorial
- dist/navigation.js: keyboard menus
- dist/rounds.js: combo/score/rewards
- dist/sprites.js: procedural art
- dist/index.html and dist/style.css: interface

Controls: arrows movement/climbing, Space jump/interact, C attack, Q/W/E/R assigned skills, Z/X potions, Tab status, 1 skills, 2 party, 3 enchant, Esc pause. Menu arrows select, Enter confirms, Esc closes.

The original hosting project ID and Git credentials are intentionally excluded from this shareable package. See PROJECT-HISTORY.md for development notes. Font licensing is in dist/FONT-OFL.txt.

## Swordsman skills in0.32
Warrior Mastery, Iron Body, Slash Blast, Warrior Leap, Upper Charge, Leap Attack. See [skill tuning and save migration](SKILLS-REFERENCE.md). Space repeat in air uses Warrior Leap; Up+C launches Upper Charge; Down+C in air dives. Active skills remain manually assignable toQ/W/E/R. Old SP migrates once; Power Bash points refunded.

SP:3 per level-up untilLv30,1 thereafter. First-job skills require71SP; affordable atLv25. Existing saves receive missingSP once.

0.34: Upper Charge/Leap Attack removed, Iron Body max10. Four-skill tree requires55SP. Removed/excess ranks refund once. SP rate unchanged. See SKILLS-REFERENCE.md for current controls.

0.35:2SP per level-up into2..30,1 afterward. Max55SP tree affordable atLv29; existing earned balances preserved.

0.36: Lv30 boss advancement quest and three second-job skill trees.

0.37: Random boxes have locked levels10/30/60/100, selected by stage-level thresholds.

0.38: Main-stat ATK1:1 and agreed STR/DEX/INT/LUK formulas, character AVOID and equipment critical damage.

0.39: Shared attack and skill recovery; one-decimal status display.

0.40: AP1 per level and town GM NPC with money, level and confirmed reset commands.

0.41: Two active skills per tier, automatic passives, buffered attacks and capped speed/jump.

0.42: Buff stack HUD, directional Spirit Blade wave, passive Flash Slash and trade MAX.

0.43: Spirit Blade eight second cooldown and hotbar countdown.

0.44: Mobile browser multitouch controls and responsive landscape/portrait UI; desktop keyboard retained.

0.45: Circular drag joystick, five action circles, contextual jump and no minimap.

0.46: Base classes, weapon skill loadouts across four tiers, duplicate skill upgrades, skill boxes and offhand ATK50%.

0.47: Remove axe and creation formula label; add all weapon sprites and icons with correct equipped hands.

0.48: Uniform inventory grids, five independent pages and persistent instant sorting.

0.49: Boss marks advance tiers, merchant skill boxes, safe hand swaps and compact character UI.

0.50: Two tier skill scaffold only; suspend provisional skills pending design.

0.51: Designed first-tier weapon skills and deduplicated main/offhand buff/passive pools.

0.52: Starter active/buff skills, capped ATKSPD and return-town portals.

0.53: Cooldowns, buff hotbar, tutorial rewards, full skill pool and offhand stat rules.

0.54: Baseline skill access, weapon-tab picker, hover details, tutorial potions and uniform inventory slots.

0.55: Structured weapon status and option cards.

0.56: Visible multi-hit numbers, filtered skill picker and compact shop/result UI.

0.57: Six randomized farming maps and Lv30/Lv60 boss stages.

0.58: Fixed stage layouts, town return portals and removal of kill combos.

0.59: Tier2 weapon skill designs and removal of default air dash.
