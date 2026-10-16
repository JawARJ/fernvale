'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),v8=require('node:v8'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../dist');
const files=['rounds','character','interface','sword','upgrades','loot','second','quest','skilldata','loadout','supportdata','skilldesign','support','emblem','stagelayout','auto-core','enchant-core','skill-emblems','game','tutorial','refinements','refinements75'];
const sources=files.map(name=>{let source=fs.readFileSync(path.join(root,name+'.js'),'utf8');if(name==='game'){const marker=source.indexOf("$('startBtn').onclick=");if(marker<0)throw Error('Game startup marker changed; update server adapter');source=source.slice(0,marker);}return {name,source}});
const stateNames=['run','platforms','ladders','monsters','drops','shots','effects','texts','keys','camera','time','runSerial','supportState','swordSwipes','swordWaves','queuedAction','activeProjectiles','activeFields','activeSummons','activeVisuals','activeDash','activeCastSerial','autoSession'];
function makeDOM(){const elements=new Map();const context=new Proxy({},{get:(o,k)=>o[k]??(()=>{})});function el(){return {hidden:true,dataset:{},style:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},getContext:()=>context,focus(){},append(){},prepend(){},replaceChildren(){},querySelector:()=>el(),querySelectorAll:()=>[],getBoundingClientRect:()=>({}),textContent:''}}return {documentElement:{dataset:{release:'0.71'},classList:{toggle(){}}},body:el(),getElementById:id=>{if(!elements.has(id))elements.set(id,el());return elements.get(id)},querySelectorAll:()=>[],querySelector:()=>el(),createElement:()=>el(),addEventListener(){}}}
function createRuntime({character,checkpoint}={}){
 const context=vm.createContext({console,structuredClone,crypto:crypto.webcrypto,URL,Math,Date,Set,Map,document:makeDOM(),window:{addEventListener(){}},location:{href:'http://localhost'},requestAnimationFrame(){},setTimeout(){},clearTimeout(){},innerWidth:960,innerHeight:480,FERNVALE_SERVER:true});
 for(const {name,source}of sources)new vm.Script(source,{filename:name+'.js'}).runInContext(context);
 const bridge=`
 globalThis.enchantMessage='';globalThis.openGM=()=>{};globalThis.gameCameraTarget=()=>0;updateUI=()=>{};refreshTutorialHint=()=>{};updateTutorial=()=>{};tutorialMark=()=>{};hideUpgradeTooltip=()=>{};save=()=>{};toast=()=>{};tone=()=>{};modal=()=>{};floatText=()=>{};floatCombatHit=()=>{};burst=()=>{};
 switchScreen=next=>{screen=next;paused=next!=='play'};closeModal=()=>{paused=false};
 globalThis.engine={
 init(raw){Object.assign(player,validateCharacter(raw));enterTown();},
 fresh(name,baseClass){Object.assign(player,fresh());player.name=name;player.job=player.baseClass=baseClass;player.tutorialCompleted=true;ensureBaselineSkills(player);player.weaponLoadout[0].active[0]=validClass().weapons[0]+'_1_active_0';player.autoFarm.skills[0]=player.weaponLoadout[0].active[0];enterTown();},
 tick(dt){paused=false;screen='play';tickAutoFarm(dt);update(dt);if(AUTO_TIME_ENABLED&&player.autoFarm.seconds<=0)stopAutoFarm('timeExpired');},
 snapshot(){return {player,${stateNames.map(n=>n).join(',')},status:characterStatus(),auto:autoSession};},
 restore(s){Object.assign(player,s.player);${stateNames.map(n=>`${n}=s.${n};`).join('')}keys={};queuedAction=null;paused=false;screen='play';interactables=[];},
 command(c){
  const busy=autoFarmActive();if(busy&&!['autoStop','autoActivate','town'].includes(c.type))throw Error('หยุด Auto ก่อนเปลี่ยนการตั้งค่าหรือควบคุมตัวละคร');
  switch(c.type){
   case 'stage':beginStage(c.id);return run?.id===c.id;
   case 'town':stopAutoFarm('mapChanged');enterTown();return true;
   case 'autoBuy':return buyAutoTickets(c.count);
   case 'autoActivate':return activateAutoTicket();
   case 'autoSkill':return setAutoSkill(c.index,c.id);
   case 'autoStart':return startAutoFarm();
   case 'autoStop':stopAutoFarm('manual');return true;
   case 'equipSkill':return equipPooledSkill(c.id,c.index??0);
   case 'potion':return ['hp','mp'].includes(c.kind)&&usePotion(c.kind);
   case 'buyPotion':return tradePotion(c.id,true,c.count);
   case 'buyBox':return buyShopBoxes(c.kind,c.count);
   case 'openBox':if(!Number.isInteger(c.count)||c.count<1||c.count>100)return false;return openLootBoxes(c.id,c.count).length>0;
   case 'upgradeSkill':if(!WEAPON_SKILLS[c.id]||!(player.skillScrolls[c.id]>0)||player.weaponSkills[c.id]>=30)return false;learnOrUpgradeWeaponSkill(c.id);return true;
   case 'equipGear':{const g=player.loot.gear.find(g=>g.id===c.id);if(!g)return false;if(g.slot==='main'&&!validClass().weapons.includes(g.weapon))return false;stopActiveChannels();equipOwnedGear(g);supportOnEquipmentChange();return true;}
   case 'stat':if(!['str','dex','int','luk'].includes(c.key)||player.ap<1||player[c.key]>=999)return false;player[c.key]++;player.ap--;return true;
   case 'advance':{const t=player.advancementMark;if(!t||t!==player.classTier+1||player.level<SKILL_MIN_LEVEL[t])return false;player.classTier=t;player.advancementMark=0;return true;}
   case 'input':{const allowed=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','KeyC','KeyQ','KeyW','KeyE','KeyR'];const next={};for(const k of allowed)if(c.keys?.includes(k))next[k]=true;keys=next;if(c.press==='Space')jump();if(['KeyZ','KeyX'].includes(c.press))usePotion(c.press==='KeyZ'?'hp':'mp');const i=['KeyQ','KeyW','KeyE','KeyR'].indexOf(c.press);if(i>=0){const id=player.weaponLoadout[i].active[0];if(id)castWeaponSkill(id)}if(c.press==='KeyC')act('attack');if(typeof c.buff==='string'&&SUPPORT_SKILLS[c.buff]?.kind==='buff')castSupportSkill(c.buff);return true;}
   default:throw Error('คำสั่งไม่รองรับ');
  }
 },
 clearInput(){if(!autoFarmActive())keys={};},
 info(){return {active:autoFarmActive(),map:run?.id||null,remaining:player.autoFarm.seconds,kills:player.kills,money:player.loot.money}},
 catalog(){return Object.values(WEAPON_SKILLS).filter(d=>d.kind==='active').map(d=>({id:d.id,name:d.name,weapon:d.weapon,tier:d.tier}))}
 };`;
 new vm.Script(bridge,{filename:'server-bridge.js'}).runInContext(context);
 const engine=context.engine;
 if(checkpoint)engine.restore(v8.deserialize(Buffer.from(checkpoint,'base64')));else if(character)engine.init(character);
 return {engine,context,checkpoint:()=>v8.serialize(engine.snapshot()).toString('base64')};
}
module.exports={createRuntime};
