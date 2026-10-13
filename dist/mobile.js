 'use strict';
const mobileQuery=matchMedia('(pointer:coarse) and (max-width:1100px)');
function syncMobileMode(){document.documentElement.classList.toggle('mobile-play',mobileQuery.matches);keys={};touchPointers.clear();document.querySelectorAll('.touch-held').forEach(b=>b.classList.remove('touch-held'))}
mobileQuery.addEventListener('change',syncMobileMode);syncMobileMode();
function updateMobileHUD(){for(const slot of ['q','w','e','r']){const source=$('hotbar'+slot.toUpperCase()),target=$('touchSkill'+slot.toUpperCase());if(!source||!target)continue;target.textContent=source.querySelector('span').textContent.replace(/^[QWER]\[/,'').replace(']','');target.disabled=source.disabled;target.hidden=!player.skillSlots?.[slot]}}
window.addEventListener('blur',()=>{touchPointers.clear();document.querySelectorAll('.touch-held').forEach(b=>b.classList.remove('touch-held'))});
