'use strict';
const activeGrid=document.querySelector('.skill-grid'),combatBars=document.createElement('div');combatBars.className='combat-hotbars';activeGrid.before(combatBars);combatBars.append(activeGrid);
for(const [i,b]of [...activeGrid.children].entries()){const key=document.createElement('small');key.className='hotkey-label';key.textContent='QWER'[i];b.append(key);b.append(document.createElement('em'));b.onpointerdown=e=>{if(b.disabled)return;e.preventDefault();b.setPointerCapture(e.pointerId);keys['Key'+'QWER'[i]]=true;castAssignedSkill('qwer'[i])};for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,()=>keys['Key'+'QWER'[i]]=false);b.onclick=e=>{if(e.detail===0)castAssignedSkill('qwer'[i])}}
document.querySelector('.character-window').append(document.querySelector('.money-panel'));


