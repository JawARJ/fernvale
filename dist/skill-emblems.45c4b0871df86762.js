'use strict';
// Upgrade materials are independent of the freely selectable equipment Emblem.
const EMBLEM_MATERIAL_CAP=999999999,EMBLEM_BOX_BATCH=1000;
function validateEmblemMaterials(raw){
 if(raw===undefined)return {};if(!raw||typeof raw!=='object'||Array.isArray(raw))throw Error('วัตถุดิบ Emblem ไม่ถูกต้อง');
 const out={};for(const [weapon,count]of Object.entries(raw)){if(!Object.hasOwn(WEAPON_NAMES,weapon)||!Number.isInteger(count)||count<0||count>EMBLEM_MATERIAL_CAP)throw Error('วัตถุดิบ Emblem ไม่ถูกต้อง');if(count)out[weapon]=count}return out;
}
function emblemMaterialName(weapon){return 'Emblem อัปสกิล · '+WEAPON_NAMES[weapon]}
function emblemBoxRange(tier){return [[0,2],[1,3],[2,4],[2,5]][Math.max(1,Math.min(4,tier))-1]}
function skillEmblemWeapons(id){const d=WEAPON_SKILLS[id];if(!d)return [];return d.weapon?[d.weapon]:BASE_CLASSES[d.owner]?[...BASE_CLASSES[d.owner].weapons]:WEAPON_NAMES[d.owner]?[d.owner]:[]}
function skillEmblemCount(weapon,p=player){return p.loot.emblemMaterials?.[weapon]||0}
function upgradeSkillWithEmblem(id,weapon){
 const d=WEAPON_SKILLS[id],rank=player.weaponSkills[id]||0;
 if(storageReadOnly||!d||rank<1||rank>=30||!skillEmblemWeapons(id).includes(weapon)||skillEmblemCount(weapon)<1)return false;
 player.loot.emblemMaterials[weapon]--;if(!player.loot.emblemMaterials[weapon])delete player.loot.emblemMaterials[weapon];
 const success=Math.random()*100<upgradeWeaponChance(rank+1);if(success)player.weaponSkills[id]=rank+1;
 supportOnEquipmentChange();player.hp=Math.min(player.hp,maxHP());player.mp=Math.min(player.mp,maxMP());save();
 toast(success?'สำเร็จ · '+d.name+' Lv.'+(rank+1):'อัปไม่สำเร็จ · Lv.'+rank+' คงเดิม');return success;
}
function openEmblemMaterialBoxes(id,quantity){
 if(storageReadOnly||!Number.isInteger(quantity)||quantity<1||quantity>EMBLEM_BOX_BATCH||boxCount(id)<quantity)return [];
 const [min,max]=emblemBoxRange(equipmentTierForLevel(boxLevel(id))),weapons=Object.keys(WEAPON_NAMES);
 // Reserve worst-case stack space before consuming any box.
 if(weapons.some(w=>skillEmblemCount(w)>EMBLEM_MATERIAL_CAP-quantity*max)){toast('วัตถุดิบ Emblem เต็ม');return []}
 const results=[];player.loot.emblemMaterials??={};
 for(let i=0;i<quantity;i++){const count=min+Math.floor(Math.random()*(max-min+1)),materials={};for(let j=0;j<count;j++){const w=weapons[Math.floor(Math.random()*weapons.length)];materials[w]=(materials[w]||0)+1;player.loot.emblemMaterials[w]=(player.loot.emblemMaterials[w]||0)+1}results.push({materialBox:true,count,materials})}
 consumeBoxes(id,quantity);save();return results;
}
