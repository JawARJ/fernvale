# Fernvale 0.80

- Active ranges, search distances, area radii, projectile travel/blasts and dash distances are half their previous world-space sizes. Display range/hit text and major effect geometry match. Former unlimited-target skills cap at 10; fixed caps above 10 become 8. Summon searches and support area helpers also use half range.
- Each attack round/pulse is one Hit carrying its previous total round damage. Additional-Hit passives are temporarily suppressed and labeled accordingly; skill ranks are retained. Gun channel emits 1–3 full-damage rounds/sec instead of ten sub-hits per round.
- Persistent fields, poison, sword orbit and hammer toggle pulse once per second. Re-entry does not restart an instant pulse. Book IV caps at ten fields and shares a per-target pulse gate across one cast; its follow-up starts after one second and cannot stack ten field hits in the same instant. Book IV workload reproduction fell from ~1.45 s and thousands of lingering damage texts for a simulated six seconds to ~0.25–0.31 s with bounded field hits on this machine. This reproduces heavy overlap, not a proven exception from the user's device.
- Spear sweep brings non-Boss targets onto the player's connected platform route. Their original patrol route is restored on respawn. Dash hits plus final explosion obey a combined target cap and cannot hit the same target twice.
- Equipping/removing/replacing any equipment or changing Emblem type clears Active/Buff/Passive selections, Auto selections, ongoing casts/fields/buffs and stops Auto. Rank/material/equipment progression is retained. Selecting the already equipped item does not clear its loadout. Equipped item dialogs now offer removal, including the virtual starter. Enchanting alone does not clear skills.
- Additional monster tier multipliers (tiers by Stage 1–3/4–6/7–9/10+): HP ×1/2/3.5/5, ATK ×1/1.5/2/2.5, DEF +0/5/10/15 capped at 80. Elite inherits scaled stage bases; bosses use corresponding level tier. Stage 1 remains 55 HP/12 ATK; tier-start normal HP is 55/300/1155/3000 and Boss HP 1200/6000/45000. These are balance tuning values requiring real-play feedback.
- Validation: combat80 exercises all 48 Active skills at ranks 1 and 30, hit/range/cap boundaries, field cadence/re-entry, book overlap, spear lane/respawn, equipment/Auto/skill clearing with rank/save preservation, tier strength and actual PC/mobile cast/removal UI. refinements77, updated refinements76, emblems78, tutorial70 and fingerprint checks pass. Historical combat60/support63 multi-Hit/old-range assertions are superseded by this tuning.

# Fernvale 0.78

- Elite/Boss guarantee an additional skill-Emblem material box, alongside their existing one random equipment box. Normal monsters do not drop the material box. Stage tier grouping remains 1–3 / 4–6 / 7–9 / 10+.
- Box counts are discrete uniform draws: tier 1 = 0–2, tier 2 = 1–3, tier 3 = 2–4, tier 4 = 2–5. Each material independently chooses one of twelve weapon types uniformly. A zero result still consumes the box and reports zero.
- Materials are stackable `loot.emblemMaterials[weapon]`, separate from freely selectable equipment Emblems and legacy equipment-Emblem boxes. Material boxes use their own `emblemMaterial` box type. Existing equipment, ranks, skill scrolls and old boxes are retained.
- An upgrade uses one matching weapon material. Shared-family support skills accept any weapon material from that family, selected explicitly in the dialog. No currency fee; failure consumes one material and keeps the skill rank.
- Target rank 1–10: 100%; 11–15: 90%; 16–20: 70%; 21–25: 50%; 26–30: 30%. Skill cap remains rank 30. Active, Buff and Passive details all offer upgrading.
- New box opening does not require equipment-bag space. Batches cap at 1,000 boxes; inventory shows counts and stage previews identify Elite-only guaranteed material boxes.
- Validation: emblems78 covers every possible quantity in all four tiers, exact upgrade boundaries/costs/failures, wrong-material/free-Emblem rejection, shared-family choice, max rank, old saves, zero outcomes, full equipment bags, real desktop/mobile controls and persistence. Updated refinements76 plus refinements77/tutorial70/assets checks pass.

## 0.77 skill unlock override
Tier 2/3/4 automatically unlock at character Lv.10/20/30. No boss mark is required. Existing higher-tier saves are retained. Boss enemy levels remain 30/60/100.

## Current overrides in 0.75

Equipment tiers follow Stage 1–3 / 4–6 / 7–9 / 10+; box and opened equipment level equals the monster/stage level exactly. Three independent normal box rolls use 1% / 3% / 5% per type within each three-stage group. Elite/Boss grant one uniformly chosen box type with certainty. Money is monster level × 10, delivered immediately. Death subtracts min(current XP, ceil(XP required for current level × 0.10)); no level loss.

# สูตร STATUS ปัจจุบัน

เป็นสูตรต้นแบบของ Fernvale โดยใช้พลังหลักและรองตามอาชีพ ปรับสมดุลต่อได้

L = เลเวลตัวละคร − 1; W = ATK ของอาวุธ (อาวุธเริ่มต้น 17)
นักรบ: พลังหลัก STR พลังรอง DEX; สูตรเตรียมไว้สำหรับเวทย์ INT/LUK, ธนู DEX/STR, โจร LUK/DEX, นักประดิษฐ์ DEX/STR

| ค่า | สูตร |
|---|---|
| HP | round((90 + STR × 10 + L × 12) × (1 + HP Boost Lv. × 0.08)) |
| MP | 40 + INT × 6 + L × 5 |
| ATK | W × (4 × พลังหลัก + พลังรอง) ÷ 20 + L; ปัดจำนวนเต็ม |
| DEF | DEF อุปกรณ์ + floor(STR × 0.7) + โบนัสอาชีพ + DEF Boost Lv. × 3 |
| CRI | 3 + LUK × 0.4 + DEX × 0.2%; สูงสุด 100% |
| CRI.DAMAGE | 150 + LUK × 0.2% เป็นตัวคูณความเสียหายคริติคอล |
| ACC | 90 + DEX × 0.4 + LUK × 0.2 เป็นคะแนนตัวเลข |

ตัวอย่าง Lv.2, STR/DEX/INT/LUK = 5: HP 152, MP 75, ATK 22, DEF 6 เมื่อใช้โล่ไม้, CRI 6%, CRI.DAMAGE 151%, ACC 93

DEF อุปกรณ์เริ่มต้น: โล่ไม้ 3; นักดาบปกติไม่มีโบนัส DEF อาชีพ ดาบโล่ขั้น 2 เพิ่ม DEF อีก 5
CRI.DAMAGE 151% หมายถึงคริติคอลทำความเสียหายพื้นฐานประมาณ 1.51 เท่า
Ignore DEF / Damage / Boss Damage ไม่ได้เพิ่มจาก STR/DEX/INT/LUK แต่ใช้ค่าพลังพิเศษจากแหล่งอื่น (ตอนนี้เริ่มที่ 0)
ACC แสดงคะแนนที่คำนวณแล้ว แต่ระบบศัตรูหลบการโจมตียังไม่ได้เปิด

การกด + ใช้ 1 AP เพิ่ม STAT 1 หน่วย เลเวลอัปให้ 5 AP; เพิ่ม HP สูงสุดไม่ใช่การฮีล HP ปัจจุบันทันที

ATK ใช้ทั้งการฟันและสกิลโจมตี พลังหลักมีน้ำหนัก 4 ส่วน พลังรอง 1 ส่วน
