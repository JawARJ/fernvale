'use strict';
function ensureBaselineSkills(p){
 p.weaponSkills??={};
 for(const d of Object.values(WEAPON_SKILLS))if(d.designed)p.weaponSkills[d.id]=Math.max(1,p.weaponSkills[d.id]||0);
 return p;
}
const validateBeforeBaseline=validateCharacter;
validateCharacter=function(raw){return ensureBaselineSkills(validateBeforeBaseline(raw))};
function skillEffectDetail(d,rank){if(d.tier===2)return tier2EffectDetail(d,rank);
 const n=value=>Number(value.toFixed(1));
 if(d.kind==='active')return 'ใช้จากมือหลัก · '+({hammer:'ทำให้มอนทั่วไปชะงัก '+n(.6+rank*.01)+' วิ',staff:'ระเบิดรอบเป้าหมาย ดาเมจเสริม 70%',tome:'ทำให้มอนทั่วไปเดินช้า 2 วิ',star:'ชิ่งไปหาศัตรูใกล้เคียงสูงสุด 3 ตัว ดาเมจเริ่ม 70%'}[d.weapon]||'โจมตีตามทิศที่หัน'+(WEAPON_DESIGNS[d.weapon].ranged?' หรือทิศลูกศร':''));
 if(d.kind==='buff'){
  if(d.index===0)return d.name+' +'+(2+Math.floor(rank/3))+' · ระยะเวลา 120 วิ · ห้ามชื่อซ้ำ';
  const effect={sword:'ATKSPD +'+n(Math.min(.25,.1+rank*.005)*100),spear:'ระยะโจมตี +'+(20+rank),hammer:'ลดดาเมจ '+n((.1+rank*.003)*100)+'%',bow:'ACC +'+(5+rank),crossbow:'CRI.DAMAGE +'+(10+rank)+'%',gun:'ATKSPD +'+n(Math.min(.25,.1+rank*.005)*100),wand:'ลดการใช้ MP '+n((.15+rank*.003)*100)+'%',staff:'รัศมีระเบิดเวท +'+(30+rank),tome:'ใช้ MP รับดาเมจแทน 30%',dagger:'SPD +'+(10+rank)+'%',claw:'CRI +'+n(3+rank*.1)+'%',star:'AVOID +'+n(3+rank*.1)+'%'};
  return effect[d.weapon]+' · ระยะเวลา 120 วิ · ส่งผลต่ออาวุธหลัก';
 }
 const boost=n(10+rank*.3),proc=n(8+rank*.3),finish=n(15+rank*.3);
 const details={
  sword:['ดาเมจ +'+n(1+rank*.1)+'% ต่อ Stack สูงสุด 5 ชั้น','โอกาส '+proc+'% โจมตีเสริม 50% ATK','ลดช่วงพักท่า '+n(rank*.3)+'%'],
  spear:['IGNORE.DEF +'+n(2+rank*.3)+'%','ระยะโจมตี +'+rank*2,'โอกาสต้านกระเด็น '+n(rank*1.5)+'%'],
  hammer:['ดาเมจ +'+boost+'% ต่อศัตรูที่ชะงัก/เดินช้า','โอกาส '+boost+'% ลด ATK ศัตรู 10% นาน 3 วิ','DEF +'+(1+Math.floor(rank/5))+' ต่อศัตรูใกล้ตัว สูงสุด 5 ตัว'],
  bow:['ดาเมจ +'+boost+'% เมื่อระยะเกิน 150','IGNORE.DEF +'+n(rank*.2)+'%','SPD +'+rank+'%'],
  crossbow:['ดาเมจ +'+boost+'% เมื่อเป้าหมาย HP มากกว่า 70%','ดาเมจ +1.5% ต่อ Stack สูงสุด 5 ชั้น','ดาเมจ +'+boost+'% หลังพักโจมตีเกิน 2 วิ'],
  gun:['ACC +'+rank+' ต่อ Stack สูงสุด 5 ชั้น','ทุก 5 ครั้งโจมตี เสริม 50% ATK','ดาเมจ +'+boost+'% เมื่อระยะน้อยกว่า 100'],
  wand:['โอกาส 20% คืน MP '+(1+Math.floor(rank/10)),'ดาเมจ +'+boost+'% เมื่อมีศัตรูตัวเดียวในบริเวณ','คริติคอลมีโอกาส 20% โจมตีเสริม 50% ATK'],
  staff:['ดาเมจ +'+boost+'% เมื่อมีศัตรูอยู่รวมกันอย่างน้อย 2 ตัว','โอกาส 20% ทำดาเมจ 8% ATK ต่อวินาที นาน 3 วิ','กำจัดศัตรูลด CD Active '+n(.1+rank*.01)+' วิ'],
  tome:['ดาเมจ +'+boost+'% ต่อศัตรูที่เดินช้า','ยืดสถานะชะงัก/เดินช้ามอนทั่วไป '+n(Math.min(.5,rank*.01))+' วิ','ฟื้น MP เพิ่ม '+n(rank*.04)+' ต่อวินาที'],
  dagger:['ดาเมจ +'+boost+'% เมื่อโจมตีด้านหลัง','ดาเมจ +'+finish+'% เมื่อเป้าหมาย HP ต่ำกว่า 30%','หลังหลบสำเร็จ โจมตีถัดไปดาเมจ +'+finish+'%'],
  claw:['ATKSPD +'+n(rank*.1)+' ต่อ Stack สูงสุด +15','คริติคอลแรงขึ้น 2% ต่อ Stack สูงสุด 5 ชั้น','ดูด HP 2% ของดาเมจ สูงสุด 1 ครั้งต่อวินาที'],
  star:['ดาเมจ +'+n(5+rank*.2)+'% เมื่อมีศัตรูอยู่รวมกัน และดาเมจชิ่ง +'+n(rank*.3)+'%','ดาเมจ +'+boost+'% เมื่อโจมตีกลางอากาศ','โอกาส '+proc+'% โจมตีเสริม 50% ATK']
 };
 return details[d.weapon][d.index]+' · ใช้ได้จากทั้งสองมือ';
}
weaponSkillText=function(id){
 const d=WEAPON_SKILLS[id];if(!d?.designed)return 'รอออกแบบ';
 const rank=Math.max(1,player.weaponSkills[id]||0),design=getWeaponDesign(d),active=d.kind==='active';
 const heading=d.kind.toUpperCase()+' · ขั้น '+d.tier+' · Lv.'+rank+'/30\nใช้สำหรับอาวุธ : '+WEAPON_NAMES[d.weapon];
 const metrics='CD '+(d.kind==='passive'?0:active?design.cd:d.tier===2?12:8)+' วิ · MP '+(d.kind==='passive'?0:active?design.cost:d.tier===2?14:8)+(active?'\nDamage '+(design.damageBase+rank*design.damagePerLevel)+'% ATK × '+design.hits+' Hit · Mob '+design.targets:'');
 return heading+'\n'+metrics+'\n'+skillEffectDetail(d,rank);
};
function skillPreview(cell,id){if(id)attachLootDetail(cell,{name:WEAPON_SKILLS[id].name,description:weaponSkillText(id)})}
function renderSwordSkillWindow(body){
 ensureBaselineSkills(player);body.className='weapon-skill-window';body.replaceChildren();$('modalTitle').textContent='ชุดสกิลอาวุธ';
 const close=document.createElement('button');close.id='closeSkillBtn';close.className='window-close';close.textContent='×';close.onclick=closeModal;body.append(close);
 const grid=document.createElement('div');grid.className='weapon-skill-grid';
 for(const label of ['ขั้น','Active','Buff','Passive']){const h=document.createElement('strong');h.textContent=label;grid.append(h)}
 for(let tier=1;tier<=4;tier++){
  const label=document.createElement('strong');label.textContent=tier;grid.append(label);
  for(const kind of ['active','buff','passive']){
   const group=document.createElement('div');group.className='weapon-slot-group';
   player.weaponLoadout[tier-1][kind].forEach((id,index)=>{
    const slot=document.createElement('div');slot.className='weapon-slot';
    const cell=document.createElement('div');cell.className='weapon-skill-cell';cell.tabIndex=0;
    cell.textContent=tier>2?'รอออกแบบ':tier===2&&(player.level<30||player.classTier<2)?'Lv.30 · ใช้ตราเลื่อนขั้น 2':id?WEAPON_SKILLS[id].name+'\nLv.'+player.weaponSkills[id]+(weaponSkillEnabled(id)?'':'\nอาวุธไม่ตรง'):'ว่าง';
    if(tier<=2)skillPreview(cell,id);
    const change=document.createElement('button');change.className='skill-detail-action';change.textContent='เปลี่ยนสกิล';change.disabled=tier>2||tier===2&&(player.level<30||player.classTier<2);change.onclick=()=>pickWeaponSkill(tier,kind,index);
    slot.append(cell,change);group.append(slot);
   });grid.append(group);
  }
 }
 body.append(grid);const note=document.createElement('p');note.textContent='สกิลเริ่ม Lv.1 · ใช้สกิลซ้ำจากกล่องเพื่ออัปในกระเป๋าสกิล · Active ใช้อาวุธหลัก · Buff/Passive ใช้ได้จากทั้งสองมือและห้ามชื่อซ้ำ';body.append(note);
}
function pickWeaponSkill(tier,kind,index){
 ensureBaselineSkills(player);hideUpgradeTooltip();
 const body=document.createElement('div');body.className='weapon-picker-panel';
 const tabs=document.createElement('div');tabs.className='weapon-picker-tabs';tabs.setAttribute('aria-label','ประเภทอาวุธ');
 const rows=document.createElement('div');rows.className='weapon-picker-rows';
 let weapon=kind==='active'?weaponInHand('main'):WEAPON_SKILLS[player.weaponLoadout[tier-1][kind][index]]?.weapon||weaponInHand('main');
 function render(){
  rows.replaceChildren();for(const b of tabs.children)b.classList.toggle('selected',b.dataset.weapon===weapon);
  const heading=document.createElement('h3');heading.textContent=WEAPON_NAMES[weapon]+' · ขั้น '+tier;rows.append(heading);
  for(const d of Object.values(WEAPON_SKILLS).filter(d=>d.designed&&d.tier===tier&&d.weapon===weapon&&d.kind===kind)){
   const row=document.createElement('div');row.className='weapon-picker-row';row.tabIndex=0;skillPreview(row,d.id);
   const icon=document.createElement('span');icon.innerHTML=weaponIcon(weapon);
   const label=document.createElement('span');label.textContent=d.name;const type=document.createElement('small');type.textContent=d.kind.toUpperCase();label.append(type);
   const rank=document.createElement('strong');rank.textContent=player.weaponSkills[d.id]+'/30';
   const choose=document.createElement('button');choose.textContent='เลือก';choose.disabled=d.kind!==kind||!weaponSkillEnabled(d.id)||player.weaponLoadout[tier-1][kind].some((id,i)=>i!==index&&id&&WEAPON_SKILLS[id].name===d.name);
   choose.title=d.kind!==kind?'ช่องนี้สำหรับ '+kind:!weaponSkillEnabled(d.id)?'ต้องสวมอาวุธที่ตรง':'เลือกสกิล';
   choose.onclick=()=>{if(equipPooledSkill(d.id,index)){hideUpgradeTooltip();closeModal();openControlWindow('skill')}};
   row.append(icon,label,rank,choose);rows.append(row);
  }
 }
 for(const w of Object.keys(WEAPON_NAMES)){
  const b=document.createElement('button');b.dataset.weapon=w;b.innerHTML=weaponIcon(w);b.title=WEAPON_NAMES[w];b.setAttribute('aria-label',WEAPON_NAMES[w]);b.onclick=()=>{weapon=w;hideUpgradeTooltip();render()};tabs.append(b);
 }
 body.append(tabs,rows);modal('เปลี่ยนสกิล · '+kind.toUpperCase(),body,[['ถอดสกิล',()=>{player.weaponLoadout[tier-1][kind][index]=null;save();closeModal();openControlWindow('skill')}],['กลับ',()=>{closeModal();openControlWindow('skill')}]]);render();
}
