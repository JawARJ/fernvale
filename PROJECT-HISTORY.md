# Fernvale — Browser Edition 0.35

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
