# Fernvale 0.79

Boss victories no longer award advancement marks or show mark-reward text. Existing equipment/Emblem material loot is unchanged; skill tiers unlock automatically at Lv.10/20/30. Verified all three boss victories and saved reward state in emblems78.

# Fernvale 0.78

- Elite/Boss guarantee an additional skill-Emblem material box, alongside their existing one random equipment box. Normal monsters do not drop the material box. Stage tier grouping remains 1–3 / 4–6 / 7–9 / 10+.
- Box counts are discrete uniform draws: tier 1 = 0–2, tier 2 = 1–3, tier 3 = 2–4, tier 4 = 2–5. Each material independently chooses one of twelve weapon types uniformly. A zero result still consumes the box and reports zero.
- Materials are stackable `loot.emblemMaterials[weapon]`, separate from freely selectable equipment Emblems and legacy equipment-Emblem boxes. Material boxes use their own `emblemMaterial` box type. Existing equipment, ranks, skill scrolls and old boxes are retained.
- An upgrade uses one matching weapon material. Shared-family support skills accept any weapon material from that family, selected explicitly in the dialog. No currency fee; failure consumes one material and keeps the skill rank.
- Target rank 1–10: 100%; 11–15: 90%; 16–20: 70%; 21–25: 50%; 26–30: 30%. Skill cap remains rank 30. Active, Buff and Passive details all offer upgrading.
- New box opening does not require equipment-bag space. Batches cap at 1,000 boxes; inventory shows counts and stage previews identify Elite-only guaranteed material boxes.
- Validation: emblems78 covers every possible quantity in all four tiers, exact upgrade boundaries/costs/failures, wrong-material/free-Emblem rejection, shared-family choice, max rank, old saves, zero outcomes, full equipment bags, real desktop/mobile controls and persistence. Updated refinements76 plus refinements77/tutorial70/assets checks pass.

## 0.76 armor and stock
Armor: hat, shirt, pants, gloves. No new shoes; legacy shoes remain usable. Shop: HP/MP potions only. Stage cards show normal chances without combining them with Elite odds.

# Loot 0.75

กล่องดรอปใหม่มี **อาวุธ / ชุดสวมใส่ / ประดับ** เท่านั้น เงินและกล่องเข้าตัวทันที ไม่ต้องเดินเก็บ กล่องจากมอน Lv.N เปิดได้อุปกรณ์ Lv.N จริง (ไม่ปัดลงไปที่ 10/30/60/100) อาวุธยังสุ่มเฉพาะสายตัวละคร

| Stage | Lv.ของ | ขั้นอุปกรณ์ | โอกาสกล่องปกติ ต่อชนิด |
| --- | --- | --- | --- |
| 1 | 10 | 1 | 1% |
| 2 | 20 | 1 | 3% |
| 3 | 30 | 1 | 5% |
| 4 | 40 | 2 | 1% |
| 5 | 50 | 2 | 3% |
| 6 | 60 | 2 | 5% |
| 7 | 70 | 3 | 1% |
| 8 | 80 | 3 | 3% |
| 9 | 90 | 3 | 5% |
| 10 | 100 | 4 | 1% |

มอนปกติสุ่มแยกทั้ง 3 ชนิด จึงอาจได้มากกว่า 1 กล่องต่อครั้ง Elite/Boss ได้กล่องแน่นอน 1 ใบ โดยสุ่มชนิดละ 1/3 หน้าด่านแสดงเปอร์เซ็นต์ต่อชนิดพร้อมข้อความรับประกันสุ่ม 1 กล่อง 100% เงินยังเป็น Lv.มอน × 10 ทุกครั้งที่ฆ่า ไม่ดรอปซ้ำจากมอนชีวิตเดิม

Emblem กดจากช่องสวมใส่เพื่อเลือกชนิดฟรีทั้ง 12 แบบ เปลี่ยนชนิดของชิ้นที่สวมโดยไม่ล้างเลเวล ออปชัน หรือค่าบวก หากยังไม่มีจะสร้าง Common Lv.1 สำหรับช่องนี้ กล่องสุ่มสกิล/Emblem เก่าที่อยู่ในเซฟยังเปิดได้ ข้อมูลกองกล่องและของเดิมไม่ถูกลบทิ้ง แต่ไม่มีขายหรือดรอปใหม่

เมื่อตาย หัก 10% ของ EXP ที่ต้องใช้ขึ้นเลเวลปัจจุบัน (ปัดขึ้นเป็นจำนวนเต็ม) หักได้ไม่เกิน EXP ที่มี ไม่ลดเลเวล จากนั้นกลับเมืองและหยุด Auto ทันที การเปิด Status/Skill/Enchant ไม่พักเกม จึงยังได้รับดาเมจและตายขณะเปิดหน้าต่างได้

Capacity limits still apply. An ungrantable capped box is retained for automatic retry rather than requiring a ground pickup. Existing saved box levels are retained exactly; already-owned equipment is preserved.
