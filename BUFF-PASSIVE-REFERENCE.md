# Buff / Passive reference — 0.63

128 canonical skills: 32 shared by stat family, 96 unique to weapons. Each weapon has 2 Buff and 2 Passive choices per tier, across four tiers. Shared names resolve to one canonical ID.

Effects apply to any main weapon when enabled by the main weapon or Emblem. Active skills remain main-weapon-only. Buffs require manual activation (keys 1–8), consume tier × (rank + 5) MP, and have individual cooldowns. Passive effects require selection. Only direct manually cast Active damage triggers special on-hit effects; generated damage cannot trigger more effects.

The following values are the implemented draft endpoints; rank 2–29 interpolates between them. Count/Hit values round to integers. Buff timers/counters clear on save reload, skill ranks and selections persist.

## พลังนักรบ I · warrior · Tier 1 · buff

ID: `warrior_1_buff_0`

- Lv.1: STR +5; I/II/III ใช้ค่าที่สูงที่สุด
- Lv.30: STR +20; I/II/III ใช้ค่าที่สูงที่สุด
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## ร่างกายแข็งแกร่ง · warrior · Tier 1 · passive

ID: `warrior_1_passive_0`

- Lv.1: HP สูงสุด +5%
- Lv.30: HP สูงสุด +20%

## พลังนักรบ II · warrior · Tier 2 · buff

ID: `warrior_2_buff_0`

- Lv.1: STR +10; I/II/III ใช้ค่าที่สูงที่สุด
- Lv.30: STR +40; I/II/III ใช้ค่าที่สูงที่สุด
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## เกราะนักรบ · warrior · Tier 2 · passive

ID: `warrior_2_passive_0`

- Lv.1: DEF +5
- Lv.30: DEF +30

## พลังนักรบ III · warrior · Tier 3 · buff

ID: `warrior_3_buff_0`

- Lv.1: STR +15; I/II/III ใช้ค่าที่สูงที่สุด
- Lv.30: STR +60; I/II/III ใช้ค่าที่สูงที่สุด
- Duration: 100 → 100 s; CD: 10 s; MP: 18 → 105

## ยืนหยัด · warrior · Tier 3 · passive

ID: `warrior_3_passive_0`

- Lv.1: ต้านกระเด็น 10%
- Lv.30: ต้านกระเด็น 60%

## ดูดเลือด · warrior · Tier 4 · buff

ID: `warrior_4_buff_0`

- Lv.1: ฟื้น 1% ของดาเมจตรงจาก Active ที่กดเอง; เพดาน 1% ของค่าสูงสุด/วิ
- Lv.30: ฟื้น 5% ของดาเมจตรงจาก Active ที่กดเอง; เพดาน 4% ของค่าสูงสุด/วิ
- Duration: 10 → 10 s; CD: 60 s; MP: 24 → 140

## ใจไม่ยอมแพ้ · warrior · Tier 4 · passive

ID: `warrior_4_passive_0`

- Lv.1: HP ต่ำกว่า 30% ลดดาเมจรับ 5%
- Lv.30: HP ต่ำกว่า 30% ลดดาเมจรับ 20%

## ความแม่นยำ I · shooter · Tier 1 · buff

ID: `shooter_1_buff_0`

- Lv.1: DEX +5; I/II/III ใช้ค่าที่สูงที่สุด
- Lv.30: DEX +20; I/II/III ใช้ค่าที่สูงที่สุด
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## สายตาเฉียบคม · shooter · Tier 1 · passive

ID: `shooter_1_passive_0`

- Lv.1: ACC +5
- Lv.30: ACC +30

## ความแม่นยำ II · shooter · Tier 2 · buff

ID: `shooter_2_buff_0`

- Lv.1: DEX +10; I/II/III ใช้ค่าที่สูงที่สุด
- Lv.30: DEX +40; I/II/III ใช้ค่าที่สูงที่สุด
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## ก้าวนักล่า · shooter · Tier 2 · passive

ID: `shooter_2_passive_0`

- Lv.1: SPD +3
- Lv.30: SPD +15

## ความแม่นยำ III · shooter · Tier 3 · buff

ID: `shooter_3_buff_0`

- Lv.1: DEX +15; I/II/III ใช้ค่าที่สูงที่สุด
- Lv.30: DEX +60; I/II/III ใช้ค่าที่สูงที่สุด
- Duration: 100 → 100 s; CD: 10 s; MP: 18 → 105

## จุดตาย · shooter · Tier 3 · passive

ID: `shooter_3_passive_0`

- Lv.1: CRI.DAMAGE +5 จุดเปอร์เซ็นต์
- Lv.30: CRI.DAMAGE +30 จุดเปอร์เซ็นต์

## สมาธินักล่า · shooter · Tier 4 · buff

ID: `shooter_4_buff_0`

- Lv.1: CRI +5 จุดเปอร์เซ็นต์
- Lv.30: CRI +25 จุดเปอร์เซ็นต์
- Duration: 100 → 100 s; CD: 10 s; MP: 24 → 140

## เจาะจุดอ่อน · shooter · Tier 4 · passive

ID: `shooter_4_passive_0`

- Lv.1: คริติคอลเจาะ DEF เพิ่ม 5 จุด
- Lv.30: คริติคอลเจาะ DEF เพิ่ม 25 จุด

## พลังปัญญา I · mage · Tier 1 · buff

ID: `mage_1_buff_0`

- Lv.1: INT +5; I/II/III ใช้ค่าที่สูงที่สุด
- Lv.30: INT +20; I/II/III ใช้ค่าที่สูงที่สุด
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## ขุมพลังเวท · mage · Tier 1 · passive

ID: `mage_1_passive_0`

- Lv.1: MP สูงสุด +5%
- Lv.30: MP สูงสุด +20%

## พลังปัญญา II · mage · Tier 2 · buff

ID: `mage_2_buff_0`

- Lv.1: INT +10; I/II/III ใช้ค่าที่สูงที่สุด
- Lv.30: INT +40; I/II/III ใช้ค่าที่สูงที่สุด
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## มานาฟื้นคืน · mage · Tier 2 · passive

ID: `mage_2_passive_0`

- Lv.1: ฟื้น MP เพิ่ม 0.2% Max MP/วิ
- Lv.30: ฟื้น MP เพิ่ม 1% Max MP/วิ

## พลังปัญญา III · mage · Tier 3 · buff

ID: `mage_3_buff_0`

- Lv.1: INT +15; I/II/III ใช้ค่าที่สูงที่สุด
- Lv.30: INT +60; I/II/III ใช้ค่าที่สูงที่สุด
- Duration: 100 → 100 s; CD: 10 s; MP: 18 → 105

## ร่ายอย่างประหยัด · mage · Tier 3 · passive

ID: `mage_3_passive_0`

- Lv.1: MP ร่าย Active ลด 3%
- Lv.30: MP ร่าย Active ลด 15%

## ดูดมานา · mage · Tier 4 · buff

ID: `mage_4_buff_0`

- Lv.1: ฟื้น 1% ของดาเมจตรงจาก Active ที่กดเอง; เพดาน 1% ของค่าสูงสุด/วิ
- Lv.30: ฟื้น 5% ของดาเมจตรงจาก Active ที่กดเอง; เพดาน 4% ของค่าสูงสุด/วิ
- Duration: 10 → 10 s; CD: 60 s; MP: 24 → 140

## มานาคุ้มครอง · mage · Tier 4 · passive

ID: `mage_4_passive_0`

- Lv.1: ใช้ MP รับดาเมจแทน HP 10%; 1 MP ต่อ 1 ดาเมจ
- Lv.30: ใช้ MP รับดาเมจแทน HP 30%; 1 MP ต่อ 1 ดาเมจ

## โชคชะตา I · rogue · Tier 1 · buff

ID: `rogue_1_buff_0`

- Lv.1: LUK +5; I/II/III ใช้ค่าที่สูงที่สุด
- Lv.30: LUK +20; I/II/III ใช้ค่าที่สูงที่สุด
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## เท้าเบา · rogue · Tier 1 · passive

ID: `rogue_1_passive_0`

- Lv.1: SPD +3
- Lv.30: SPD +15

## โชคชะตา II · rogue · Tier 2 · buff

ID: `rogue_2_buff_0`

- Lv.1: LUK +10; I/II/III ใช้ค่าที่สูงที่สุด
- Lv.30: LUK +40; I/II/III ใช้ค่าที่สูงที่สุด
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## สัญชาตญาณไว · rogue · Tier 2 · passive

ID: `rogue_2_passive_0`

- Lv.1: AVOID +2 จุด
- Lv.30: AVOID +10 จุด

## โชคชะตา III · rogue · Tier 3 · buff

ID: `rogue_3_buff_0`

- Lv.1: LUK +15; I/II/III ใช้ค่าที่สูงที่สุด
- Lv.30: LUK +60; I/II/III ใช้ค่าที่สูงที่สุด
- Duration: 100 → 100 s; CD: 10 s; MP: 18 → 105

## ฉวยจังหวะ · rogue · Tier 3 · passive

ID: `rogue_3_passive_0`

- Lv.1: หลบแล้วชุดถัดไป DAMAGE +10%; เก็บ 5 วิ
- Lv.30: หลบแล้วชุดถัดไป DAMAGE +40%; เก็บ 5 วิ

## เงาหลบหลีก · rogue · Tier 4 · buff

ID: `rogue_4_buff_0`

- Lv.1: AVOID +5 จุดเปอร์เซ็นต์
- Lv.30: AVOID +25 จุดเปอร์เซ็นต์
- Duration: 100 → 100 s; CD: 10 s; MP: 24 → 140

## หลุดจากอันตราย · rogue · Tier 4 · passive

ID: `rogue_4_passive_0`

- Lv.1: หลบลด CD Active 0.1 วิ; พักผล 1 วิ
- Lv.30: หลบลด CD Active 0.5 วิ; พักผล 1 วิ

## คมดาบพร้อมรบ · sword · Tier 1 · buff

ID: `sword_1_buff_1`

- Lv.1: ATK +5
- Lv.30: ATK +30
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## ฟันต่อเนื่อง · sword · Tier 1 · passive

ID: `sword_1_passive_1`

- Lv.1: เป้าเดิมดาเมจ +1%/Hit สูงสุด 5 Stack; ขาด 5 วิ/เปลี่ยนเป้าล้าง
- Lv.30: เป้าเดิมดาเมจ +3%/Hit สูงสุด 5 Stack; ขาด 5 วิ/เปลี่ยนเป้าล้าง

## ลูกบอลเร่งจังหวะ · sword · Tier 2 · buff

ID: `sword_2_buff_1`

- Lv.1: เริ่ม 0 ลูก; ทุก 15 วิได้ลูกละ +10 ATKSPD; สูงสุด 1 ลูก
- Lv.30: เริ่ม 0 ลูก; ทุก 15 วิได้ลูกละ +10 ATKSPD; สูงสุด 5 ลูก
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## จังหวะเปิด · sword · Tier 2 · passive

ID: `sword_2_passive_1`

- Lv.1: Hit แรกของชุดแรงขึ้น 5%
- Lv.30: Hit แรกของชุดแรงขึ้น 25%

## Berserk · sword · Tier 3 · buff

ID: `sword_3_buff_1`

- Lv.1: ทำดาเมจตรงเพิ่ม ATK 1%/Hit สูงสุด 6 Stack; ไม่ทำดาเมจครบ 5 วิล้าง
- Lv.30: ทำดาเมจตรงเพิ่ม ATK 5%/Hit สูงสุด 6 Stack; ไม่ทำดาเมจครบ 5 วิล้าง
- Duration: 100 → 100 s; CD: 10 s; MP: 18 → 105

## ต่อท่าคล่อง · sword · Tier 3 · passive

ID: `sword_3_passive_1`

- Lv.1: พักท่า Active ลด 3% ไม่ลด CD
- Lv.30: พักท่า Active ลด 15% ไม่ลด CD

## คลื่นดาบร่วมรบ · sword · Tier 4 · buff

ID: `sword_4_buff_1`

- Lv.1: โอกาส 5% คลื่น 40% ATK; ระยะ 600/8 Mob; พักผล 1 วิ
- Lv.30: โอกาส 20% คลื่น 120% ATK; ระยะ 600/8 Mob; พักผล 1 วิ
- Duration: 10 → 10 s; CD: 60 s; MP: 24 → 140

## คอมโบสมบูรณ์ · sword · Tier 4 · passive

ID: `sword_4_passive_1`

- Lv.1: ชุดตั้งแต่ 2 Hit ที่โดนครบ เสริม 10% ของดาเมจจริงชุดนั้น
- Lv.30: ชุดตั้งแต่ 2 Hit ที่โดนครบ เสริม 30% ของดาเมจจริงชุดนั้น

## แนวรบมั่นคง · spear · Tier 1 · buff

ID: `spear_1_buff_1`

- Lv.1: HP สูงสุด +5%; DEF +5
- Lv.30: HP สูงสุด +20%; DEF +25
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## ระยะได้เปรียบ · spear · Tier 1 · passive

ID: `spear_1_passive_1`

- Lv.1: เป้าห่างอย่างน้อย 200 ดาเมจ +5%
- Lv.30: เป้าห่างอย่างน้อย 200 ดาเมจ +20%

## จังหวะปิดท้าย · spear · Tier 2 · buff

ID: `spear_2_buff_1`

- Lv.1: Hit สุดท้ายของชุด/รอบแรงขึ้น 10%
- Lv.30: Hit สุดท้ายของชุด/รอบแรงขึ้น 40%
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## คมหอกยาว · spear · Tier 2 · passive

ID: `spear_2_passive_1`

- Lv.1: ระยะด้านหน้า/กระสุน +5%; ไม่เพิ่มระยะเคลื่อนที่
- Lv.30: ระยะด้านหน้า/กระสุน +25%; ไม่เพิ่มระยะเคลื่อนที่

## เสี่ยงพลัง · spear · Tier 3 · buff

ID: `spear_3_buff_1`

- Lv.1: สุ่ม 50/50: ATK +10 หรือ DAMAGE +5%; กดใหม่แทนผลเดิม
- Lv.30: สุ่ม 50/50: ATK +50 หรือ DAMAGE +25%; กดใหม่แทนผลเดิม
- Duration: 100 → 100 s; CD: 10 s; MP: 18 → 105

## ทะลวงแนว · spear · Tier 3 · passive

ID: `spear_3_passive_1`

- Lv.1: เป้าถัดไปดาเมจ +2%/ลำดับ สูงสุด 5 ระดับ
- Lv.30: เป้าถัดไปดาเมจ +5%/ลำดับ สูงสุด 5 ระดับ

## ผู้ล่าบอส · spear · Tier 4 · buff

ID: `spear_4_buff_1`

- Lv.1: BOSS.DAMAGE +10%
- Lv.30: BOSS.DAMAGE +40%
- Duration: 100 → 100 s; CD: 10 s; MP: 24 → 140

## แทงเจาะเกราะ · spear · Tier 4 · passive

ID: `spear_4_passive_1`

- Lv.1: Hit สุดท้ายเจาะ DEF เพิ่ม 5 จุด
- Lv.30: Hit สุดท้ายเจาะ DEF เพิ่ม 30 จุด

## พลังกระแทก · hammer · Tier 1 · buff

ID: `hammer_1_buff_1`

- Lv.1: DAMAGE +5%
- Lv.30: DAMAGE +25%
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## รับศึก · hammer · Tier 1 · passive

ID: `hammer_1_passive_1`

- Lv.1: DEF +1/ศัตรูรัศมี 300; สูงสุด 5 ตัว
- Lv.30: DEF +5/ศัตรูรัศมี 300; สูงสุด 5 ตัว

## เกราะสะท้อน · hammer · Tier 2 · buff

ID: `hammer_2_buff_1`

- Lv.1: สะท้อน 20% ของดาเมจหลัง DEF ก่อนโล่; โล่กันได้ยังสะท้อน
- Lv.30: สะท้อน 80% ของดาเมจหลัง DEF ก่อนโล่; โล่กันได้ยังสะท้อน
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## ซ้ำแรงกระแทก · hammer · Tier 2 · passive

ID: `hammer_2_passive_1`

- Lv.1: เป้าติดควบคุมดาเมจ +5%; บอสได้ครึ่งหนึ่ง
- Lv.30: เป้าติดควบคุมดาเมจ +25%; บอสได้ครึ่งหนึ่ง

## บอลแสงพิทักษ์ · hammer · Tier 3 · buff

ID: `hammer_3_buff_1`

- Lv.1: กัน 3 ครั้ง; กันสำเร็จยังสะท้อน/สะสมแรงตอบโต้; กดใหม่ไม่บวกทบ
- Lv.30: กัน 15 ครั้ง; กันสำเร็จยังสะท้อน/สะสมแรงตอบโต้; กดใหม่ไม่บวกทบ
- Duration: 100 → 100 s; CD: 10 s; MP: 18 → 105

## กระแทกเป็นวง · hammer · Tier 3 · passive

ID: `hammer_3_passive_1`

- Lv.1: Hit สุดท้ายระเบิด 30% ATK รัศมี 100/5 Mob; พักผล 2 วิ
- Lv.30: Hit สุดท้ายระเบิด 100% ATK รัศมี 180/5 Mob; พักผล 2 วิ

## ร่างไร้พ่าย · hammer · Tier 4 · buff

ID: `hammer_4_buff_1`

- Lv.1: อมตะ 10 วิ; ไม่ใช้โล่ ไม่สะท้อนระหว่างอมตะ
- Lv.30: อมตะ 10 วิ; ไม่ใช้โล่ ไม่สะท้อนระหว่างอมตะ
- Duration: 10 → 10 s; CD: 60 s; MP: 24 → 140

## เก็บแรงตอบโต้ · hammer · Tier 4 · passive

ID: `hammer_4_passive_1`

- Lv.1: รับ/กันสะสม DAMAGE +2% สูงสุด 5 Stack; เก็บ 8 วิ ใช้กับชุดถัดไป
- Lv.30: รับ/กันสะสม DAMAGE +6% สูงสุด 5 Stack; เก็บ 8 วิ ใช้กับชุดถัดไป

## ศรคม · bow · Tier 1 · buff

ID: `bow_1_buff_1`

- Lv.1: ACC และ CRI.DAMAGE +5
- Lv.30: ACC และ CRI.DAMAGE +25
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## ยิงเปิดทาง · bow · Tier 1 · passive

ID: `bow_1_passive_1`

- Lv.1: ชุดแรกต่อเป้า HP เต็มแรงขึ้น 10%
- Lv.30: ชุดแรกต่อเป้า HP เต็มแรงขึ้น 35%

## ศรซ้อน · bow · Tier 2 · buff

ID: `bow_2_buff_1`

- Lv.1: เพิ่ม 1 Hit ต่อชุด/รอบ แรง 20% ของ Hit เดิม; ไม่เพิ่มพิษ/ผลเสริม
- Lv.30: เพิ่ม 1 Hit ต่อชุด/รอบ แรง 100% ของ Hit เดิม; ไม่เพิ่มพิษ/ผลเสริม
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## มองไกล · bow · Tier 2 · passive

ID: `bow_2_passive_1`

- Lv.1: ระยะโจมตี/ค้นหาเป้า +5%; ไม่เพิ่มรัศมีหรือระยะพุ่ง
- Lv.30: ระยะโจมตี/ค้นหาเป้า +20%; ไม่เพิ่มรัศมีหรือระยะพุ่ง

## ภูติร่วมโจมตี · bow · Tier 3 · buff

ID: `bow_3_buff_1`

- Lv.1: ภูติยิง 30% ATK ทุก 2 วิ; ค้นหา 600
- Lv.30: ภูติยิง 80% ATK ทุก 1 วิ; ค้นหา 600
- Duration: 100 → 100 s; CD: 10 s; MP: 18 → 105

## ประสานเป้า · bow · Tier 3 · passive

ID: `bow_3_passive_1`

- Lv.1: เป้าที่ตัวช่วยเพิ่งยิงใน 3 วิ รับดาเมจผู้เล่นเพิ่ม 5%
- Lv.30: เป้าที่ตัวช่วยเพิ่งยิงใน 3 วิ รับดาเมจผู้เล่นเพิ่ม 20%

## ฝนศรสนับสนุน · bow · Tier 4 · buff

ID: `bow_4_buff_1`

- Lv.1: ทุก 20 Hit ฝนศร 3 Hit รวม 100% ATK; รัศมี 250/10 Mob; พักผล 3 วิ
- Lv.30: ทุก 10 Hit ฝนศร 3 Hit รวม 250% ATK; รัศมี 250/10 Mob; พักผล 3 วิ
- Duration: 100 → 100 s; CD: 10 s; MP: 24 → 140

## ผู้บัญชาการตัวช่วย · bow · Tier 4 · passive

ID: `bow_4_passive_1`

- Lv.1: ตัวช่วยดาเมจ +5%; อายุ +5%
- Lv.30: ตัวช่วยดาเมจ +25%; อายุ +30%

## ลูกดอกเจาะ · crossbow · Tier 1 · buff

ID: `crossbow_1_buff_1`

- Lv.1: IGNORE.DEF +5 จุด
- Lv.30: IGNORE.DEF +25 จุด
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## เปิดฉากพิฆาต · crossbow · Tier 1 · passive

ID: `crossbow_1_passive_1`

- Lv.1: เป้า HP >70% ดาเมจ +5%
- Lv.30: เป้า HP >70% ดาเมจ +25%

## ตีแผลเดิม · crossbow · Tier 2 · buff

ID: `crossbow_2_buff_1`

- Lv.1: เป้าเดิมรับดาเมจเพิ่ม 1%/Stack สูงสุด 5; เปลี่ยนเป้า/ขาด 5 วิล้าง
- Lv.30: เป้าเดิมรับดาเมจเพิ่ม 4%/Stack สูงสุด 5; เปลี่ยนเป้า/ขาด 5 วิล้าง
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## เล็งนิ่ง · crossbow · Tier 2 · passive

ID: `crossbow_2_passive_1`

- Lv.1: ไม่ทำดาเมจ 2 วิ ชุดถัดไปแรงขึ้น 10%
- Lv.30: ไม่ทำดาเมจ 2 วิ ชุดถัดไปแรงขึ้น 35%

## แนวกระสุนทะลวง · crossbow · Tier 3 · buff

ID: `crossbow_3_buff_1`

- Lv.1: Mob สูงสุด +1; ไม่เพิ่มรัศมีและไม่เปลี่ยนกระสุนหยุดเป้าแรก
- Lv.30: Mob สูงสุด +5; ไม่เพิ่มรัศมีและไม่เปลี่ยนกระสุนหยุดเป้าแรก
- Duration: 100 → 100 s; CD: 10 s; MP: 18 → 105

## เจาะลึก · crossbow · Tier 3 · passive

ID: `crossbow_3_passive_1`

- Lv.1: เป้าเดิมเจาะ DEF เพิ่ม 1 จุด/Hit สูงสุด 5 Stack; ขาด 5 วิล้าง
- Lv.30: เป้าเดิมเจาะ DEF เพิ่ม 5 จุด/Hit สูงสุด 5 Stack; ขาด 5 วิล้าง

## เชื่อมจุดตาย · crossbow · Tier 4 · buff

ID: `crossbow_4_buff_1`

- Lv.1: โจมตีติดลิงก์ 5 วิ สูงสุด 3 ตัว; ส่งดาเมจ 10%; ไม่ส่งต่อซ้ำ
- Lv.30: โจมตีติดลิงก์ 5 วิ สูงสุด 8 ตัว; ส่งดาเมจ 30%; ไม่ส่งต่อซ้ำ
- Duration: 100 → 100 s; CD: 10 s; MP: 24 → 140

## แผลประหาร · crossbow · Tier 4 · passive

ID: `crossbow_4_passive_1`

- Lv.1: Hit สุดท้ายต่อเป้า HP <30% แรงขึ้น 10%
- Lv.30: Hit สุดท้ายต่อเป้า HP <30% แรงขึ้น 40%

## บรรจุเร็ว · gun · Tier 1 · buff

ID: `gun_1_buff_1`

- Lv.1: ATKSPD +5
- Lv.30: ATKSPD +25
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## ยิงประชิด · gun · Tier 1 · passive

ID: `gun_1_passive_1`

- Lv.1: เป้าในระยะ 150 ดาเมจ +5%
- Lv.30: เป้าในระยะ 150 ดาเมจ +25%

## ยิงขณะเคลื่อน · gun · Tier 2 · buff

ID: `gun_2_buff_1`

- Lv.1: เดินระหว่างท่าโจมตีได้ 50% ความเร็วปกติ; ไม่ปลดล็อกชาร์จ
- Lv.30: เดินระหว่างท่าโจมตีได้ 100% ความเร็วปกติ; ไม่ปลดล็อกชาร์จ
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## กระสุนเสริม · gun · Tier 2 · passive

ID: `gun_2_passive_1`

- Lv.1: ทุก 15 Hit ยิงเสริม 40% ATK; เก็บจำนวน 5 วิ
- Lv.30: ทุก 5 Hit ยิงเสริม 100% ATK; เก็บจำนวน 5 วิ

## กระสุนระเบิด · gun · Tier 3 · buff

ID: `gun_3_buff_1`

- Lv.1: โอกาส 5% ระเบิด 40% ATK รัศมี 100/5 Mob; พักผล 1 วิ
- Lv.30: โอกาส 20% ระเบิด 120% ATK รัศมี 180/5 Mob; พักผล 1 วิ
- Duration: 100 → 100 s; CD: 10 s; MP: 18 → 105

## แรงยิงสะสม · gun · Tier 3 · passive

ID: `gun_3_passive_1`

- Lv.1: DAMAGE +0.5%/Hit สูงสุด 10 Stack; ขาด 5 วิล้าง
- Lv.30: DAMAGE +2%/Hit สูงสุด 10 Stack; ขาด 5 วิล้าง

## ระดมพลัง · gun · Tier 4 · buff

ID: `gun_4_buff_1`

- Lv.1: ATKSPD +20; MP ร่ายเพิ่ม 20%
- Lv.30: ATKSPD +50; MP ร่ายเพิ่ม 20%
- Duration: 10 → 20 s; CD: 60 s; MP: 24 → 140

## หลบแล้วยิง · gun · Tier 4 · passive

ID: `gun_4_passive_1`

- Lv.1: หลบแล้วชุดถัดไปยิงเสริม 2 นัด รวม 60% ATK; เก็บ 5 วิ
- Lv.30: หลบแล้วชุดถัดไปยิงเสริม 5 นัด รวม 200% ATK; เก็บ 5 วิ

## รวมพลัง · wand · Tier 1 · buff

ID: `wand_1_buff_1`

- Lv.1: ATK +5
- Lv.30: ATK +30
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## พลังเป้าเดียว · wand · Tier 1 · passive

ID: `wand_1_passive_1`

- Lv.1: ชุดที่โดนเป้าเดียวแรงขึ้น 5%
- Lv.30: ชุดที่โดนเป้าเดียวแรงขึ้น 25%

## ลูกเวทสะท้อน · wand · Tier 2 · buff

ID: `wand_2_buff_1`

- Lv.1: Active ที่โดนเสริมลูกเวท 30% ATK หนึ่งลูก/การใช้; พักผล 1 วิ
- Lv.30: Active ที่โดนเสริมลูกเวท 100% ATK หนึ่งลูก/การใช้; พักผล 1 วิ
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## มานาหมุนเวียน · wand · Tier 2 · passive

ID: `wand_2_passive_1`

- Lv.1: จ่าย MP ร่าย Active ครบ 100 คืน 5 MP
- Lv.30: จ่าย MP ร่าย Active ครบ 100 คืน 20 MP

## เสริมพลังเวท · wand · Tier 3 · buff

ID: `wand_3_buff_1`

- Lv.1: ดาเมจโจมตีเสริม +5%; ไม่เรียกซ้ำหรือสร้างผลพิเศษต่อ
- Lv.30: ดาเมจโจมตีเสริม +25%; ไม่เรียกซ้ำหรือสร้างผลพิเศษต่อ
- Duration: 100 → 100 s; CD: 10 s; MP: 18 → 105

## ร่ายต่อเนื่อง · wand · Tier 3 · passive

ID: `wand_3_passive_1`

- Lv.1: ร่าย Active ต่อกันลด MP 1%/Stack สูงสุด 5; ขาด 5 วิล้าง
- Lv.30: ร่าย Active ต่อกันลด MP 3%/Stack สูงสุด 5; ขาด 5 วิล้าง

## ฝนดาวเวท · wand · Tier 4 · buff

ID: `wand_4_buff_1`

- Lv.1: ทุก 20 Hit ดาวตกเสริม 4 Hit รวม 120% ATK; พักผล 3 วิ
- Lv.30: ทุก 10 Hit ดาวตกเสริม 4 Hit รวม 300% ATK; พักผล 3 วิ
- Duration: 100 → 100 s; CD: 10 s; MP: 24 → 140

## วงจรเวท · wand · Tier 4 · passive

ID: `wand_4_passive_1`

- Lv.1: จ่าย MP ร่าย Active ครบ 100 ลด CD Active 0.2 วิ
- Lv.30: จ่าย MP ร่าย Active ครบ 100 ลด CD Active 1 วิ

## พลังเวทเข้มข้น · staff · Tier 1 · buff

ID: `staff_1_buff_1`

- Lv.1: DAMAGE +5%
- Lv.30: DAMAGE +25%
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## เก็บพลัง · staff · Tier 1 · passive

ID: `staff_1_passive_1`

- Lv.1: เว้นใช้ Active 3 วิ ชุดถัดไปแรงขึ้น 10%; ท่าต่อเนื่องได้รอบแรก
- Lv.30: เว้นใช้ Active 3 วิ ชุดถัดไปแรงขึ้น 35%; ท่าต่อเนื่องได้รอบแรก

## เดินร่าย · staff · Tier 2 · buff

ID: `staff_2_buff_1`

- Lv.1: เดินขณะชาร์จได้ 50% ความเร็วปกติ
- Lv.30: เดินขณะชาร์จได้ 100% ความเร็วปกติ
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## แรงระเบิด · staff · Tier 2 · passive

ID: `staff_2_passive_1`

- Lv.1: Hit สุดท้ายของชุด/รอบแรงขึ้น 5%
- Lv.30: Hit สุดท้ายของชุด/รอบแรงขึ้น 25%

## ปลดขีดจำกัด · staff · Tier 3 · buff

ID: `staff_3_buff_1`

- Lv.1: DAMAGE +10%; MP ร่ายเพิ่ม 25%
- Lv.30: DAMAGE +40%; MP ร่ายเพิ่ม 25%
- Duration: 15 → 30 s; CD: 60 s; MP: 18 → 105

## มานาอัดแน่น · staff · Tier 3 · passive

ID: `staff_3_passive_1`

- Lv.1: จ่าย MP ทุก 10 ดาเมจชุดนั้น +1% สูงสุด 5 ระดับ
- Lv.30: จ่าย MP ทุก 10 ดาเมจชุดนั้น +3% สูงสุด 5 ระดับ

## ช่วงระเบิดพลัง · staff · Tier 4 · buff

ID: `staff_4_buff_1`

- Lv.1: ลดเวลาชาร์จ 40% เช่น 3 วิ เหลือ 1.8 วิ
- Lv.30: ลดเวลาชาร์จ 40% เช่น 3 วิ เหลือ 1.8 วิ
- Duration: 10 → 20 s; CD: 90 s; MP: 24 → 140

## พลังเต็มขีด · staff · Tier 4 · passive

ID: `staff_4_passive_1`

- Lv.1: MP >=70%: DAMAGE และ IGNORE.DEF +5
- Lv.30: MP >=70%: DAMAGE และ IGNORE.DEF +20

## ขยายอักขระ · tome · Tier 1 · buff

ID: `tome_1_buff_1`

- Lv.1: รัศมีพื้นที่/ความกว้างท่า +5%; ไม่ขยายระยะเคลื่อนที่
- Lv.30: รัศมีพื้นที่/ความกว้างท่า +25%; ไม่ขยายระยะเคลื่อนที่
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## ตราหน่วง · tome · Tier 1 · passive

ID: `tome_1_passive_1`

- Lv.1: มอนช้า 5% นาน 2 วิ; บอสแทนด้วยรับดาเมจเพิ่ม 2%
- Lv.30: มอนช้า 20% นาน 4 วิ; บอสแทนด้วยรับดาเมจเพิ่ม 8%

## ยืดอาณาเขต · tome · Tier 2 · buff

ID: `tome_2_buff_1`

- Lv.1: อายุพื้นที่และวัตถุโจมตี +5%; ไม่ยืด Buff หรืออมตะ
- Lv.30: อายุพื้นที่และวัตถุโจมตี +30%; ไม่ยืด Buff หรืออมตะ
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## ลงทัณฑ์สถานะ · tome · Tier 2 · passive

ID: `tome_2_passive_1`

- Lv.1: เป้าติดสถานะรับดาเมจเพิ่ม 5%
- Lv.30: เป้าติดสถานะรับดาเมจเพิ่ม 20%

## ตราดูดรวม · tome · Tier 3 · buff

ID: `tome_3_buff_1`

- Lv.1: โอกาส 5% วงดึงรัศมี 100 อยู่ 1 วิ/8 Mob; พักผล 3 วิ; บอสไม่ถูกดึง
- Lv.30: โอกาส 20% วงดึงรัศมี 250 อยู่ 1 วิ/8 Mob; พักผล 3 วิ; บอสไม่ถูกดึง
- Duration: 100 → 100 s; CD: 10 s; MP: 18 → 105

## อักขระแตกตัว · tome · Tier 3 · passive

ID: `tome_3_passive_1`

- Lv.1: เป้าติดสถานะตาย ระเบิด 30% ATK รัศมี 100/8 Mob; ไม่ระเบิดต่อ
- Lv.30: เป้าติดสถานะตาย ระเบิด 100% ATK รัศมี 200/8 Mob; ไม่ระเบิดต่อ

## ยืดมนตรา · tome · Tier 4 · buff

ID: `tome_4_buff_1`

- Lv.1: ระยะเวลา Buff +5%; ไม่ยืดตัวเองและอมตะ
- Lv.30: ระยะเวลา Buff +30%; ไม่ยืดตัวเองและอมตะ
- Duration: 100 → 100 s; CD: 10 s; MP: 24 → 140

## อาณาเขตทับซ้อน · tome · Tier 4 · passive

ID: `tome_4_passive_1`

- Lv.1: DAMAGE +1%/สถานะต่างชนิด สูงสุด 5 ชนิด
- Lv.30: DAMAGE +4%/สถานะต่างชนิด สูงสุด 5 ชนิด

## คมลอบสังหาร · dagger · Tier 1 · buff

ID: `dagger_1_buff_1`

- Lv.1: CRI.DAMAGE +5 จุด
- Lv.30: CRI.DAMAGE +30 จุด
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## ลอบโจมตี · dagger · Tier 1 · passive

ID: `dagger_1_passive_1`

- Lv.1: โจมตีด้านหลังดาเมจ +5%
- Lv.30: โจมตีด้านหลังดาเมจ +25%

## หมายหัว · dagger · Tier 2 · buff

ID: `dagger_2_buff_1`

- Lv.1: เป้า HP <30% รับดาเมจเพิ่ม 10%
- Lv.30: เป้า HP <30% รับดาเมจเพิ่ม 35%
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## หลบแล้วสวน · dagger · Tier 2 · passive

ID: `dagger_2_passive_1`

- Lv.1: หลบแล้วชุดถัดไป CRI +10 จุด; เก็บ 5 วิ
- Lv.30: หลบแล้วชุดถัดไป CRI +40 จุด; เก็บ 5 วิ

## ก้าวเงา · dagger · Tier 3 · buff

ID: `dagger_3_buff_1`

- Lv.1: SPD +10; AVOID +5 จุด
- Lv.30: SPD +30; AVOID +20 จุด
- Duration: 10 → 20 s; CD: 45 s; MP: 18 → 105

## ต่อยอดการสังหาร · dagger · Tier 3 · passive

ID: `dagger_3_passive_1`

- Lv.1: กำจัดศัตรูลด CD Active 0.2 วิ; พักผล 1 วิ
- Lv.30: กำจัดศัตรูลด CD Active 1 วิ; พักผล 1 วิ

## สังหารต่อเนื่อง · dagger · Tier 4 · buff

ID: `dagger_4_buff_1`

- Lv.1: ฆ่าต่อเวลา 1 วิ; DAMAGE +1% สูงสุด 5 Stack; เวลารวมไม่เกิน 30 วิ
- Lv.30: ฆ่าต่อเวลา 3 วิ; DAMAGE +4% สูงสุด 5 Stack; เวลารวมไม่เกิน 60 วิ
- Duration: 15 → 30 s; CD: 90 s; MP: 24 → 140

## นักล่าเป้าสำคัญ · dagger · Tier 4 · passive

ID: `dagger_4_passive_1`

- Lv.1: IGNORE.DEF ต่อ Elite/บอส +5 จุด
- Lv.30: IGNORE.DEF ต่อ Elite/บอส +30 จุด

## คมดาว · star · Tier 1 · buff

ID: `star_1_buff_1`

- Lv.1: DAMAGE +5%
- Lv.30: DAMAGE +25%
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## ล่าฝูง · star · Tier 1 · passive

ID: `star_1_passive_1`

- Lv.1: DAMAGE +1%/ศัตรูอื่นรัศมี 250 สูงสุด 5 ตัว
- Lv.30: DAMAGE +4%/ศัตรูอื่นรัศมี 250 สูงสุด 5 ตัว

## ดาวชิ่ง · star · Tier 2 · buff

ID: `star_2_buff_1`

- Lv.1: ส่งดาเมจ 10% ไปเป้าใกล้หนึ่งตัวรัศมี 300; พักผล .5 วิ; ไม่ชิ่งต่อ
- Lv.30: ส่งดาเมจ 30% ไปเป้าใกล้หนึ่งตัวรัศมี 300; พักผล .5 วิ; ไม่ชิ่งต่อ
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## ขยายการกระจาย · star · Tier 2 · passive

ID: `star_2_passive_1`

- Lv.1: ระยะชิ่ง/แพร่/ระเบิดจากฆ่า +5%
- Lv.30: ระยะชิ่ง/แพร่/ระเบิดจากฆ่า +30%

## ดาวติดตาม · star · Tier 3 · buff

ID: `star_3_buff_1`

- Lv.1: Active โดนติดดาวบนเป้า ระเบิดหลัง 2 วิ 40% ATK; ไม่แพร่หรือเรียกผลต่อ
- Lv.30: Active โดนติดดาวบนเป้า ระเบิดหลัง 2 วิ 120% ATK; ไม่แพร่หรือเรียกผลต่อ
- Duration: 100 → 100 s; CD: 10 s; MP: 18 → 105

## เก็บเกี่ยวต่อทอด · star · Tier 3 · passive

ID: `star_3_passive_1`

- Lv.1: ฆ่าภายใน 5 วิ DAMAGE +1%/ตัว สูงสุด 5 Stack
- Lv.30: ฆ่าภายใน 5 วิ DAMAGE +4%/ตัว สูงสุด 5 Stack

## พายุดาวติดตาม · star · Tier 4 · buff

ID: `star_4_buff_1`

- Lv.1: ดาวรอบตัว 2 Hit รวม 60% ATK/รอบ ทุก 1 วิ; รัศมี 200/8 Mob
- Lv.30: ดาวรอบตัว 2 Hit รวม 180% ATK/รอบ ทุก 0.5 วิ; รัศมี 200/8 Mob
- Duration: 10 → 20 s; CD: 60 s; MP: 24 → 140

## กระจายสู่เป้าหลัก · star · Tier 4 · passive

ID: `star_4_passive_1`

- Lv.1: เมื่อไม่มีศัตรูอื่นรัศมี 300 ดาเมจเสริม +10%
- Lv.30: เมื่อไม่มีศัตรูอื่นรัศมี 300 ดาเมจเสริม +40%

## ร่างพร้อมคอมโบ · fist · Tier 1 · buff

ID: `fist_1_buff_1`

- Lv.1: SPD +5; JUMP +2
- Lv.30: SPD +20; JUMP +10
- Duration: 100 → 100 s; CD: 10 s; MP: 6 → 35

## โจมตีกลางอากาศ · fist · Tier 1 · passive

ID: `fist_1_passive_1`

- Lv.1: กลางอากาศ DAMAGE +5%
- Lv.30: กลางอากาศ DAMAGE +25%

## คอมโบไหลลื่น · fist · Tier 2 · buff

ID: `fist_2_buff_1`

- Lv.1: ใช้ Active ต่างขั้นภายใน 5 วิ พักท่าลด 5%
- Lv.30: ใช้ Active ต่างขั้นภายใน 5 วิ พักท่าลด 20%
- Duration: 100 → 100 s; CD: 10 s; MP: 12 → 70

## สลับท่าต่อพลัง · fist · Tier 2 · passive

ID: `fist_2_passive_1`

- Lv.1: ต่างขั้น DAMAGE +1% สูงสุด 3 Stack; ซ้ำขั้น/ขาด 5 วิล้าง
- Lv.30: ต่างขั้น DAMAGE +5% สูงสุด 3 Stack; ซ้ำขั้น/ขาด 5 วิล้าง

## หมัดเปิดช่อง · fist · Tier 3 · buff

ID: `fist_3_buff_1`

- Lv.1: โอกาส 5% ลด DEF 5 จุด นาน 3 วิ; ไม่ซ้อนค่าตัวเอง
- Lv.30: โอกาส 20% ลด DEF 20 จุด นาน 5 วิ; ไม่ซ้อนค่าตัวเอง
- Duration: 100 → 100 s; CD: 10 s; MP: 18 → 105

## ขยับแล้วโจมตี · fist · Tier 3 · passive

ID: `fist_3_passive_1`

- Lv.1: เดิน/พุ่งครบ 300 หน่วย ชุดถัดไปแรงขึ้น 10%; ไม่นับวาร์ป; เก็บ 5 วิ
- Lv.30: เดิน/พุ่งครบ 150 หน่วย ชุดถัดไปแรงขึ้น 30%; ไม่นับวาร์ป; เก็บ 5 วิ

## ระเบิดคอมโบ · fist · Tier 4 · buff

ID: `fist_4_buff_1`

- Lv.1: ใช้ Active ครบ 4 ขั้น ลด CD ขั้น 1–3 ที่เหลือ 50%; ครั้งเดียวต่อ Buff
- Lv.30: ใช้ Active ครบ 4 ขั้น ลด CD ขั้น 1–3 ที่เหลือ 100%; ครั้งเดียวต่อ Buff
- Duration: 10 → 20 s; CD: 90 s; MP: 24 → 140

## จบชุดหนัก · fist · Tier 4 · passive

ID: `fist_4_passive_1`

- Lv.1: ต่างขั้นต่อกันครบ 3 ครั้ง ท่าถัดไปเพิ่ม 1 Hit แรง 30% ของเดิม; รอบแรกเท่านั้น
- Lv.30: ต่างขั้นต่อกันครบ 3 ครั้ง ท่าถัดไปเพิ่ม 1 Hit แรง 100% ของเดิม; รอบแรกเท่านั้น
