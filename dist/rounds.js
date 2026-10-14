'use strict';
// Tuning table: points, EXP bonus, and future item chance. No item roll yet.
const ROUND_GRADES=[
 {rank:'SSS',min:15000,bonus:1,chance:90},
 {rank:'SS',min:10000,bonus:.75,chance:75},
 {rank:'S',min:7000,bonus:.5,chance:60},
 {rank:'A',min:4500,bonus:.35,chance:45},
 {rank:'B',min:2500,bonus:.2,chance:30},
 {rank:'C',min:1000,bonus:.1,chance:15},
 {rank:'D',min:0,bonus:0,chance:5}
];
const monsterRadius=m=>m.elite?42:m.boss?24:14;
const monsterHeight=m=>m.elite?84:m.boss?44:28;
function deleteSlot(i){
 if(!slots[i]||storageReadOnly)return;
 modal('ลบเซฟช่อง '+(i+1)+'?', 'ลบตัวละคร '+slots[i].character.name+' และความคืบหน้าในช่องนี้อย่างถาวร',[['ยกเลิก',closeModal],['สำรองเซฟก่อน',()=>download(bundle(),'Fernvale-backup.json')],['ยืนยันลบเซฟ',()=>{
  const previous=slots[i];slots[i]=null;
  if(!persist()){slots[i]=previous;toast('ลบไม่สำเร็จ ข้อมูลเซฟยังอยู่');return}
  if(activeSlot===i){activeSlot=-1;run=null}
  closeModal();renderSlots();toast('ลบเซฟช่อง '+(i+1)+' แล้ว');
 },true]]);
}
function recordKill(m){
 run.pendingXP+=m.exp;gainXP(m.exp);tutorialMark("attack");rollMonsterLoot(m);save();
 run.combo=run.time-run.lastKill<=5?run.combo+1:1;
 run.lastKill=run.time;run.maxCombo=Math.max(run.maxCombo,run.combo);
 run.comboPoints+=Math.min(100,(run.combo-1)*10);
 if(m.elite)run.eliteKills++;else if(m.boss)run.bossKills++;
 if(!run.trial&&!run.tutorial&&!m.elite){run.eliteProgress++;if(run.eliteProgress>=100){run.eliteProgress-=100;run.eliteSpawns++;spawnElite()}}m.respawnAt=run.time+2;

}
function spawnElite(){
 const s=stageById(run.id),x=clamp(player.x+220,150,worldWidth()-150);
 monsters.push({id:'elite-'+run.eliteSpawns,level:s.level,elite:true,boss:false,x,y:420,p:0,home:x,low:100,high:worldWidth()-100,dir:-1,hp:s.hp*5,max:s.hp*5,atk:s.atk*2,def:Math.min(95,Math.round(s.def*1.5)),avoid:Math.min(50,s.avoid+5),exp:s.exp*5,dead:0,hit:0,phase:0});
 toast('ELITE ปรากฏตัว!');
}
function updateRound(){
 if(run.combo&&run.time-run.lastKill>5)run.combo=0;
 if(run.trial)return;
 for(const m of monsters){
  if(!run.tutorial&&m.dead&&!m.boss&&!m.elite&&run.time>=m.respawnAt){m.dead=0;m.hp=m.max;m.x=m.home;m.hit=0;if(run.layout)m.y=platformSurface(platforms[m.p],m.x)}
 }
}
function calculateResult(r){
 const killPoints=r.kills*100,elitePoints=r.eliteKills*500,bossPoints=r.bossKills*1000;
 const score=killPoints+r.comboPoints+elitePoints+bossPoints;
 const grade=ROUND_GRADES.find(g=>score>=g.min);
 const bonusXP=Math.floor(r.pendingXP*grade.bonus);
 return {...grade,score,killPoints,elitePoints,bossPoints,comboPoints:r.comboPoints,baseXP:r.pendingXP,bonusXP,totalXP:r.pendingXP+bonusXP};
}
function renderRoundResult(result,beforeLevel){
 const rows=[['กำจัดมอนสเตอร์',run.kills+' ตัว',result.killPoints],['คอมโบสูงสุด',run.maxCombo+' COMBO',result.comboPoints],['Elite',run.eliteKills+' ตัว',result.elitePoints],...(run.trial?[['บอส',run.bossKills+' ตัว',result.bossPoints]]:[])];
 $('scoreRows').replaceChildren();
 for(const [label,count,points]of rows){const row=document.createElement('div');row.className='score-row';const detail=document.createElement('span');detail.textContent=label;const small=document.createElement('small');small.textContent=count;detail.append(small);const value=document.createElement('strong');value.textContent=points.toLocaleString();row.append(detail,value);$('scoreRows').append(row)}
 $('resultRank').textContent=result.rank;
 $('resultScore').textContent=result.score.toLocaleString()+' คะแนน';
 const grouped={};for(const type of [...(result.loot?.drops||[]),...(result.loot?.boxes||[])])grouped[type]=(grouped[type]||0)+1;const rewards=Object.entries(grouped);
 $('rewardItems').replaceChildren();for(let i=0;i<20;i++){const reward=rewards[i],cell=document.createElement('div');cell.className='reward-cell';if(reward){const [type,count]=reward;cell.classList.add('reward-box');cell.innerHTML=boxIcon(type);const amount=document.createElement('strong');amount.className='item-count';amount.textContent=count;cell.append(amount);appendBoxLevel(cell,type);cell.setAttribute('aria-label',boxName(type)+' × '+count);attachLootDetail(cell,{name:boxName(type),description:boxDescription(type)+'\nจำนวน '+count+' กล่อง · เปิดได้ในหมวดใช้งาน'});cell.tabIndex=0}else cell.setAttribute('aria-label','ช่องรางวัล '+(i+1)+' ว่าง');$('rewardItems').append(cell)}
if(run.awardedMark){const cell=$('rewardItems').children[rewards.length];cell.className='reward-cell reward-token';cell.innerHTML=promotionTokenIcon();cell.setAttribute('aria-label','ตราเลื่อนขั้น');attachLootDetail(cell,{name:'ตราเลื่อนขั้น '+player.advancementMark,description:'รับแล้วในหมวดใช้งาน · กดใช้เพื่อเลื่อนขั้น'})}
 $('rewardChance').hidden=true;$('rewardChance').textContent='เงิน +'+(result.loot?.money||0).toLocaleString()+' เหรียญเงิน'+' · ดรอป '+(result.loot?.drops.length||0)+' กล่อง · โบนัสเกรด '+(result.loot?.boxes.length||0)+' กล่อง';
 $('resultLevel').textContent=result.beforeLevel;
 $('earnedXP').textContent='EXP +'+result.totalXP.toLocaleString();
 $('resultXPFill').style.width=100*result.beforeXP/xpRequired(result.beforeLevel)+'%';
 $('resultXPText').textContent=result.beforeXP.toLocaleString();

 $('xpBreakdown').textContent='ฟาร์ม '+result.baseXP.toLocaleString()+' + โบนัส '+Math.round(result.bonus*100)+'% ('+result.bonusXP.toLocaleString()+')'+(player.level>beforeLevel?' · Lv. '+beforeLevel+' → '+player.level:'');
}

function comboGrade(combo){return combo>=75?'SSS':combo>=50?'SS':combo>=35?'S':combo>=20?'A':combo>=10?'B':combo>=5?'C':'D'}

let resultAnimationSerial=0;
function animateResultXP(result){const serial=++resultAnimationSerial,owner=run,start=performance.now(),duration=matchMedia('(prefers-reduced-motion: reduce)').matches?350:1500;const initial=result.beforeXP||0,initialLevel=result.beforeLevel||1;function draw(amount){let lv=initialLevel,xp=initial+amount,need=xpRequired(lv);while(xp>=need&&lv<999){xp-=need;lv++;need=xpRequired(lv)}xp=Math.min(xp,need-1);$('resultLevel').textContent=lv;$('resultXPFill').style.width=100*xp/need+'%';$('resultXPText').textContent=Math.floor(xp).toLocaleString()+' / '+need.toLocaleString()}
 function frame(now){if(serial!==resultAnimationSerial||run!==owner||$('resultOverlay').hidden)return;const elapsed=now-start;let amount;if(elapsed<duration){$('resultOverlay').dataset.expPhase='base';$('earnedXP').textContent='EXP มอนสเตอร์ +'+result.baseXP.toLocaleString();amount=result.baseXP*Math.min(1,elapsed/duration)}else if(elapsed<duration+350){$('resultOverlay').dataset.expPhase='baseComplete';amount=result.baseXP}else if(elapsed<duration*2+350){$('resultOverlay').dataset.expPhase='bonus';$('earnedXP').textContent='EXP โบนัส +'+result.bonusXP.toLocaleString();amount=result.baseXP+result.bonusXP*Math.min(1,(elapsed-duration-350)/duration)}else{$('resultOverlay').dataset.expPhase='complete';$('earnedXP').textContent='EXP +'+result.totalXP.toLocaleString();$('resultLevel').textContent=player.level;$('resultXPFill').style.width=100*player.xp/needXP()+'%';$('resultXPText').textContent=player.xp.toLocaleString()+' / '+needXP().toLocaleString();return}draw(amount);requestAnimationFrame(frame)}draw(0);requestAnimationFrame(frame)
}
