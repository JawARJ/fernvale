# Validation — Browser Edition 0.5

Validated on 2026-10-11 with Microsoft Edge (Playwright), serving actual dist assets over HTTP.

- All five screens, three slots, four disabled menus, and 2x2 skill grid.
- Real keyboard movement; uphill platform join at 30/60/120 Hz and ladders.
- Sword hit and swept light projectile collisions; all three skills and MP costs.
- Stages with 18/30/42 finite monsters including one boss each; sequential unlocking.
- Stage clear, EXP/level gains, drops, pickup, death and retry.
- Pause freezes movement; cancel leaving stage resumes safely.
- Independent slot state and persistence across full reload.
- Actual JSON download; invalid import rejection, cancel without mutation and confirmed import.
- Legacy Godot save migration preserves original, inventory, levels and stage progress.
- Corrupt save is not overwritten; recovery download retains exact original bytes.
- localStorage write failure is reported without hiding the warning.
- Screenshots inspected for title, village, stage selection, combat and narrow layout.
- No horizontal overflow at desktop and widths 360/400/480/600/760/1024.
- No browser script errors in the integration suites.

Primary suites: tests/browser.cjs and tests/extended.cjs. Tests use isolated browser contexts and never change the user's browser saves. Combat fixtures accelerate stage completion; this is not a full balance playthrough. Other browser engines and physical mobile hardware are not yet verified.

## Character creation and career advancement (0.6)

- Empty slots enter creator; cancel leaves the slot empty; occupied slots continue directly.
- Four locked class choices; three five-segment ratings; branch preview changes portrait and ratings.
- New character always starts as swordsman even when previewing a tier-2 branch; custom name persists.
- Lv.29 cannot enter trial or promote, even with a token; Lv.30 without token cannot promote.
- Dedicated trial spawns one 1200-HP boss; failure gives no token; retry resets the boss.
- Victory guarantees one advancement token, saves it, and leaves story-stage unlocks unchanged.
- Promotion cancellation preserves item; confirmation consumes it once and persists selected job.
- Existing save migration and all prior browser tests still pass.
- Creator screenshots reviewed at desktop and mobile widths; no script errors or horizontal overflow.

Tests use isolated fixtures to reach Lv.30 and complete boss combat, rather than claiming a full leveling/balance playthrough. Current ratings and weapon bonuses are prototype balance values.

## Compact terrain (0.7)

- Town and boss arena 960 units; story stages 1200 units.
- Actual Down+Space keyboard input drops from town ledge to floor; upper stage ledge drops to the next tier.
- Player crosses the cliff face at the lower floor without side collisions or snapping to the upper ledge.
- Monster spawn/patrol boundaries stay on their platforms; counts preserved across stages.
- Relocated village portal and stage ladders work; slope joins retain 30/60/120 Hz coverage.
- Original cached rock tile, moss, grass and mushroom rendering inspected in town and stage screenshots.
- No script errors in terrain integration test.

## Timed farming rounds and ladder input (0.8)
- tests/rounds.cjs passes in headless Edge: actual Up at 30-unit offset, ladder hold/dismount, Up does not enter portal, E still enters.
- Kill EXP deferred, no drops, respawns, elite timing and exact size/HP/attack ratios, timer hard-stop at 300 seconds, no repeated payout.
- All seven grade thresholds, EXP bonus, empty item area, pause timing, defeat and early exit settlement.
- Delete cancel preserves save; confirm removes it across reload. Tests never operate on user saves.
- Result screenshots inspected at 1300 and 390 px. Existing browser/extended tests updated for new timed completion/no-loot behavior; both pass. Creator and terrain suites also pass.
- Time and combat are accelerated through deterministic fixtures; not a real five-minute balance playthrough. Other browsers and physical mobile devices not verified.

## Character window / no farming miniboss (0.9)
- tests/character.cjs passes: real Tab/Esc, pause/resume, 4 base stats and 11 derived/special values, 8 gear slots, 32 inventory cells, tab selection and 2 locked categories.
- Formula sensitivity, primary stat selection, special values independent of base status, old save migration and new LUK/special persistence checked.
- Farming stages contain no bosses, unlock after timed completion without boss, Tab freezes run timer, results block character window.
- Existing browser/extended/rounds/creator/terrain suites pass; screenshots reviewed at desktop/mobile widths with scrolling on narrow displays.
- Empty inventory and gear details are display-only until item systems are implemented. Prototype formulas are not claimed to match MapleStory's exact version-specific formulas.

## Annotated UI revision (0.10)
- Actual AP + buttons update correct stat, consume exactly one AP, persist, and disable at zero. AP counter and main-stat color checked in screenshots.
- ACC rendered without percent; specified text removed from visible UI; left/right panel heights match.
- 4x5 inventory, 2x10 empty reward cells, Dungeon/Boss tabs, level gates at 14/15 and 24/25; no sequential-clear restriction.
- No time-based elites; each 100 normal kills resets the meter and spawns one Elite; Elite kills do not charge. Combo resets to D after five seconds; timer freeze/resume remains tested.
- Desktop, mobile, farming, stage selection and results screenshots inspected. All seven integration suites pass after updating expected behavior.
- Superseded in 0.11: Stage 0 added for Lv.1; every dungeon uses character level >= max(1, dungeon level - 5). Gameplay balance is still prototype tuning.

## Stage 0 (0.11)
- Fresh Lv.1 sees four dungeon rows, only Stage 0 enabled. Stage 0 uses Lv.1 monsters, HP24/ATK6/EXP10, no miniboss; Elite ratios preserved.
- Deferred EXP, five-minute settlement and retry retain ID0, correct map name, no fallback to Stage 1.
- Level gates at 4/5, 14/15 and 24/25 checked. Stage 1 original HP55/Lv10 preserved; trial boss HP1200 and existing save progression remain correct.
- stage-zero, creator, terrain and ui-revision suites pass in isolated Edge contexts; stage selection screenshot inspected.

## Unified ATK (0.12)
- Character screen has one ATK and no M.ATK row; no separate magical attack field remains.
- Character integration test verifies actual sword damage uses displayed ATK, light projectile adds the same ATK, equal 20-point allocations to main/secondary stats increase ATK at 4:1, and a non-primary/non-secondary stat does not increase ATK.
- Character and extended combat/save suites pass in isolated Edge contexts. Critical hits, skill base damage and job multipliers still apply on top of ATK.

## Visual refresh and blank skill slots (0.13)
- visual-refresh.cjs passes: centered start, removed title/save copy, hidden save tools, four disabled QWER slots, actual QWER inputs do not spend MP/heal/haste/shoot or enter portal; Up enters warp and still climbs ladders.
- Screenshots reviewed: light cliff faces behind actors, separate dark brown floor, original bright frameless warp; town and farming stage render without script errors.
- Skills are intentionally inactive in this version; earlier skill-specific combat validation describes historical versions.

## Controls and menu shortcuts (0.14)
- controls.cjs passes using real ArrowLeft/ArrowRight, Space, Tab and number-key input.
- Movement, jump, same-key window toggle, switching Status/Skill/Party/Enchant, HUD clicks, Escape close and pause/resume verified.
- Other modal dialogs preserved; farming timer freezes during menu windows, resumes on close; QWER remain empty/inactive.
- No script errors in isolated Edge context. Skill/Party/Enchant windows have no feature content yet.

## Contextual Space interaction (0.15)
- interaction.cjs passes: actual Space jumps away from targets, enters nearby warp without jumping, Up does not enter, dungeon jump works.
- Temporary NPC fixture verifies callback, cooldown consumption without jumping, out-of-range jump and blocked input while menu is open. No NPC content shipped.
- Spawn grounded state initialized from platforms; immediate jump after entering scene works.
- controls.cjs passes; left/right checks verify direction rather than depending on perfectly equal wall-clock frame counts.

## Swordsman skill tree / potions / 180-second rounds (0.16)
- sword.cjs passes: SP earned at level-up, one-point upgrades, all caps10/10/5/5, passive HP/DEF reflected, old-save migration and new skill persistence.
- Actual Q/W hit one/four targets, cooldown prevents repeated casts, insufficient MP blocks attack. Potion Z/X restoration, separate cooldown and full-resource behavior verified.
- No EXP/COMBO floaters after kill; round finishes at180 seconds with one payout. Skill window screenshots inspected desktop/mobile, no horizontal overflow or script errors.
- interaction.cjs passes after adding skills; Space/context interactions remain working. Tests accelerate combat and leveling, not a full balance playthrough.

## Custom slots / upgrade previews (0.18)
- skill-slots.cjs passes: stat hover/click previews exact derived increases without allocation; green next values, no forced assignment, active-only slots, saved R/E assignments across reload, blank Q inert.
- Actual rapid R casts spend MP with no skill cooldown; E hits four targets. Large combo number replaces live rank; results rank retained.
- Skill job title, top-right close, no bottom close, hover-only level comparisons, mobile tooltip bounds and no script errors verified; screenshots inspected desktop/mobile.
- Empty bindings on legacy migration preserve learned skills/SP; users choose their bindings. No automated balance playthrough.

## Blank scene / mixed asset recovery (0.19)
- Reproduced original failure with old/missing HUD nodes: Cannot set properties of null (setting disabled); first frame stopped with transparent canvas.
- cache-recovery.cjs passes for existing legacy save, stale HTML/new scripts (auto reload to release0.19), and missing HUD nodes. Character level/XP/skills preserved, rendered canvas nontransparent, actual arrow movement works, no script errors.
- skill-slots.cjs passes with versioned assets. Authenticated production browser inspection was unavailable in this host; production deployment verified by native Sites result.

## 0.20 verification
PASS tests/items-ui.cjs: equipment/potion hover details, 10+10 starting stock, consumption, persistence, exhausted stock, named hotbar, skill selection/upgrade/MAX, 390px layout and no page errors.
PASS tests/cache-recovery.cjs: legacy character save retained; mixed cached HTML recovers; absent HUD nodes do not stop the scene.
Desktop and mobile screenshots visually inspected. Tests use isolated browser contexts, not user save data.

## 0.21
PASS tests/skill-list21.cjs: live potion badges, saved zero, scroll overflow, click-only separate details, Power Bash 250%/270% ATK with MP8, unlearned one-card view, 390px bounds and no errors. PASS cache-recovery.cjs legacy/mixed/missing-HUD checks. Desktop/mobile screenshots inspected.

## 0.22
PASS tests/loot22.cjs: normal attack hits one of three adjacent targets, Stage2 grants1000 coins/four boxes once, UI box opening and equipping, gear affects attack/special stats, saved gear/equip/money survives reload, exact rarity thresholds and affix counts, desktop detail bounds and390px layout/no errors. PASS cache-recovery legacy/mixed/missingHUD. Screenshots inspected.

## 0.23 — Monster drops and potion merchant
Normal monsters roll one random box at10%; Elite always rolls one. All four box categories are equally likely. Drops enter inventory immediately and persist; completed farming rounds additionally grant S1/SS2/SSS3 random boxes (other grades0), replacing the four-category guarantee. Money stays500×stage number. Trial boss excluded. Round results separate drops and grade bonus.
Town merchant Mila at x335/y290 opens with Space. HP/MP potions buy100/sell50 each, quantities1/5/10, insufficient funds/stock disables trading. State persists immediately.
PASS tests/drop-shop23.cjs exact drop threshold, Elite, grade counts, NPC interaction, buy/sell, insufficient funds/stock, reload, duplicate settlement, mobile/no errors. PASS cache-recovery.cjs. Screenshots inspected.

## 0.24 — Shop layout and close controls
Shop stock sits on left; owned potion/box/gear inventory sits on right. Balance hidden. Potion descriptions show35% recovery and2s cooldown. Clicking product or owned item opens quantity popup with editable integer and+1/+10/+100; confirm validates money/stock/caps and saves. Equipped gear cannot be sold. Potion buy100/sell50; box sell100; gear Common100/Rare250/Epic750/Legend2000. Shop buying/selling controls removed from product cards.
Generic modal close-only actions move to top-right X; existing skill/status detail X retained. Round-results X returns to town.
PASS tests/shop24.cjs purchase quantity, increment buttons, potion/box/gear sales, invalid quantities/funds, persistence, shop desktop/mobile and X controls. PASS cache-recovery.cjs legacy/mixed/missingHUD. Screenshots inspected.

## 0.25
Shop stock and character bag have separate bordered panels. Bag tabs equipment/usable match status inventory, with two locked future tabs. Result headings and reward summary text hidden; larger balanced score/reward panels; only town action remains. EXP visual sequence shows monster base XP then grade bonus, including level crossings. Actual XP/AP/SP awarded once before animation and saved immediately; leaving/reloading cannot duplicate or lose rewards.
PASS tests/result25.cjs shop categories, hidden removed content, base/bonus sequence, final level/XP matches actual player, no duplicate award, reload, mobile/no errors. PASS cache-recovery.cjs legacy/mixed/missingHUD. Desktop screenshots reviewed.

## 0.26
Normal monster box chance reduced from10% to1%. Elite100%, equal box category rolls and S/SS/SSS completion bonuses unchanged. Deterministic threshold check verifies .009999 drops, .01 does not, and Elite drops at .99.

## 0.27 — Box opening
Double click opens one box immediately; single click after400ms opens quantity popup. +1/+10/MAX respect stock and available equipment slots. Equipment capacity20; old over-capacity inventories preserved but opening blocked until items sold. Atomic batch generation consumes boxes only when entire requested quantity fits. Full bag gives warning and no box consumption.
PASS tests/boxes27.cjs click gestures, quantity buttons, stock/space-aware MAX, capacity block/unchanged boxes, reload/no errors. PASS cache-recovery.cjs.

## 0.28 — Equipment swaps, batch sales, early leveling
Equipped gear is excluded from bag/UI and capacity count; replaced gear returns to bag. First starter replacement stores the original starter as a Common item. Existing save ownership IDs preserved. Bag capacity20 counts only unequipped gear.
Shop item clicks select items, stackables select quantities; Sell opens full stats/unit prices/totals review. Only final confirmation commits the entire batch once; cancellation preserves selected items. Equipped items excluded from sell grid.
XP requirement=floor(60*level^1.4*(.35+.65*(level-1)/99)) below100; original formula from100 onward. Lv1=21XP (35% of original); ratio grows smoothly. On legacy save load, existing XP carries into levels/AP/SP without truncation. Result animation uses same centralized formula.
PASS tests/equip-sale28.cjs equipment swap/starter retention, batch sale review/cancel/confirm, stack quantities, monotonically increasing XP requirements, preserved XP and AP/SP after reload. PASS result25.cjs EXP animation/reload/mobile, cache-recovery.cjs legacy/mixed/missingHUD.

## 0.29 — Monster DEF and AVOID
Stage0/1/2/3 normal DEF2/8/15/22%, AVOID2/5/8/12. Elite DEF1.5× rounded, AVOID+5. Trial boss Lv30 DEF30% AVOID15. Hit chance=clamp(playerACC-monsterAVOID,5,100) percent. Miss shows MISS and deals no damage/knockback; MP still spent. DEF uses existing percentage mitigation and player ignoreDEF.
PASS tests/monster29.cjs damage100→92 atDEF8, ignoreDEF100 restores100, misses unchanged HP/no push, Elite12/10, boss30/30/15, hit chance caps, no errors. PASS cache-recovery.cjs.

## 0.30 — Wider town and grouped rewards
Town width960→1280, ground extends, upper-right platform x820..1280. Warp x1050/y170 on upper platform; ladder x900 reaches it. Camera/minimap use expanded width. Portal draw accepts ground height. Results group identical box categories with quantities, combining drops/grade bonuses without modifying awarded inventory.
PASS tests/town30.cjs keyboard ladder/rightward movement, camera, Space portal, grouped3/2/1/1 counts, world edge. PASS cache-recovery.cjs. Screenshot inspected.

## 0.31 — Tutorial, untimed farming, keyboard UI
Stage0 is a five-action training map: arrows walk, Space jump, arrows climb, Space training sign interaction, C combat. Checklist confirms actions. No timed auto-settlement on any stage. Monster XP granted/saved immediately; round settlement grants only grade bonus XP (none in tutorial), preventing duplicate base XP. End farming via Esc/end-round; result XP section hidden. Tutorial grants no farming grade boxes/money or Elite spawns.
Box SVG icons indicate sword/shield/shirt/accessory in bag/shop/results. Base stat displays equipped total with green(+bonus).
Keyboard: arrows move focus through visible menu controls, Enter/Space activate, Tab moves focus, Esc closes topmost dialog; editable inputs/selects retain native behavior.
PASS tests/tutorial31.cjs keyboard start/save/activation, five tutorial steps, run survives1000s, immediate10XP plus only10 grade bonus, STR9(+4), four icons, hidden result EXP. PASS cache-recovery.cjs. Screenshots visually checked.

## 0.32 — Modern swordsman skill adaptation
Six skills from official Explorer Warrior concepts, locally tuned. See SKILLS-REFERENCE.md for values/controls/migration. HP/DEF/Speed/jump/knockback resistance passives active, six-target Slash, air leap, upward charge and landing dive. Old points migrate/refund once; manual bindings persist.
PASS tests/modern32.cjs six-skill UI, active-only slots, migration idempotence, six-target hits, one-air leap/noMP on rejected repeat, upward charge once, landing dive, passive effects, Space shortcut, reload/mobile/no errors. PASS cache-recovery.cjs old-save points and rendering. Desktop screenshot reviewed.

## 0.33 — First-job skill points
Level-ups intoLv2..30 grant3SP instead of1; Lv31 onward retains1SP. All six first-job max levels total71SP, so Lv25 yields72SP and can max the tree beforeLv30 advancement. Existing saves gain2×min(level-1,29) missing SP once under spVersion2. Learned skills/remaining SP and Power Bash migration are preserved.
PASS tests/sp33.cjs Lv25 affordability, all-max spending/leaving1SP, retroactive topup idempotence, reload and post30 rate. PASS cache-recovery.cjs including combined old-skill/SP migration.

## 0.34 — Four first-job skills
Upper Charge and Leap Attack removed from UI/casting/keyboard. Iron Body max10. Remaining max ranks15+10+20+10=55. Existing ranks in removed skills plus Iron Body above10 refunded once; removed slot bindings cleared. skillVersion3 stores normalized four-skill data. SP rate remains3 throughLv30 and1 afterward; 2SP per level would now afford all ranks byLv29, but rate was not changed in this request.
PASS tests/skills34.cjs cost55, max cap, 16-point refund/idempotence, bindings/removed casts and reload. PASS cache-recovery.cjs.

## 0.35 — Two SP per level
Level-ups into2..30 grant2SP;31+ remains1SP. Four-skill tree55SP is fully affordable atLv29 with56SP. Existing spVersion2 (3SP) balances retained. Original1SP saves receive missing1SP per eligible level once; spVersion3 prevents repeat grants.
PASS sp35.cjs Lv29 budget, preserved balances, migration idempotence/reload/post30. PASS cache-recovery.cjs.

0.36: tests/second36.cjs passed Lv30 popup, boss victory, token, 3 choices, promotion, 8/8/9 skill trees, combat/buffs/pull/stun/healing and save/reload. sp35 and cache-recovery passed.

0.37: boxes37 passed tier boundaries9/10,29/30,59/60,99/100; all4 categories locked gear levels; below10 no drops; legacy migration; single/double/MAX opening; bag capacity; level-specific sales and persistence. Screenshot reviewed.

0.38: stats38 passed exact per-point deltas, primary-only ATK, gear bonuses, avoidance,3-decimal display and save/reload. Cache recovery and locked-box tests passed.

0.39: delay39 passed repeated/cross-skill and normal attack lock, timing and1-decimal display with exact underlying value.

0.40: gm40 and cache-recovery passed AP1, money/level/reset, confirmation, persistence and NPC registration.

0.41: combat41, air41 and cache-recovery passed. Active counts2/2/2/2; buffer fires once; jump height83.52px at120%; leap does not reset upward velocity; learned Beholder heals and Shock works; old passive bindings clear. Airborne moving Brandish and queued followup both hit52damage with0.45s recovery.

0.42: buffs42 and cache-recovery passed wave hit,8 directions, active count2, passiveSPD, stack tile, migrated binding and MAX buy/sell.

0.43: cd43 passed8s cooldown block/recast, pause, unrelated skill and HUD.

0.44: mobile44 passed emulated844x390/390x844 touch mode, independent multiple pointers and cancel, bag/skill menus, no horizontal page overflow;1254x892 desktop keyboard. Cache recovery passed. Real iOS/Android hardware testing remains.

0.45: joystick45 and cache-recovery passed drag directions/diagonal/cancel, five buttons and NPC context icon. Mobile screenshot reviewed.

0.46: loadout46/classes46 passed4class cards,20slots,skillbox/bag,75ATK worked example, offhand active blocked/passive enabled, upgrade failure/cost, reload; all4classes main stats, active andbuff gameplay/mobile menus; migration idempotent andElite1box. Screenshots inspected.

0.47: weapons47 and classes46 passed all12 sprites, noaxe/formula labels, axe migration rank/count retention, all4classes gameplay/reload. Weapon sheet/world screenshots reviewed.

0.48: pages48/loadout46 passed empty skills20cells,5pages,25items split20+5, independent categories, sort/page reset/persist and equipment capacity100. Screenshot reviewed.

0.49: fixes49 passed8hand swaps without duplicates, merchantMAX3 at1000, bossmark/use/tier2/reload and no dialogscroll at1102x892; tier3/4boss rewards verified. Cache-recovery/pages48 passed. Screenshot reviewed.

0.50: two50 passed10empty slots, only stages1/10/20/30, boss disabled aftertier2 and skillbox no-consumption.

0.51: pools51 passed sword-main/spear-off pool, oneSTR choice, sixPassive choices, name duplication blocked, main-onlyActive, STR buff and reach121, incompatible weapon stops. design51 passed12weapons active damage/buffs/3passive choices andtier1boxes. Cache recovery passed.

0.52: start52 passedall4classes Lv1starter skills andbuff, ATKSPD100/cap190/fasterrecovery, portalinteraction.

0.53: update53.cjs and hud53.cjs passed: cooldowns, fixed buff keys, offhand base exclusions/special inclusion, foreign weapon rolls, nonrespawning tutorial, Lv5 AP4/10-box one-time reward and hidden Stage0. Desktop screenshots verified.
