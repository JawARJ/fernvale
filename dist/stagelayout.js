'use strict';
const lastStageLayouts=new Map();
function platformSurface(p,x){return p.y+(p.yEnd===undefined?0:(p.yEnd-p.y)*Math.max(0,Math.min(1,(x-p.x)/p.w)))}
function makeStageLayout(id,rng=Math.random){
 const width=1600+id*80+Math.floor(rng()*5)*160,layers=2+Math.floor(rng()*3);
 let family=(id+Math.floor(rng()*4))%4;const signature=width+':'+layers+':'+family;
 if(lastStageLayouts.get(id)===signature)family=(family+1)%4;
 lastStageLayouts.set(id,width+':'+layers+':'+family);
 const ledges=[{x:0,y:420,w:width,layer:0}],links=[];
 for(let layer=1;layer<layers;layer++){
  const y=420-layer*105,jitter=Math.floor(rng()*90),margin=70+jitter;
  if(family===0){
   const start=margin,end=width-margin,break1=start+(end-start)*.38,break2=break1+100;
   ledges.push({x:start,y,w:break1-start,layer},{x:break1,y,w:100,yEnd:y-24,layer},{x:break2,y:y-24,w:end-break2,layer});
  }else if(family===1){
   const x=layer%2?margin:Math.floor(width*.2)+jitter;
   ledges.push({x,y,w:width-x-margin,layer});
  }else if(family===2){
   const gap=100+Math.floor(rng()*3)*20,mid=width*(.42+rng()*.16);
   ledges.push({x:40+jitter,y,w:mid-gap/2-40-jitter,layer},{x:mid+gap/2,y,w:width-mid-gap/2-40,layer});
  }else{
   if(layer%2)ledges.push({x:margin,y,w:width*.34,layer},{x:width*.6,y,w:width*.34-margin,layer});
   else ledges.push({x:width*.2+jitter,y,w:width*.6-jitter,layer});
  }
 }
 // Every upper section connects to a reachable lower section, including both sides of gaps.
 for(let i=1;i<ledges.length;i++){
  const upper=ledges[i],choices=ledges.slice(0,i).filter(p=>p.layer<upper.layer&&Math.min(p.x+p.w,upper.x+upper.w)-Math.max(p.x,upper.x)>40);
  const lower=choices.sort((a,b)=>b.layer-a.layer)[0];
  const lo=Math.max(upper.x,lower.x)+20,hi=Math.min(upper.x+upper.w,lower.x+lower.w)-20,x=Math.round(lo+(hi-lo)*(.25+rng()*.5));
  links.push({x,top:platformSurface(upper,x),bottom:platformSurface(lower,x),upper:i,lower:ledges.indexOf(lower)});
 }
 return {width,layers,family,platforms:ledges,ladders:links};
}
function applyStageLayout(){
 const layout=makeStageLayout(run.id);run.layout=layout;platforms=layout.platforms;ladders=layout.ladders;
 const stage=stageById(run.id);
 monsters=[];for(let i=0;i<30;i++){
  const index=i%platforms.length,p=platforms[index],low=p.x+(index?25:200),high=p.x+p.w-25,x=low+(high-low)*(Math.floor(i/platforms.length)+.5)/Math.ceil(30/platforms.length);
  monsters.push({id:i,level:stage.level,x,y:platformSurface(p,x),p:index,home:x,low,high,dir:i%2?1:-1,hp:stage.hp,max:stage.hp,atk:stage.atk,def:stage.def,avoid:stage.avoid,exp:stage.exp,dead:0,hit:0,phase:random(0,6),boss:false});
 }
 run.total=30;player.x=110;player.y=420;resetMotion();camera=0;
}
function drawStageTerrain(){
 cliffPlatform(platforms[0],true);grassEdge(0,420,worldWidth());
 for(const p of platforms.slice(1)){
  const end=p.yEnd??p.y;ctx.save();ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+p.w,end);ctx.lineTo(p.x+p.w,end+32);ctx.lineTo(p.x,p.y+32);ctx.closePath();ctx.fillStyle=getCliffPattern();ctx.fill();ctx.restore();
  if(end===p.y)grassEdge(p.x,p.y,p.w);else for(let x=p.x;x<p.x+p.w;x+=4){const y=platformSurface(p,x);rect(x,y-4,5,7,'#689348');rect(x,y-5,5,2,'#acc375')}
  mushroom(p.x+24,platformSurface(p,p.x+24)-2,.65);mushroom(p.x+p.w-24,platformSurface(p,p.x+p.w-24)-2,.5);
 }
 mushroom(worldWidth()-45,418,1.1);
}
