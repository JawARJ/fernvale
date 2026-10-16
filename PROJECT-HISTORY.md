# Fernvale 0.78

- Elite/Boss guarantee an additional skill-Emblem material box, alongside their existing one random equipment box. Normal monsters do not drop the material box. Stage tier grouping remains 1–3 / 4–6 / 7–9 / 10+.
- Box counts are discrete uniform draws: tier 1 = 0–2, tier 2 = 1–3, tier 3 = 2–4, tier 4 = 2–5. Each material independently chooses one of twelve weapon types uniformly. A zero result still consumes the box and reports zero.
- Materials are stackable `loot.emblemMaterials[weapon]`, separate from freely selectable equipment Emblems and legacy equipment-Emblem boxes. Material boxes use their own `emblemMaterial` box type. Existing equipment, ranks, skill scrolls and old boxes are retained.
- An upgrade uses one matching weapon material. Shared-family support skills accept any weapon material from that family, selected explicitly in the dialog. No currency fee; failure consumes one material and keeps the skill rank.
- Target rank 1–10: 100%; 11–15: 90%; 16–20: 70%; 21–25: 50%; 26–30: 30%. Skill cap remains rank 30. Active, Buff and Passive details all offer upgrading.
- New box opening does not require equipment-bag space. Batches cap at 1,000 boxes; inventory shows counts and stage previews identify Elite-only guaranteed material boxes.
- Validation: emblems78 covers every possible quantity in all four tiers, exact upgrade boundaries/costs/failures, wrong-material/free-Emblem rejection, shared-family choice, max rank, old saves, zero outcomes, full equipment bags, real desktop/mobile controls and persistence. Updated refinements76 plus refinements77/tutorial70/assets checks pass.

# Fernvale 0.77

- Auto keeps its target and completes ladder traversal before choosing another target. After a kill, it prioritizes connected surfaces with fewer visits, preventing endlessly respawning ground monsters from monopolizing the session. It follows connected platform segments to the next ladder and approaches within actual normal-attack range.
- Skill tiers 2/3/4 unlock automatically at character level 10/20/30, on level gain and loading older saves. Existing higher unlocked tiers remain; consumed/obsolete advancement marks clear. Boss levels and combat remain unchanged.
- Mobile joystick is inset from safe screen edges. The training hint shows a compact step title and help button; full instructions remain in the help dialog.
- `tests/refinements77.cjs`: real movement/combat physics cover all connected surfaces in all ten stages with normal 2-second monster respawns; XP and save tier boundaries; actual joystick input/help in 844×390, 915×412, 390×844 viewports. Existing refinements76/tutorial70 checks also pass.

# Fernvale 0.76

- Main weapon source tabs use gold borders; Emblem uses cyan, including a dual-color state when both match.
- Drop cards show only weapon/accessory/armor boxes. Normal chance per type follows 1/3/5% within each three-stage tier; Elite/Boss guarantee one randomly selected type. Normal percentages are shown directly without mixing Elite percentages into the same label.
- Armor boxes generate hat/shirt/pants/gloves. Legacy shoes retain their stats, enchant and equipment slot; new pants validate, equip and save normally.
- Potion shop sells HP/MP potions only; legacy skill/Emblem boxes remain readable in existing saves.
- HTML loads content-fingerprinted JS/CSS paths so updated source cannot share the previous asset cache key. Run `node scripts/fingerprint-assets.cjs` after editing source and before packaging.
- Validation: `tests/refinements76.cjs` covers ten-stage rates, class weapons, armor pool/save compatibility, shop stock, source borders, Auto, death, Enchant and mobile controls.

# Fernvale 0.75 — stage loot and live menus

New drops use only weapon/armor/accessory boxes and are delivered with money immediately on kill. Stage groups 1–3/4–6/7–9/10+ define equipment tiers; exact monster/stage level defines the item level. Per-type normal chances cycle 1/3/5%; Elite/Boss always choose one random type. Existing legacy skill/Emblem boxes remain readable/openable, but new drops/shop stock no longer issue them. Emblem type can be freely selected from its equipment slot, preserving its item stats/+ level.

Menus no longer pause combat/Auto. Auto is disabled while a window is open; its own internal picker/back controls still work. Four unique Auto actions may include normal attack; saved duplicate entries are normalized. DEX conversion is always visible. HP <= 0 immediately respawns and subtracts 10% of the XP needed for the current level, capped at current XP with no level loss. Positive fractional HP displays at least 1. Enchant keeps its rules but now shows only stat deltas and a bottom payment area. Explicit pause, browser hidden/blur and closed pages still suspend gameplay; online remains deferred.

See [LOOT-REFERENCE.md](LOOT-REFERENCE.md), [AUTO-FARM.md](AUTO-FARM.md), and [ENCHANT.md](ENCHANT.md).

# Fernvale 0.74 — confirmed Enchant rules

Enchant now increases only original ATK/DEF/HP/MP by 5% per level; options never scale. Failed attempts targeting +11–15 have a separate 10% chance to lose one level, and +16–20 have 15%; +1–10 never downgrade. Success chances and level × target × 1,000 price are unchanged. The UI shows the conditional risk, unchanged options and actual downgrade result. Existing + levels persist; derived option values automatically follow the corrected rule. Free Auto remains enabled. See [ENCHANT.md](ENCHANT.md).

# Fernvale 0.73 — free Auto and equipment Enchant

Auto can start immediately without tickets or prepaid time. The old ticket/balance data is preserved but inactive and hidden. Enchant is enabled on PC/mobile (F shortcut), for all owned equipment including Emblems and the starter weapon. Maximum +20; chances for target +1–5/+6–10/+11–15/+16–20 are 100/80/60/40%. Each attempt costs item level × target enhancement × 1,000 money. Current initial balance rule: +5% of original base stats and options per level (+20 doubles), failure spends the fee and retains the item/level. Stats are derived from unchanged base data; + levels persist in old saves. Party/online work stays deferred. See [ENCHANT.md](ENCHANT.md) and [AUTO-FARM.md](AUTO-FARM.md).

# Fernvale 0.72 — local Auto Farm

Auto Farm now works with existing browser-local characters while the game is open and unpaused. Buy a 1-hour ticket for 10,000 money from the potion shop, activate it from the usable inventory or Auto window, choose four Active skills in your own order, enter the desired dungeon and Start. Maximum activated balance is 24 hours. It skips unusable/CD/MP slots, never casts Buffs, and stays in the selected map. Pause/hidden tabs stop simulation and time consumption. Closing/reloading preserves remaining time and requires starting Auto again; no offline rewards. Manual controls stop Auto.

The live frontend no longer loads online login/client code or makes backend requests. Online/party work is deferred at the user's request. The 0.71 server prototype is retained as inactive source only. See [AUTO-FARM.md](AUTO-FARM.md).

# Fernvale 0.71 — Auto Farm / online development server

Adds the four configurable Auto slots, prepaid 1-hour tickets (10,000 money), 24-hour cap, server-side skill/AI/loot simulation, accounts, durable checkpoints and real closed-browser farming. PC/mobile connection and reconnect tests pass. The public site only publishes the frontend; no public backend has been provisioned. Party remains locked. See [ONLINE-SETUP.md](ONLINE-SETUP.md) for local use, deployment steps and current limitations. Local guest saves remain separate and playable.

# Current release 0.70 · Tutorial, patrols and stats

Moves Buff installation/use to the upper-left end of the tutorial route after climbing and jumping. Three non-hostile training monsters stand on the upper-right platform. Only damage from manually cast Active skills during that lesson defeats them; all three must be defeated before the drop-through/portal lesson. They give no money, drops, EXP or persistent kill credit. Saved Buff/Active checkpoints resume at the upper platform with safe fresh targets. All four starter weapon families can complete the lesson without waiting for mana regeneration.

Monsters patrol connected same-layer flat/ramp/flat surfaces instead of being confined to a short ramp segment. Spawn distribution uses connected routes, and platform assignment/surface height follow movement and respawn. Gaps and disconnected ledges remain separate.

Skill loadouts and pickers show current main weapon and Emblem names/icons. Weapon tabs mark the equipped Emblem and main weapon distinctly. Active eligibility remains main-weapon-only; support eligibility remains main weapon + Emblem.

DEX no longer adds ACC and grants one ATKSPD per four effective points. STR adds HP recovery and INT adds MP recovery; baseline MP recovery is reduced. Status and Bonus Stat are separate tabs, with six Bonus metrics including actual HP/MP regen and damage reduction. See [stat rules](STATS-REFERENCE.md) for formulas.

---

# Current release 0.69 · Stage drop previews

Stage cards show six drop cells in the previously empty center: the five random box types and money. Each cell shows an icon, box level/skill tier or money quantity at upper left, and its actual drop chance at the bottom. Dungeon boxes show Normal / Elite rates (0.2% / 20% per type); money shows 100% and level × 10. Boss cards show their guaranteed weapon box and money. Hover for item names and descriptions.

Preview data shares the normal-box probability constant, box-type catalog, tier mapping and money formula with actual ground drops. Drop odds remain unchanged: 1% total box chance from normal monsters, one guaranteed random box from Elite, one weapon box from bosses. Five stages per page and entry level requirements remain unchanged. Drop cells move beneath the title on narrow screens; the toolbar now also fits 320-pixel widths.

---

# Current release 0.68 · Full-window gameplay

The play screen fills the available browser window on PC and mobile. Desktop removes the centered width limit, outer margins and footer, while retaining its HUD in a bottom row. Mobile uses the full viewport in both orientations instead of letterboxing a fixed 2:1 canvas.

The renderer keeps 480 world units vertically and adjusts its visible width to the actual playfield aspect ratio. The camera follows the character on narrow screens and centers smaller maps on wide screens, with visual ground extended to the viewport edges. Physics and map dimensions stay unchanged; sprites are not stretched. Resizing/rotating does not reset the character or run. Canvas smoothing remains disabled.

PC has a top-right native fullscreen toggle. Mobile can enter/exit fullscreen from Settings on browsers that support the Fullscreen API. Browser-window filling works independently of native fullscreen. Menus restore their normal layout when leaving play.

---

# Current release 0.67 · Compact translucent mobile controls

Moves the lower-right controls to match the annotated sketch: a compact header row with Buff page and HP/MP potions, four Buff cells below, and four Active buttons following a lower arc around Jump/Interact. Reduces joystick background opacity to 14% (knob 27%) and Active/Jump backgrounds to 24%, while preserving readable icons and borders. Buff/potion backgrounds also become translucent. Desktop layout and all controls remain available.

---

# Current release 0.66 · Mobile controls

Rebuilds the mobile HUD to match the supplied sketch: level/HP/MP/EXP at upper left; Status, Skill, locked Party/Enchant and Settings at upper right; analog joystick at lower left. The lower-right deck has a large contextual jump/interact button, four simultaneous Q/W/E/R Active buttons, four rectangular Buff cells with a circular 1/2–2/2 page switch, and round HP/MP potion buttons above. Normal attack remains available as a separate small rectangular button.

Buff page 1 maps slots 1–4 (tiers 1–2), page 2 slots 5–8 (tiers 3–4). No E/R page switch or Buff popup is required. Skill and Buff buttons show cooldowns and lock unavailable slots; potions show stock and cooldown. Pointer hold/release remains supported for charged/channel skills. Layout respects screen safe areas and scales controls on short/narrow screens; portrait keeps the map above the controls. Desktop controls remain unchanged. Tutorial Buff instructions and settings help match the new controls.

---

# Current release 0.65 · Tutorial and town layout

New characters begin in a separate tutorial, spawning at the lower right. Popups and a persistent hint guide left/right movement, talking to the trainer at the lower left, installing and casting Active/Buff skills through the real skill UI, climbing the ladder, jumping across two ledges, dropping through the upper platform with Down + Space, and interacting with the lower portal. Down + Space always drops through, even near an interactable.

NPC lessons explain Active vs Buff vs Passive, MP/CD, QWER and 1–8, main-weapon/Emblem eligibility, skill boxes and duplicate-scroll upgrades. Completion offers one Common Lv.1 Emblem selected from all twelve weapon types, equips it, then enters town. Progress and pending reward persist; reward claims cannot repeat. Existing characters without a tutorial-progress field keep entering town. New characters start with empty Active slots so installation is taught explicitly.

Town follows the supplied layout: bottom-left spawn, two left-side shop levels (potion shop on the middle-left, three reserved storefronts), one ladder connecting all left levels, GM at the lower right, and a ramp up to the right-hand stage portal. Town/tutorial fit a single 960-unit canvas. Weapon boxes retain class-only pools: STR sword/spear/hammer; DEX bow/crossbow/gun; INT wand/staff/tome; LUK dagger/fist/star.

---

# Current release 0.64 · Ground drops

Removes the round-results screen and grade/end-of-round rewards. Monster EXP is still awarded on each kill. Every monster drops money equal to its level × 10; ordinary monsters retain a 1% random-box chance, Elites guarantee a random box, bosses drop their weapon box on the ground. Walk close on the same platform to collect after a short spawn delay. Full money/box stacks leave the remaining drop on the ground. Collected items save immediately; uncollected items disappear when leaving the map.

Boss victory keeps the arena open for pickup and grants the existing advancement mark; leave through the portal. Leaving a dungeon or defeat returns directly to town. Party and Enchant are disabled, including D/F shortcuts; Status and Skill remain available.

---

# Current release 0.63 · Buff / Passive

Adds all 128 shared/unique Buff and Passive records for twelve weapons and four tiers alongside the 48 existing Active skills. Each tier has two Buff and two Passive slots. Main weapon and Emblem grant eligible support skills; their effects work across weapon types. Open Skill, select Buff or Passive, choose slots and upgrade ranks. Use keys 1–8 or the Buff hotbar to activate equipped Buffs.

Life steal, mana steal, sword-wave assistance and invulnerability last 10 seconds with 60-second cooldowns at all ranks. Sword orbs start at zero and accumulate every 15 seconds; Berserk clears all stacks after five seconds without direct damage. Staff Buffs permit walking while charging and reduce charge time by 40%. Tome extends field/object and Buff durations; invulnerability cannot be extended. Generated extra Hits, waves, reflections and delayed damage cannot trigger special on-hit effects again.

Shared stat Buff I/II/III use only the highest value. Identical support skills do not stack. Removing an enabling weapon/Emblem ends unavailable Buffs. Selection and rank persist in schema v4; active Buff timers and cooldowns reset on loading. Old Active ranks, equipment and progress remain intact. Skill boxes now include Active, Buff and Passive scrolls.

Full Lv.1/Lv.30 values: [BUFF-PASSIVE-REFERENCE.md](BUFF-PASSIVE-REFERENCE.md). Historical release notes below describe earlier versions.

---

# Fernvale — Browser Edition 0.52

เกม pixel RPG เล่นคนเดียว ใช้ HTML, CSS, JavaScript และ Canvas 2D โดยตรง ไม่มี Godot, WASM, npm build หรือเซิร์ฟเวอร์เกม

## เล่น
เปิดเว็บไซต์ แล้วกด **เริ่มเกม → เซฟตัวละคร → เดินไปแสงวาร์ปหมู่บ้านแล้วกด Spacebar → เลือกด่าน**
- เซฟ 3 ช่อง แยกความคืบหน้ากัน โหลดแล้วเริ่มในหมู่บ้าน
- ด่าน 0 / 1 / 2 / 3 เริ่มด้วย 18 / 18 / 30 / 42 ตัว เป็นมอนสเตอร์ทั่วไปทั้งหมด ไม่มีมินิบอส
- รอบละ 3 นาทีของเวลาเล่น (พักเกมหยุดเวลา) มอนสเตอร์ธรรมดาเกิดใหม่หลังตาย 4 วินาที ครบเวลาและกำจัดอย่างน้อย 1 ตัวนับผ่านด่าน; สิทธิ์เข้าด่านใช้เลเวลตัวละครแทนการผ่านด่านก่อนหน้า
- ตัวเลข Lv. 10 / 20 / 30 ในหน้าเลือกด่านเป็นป้ายระดับด่าน ไม่ใช่เงื่อนไขเลเวลตัวละคร
- ดาบมือเดียว โล่ ทางลาด บันได HP / MP / EXP ไม่มีของดรอป
- HUD มี status [Tab], skill [1], party [2], enchant [3] ขนาดเท่ากัน; ทุกปุ่มเปิดหน้าต่างได้ โดย Skill/Party/Enchant เป็นหน้าต่างว่างก่อน
- กด 1 เปิด Skill อัป Power Bash/Slash/HP Boost/DEF Boost ด้วย SP อาชีพขั้นแรก

ลูกศรซ้าย/ขวาเดิน, Space กระโดด, ขึ้นลงปีน, X/C ฟัน, Spacebar โต้ตอบ/เข้าวาร์ป, Tab ตัวละคร, Esc/P พัก
มีปุ่มสัมผัสบนอุปกรณ์ที่รองรับ touch; คอมพิวเตอร์พร้อมคีย์บอร์ดยังเป็นเป้าหมายหลัก

## สร้างตัวละครและอาชีพ
เลือกช่องเซฟว่างจะเปิดหน้าสร้างตัวละคร ตั้งชื่อ ดูตัวละครและคะแนน AOE / Easy / Endurance อย่างละ 5 ช่อง แล้วกดสร้างเพื่อเริ่มเกม ย้อนกลับได้โดยไม่สร้างเซฟ เซฟที่มีตัวละครแล้วจะเล่นต่อทันที

เลือกได้เฉพาะนักรบสายดาบ เวทย์/ธนู/โจร/นักประดิษฐ์ล็อกไว้ คะแนนเป็นการสรุปแนวทางเบื้องต้นที่ปรับได้ ไม่ใช่ค่าความเสียหายจริง

ขั้น 2 ต้อง Lv.30 และชนะด่านบอสแยก “บททดสอบนักรบ” รับตรานักรบ 1 ชิ้นแน่นอนเมื่อชนะ (ไม่ใช่ดรอปสุ่ม) เมื่อแพ้จะไม่ได้ตรา ใช้ตราหนึ่งครั้งเพื่อเปลี่ยนสาย
เปิดปุ่ม **อาชีพ** ในหมู่บ้านหรือเมนูพัก **เส้นทางอาชีพ** เพื่อดูเงื่อนไข เข้าท้าบอส และเลือกสาย
- ดาบใหญ่: ฟันกว้าง 140 / พลัง x1.4 / คูลดาวน์ 0.55 วิ
- ดาบโล่: ระยะ 90 / พลัง x1 / ป้องกัน +5 / คูลดาวน์ 0.38 วิ
- หอก: ระยะ 160 / พลัง x1.15 / คูลดาวน์ 0.45 วิ
ชุดสกิล Q/W/R ยังใช้ชุดเริ่มต้น คะแนนทั้งสามด้านและค่าต่อสู้เป็นสมดุลเบื้องต้นสำหรับต้นแบบ
สายขั้น 2 กดดูพรีวิวได้ก่อนสร้าง แต่ตัวละครใหม่ทุกตัวยังเริ่มเป็นนักดาบขั้น 1 เลือกเปลี่ยนจริงภายหลังและต้องยืนยัน ไม่มีเปลี่ยนข้ามสายหลังยืนยัน ขั้น 3–5 เตรียมไว้พัฒนาภายหลัง
เซฟเก่าที่ไม่มีฟิลด์อาชีพจะเป็นนักดาบโดยอัตโนมัติ และไม่เสียความคืบหน้า

## ขนาดแมพและพื้นผิว
หมู่บ้านและสนามบอสกว้าง 960 หน่วย (หนึ่งจอ) ด่านปกติกว้าง 1,200 หน่วย จากเดิม 3,000 หน่วย จำนวนมอนสเตอร์เริ่มต้น 18/30/42
พื้นผาหินเป็นฉากหลังที่เดินผ่านด้านหน้าได้ มีการชนเฉพาะขอบหญ้าด้านบน ทางลาด และพื้นล่าง กด ↓ + Space เพื่อลงผ่านแพลตฟอร์มไปชั้นถัดไป ใช้บันไดขึ้นกลับ
ลายหิน หญ้า และเห็ดวาดขึ้นใหม่ด้วย Canvas ไม่ได้ใช้รูปจากเกมอื่น

## เซฟ
เซฟอัตโนมัติทุก 8 วินาทีระหว่างเล่น และเมื่อพัก/เปลี่ยนหน้าจอ/จบด่าน ใช้ localStorage บน origin ปัจจุบัน ไม่มี cloud sync
หน้าเลือกตัวละครมีถังขยะลบแต่ละเซฟพร้อมยืนยันและสำรองก่อนลบ รวมทั้งนำเข้า/สำรองเซฟทั้งหมด เมนูพักเกมมีสำรองเซฟ
เซฟเดิมของ Godot บน origin เดียวกันจะย้ายมาช่องแรกเมื่อยังไม่มีชุดเซฟใหม่ โดยคงข้อมูลต้นฉบับไว้
รองรับไฟล์ JSON จากเวอร์ชันเดิม และชุดเซฟ 3 ช่องเวอร์ชันใหม่ การนำเข้าต้องยืนยันก่อนแทนข้อมูล
เซฟที่อ่านไม่ได้จะไม่ถูกเขียนทับ สามารถดาวน์โหลดต้นฉบับเพื่อกู้คืนได้
สำรองไฟล์ก่อนล้างข้อมูลเว็บไซต์หรือย้ายเบราว์เซอร์/เครื่อง

## พัฒนาต่อ
แก้ไฟล์ใน `dist/` โดยตรง:
- `index.html` — หน้าแรก, เซฟ, หมู่บ้าน/ด่าน, เลือกด่าน และ HUD
- `style.css` — หน้าตาและ responsive layout
- `career.js` — การสร้างตัวละคร พรีวิวอาชีพ คะแนน และการเปลี่ยนอาชีพ
- `interface.js` — หลอด Elite/คอมโบและหมวดเลือกด่าน
- `character.js` — สูตรพลัง หน้าต่าง Tab ช่องสวมใส่ กระเป๋า และพลังพิเศษ
- `rounds.js` — สูตรคะแนน เกรด โบนัส EXP มอนสเตอร์ Elite และหน้าสรุป
- `game.js` — state, physics, combat, skills, stage lifecycle และ persistence
- `sprites.js` — original procedural pixel artwork
- `NotoSansThai.ttf` / `FONT-OFL.txt` — ฟอนต์และใบอนุญาต

เปิดเซิร์ฟเวอร์จากโฟลเดอร์นี้:
`python -m http.server 8765 --directory dist`
แล้วเปิด http://localhost:8765
ไฟล์ dist ทั้งหมดเป็น static assets ไม่ต้องต่อเซิร์ฟเวอร์เพื่อเล่นต่อหลังโหลดครบ ไม่มี CDN ภายนอก แต่เว็บยังไม่ใช่ PWA และไม่รับประกันการเปิด URL ขณะออฟไลน์

ซอร์ส Godot เก่าเก็บนอกโปรเจกต์นี้ใน `../Fernvale-Legacy-Source-0.4/` และ export เก่าใน `../Fernvale-Web-Godot-0.4-backup/` ไม่ได้ใช้สร้างหรือรันเกมเวอร์ชันนี้

## ตรวจสอบ
ชุดทดสอบใน `tests/` ใช้ Node + Playwright และ Microsoft Edge
เริ่มเว็บที่พอร์ต 8765 จากนั้น `node tests/browser.cjs` และ `node tests/extended.cjs` จากนั้น `node tests/creator.cjs` และ `node tests/terrain.cjs` กับ `node tests/rounds.cjs`
หาก Playwright ติดตั้งในตำแหน่งอื่น ตั้ง PLAYWRIGHT_MODULE เป็นพาธโมดูลนั้น
ผลตรวจและข้อจำกัดอยู่ใน VALIDATION.md

## รอบฟาร์มและผลรางวัล (0.8)
- EXP เก็บรอระหว่างรอบ แจกครั้งเดียวเมื่อครบเวลา หมดแรง หรือกดจบรอบก่อนเวลา ปิดหรือรีโหลดหน้าเว็บก่อนจบรอบจะเสีย EXP ที่ยังรอรับ
- คอมโบเพิ่มเมื่อกำจัดต่อกันภายใน 5 วินาที คะแนนกำจัดตัวละ 100; คอมโบเพิ่ม 10 ต่อขั้นต่อการกำจัด สูงสุดครั้งละ 100; Elite เพิ่ม 500; บอสเพิ่ม 1,000
- เกรด D/C/B/A/S/SS/SSS ใช้เกณฑ์ 0/1,000/2,500/4,500/7,000/10,000/15,000 คะแนน โบนัส EXP 0/10/20/35/50/75/100%
- โอกาสรางวัลภายในระบบ 5/15/30/45/60/75/90% เป็นค่าตัวอย่าง ยังไม่สุ่มหรือแจกไอเทม ช่องรางวัลว่าง ไม่มีของดรอปจากศัตรู ผลึกเก่าในเซฟเก็บไว้เพื่อความเข้ากันได้
- Elite เกิดทุกครั้งที่กำจัดมอนสเตอร์ทั่วไปครบ 100 ตัวในด่านปกติ ขนาด 3 เท่า HP 5 เท่า ATK 2 เท่าของมอนสเตอร์ด่านนั้น มี hitbox ตามขนาด
- บททดสอบเปลี่ยนอาชีพเดิมยังจบเมื่อชนะบอส และให้ตราภารกิจที่จำเป็นตามเงื่อนไขเดิม ไม่มีของดรอปสุ่ม จำกัดเวลา 3 นาทีเช่นกัน
- ขึ้นบันไดด้วย ↑ ภายในระยะ 36 หน่วยจากกลางบันได ลงด้วย ↓ ปล่อยปุ่มค้างบนบันไดได้ และเดินออกด้านบนได้ขณะกด ↑ แสงวาร์ปใช้ Spacebar
- สูตรคะแนน โบนัส และอัตราตัวอย่างปรับได้ที่ ROUND_GRADES ใน rounds.js ยังไม่ได้ทดสอบสมดุลด้วยการเล่นครบทุกเลเวล

## หน้าต่างตัวละคร (0.9)
Tab เปิด/ปิดหน้าต่างตัวละคร หรือกดปุ่ม status; Esc และปุ่ม × ปิด เกมและนาฬิกาหยุดระหว่างเปิด
- STAT แสดง STR/DEX/INT/LUK; VIT เก่าเก็บในข้อมูลเซฟเพื่อความเข้ากันได้ แต่ไม่ได้ใช้คำนวณพลังแล้ว เซฟเก่าเพิ่ม LUK=5 และพลังพิเศษ=0
- นักรบทุกสายใช้ STR หลัก/DEX รอง; เตรียมสูตรเวทย์ INT/LUK, ธนู DEX/STR, โจร LUK/DEX, นักประดิษฐ์ DEX/STR สำหรับอนาคต อาชีพเหล่านี้ยังไม่เปิดให้เล่น
- ATK = อาวุธ ATK × (4×พลังหลัก + พลังรอง)/20 + Lv−1 (ปัดเป็นจำนวนเต็ม)
- HP=90+STR×10+(Lv−1)×12, MP=40+INT×6+(Lv−1)×5, DEF=อุปกรณ์ DEF+floor(STR×0.7)+โบนัสอาชีพ
- CRI=3+LUK×0.4+DEX×0.2%, CRI.DAMAGE=150+LUK×0.2%, ACC=90+DEX×0.4+LUK×0.2 เป็นตัวเลข; CRI สูงสุด 100%
- Ignore DEF / Damage / Boss Damage เป็นพลังพิเศษแยกจากค่า STAT ใช้โบนัสความเสียหายและหักป้องกันในการโจมตี ACC แสดงค่าที่คำนวณ แต่ยังไม่มีระบบศัตรูหลบการโจมตี
- สูตรเป็นต้นแบบที่ได้แนวทางจากระบบพลังหลัก/รอง ไม่ใช่การใช้สูตร MapleStory ทุกเวอร์ชันแบบตรงตัว
- ของสวมใส่ 8 ช่องเรียง 4×2: อาวุธหลัก/รอง ประดับ 1/2 หมวก เสื้อ ถุงมือ รองเท้า แสดงอาวุธเริ่มต้นตามอาชีพและโล่ไม้สำหรับสายที่ใช้โล่ ดูรายละเอียดด้วย tooltip ได้ ยังไม่เปิดใส่/ถอดไอเทม
- กระเป๋า 20 ช่อง (4 แถว × 5 คอลัมน์)แยกหมวดสวมใส่/ใช้งาน และ 2 หมวดที่ล็อก ยังไม่มีไอเทมในกระเป๋าหรือของดรอป
- หน้าสรุปด่านฟาร์มไม่แสดงคะแนนบอสแล้ว; บททดสอบเปลี่ยนอาชีพยังมีบอสตามภารกิจเดิม

## ปรับหน้าต่างและการฟาร์ม (0.10)
- ช่องอาชีพบนฝั่งซ้าย, AP แสดงเฉพาะ AP กับตัวเลข; + ใช้ 1 AP เพิ่ม 1 STR/DEX/INT/LUK และบันทึกทันที เพิ่มไม่ได้เมื่อ AP หมดหรือค่าสูงสุด 999
- ค่า STAT หลักของอาชีพใช้ตัวอักษรเหลือง; ฝั่งซ้ายยืดเท่าฝั่งขวาบนจอใหญ่; จอเล็กเลื่อนแนวตั้งได้
- เอาหัวข้อ/คำแนะนำที่ผู้ใช้ระบุออก; กระเป๋า 4×5 เต็มพื้นที่; รางวัล 2×10 ช่องว่าง ยังไม่แจกไอเทม
- หมวด dungeon/boss; ด่าน Lv.20/30 เข้าได้ที่ Lv.15/25 โดยไม่ต้องผ่านด่านก่อนหน้า Stage 0 Lv.1 สำหรับเริ่มเกม; Stage 1 Lv.10 เข้าได้ที่ Lv.5 ตามสูตรเลเวลลบ 5
- หลอด Elite ชาร์จ 1 หน่วยต่อการกำจัดมอนสเตอร์ธรรมดา ครบ 100 จะเกิด Elite และเริ่มชาร์จใหม่ Elite ไม่เพิ่มหลอด
- คอมโบแบบสด D/C/B/A/S/SS/SSS ที่ 0/5/10/20/35/50/75 ต่อเนื่อง ภายใน 5 วินาที หลอดเหลืองแสดงเวลาต่อคอมโบ เมื่อหมดรีเซ็ต D; เกรดผลรวมจบรอบยังคิดจากคะแนนสะสม
- ชื่อแมพอยู่ในแถบขาวเหนือมินิแมพพื้นดำ; ลบแผงชื่อแมพเดิม คำใบ้ คีย์บอร์ด footer และปุ่มขวาบน; ไม่มีประตูหมู่บ้านในด่าน
- Spacebar ใช้แสงวาร์ปในหมู่บ้าน; Esc/P เปิดเมนูพัก เลือกด่าน/เส้นทางอาชีพในหมู่บ้านได้ และจบรอบก่อนเวลาในด่านได้
- tests/ui-revision.cjs ตรวจ AP เซฟ รูปแบบ UI เลเวลปลดด่าน Elite และ reset คอมโบ; ทุกชุด integration เดิมปรับตามกติกาใหม่และผ่าน

## ด่านเริ่มต้น Stage 0 (0.11)
- ทุ่งหญ้าเริ่มต้น: มอนสเตอร์ Lv.1 จำนวนเริ่มต้น 18 ตัว HP 24 / ATK 6 / EXP 10; มีการเกิดใหม่ คอมโบ และ Elite ทุก 100 ตัวตามกติกาปกติ
- ทุกด่านใช้เลเวลตัวละคร >= max(1, เลเวลด่าน - 5): Stage 0/1/2/3 เข้าได้ที่ Lv.1/5/15/25; เลเวลด่าน 1/10/20/30
- ด่าน 1–3 และบอสภารกิจใช้ ID เดิม เซฟความคืบหน้าเดิมไม่เปลี่ยนเลขด่าน Stage 0 ไม่เพิ่มตัวนับผ่านด่าน 1–3
- Lookup ตาม ID ไม่อิงตำแหน่งในอาร์เรย์ เพื่อรองรับ ID 0 ในชื่อแมพ มอนสเตอร์ และ Elite
- tests/stage-zero.cjs ตรวจเริ่มใหม่ Lv.1, ขอบเขตเลเวล, เวลา/EXP/Elite/retry, ด่านเดิมและเซฟเดิม

## ATK รวม (0.12)
- STATUS แสดง ATK เพียงค่าเดียว ทั้งดาบและสกิลโจมตีแสงใช้ค่า ATK เดียวกัน
- ATK = round(ATK อาวุธ × (4 × พลังหลัก + พลังรอง) / 20 + Lv - 1); ค่าสเตตัสอื่นไม่เพิ่ม ATK โดยตรง
- นักดาบ/ดาบใหญ่/ดาบโล่/หอกใช้ STR หลัก DEX รอง ให้น้ำหนัก 4:1; สูตรเตรียมสลับ main/secondary สำหรับอาชีพในอนาคต
- สกิลแสงมีพลังพื้นฐาน 18 + ระดับสกิล×12 + ATK; ฟันใช้ ATK × ตัวคูณอาชีพก่อนสุ่มความเสียหายและคริติคอล

## ปรับภาพและช่องสกิล (0.13)
- เริ่มเกมอยู่กลางปุ่ม; เอาคำบรรยายชื่อเกม หัว YOUR ADVENTURE ข้อความเซฟ และปุ่ม import/export จากหน้าเลือกเซฟออก
- ชั้นผาด้านหลังใช้สีอ่อน พื้นดินล่างเป็นสีน้ำตาลเข้ม วาดพื้นล่างหลังผาเพื่อไม่ให้ลายทับกัน การชนคงขอบแพลตฟอร์ม/ทางลาดเดิม
- ไม่มีกรอบประตูหมู่บ้าน ใช้แสงวาร์ปม่วงสว่างและอนุภาคที่วาดใหม่ กด Spacebar เมื่อใกล้แสงเพื่อเลือกด่าน; E สงวนเป็นช่องสกิลว่าง
- Q/W/E/R แสดงช่องว่างและไม่ใช้งาน ทั้งคลิกและคีย์บอร์ด สกิลเดิมในเซฟเก็บไว้สำหรับอนาคต ดาบ X/J ยังโจมตีได้
- เมนูพักยังสำรองเซฟได้; ลบเซฟรายช่องจากหน้าตัวละครยังทำได้

## การควบคุม (0.14)
- ลูกศรซ้าย/ขวา เดิน; Spacebar กระโดด/โต้ตอบ; ↑/↓ ปีนบันได; ↑ เข้าแสงวาร์ปในหมู่บ้าน
- Q/W ใช้ Power Bash/Slash เมื่อเรียนแล้ว; E/R ยังว่าง
- Tab เปิด/ปิด Status; 1 เปิด/ปิด Skill; 2 เปิด/ปิด Party; 3 เปิด/ปิด Enchant (รองรับแป้นตัวเลข Numpad ด้วย)
- Skill/Party/Enchant เป็นหน้าต่างว่าง เกมหยุดระหว่างเปิด; Esc ปิด; สลับระหว่างหน้าต่างด้วยคีย์ลัดได้
- ข้อความการควบคุมในตั้งค่าแสดงปุ่มครบ; C โจมตีดาบ; Z/X ใช้ยา HP/MP

## Spacebar โต้ตอบ (0.15)
- ใกล้เป้าหมายโต้ตอบใช้ Spacebar เพื่อประตู/แสงวาร์ป/NPC; หากไม่มีเป้าหมายในระยะจะกระโดด
- เป้าหมายมีพิกัด ระยะ และ callback โต้ตอบ เลือกตัวที่ใกล้ที่สุด ในเกมตอนนี้ลงทะเบียนเฉพาะแสงวาร์ปหมู่บ้าน; ยังไม่มี NPC จริง
- ↑/↓ ใช้ปีนบันได ไม่เข้าวาร์ปอัตโนมัติ; จอสัมผัสมีปุ่ม Space สำหรับโต้ตอบ
- สถานะยืนพื้นถูกตั้งตั้งแต่เข้าฉาก จึงกดกระโดดได้ทันที ไม่ต้องรอเฟรมแรก
- interaction.cjs ทดสอบด้วย Space จริง ทั้งไกล/ใกล้ประตู และ NPC fixture การกันกดซ้ำ ระยะเป้าหมาย และเมนูหยุดเกม

## สกิลนักดาบและยา (0.16)
- กด 1 เปิดหน้าสกิล เริ่มทุกสกิลที่ Lv.0; ใช้ 1 SP อัปหนึ่งระดับ ได้ 1 SP ต่อเลเวลอัป SP ปัจจุบันใช้กับอาชีพขั้นแรก และเก็บ SP จากเซฟเก่าไว้
- Power Bash: Q, สูงสุด10, 250–430% ATK, 1 เป้าหมาย, MP8–11, คูลดาวน์1.2วิ, ผลักศัตรู; Elite/บอสถูกผลักครึ่งระยะ
- Slash: W, สูงสุด10, 110–200% ATK, สูงสุด4เป้าหมายด้านหน้า, MP6–8, คูลดาวน์0.65วิ
- HP Boost: ติดตัวสูงสุด5, HP สูงสุด +8% ต่อระดับ (สูงสุด40%); ไม่ฮีลทันทีเมื่ออัป
- DEF Boost: ติดตัวสูงสุด5, DEF +3 ต่อระดับ (สูงสุด15)
- สกิลใช้ ATK รวมและตัวคูณอาชีพ/คริติคอลตามระบบเดิม; ไม่มีผลเมื่อยังไม่เรียน/MPไม่พอ/อยู่ในเมนู
- ยา HP Z / MP X วงกลมใน HUD ใช้ทดลองไม่จำกัด ฟื้น35%ของค่าสูงสุด คูลดาวน์แยก2วิ; เมื่อค่าเต็มไม่ใช้คูลดาวน์
- X สงวนยา MP; โจมตีปกติด้วย C เท่านั้น Q/W ใช้สกิล E/R ยังว่าง
- รอบปกติ/บอสใช้180วินาที (3นาที) ทุกรอบ; ไม่แสดง EXP/COMBO ลอยจากการกำจัด แต่ยังคิดคะแนนและ EXP รอจบรอบ
- E/R และอาชีพขั้นสองยังไม่มีชุดสกิลใหม่ ค่าสกิลและยาทั้งหมดเป็นสมดุลต้นแบบ

## เลือกช่องสกิลและคำอธิบายอัป (0.18)
- ตัวเลขคอมโบสดขนาดใหญ่แทนเกรด D–SSS ใต้หลอดเหลือง; เกรดหน้าสรุปยังใช้คะแนนรวมตามเดิม
- ชี้หรือคลิกค่า STAT ดูผลจริงเมื่อเพิ่ม1หน่วย เปรียบเทียบก่อน/หลังสีเขียวโดยยังไม่ใช้ AP
- หน้าสกิลหัวข้อเป็นชื่ออาชีพ ไม่มีคำว่าขั้น ปิดด้วย × ขวาบนหรือคีย์1/Esc ไม่มีปุ่มปิดด้านล่าง
- ช่อง Q/W/E/R ด้านล่างเลือก active ที่เรียนแล้วเองจากรายการได้; passive ใส่ช่องไม่ได้ ช่องว่างไม่ร่าย ไม่มีการบังคับ Q/W
- การจัดช่องเก็บในเซฟ; เซฟเดิมที่ยังไม่มี skillSlots เริ่มเป็นช่องว่างโดยเก็บเลเวลสกิล/SPเดิมไว้
- สกิลไม่มีคูลดาวน์ ร่ายหนึ่งครั้งต่อการกดหรือคลิกหนึ่งครั้ง (ยังต้องมีMP); ปุ่มCและยาZ/Xใช้เดิม คูลดาวน์ยา/โจมตีปกติยังทำงาน
- ค่าขั้นถัดไปอยู่เฉพาะ tooltip ของ + เปรียบเทียบปัจจุบันกับถัดไป และตัวเลขที่เพิ่มสีเขียว; ดูได้แม้ไม่มีSP

## ป้องกันไฟล์ค้างต่างรุ่น (0.19)
- HTML ระบุ data-release และโหลด JavaScript/CSS ด้วย URL ที่มีเลขรุ่น; game.js/sword.js ตรวจรุ่น HTML และเปลี่ยนไป URL release ปัจจุบันหนึ่งครั้งเมื่อพบรุ่นไม่ตรงกัน
- updateSwordHUD ข้าม DOM ที่ยังไม่มีและรองรับข้อมูลสกิล/ช่องเดิม เพื่อไม่ให้ error ใน HUD หยุดฉาก
- ไม่ลบ/รีเซ็ต localStorage ตัวละคร ทุกการทดสอบใช้ browser context แยกจากผู้ใช้
- cache-recovery.cjs ตรวจเซฟเก่า ไฟล์คนละรุ่น และ DOM ช่องสกิลไม่ครบว่าฉากยังวาด/เดินได้
- เมื่อเปลี่ยนโครง UI หรือเผยแพร่เวอร์ชันใหม่ ให้ปรับ data-release ใน index.html, release guard ใน game.js/sword.js และ query ของ JS/CSS ให้เป็นรุ่นเดียวกัน

## 0.20 — Item details and compact skills
- Hover or focus equipped items and usable potions for their name and effect; click pins details.
- Each character receives 10 HP and 10 MP sample potions. Legacy saves without consumables receive these once; saved zero stock stays zero. Successful use consumes one and restores 35%, with a 2-second potion cooldown.
- Compact 2×2 menu and one-row named Q/W/E/R HUD. Empty potion stock displays a gray HP/MP bottle.
- Skill list selects a right-hand description and next-level comparison. Unlearned/MAX skills have one detail card. SP shares the class-title row.

## 0.21
HUD potion count badges update on use and retain zero stock. Skill window returns to a narrow single list with scrolling and bottom Q/W/E/R assignment. Clicking a skill opens a separate detail window, with complete current and next-level descriptions. Unlearned/MAX skills show one card. Combat values unchanged.

## 0.22 — Round loot
Normal attack hits only the nearest living target within reach; Slash retains four targets. Successful farming rounds grant four boxes (main/secondary/armor/accessory) and 500 × stage number silver coins (Stage0=0, Stage2=1000). Failed, abandoned and job trial rounds do not grant farming loot. Rewards are awarded once at settlement.
Open boxes in usable inventory, then click equipment in equipment inventory to equip. Gear remains in the bag and equipped IDs reference owned gear. Rarity chances Common50/Rare35/Epic10/Legend5%; white/blue/purple/yellow borders, 0/1/2/3–4 distinct affixes. Legend affix count is equally likely 3 or 4. Gear bonuses apply to derived status. Box equipment scales from character level bracket on opening. Item inventory scrolls beyond 20 cells; save migration defaults old saves to zero money/boxes and no generated gear.
Skill list moves left on desktop for a wider separate details panel. Status panel displays numeric balance with a silver coin after it.

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

## 0.36 — Second-job advancement
Lv.30 offers a quest to defeat the Warrior Trial boss. Victory grants a Warrior Mark in the usable inventory. Activate it and confirm one of Greatsword (8 skills), Guardian (8 skills), or Spearman (9 skills). Skills are adapted from the official MapleStory Warrior guide: https://gi.maplestory.nexon.com/Guide/GameInformation/Skill/Warrior
First-job skills and points remain. Second-job skills have a separate bank: 10 SP on advancement, plus 3 per level from 31 through 60, including catch-up for delayed advancement. Select the second-job tab, learn skills and bind active skills to Q/W/E/R. Bosses and elites resist stun/pull. Buffs last 45 seconds; Beholder heals every 5 seconds.

## 0.37 — Locked box tiers
All four box categories store their item level. Stage levels10–29 /30–59 /60–99 /100+ drop boxesLv10 /30 /60 /100 respectively. Stages below10 do not drop boxes. Elite drop100% and ordinary drop1% are unchanged. Grade bonus boxes use the same stage tier. Same type and level stack; different levels occupy separate stacks. Opening generates gear at the locked level regardless of character level. Inventory, shop, rewards and opening dialogs display the level.
Legacy boxes have no source-stage history: migrate using the old level-based opening rule, rounded into the new tiers (minimum10), without losing counts. Existing gear retains stats and gains its old stage-derived level label. No equip-level restriction is added.

## 0.38 — Main-stat formulas
Each STR adds10HP and1DEF; DEX adds1ACC and0.125%CRI; INT adds10MP and1ACC; LUK adds0.125%AVOID and0.125%CRI. Only the class main stat contributes to ATK at1:1, added to weapon ATK; no secondary-stat multiplier or automatic level ATK. Existing HP/MP level growth, job DEF and skill/equipment bonuses remain. BaseCRI0%, baseCRI.DAMAGE150%, baseACC90. CRI andAVOID cap100%. LUK no longer raisesCRI.DAMAGE; existing equipment criDamage affixes and character special criDamage bonuses remain supported. Avoided monster contact showsMISS and uses the usual1.2s invulnerability without damage, knockback or reflection.

0.39: Shared action recovery prevents repeated or alternating attack/skill spam. Normal attacks0.7/0.9/0.7/0.8s by job; skill attacks0.8–1s, buffs0.65s, toggles/leap0.5s. Weapon Acceleration reduces duration up to25%, floor0.5s. Movement and potions unaffected. Stats and previews display up to1 decimal; underlying calculations retain precision.

0.40: Future level-ups grant1AP; existing balances remain. GM NPC at town735/420, interact withSpace: +99,999money, +1level through regular progression, reset toLv1 after confirmation. Reset clears XP/AP/SP/stats/class/skills/advancement quest, retains money/inventory/equipment. GM commands available to all players for testing.

0.41: Two active skills per tier/branch: Slash Blast/Warrior Leap; Brandish/Flash Slash; Divine Swing/Page Order; Spear Pulling/Beholder Shock. Former toggles/buffs become learned passives, existing ranks retained and obsolete bindings cleared. Recovery0.4–0.5s with one queued input during final0.22s. SPD100–200%, JUMP100–120% control actual movement. Basejump360 velocity; maxjump~84px, second leap horizontal without upward reset.

0.42: Top-right placeholder buff tiles with bottom-right Combo/Holy stack counts. Greatsword active skills Brandish/Spirit Blade; Flash Slash passiveSPD+2%/rank. Spirit Blade fires an8-direction piercing wave up to6targets, MP12,120+6rank%ATK, no former passiveATK/reflect. Buy/sell quantity MAX uses available money/stock.

0.43: Spirit Blade8s cooldown, hotbar countdown, paused game freezes timer; other actions remain available after normal recovery.

0.44: Mobile browser touch UI on coarse pointers up to1100px, landscape full screen and portrait layout. Dpad walking/climbing, separate interact, jump/attack, learned QWER skill buttons with cooldown and HP/MP potions. Multi-pointer release/cancel preserves other held controls. Compact HUD and touch bag/skill/pause menus; safe-area spacing, scrollable dialogs; preserve canvas aspect ratio and desktop keyboard/mouse. Saves remain browser-local. No native app install required.

0.45: Drag-and-hold circular joystick replaces Dpad. Right five-circle layout: large contextual jump/interact foot/speech icon, smaller normal attack and Q/W/E skill slots. PC retains QWER. Minimap removed globally; combo only track and count without frame/header.

## 0.46 — Weapon skill loadouts
Four base classes (warriorSTR, shooterDEX, mageINT, rogueLUK) choose allowed weapons at creation. Weapon items can equip either hand: main ATK100%, offhand50%, special bonuses100%, primary stat once1:1. Main enables active/buff/passive; offhand onlybuff/passive. Four tiers unlock10/30/60/100, each1active2buff2passive. QWER active by tier; mobile third slot switchesE/R. Skills from tier-labelled skill boxes replacing offhand box category; Elite grants exactly1 random box. Weapon box supplies permitted class weapons for either hand. Added Lv60/Lv100 stages.
Skill catalogue:13weapon types ×4tiers ×(1active2buff2passive)=260skills. Melee/ranged attacks with weapon-specific range, hammer stun, cooldowns; buffs ATK/DEF120s, passives ATK/SPD. Use a duplicate scroll to learn atLv1 or upgrade up to30. Target level2–5/6–10/11–15/16–20/21–25/26–30 success100/80/65/50/40/30%. Failure consumes scroll but never loses rank.
SP and old advancement replaced. Legacy characters migrate towarrior, preserve level/stats/AP/money/gear/boxes; archive old tree inlegacySkillBuild, receive one new active scroll per learned old skill at its old tier. Old secondary boxes become same-tier skill boxes. No repeated migration rewards. Buff timers expire on stage change/load.

0.47: Remove creation ATK1:1 label and axe. Twelve weapon types have distinct held pixel sprites and inventory SVG icons. Both equipped hands render actual weapons, no automatic shield. Axe items/skills migrate tohammer; duplicate scroll counts merge, learned rank keeps maximum, duplicate mapped loadout entries clear. New random pools excludeaxe.

0.48: Uniform20-cell inventory grid for equipment/usable/skills,5pages per category and immediate sort button; page selections independent. Sorting persists via inventoryOrder. Equipment capacity100. Legacy skill bags with over100 distinct entries get extra pages to avoid hiding items.

0.49: Boss advancement atLv30/60/100 grants a mark; activate mark inusable inventory to unlock next tier ofsame base class. Legacy characters retain their already unlocked tier. Potion merchant sells tier1skill boxes for1000 with quantityMAX. Equipped hand swaps exchange items directly and never mint starter weapons; implicit starter materialised atmostonce. Character world sprite shows main handonly. Desktop character dialog condensed to avoid scrolling at1102x892.

0.50: Only tier1/2 scaffold currently shown,5slots each. Remove Lv60/100stages and tier3/4boss entry. Provisional skills suspended pending design; existing ranks/scrolls/boxes remain saved. Skill boxes temporarily cannot open and are not consumed. Basic attacks still work.

0.51: Designed tier1skills for12weapons (1active2buff3passive choices each). Main hand supplies Active; both hands supply Buff/Passive pools, choose2each without duplicate display names. Common main-stat buff deduplicates across same-family weapons, best learned rank shown. Slot effects stop immediately with incompatible weapons. Spear buffs/passives extend main attack reach/ignoreDEF; no tip-distance mechanic. Distinct melee/ranged/CC attacks,120s buffs, conditional/passive combat effects. Skill boxes tier1 reenabled and draw fromclass weapon pool. Tier2–4 rows retained as pending design; no tier3/4advancement content.

0.52: New characters learnLv1 Active/twoBuffs for all3permitted classweapons; starter main active/two buffs auto-slotted and usable atcharacterLv1. Passive stillobtained fromboxes. ATKSPD specialstat starts100 caps190; equipmentaffixes/buffs increase it and recovery scales100/ATKSPD. Return portal at right ground end ofnormal/tutorialmaps enters existing end-round/reward flow.

0.53: PC A/S/D/F menus, QWER active and 1-8 buffs. Active CD3s, buff CD8s. Tutorial portal awards Lv5 and 10 tier1 skill boxes once. Offhand contributes special affixes only; boxes roll every weapon in their tier.

0.54: All designed skills start at Lv1 without consuming scrolls; existing ranks retained. Weapon-tab picker, separate Change Skill buttons, hover-only equipped skill details. Tutorial teaches C normal attack and Z/X HP/MP potions, removes sign, adds portal Spacebar prompt. Uniform inventory cells and aligned panel bottoms.

0.55: Weapon status dialog and hover card show name, weapon type, level, ATK, base speed100, enhancement+0 and separate special options. Current weapon model has no per-item base speed or enhancement progression.

0.56: Combat numbers stack per target so multi-hit damage remains visible. Active metrics show damage x hits then Mob; Buff/Passive omit attack metrics. Picker filters requested kind. Shop stock uses icon/name/price rows with hover details. Result dialog half-width and compact on short screens.

0.57: Six farming stages Lv10/20/30/40/50/60. Each entry generates a wider map with 2-4 layers from ramp, staggered, split and bridge families; every ledge connects by ladders. Thirty normal monsters, respawn2s. Boss Lv30/Lv60 with weapon-box rewards; only Lv30 awards tier2 advancement mark.

0.58: Each stage now has one fixed generated layout shared across reentries/reloads. Six stages cover ramp/staggered/split/bridge layouts with2-4 layers. Town-return portals at entry and far end, including bosses. Kill combo UI and score contribution removed.

0.59: Removed unconditional second-jump air dash. Added72 tier2 skills across12 weapons:1 active/2 buffs/3 passive choices each, baselineLv1, unlockLv30+tier2 mark, activeCD5-8s and MP14-20, buffCD12s/duration90s. Tier2 boxes now open and upgrade scrolls. Tier3/4 remain pending.

## Release 0.60 · Active skill replacement and Lv.100 progression

Replaces the previous Active/Buff/Passive system with the agreed 48 Active skills, including charges, channels, toggles, poison, persistent fields, execute chains, summons, movement and boss resistance. Fixed tier damage totals and rank-based mana replace the old rank damage scaling. See SKILLS-REFERENCE.md for timing and resource rules.

Adds GM level +10 (uses ten normal level-ups and awards AP), dungeon stages 7–10 / Lv.70–100, and the Lv.100 boss. The existing Lv.60 boss now awards the tier 3 advancement mark; Lv.100 awards tier 4. Removes stage 0 and its tutorial. Stage 1 is accessible from Lv.1 so new characters can progress; stages 2–10 preserve level-minus-five entry requirements, 30 monsters, layouts, respawns, Elite meter and three-minute rounds.

Save migration removes retired skill data without resetting character levels, money, gear or boxes. Old claw weapons become fist weapons. New skill rank upgrades and scrolls persist under schema v4.

## Release 0.61 · Stage menu
Removes the stage title, combines category tabs and town navigation in a top toolbar, and shows five stages per page with circular page buttons 1–5 at the lower right. Dungeon and boss categories keep their own page selections; unused pages show an empty message.

## Release 0.62 · Emblems

Replaces the secondary weapon equipment slot with an Emblem slot. Emblems identify one of all twelve weapon families and can be equipped by any class, independently of the main weapon. They do not unlock Active skills; Buff/Passive implementation is deferred. Base ATK/DEF/HP/MP are zero; rarity-based Options use the existing equipment system.

Adds distinct Emblem boxes at levels 10/30/60/100 to the normal random box pool. The town shop sells Lv.10 Emblem boxes for 1,000 money each, with quantity purchasing, standard opening and equipment-capacity checks. Skill boxes retain their original separate inventory key and contents. Emblems support inventory sorting, details, equip/unequip, replacement and sale after unequipping.

Old saves gain empty Emblem box stacks. Secondary equipment becomes the same weapon-family Emblem with its id, rarity, level and Options retained, including its equipped binding. Old shields without a weapon type become sword Emblems, matching the former secondary type fallback. No new skills or passive effects are added.
