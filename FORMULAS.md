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
