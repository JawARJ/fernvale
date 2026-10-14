'use strict';
const TIER2_DESIGNS={
 sword:{active:'ดาบพายุ',buff:'เกราะนักดาบ',condition:'healthy',utility:'def',hits:3,targets:6,range:155,damageBase:115,damagePerLevel:3,cost:14,cd:5},
 spear:{active:'หอกกวาดวง',buff:'คมหอกทะลุเกราะ',condition:'far',utility:'hp',hits:2,targets:6,range:210,damageBase:135,damagePerLevel:3,cost:16,cd:6},
 hammer:{active:'ค้อนสะเทือน',buff:'ใจนักรบ',condition:'controlled',utility:'def',hits:2,targets:8,range:160,damageBase:150,damagePerLevel:3,cost:20,cd:8},
 bow:{active:'ฝนศร',buff:'ศรล่าสังหาร',condition:'far',utility:'acc',hits:3,targets:5,ranged:true,damageBase:100,damagePerLevel:3,cost:16,cd:6},
 crossbow:{active:'ลูกดอกพิฆาต',buff:'ยิงจุดตาย',condition:'highEnemy',utility:'criDamage',hits:2,targets:2,ranged:true,damageBase:180,damagePerLevel:3,cost:18,cd:7},
 gun:{active:'กระสุนกระจาย',buff:'ชุดกระสุนเจาะ',condition:'close',utility:'cri',hits:4,targets:3,ranged:true,damageBase:85,damagePerLevel:2,cost:16,cd:6},
 wand:{active:'ดาวตกเวท',buff:'เกราะมานา',condition:'single',utility:'mp',hits:3,targets:2,ranged:true,damageBase:120,damagePerLevel:3,cost:18,cd:6},
 staff:{active:'เพลิงระเบิด',buff:'พลังเวทขยาย',condition:'crowd',utility:'mpRegen',hits:2,targets:6,ranged:true,damageBase:125,damagePerLevel:3,cost:20,cd:7},
 tome:{active:'ตราผนึก',buff:'ม่านอักขระ',condition:'controlled',utility:'def',hits:1,targets:6,ranged:true,damageBase:180,damagePerLevel:3,cost:18,cd:7},
 dagger:{active:'แทงเงาซ้อน',buff:'คมมีดลอบสังหาร',condition:'lowEnemy',utility:'avoid',hits:4,targets:1,range:100,damageBase:95,damagePerLevel:3,cost:14,cd:5},
 claw:{active:'กรงเล็บพายุ',buff:'เกราะอสูร',condition:'close',utility:'hp',hits:5,targets:3,range:110,damageBase:75,damagePerLevel:2,cost:16,cd:6},
 star:{active:'ดาววงจักร',buff:'ดาวเจาะเกราะ',condition:'air',utility:'spd',hits:2,targets:5,ranged:true,damageBase:130,damagePerLevel:3,cost:16,cd:6}
};
const TIER2_CONDITION_NAMES={healthy:'นักสู้พร้อมรบ',far:'จู่โจมระยะไกล',controlled:'ซ้ำจุดอ่อน',highEnemy:'เปิดฉากพิฆาต',close:'ต่อสู้ประชิด',single:'พลังเป้าหมายเดี่ยว',crowd:'พลังฝูงศัตรู',lowEnemy:'ปิดฉากศัตรู',air:'จู่โจมกลางอากาศ'};
for(const [weapon,design]of Object.entries(TIER2_DESIGNS)){
 const main=Object.values(BASE_CLASSES).find(c=>c.weapons.includes(weapon)).main.toUpperCase();
 const names={active:[design.active],buff:['พลัง '+main,design.buff],passive:['ชำนาญ '+WEAPON_NAMES[weapon],TIER2_CONDITION_NAMES[design.condition]+' · '+WEAPON_NAMES[weapon],'ฝึก '+design.utility.toUpperCase()+' · '+WEAPON_NAMES[weapon]]};
 for(const [kind,list]of Object.entries(names))list.forEach((name,index)=>{const id=weapon+'_2_'+kind+'_'+index;WEAPON_SKILLS[id]={id,weapon,tier:2,kind,index,name,designed:true}});
}
function getWeaponDesign(d){return d.tier===2?TIER2_DESIGNS[d.weapon]:{...WEAPON_DESIGNS[d.weapon],damageBase:90,damagePerLevel:2,cost:8,cd:3}}
function tier2BuffValues(d,rank){
 if(d.index===0)return {[Object.values(BASE_CLASSES).find(c=>c.weapons.includes(d.weapon)).main]:6+Math.floor(rank/3)};
 const scaled=rank*.3;return {sword:{def:10+rank},spear:{ignoreDef:5+scaled},hammer:{stance:.2+rank*.005},bow:{cri:5+rank*.1},crossbow:{criDamage:15+rank},gun:{ignoreDef:5+scaled},wand:{reduction:.08+rank*.002},staff:{damage:5+rank*.2},tome:{def:10+rank},dagger:{criDamage:15+rank},claw:{reduction:.08+rank*.002},star:{ignoreDef:5+scaled}}[d.weapon];
}
function tier2Utility(d,rank){const key=TIER2_DESIGNS[d.weapon].utility;return {[key]:key==='hp'||key==='mp'?30+rank*5:key==='mpRegen'?.2+rank*.02:key==='cri'||key==='avoid'?2+rank*.1:key==='criDamage'?5+rank:key==='spd'?5+rank*.3:3+rank}}
const bonusesBeforeTier2=weaponLoadoutBonuses;
weaponLoadoutBonuses=function(p=player){
 const base=bonusesBeforeTier2({...p,weaponLoadout:p.weaponLoadout.map((row,i)=>i===1?{active:row.active,buff:[],passive:[]}:row)});
 for(const kind of ['buff','passive'])for(const id of selectedSkillIds(kind,p)){
  const d=WEAPON_SKILLS[id];if(d.tier!==2||kind==='buff'&&!(p.weaponBuffs?.[id]>0))continue;
  const rank=p.weaponSkills[id],values=kind==='buff'?tier2BuffValues(d,rank):d.index===0?{atk:4+rank}:d.index===2?tier2Utility(d,rank):{};
  for(const [key,n]of Object.entries(values))base[key]=(base[key]||0)+n;
 }return base;
};
const damageBeforeTier2=weaponDamageFactor;
weaponDamageFactor=function(m){let value=damageBeforeTier2(m);for(const id of selectedSkillIds('passive')){const d=WEAPON_SKILLS[id];if(d.tier!==2||d.index!==1)continue;const distance=Math.abs(m.x-player.x),crowd=monsters.filter(n=>!n.dead&&Math.abs(n.x-m.x)<120&&Math.abs(n.y-m.y)<50).length;const condition=TIER2_DESIGNS[d.weapon].condition,match={healthy:player.hp/maxHP()>.7,far:distance>150,controlled:m.stun>0||m.slow>0,highEnemy:m.hp/m.max>.7,close:distance<100,single:crowd===1,crowd:crowd>=2,lowEnemy:m.hp/m.max<.3,air:!player.ground}[condition];if(match)value+=.08+player.weaponSkills[id]*.002}return value};
function tier2EffectDetail(d,rank){
 if(d.kind==='active')return 'ใช้จากมือหลัก · '+(d.weapon==='hammer'?'ทำให้มอนทั่วไปชะงัก '+Number((1+rank*.01).toFixed(1))+' วิ':d.weapon==='tome'?'ทำให้มอนทั่วไปเดินช้า 3 วิ':d.weapon==='staff'?'ระเบิดเสริม 70% รอบเป้าหมาย':d.weapon==='star'?'ชิ่งศัตรูใกล้เคียงสูงสุด 3 ตัว':'โจมตีตามทิศที่หัน'+(TIER2_DESIGNS[d.weapon].ranged?' หรือทิศลูกศร':''));
 if(d.kind==='passive'&&d.index===1)return 'ดาเมจ +'+Number((8+rank*.2).toFixed(1))+'% เมื่อ '+{healthy:'HP ตัวเองมากกว่า 70%',far:'เป้าหมายอยู่ห่างเกิน 150',controlled:'ศัตรูชะงักหรือเดินช้า',highEnemy:'HP ศัตรูมากกว่า 70%',close:'เป้าหมายอยู่ใกล้กว่า 100',single:'ศัตรูอยู่ตัวเดียว',crowd:'ศัตรูอยู่รวมกันอย่างน้อย 2 ตัว',lowEnemy:'HP ศัตรูต่ำกว่า 30%',air:'โจมตีกลางอากาศ'}[TIER2_DESIGNS[d.weapon].condition];
 const values=d.kind==='buff'?tier2BuffValues(d,rank):d.index===0?{atk:4+rank}:tier2Utility(d,rank);
 return Object.entries(values).map(([key,n])=>(BONUS_NAMES[key]||{stance:'ต้านกระเด็น',reduction:'ลดดาเมจ',mpRegen:'MP / วินาที',spd:'SPD',avoid:'AVOID'}[key]||key.toUpperCase())+' +'+Number((['stance','reduction'].includes(key)?n*100:n).toFixed(1))+(['stance','reduction','ignoreDef','cri','criDamage','damage','avoid','spd'].includes(key)?'%':'')).join(' · ')+(d.kind==='buff'?' · ระยะเวลา 90 วิ':' · ใช้ได้จากทั้งสองมือ');
}
