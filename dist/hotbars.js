// Fixed slot positions keep number keys stable when a slot is empty.
function buffHotbarIds(){return player.weaponLoadout.flatMap(row=>row.buff)}
function completeTutorial(){
 if(!run?.tutorial||run.finished||player.tutorialCompleted)return;
 player.tutorialCompleted=true;
 while(player.level<5)gainXP(needXP()-player.xp);
 for(let i=0;i<10;i++){addBox('secondary',10);(run.droppedBoxes??=[]).push(boxKey('secondary',10))}
 save();finishStage(true,'tutorial');toast('ฝึกสอนสำเร็จ · Lv.'+player.level+' · กล่องสกิลขั้น 1 ×10');
}
const activeGrid=document.querySelector('.skill-grid'),combatBars=document.createElement('div');
combatBars.className='combat-hotbars';activeGrid.before(combatBars);combatBars.append(activeGrid);
const buffGrid=document.createElement('div');buffGrid.className='buff-grid';buffGrid.setAttribute('aria-label','บัฟ 1–8');combatBars.append(buffGrid);
for(let i=0;i<8;i++){const b=document.createElement('button');b.id='buffHotbar'+i;b.innerHTML='<span>ว่าง</span><small class="hotkey-label">'+(i+1)+'</small><em></em>';b.onclick=()=>{const id=buffHotbarIds()[i];if(id)castWeaponSkill(id)};buffGrid.append(b)}
for(const [i,b]of [...activeGrid.children].entries()){const key=document.createElement('small');key.className='hotkey-label';key.textContent='QWER'[i];b.append(key);const cd=document.createElement('em');b.append(cd)}
const previousHotbarUpdate=updateWeaponHUD;
updateWeaponHUD=function(){previousHotbarUpdate();for(const [i,b]of [...activeGrid.children].entries()){const id=player.weaponLoadout[i].active[0];b.querySelector('span').textContent=id?WEAPON_SKILLS[id].name:'ว่าง';b.querySelector('em').textContent=player.cd[id]>0?Math.ceil(player.cd[id]):''}
 buffHotbarIds().forEach((id,i)=>{const b=$('buffHotbar'+i);b.disabled=!id||!weaponSkillEnabled(id)||(player.cd[id]||0)>0;b.querySelector('span').textContent=id?WEAPON_SKILLS[id].name:'ว่าง';b.querySelector('em').textContent=player.cd[id]>0?Math.ceil(player.cd[id]):''})};
window.addEventListener('keydown',e=>{if(e.repeat||screen!=='play'||paused||run?.finished||!$('characterOverlay').hidden||!$('modal').hidden)return;const m=/^(?:Digit|Numpad)([1-8])$/.exec(e.code);if(!m)return;e.preventDefault();const id=buffHotbarIds()[Number(m[1])-1];if(id)castWeaponSkill(id)});
document.querySelector('.character-window').append(document.querySelector('.money-panel'));
