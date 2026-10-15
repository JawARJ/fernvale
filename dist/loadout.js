'use strict';
const BASE_CLASSES={warrior:{name:'นักรบ',main:'str',weapons:['sword','spear','hammer'],ratings:[4,4,5]},shooter:{name:'นักยิง',main:'dex',weapons:['bow','crossbow','gun'],ratings:[3,4,3]},mage:{name:'นักเวท',main:'int',weapons:['wand','staff','tome'],ratings:[5,3,2]},rogue:{name:'นักลอบโจมตี',main:'luk',weapons:['dagger','fist','star'],ratings:[3,3,3]}};
const WEAPON_NAMES={sword:'ดาบ',spear:'หอก',hammer:'ค้อน',bow:'ธนู',crossbow:'หน้าไม้',gun:'ปืน',wand:'คทา',staff:'ไม้เท้า',tome:'หนังสือเวท',dagger:'มีด',fist:'หมัด',star:'ดาวกระจาย'};
const SKILL_MIN_LEVEL=[0,1,30,60,100],SKILL_KINDS={active:'Active'},WEAPON_SKILLS=ACTIVE_SKILLS;
function emptyWeaponLoadout(){return Array.from({length:4},()=>({active:[null],buff:[],passive:[]}))}
function validClass(p=player){return BASE_CLASSES[p.baseClass]||BASE_CLASSES.warrior}
function weaponInHand(hand,p=player){const g=p.loot.gear.find(g=>g.id===p.loot.equipped[hand]);if(g)return g.weapon||'sword';return hand==='main'&&!p.starterStored?validClass(p).weapons[0]:null}
function weaponSkillEnabled(id,p=player){const d=WEAPON_SKILLS[id];return !!d&&(p.weaponSkills?.[id]||0)>0&&p.level>=SKILL_MIN_LEVEL[d.tier]&&(p.classTier||1)>=d.tier&&validClass(p).weapons.includes(d.weapon)&&weaponInHand('main',p)===d.weapon}
function selectedSkillIds(kind,p=player){return kind==='active'?(p.weaponLoadout||[]).flatMap(row=>row.active||[]).filter(id=>weaponSkillEnabled(id,p)):[]}
function ensureBaselineSkills(p){p.weaponSkills??={};for(const id of Object.keys(WEAPON_SKILLS))p.weaponSkills[id]=Math.max(1,p.weaponSkills[id]||0);return p}
function validateWeaponSystem(raw,p){
 p.baseClass=raw.baseClass||(['mage','rogue','shooter'].includes(raw.job)?raw.job:'warrior');if(!BASE_CLASSES[p.baseClass])throw Error('อาชีพหลักไม่ถูกต้อง');p.job=p.baseClass;
 p.classTier=raw.classTier??(p.level>=100?4:p.level>=60?3:p.level>=30?2:1);p.advancementMark=raw.advancementMark??0;
 if(!Number.isInteger(p.classTier)||p.classTier<1||p.classTier>4||!Number.isInteger(p.advancementMark)||p.advancementMark<0||p.advancementMark>4||p.advancementMark&&p.advancementMark!==p.classTier+1)throw Error('ขั้นอาชีพไม่ถูกต้อง');
 p.starterStored=raw.starterStored??p.loot.gear.some(g=>g.name.includes('ฝึก'));
 for(const g of p.loot.gear){if(g.weapon==='axe'){g.weapon='hammer';g.name=g.name.replace('ขวาน','ค้อน')}if(g.weapon==='claw'){g.weapon='fist';g.name=g.name.replace('กรงเล็บ','หมัด')}if(['main','secondary'].includes(g.slot)&&!g.weapon)g.weapon=raw.job==='spearman'?'spear':'sword'}
 p.weaponSkills={};p.skillScrolls={};p.weaponLoadout=emptyWeaponLoadout();
 // v4 replaces the old skill catalog, including its ranks, scrolls and selections.
 for(const [field,max]of [['weaponSkills',30],['skillScrolls',999999]]){const data=raw[field]||{};if(typeof data!=='object'||Array.isArray(data))throw Error('กระเป๋าสกิลไม่ถูกต้อง');for(const [id,n]of Object.entries(data)){if(!Number.isInteger(n)||n<0||n>max)throw Error('สกิลอาวุธไม่ถูกต้อง');if(raw.skillVersion===4){if(!WEAPON_SKILLS[id])throw Error('สกิลอาวุธไม่ถูกต้อง');if(n)p[field][id]=n}else if(!/^(sword|spear|hammer|axe|bow|crossbow|gun|wand|staff|tome|dagger|claw|star)_[1-4]_(active|buff|passive)_[0-2]$/.test(id))throw Error('สกิลเก่าไม่ถูกต้อง')}}
 ensureBaselineSkills(p);
 if(raw.skillVersion===4&&raw.weaponLoadout!==undefined){if(!Array.isArray(raw.weaponLoadout)||raw.weaponLoadout.length!==4)throw Error('ช่องสกิลไม่ถูกต้อง');for(let i=0;i<4;i++){const row=raw.weaponLoadout[i]?.active;if(!Array.isArray(row)||row.length!==1)throw Error('ช่องสกิลไม่ถูกต้อง');const id=row[0];if(id!==null&&(!WEAPON_SKILLS[id]||WEAPON_SKILLS[id].tier!==i+1||!p.weaponSkills[id]))throw Error('สกิลในช่องไม่ถูกต้อง');p.weaponLoadout[i].active=[id]}}
 else p.weaponLoadout[0].active=[(weaponInHand('main',p)||validClass(p).weapons[0])+'_1_active_0'];
 p.skillVersion=4;p.legacySkillBuild=null;p.sp=0;p.secondSP=0;p.swordSkills={};p.secondSkills={};p.skills={};p.skillSlots={q:null,w:null,e:null,r:null};p.promotionTokens=0;p.questState='completed';
}
function skillRankFor(){return 0}
function buffRankFor(){return 0}
function weaponLoadoutBonuses(p=player){const out={atk:0,def:0,spd:0,str:0,dex:0,int:0,luk:0,acc:0,cri:0,criDamage:0,ignoreDef:0,reach:0,attackSpeed:0,recovery:0,reduction:0,stance:0,mpDiscount:0,mpRegen:0,mpShield:0,area:0,avoid:0};if(typeof activeFields!=='undefined'&&activeFields.some(f=>f.type==='smoke'&&Math.hypot(p.x-f.x,p.y-20-f.y)<=f.radius))out.avoid=70;return out}
function upgradeWeaponChance(target){return target<=5?100:target<=10?80:target<=15?65:target<=20?50:target<=25?40:30}
function learnOrUpgradeWeaponSkill(id){const d=WEAPON_SKILLS[id],lv=player.weaponSkills[id]||0;if(!d||!player.skillScrolls[id]||lv>=30)return false;player.skillScrolls[id]--;if(!player.skillScrolls[id])delete player.skillScrolls[id];const success=!lv||Math.random()*100<upgradeWeaponChance(lv+1);if(success)player.weaponSkills[id]=lv+1;save();toast(success?'สำเร็จ · '+d.name+' Lv.'+player.weaponSkills[id]:'อัปไม่สำเร็จ · เลเวลเดิมยังอยู่');return success}
function rollSkillScroll(tier){const pool=Object.values(WEAPON_SKILLS).filter(d=>d.tier===tier);return pool[Math.floor(Math.random()*pool.length)].id}
function equipPooledSkill(id,index=0){const d=WEAPON_SKILLS[id];if(!d||!weaponSkillEnabled(id))return false;stopActiveChannels();player.weaponLoadout[d.tier-1].active[index]=id;save();return true}
function useAdvancementMark(){const tier=player.advancementMark;if(!tier||tier!==player.classTier+1||player.level<SKILL_MIN_LEVEL[tier])return;modal('ใช้ตราเลื่อนขั้น '+tier+'?','ปลดล็อกช่องสกิลขั้น '+tier+' ของอาชีพเดิม',[['ยืนยันเลื่อนขั้น',()=>{player.classTier=tier;player.advancementMark=0;save();closeModal();if(!$('characterOverlay').hidden)renderCharacterWindow();updateUI();toast('เลื่อนเป็นขั้น '+tier+' แล้ว')},true]])}


