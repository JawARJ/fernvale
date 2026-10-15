'use strict';
// Shared by the browser UI and the authoritative Node game runtime.
const AUTO_TIME_ENABLED=false;
const AUTO_TICKET_SECONDS=3600,AUTO_TICKET_PRICE=10000,AUTO_MAX_SECONDS=86400;
function emptyAutoFarm(){return {seconds:0,tickets:0,skills:[null,null,null,null]}}
function validateAutoFarm(raw){
 if(raw===undefined)return emptyAutoFarm();
 if(!raw||!Number.isFinite(raw.seconds)||raw.seconds<0||raw.seconds>AUTO_MAX_SECONDS||!Number.isInteger(raw.tickets)||raw.tickets<0||raw.tickets>9999||!Array.isArray(raw.skills)||raw.skills.length!==4)throw Error('ข้อมูล Auto Farm ไม่ถูกต้อง');
 for(const id of raw.skills)if(id!==null&&WEAPON_SKILLS[id]?.kind!=='active')throw Error('สกิล Auto ไม่ถูกต้อง');
 return {seconds:raw.seconds,tickets:raw.tickets,skills:[...raw.skills]};
}
let autoSession=null;
function autoFarmActive(){return !!autoSession?.running}
function autoTimeText(seconds){const n=Math.max(0,Math.ceil(seconds));return [Math.floor(n/3600),Math.floor(n/60)%60,n%60].map(n=>String(n).padStart(2,'0')).join(':')}
function buyAutoTickets(count=1){if(!AUTO_TIME_ENABLED||player.map!=='town'||!Number.isInteger(count)||count<1||count>9999-player.autoFarm.tickets||player.loot.money<count*AUTO_TICKET_PRICE)return false;player.loot.money-=count*AUTO_TICKET_PRICE;player.autoFarm.tickets+=count;save();return true}
function activateAutoTicket(){if(!AUTO_TIME_ENABLED)return false;if(player.autoFarm.tickets<1||player.autoFarm.seconds+AUTO_TICKET_SECONDS>AUTO_MAX_SECONDS)return false;player.autoFarm.tickets--;player.autoFarm.seconds+=AUTO_TICKET_SECONDS;save();return true}
function setAutoSkill(index,id){if(autoFarmActive()||!Number.isInteger(index)||index<0||index>3||id!==null&&(!weaponSkillEnabled(id)||WEAPON_SKILLS[id]?.kind!=='active'))return false;player.autoFarm.skills[index]=id;save();return true}
function startAutoFarm(){
 if(!run||run.tutorial||run.finished||AUTO_TIME_ENABLED&&player.autoFarm.seconds<=0||!player.autoFarm.skills.some(id=>id&&weaponSkillEnabled(id)))return false;
 stopActiveChannels();queuedAction=null;keys={};autoSession={running:true,mapId:run.id,serial:run.serial,cursor:0,held:null,navigation:null,reason:null};save();return true;
}
function stopAutoFarm(reason='manual'){if(!autoSession?.running)return;autoSession.running=false;autoSession.reason=reason;autoSession.held=null;keys={};queuedAction=null;stopActiveChannels();save()}
function autoSurface(x,y){let best=-1,distance=Infinity;for(let i=0;i<platforms.length;i++){const p=platforms[i];if(x<p.x-8||x>p.x+p.w+8)continue;const d=Math.abs(y-platformSurface(p,x));if(d<distance){best=i;distance=d}}return best}
function autoPath(from,to){
 if(from===to)return [];const edges=platforms.map(()=>[]);
 for(let i=0;i<platforms.length;i++)for(const j of monsterSurfaceRoute(i))if(i!==j)edges[i].push({to:j});
 for(const ladder of ladders){const upper=ladder.upper??autoSurface(ladder.x,ladder.top),lower=ladder.lower??autoSurface(ladder.x,ladder.bottom);if(upper>=0&&lower>=0){edges[lower].push({to:upper,ladder,y:ladder.top});edges[upper].push({to:lower,ladder,y:ladder.bottom})}}
 const queue=[{at:from,path:[]}],seen=new Set([from]);while(queue.length){const {at,path}=queue.shift();for(const edge of edges[at]||[]){if(seen.has(edge.to))continue;const next=[...path,edge];if(edge.to===to)return next;seen.add(edge.to);queue.push({at:edge.to,path:next})}}return null;
}
function autoMoveToward(x,y,index){
 const a=autoSession;if(a.navigation){const nav=a.navigation;if(Math.abs(player.y-nav.y)<2&&!player.climbing){a.navigation=null;return false}const dx=nav.ladder.x-player.x;if(Math.abs(dx)>5){keys[dx>0?'ArrowRight':'ArrowLeft']=true;return false}keys[nav.y<player.y?'ArrowUp':'ArrowDown']=true;return false}
 const here=autoSurface(player.x,player.y),route=autoPath(here,index);if(route===null)return false;
 const next=route[0];if(next?.ladder){const dx=next.ladder.x-player.x;if(Math.abs(dx)>5)keys[dx>0?'ArrowRight':'ArrowLeft']=true;else{a.navigation=next;keys[next.y<player.y?'ArrowUp':'ArrowDown']=true}return false}
 const dx=x-player.x;if(Math.abs(dx)>8){keys[dx>0?'ArrowRight':'ArrowLeft']=true;return false}return Math.abs(player.y-y)<42;
}
function tickAutoFarm(dt){
 if(!autoFarmActive())return;const a=autoSession;
 if(!run||run.tutorial||run.id!==a.mapId||run.serial!==a.serial){stopAutoFarm('mapChanged');return}
 if(AUTO_TIME_ENABLED&&player.autoFarm.seconds<=0){stopAutoFarm('timeExpired');return}
 if(!player.autoFarm.skills.some(id=>id&&weaponSkillEnabled(id))){stopAutoFarm('noSkills');return}
 if(AUTO_TIME_ENABLED){const spent=Math.min(dt,player.autoFarm.seconds);player.autoFarm.seconds=Math.max(0,player.autoFarm.seconds-spent)}keys={};
 if(player.charge){const c=player.charge;a.held=c.elapsed<c.max?c.d.id:null;return}
 if(player.activeChannel){a.held=player.activeChannel.elapsed<3?player.activeChannel.id:null;return}
 a.held=null;if(activeDash)return;
 const loot=drops.filter(d=>Math.abs(d.baseY+4-player.y)<28&&Math.abs(d.x-player.x)<220).sort((x,y)=>Math.abs(x.x-player.x)-Math.abs(y.x-player.x))[0];
 if(loot){autoMoveToward(loot.x,loot.baseY+4,autoSurface(loot.x,loot.baseY+4));return}
 if(run.finished){stopAutoFarm('bossCleared');return}
 const targets=monsters.filter(m=>!m.dead).map(m=>({m,path:autoPath(autoSurface(player.x,player.y),m.p??autoSurface(m.x,m.y))})).filter(t=>t.path!==null).sort((x,y)=>x.path.length*500+Math.abs(x.m.x-player.x)-(y.path.length*500+Math.abs(y.m.x-player.x)));
 const target=targets[0]?.m;if(!target)return;
 const sameRoute=(autoPath(autoSurface(player.x,player.y),target.p??0)||[]).every(edge=>!edge.ladder),dx=target.x-player.x;
 if(!sameRoute||Math.abs(player.y-target.y)>40||Math.abs(dx)>100){autoMoveToward(target.x,target.y,target.p??autoSurface(target.x,target.y));return}
 player.face=dx<0?-1:1;if((player.cd.action||0)>0)return;
 for(let tried=0;tried<4;tried++){
  const i=a.cursor;a.cursor=(i+1)%4;const id=player.autoFarm.skills[i],d=WEAPON_SKILLS[id];
  if(!id||d?.kind!=='active'||!weaponSkillEnabled(id)||player.activeToggles?.[id]||(player.cd[id]||0)>0||player.mp<supportManaCost(skillManaCost(d)))continue;
  if(d.weapon==='fist'&&d.tier===2&&player.ground){jump();a.cursor=i;return}
  a.held=id;if(castWeaponSkill(id))return;a.held=null;
 }
}
