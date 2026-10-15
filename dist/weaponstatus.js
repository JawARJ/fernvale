'use strict';
function weaponStatusRows(g){return [['ประเภท',WEAPON_NAMES[g.weapon]||'อาวุธ'],['เลเวลอาวุธ','Lv.'+(g.level??(g.stage===4?30:g.stage?g.stage*10:1))],['ATK',String(g.atk||0)],['ความเร็วพื้นฐาน','100'],['การตีบวก','+0']]}
function weaponOptionText(b){return (BONUS_NAMES[b.key]||b.key.toUpperCase())+' +'+b.value+(['cri','criDamage','ignoreDef','damage','bossDamage'].includes(b.key)?'%':'')}
const gearDescriptionBeforeStatus=gearDescription;
gearDescription=function(g){if(!g.weapon)return gearDescriptionBeforeStatus(g);return weaponStatusRows(g).map(([name,value])=>name+' : '+value).join('\n')+'\nOption (สเตตัสพิเศษ)\n'+((g.bonuses||[]).map(weaponOptionText).join('\n')||'ไม่มี')};
function weaponStatusCard(g){
 const card=document.createElement('div');card.className='weapon-status-card';
 const emblem=document.createElement('div');emblem.className='weapon-status-emblem';const icon=document.createElement('span');icon.innerHTML=weaponIcon(g.weapon);
 const quality=document.createElement('span');quality.textContent=LOOT_RARITIES[g.rarity]?.name||'Common';quality.style.color=LOOT_RARITIES[g.rarity]?.color||'#f0e7c8';emblem.append(icon,quality);card.append(emblem);
 const details=document.createElement('dl');for(const [label,value]of weaponStatusRows(g)){const dt=document.createElement('dt');dt.textContent=label;const dd=document.createElement('dd');dd.textContent=value;if(label==='ATK')dd.className='weapon-status-atk';details.append(dt,dd)}card.append(details);
 const options=document.createElement('section');options.className='weapon-status-options';const title=document.createElement('strong');title.textContent='Option (สเตตัสพิเศษ)';options.append(title);
 for(const text of (g.bonuses||[]).length?g.bonuses.map(weaponOptionText):['ไม่มี']){const row=document.createElement('div');row.textContent=text;options.append(row)}card.append(options);
 return card;
}
const showItemBeforeWeaponStatus=showItemDetail;
showItemDetail=function(anchor,item,count,pinned=false){
 if(!item.weapon)return showItemBeforeWeaponStatus(anchor,item,count,pinned);
 showUpgradeTooltip(anchor,item.name||item.item,[],'',pinned);upgradeTooltip.append(weaponStatusCard(item));
 const rect=anchor.getBoundingClientRect(),width=upgradeTooltip.offsetWidth,height=upgradeTooltip.offsetHeight;
 let x=rect.right+10;if(x+width>innerWidth-8)x=rect.left-width-10;
 upgradeTooltip.style.left=Math.max(8,Math.min(innerWidth-width-8,x))+'px';upgradeTooltip.style.top=Math.max(8,Math.min(innerHeight-height-8,rect.top))+'px';
};
const showGearBeforeWeaponStatus=showGearDialog;
showGearDialog=function(g){if(g.slot==='emblem'){showEmblemDialog(g);return}if(!g.weapon)return showGearBeforeWeaponStatus(g);modal(g.name,weaponStatusCard(g),[['สวมมือหลัก',()=>equipWeaponHand(g,'main'),true]])};
