'use strict';
let swordWaves=[];
function validateSecondSkills(){return {}}
function secondSkillTree(){return {}}
function resetSecondEffects(){swordWaves=[];player.buffs={}}
function drawBeholder(){}
function tickSecondSkills(dt){tickSwordWaves(dt)}
function tickSwordWaves(dt){for(const w of swordWaves){const ox=w.x;w.x+=w.vx*dt;w.y+=w.vy*dt;w.life-=dt;for(const m of monsters){if(m.dead||w.seen.has(m)||w.seen.size>=w.targets)continue;if(m.x>=Math.min(ox,w.x)-monsterRadius(m)&&m.x<=Math.max(ox,w.x)+monsterRadius(m)&&w.y>=m.y-monsterHeight(m)&&w.y<=m.y+5){w.seen.add(m);hitMonster(m,w.damage)}}}swordWaves=swordWaves.filter(w=>w.life>0&&w.seen.size<w.targets)}
function drawSwordWaves(){for(const w of swordWaves){ctx.save();ctx.translate(w.x,w.y);ctx.rotate(Math.atan2(w.vy,w.vx));ctx.strokeStyle='#ffe7a3';ctx.lineWidth=5;ctx.beginPath();ctx.arc(-12,0,20,-1.1,1.1);ctx.stroke();ctx.strokeStyle='#fff8df';ctx.lineWidth=2;ctx.stroke();ctx.restore()}}
