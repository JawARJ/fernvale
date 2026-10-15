'use strict';
const ENCHANT_MAX=20;
const ENCHANT_VIEW=Symbol('enchantView');
function enchantLevel(gear){return gear.enchant??0}
function enchantChance(target){return !Number.isInteger(target)||target<1||target>ENCHANT_MAX?0:target<=5?100:target<=10?80:target<=15?60:40}
function enchantDropChance(target){return !Number.isInteger(target)||target<11||target>20?0:target<=15?10:15}
function enchantCost(gear){const target=enchantLevel(gear)+1;return target>ENCHANT_MAX?0:(gear.level??(gear.stage===0?1:gear.stage===4?30:gear.stage*10))*target*1000}
function gearDisplayName(gear){return gear.name+(enchantLevel(gear)>0?' +'+enchantLevel(gear):'')}
function enchantedGear(gear,level=enchantLevel(gear)){
 if(gear[ENCHANT_VIEW])return gear;
 const factor=1+level*.05,out={...gear,bonuses:(gear.bonuses||[]).map(b=>({...b,value:b.value}))};
 for(const key of ['atk','def','hp','mp'])out[key]=Math.round((gear[key]||0)*factor);
 out[ENCHANT_VIEW]=true;return out;
}
function attemptEnchant(id){
 const gear=player.loot.gear.find(g=>g.id===id);if(!gear||enchantLevel(gear)>=ENCHANT_MAX||storageReadOnly)return {ok:false,reason:'ไม่พบอุปกรณ์ หรือตีบวกถึงระดับสูงสุดแล้ว'};
 const target=enchantLevel(gear)+1,cost=enchantCost(gear),chance=enchantChance(target);if(player.loot.money<cost)return {ok:false,reason:'เงินไม่พอ'};
 player.loot.money-=cost;const success=Math.random()*100<chance;let downgraded=false;if(success)gear.enchant=target;else if(enchantDropChance(target)>0&&Math.random()*100<enchantDropChance(target)){gear.enchant=Math.max(0,enchantLevel(gear)-1);downgraded=true;}
 player.hp=Math.min(player.hp,maxHP());player.mp=Math.min(player.mp,maxMP());save();updateUI();return {ok:true,success,downgraded,target,cost,chance,dropChance:enchantDropChance(target),level:enchantLevel(gear)};
}
function ensureEnchantStarter(){
 if(player.starterStored||player.loot.equipped.main)return;
 const starter=equippedItems().find(g=>g.slot==='main'&&g.item);if(!starter)return;
 const gear={id:crypto.randomUUID(),name:starter.item,slot:'main',weapon:starter.weapon,stage:0,level:1,rarity:'common',atk:starter.atk||0,def:starter.def||0,hp:starter.hp||0,mp:starter.mp||0,bonuses:[],enchant:0};
 player.loot.gear.push(gear);player.loot.equipped.main=gear.id;player.starterStored=true;save();
}
