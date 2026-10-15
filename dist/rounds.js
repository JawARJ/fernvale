'use strict';
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
 if(m.elite)run.eliteKills++;else if(m.boss)run.bossKills++;
 if(!run.trial&&!run.tutorial&&!m.elite){run.eliteProgress++;if(run.eliteProgress>=100){run.eliteProgress-=100;run.eliteSpawns++;spawnElite()}}m.respawnAt=run.time+2;

}
function spawnElite(){
 const s=stageById(run.id),x=clamp(player.x+220,150,worldWidth()-150);
 monsters.push({id:'elite-'+run.eliteSpawns,level:s.level,elite:true,boss:false,x,y:420,p:0,home:x,low:100,high:worldWidth()-100,dir:-1,hp:s.hp*5,max:s.hp*5,atk:s.atk*2,def:Math.min(95,Math.round(s.def*1.5)),avoid:Math.min(50,s.avoid+5),exp:s.exp*5,dead:0,hit:0,phase:0});
 toast('ELITE ปรากฏตัว!');
}
function updateRound(){
 if(run.trial||run.finished)return;
 for(const m of monsters){
  if(!run.tutorial&&m.dead&&!m.boss&&!m.elite&&run.time>=m.respawnAt){m.dead=0;m.lootDropped=false;m.hp=m.max;m.x=m.home;m.hit=0;if(run.layout)m.y=platformSurface(platforms[m.p],m.x)}
 }
}
