const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const dist=path.resolve(__dirname,'../dist'),html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const urls=[...html.matchAll(/(?:src|href)="([^" ]+\.(?:js|css))"/g)].map(m=>m[1]);
assert.ok(urls.length>30);
for(const url of urls){
  const match=url.match(/^(.+)\.([a-f0-9]{16})\.(js|css)$/);assert.ok(match,url);
  const bytes=fs.readFileSync(path.join(dist,url));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex').slice(0,16),match[2]);
  assert.deepEqual(bytes,fs.readFileSync(path.join(dist,`${match[1]}.${match[3]}`)));
}
console.log(`PASS ${urls.length} referenced assets match source and content hashes`);
