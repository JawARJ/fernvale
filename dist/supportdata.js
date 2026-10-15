'use strict';
const SUPPORT_SKILLS={
  "warrior_1_buff_0": {
    "id": "warrior_1_buff_0",
    "owner": "warrior",
    "weapon": null,
    "tier": 1,
    "kind": "buff",
    "index": 0,
    "name": "พลังนักรบ I",
    "effect": "str",
    "values": {
      "amount": [
        5,
        20
      ]
    },
    "detail": "STR +{amount}; I/II/III ใช้ค่าที่สูงที่สุด",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "warrior_1_passive_0": {
    "id": "warrior_1_passive_0",
    "owner": "warrior",
    "weapon": null,
    "tier": 1,
    "kind": "passive",
    "index": 0,
    "name": "ร่างกายแข็งแกร่ง",
    "effect": "hpPct",
    "values": {
      "amount": [
        5,
        20
      ]
    },
    "detail": "HP สูงสุด +{amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "warrior_2_buff_0": {
    "id": "warrior_2_buff_0",
    "owner": "warrior",
    "weapon": null,
    "tier": 2,
    "kind": "buff",
    "index": 0,
    "name": "พลังนักรบ II",
    "effect": "str",
    "values": {
      "amount": [
        10,
        40
      ]
    },
    "detail": "STR +{amount}; I/II/III ใช้ค่าที่สูงที่สุด",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "warrior_2_passive_0": {
    "id": "warrior_2_passive_0",
    "owner": "warrior",
    "weapon": null,
    "tier": 2,
    "kind": "passive",
    "index": 0,
    "name": "เกราะนักรบ",
    "effect": "def",
    "values": {
      "amount": [
        5,
        30
      ]
    },
    "detail": "DEF +{amount}",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "warrior_3_buff_0": {
    "id": "warrior_3_buff_0",
    "owner": "warrior",
    "weapon": null,
    "tier": 3,
    "kind": "buff",
    "index": 0,
    "name": "พลังนักรบ III",
    "effect": "str",
    "values": {
      "amount": [
        15,
        60
      ]
    },
    "detail": "STR +{amount}; I/II/III ใช้ค่าที่สูงที่สุด",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "warrior_3_passive_0": {
    "id": "warrior_3_passive_0",
    "owner": "warrior",
    "weapon": null,
    "tier": 3,
    "kind": "passive",
    "index": 0,
    "name": "ยืนหยัด",
    "effect": "stance",
    "values": {
      "amount": [
        10,
        60
      ]
    },
    "detail": "ต้านกระเด็น {amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "warrior_4_buff_0": {
    "id": "warrior_4_buff_0",
    "owner": "warrior",
    "weapon": null,
    "tier": 4,
    "kind": "buff",
    "index": 0,
    "name": "ดูดเลือด",
    "effect": "lifeSteal",
    "values": {
      "amount": [
        1,
        5
      ],
      "cap": [
        1,
        4
      ]
    },
    "detail": "ฟื้น {amount}% ของดาเมจตรงจาก Active ที่กดเอง; เพดาน {cap}% ของค่าสูงสุด/วิ",
    "duration": [
      10,
      10
    ],
    "cd": 60,
    "designed": true
  },
  "warrior_4_passive_0": {
    "id": "warrior_4_passive_0",
    "owner": "warrior",
    "weapon": null,
    "tier": 4,
    "kind": "passive",
    "index": 0,
    "name": "ใจไม่ยอมแพ้",
    "effect": "lowReduction",
    "values": {
      "amount": [
        5,
        20
      ]
    },
    "detail": "HP ต่ำกว่า 30% ลดดาเมจรับ {amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "shooter_1_buff_0": {
    "id": "shooter_1_buff_0",
    "owner": "shooter",
    "weapon": null,
    "tier": 1,
    "kind": "buff",
    "index": 0,
    "name": "ความแม่นยำ I",
    "effect": "dex",
    "values": {
      "amount": [
        5,
        20
      ]
    },
    "detail": "DEX +{amount}; I/II/III ใช้ค่าที่สูงที่สุด",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "shooter_1_passive_0": {
    "id": "shooter_1_passive_0",
    "owner": "shooter",
    "weapon": null,
    "tier": 1,
    "kind": "passive",
    "index": 0,
    "name": "สายตาเฉียบคม",
    "effect": "acc",
    "values": {
      "amount": [
        5,
        30
      ]
    },
    "detail": "ACC +{amount}",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "shooter_2_buff_0": {
    "id": "shooter_2_buff_0",
    "owner": "shooter",
    "weapon": null,
    "tier": 2,
    "kind": "buff",
    "index": 0,
    "name": "ความแม่นยำ II",
    "effect": "dex",
    "values": {
      "amount": [
        10,
        40
      ]
    },
    "detail": "DEX +{amount}; I/II/III ใช้ค่าที่สูงที่สุด",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "shooter_2_passive_0": {
    "id": "shooter_2_passive_0",
    "owner": "shooter",
    "weapon": null,
    "tier": 2,
    "kind": "passive",
    "index": 0,
    "name": "ก้าวนักล่า",
    "effect": "spd",
    "values": {
      "amount": [
        3,
        15
      ]
    },
    "detail": "SPD +{amount}",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "shooter_3_buff_0": {
    "id": "shooter_3_buff_0",
    "owner": "shooter",
    "weapon": null,
    "tier": 3,
    "kind": "buff",
    "index": 0,
    "name": "ความแม่นยำ III",
    "effect": "dex",
    "values": {
      "amount": [
        15,
        60
      ]
    },
    "detail": "DEX +{amount}; I/II/III ใช้ค่าที่สูงที่สุด",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "shooter_3_passive_0": {
    "id": "shooter_3_passive_0",
    "owner": "shooter",
    "weapon": null,
    "tier": 3,
    "kind": "passive",
    "index": 0,
    "name": "จุดตาย",
    "effect": "criDamage",
    "values": {
      "amount": [
        5,
        30
      ]
    },
    "detail": "CRI.DAMAGE +{amount} จุดเปอร์เซ็นต์",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "shooter_4_buff_0": {
    "id": "shooter_4_buff_0",
    "owner": "shooter",
    "weapon": null,
    "tier": 4,
    "kind": "buff",
    "index": 0,
    "name": "สมาธินักล่า",
    "effect": "cri",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "CRI +{amount} จุดเปอร์เซ็นต์",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "shooter_4_passive_0": {
    "id": "shooter_4_passive_0",
    "owner": "shooter",
    "weapon": null,
    "tier": 4,
    "kind": "passive",
    "index": 0,
    "name": "เจาะจุดอ่อน",
    "effect": "critPierce",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "คริติคอลเจาะ DEF เพิ่ม {amount} จุด",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "mage_1_buff_0": {
    "id": "mage_1_buff_0",
    "owner": "mage",
    "weapon": null,
    "tier": 1,
    "kind": "buff",
    "index": 0,
    "name": "พลังปัญญา I",
    "effect": "int",
    "values": {
      "amount": [
        5,
        20
      ]
    },
    "detail": "INT +{amount}; I/II/III ใช้ค่าที่สูงที่สุด",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "mage_1_passive_0": {
    "id": "mage_1_passive_0",
    "owner": "mage",
    "weapon": null,
    "tier": 1,
    "kind": "passive",
    "index": 0,
    "name": "ขุมพลังเวท",
    "effect": "mpPct",
    "values": {
      "amount": [
        5,
        20
      ]
    },
    "detail": "MP สูงสุด +{amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "mage_2_buff_0": {
    "id": "mage_2_buff_0",
    "owner": "mage",
    "weapon": null,
    "tier": 2,
    "kind": "buff",
    "index": 0,
    "name": "พลังปัญญา II",
    "effect": "int",
    "values": {
      "amount": [
        10,
        40
      ]
    },
    "detail": "INT +{amount}; I/II/III ใช้ค่าที่สูงที่สุด",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "mage_2_passive_0": {
    "id": "mage_2_passive_0",
    "owner": "mage",
    "weapon": null,
    "tier": 2,
    "kind": "passive",
    "index": 0,
    "name": "มานาฟื้นคืน",
    "effect": "regenPct",
    "values": {
      "amount": [
        0.2,
        1
      ]
    },
    "detail": "ฟื้น MP เพิ่ม {amount}% Max MP/วิ",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "mage_3_buff_0": {
    "id": "mage_3_buff_0",
    "owner": "mage",
    "weapon": null,
    "tier": 3,
    "kind": "buff",
    "index": 0,
    "name": "พลังปัญญา III",
    "effect": "int",
    "values": {
      "amount": [
        15,
        60
      ]
    },
    "detail": "INT +{amount}; I/II/III ใช้ค่าที่สูงที่สุด",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "mage_3_passive_0": {
    "id": "mage_3_passive_0",
    "owner": "mage",
    "weapon": null,
    "tier": 3,
    "kind": "passive",
    "index": 0,
    "name": "ร่ายอย่างประหยัด",
    "effect": "discount",
    "values": {
      "amount": [
        3,
        15
      ]
    },
    "detail": "MP ร่าย Active ลด {amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "mage_4_buff_0": {
    "id": "mage_4_buff_0",
    "owner": "mage",
    "weapon": null,
    "tier": 4,
    "kind": "buff",
    "index": 0,
    "name": "ดูดมานา",
    "effect": "manaSteal",
    "values": {
      "amount": [
        1,
        5
      ],
      "cap": [
        1,
        4
      ]
    },
    "detail": "ฟื้น {amount}% ของดาเมจตรงจาก Active ที่กดเอง; เพดาน {cap}% ของค่าสูงสุด/วิ",
    "duration": [
      10,
      10
    ],
    "cd": 60,
    "designed": true
  },
  "mage_4_passive_0": {
    "id": "mage_4_passive_0",
    "owner": "mage",
    "weapon": null,
    "tier": 4,
    "kind": "passive",
    "index": 0,
    "name": "มานาคุ้มครอง",
    "effect": "manaShield",
    "values": {
      "amount": [
        10,
        30
      ]
    },
    "detail": "ใช้ MP รับดาเมจแทน HP {amount}%; 1 MP ต่อ 1 ดาเมจ",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "rogue_1_buff_0": {
    "id": "rogue_1_buff_0",
    "owner": "rogue",
    "weapon": null,
    "tier": 1,
    "kind": "buff",
    "index": 0,
    "name": "โชคชะตา I",
    "effect": "luk",
    "values": {
      "amount": [
        5,
        20
      ]
    },
    "detail": "LUK +{amount}; I/II/III ใช้ค่าที่สูงที่สุด",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "rogue_1_passive_0": {
    "id": "rogue_1_passive_0",
    "owner": "rogue",
    "weapon": null,
    "tier": 1,
    "kind": "passive",
    "index": 0,
    "name": "เท้าเบา",
    "effect": "spd",
    "values": {
      "amount": [
        3,
        15
      ]
    },
    "detail": "SPD +{amount}",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "rogue_2_buff_0": {
    "id": "rogue_2_buff_0",
    "owner": "rogue",
    "weapon": null,
    "tier": 2,
    "kind": "buff",
    "index": 0,
    "name": "โชคชะตา II",
    "effect": "luk",
    "values": {
      "amount": [
        10,
        40
      ]
    },
    "detail": "LUK +{amount}; I/II/III ใช้ค่าที่สูงที่สุด",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "rogue_2_passive_0": {
    "id": "rogue_2_passive_0",
    "owner": "rogue",
    "weapon": null,
    "tier": 2,
    "kind": "passive",
    "index": 0,
    "name": "สัญชาตญาณไว",
    "effect": "avoid",
    "values": {
      "amount": [
        2,
        10
      ]
    },
    "detail": "AVOID +{amount} จุด",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "rogue_3_buff_0": {
    "id": "rogue_3_buff_0",
    "owner": "rogue",
    "weapon": null,
    "tier": 3,
    "kind": "buff",
    "index": 0,
    "name": "โชคชะตา III",
    "effect": "luk",
    "values": {
      "amount": [
        15,
        60
      ]
    },
    "detail": "LUK +{amount}; I/II/III ใช้ค่าที่สูงที่สุด",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "rogue_3_passive_0": {
    "id": "rogue_3_passive_0",
    "owner": "rogue",
    "weapon": null,
    "tier": 3,
    "kind": "passive",
    "index": 0,
    "name": "ฉวยจังหวะ",
    "effect": "dodgeDamage",
    "values": {
      "amount": [
        10,
        40
      ]
    },
    "detail": "หลบแล้วชุดถัดไป DAMAGE +{amount}%; เก็บ 5 วิ",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "rogue_4_buff_0": {
    "id": "rogue_4_buff_0",
    "owner": "rogue",
    "weapon": null,
    "tier": 4,
    "kind": "buff",
    "index": 0,
    "name": "เงาหลบหลีก",
    "effect": "avoid",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "AVOID +{amount} จุดเปอร์เซ็นต์",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "rogue_4_passive_0": {
    "id": "rogue_4_passive_0",
    "owner": "rogue",
    "weapon": null,
    "tier": 4,
    "kind": "passive",
    "index": 0,
    "name": "หลุดจากอันตราย",
    "effect": "dodgeCD",
    "values": {
      "amount": [
        0.1,
        0.5
      ]
    },
    "detail": "หลบลด CD Active {amount} วิ; พักผล 1 วิ",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "sword_1_buff_1": {
    "id": "sword_1_buff_1",
    "owner": "sword",
    "weapon": "sword",
    "tier": 1,
    "kind": "buff",
    "index": 1,
    "name": "คมดาบพร้อมรบ",
    "effect": "atk",
    "values": {
      "amount": [
        5,
        30
      ]
    },
    "detail": "ATK +{amount}",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "sword_1_passive_1": {
    "id": "sword_1_passive_1",
    "owner": "sword",
    "weapon": "sword",
    "tier": 1,
    "kind": "passive",
    "index": 1,
    "name": "ฟันต่อเนื่อง",
    "effect": "sameTarget",
    "values": {
      "amount": [
        1,
        3
      ]
    },
    "detail": "เป้าเดิมดาเมจ +{amount}%/Hit สูงสุด 5 Stack; ขาด 5 วิ/เปลี่ยนเป้าล้าง",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "sword_2_buff_1": {
    "id": "sword_2_buff_1",
    "owner": "sword",
    "weapon": "sword",
    "tier": 2,
    "kind": "buff",
    "index": 1,
    "name": "ลูกบอลเร่งจังหวะ",
    "effect": "orbs",
    "values": {
      "count": [
        1,
        5
      ]
    },
    "detail": "เริ่ม 0 ลูก; ทุก 15 วิได้ลูกละ +10 ATKSPD; สูงสุด {count} ลูก",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "sword_2_passive_1": {
    "id": "sword_2_passive_1",
    "owner": "sword",
    "weapon": "sword",
    "tier": 2,
    "kind": "passive",
    "index": 1,
    "name": "จังหวะเปิด",
    "effect": "firstHit",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "Hit แรกของชุดแรงขึ้น {amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "sword_3_buff_1": {
    "id": "sword_3_buff_1",
    "owner": "sword",
    "weapon": "sword",
    "tier": 3,
    "kind": "buff",
    "index": 1,
    "name": "Berserk",
    "effect": "berserk",
    "values": {
      "amount": [
        1,
        5
      ]
    },
    "detail": "ทำดาเมจตรงเพิ่ม ATK {amount}%/Hit สูงสุด 6 Stack; ไม่ทำดาเมจครบ 5 วิล้าง",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "sword_3_passive_1": {
    "id": "sword_3_passive_1",
    "owner": "sword",
    "weapon": "sword",
    "tier": 3,
    "kind": "passive",
    "index": 1,
    "name": "ต่อท่าคล่อง",
    "effect": "recovery",
    "values": {
      "amount": [
        3,
        15
      ]
    },
    "detail": "พักท่า Active ลด {amount}% ไม่ลด CD",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "sword_4_buff_1": {
    "id": "sword_4_buff_1",
    "owner": "sword",
    "weapon": "sword",
    "tier": 4,
    "kind": "buff",
    "index": 1,
    "name": "คลื่นดาบร่วมรบ",
    "effect": "swordProc",
    "values": {
      "chance": [
        5,
        20
      ],
      "power": [
        40,
        120
      ]
    },
    "detail": "โอกาส {chance}% คลื่น {power}% ATK; ระยะ 600/8 Mob; พักผล 1 วิ",
    "duration": [
      10,
      10
    ],
    "cd": 60,
    "designed": true
  },
  "sword_4_passive_1": {
    "id": "sword_4_passive_1",
    "owner": "sword",
    "weapon": "sword",
    "tier": 4,
    "kind": "passive",
    "index": 1,
    "name": "คอมโบสมบูรณ์",
    "effect": "complete",
    "values": {
      "amount": [
        10,
        30
      ]
    },
    "detail": "ชุดตั้งแต่ 2 Hit ที่โดนครบ เสริม {amount}% ของดาเมจจริงชุดนั้น",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "spear_1_buff_1": {
    "id": "spear_1_buff_1",
    "owner": "spear",
    "weapon": "spear",
    "tier": 1,
    "kind": "buff",
    "index": 1,
    "name": "แนวรบมั่นคง",
    "effect": "hpDef",
    "values": {
      "hp": [
        5,
        20
      ],
      "def": [
        5,
        25
      ]
    },
    "detail": "HP สูงสุด +{hp}%; DEF +{def}",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "spear_1_passive_1": {
    "id": "spear_1_passive_1",
    "owner": "spear",
    "weapon": "spear",
    "tier": 1,
    "kind": "passive",
    "index": 1,
    "name": "ระยะได้เปรียบ",
    "effect": "far",
    "values": {
      "amount": [
        5,
        20
      ]
    },
    "detail": "เป้าห่างอย่างน้อย 200 ดาเมจ +{amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "spear_2_buff_1": {
    "id": "spear_2_buff_1",
    "owner": "spear",
    "weapon": "spear",
    "tier": 2,
    "kind": "buff",
    "index": 1,
    "name": "จังหวะปิดท้าย",
    "effect": "lastHit",
    "values": {
      "amount": [
        10,
        40
      ]
    },
    "detail": "Hit สุดท้ายของชุด/รอบแรงขึ้น {amount}%",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "spear_2_passive_1": {
    "id": "spear_2_passive_1",
    "owner": "spear",
    "weapon": "spear",
    "tier": 2,
    "kind": "passive",
    "index": 1,
    "name": "คมหอกยาว",
    "effect": "reach",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "ระยะด้านหน้า/กระสุน +{amount}%; ไม่เพิ่มระยะเคลื่อนที่",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "spear_3_buff_1": {
    "id": "spear_3_buff_1",
    "owner": "spear",
    "weapon": "spear",
    "tier": 3,
    "kind": "buff",
    "index": 1,
    "name": "เสี่ยงพลัง",
    "effect": "randomPower",
    "values": {
      "atk": [
        10,
        50
      ],
      "damage": [
        5,
        25
      ]
    },
    "detail": "สุ่ม 50/50: ATK +{atk} หรือ DAMAGE +{damage}%; กดใหม่แทนผลเดิม",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "spear_3_passive_1": {
    "id": "spear_3_passive_1",
    "owner": "spear",
    "weapon": "spear",
    "tier": 3,
    "kind": "passive",
    "index": 1,
    "name": "ทะลวงแนว",
    "effect": "targetOrder",
    "values": {
      "amount": [
        2,
        5
      ]
    },
    "detail": "เป้าถัดไปดาเมจ +{amount}%/ลำดับ สูงสุด 5 ระดับ",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "spear_4_buff_1": {
    "id": "spear_4_buff_1",
    "owner": "spear",
    "weapon": "spear",
    "tier": 4,
    "kind": "buff",
    "index": 1,
    "name": "ผู้ล่าบอส",
    "effect": "bossDamage",
    "values": {
      "amount": [
        10,
        40
      ]
    },
    "detail": "BOSS.DAMAGE +{amount}%",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "spear_4_passive_1": {
    "id": "spear_4_passive_1",
    "owner": "spear",
    "weapon": "spear",
    "tier": 4,
    "kind": "passive",
    "index": 1,
    "name": "แทงเจาะเกราะ",
    "effect": "lastPierce",
    "values": {
      "amount": [
        5,
        30
      ]
    },
    "detail": "Hit สุดท้ายเจาะ DEF เพิ่ม {amount} จุด",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "hammer_1_buff_1": {
    "id": "hammer_1_buff_1",
    "owner": "hammer",
    "weapon": "hammer",
    "tier": 1,
    "kind": "buff",
    "index": 1,
    "name": "พลังกระแทก",
    "effect": "damage",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "DAMAGE +{amount}%",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "hammer_1_passive_1": {
    "id": "hammer_1_passive_1",
    "owner": "hammer",
    "weapon": "hammer",
    "tier": 1,
    "kind": "passive",
    "index": 1,
    "name": "รับศึก",
    "effect": "nearDef",
    "values": {
      "amount": [
        1,
        5
      ]
    },
    "detail": "DEF +{amount}/ศัตรูรัศมี 300; สูงสุด 5 ตัว",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "hammer_2_buff_1": {
    "id": "hammer_2_buff_1",
    "owner": "hammer",
    "weapon": "hammer",
    "tier": 2,
    "kind": "buff",
    "index": 1,
    "name": "เกราะสะท้อน",
    "effect": "reflect",
    "values": {
      "amount": [
        20,
        80
      ]
    },
    "detail": "สะท้อน {amount}% ของดาเมจหลัง DEF ก่อนโล่; โล่กันได้ยังสะท้อน",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "hammer_2_passive_1": {
    "id": "hammer_2_passive_1",
    "owner": "hammer",
    "weapon": "hammer",
    "tier": 2,
    "kind": "passive",
    "index": 1,
    "name": "ซ้ำแรงกระแทก",
    "effect": "controlled",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "เป้าติดควบคุมดาเมจ +{amount}%; บอสได้ครึ่งหนึ่ง",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "hammer_3_buff_1": {
    "id": "hammer_3_buff_1",
    "owner": "hammer",
    "weapon": "hammer",
    "tier": 3,
    "kind": "buff",
    "index": 1,
    "name": "บอลแสงพิทักษ์",
    "effect": "shield",
    "values": {
      "count": [
        3,
        15
      ]
    },
    "detail": "กัน {count} ครั้ง; กันสำเร็จยังสะท้อน/สะสมแรงตอบโต้; กดใหม่ไม่บวกทบ",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "hammer_3_passive_1": {
    "id": "hammer_3_passive_1",
    "owner": "hammer",
    "weapon": "hammer",
    "tier": 3,
    "kind": "passive",
    "index": 1,
    "name": "กระแทกเป็นวง",
    "effect": "hammerBurst",
    "values": {
      "power": [
        30,
        100
      ],
      "radius": [
        100,
        180
      ]
    },
    "detail": "Hit สุดท้ายระเบิด {power}% ATK รัศมี {radius}/5 Mob; พักผล 2 วิ",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "hammer_4_buff_1": {
    "id": "hammer_4_buff_1",
    "owner": "hammer",
    "weapon": "hammer",
    "tier": 4,
    "kind": "buff",
    "index": 1,
    "name": "ร่างไร้พ่าย",
    "effect": "invincible",
    "values": {},
    "detail": "อมตะ 10 วิ; ไม่ใช้โล่ ไม่สะท้อนระหว่างอมตะ",
    "duration": [
      10,
      10
    ],
    "cd": 60,
    "designed": true
  },
  "hammer_4_passive_1": {
    "id": "hammer_4_passive_1",
    "owner": "hammer",
    "weapon": "hammer",
    "tier": 4,
    "kind": "passive",
    "index": 1,
    "name": "เก็บแรงตอบโต้",
    "effect": "retaliate",
    "values": {
      "amount": [
        2,
        6
      ]
    },
    "detail": "รับ/กันสะสม DAMAGE +{amount}% สูงสุด 5 Stack; เก็บ 8 วิ ใช้กับชุดถัดไป",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "bow_1_buff_1": {
    "id": "bow_1_buff_1",
    "owner": "bow",
    "weapon": "bow",
    "tier": 1,
    "kind": "buff",
    "index": 1,
    "name": "ศรคม",
    "effect": "aim",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "ACC และ CRI.DAMAGE +{amount}",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "bow_1_passive_1": {
    "id": "bow_1_passive_1",
    "owner": "bow",
    "weapon": "bow",
    "tier": 1,
    "kind": "passive",
    "index": 1,
    "name": "ยิงเปิดทาง",
    "effect": "fullHP",
    "values": {
      "amount": [
        10,
        35
      ]
    },
    "detail": "ชุดแรกต่อเป้า HP เต็มแรงขึ้น {amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "bow_2_buff_1": {
    "id": "bow_2_buff_1",
    "owner": "bow",
    "weapon": "bow",
    "tier": 2,
    "kind": "buff",
    "index": 1,
    "name": "ศรซ้อน",
    "effect": "extraHit",
    "values": {
      "ratio": [
        20,
        100
      ]
    },
    "detail": "เพิ่ม 1 Hit ต่อชุด/รอบ แรง {ratio}% ของ Hit เดิม; ไม่เพิ่มพิษ/ผลเสริม",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "bow_2_passive_1": {
    "id": "bow_2_passive_1",
    "owner": "bow",
    "weapon": "bow",
    "tier": 2,
    "kind": "passive",
    "index": 1,
    "name": "มองไกล",
    "effect": "search",
    "values": {
      "amount": [
        5,
        20
      ]
    },
    "detail": "ระยะโจมตี/ค้นหาเป้า +{amount}%; ไม่เพิ่มรัศมีหรือระยะพุ่ง",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "bow_3_buff_1": {
    "id": "bow_3_buff_1",
    "owner": "bow",
    "weapon": "bow",
    "tier": 3,
    "kind": "buff",
    "index": 1,
    "name": "ภูติร่วมโจมตี",
    "effect": "fairy",
    "values": {
      "power": [
        30,
        80
      ],
      "period": [
        2,
        1
      ]
    },
    "detail": "ภูติยิง {power}% ATK ทุก {period} วิ; ค้นหา 600",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "bow_3_passive_1": {
    "id": "bow_3_passive_1",
    "owner": "bow",
    "weapon": "bow",
    "tier": 3,
    "kind": "passive",
    "index": 1,
    "name": "ประสานเป้า",
    "effect": "assisted",
    "values": {
      "amount": [
        5,
        20
      ]
    },
    "detail": "เป้าที่ตัวช่วยเพิ่งยิงใน 3 วิ รับดาเมจผู้เล่นเพิ่ม {amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "bow_4_buff_1": {
    "id": "bow_4_buff_1",
    "owner": "bow",
    "weapon": "bow",
    "tier": 4,
    "kind": "buff",
    "index": 1,
    "name": "ฝนศรสนับสนุน",
    "effect": "arrowRain",
    "values": {
      "hits": [
        20,
        10
      ],
      "power": [
        100,
        250
      ]
    },
    "detail": "ทุก {hits} Hit ฝนศร 3 Hit รวม {power}% ATK; รัศมี 250/10 Mob; พักผล 3 วิ",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "bow_4_passive_1": {
    "id": "bow_4_passive_1",
    "owner": "bow",
    "weapon": "bow",
    "tier": 4,
    "kind": "passive",
    "index": 1,
    "name": "ผู้บัญชาการตัวช่วย",
    "effect": "summon",
    "values": {
      "amount": [
        5,
        25
      ],
      "duration": [
        5,
        30
      ]
    },
    "detail": "ตัวช่วยดาเมจ +{amount}%; อายุ +{duration}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "crossbow_1_buff_1": {
    "id": "crossbow_1_buff_1",
    "owner": "crossbow",
    "weapon": "crossbow",
    "tier": 1,
    "kind": "buff",
    "index": 1,
    "name": "ลูกดอกเจาะ",
    "effect": "ignoreDef",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "IGNORE.DEF +{amount} จุด",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "crossbow_1_passive_1": {
    "id": "crossbow_1_passive_1",
    "owner": "crossbow",
    "weapon": "crossbow",
    "tier": 1,
    "kind": "passive",
    "index": 1,
    "name": "เปิดฉากพิฆาต",
    "effect": "highHP",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "เป้า HP >70% ดาเมจ +{amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "crossbow_2_buff_1": {
    "id": "crossbow_2_buff_1",
    "owner": "crossbow",
    "weapon": "crossbow",
    "tier": 2,
    "kind": "buff",
    "index": 1,
    "name": "ตีแผลเดิม",
    "effect": "wound",
    "values": {
      "amount": [
        1,
        4
      ]
    },
    "detail": "เป้าเดิมรับดาเมจเพิ่ม {amount}%/Stack สูงสุด 5; เปลี่ยนเป้า/ขาด 5 วิล้าง",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "crossbow_2_passive_1": {
    "id": "crossbow_2_passive_1",
    "owner": "crossbow",
    "weapon": "crossbow",
    "tier": 2,
    "kind": "passive",
    "index": 1,
    "name": "เล็งนิ่ง",
    "effect": "restHit",
    "values": {
      "amount": [
        10,
        35
      ]
    },
    "detail": "ไม่ทำดาเมจ 2 วิ ชุดถัดไปแรงขึ้น {amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "crossbow_3_buff_1": {
    "id": "crossbow_3_buff_1",
    "owner": "crossbow",
    "weapon": "crossbow",
    "tier": 3,
    "kind": "buff",
    "index": 1,
    "name": "แนวกระสุนทะลวง",
    "effect": "mobCap",
    "values": {
      "count": [
        1,
        5
      ]
    },
    "detail": "Mob สูงสุด +{count}; ไม่เพิ่มรัศมีและไม่เปลี่ยนกระสุนหยุดเป้าแรก",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "crossbow_3_passive_1": {
    "id": "crossbow_3_passive_1",
    "owner": "crossbow",
    "weapon": "crossbow",
    "tier": 3,
    "kind": "passive",
    "index": 1,
    "name": "เจาะลึก",
    "effect": "samePierce",
    "values": {
      "amount": [
        1,
        5
      ]
    },
    "detail": "เป้าเดิมเจาะ DEF เพิ่ม {amount} จุด/Hit สูงสุด 5 Stack; ขาด 5 วิล้าง",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "crossbow_4_buff_1": {
    "id": "crossbow_4_buff_1",
    "owner": "crossbow",
    "weapon": "crossbow",
    "tier": 4,
    "kind": "buff",
    "index": 1,
    "name": "เชื่อมจุดตาย",
    "effect": "link",
    "values": {
      "count": [
        3,
        8
      ],
      "amount": [
        10,
        30
      ]
    },
    "detail": "โจมตีติดลิงก์ 5 วิ สูงสุด {count} ตัว; ส่งดาเมจ {amount}%; ไม่ส่งต่อซ้ำ",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "crossbow_4_passive_1": {
    "id": "crossbow_4_passive_1",
    "owner": "crossbow",
    "weapon": "crossbow",
    "tier": 4,
    "kind": "passive",
    "index": 1,
    "name": "แผลประหาร",
    "effect": "executeLast",
    "values": {
      "amount": [
        10,
        40
      ]
    },
    "detail": "Hit สุดท้ายต่อเป้า HP <30% แรงขึ้น {amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "gun_1_buff_1": {
    "id": "gun_1_buff_1",
    "owner": "gun",
    "weapon": "gun",
    "tier": 1,
    "kind": "buff",
    "index": 1,
    "name": "บรรจุเร็ว",
    "effect": "atkspd",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "ATKSPD +{amount}",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "gun_1_passive_1": {
    "id": "gun_1_passive_1",
    "owner": "gun",
    "weapon": "gun",
    "tier": 1,
    "kind": "passive",
    "index": 1,
    "name": "ยิงประชิด",
    "effect": "close",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "เป้าในระยะ 150 ดาเมจ +{amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "gun_2_buff_1": {
    "id": "gun_2_buff_1",
    "owner": "gun",
    "weapon": "gun",
    "tier": 2,
    "kind": "buff",
    "index": 1,
    "name": "ยิงขณะเคลื่อน",
    "effect": "walkAttack",
    "values": {
      "amount": [
        50,
        100
      ]
    },
    "detail": "เดินระหว่างท่าโจมตีได้ {amount}% ความเร็วปกติ; ไม่ปลดล็อกชาร์จ",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "gun_2_passive_1": {
    "id": "gun_2_passive_1",
    "owner": "gun",
    "weapon": "gun",
    "tier": 2,
    "kind": "passive",
    "index": 1,
    "name": "กระสุนเสริม",
    "effect": "bullet",
    "values": {
      "hits": [
        15,
        5
      ],
      "power": [
        40,
        100
      ]
    },
    "detail": "ทุก {hits} Hit ยิงเสริม {power}% ATK; เก็บจำนวน 5 วิ",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "gun_3_buff_1": {
    "id": "gun_3_buff_1",
    "owner": "gun",
    "weapon": "gun",
    "tier": 3,
    "kind": "buff",
    "index": 1,
    "name": "กระสุนระเบิด",
    "effect": "gunBurst",
    "values": {
      "chance": [
        5,
        20
      ],
      "power": [
        40,
        120
      ],
      "radius": [
        100,
        180
      ]
    },
    "detail": "โอกาส {chance}% ระเบิด {power}% ATK รัศมี {radius}/5 Mob; พักผล 1 วิ",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "gun_3_passive_1": {
    "id": "gun_3_passive_1",
    "owner": "gun",
    "weapon": "gun",
    "tier": 3,
    "kind": "passive",
    "index": 1,
    "name": "แรงยิงสะสม",
    "effect": "rapid",
    "values": {
      "amount": [
        0.5,
        2
      ]
    },
    "detail": "DAMAGE +{amount}%/Hit สูงสุด 10 Stack; ขาด 5 วิล้าง",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "gun_4_buff_1": {
    "id": "gun_4_buff_1",
    "owner": "gun",
    "weapon": "gun",
    "tier": 4,
    "kind": "buff",
    "index": 1,
    "name": "ระดมพลัง",
    "effect": "overdrive",
    "values": {
      "amount": [
        20,
        50
      ]
    },
    "detail": "ATKSPD +{amount}; MP ร่ายเพิ่ม 20%",
    "duration": [
      10,
      20
    ],
    "cd": 60,
    "designed": true
  },
  "gun_4_passive_1": {
    "id": "gun_4_passive_1",
    "owner": "gun",
    "weapon": "gun",
    "tier": 4,
    "kind": "passive",
    "index": 1,
    "name": "หลบแล้วยิง",
    "effect": "dodgeBullet",
    "values": {
      "count": [
        2,
        5
      ],
      "power": [
        60,
        200
      ]
    },
    "detail": "หลบแล้วชุดถัดไปยิงเสริม {count} นัด รวม {power}% ATK; เก็บ 5 วิ",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "wand_1_buff_1": {
    "id": "wand_1_buff_1",
    "owner": "wand",
    "weapon": "wand",
    "tier": 1,
    "kind": "buff",
    "index": 1,
    "name": "รวมพลัง",
    "effect": "atk",
    "values": {
      "amount": [
        5,
        30
      ]
    },
    "detail": "ATK +{amount}",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "wand_1_passive_1": {
    "id": "wand_1_passive_1",
    "owner": "wand",
    "weapon": "wand",
    "tier": 1,
    "kind": "passive",
    "index": 1,
    "name": "พลังเป้าเดียว",
    "effect": "single",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "ชุดที่โดนเป้าเดียวแรงขึ้น {amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "wand_2_buff_1": {
    "id": "wand_2_buff_1",
    "owner": "wand",
    "weapon": "wand",
    "tier": 2,
    "kind": "buff",
    "index": 1,
    "name": "ลูกเวทสะท้อน",
    "effect": "magicOrb",
    "values": {
      "power": [
        30,
        100
      ]
    },
    "detail": "Active ที่โดนเสริมลูกเวท {power}% ATK หนึ่งลูก/การใช้; พักผล 1 วิ",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "wand_2_passive_1": {
    "id": "wand_2_passive_1",
    "owner": "wand",
    "weapon": "wand",
    "tier": 2,
    "kind": "passive",
    "index": 1,
    "name": "มานาหมุนเวียน",
    "effect": "manaReturn",
    "values": {
      "amount": [
        5,
        20
      ]
    },
    "detail": "จ่าย MP ร่าย Active ครบ 100 คืน {amount} MP",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "wand_3_buff_1": {
    "id": "wand_3_buff_1",
    "owner": "wand",
    "weapon": "wand",
    "tier": 3,
    "kind": "buff",
    "index": 1,
    "name": "เสริมพลังเวท",
    "effect": "extraPower",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "ดาเมจโจมตีเสริม +{amount}%; ไม่เรียกซ้ำหรือสร้างผลพิเศษต่อ",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "wand_3_passive_1": {
    "id": "wand_3_passive_1",
    "owner": "wand",
    "weapon": "wand",
    "tier": 3,
    "kind": "passive",
    "index": 1,
    "name": "ร่ายต่อเนื่อง",
    "effect": "chainDiscount",
    "values": {
      "amount": [
        1,
        3
      ]
    },
    "detail": "ร่าย Active ต่อกันลด MP {amount}%/Stack สูงสุด 5; ขาด 5 วิล้าง",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "wand_4_buff_1": {
    "id": "wand_4_buff_1",
    "owner": "wand",
    "weapon": "wand",
    "tier": 4,
    "kind": "buff",
    "index": 1,
    "name": "ฝนดาวเวท",
    "effect": "meteor",
    "values": {
      "hits": [
        20,
        10
      ],
      "power": [
        120,
        300
      ]
    },
    "detail": "ทุก {hits} Hit ดาวตกเสริม 4 Hit รวม {power}% ATK; พักผล 3 วิ",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "wand_4_passive_1": {
    "id": "wand_4_passive_1",
    "owner": "wand",
    "weapon": "wand",
    "tier": 4,
    "kind": "passive",
    "index": 1,
    "name": "วงจรเวท",
    "effect": "manaCD",
    "values": {
      "amount": [
        0.2,
        1
      ]
    },
    "detail": "จ่าย MP ร่าย Active ครบ 100 ลด CD Active {amount} วิ",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "staff_1_buff_1": {
    "id": "staff_1_buff_1",
    "owner": "staff",
    "weapon": "staff",
    "tier": 1,
    "kind": "buff",
    "index": 1,
    "name": "พลังเวทเข้มข้น",
    "effect": "damage",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "DAMAGE +{amount}%",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "staff_1_passive_1": {
    "id": "staff_1_passive_1",
    "owner": "staff",
    "weapon": "staff",
    "tier": 1,
    "kind": "passive",
    "index": 1,
    "name": "เก็บพลัง",
    "effect": "restCast",
    "values": {
      "amount": [
        10,
        35
      ]
    },
    "detail": "เว้นใช้ Active 3 วิ ชุดถัดไปแรงขึ้น {amount}%; ท่าต่อเนื่องได้รอบแรก",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "staff_2_buff_1": {
    "id": "staff_2_buff_1",
    "owner": "staff",
    "weapon": "staff",
    "tier": 2,
    "kind": "buff",
    "index": 1,
    "name": "เดินร่าย",
    "effect": "walkCharge",
    "values": {
      "amount": [
        50,
        100
      ]
    },
    "detail": "เดินขณะชาร์จได้ {amount}% ความเร็วปกติ",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "staff_2_passive_1": {
    "id": "staff_2_passive_1",
    "owner": "staff",
    "weapon": "staff",
    "tier": 2,
    "kind": "passive",
    "index": 1,
    "name": "แรงระเบิด",
    "effect": "lastHit",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "Hit สุดท้ายของชุด/รอบแรงขึ้น {amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "staff_3_buff_1": {
    "id": "staff_3_buff_1",
    "owner": "staff",
    "weapon": "staff",
    "tier": 3,
    "kind": "buff",
    "index": 1,
    "name": "ปลดขีดจำกัด",
    "effect": "limit",
    "values": {
      "amount": [
        10,
        40
      ]
    },
    "detail": "DAMAGE +{amount}%; MP ร่ายเพิ่ม 25%",
    "duration": [
      15,
      30
    ],
    "cd": 60,
    "designed": true
  },
  "staff_3_passive_1": {
    "id": "staff_3_passive_1",
    "owner": "staff",
    "weapon": "staff",
    "tier": 3,
    "kind": "passive",
    "index": 1,
    "name": "มานาอัดแน่น",
    "effect": "manaPower",
    "values": {
      "amount": [
        1,
        3
      ]
    },
    "detail": "จ่าย MP ทุก 10 ดาเมจชุดนั้น +{amount}% สูงสุด 5 ระดับ",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "staff_4_buff_1": {
    "id": "staff_4_buff_1",
    "owner": "staff",
    "weapon": "staff",
    "tier": 4,
    "kind": "buff",
    "index": 1,
    "name": "ช่วงระเบิดพลัง",
    "effect": "chargeSpeed",
    "values": {
      "amount": [
        40,
        40
      ]
    },
    "detail": "ลดเวลาชาร์จ 40% เช่น 3 วิ เหลือ 1.8 วิ",
    "duration": [
      10,
      20
    ],
    "cd": 90,
    "designed": true
  },
  "staff_4_passive_1": {
    "id": "staff_4_passive_1",
    "owner": "staff",
    "weapon": "staff",
    "tier": 4,
    "kind": "passive",
    "index": 1,
    "name": "พลังเต็มขีด",
    "effect": "highMana",
    "values": {
      "amount": [
        5,
        20
      ]
    },
    "detail": "MP >=70%: DAMAGE และ IGNORE.DEF +{amount}",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "tome_1_buff_1": {
    "id": "tome_1_buff_1",
    "owner": "tome",
    "weapon": "tome",
    "tier": 1,
    "kind": "buff",
    "index": 1,
    "name": "ขยายอักขระ",
    "effect": "area",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "รัศมีพื้นที่/ความกว้างท่า +{amount}%; ไม่ขยายระยะเคลื่อนที่",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "tome_1_passive_1": {
    "id": "tome_1_passive_1",
    "owner": "tome",
    "weapon": "tome",
    "tier": 1,
    "kind": "passive",
    "index": 1,
    "name": "ตราหน่วง",
    "effect": "slow",
    "values": {
      "amount": [
        5,
        20
      ],
      "duration": [
        2,
        4
      ],
      "boss": [
        2,
        8
      ]
    },
    "detail": "มอนช้า {amount}% นาน {duration} วิ; บอสแทนด้วยรับดาเมจเพิ่ม {boss}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "tome_2_buff_1": {
    "id": "tome_2_buff_1",
    "owner": "tome",
    "weapon": "tome",
    "tier": 2,
    "kind": "buff",
    "index": 1,
    "name": "ยืดอาณาเขต",
    "effect": "fieldDuration",
    "values": {
      "amount": [
        5,
        30
      ]
    },
    "detail": "อายุพื้นที่และวัตถุโจมตี +{amount}%; ไม่ยืด Buff หรืออมตะ",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "tome_2_passive_1": {
    "id": "tome_2_passive_1",
    "owner": "tome",
    "weapon": "tome",
    "tier": 2,
    "kind": "passive",
    "index": 1,
    "name": "ลงทัณฑ์สถานะ",
    "effect": "statusDamage",
    "values": {
      "amount": [
        5,
        20
      ]
    },
    "detail": "เป้าติดสถานะรับดาเมจเพิ่ม {amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "tome_3_buff_1": {
    "id": "tome_3_buff_1",
    "owner": "tome",
    "weapon": "tome",
    "tier": 3,
    "kind": "buff",
    "index": 1,
    "name": "ตราดูดรวม",
    "effect": "pullProc",
    "values": {
      "chance": [
        5,
        20
      ],
      "radius": [
        100,
        250
      ]
    },
    "detail": "โอกาส {chance}% วงดึงรัศมี {radius} อยู่ 1 วิ/8 Mob; พักผล 3 วิ; บอสไม่ถูกดึง",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "tome_3_passive_1": {
    "id": "tome_3_passive_1",
    "owner": "tome",
    "weapon": "tome",
    "tier": 3,
    "kind": "passive",
    "index": 1,
    "name": "อักขระแตกตัว",
    "effect": "statusDeath",
    "values": {
      "power": [
        30,
        100
      ],
      "radius": [
        100,
        200
      ]
    },
    "detail": "เป้าติดสถานะตาย ระเบิด {power}% ATK รัศมี {radius}/8 Mob; ไม่ระเบิดต่อ",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "tome_4_buff_1": {
    "id": "tome_4_buff_1",
    "owner": "tome",
    "weapon": "tome",
    "tier": 4,
    "kind": "buff",
    "index": 1,
    "name": "ยืดมนตรา",
    "effect": "buffDuration",
    "values": {
      "amount": [
        5,
        30
      ]
    },
    "detail": "ระยะเวลา Buff +{amount}%; ไม่ยืดตัวเองและอมตะ",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "tome_4_passive_1": {
    "id": "tome_4_passive_1",
    "owner": "tome",
    "weapon": "tome",
    "tier": 4,
    "kind": "passive",
    "index": 1,
    "name": "อาณาเขตทับซ้อน",
    "effect": "statusCount",
    "values": {
      "amount": [
        1,
        4
      ]
    },
    "detail": "DAMAGE +{amount}%/สถานะต่างชนิด สูงสุด 5 ชนิด",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "dagger_1_buff_1": {
    "id": "dagger_1_buff_1",
    "owner": "dagger",
    "weapon": "dagger",
    "tier": 1,
    "kind": "buff",
    "index": 1,
    "name": "คมลอบสังหาร",
    "effect": "criDamage",
    "values": {
      "amount": [
        5,
        30
      ]
    },
    "detail": "CRI.DAMAGE +{amount} จุด",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "dagger_1_passive_1": {
    "id": "dagger_1_passive_1",
    "owner": "dagger",
    "weapon": "dagger",
    "tier": 1,
    "kind": "passive",
    "index": 1,
    "name": "ลอบโจมตี",
    "effect": "behind",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "โจมตีด้านหลังดาเมจ +{amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "dagger_2_buff_1": {
    "id": "dagger_2_buff_1",
    "owner": "dagger",
    "weapon": "dagger",
    "tier": 2,
    "kind": "buff",
    "index": 1,
    "name": "หมายหัว",
    "effect": "lowHP",
    "values": {
      "amount": [
        10,
        35
      ]
    },
    "detail": "เป้า HP <30% รับดาเมจเพิ่ม {amount}%",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "dagger_2_passive_1": {
    "id": "dagger_2_passive_1",
    "owner": "dagger",
    "weapon": "dagger",
    "tier": 2,
    "kind": "passive",
    "index": 1,
    "name": "หลบแล้วสวน",
    "effect": "dodgeCrit",
    "values": {
      "amount": [
        10,
        40
      ]
    },
    "detail": "หลบแล้วชุดถัดไป CRI +{amount} จุด; เก็บ 5 วิ",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "dagger_3_buff_1": {
    "id": "dagger_3_buff_1",
    "owner": "dagger",
    "weapon": "dagger",
    "tier": 3,
    "kind": "buff",
    "index": 1,
    "name": "ก้าวเงา",
    "effect": "shadow",
    "values": {
      "spd": [
        10,
        30
      ],
      "avoid": [
        5,
        20
      ]
    },
    "detail": "SPD +{spd}; AVOID +{avoid} จุด",
    "duration": [
      10,
      20
    ],
    "cd": 45,
    "designed": true
  },
  "dagger_3_passive_1": {
    "id": "dagger_3_passive_1",
    "owner": "dagger",
    "weapon": "dagger",
    "tier": 3,
    "kind": "passive",
    "index": 1,
    "name": "ต่อยอดการสังหาร",
    "effect": "killCD",
    "values": {
      "amount": [
        0.2,
        1
      ]
    },
    "detail": "กำจัดศัตรูลด CD Active {amount} วิ; พักผล 1 วิ",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "dagger_4_buff_1": {
    "id": "dagger_4_buff_1",
    "owner": "dagger",
    "weapon": "dagger",
    "tier": 4,
    "kind": "buff",
    "index": 1,
    "name": "สังหารต่อเนื่อง",
    "effect": "killBuff",
    "values": {
      "seconds": [
        1,
        3
      ],
      "amount": [
        1,
        4
      ],
      "maximum": [
        30,
        60
      ]
    },
    "detail": "ฆ่าต่อเวลา {seconds} วิ; DAMAGE +{amount}% สูงสุด 5 Stack; เวลารวมไม่เกิน {maximum} วิ",
    "duration": [
      15,
      30
    ],
    "cd": 90,
    "designed": true
  },
  "dagger_4_passive_1": {
    "id": "dagger_4_passive_1",
    "owner": "dagger",
    "weapon": "dagger",
    "tier": 4,
    "kind": "passive",
    "index": 1,
    "name": "นักล่าเป้าสำคัญ",
    "effect": "elitePierce",
    "values": {
      "amount": [
        5,
        30
      ]
    },
    "detail": "IGNORE.DEF ต่อ Elite/บอส +{amount} จุด",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "star_1_buff_1": {
    "id": "star_1_buff_1",
    "owner": "star",
    "weapon": "star",
    "tier": 1,
    "kind": "buff",
    "index": 1,
    "name": "คมดาว",
    "effect": "damage",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "DAMAGE +{amount}%",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "star_1_passive_1": {
    "id": "star_1_passive_1",
    "owner": "star",
    "weapon": "star",
    "tier": 1,
    "kind": "passive",
    "index": 1,
    "name": "ล่าฝูง",
    "effect": "crowd",
    "values": {
      "amount": [
        1,
        4
      ]
    },
    "detail": "DAMAGE +{amount}%/ศัตรูอื่นรัศมี 250 สูงสุด 5 ตัว",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "star_2_buff_1": {
    "id": "star_2_buff_1",
    "owner": "star",
    "weapon": "star",
    "tier": 2,
    "kind": "buff",
    "index": 1,
    "name": "ดาวชิ่ง",
    "effect": "bounceProc",
    "values": {
      "amount": [
        10,
        30
      ]
    },
    "detail": "ส่งดาเมจ {amount}% ไปเป้าใกล้หนึ่งตัวรัศมี 300; พักผล .5 วิ; ไม่ชิ่งต่อ",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "star_2_passive_1": {
    "id": "star_2_passive_1",
    "owner": "star",
    "weapon": "star",
    "tier": 2,
    "kind": "passive",
    "index": 1,
    "name": "ขยายการกระจาย",
    "effect": "spread",
    "values": {
      "amount": [
        5,
        30
      ]
    },
    "detail": "ระยะชิ่ง/แพร่/ระเบิดจากฆ่า +{amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "star_3_buff_1": {
    "id": "star_3_buff_1",
    "owner": "star",
    "weapon": "star",
    "tier": 3,
    "kind": "buff",
    "index": 1,
    "name": "ดาวติดตาม",
    "effect": "delayedStar",
    "values": {
      "power": [
        40,
        120
      ]
    },
    "detail": "Active โดนติดดาวบนเป้า ระเบิดหลัง 2 วิ {power}% ATK; ไม่แพร่หรือเรียกผลต่อ",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "star_3_passive_1": {
    "id": "star_3_passive_1",
    "owner": "star",
    "weapon": "star",
    "tier": 3,
    "kind": "passive",
    "index": 1,
    "name": "เก็บเกี่ยวต่อทอด",
    "effect": "killChain",
    "values": {
      "amount": [
        1,
        4
      ]
    },
    "detail": "ฆ่าภายใน 5 วิ DAMAGE +{amount}%/ตัว สูงสุด 5 Stack",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "star_4_buff_1": {
    "id": "star_4_buff_1",
    "owner": "star",
    "weapon": "star",
    "tier": 4,
    "kind": "buff",
    "index": 1,
    "name": "พายุดาวติดตาม",
    "effect": "orbitStars",
    "values": {
      "power": [
        60,
        180
      ],
      "period": [
        1,
        0.5
      ]
    },
    "detail": "ดาวรอบตัว 2 Hit รวม {power}% ATK/รอบ ทุก {period} วิ; รัศมี 200/8 Mob",
    "duration": [
      10,
      20
    ],
    "cd": 60,
    "designed": true
  },
  "star_4_passive_1": {
    "id": "star_4_passive_1",
    "owner": "star",
    "weapon": "star",
    "tier": 4,
    "kind": "passive",
    "index": 1,
    "name": "กระจายสู่เป้าหลัก",
    "effect": "aloneExtra",
    "values": {
      "amount": [
        10,
        40
      ]
    },
    "detail": "เมื่อไม่มีศัตรูอื่นรัศมี 300 ดาเมจเสริม +{amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "fist_1_buff_1": {
    "id": "fist_1_buff_1",
    "owner": "fist",
    "weapon": "fist",
    "tier": 1,
    "kind": "buff",
    "index": 1,
    "name": "ร่างพร้อมคอมโบ",
    "effect": "agile",
    "values": {
      "spd": [
        5,
        20
      ],
      "jump": [
        2,
        10
      ]
    },
    "detail": "SPD +{spd}; JUMP +{jump}",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "fist_1_passive_1": {
    "id": "fist_1_passive_1",
    "owner": "fist",
    "weapon": "fist",
    "tier": 1,
    "kind": "passive",
    "index": 1,
    "name": "โจมตีกลางอากาศ",
    "effect": "air",
    "values": {
      "amount": [
        5,
        25
      ]
    },
    "detail": "กลางอากาศ DAMAGE +{amount}%",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "fist_2_buff_1": {
    "id": "fist_2_buff_1",
    "owner": "fist",
    "weapon": "fist",
    "tier": 2,
    "kind": "buff",
    "index": 1,
    "name": "คอมโบไหลลื่น",
    "effect": "comboRecovery",
    "values": {
      "amount": [
        5,
        20
      ]
    },
    "detail": "ใช้ Active ต่างขั้นภายใน 5 วิ พักท่าลด {amount}%",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "fist_2_passive_1": {
    "id": "fist_2_passive_1",
    "owner": "fist",
    "weapon": "fist",
    "tier": 2,
    "kind": "passive",
    "index": 1,
    "name": "สลับท่าต่อพลัง",
    "effect": "comboDamage",
    "values": {
      "amount": [
        1,
        5
      ]
    },
    "detail": "ต่างขั้น DAMAGE +{amount}% สูงสุด 3 Stack; ซ้ำขั้น/ขาด 5 วิล้าง",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "fist_3_buff_1": {
    "id": "fist_3_buff_1",
    "owner": "fist",
    "weapon": "fist",
    "tier": 3,
    "kind": "buff",
    "index": 1,
    "name": "หมัดเปิดช่อง",
    "effect": "defBreak",
    "values": {
      "chance": [
        5,
        20
      ],
      "amount": [
        5,
        20
      ],
      "duration": [
        3,
        5
      ]
    },
    "detail": "โอกาส {chance}% ลด DEF {amount} จุด นาน {duration} วิ; ไม่ซ้อนค่าตัวเอง",
    "duration": [
      100,
      100
    ],
    "cd": 10,
    "designed": true
  },
  "fist_3_passive_1": {
    "id": "fist_3_passive_1",
    "owner": "fist",
    "weapon": "fist",
    "tier": 3,
    "kind": "passive",
    "index": 1,
    "name": "ขยับแล้วโจมตี",
    "effect": "movePower",
    "values": {
      "distance": [
        300,
        150
      ],
      "amount": [
        10,
        30
      ]
    },
    "detail": "เดิน/พุ่งครบ {distance} หน่วย ชุดถัดไปแรงขึ้น {amount}%; ไม่นับวาร์ป; เก็บ 5 วิ",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  },
  "fist_4_buff_1": {
    "id": "fist_4_buff_1",
    "owner": "fist",
    "weapon": "fist",
    "tier": 4,
    "kind": "buff",
    "index": 1,
    "name": "ระเบิดคอมโบ",
    "effect": "comboReset",
    "values": {
      "amount": [
        50,
        100
      ]
    },
    "detail": "ใช้ Active ครบ 4 ขั้น ลด CD ขั้น 1–3 ที่เหลือ {amount}%; ครั้งเดียวต่อ Buff",
    "duration": [
      10,
      20
    ],
    "cd": 90,
    "designed": true
  },
  "fist_4_passive_1": {
    "id": "fist_4_passive_1",
    "owner": "fist",
    "weapon": "fist",
    "tier": 4,
    "kind": "passive",
    "index": 1,
    "name": "จบชุดหนัก",
    "effect": "comboHit",
    "values": {
      "ratio": [
        30,
        100
      ]
    },
    "detail": "ต่างขั้นต่อกันครบ 3 ครั้ง ท่าถัดไปเพิ่ม 1 Hit แรง {ratio}% ของเดิม; รอบแรกเท่านั้น",
    "duration": [
      0,
      0
    ],
    "cd": 0,
    "designed": true
  }
};
Object.assign(WEAPON_SKILLS,SUPPORT_SKILLS);
