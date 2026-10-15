'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{promisify}=require('node:util');
const {createRuntime}=require('./runtime.cjs'),codec=require('../dist/state-codec.js'),scrypt=promisify(crypto.scrypt);
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.woff2':'font/woff2','.txt':'text/plain'};
function createGameServer({dataDir=process.env.DATA_DIR||path.join(__dirname,'data'),allowedOrigins=(process.env.ALLOWED_ORIGINS||'https://fernvale-adventure.ochremouse32.chatgpt.site').split(','),maxAccounts=Number(process.env.MAX_ACCOUNTS)||100}={}){
 fs.mkdirSync(dataDir,{recursive:true});const file=path.join(dataDir,'accounts.json'),temp=file+'.tmp',lock=path.join(dataDir,'server.lock');
 // One process owns this disk store. Refuse a second writer, including during deployment.
 let lockFD;try{lockFD=fs.openSync(lock,'wx');fs.writeSync(lockFD,String(process.pid))}catch{let pid=0;try{pid=Number(fs.readFileSync(lock,'utf8'));process.kill(pid,0)}catch(e){if(e.code==='ESRCH'){fs.unlinkSync(lock);return createGameServer({dataDir,allowedOrigins,maxAccounts})}}throw Error('Data directory already in use; do not run multiple replicas')}
 let db={version:1,accounts:[]};if(fs.existsSync(file)){db=JSON.parse(fs.readFileSync(file,'utf8'));if(db.version!==1||!Array.isArray(db.accounts))throw Error('Invalid server database')}
 const games=new Map(),limits=new Map();let dirty=false,storageError=null,closed=false;
 for(const a of db.accounts)if(a.checkpoint)games.set(a.id,createRuntime({checkpoint:a.checkpoint}));
 function persist(){if(closed)return;try{for(const a of db.accounts){const g=games.get(a.id);if(g)a.checkpoint=g.checkpoint()}const fd=fs.openSync(temp,'w',0o600);try{fs.writeFileSync(fd,JSON.stringify(db));fs.fsyncSync(fd)}finally{fs.closeSync(fd)}fs.renameSync(temp,file);dirty=false;storageError=null}catch(e){storageError=e;throw e}}
 function rate(key,max,ms){const now=Date.now(),old=limits.get(key);if(!old||now-old.start>ms){limits.set(key,{start:now,n:1});return true}return ++old.n<=max}
 function hash(token){return crypto.createHash('sha256').update(token).digest('hex')}
 function issue(a){const token=crypto.randomBytes(32).toString('base64url');a.tokens=(a.tokens||[]).filter(t=>t.until>Date.now()).slice(-3);a.tokens.push({hash:hash(token),until:Date.now()+30*86400000});return token}
 function account(req){const token=req.headers.authorization?.replace(/^Bearer /,'');if(!token)return null;const h=hash(token);return db.accounts.find(a=>a.tokens?.some(t=>t.hash===h&&t.until>Date.now()))}
 function packet(a){const g=games.get(a.id);return {account:a.username,state:codec.encode(g.engine.snapshot()),serverTime:Date.now(),storageHealthy:!storageError}}
 function reply(res,status,body){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(body))}
 const server=http.createServer(async(req,res)=>{
  try{
   const origin=req.headers.origin;if(origin){const own=`http://${req.headers.host}`;const ownTLS=`https://${req.headers.host}`;if(![own,ownTLS,...allowedOrigins].includes(origin))return reply(res,403,{error:'Origin not allowed'});res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');res.setHeader('Access-Control-Allow-Headers','Authorization, Content-Type');res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS')}
   res.setHeader('X-Content-Type-Options','nosniff');if(req.method==='OPTIONS'){res.writeHead(204);return res.end()}
   const url=new URL(req.url,'http://localhost');
   if(url.pathname==='/api/health')return reply(res,200,{ok:!storageError,engine:'fernvale-authoritative',version:'0.71',background:true});
   if(url.pathname.startsWith('/api/')){
    if(!rate('all:'+req.socket.remoteAddress,2000,10000))return reply(res,429,{error:'Too many requests'});
    let body={};if(req.method==='POST'){let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>16384)return reply(res,413,{error:'Request too large'})}try{body=JSON.parse(raw||'{}')}catch{return reply(res,400,{error:'Invalid JSON'})}}
    if(req.method==='POST'&&['/api/register','/api/login'].includes(url.pathname)){
     if(!rate('auth:'+req.socket.remoteAddress,20,60000))return reply(res,429,{error:'ลองใหม่ในอีก 1 นาที'});
     const username=typeof body.username==='string'?body.username.toLowerCase().trim():'';const password=body.password;if(!/^[a-z0-9_]{3,24}$/.test(username)||typeof password!=='string'||password.length<10||password.length>128)return reply(res,400,{error:'ชื่อ 3–24 ตัว a-z/0-9/_ และรหัสผ่าน 10–128 ตัว'});
     let a=db.accounts.find(a=>a.username===username);
     if(url.pathname==='/api/register'){
      if(a)return reply(res,409,{error:'ชื่อนี้ถูกใช้แล้ว'});if(db.accounts.length>=maxAccounts)return reply(res,503,{error:'เซิร์ฟเวอร์เต็ม'});
      if(!['warrior','shooter','mage','rogue'].includes(body.baseClass))return reply(res,400,{error:'เลือกอาชีพก่อน'});
      const salt=crypto.randomBytes(16).toString('hex'),derived=await scrypt(password,salt,64);if(db.accounts.some(a=>a.username===username))return reply(res,409,{error:'ชื่อนี้ถูกใช้แล้ว'});
      a={id:crypto.randomUUID(),username,salt,password:derived.toString('hex'),tokens:[],checkpoint:null};const g=createRuntime();g.engine.fresh((typeof body.name==='string'?body.name:username).slice(0,24),body.baseClass);games.set(a.id,g);db.accounts.push(a);
     }else{const salt=a?.salt||'invalid-account-salt',derived=await scrypt(password,salt,64);if(!a||!crypto.timingSafeEqual(derived,Buffer.from(a.password,'hex')))return reply(res,401,{error:'ชื่อหรือรหัสผ่านไม่ถูกต้อง'})}
     const token=issue(a);persist();return reply(res,200,{token,...packet(a)});
    }
    const a=account(req);if(!a)return reply(res,401,{error:'กรุณาเข้าสู่ระบบ'});const g=games.get(a.id);
    if(req.method==='GET'&&url.pathname==='/api/state')return reply(res,200,packet(a));
    if(req.method==='POST'&&url.pathname==='/api/logout'){const h=hash(req.headers.authorization.slice(7));a.tokens=a.tokens.filter(t=>t.hash!==h);persist();return reply(res,200,{ok:true})}
    if(req.method==='POST'&&url.pathname==='/api/command'){
     if(storageError)return reply(res,503,{error:'บันทึกข้อมูลไม่ได้ ระบบหยุดไว้เพื่อรักษาเซฟ'});
     if(!rate('cmd:'+a.id,80,1000))return reply(res,429,{error:'ส่งคำสั่งเร็วเกินไป'});
     const client=body.client;if(typeof client!=='string'||client.length>80)return reply(res,400,{error:'Invalid client'});
     if(body.command?.type!=='autoStop'&&g.controller&&g.controller!==client&&Date.now()-g.lastInput<10000)return reply(res,409,{error:'ตัวละครถูกควบคุมจากอีกหน้าต่างอยู่'});
     const actionId=body.actionId;if(actionId!==undefined&&(typeof actionId!=='string'||actionId.length>80))return reply(res,400,{error:'Invalid action ID'});if(actionId&&a.receipts?.includes(actionId))return reply(res,200,packet(a));
     g.controller=client;g.lastInput=Date.now();let result;try{result=g.engine.command(body.command||{})}catch(e){return reply(res,400,{error:e.message})}if(!result)return reply(res,400,{error:'ทำรายการไม่ได้ ตรวจเวลา เงิน MP คูลดาวน์ หรือเงื่อนไขสกิล'});dirty=true;
     if(body.command.type!=='input'){if(actionId)a.receipts=[...(a.receipts||[]),actionId].slice(-100);persist();}return reply(res,200,packet(a));
    }
    return reply(res,404,{error:'ไม่พบคำสั่ง'});
   }
   if(!['GET','HEAD'].includes(req.method))return reply(res,405,{error:'Method not allowed'});
   let pathname;try{pathname=decodeURIComponent(url.pathname)}catch{return reply(res,400,{error:'Invalid path'})}
   const root=path.resolve(__dirname,'../dist'),target=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!target.startsWith(root+path.sep))return reply(res,403,{error:'Forbidden'});
   if(!fs.existsSync(target)||!fs.statSync(target).isFile())return reply(res,404,{error:'Not found'});res.writeHead(200,{'Content-Type':MIME[path.extname(target)]||'application/octet-stream','Cache-Control':'no-cache'});if(req.method==='HEAD')return res.end();fs.createReadStream(target).pipe(res);
  }catch(e){console.error('Request failed:',e.message);if(!res.headersSent)reply(res,500,{error:'เซิร์ฟเวอร์ทำรายการไม่สำเร็จ กรุณาลองใหม่'})}
 });
 let last=performance.now();const timer=setInterval(()=>{if(storageError)return;const now=performance.now(),dt=Math.min((now-last)/1000,.25);last=now;for(const g of games.values()){if(!g.engine.info().active&&Date.now()-(g.lastInput||0)>1500)g.engine.clearInput();if(!g.engine.info().active&&Date.now()-(g.lastInput||0)>10000)continue;try{g.engine.tick(dt);dirty=true}catch(e){g.engine.clearInput();console.error('Simulation stopped:',e.message);g.engine.command({type:'autoStop'});g.lastInput=0}}},50);
 const writer=setInterval(()=>{if(dirty)try{persist()}catch(e){console.error('Persistence failed:',e.message)};for(const[key,value]of limits)if(Date.now()-value.start>60000)limits.delete(key)},1000);
 return {server,games,accounts:db.accounts,persist,async close(){clearInterval(timer);clearInterval(writer);persist();closed=true;fs.closeSync(lockFD);fs.unlinkSync(lock);await new Promise(resolve=>server.close(resolve))}};
}
if(require.main===module){const app=createGameServer(),port=Number(process.env.PORT)||8787;app.server.listen(port,process.env.HOST||'127.0.0.1',()=>console.log(`Fernvale server: http://127.0.0.1:${port}`));for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>app.close().then(()=>process.exit(0)))}
module.exports={createGameServer};
