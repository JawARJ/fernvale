'use strict';
function handlePlayerDeath(){
 if(player.hp>0||screen!=='play')return false;
 const loss=Math.min(player.xp,Math.ceil(needXP()*.1)),tutorial=run?.tutorial;player.xp=Math.max(0,player.xp-loss);stopAutoFarm('death');keys={};resetActiveEffects();
 closeTradePopup();$('characterOverlay').hidden=true;$('modal').hidden=true;controlWindow=null;enchantMessage='';paused=false;
 player.hp=maxHP();if(tutorial)startTutorial();else enterTown();save();toast('เสียชีวิต · EXP -'+loss+' · กลับ'+(tutorial?'ลานฝึก':'หมู่บ้าน'));return true;
}
function changeEmblemType(type){
 if(!WEAPON_NAMES[type])return false;let gear=player.loot.gear.find(g=>g.id===player.loot.equipped.emblem&&g.slot==='emblem');
 if(!gear){if(player.loot.gear.length>=10000)return false;gear={id:crypto.randomUUID(),name:'',slot:'emblem',weapon:null,emblemWeapon:type,stage:0,level:1,rarity:'common',atk:0,def:0,hp:0,mp:0,bonuses:[],enchant:0};player.loot.gear.push(gear);player.loot.equipped.emblem=gear.id}
 gear.emblemWeapon=type;gear.name='Emblem '+WEAPON_NAMES[type];supportOnEquipmentChange();player.hp=Math.min(player.hp,maxHP());player.mp=Math.min(player.mp,maxMP());save();updateUI();return true;
}
function openEmblemChooser(){
 const body=document.createElement('div');body.className='emblem-choice-grid';for(const [type,name]of Object.entries(WEAPON_NAMES)){const button=document.createElement('button');button.innerHTML=weaponIcon(type);const label=document.createElement('span');label.textContent=name;button.append(label);button.setAttribute('aria-label','ใช้ Emblem '+name);button.classList.toggle('selected',equippedEmblemType()===type);button.onclick=()=>{if(changeEmblemType(type)){closeModal();if(!$('characterOverlay').hidden)renderCharacterWindow();toast('ใช้ Emblem '+name)}};body.append(button)}modal('เลือกชนิด Emblem',body,[]);
}
let liveInventoryStamp='';
function updateLivePanels(){
 if(!$('characterOverlay').hidden){const stamp=JSON.stringify([player.loot.boxes,player.consumables,player.loot.gear.length,player.skillScrolls,player.advancementMark]);if(stamp!==liveInventoryStamp){liveInventoryStamp=stamp;const top=$('inventoryGrid').scrollTop;renderInventory(inventoryCategory);$('inventoryGrid').scrollTop=top}$('moneyAmount').textContent=player.loot.money.toLocaleString();const stats=characterStatus();for(const [index,key]of ['hp','mp','atk','atkspd','def'].entries()){const row=$('statusValues').children[index];if(row)row.querySelector('strong').textContent=stats[key]}$('characterAP').textContent='AP '+player.ap}
 if($('modal').classList.contains('enchant-modal')&&!$('modal').hidden){const g=player.loot.gear.find(g=>g.id===enchantSelection);const cost=$('enchantCost'),wallet=$('enchantMoney'),button=$('enchantConfirm');if(g&&cost&&wallet&&button){cost.textContent='ค่าใช้จ่าย: '+(enchantLevel(g)>=20?'—':enchantCost(g).toLocaleString()+' เงิน');wallet.textContent='เงินที่มี: '+player.loot.money.toLocaleString();button.disabled=enchantLevel(g)>=20||player.loot.money<enchantCost(g)||storageReadOnly}}
}
