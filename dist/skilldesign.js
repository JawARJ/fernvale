'use strict';
// Active combat v4. All distances are world units; totals are per target and per round.
let activeProjectiles=[],activeFields=[],activeSummons=[],activeVisuals=[],activeDash=null,activeCastSerial=0;
const skillManaCost=(d,rank=player.weaponSkills[d.id]||1)=>d.tier*(rank+5);
const activeSpeed=()=>clamp((characterStatus().atkspd-100)/90,0,1);
const activeFrequency=(lo,hi)=>lo+(hi-lo)*activeSpeed();
const mobCenter=m=>({x:m.x,y:m.y-monsterHeight(m)/2});
const activeOrigin=()=>({x:player.x,y:player.y-20});
function livingMobs(){return monsters.filter(m=>!m.dead)}
function radialTargets(x,y,r,cap=Infinity,scope='area'){if(scope==='area'){r*=1+supportSum('area')/100;cap+=supportSum('mobCap','count')}if(scope==='search')r*=1+supportSum('search')/100;return livingMobs().filter(m=>{const p=mobCenter(m);return Math.hypot(p.x-x,p.y-y)<=r+monsterRadius(m)}).sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y)).slice(0,cap)}
function frontTargets(range,cap=Infinity,height=90){range*=1+(supportSum('reach')+supportSum('search'))/100;height*=1+supportSum('area')/100;cap+=supportSum('mobCap','count');const o=activeOrigin();return livingMobs().filter(m=>{const p=mobCenter(m),dx=(p.x-o.x)*player.face;return dx>=-monsterRadius(m)&&dx<=range+monsterRadius(m)&&Math.abs(p.y-o.y)<=height/2+monsterRadius(m)}).sort((a,b)=>Math.abs(a.x-o.x)-Math.abs(b.x-o.x)).slice(0,cap)}
function horizontalTargets(range,cap){range*=1+supportSum('area')/100;cap+=supportSum('mobCap','count');const o=activeOrigin();return livingMobs().filter(m=>Math.abs(m.x-o.x)<=range+monsterRadius(m)&&Math.abs(mobCenter(m).y-o.y)<=35+monsterRadius(m)).sort((a,b)=>Math.abs(a.x-o.x)-Math.abs(b.x-o.x)).slice(0,cap)}
function skillContext(d){return {weapon:d.weapon,id:d.id,origin:'manual',direct:true,cast:++activeCastSerial,seenProcs:new Set(),prepared:{...supportState.prepared},attackSnapshot:attackPower(),rounds:new Map(),targetOrder:new Map()}}
function perRoundDamage(d,scale=1){return attackPower()*d.damage/100*scale}
function applyActualDamage(m,damage,label,source={}){if(m.dead||run?.finished||m.training&&!canHitTutorialMonster(source))return false;m.hp=Math.max(0,m.hp-damage);m.hit=.2;floatCombatHit(m,label||String(damage),'#fff1b8');burst(m.x,m.y-18,'#cee9b1',4);if(m.hp<=0){m.dead=1;if(!m.training)player.kills++;if(run){run.kills++;recordKill(m)}supportOnKill(m,source);activeOnKill(m);delete m.supportSlow;delete m.supportWound;delete m.supportSeal;delete m.supportBreak;delete m.supportStar;m.supportLink=0;m.poison=m.executeMark=m.crossMark=m.staffMark=0;m.darkInside=new Set();if(run?.trial&&m.boss)finishStage(true,'clear')}return true}
function combatDamage(m,base,source={}){
 if(m.dead||run?.finished)return false;if(m.training&&!canHitTutorialMonster(source)){floatCombatHit(m,player.tutorialProgress==='useActive'?'ใช้ Active [Q]':'ฝึก Buff ก่อน','#e5d399');return false}source.lastActual=0;const stats=characterStatus();if(Math.random()*100>=monsterHitChance(stats,m)){if(source.hitInfo)source.hitInfo.allHit=false;floatCombatHit(m,'MISS','#b4c3cc');return false}
 const mod=supportDamageModifiers(m,source,false),crit=Math.random()<(stats.cri+mod.cri)/100;
 const inDark=activeFields.some(f=>f.type==='dark'&&Math.hypot(m.x-f.x,mobCenter(m).y-f.y)<=f.radius+monsterRadius(m));
 const bonus=(m.staffMark>0?.2:0)+(inDark?.2:0)+(m.crossMark>0?.2:0),ignore=stats.ignoreDef+mod.ignore+(crit?supportSum('critPierce'):0);
 if(source.origin==='manual'&&source.direct&&source.attackSnapshot)base*=attackPower()/source.attackSnapshot;
 const damage=Math.max(1,Math.round(base*mod.damage*random(.9,1.1)*(crit?stats.criDamage/100:1)*(1+(stats.damage+(m.boss?stats.bossDamage:0))/100)*(1+bonus)*(1-clamp(Math.max(0,(m.def||0)-mod.defReduction)/100*(1-Math.min(100,ignore)/100),0,.95))));
 const wasCrossMarked=m.crossMark>0,wasLinked=m.supportLink>0,actual=Math.min(m.hp,damage);
 applyActualDamage(m,damage,(crit?'CRIT ':'')+damage,source);source.lastActual=actual;if(source.hitInfo){source.hitInfo.totalActual+=actual;source.hitInfo.wasLinked=wasLinked}
 supportAfterHit(m,actual,source);if(source.direct)activeOnDirectHit(m,source);
 if(source.weapon==='crossbow'&&source.direct&&wasCrossMarked)for(const other of livingMobs().filter(n=>n!==m&&n.crossMark>0))applyActualDamage(other,damage,String(damage));return true;
}
function activeOnDirectHit(m,source){
 player.lastActiveTarget=m;if(source.origin!=='manual')return;
 if(m.boss&&m.executeMark>0)for(const id in player.cd)if(WEAPON_SKILLS[id]&&id!==source.id)player.cd[id]=Math.max(0,player.cd[id]-.1);
 if(source.weapon==='wand'&&player.activeToggles?.wand_4_active_0&&!source.proc&&!source.seenProcs?.has(m)){
  source.seenProcs?.add(m);const d=WEAPON_SKILLS.wand_2_active_0;
  activeStrike([m],perRoundDamage(d),4,{...skillContext(d),direct:false,proc:true},'meteor');
 }
}
function activeOnKill(m){if(m.executeMark>0){const marked=radialTargets(m.x,m.y-15,400,4);const source={...skillContext(WEAPON_SKILLS.star_3_active_0),direct:false};for(const target of marked){target.executeMark=10;activeProjectiles.push(makeProjectile('star',m.x,m.y-15,target.x-m.x,target.y-monsterHeight(target)/2-(m.y-15),400,1,1,perRoundDamage(WEAPON_SKILLS.star_3_active_0),source,{homing:target,execute:true}))}}}
function activeStrike(targets,total,hits,source,visual='slash'){
 for(const [order,m]of targets.entries()){
  const direct=source.origin==='manual'&&source.direct&&!source.proc;let round=source.rounds?.get(m)||0;
  if(source.rounds)source.rounds.set(m,round+1);if(source.targetOrder&&!source.targetOrder.has(m))source.targetOrder.set(m,source.targetOrder.size);
  let count=hits,start=0;const stream=direct&&source.id==='gun_4_active_0'&&source.streamIndex!==undefined;if(stream){start=source.streamIndex;count=10;round=source.streamRound}
  const extra=direct?supportSum('extraHit','ratio')+(round===0&&source.prepared?.comboHit?supportSum('comboHit','ratio'):0):0;
  let info={count:count+(extra>0?1:0),targets:source.batchTargets||targets.length,order:source.batchOrder??(targets.length>1?order:source.targetOrder?.get(m)??order),round,totalActual:0,allHit:true,full:m.hp===m.max,indices:new Set()};
  if(stream){source.streamRounds??=new Map();const prev=source.streamRounds.get(m);if(prev?.round===round)info=prev;else source.streamRounds.set(m,info)}source.hitInfo=info;
  for(let i=0;i<hits&&!m.dead;i++){info.first=start+i===0;info.last=start+i===count-1&&extra<=0;combatDamage(m,total/hits,source);info.indices.add(start+i)}
  const finished=start+hits===count;
  if(direct&&finished&&extra>0&&!m.dead){const next={...source,hitInfo:{...info,first:false,last:true,totalActual:0},origin:'extraHit',direct:false,proc:true,primaryHit:true};const landed=combatDamage(m,total/hits*extra/100,next);info.allHit&&=landed;info.totalActual+=next.lastActual||0;info.indices.add(count);source.hitInfo=info}
  info.completed=finished&&info.indices.size===info.count;if(direct)supportAfterRound(m,info,source);
 }
 if(visual==='blade')return;
 if(['impact','meteor','star'].includes(visual)){for(const m of targets){const c=mobCenter(m);activeVisuals.push({type:visual,x:c.x,y:c.y,face:player.face,r:visual==='meteor'?65:25,life:.32})}return}
 const o=activeOrigin();activeVisuals.push({type:visual,x:o.x,y:o.y,face:player.face,r:WEAPON_SKILLS[source.id]?.range||200,life:.32});
}
function makeProjectile(type,x,y,dx,dy,range,cap,hits,total,source,extra={}){
 range*=1+(supportSum('reach')+supportSum('search'))/100;cap+=supportSum('mobCap','count');const length=Math.hypot(dx,dy)||1;return {type,x,y,dx:dx/length,dy:dy/length,range,travel:0,speed:620,cap,hits,total,source,seen:new Set(),life:range/620+1,...extra};
}
function fireProjectile(d,range,cap,hits,extra={},direction=null){const o=activeOrigin(),dir=direction||{x:player.face,y:0};activeProjectiles.push(makeProjectile(d.weapon,o.x,o.y,dir.x,dir.y,range,cap,hits,perRoundDamage(d),skillContext(d),extra))}
function arrowDirection(){const x=(keys.ArrowRight?1:0)-(keys.ArrowLeft?1:0),y=(keys.ArrowDown?1:0)-(keys.ArrowUp?1:0);return x||y?{x,y}:{x:player.face,y:0}}
function skillCooldown(d){if(d.weapon==='staff'&&d.tier<=3&&player.activeBuffs?.staff>0)return 0;if(d.weapon==='wand'&&d.tier===1&&player.activeToggles?.wand_4_active_0)return 0;return (d.cd||0)*(d.weapon==='crossbow'&&d.tier<=3?1-(.01+.44*activeSpeed()):1)}
function heldSkill(id){if(typeof autoFarmActive==='function'&&autoFarmActive())return autoSession.held===id;const index=player.weaponLoadout.findIndex(r=>r.active[0]===id);return index>=0&&keys['Key'+'QWER'[index]]}
function canKeepSkill(id){return weaponSkillEnabled(id)&&(selectedSkillIds('active').includes(id)||typeof autoFarmActive==='function'&&autoFarmActive()&&player.autoFarm.skills.includes(id))}
function castWeaponSkill(id){
 const d=WEAPON_SKILLS[id];if(d?.kind==='buff')return castSupportSkill(id);if(d?.kind==='passive')return false;if(!d||paused||screen!=='play'||run?.finished||!canKeepSkill(id))return false;
 if(player.activeToggles?.[id]){delete player.activeToggles[id];updateUI();return true}
 if(player.charge||player.activeChannel||activeDash)return false;
 if((player.cd.action||0)>0)return queueAction(id);if((player.cd[id]||0)>0)return false;
 if(d.weapon==='fist'&&d.tier===2&&player.ground)return false;
 let target=null;if(d.weapon==='dagger'&&d.tier===3){target=radialTargets(player.x,player.y-20,500,1,'search')[0];if(!target)return false}
 const cost=supportManaCost(skillManaCost(d)*(d.weapon==='wand'&&d.tier<4&&player.activeToggles?.wand_4_active_0?2:1));if(player.mp<cost)return false;
 const fistReset=d.weapon==='fist'&&d.tier===3&&(player.cd.fist_1_active_0>0||player.cd.fist_2_active_0>0);
 player.mp-=cost;supportOnCast(d,cost);beginActionDelay('slashBlast');const cd=skillCooldown(d);
 if((d.weapon==='staff'&&[2,3].includes(d.tier))||(d.weapon==='crossbow'&&d.tier===3)||(d.weapon==='spear'&&d.tier===4)||(d.weapon==='hammer'&&d.tier===3)){
  if(d.weapon==='staff'&&player.activeBuffs?.staff>0){const max=d.tier===2?2:3;releaseChargedSkill({d,elapsed:max,max,cd:0});return true}
  player.charge={d,elapsed:0,cd,max:d.weapon==='staff'?(d.tier===2?2:3):d.weapon==='crossbow'?2:d.weapon==='spear'?1.5:3,baseImmobile:['staff','hammer'].includes(d.weapon),immobile:['staff','hammer'].includes(d.weapon)&&!supportFind('walkCharge')};updateUI();return true;
 }
 if(d.weapon==='sword'&&d.tier===3||d.weapon==='gun'&&d.tier===4){
  player.activeChannel={id,d,elapsed:0,timer:0,cd,source:skillContext(d)};if(d.weapon==='gun')player.cd[id]=cd;updateUI();return true;
 }
 player.cd[id]=cd;
 if(d.cd===null){player.activeToggles??={};player.activeToggles[id]={manaTimer:0,damageTimer:0,source:skillContext(d)};updateUI();return true}
 performActiveSkill(d,target);
 if(fistReset)for(const tier of [1,2,3])player.cd['fist_'+tier+'_active_0']=0;
 tone(440,.1,'triangle');updateUI();return true;
}
function performActiveSkill(d,target){
 const n=d.tier,o=activeOrigin(),source=skillContext(d),total=perRoundDamage(d),buff=player.activeBuffs?.fist>0?2:1;
 if(d.weapon==='dagger'){
  if(n===1){activeStrike(frontTargets(300,3),total,2,source,'return');player.invuln=Math.max(player.invuln,.42)}
  if(n===2)activeStrike(radialTargets(o.x,o.y,250,6),total,1,source,'circle');
  if(n===3){const before=target.hp;player.x=clamp(target.x-player.face*35,22,worldWidth()-22);player.y=target.y;player.vy=0;player.ground=true;activeStrike([target],total,6,source,'teleport');if(target.dead&&before>0)player.cd[d.id]=0;else if(target.boss&&target.hp<before)player.cd[d.id]=d.cd*.75}
  if(n===4){activeVisuals.push({type:'circle',x:o.x,y:o.y,r:500,life:.5});for(const m of radialTargets(o.x,o.y,500,20)){combatDamage(m,total,source);if(!m.dead){m.poison=Math.min(20,(m.poison||0)+10);m.poisonTimer=0;m.poisonPower=total;m.poisonSource={...source,direct:false}}}}
 }else if(d.weapon==='star'){
  if(n<=3)fireProjectile(d,400,n===2?8:1,n===1?2:1,{push:n===2,execute:n===3});
  if(n===4)fireProjectile(d,400,Infinity,0,{placed:true,radius:80});
 }else if(d.weapon==='fist'){
  if(n===1){activeStrike(livingMobs().filter(m=>Math.abs(m.x-player.x)<60&&m.y<=player.y+20&&player.y-m.y<=150+monsterHeight(m)).slice(0,3*buff),total*buff,buff,source,'uppercut');player.vy=-Math.sqrt(2*GRAVITY*150);player.ground=false}
  if(n===2){activeDash={d,source,fromX:player.x,fromY:player.y,dx:player.face/Math.sqrt(2),dy:1/Math.sqrt(2),distance:300,travel:0,speed:800,seen:new Set(),cap:3*buff,hits:buff,total:total*buff,carry:true};player.ground=false}
  if(n===3)activeStrike(frontTargets(300,6*buff),total*buff,3*buff,source,'beam');
  if(n===4){player.activeBuffs??={};player.activeBuffs.fist=10}
 }else if(d.weapon==='wand'){
  if(n===1)fireProjectile(d,300,2,2);
  if(n===2){const m=radialTargets(o.x,o.y,300,1,'search')[0];if(m)activeStrike([m],total,8,source,'meteor')}
  if(n===3){const platform=platforms.filter(p=>player.x>=p.x&&player.x<=p.x+p.w).sort((a,b)=>Math.abs(platformSurface(a,player.x)-player.y)-Math.abs(platformSurface(b,player.x)-player.y))[0];if(platform)activeProjectiles.push(makeProjectile('rolling',o.x,o.y,player.face,0,Infinity,15,1,total,source,{life:15,platform,epoch:0,bossEpoch:new Map(),speed:260*(1+.9*activeSpeed())}))}
 }else if(d.weapon==='staff'){
  if(n===1)activeStrike(frontTargets(400,6,150).filter(m=>{const c=mobCenter(m);return Math.abs(c.y-o.y)<=75*Math.max(0,(m.x-o.x)*player.face)/400+monsterRadius(m)}),total,1,source,'scythe');
  if(n===4){player.activeBuffs??={};player.activeBuffs.staff=5;for(const tier of [1,2,3])player.cd['staff_'+tier+'_active_0']=0}
 }else if(d.weapon==='tome'){
  if(n===1)activeFields.push({id:++activeCastSerial,type:'spiral',x:o.x,y:o.y,radius:0,maxRadius:800,life:3,elapsed:0,seen:new Set(),total,source});
  if(n===2||n===3)addActiveField(n===2?'light':'dark',o.x,o.y,250,10,total,n===2?3:1,source);
  if(n===4){const targets=radialTargets(o.x,o.y,400);for(const m of targets){combatDamage(m,total,source);const type=Math.random()<.5?'light':'dark',stage=type==='light'?2:3;addActiveField(type,m.x,m.y-15,85,5,perRoundDamage(WEAPON_SKILLS['tome_'+stage+'_active_0'],.34),type==='light'?3:1,{...source,direct:false})}}
 }else if(d.weapon==='bow'){
  if(n===1)fireProjectile(d,600,1,1,{blastRadius:150,blastCap:3});
  if(n===2)activeStrike(radialTargets(o.x+player.face*150,o.y,400,15),total,1,source,'rain');
  if(n>=3)activeSummons.push({type:n===3?'fairy':'turret',x:player.x,y:player.y-60,face:player.face,range:600,life:n===3?30:10,timer:0,total,source});
 }else if(d.weapon==='crossbow'){
  if(n===1)fireProjectile(d,800,8,1);
  if(n===2){jumpForSkill();fireProjectile(d,400,1,1,{blastRadius:200,blastCap:6,platformExplosion:true},{x:player.face,y:.7})}
  if(n===4)for(const m of radialTargets(o.x,o.y,800,15))m.crossMark=10;
 }else if(d.weapon==='gun'){
  if(n===1){jumpForSkill();fireProjectile(d,300,1,2,{}, {x:player.face,y:.7})}
  if(n===2)activeStrike(radialTargets(o.x,o.y,400,10),total,1,source,'circle');
  if(n===3){const m=frontTargets(400,1)[0];if(m){activeDash={d,source,dx:player.face,dy:0,distance:Math.max(0,Math.abs(m.x-player.x)-monsterRadius(m)-28),travel:0,speed:900,seen:new Set(),cap:0,hits:0,total:0,smoke:total};player.vy=0}else{activeStrike(radialTargets(o.x,o.y,200,5),total,1,source,'blast');addActiveField('smoke',o.x,o.y,200,10,0,0,source)}}
 }else if(d.weapon==='sword'){
  if(n===1)activeStrike(frontTargets(200,3),total,3,source);
  if(n===2)fireProjectile(d,600,8,1,{},arrowDirection());
  if(n===4){const aim=o.x+player.face*400,candidates=livingMobs();const m=candidates.sort((a,b)=>Math.abs(a.x-aim)-Math.abs(b.x-aim))[0],x=m?m.x:aim;activeStrike(livingMobs().filter(m=>Math.abs(m.x-x)<=90+monsterRadius(m)).slice(0,10),total,6,source,'blade');activeVisuals.push({type:'blade',x,y:0,r:90,life:.8})}
 }else if(d.weapon==='spear'){
  if(n===1){const targets=livingMobs().filter(m=>{const c=mobCenter(m),dx=(c.x-o.x)*player.face,dy=c.y-o.y;return dx>=-monsterRadius(m)&&dy<=monsterRadius(m)&&Math.hypot(dx,dy)<=300+monsterRadius(m)}).slice(0,6);activeStrike(targets,total,1,source,'quarter');for(const m of targets)moveControlledMob(m,player.x+player.face*300)}
  if(n===2)activeDash={d,source,dx:player.face,dy:0,distance:400,travel:0,speed:900,seen:new Set(),cap:6,hits:1,total,carry:true,fromX:player.x,fromY:player.y};
  if(n===3){const hits=3+Math.floor(3*activeSpeed());activeStrike(frontTargets(300,6),total,hits,source,'thrust')}
 }else if(d.weapon==='hammer'){
  if(n===1){activeStrike(frontTargets(200,8),total,1,source,'hammer');activeDash={d,source,dx:player.face,dy:0,distance:300,travel:0,speed:900,seen:new Set(),cap:0,hits:0,total:0,bounce:true}}
  if(n===2){if(!player.ground){const ground=platforms.filter(p=>player.x>=p.x&&player.x<=p.x+p.w&&platformSurface(p,player.x)>=player.y).sort((a,b)=>platformSurface(a,player.x)-platformSurface(b,player.x))[0];if(ground)player.y=platformSurface(ground,player.x);player.vy=0;player.ground=true}activeStrike(livingMobs().filter(m=>Math.abs(m.x-player.x)<=50+monsterRadius(m)&&Math.abs(m.y-player.y)<50).slice(0,4),total,1,source,'slam')}
 }
}
function jumpForSkill(){player.vy=-360*characterStatus().jump/100;player.ground=false;player.climbing=false;player.y-=2}
function releaseChargedSkill(c){
 const d=c.d,n=d.tier,o=activeOrigin(),source=skillContext(d),ratio=clamp(c.elapsed/c.max,0,1),total=perRoundDamage(d);
 if(d.weapon==='hammer'&&c.elapsed<1){player.cd.action=0;player.charge=null;return}
 player.cd[d.id]=c.cd;
 if(d.weapon==='staff'){
  const r=n===2?200+200*ratio:100+500*ratio,targets=radialTargets(o.x,o.y,r,n===2?15:Infinity);
  activeStrike(targets,total*(n===2?.5+.5*ratio:1/6+5/6*ratio),1,source,'blast');
  activeVisuals.push({type:'circle',x:o.x,y:o.y,r,life:.5});
  if(n===3)for(const m of targets){m.staffMark=10;if(!m.boss&&!m.dead)m.stun=1.5}
 }else if(d.weapon==='crossbow')fireProjectile(d,400+400*ratio,1,1,{total:total*(.5+.5*ratio)});
 else if(d.weapon==='spear'){const dir=arrowDirection(),len=Math.hypot(dir.x,dir.y);activeDash={d,source,dx:dir.x/len,dy:dir.y/len,distance:300+300*ratio,travel:0,speed:850,seen:new Set(),cap:Infinity,hits:3,total:total*.75*(.5+.5*ratio),explosion:total*.25*(.5+.5*ratio),iframe:true,fromX:player.x,fromY:player.y};player.ground=false}
 else if(d.weapon==='hammer'){const level=Math.min(3,Math.floor(c.elapsed)),r=[0,500,700,900][level];activeStrike(radialTargets(o.x,o.y,r),total*level/3,1,source,'hammer');activeVisuals.push({type:'circle',x:o.x,y:o.y,r,life:.6})}
 player.charge=null;updateUI();
}
function addActiveField(type,x,y,radius,life,total,hits,source){radius*=1+supportSum('area')/100;life*=1+supportSum('fieldDuration')/100;activeFields.push({id:++activeCastSerial,type,x,y,radius,life,total,hits,source,timers:new Map()})}
function moveControlledMob(m,x){if(m.boss)return;const p=platforms[m.p];const lo=Math.max(m.low??22,p?p.x+monsterRadius(m):22),hi=Math.min(m.high??worldWidth()-22,p?p.x+p.w-monsterRadius(m):worldWidth()-22);m.x=clamp(x,lo,hi);if(p)m.y=platformSurface(p,m.x)}
function stopActiveChannels(){if(player.activeChannel?.d.weapon==='sword')player.cd[player.activeChannel.id]=player.activeChannel.cd;player.activeChannel=null;player.charge=null;player.activeToggles={};activeDash=null}
function resetActiveEffects(){activeProjectiles=[];activeFields=[];activeSummons=[];activeVisuals=[];activeDash=null;player.charge=null;player.activeChannel=null;player.activeToggles={};player.activeBuffs={};for(const m of monsters){delete m.poison;delete m.staffMark;delete m.crossMark;delete m.executeMark;m.darkInside=new Set()}}
function tickWeaponEffects(dt){tickSupport(dt);
 for(const key of Object.keys(player.activeBuffs||{}))player.activeBuffs[key]=Math.max(0,player.activeBuffs[key]-dt);
 if(player.charge){const c=player.charge;c.immobile=c.baseImmobile&&!supportFind('walkCharge');c.elapsed=Math.min(c.max,c.elapsed+dt/Math.max(.1,1-supportSum('chargeSpeed')/100));if(!canKeepSkill(c.d.id)||!heldSkill(c.d.id)||c.d.weapon==='staff'&&((c.immobile&&(keys.ArrowLeft||keys.ArrowRight))||c.elapsed>=c.max))releaseChargedSkill(c)}
 if(player.activeChannel){const c=player.activeChannel;c.elapsed+=dt;c.timer-=dt;if(!heldSkill(c.id)||!canKeepSkill(c.id)||c.d.weapon==='sword'&&c.elapsed>5){if(c.d.weapon==='sword')player.cd[c.id]=c.cd;player.activeChannel=null}else while(c.timer<=0){const o=activeOrigin();if(c.d.weapon==='sword'){activeStrike(horizontalTargets(200,6),c.source.attackSnapshot*c.d.damage/100,2,c.source,'orbit');c.timer+=1/activeFrequency(2,4)}else{c.shots??=0;c.source.streamRounds??=new Map();const bulletSource={...c.source,streamIndex:c.shots%10,streamRound:Math.floor(c.shots/10)};c.shots++;activeProjectiles.push(makeProjectile('gun',o.x,o.y,player.face,0,300,Infinity,1,c.source.attackSnapshot*c.d.damage/1000,bulletSource));c.timer+=1/activeFrequency(10,30)}}}
 for(const [id,t]of Object.entries(player.activeToggles||{})){
  if(!canKeepSkill(id)){delete player.activeToggles[id];continue}t.manaTimer+=dt;t.damageTimer-=dt;
  while(t.manaTimer>=1){const cost=skillManaCost(WEAPON_SKILLS[id]);if(player.mp<cost){delete player.activeToggles[id];break}player.mp-=cost;t.manaTimer-=1}
  if(id==='hammer_4_active_0'&&player.activeToggles[id]&&t.damageTimer<=0){t.damageTimer+=.5;activeStrike(horizontalTargets(200,12),t.source.attackSnapshot*WEAPON_SKILLS[id].damage/100,4,t.source,'orbit')}
 }
 for(const m of monsters){m.staffMark=Math.max(0,(m.staffMark||0)-dt);m.crossMark=Math.max(0,(m.crossMark||0)-dt);m.executeMark=Math.max(0,(m.executeMark||0)-dt);m.darkInside=new Set();if(m.poison>0&&!m.dead){const elapsed=Math.min(dt,m.poison);m.poison-=dt;m.poisonTimer=(m.poisonTimer||0)+elapsed;const period=1/activeFrequency(2,4);while(m.poisonTimer>=period&&!m.dead){m.poisonTimer-=period;combatDamage(m,m.poisonPower,m.poisonSource)}}}
 tickActiveDash(dt);tickActiveProjectiles(dt);tickActiveFields(dt);tickActiveSummons(dt);
 for(const v of activeVisuals)v.life-=dt;activeVisuals=activeVisuals.filter(v=>v.life>0);
}
function tickActiveDash(dt){if(!activeDash)return;const a=activeDash,o=activeOrigin(),step=Math.min(a.distance-a.travel,a.speed*dt);player.x=clamp(player.x+a.dx*step,22,worldWidth()-22);player.y=clamp(player.y+a.dy*step,20,420);player.vy=0;a.travel+=step;
 const hits=livingMobs().filter(m=>!a.seen.has(m)&&a.seen.size<a.cap&&segmentDistance(mobCenter(m),o,activeOrigin())<=monsterRadius(m)+30);
 for(const m of hits){a.seen.add(m);activeStrike([m],a.total,a.hits,a.source,'thrust')}if(a.carry)for(const m of a.seen)if(!m.dead)moveControlledMob(m,player.x+a.dx*10);
 player.dashTime=dt*2;player.dashV=0;if(a.iframe)player.invuln=Math.max(player.invuln,dt*3);
 if(a.travel>=a.distance){const at=activeOrigin();if(a.explosion)activeStrike(radialTargets(at.x,at.y,300),a.explosion,1,a.source,'blast');if(a.smoke){activeStrike(radialTargets(at.x,at.y,200,5),a.smoke,1,a.source,'blast');addActiveField('smoke',at.x,at.y,200,10,0,0,a.source)}if(a.bounce){player.vy=-200;player.ground=false}activeDash=null;player.dashTime=0}
}
function segmentDistance(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,length=dx*dx+dy*dy,t=length?clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/length,0,1):0;return Math.hypot(p.x-a.x-dx*t,p.y-a.y-dy*t)}
function explodeProjectile(p){activeStrike(radialTargets(p.x,p.y,p.blastRadius,p.blastCap),p.total,p.hits,p.source,'blast');activeVisuals.push({type:'circle',x:p.x,y:p.y,r:p.blastRadius,life:.45});p.life=0}
function placeRotatingStar(p){addActiveField('rotatingStar',p.x,p.y,80,10,p.total,4,p.source);p.life=0}
function tickActiveProjectiles(dt){
 const current=activeProjectiles;activeProjectiles=[];
 for(const p of current){
  const before={x:p.x,y:p.y};p.life-=dt;
  if(p.homing&&!p.homing.dead){const c=mobCenter(p.homing),len=Math.hypot(c.x-p.x,c.y-p.y)||1;p.dx=(c.x-p.x)/len;p.dy=(c.y-p.y)/len}
  const step=Math.min(p.range-p.travel,p.speed*dt);p.x+=p.dx*step;p.y+=p.dy*step;p.travel+=step;
  if(p.type==='rolling'){const platform=p.platform;const lo=platform.x+10,hi=platform.x+platform.w-10;if(p.x<lo||p.x>hi){p.x=clamp(p.x,lo,hi);p.dx*=-1;p.epoch++}p.y=platformSurface(platform,p.x)-18}
  const candidates=livingMobs().filter(m=>segmentDistance(mobCenter(m),before,p)<=monsterRadius(m)+12).sort((a,b)=>Math.hypot(a.x-before.x,a.y-before.y)-Math.hypot(b.x-before.x,b.y-before.y));
  p.source.batchTargets=Math.min(p.cap,candidates.length);if(p.placed){const boss=candidates.find(m=>m.boss);if(boss){p.x=boss.x;p.y=boss.y-18;placeRotatingStar(p)}else if(p.travel>=p.range)placeRotatingStar(p)}
  else if(p.platformExplosion){const surface=platforms.find(platform=>p.x>=platform.x&&p.x<=platform.x+platform.w&&before.y<=platformSurface(platform,p.x)&&p.y>=platformSurface(platform,p.x));if(surface){p.y=platformSurface(surface,p.x)-10;explodeProjectile(p)}}
  else if(p.blastRadius&&candidates.length){p.x=candidates[0].x;p.y=candidates[0].y-15;explodeProjectile(p)}
  else for(const m of candidates){
   if(p.type==='rolling'){if(m.boss){if(p.bossEpoch.get(m)===p.epoch)continue;p.bossEpoch.set(m,p.epoch)}else if(p.seen.has(m))continue;if(p.quota>=15)break;p.quota=(p.quota||0)+1}else if(p.seen.has(m)||p.seen.size>=p.cap)continue;
   p.seen.add(m);if(p.execute)m.executeMark=10;activeStrike([m],p.total,p.hits,p.source,p.type==='star'?'star':'impact');if(p.push&&!m.dead)moveControlledMob(m,p.x+p.dx*monsterRadius(m));
  }
  if(p.push)for(const m of p.seen)if(!m.dead)moveControlledMob(m,p.x+p.dx*monsterRadius(m));
  if(p.type==='rolling'){if(p.quota>=15)p.life=0}else if(p.travel>=p.range||!p.placed&&p.seen.size>=p.cap)p.life=0;
  if(p.life>0)activeProjectiles.push(p);
 }
}
function tickActiveFields(dt){for(const f of activeFields){
 const elapsed=Math.min(dt,f.life);f.life-=dt;
 if(f.type==='smoke')continue;
 if(f.type==='spiral'){f.elapsed+=dt;f.radius=Math.min(800,f.elapsed/(f.duration||3)*800);const angle=f.elapsed/(f.duration||3)*Math.PI*6,point={x:f.x+Math.cos(angle)*f.radius,y:f.y+Math.sin(angle)*f.radius},before=f.point||{x:f.x,y:f.y};for(const m of livingMobs())if(!f.seen.has(m)&&segmentDistance(mobCenter(m),before,point)<=monsterRadius(m)+20){f.seen.add(m);activeStrike([m],f.total,1,f.source,'impact')}f.point=point;continue}
 const inside=radialTargets(f.x,f.y,f.radius,f.type==='rotatingStar'?15+supportSum('mobCap','count'):Infinity,'fixed'),set=new Set(inside),period=1/activeFrequency(2,4);
 for(const m of f.timers.keys())if(!set.has(m))f.timers.delete(m);
 f.source.batchTargets=inside.length;for(const [batchOrder,m]of inside.entries()){f.source.batchOrder=batchOrder;if(f.type==='dark'){m.darkInside.add(f.id);moveControlledMob(m,m.x+(f.x-m.x)*Math.min(1,elapsed*2))}let timer=f.timers.get(m);if(timer===undefined){activeStrike([m],f.total,f.hits,f.source,'impact');timer=period}else timer-=elapsed;while(timer<=0&&!m.dead){activeStrike([m],f.total,f.hits,f.source,'impact');timer+=period}f.timers.set(m,timer)}
 if(f.life<=0&&f.type==='dark')activeStrike(inside,f.total,3,f.source,'blast');
 }activeFields=activeFields.filter(f=>f.life>0)}
function tickActiveSummons(dt){for(const s of activeSummons){s.life-=dt;s.timer-=dt;if(s.type==='fairy'){s.x=player.x-player.face*35;s.y=player.y-60}if(s.timer<=0){let target=null;const choices=livingMobs().filter(m=>Math.hypot(m.x-s.x,m.y-20-s.y)<=s.range);if(s.type==='fairy')target=choices.sort((a,b)=>Number(b.boss)-Number(a.boss)||Math.abs(a.x-s.x)-Math.abs(b.x-s.x))[0];else target=choices.includes(player.lastActiveTarget)?player.lastActiveTarget:choices.filter(m=>(m.x-s.x)*s.face>=0).sort((a,b)=>Math.abs(a.x-s.x)-Math.abs(b.x-s.x))[0];if(target){target.assistedUntil=supportState.clock+3;combatDamage(target,s.total,{...s.source,direct:false,summon:true});activeVisuals.push({type:'arrowTrail',x:s.x,y:s.y,tx:target.x,ty:target.y-18,r:0,life:.22})}s.timer+=1/activeFrequency(1,5)}}activeSummons=activeSummons.filter(s=>s.life>0)}
function drawActiveEffects(){
 ctx.save();
 for(const f of activeFields){ctx.globalAlpha=.22;ctx.fillStyle=f.type==='dark'?'#674782':f.type==='smoke'?'#d7c5a7':f.type==='rotatingStar'?'#f8d477':'#fff0a5';ctx.beginPath();ctx.arc(f.x,f.y,f.radius,0,Math.PI*2);ctx.fill();ctx.globalAlpha=.7;ctx.strokeStyle=ctx.fillStyle;ctx.lineWidth=3;ctx.stroke();if(f.type==='spiral'&&f.point){ctx.globalAlpha=1;ellipse(f.point.x,f.point.y,13,13,'#fff5ab')}if(['light','dark'].includes(f.type)){ctx.beginPath();ctx.ellipse(f.x,f.y+12,f.radius,f.radius*.22,0,0,Math.PI*2);ctx.stroke()}if(f.type==='rotatingStar'){ctx.save();ctx.translate(f.x,f.y);ctx.rotate(time*6);drawCombatStar(0,0,25);ctx.restore()}}
 ctx.globalAlpha=1;
 for(const p of activeProjectiles){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Math.atan2(p.dy,p.dx));ctx.fillStyle='#ffe9a4';if(p.type==='star'){ctx.rotate(time*12);drawCombatStar(0,0,12)}else if(['wand','rolling'].includes(p.type)){ellipse(0,0,p.type==='rolling'?16:10,p.type==='rolling'?16:10,'#ba9ee0');ellipse(-3,-3,4,4,'#f4e3ff')}else{ctx.strokeStyle=p.type==='sword'?'#b6f2ee':'#ffdc87';ctx.lineWidth=p.type==='gun'?4:3;ctx.beginPath();ctx.moveTo(-22,0);ctx.lineTo(10,0);ctx.stroke();if(p.type!=='gun'){ctx.beginPath();ctx.moveTo(4,-5);ctx.lineTo(11,0);ctx.lineTo(4,5);ctx.stroke()}}ctx.restore()}
 for(const s of activeSummons){if(s.type==='fairy'){ellipse(s.x,s.y,9,12,'#fff0a9');ellipse(s.x-11,s.y,8,5,'#d3f3f1');ellipse(s.x+11,s.y,8,5,'#d3f3f1')}else{rect(s.x-18,s.y+40,36,8,'#866c47');rect(s.x-3,s.y+15,6,30,'#b28e5d');ctx.strokeStyle='#e9d294';ctx.lineWidth=3;ctx.beginPath();ctx.arc(s.x,s.y+15,18,-1.4,1.4);ctx.stroke()}}
 for(const v of activeVisuals){ctx.globalAlpha=clamp(v.life*4,0,1);ctx.strokeStyle='#e5f5bc';ctx.lineWidth=4;ctx.beginPath();if(v.type==='meteor'){ctx.moveTo(v.x,v.y-120);ctx.lineTo(v.x,v.y);ctx.arc(v.x,v.y,35,0,Math.PI*2)}else if(v.type==='rain'){for(let i=-3;i<=3;i++){ctx.moveTo(v.x+v.face*150+i*65,v.y-140);ctx.lineTo(v.x+v.face*150+i*65,v.y+20)}}else if(v.type==='uppercut'){ctx.moveTo(v.x,v.y);ctx.lineTo(v.x,v.y-150)}else if(v.type==='scythe'){ctx.moveTo(v.x,v.y);ctx.lineTo(v.x+v.face*400,v.y-75);ctx.quadraticCurveTo(v.x+v.face*450,v.y,v.x+v.face*400,v.y+75);ctx.closePath()}else if(v.type==='quarter'){ctx.arc(v.x,v.y,300,v.face>0?-Math.PI/2:-Math.PI,v.face>0?0:-Math.PI/2)}else if(v.type==='return'){ctx.moveTo(v.x,v.y);ctx.lineTo(v.x+v.face*300,v.y);ctx.lineTo(v.x,v.y+12)}else if(v.type==='star'){drawCombatStar(v.x,v.y,25)}else if(v.type==='hammer'||v.type==='slam'){ctx.fillStyle='#eadcb3';ctx.fillRect(v.x+v.face*80,v.y-35,36,26);ctx.moveTo(v.x,v.y-50);ctx.lineTo(v.x+v.face*100,v.y)}else if(v.type==='blade'){ctx.fillStyle='#e7efd1';ctx.fillRect(v.x-8,0,16,410);ctx.fillStyle='#cab47c';ctx.fillRect(v.x-45,70,90,8)}else if(v.type==='arrowTrail'){ctx.moveTo(v.x,v.y);ctx.quadraticCurveTo((v.x+v.tx)/2,Math.min(v.y,v.ty)-50,v.tx,v.ty)}else if(['circle','blast','meteor'].includes(v.type)){ctx.arc(v.x,v.y,Math.min(v.r,600),0,Math.PI*2)}else if(v.type==='orbit'){ctx.ellipse(v.x,v.y,200,35,time*0,0,Math.PI*2)}else if(v.type==='beam'||v.type==='thrust'){ctx.moveTo(v.x,v.y);ctx.lineTo(v.x+v.face*Math.min(v.r,600),v.y)}else{ctx.ellipse(v.x+v.face*v.r*.4,v.y,v.r*.5,45,0,-1.4,1.4)}ctx.stroke()}
 ctx.globalAlpha=1;
 if(player.charge){const c=player.charge,x=player.x-50,y=player.y-65;rect(x,y,100,9,'#283c35');rect(x+1,y+1,98*c.elapsed/c.max,7,'#dfc779');ctx.font='12px Thai,Tahoma';ctx.fillStyle='#fff1be';ctx.textAlign='center';ctx.fillText(c.d.name+' '+c.elapsed.toFixed(1)+'s',player.x,y-7)}
 ctx.restore();
}
function drawCombatStar(x,y,r){ctx.fillStyle='#f4d785';ctx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,rr=i%2?r*.3:r;ctx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}ctx.closePath();ctx.fill()}
function tutorialMark(){}
function updateTutorial(){}
function weaponDamageFactor(){return 1}
function onWeaponHit(){}





