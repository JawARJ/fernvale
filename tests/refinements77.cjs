const {chromium}=require(process.env.PLAYWRIGHT_MODULE),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
const page=await browser.newPage({viewport:{width:1102,height:892}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:8765');await page.locator('#startBtn').click();await page.locator('.slot-main').first().click();await page.locator('#createCharacterBtn').click();
await page.evaluate(()=>{closeModal();player.tutorialCompleted=true;player.tutorialProgress=null;enterTown()});
const tiers=await page.evaluate(()=>{
 const checks=[];for(const [level,tier]of [[9,1],[10,2],[19,2],[20,3],[29,3],[30,4]]){
  const raw={...snapshot(),level,classTier:1,advancementMark:0};const loaded=validateCharacter(raw);
  checks.push(loaded.classTier===tier&&weaponSkillEnabled('sword_'+tier+'_active_0',loaded));
 }
 player.level=9;player.classTier=1;player.xp=0;gainXP(needXP());checks.push(player.level===10&&player.classTier===2);
 player.level=19;player.classTier=2;player.xp=0;gainXP(needXP());checks.push(player.level===20&&player.classTier===3);
 player.level=29;player.classTier=3;player.xp=0;gainXP(needXP());checks.push(player.level===30&&player.classTier===4);
 const old=validateCharacter({...snapshot(),level:10,classTier:4,advancementMark:0});checks.push(old.classTier===4);
 return checks;
});assert.ok(tiers.every(Boolean),JSON.stringify(tiers));console.log('PASS level 10/20/30 unlocks on XP gain and old saves; existing higher tier retained');
const navigation=await page.evaluate(()=>{
 const results=[];player.level=100;player.classTier=4;player.cleared=10;player.autoFarm.skills=[AUTO_NORMAL,null,null,null];
 const original=recordKill;let visited;recordKill=function(m){visited.add(Math.min(...monsterSurfaceRoute(m.p)));return original(m)};
 try{for(let stage=1;stage<=10;stage++){
  beginStage(stage);player.invuln=99999;player.hp=maxHP();player.mp=maxMP();visited=new Set();
  for(const m of monsters)Object.assign(m,{hp:1,max:1,avoid:0,atk:0,exp:0});
  const surfaces=new Set(monsters.map(m=>Math.min(...monsterSurfaceRoute(m.p))));
  startAutoFarm();let climbed=false,minY=420,frames=0;
  for(;frames<60*180&&visited.size<surfaces.size;frames++){update(1/60);climbed||=player.climbing;minY=Math.min(minY,player.y)}
  results.push({stage,climbed,minY,visited:[...visited],expected:[...surfaces],seconds:frames/60,position:[player.x,player.y],nav:autoSession?.navigation?.y});
  stopAutoFarm('test');
 }}finally{recordKill=original}return results;
});for(const result of navigation){assert.equal(result.visited.length,result.expected.length,JSON.stringify(result));assert.ok(result.climbed&&result.minY<400,JSON.stringify(result))}console.log('PASS actual physics: Auto climbs and kills on every connected surface in all 10 stages despite normal 2-second respawns',JSON.stringify(navigation.map(r=>({stage:r.stage,seconds:Math.round(r.seconds)}))));
const interrupted=await page.evaluate(()=>{beginStage(1);player.invuln=99999;const link=ladders[0],top=monsters.find(m=>monsterSurfaceRoute(m.p).includes(link.upper)),bottom=monsters.find(m=>m.p===0);for(const m of monsters){m.dead=1;m.respawnAt=Infinity;m.atk=0;m.exp=0;m.avoid=0}Object.assign(top,{dead:0,hp:1,max:1});startAutoFarm();let i=0;for(;i<6000&&!player.climbing;i++)update(1/60);const began=player.climbing;top.dead=1;top.respawnAt=Infinity;Object.assign(bottom,{dead:0,hp:99999,max:99999});let reached=false,attacked=false,descended=false;for(i=0;i<9000;i++){update(1/60);if(player.y<=link.top+.2&&player.ground)reached=true;if(!reached&&player.cd.attack>0)attacked=true;if(reached&&player.climbing&&keys.ArrowDown)descended=true;if(descended&&player.ground&&Math.abs(player.y-420)<.2)break}stopAutoFarm('test');return {began,reached,attacked,descended,ground:player.ground&&Math.abs(player.y-420)<.2}});assert.ok(interrupted.began&&interrupted.reached&&!interrupted.attacked&&interrupted.descended&&interrupted.ground,JSON.stringify(interrupted));console.log('PASS target death during ascent does not cancel climbing; Auto finishes then descends normally');
await page.evaluate(()=>{enterTown();save()});const data=await page.evaluate(()=>bundle());
for(const viewport of [{width:844,height:390},{width:915,height:412},{width:390,height:844}]){
 const context=await browser.newContext({viewport,isMobile:true,hasTouch:true});await context.addInitScript(data=>localStorage.setItem('fernvale.browser.slots.v2',JSON.stringify(data)),data);
 const mobile=await context.newPage();mobile.on('pageerror',e=>errors.push(e.message));await mobile.goto('http://127.0.0.1:8765');await mobile.locator('#startBtn').tap();await mobile.locator('.slot-main').first().tap();
 await mobile.evaluate(()=>{player.tutorialCompleted=false;player.tutorialProgress='jump';startTutorial();closeModal();refreshTutorialHint()});
 const joy=await mobile.locator('#touchJoystick').boundingBox(),hint=await mobile.locator('#tutorialHint').boundingBox();assert.ok(joy.x>=24&&joy.y+joy.height<=viewport.height-26);assert.ok(hint.y+hint.height<joy.y);assert.ok(hint.height<80,JSON.stringify({viewport,hint}));assert.equal(await mobile.locator('#tutorialStepText').isVisible(),false);
 // Real pointer input on the relocated stick must move the player.
 const before=await mobile.evaluate(()=>player.x);await mobile.mouse.move(joy.x+joy.width/2,joy.y+joy.height/2);await mobile.mouse.down();await mobile.mouse.move(joy.x+joy.width-5,joy.y+joy.height/2);await mobile.waitForTimeout(200);await mobile.mouse.up();assert.ok(await mobile.evaluate(x=>player.x>x+5,before));
 await mobile.locator('#tutorialHelpBtn').tap();assert.equal(await mobile.locator('#modal').isVisible(),true);await mobile.locator('#modalCloseBtn').tap();await mobile.screenshot({path:`test-output/refinements77-mobile-${viewport.width}.png`,fullPage:true});await context.close();
}assert.deepEqual(errors,[]);console.log('PASS landscape/portrait compact tutorial, inset joystick, actual movement and full help dialog');
}finally{await browser.close()}})().catch(error=>{console.error(error);process.exit(1)});
