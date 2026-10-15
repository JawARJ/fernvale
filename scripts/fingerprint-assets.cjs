// Fingerprint paths, rather than relying on query strings to invalidate caches.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const dist=path.resolve(__dirname,'../dist'),out=dist;
fs.mkdirSync(out,{recursive:true});
const names=new Map();
for(const name of fs.readdirSync(dist)){
  if(!/\.(js|css)$/.test(name)||/\.[a-f0-9]{16}\.(js|css)$/.test(name))continue;
  const bytes=fs.readFileSync(path.join(dist,name));
  const hash=crypto.createHash('sha256').update(bytes).digest('hex').slice(0,16);
  const target=name.replace(/\.(js|css)$/,`.${hash}.$1`);
  fs.writeFileSync(path.join(out,target),bytes);names.set(name,target);
}
const file=path.join(dist,'index.html');
let html=fs.readFileSync(file,'utf8');
html=html.replace(/(src|href)="(?:assets\/)?([^"/]+?)(?:\.[a-f0-9]{16})?\.(js|css)(?:\?[^" ]*)?"/g,(all,attr,base,ext)=>{
  const target=names.get(`${base}.${ext}`);return target?`${attr}="${target}"`:all;
});
fs.writeFileSync(file,html);
// Only remove obsolete files produced by this script; leave other assets alone.
const keep=new Set(names.values());
for(const name of fs.readdirSync(out))if(/\.[a-f0-9]{16}\.(js|css)$/.test(name)&&!keep.has(name))fs.unlinkSync(path.join(out,name));
console.log(`Fingerprinted ${names.size} JS/CSS assets`);
