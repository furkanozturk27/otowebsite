const WA='905413579359';
const IMG=(id,w)=>`img/${id}-${w}.webp`;
const tl=n=>n.toLocaleString('tr-TR');
const waLink=m=>`https://wa.me/${WA}?text=${encodeURIComponent(m)}`;
const ICON_CHECK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>';
const ICON_SHIELD='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>';
const WAI='<svg class="wa-ico" viewBox="0 0 32 32" aria-hidden="true"><use href="#i-wa"/></svg>';
const r50=n=>Math.round(n/50)*50;

// ---- LED hexagon ceiling (stüdyonun altıgen tavan ışıkları)
(()=>{const host=document.getElementById('ceiling');if(!host)return;
 const W=1800,H=760,R=46,gap=.1,h=Math.sqrt(3)*R,cols=Math.ceil(W/(R*1.5))+1,rows=Math.ceil(H/h)+1,cx=W/2;
 let out='';const pt=(x,y,a)=>[x+R*Math.cos(a),y+R*Math.sin(a)];
 for(let c=0;c<cols;c++)for(let r=0;r<rows;r++){
  const x=c*R*1.5,y=r*h+(c%2?h/2:0);let d='';
  for(let k=0;k<6;k++){const a1=Math.PI/3*k,a2=Math.PI/3*(k+1),[x1,y1]=pt(x,y,a1),[x2,y2]=pt(x,y,a2);
   const sx=x1+(x2-x1)*gap,sy=y1+(y2-y1)*gap,ex=x2-(x2-x1)*gap,ey=y2-(y2-y1)*gap;d+=`M${sx.toFixed(1)} ${sy.toFixed(1)}L${ex.toFixed(1)} ${ey.toFixed(1)}`}
  const dist=Math.hypot(x-cx,y*1.6),del=(dist*.0011+Math.random()*.35).toFixed(2),o=(.55+Math.random()*.45).toFixed(2);
  out+=`<path d="${d}" style="--d:${del}s;--o:${o}"/>`}
 host.innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMin slice">${out}</svg>`;
 requestAnimationFrame(()=>setTimeout(()=>{host.classList.add('on');document.getElementById('hero').classList.add('lit')},250));
})();

// ---- marquee
(()=>{const B=[['GYEON','Quartz',1],['HIKARI','Pro'],['NASIOL','NL272'],['FIREBALL',''],['MENZERNA',''],['KOCH CHEMIE',''],['GYEON','CanCoat',1]];
 const one=B.map(([n,s,g])=>`<span class="${g?'gy':''}">${n}${s?`<i>${s}</i>`:''}</span>`).join('');
 document.getElementById('mq').innerHTML=one+one;})();

// ---- pricing
const SEG=[
 {k:'binek',t:'Hatchback / Sedan',s:'Egea, Golf, Corolla, 3 Serisi…',m:1,svg:'<svg viewBox="0 0 64 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 18v-4l6-2 8-6h20l10 6 10 2v4"/><circle cx="16" cy="18" r="3.5"/><circle cx="48" cy="18" r="3.5"/></svg>'},
 {k:'suv',t:'SUV / Crossover',s:'Tiguan, X1, 3008, C-HR…',m:1.15,svg:'<svg viewBox="0 0 64 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 18v-6l6-2 6-6h26l8 6 10 2v6"/><circle cx="16" cy="18" r="4"/><circle cx="48" cy="18" r="4"/></svg>'},
 {k:'buyuk',t:'Büyük SUV / Ticari',s:'X5, Range Rover, Amarok, Viano…',m:1.3,svg:'<svg viewBox="0 0 64 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 18V5h40l8 6 8 2v5"/><circle cx="16" cy="18" r="4"/><circle cx="48" cy="18" r="4"/></svg>'},
];
const PROD=[{n:'Gyeon One',y:2,p:12900},{n:'Gyeon Mohs',y:2,p:14900},{n:'Hikari Pro',y:3,p:17900}];
let prodI=0;
const PK=[
 {tg:'İç mekân',t:'Sterilizasyon Paketi',w:'Ailesiyle yolculuk eden, iç mekânı derinlemesine temizlenmiş ve hijyenik bir araç isteyenler için.',p:2750,i:['Detaylı iç temizlik, koltuk ve tavan yıkama','Kumaş yıkama veya deri koltuk temizliği & bakımı','Kolloidal gümüş suyuyla antibakteriyel dezenfeksiyon','Havalandırma ve koku giderme','Randevulu, aynı gün teslim']},
 {tg:'En dengeli seçim',t:'Boya Koruma Paketi',w:'Matlaşmış, harelenmiş boyayı parlatıp bir yıl boyunca zahmetsizce korumak isteyenler için.',p:6900,oldP:7700,pop:1,war:'1 yıl garanti · Gyeon CanCoat',i:['Detaylı dış temizlik & jant arındırma','Demir tozu ve kil (clay bar) uygulaması','3 kademe boya düzeltme ve parlatma','Gyeon CanCoat seramik bazlı boya koruma','6. ay ücretsiz kontrol & garanti belgesi']},
 {tg:'En uzun koruma',t:'Seramik Kaplama Paketi',w:'Parlaklığı yıllarca korumak, aracını zahmetsizce temiz tutmak isteyenler için.',cer:1,i:['Boya Koruma paketindeki tüm hazırlık','Jant demir tozu temizliği','Gerçek cam, 9H sertifikalı seramik kaplama','Kürleme ve LED ışık altında son kontrol','Plakaya kayıtlı dijital garanti belgesi']},
];
const CS=[
 {k:'ic',t:'Detaylı iç temizlik',s:'Koltuk, tavan, taban',p:2000},{k:'steril',t:'Sterilizasyon',s:'Kolloidal gümüş · 1–2 saat',p:900},
 {k:'deri',t:'Deri koltuk bakımı',s:'Derin temizlik ve besleme',p:1500},{k:'pasta',t:'3 kademe pasta & polisaj',s:'Menzerna · Koch Chemie',p:4500},
 {k:'canc',t:'Boya koruma',s:'Gyeon CanCoat · 1 yıl',p:3200},{k:'seramik',t:'Seramik kaplama',s:'Gyeon One · 2 yıl (9H)',p:9900},
 {k:'ppfon',t:'PPF ön paket',s:'Kaput, tampon, çamurluk, ayna',p:24000},{k:'ppfkomple',t:'Komple PPF',s:'Tüm boyalı yüzeyler',p:62000},
 {k:'pianob',t:'Piano black çizik giderme',s:'Konsol ve kaplamalar',p:1200},{k:'far',t:'Far ve stop yenileme',s:'Matlık ve sararma',p:1200},
 {k:'motor',t:'Susuz motor temizliği',s:'Elektroniğe zarar vermeden',p:900},{k:'jant',t:'Jant temizliği & koruma',s:'Demir tozu sökme',p:1500},
 {k:'cam',t:'Cam su itici',s:'6 ay etkili',p:750},{k:'zift',t:'Zift ve reçine temizliği',s:'Boyaya zarar vermeden',p:800},
];
const curSeg=()=>SEG.find(s=>s.k===document.querySelector('input[name=seg]:checked').value);
document.getElementById('seg').innerHTML=SEG.map((s,i)=>`<div class="opt"><input type="radio" name="seg" id="seg-${s.k}" value="${s.k}" ${i?'':'checked'}><label for="seg-${s.k}">${s.svg}<span><b>${s.t}</b><small>${s.s}</small></span></label></div>`).join('');
document.getElementById('svcs').innerHTML=CS.map(s=>`<div class="opt"><input type="checkbox" id="c-${s.k}" value="${s.k}" ${['pasta','seramik'].includes(s.k)?'checked':''}><label for="c-${s.k}"><span class="box">${ICON_CHECK}</span><span class="nm"><b>${s.t}</b><small>${s.s}</small></span><span class="pr" data-p="${s.k}"></span></label></div>`).join('');
function renderPk(){const seg=curSeg();
 document.getElementById('pkGrid').innerHTML=PK.map((p,i)=>{
  const base=p.cer?PROD[prodI].p:p.p,v=r50(base*seg.m),name=p.cer?`${p.t} (${PROD[prodI].n})`:p.t;
  const oldV=p.oldP?r50(p.oldP*seg.m):0,saveV=oldV?oldV-v:0;
  const war=p.cer?`${PROD[prodI].y} yıl garanti · ${PROD[prodI].n}`:p.war;
  return `<div class="pk ${p.pop?'pop':''}">${p.pop?'<span class="ribbon">EN ÇOK TERCİH EDİLEN</span>':''}
  <span class="tg">${p.tg}</span><h3>${p.t}</h3><p class="who">${p.w}</p>
  <div class="amt">${tl(v)} <span>TL’den</span></div>
  ${war?`<span class="war">${ICON_SHIELD}${war}</span>`:''}
  ${saveV?`<div class="pk-specs"><div><small>Teslim süresi</small><b>1 tam gün</b></div><div><small>Paket avantajı</small><b>${tl(saveV)} TL indirim dahil</b></div></div>`:''}
  ${p.cer?`<div class="prod" role="group" aria-label="Seramik ürünü">${PROD.map((x,j)=>`<button type="button" data-prod="${j}" aria-pressed="${j===prodI}"><b>${x.n}</b><small>${x.y} yıl</small></button>`).join('')}</div>`:''}
  <ul>${p.i.map(x=>`<li>${ICON_CHECK}${x}</li>`).join('')}</ul>
  <a class="btn ${p.pop?'btn-gold':'btn-ghost'}" target="_blank" rel="noopener" href="${waLink(`Merhaba, ${name} için randevu almak istiyorum.\nAraç: ${seg.t}\nSitedeki başlangıç fiyatı: ${tl(v)} TL`)}">Bu paketi seç</a>
 </div>`}).join('');
 document.getElementById('pkFoot').textContent=`Fiyatlar ${seg.t} için başlangıç fiyatlarıdır. Net fiyat ücretsiz ön incelemeden sonra verilir.`;
}
document.getElementById('pkGrid').addEventListener('click',e=>{const b=e.target.closest('[data-prod]');if(b){prodI=+b.dataset.prod;renderPk()}});
let shown=0;
function calc(){const seg=curSeg();
 const sel=CS.filter(s=>document.getElementById('c-'+s.k).checked);
 const keys=new Set(sel.map(s=>s.k));
 CS.forEach(s=>document.querySelector(`[data-p="${s.k}"]`).textContent=tl(r50(s.p*seg.m))+' TL');
 let disc=0,discLbl='';
 if(keys.has('pasta')&&keys.has('seramik')){
  const sep=r50(4500*seg.m)+r50(9900*seg.m),pkg=r50(12900*seg.m);
  disc+=sep-pkg;discLbl='Seramik Paketi İndirimi';
 }else if(keys.has('pasta')&&keys.has('canc')){
  const sep=r50(4500*seg.m)+r50(3200*seg.m),pkg=r50(6900*seg.m);
  disc+=sep-pkg;discLbl='Boya Koruma Paketi İndirimi';
 }
 if(keys.has('ic')&&keys.has('steril')){
  const sep=r50(2000*seg.m)+r50(900*seg.m),pkg=r50(2750*seg.m);
  disc+=sep-pkg;discLbl=discLbl?discLbl+' + İç Paket':'Sterilizasyon Paketi İndirimi';
 }
 const rawTotal=sel.reduce((a,s)=>a+r50(s.p*seg.m),0),total=Math.max(0,rawTotal-disc);
 const rows=sel.map(s=>`<li><span>${s.t}</span><span>${tl(r50(s.p*seg.m))} TL</span></li>`);
 if(disc>0)rows.push(`<li class="disc"><span>${discLbl}</span><span>-${tl(disc)} TL</span></li>`);
 document.getElementById('lines').innerHTML=rows.length?rows.join(''):'<li class="empty">Henüz işlem seçmediniz.</li>';
 animate(total);
 document.getElementById('calcWa').href=waLink(`Merhaba, sitenizden fiyat hesapladım.\nAraç: ${seg.t}\nİşlemler: ${sel.map(s=>s.t).join(', ')||'-'}${disc>0?`\nPaket İndirimi: -${tl(disc)} TL`:''}\nTahmini toplam: ${tl(total)} TL\nUygun bir randevu günü öğrenebilir miyim?`);
}
function animate(to){const from=shown,t0=performance.now(),el=document.getElementById('tot');
 const step=now=>{const k=Math.min(1,(now-t0)/450),v=Math.round(from+(to-from)*(1-Math.pow(1-k,3)));el.innerHTML=tl(v)+' <span>TL</span>';if(k<1)requestAnimationFrame(step);else shown=to};requestAnimationFrame(step)}
document.getElementById('fiyatlar').addEventListener('change',e=>{
 if(e.target.id==='c-ppfon'&&e.target.checked)document.getElementById('c-ppfkomple').checked=false;
 if(e.target.id==='c-ppfkomple'&&e.target.checked)document.getElementById('c-ppfon').checked=false;
 if(e.target.id==='c-canc'&&e.target.checked)document.getElementById('c-seramik').checked=false;
 if(e.target.id==='c-seramik'&&e.target.checked)document.getElementById('c-canc').checked=false;
 if(e.target.name==='seg'){renderPk();renderSvc(curZ)}
 calc()});
const clrBtn=document.getElementById('clrBtn');
if(clrBtn)clrBtn.onclick=()=>{CS.forEach(s=>document.getElementById('c-'+s.k).checked=false);calc()};
function showTab(id){[['t-pk','tab-pk'],['t-oz','tab-oz']].forEach(([t,p])=>{const on=p===id;document.getElementById(t).setAttribute('aria-selected',on);document.getElementById(p).hidden=!on})}
document.getElementById('t-pk').onclick=()=>showTab('tab-pk');
document.getElementById('t-oz').onclick=()=>showTab('tab-oz');
window.buildWith=k=>{CS.forEach(s=>document.getElementById('c-'+s.k).checked=s.k===k);showTab('tab-oz');calc();document.querySelector('#fiyatlar .vbar').scrollIntoView({behavior:'smooth',block:'start'})};
renderPk();calc();

// ---- services
const SV=[
 {z:'Boya · Parlaklık',t:'Seramik Kaplama',s:'Gerçek cam, 9H sertifikalı',c:'seramik',img:'1633014041037-f5446fb4ce99',pos:'50% 62%',b:['Gyeon One','Gyeon Mohs','Gyeon Syncro','Hikari Pro','Nasiol NL272','Fireball'],d:'Boyanın üzerinde cam sertliğinde, şeffaf bir koruma katmanı. Su ve kir tutmaz, aracınız kolay temizlenir, parlaklığı yıllarca kalır.',inc:['Detaylı yıkama, demir tozu ve kil','Boya kalınlık ölçümü','Boya düzeltme ve parlatma','9H seramik uygulama ve kürleme'],du:'2–3 gün',w:'3 yıla kadar',p:12900,u:'hizmetler/yozgat-seramik-kaplama/index.html'},
 {z:'Boya · Koruma',t:'Boya Koruma',s:'Gyeon CanCoat · 1 yıl garantili',c:'canc',img:'1708805282676-0c15476eb8a2',pos:'50% 40%',b:['Gyeon CanCoat'],d:'Boya parlatıldıktan sonra uygulanan seramik bazlı koruma. Bütçesini aşmadan aracını bir yıl boyunca korumak isteyenler için en akıllı seçim.',inc:['Detaylı dış temizlik','Demir tozu ve kil uygulaması','Boya düzeltme ve parlatma','Gyeon CanCoat uygulaması'],du:'1 gün',w:'1 yıl',p:6900,u:'hizmetler/yozgat-boya-koruma/index.html'},
 {z:'Boya · Düzeltme',t:'Pasta, Cila & Polisaj',s:'3 kademe, hare ve çizik giderme',c:'pasta',img:'1620584898989-d39f7f9ed1b7',pos:'50% 45%',b:['Menzerna','Koch Chemie'],d:'Otomatik yıkamaların bıraktığı hareler, ince çizikler ve matlık 3 kademede giderilir. Başka yerde yapılmış hatalı polisajları da düzeltiyoruz.',inc:['Panel panel boya kalınlık ölçümü','Kesme, ara kat ve hare alma','Piano black çizik giderme','Hatalı polisaj düzeltme'],du:'1 gün',w:'—',p:4500,u:'hizmetler/yozgat-pasta-cila/index.html'},
 {z:'İç mekân',t:'İç Temizlik & Sterilizasyon',s:'Kolloidal gümüşle antibakteriyel',c:'ic',img:'1605437241278-c1806d14a4d9',pos:'50% 62%',b:['Kolloidal gümüş'],d:'Koltuktan tavana iç mekân derinlemesine temizlenir, ardından kolloidal gümüş suyuyla 1–2 saat süren antibakteriyel dezenfeksiyon yapılır.',inc:['Koltuk yıkama ve tavan temizliği','Deri koltuk temizliği ve bakımı','Kolloidal gümüşle dezenfeksiyon','Havalandırma ve koku giderme'],du:'Yarım gün',w:'—',p:2750,u:'hizmetler/yozgat-ic-temizlik-sterilizasyon/index.html'},
 {z:'Kaput · Tampon',t:'PPF Kaplama',s:'Taşa ve çiziğe karşı şeffaf film',c:'ppfon',img:'1632605166776-7128669886e7',pos:'50% 50%',b:['Kendini onaran TPU film'],d:'Taşa, çiziğe ve kuş pisliğine karşı şeffaf, kendini onaran film. En çok darbe alan ön bölgeyi korur. Eski kaput filmlerini de boyaya zarar vermeden sökeriz.',inc:['Kaput, ön tampon ve çamurluklar','Aynalar ve farlar','Kenar kıvırma işçiliği','Eski kaput filmi sökümü'],du:'2–4 gün',w:'Film üreticisinin garantisi',p:24000,u:'hizmetler/yozgat-ppf-kaplama/index.html'},
 {z:'Far · Jant · Motor',t:'Tamamlayıcı İşlemler',s:'Küçük işler, büyük fark',c:'far',img:'1708805283017-c662be2c7a44',pos:'50% 55%',b:['Aynı gün'],d:'Sararmış farlar, fren tozu tutmuş jantlar, tozlu motor bölmesi… Aracın genel görüntüsünü en hızlı değiştiren işlemler.',inc:['Far ve stop yenileme','Susuz motor temizliği','Jant demir tozu temizliği ve koruma','Cam su itici (6 ay), zift ve reçine temizliği'],du:'1–4 saat',w:'—',p:750,u:''},
];
const svList=document.getElementById('svcList'),svImg=document.getElementById('svcImg'),svCap=document.getElementById('svcCap'),svBody=document.getElementById('svcBody');
svList.innerHTML=SV.map((h,i)=>`<button type="button" role="tab" aria-selected="false" data-i="${i}"><span class="no">0${i+1}</span><span class="nm"><b>${h.t}</b><small>${h.s}</small></span><svg class="ar" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>`).join('');
svList.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(b){renderSvc(+b.dataset.i);if(innerWidth<=1020){b.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});document.getElementById('svcCard').scrollIntoView({behavior:'smooth',block:'nearest'})}}});
let curZ=0;
function renderSvc(i,first){curZ=i;const h=SV[i],seg=curSeg();
 svList.querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-selected',i===j));
 const src=IMG(h.img,1600);
 if(first){svImg.src=src}else if(svImg.getAttribute('src')!==src){svImg.classList.add('fade');const n=new Image();n.onload=n.onerror=()=>{if(curZ!==i)return;svImg.src=src;svImg.style.objectPosition=h.pos;requestAnimationFrame(()=>svImg.classList.remove('fade'))};n.src=src}
 svImg.alt=h.t;svImg.style.objectPosition=h.pos;
 svCap.innerHTML=`<div class="k">${h.z}</div><h3>${h.t}</h3>`;
 svBody.innerHTML=`<div class="swap"><p class="ds">${h.d}</p><div class="brands">${h.b.map(x=>`<span>${x}</span>`).join('')}</div><div class="cols">
  <div class="inc"><small class="lb">Neler dahil</small><ul>${h.inc.map(x=>`<li>${ICON_CHECK}${x}</li>`).join('')}</ul></div>
  <div class="meta">
   <div class="row"><small>Süre</small><b>${h.du}</b></div>
   ${h.w!=='—'?`<div class="row"><small>Garanti</small><b>${h.w}</b></div>`:''}
   <div class="row"><small>Başlangıç<span>${seg.t}</span></small><b class="big">${tl(r50(h.p*seg.m))} TL</b></div>
   <div class="btns"><a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink('Merhaba, '+h.t+' için randevu almak istiyorum.\nAraç: '+seg.t)}">${WAI}Randevu iste</a>
   <button type="button" class="btn btn-ghost" onclick="buildWith('${h.c}')">Diğer işlemlerle hesapla</button>
   ${h.u?`<a class="more" href="${h.u}">${h.t} hakkında her şey →</a>`:''}</div>
  </div></div></div>`}
renderSvc(0,true);
addEventListener('load',()=>SV.forEach(h=>{const n=new Image();n.src=IMG(h.img,1600)}));

// ---- reviews (gerçek Google yorumları)
const RQ=[
 ['Mürsel Ç.','Gyeon paketi','Arkadaşımın tavsiyesiyle 2019 model aracımı Ahmet Bey’e teslim ettim, Gyeon seramik kaplama paketi uyguladık. Araç sıfırından daha parlak ve kusursuz bir görüntüyle 3 gün sonra teslim edildi. Yozgat’a detailing anlamında yeni bir vizyon kazandırdınız.'],
 ['Sametcan K.','Hata düzeltme','İşi bilene yaptıracaksın. Antalya’da yaptırdığım seramik kaplamadaki uygulama hatasını en iyi şekilde düzelterek tekrar seramik kaplama yaptı. Yozgat’a geldiğimde Google’dan araştırıp bularak geldim, gayet memnun ayrıldım.'],
 ['Fatih M.','Ankara’dan geldi','Güler yüzlü ve kaliteli hizmetinizden ötürü teşekkürler. Gerçekten aldığınız paranın hakkını veriyorsunuz. Ankara’dan çıkıp geldiğime hiç pişman olmadım.'],
 ['İhsan K.','Boya koruma','Arkadaşlarımın tavsiyesi üzerine gittim, detaylı temizlik ve boya koruma yaptırdım. Yapılan işlemlere ve kullanılan malzemelere göre fiyatı gayet uygun. Yozgat’ta böyle örnek bir işletme olması güzel.'],
 ['Buğra D.','İç temizlik','Arabamın pedalına ve koltuğuna sakız yapışmıştı, kendim ve birkaç yerde çok uğraştım, çıkaramadım. Burayı önerdiler, tertemiz yapmışlar. Her zaman gideceğim, güvenebildiğim bir yer oldu.'],
 ['Kerim G.','Aksaray’dan geldi','Aksaray’dan geldim, detaylı iç temizlik yaptırdım. Gayet memnun kaldım, yaptıkları işin hakkını veriyorlar.'],
];
const STAR='<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.5L12 17.2l-5.9 3.2 1.3-6.5L2.5 9.3l6.6-.8Z"/></svg>';
const GLOGO='<svg class="g" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.4-.2-2.1H12v3.9h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-7.8Z"/><path fill="#34A853" d="M12 23c3 0 5.4-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.2a11 11 0 0 0 0 9.8l3.6-2.8Z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.1-3.1A11 11 0 0 0 2.2 7.1l3.6 2.8C6.7 7.3 9.1 5.4 12 5.4Z"/></svg>';
document.getElementById('rqGrid').innerHTML=RQ.map(([n,f,q])=>`<figure class="rq"><div class="tp"><span class="st" aria-label="5 yıldız">${STAR.repeat(5)}</span><span class="from">${f}</span></div><blockquote>${q}</blockquote><figcaption><span class="av">${n[0]}</span><span><b>${n}</b><small>Google yorumu</small></span>${GLOGO}</figcaption></figure>`).join('');

// ---- gallery & lightbox
const G=[['1520340356584-f9917d1eea6f','Köpüklü ön yıkama','w2 h2'],['1694678505383-676d78ea3b96','Elle yıkama',''],['1565689876697-e467b6c54da2','Jant temizliği','h2'],['1620584899131-a5ff5f8fbb03','Bantlı polisaj',''],['1632823469850-2f77dd9c7f93','Far PPF uygulaması','w2'],['1708805282683-50a060eba80f','Lastik bakımı',''],['1607860108855-64acf2078ed9','Dış yıkama','']];
const galEl=document.getElementById('gal');
galEl.innerHTML=G.map(([id,c,cl],i)=>`<figure class="rv ${cl}" data-gi="${i}" tabindex="0" role="button" aria-label="${c} fotoğrafını büyüt"><img src="${IMG(id,cl.includes('w2')?1600:800)}" alt="${c}" loading="lazy"><figcaption>${c}</figcaption></figure>`).join('');
(()=>{const lb=document.getElementById('lbox'),lbImg=document.getElementById('lbImg'),lbCap=document.getElementById('lbCap'),lbWa=document.getElementById('lbWa');if(!lb)return;
 let gi=0;
 const openLb=i=>{gi=(i+G.length)%G.length;const [id,c]=G[gi];lbImg.src=IMG(id,1600);lbImg.alt=c;lbCap.textContent=c;lbWa.href=waLink(`Merhaba, "${c}" uygulaması hakkında bilgi ve fiyat almak istiyorum.`);lb.classList.add('open')};
 const closeLb=()=>lb.classList.remove('open');
 galEl.addEventListener('click',e=>{const f=e.target.closest('[data-gi]');if(f)openLb(+f.dataset.gi)});
 galEl.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const f=e.target.closest('[data-gi]');if(f){e.preventDefault();openLb(+f.dataset.gi)}}});
 document.getElementById('lbClose').onclick=closeLb;
 document.getElementById('lbPrev').onclick=()=>openLb(gi-1);
 document.getElementById('lbNext').onclick=()=>openLb(gi+1);
 lb.addEventListener('click',e=>{if(e.target===lb)closeLb()});
 addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')openLb(gi-1);if(e.key==='ArrowRight')openLb(gi+1)});
})();

// ---- warranty lookup (demo kayıtları)
(()=>{const box=document.getElementById('cert'),inp=document.getElementById('wPlate'),demos=document.getElementById('wDemos');
 const DB={
  '66EX066':{car:'BMW 520i · Siyah',prod:'Gyeon Q² Mohs EVO + Ön PPF',daysAgo:112,y:2,no:'EX-66-0314',mic:'Ort. 118 µm · 11 Panel Orijinal'},
  '06ANK06':{car:'Range Rover Evoque · Beyaz',prod:'Hikari Pro 9H Seramik Kaplama',daysAgo:224,y:3,no:'EX-06-0902',mic:'Ort. 124 µm · 11 Panel Orijinal'},
  '66AB123':{car:'VW Passat · Metalik Gri',prod:'Gyeon CanCoat Boya Koruma',daysAgo:64,y:1,no:'EX-66-0620',mic:'Ort. 114 µm · 10 Panel Orijinal'}
 };
 const fmt=d=>d.toLocaleDateString('tr-TR',{day:'2-digit',month:'2-digit',year:'numeric'});
 const norm=s=>s.toUpperCase().replace(/[^0-9A-ZÇĞİÖŞÜ]/g,'').replace(/İ/g,'I');
 const pretty=s=>{const m=s.match(/^(\d{2})([A-Z]{1,3})(\d{2,4})$/);return m?`${m[1]} ${m[2]} ${m[3]}`:s};
 const HEX='<svg viewBox="0 0 24 26" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 1 22.5 7v12L12 25 1.5 19V7Z"/><path d="m8 13 3 3 5-6"/></svg>';
 const ICO_LINK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7.1 7.1l1.7-1.7"/></svg>';
 const ICO_PRN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M6 9V3h12v6"/><rect x="6" y="14" width="12" height="7" rx="1"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/></svg>';
 function show(key,demo){const r=DB[key];box.classList.remove('scan');void box.offsetWidth;box.classList.add('scan');
  if(demos)demos.querySelectorAll('[data-plate]').forEach(b=>b.classList.toggle('on',b.dataset.plate===key));
  if(!r){box.innerHTML=`<div class="empty"><div>${HEX}<b>Kayıt bulunamadı</b><p style="margin:0 0 18px">${pretty(key)} plakasına kayıtlı bir garanti belgesi görünmüyor. Belge numaranızla birlikte WhatsApp’tan yazın, hemen kontrol edelim.</p><a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink('Merhaba, '+pretty(key)+' plakalı aracımın garanti kaydını kontrol etmek istiyorum.')}">${WAI}WhatsApp’tan sor</a></div></div>`;return}
  const now=new Date(),s=new Date(now.getTime()-r.daysAgo*864e5),e=new Date(s);e.setFullYear(s.getFullYear()+r.y);
  const elapsed=Math.max(0,Math.min(1,(now-s)/(e-s))),rem=Math.max(.08,1-elapsed),left=Math.max(0,Math.round((e-now)/864e5));
  const nx=new Date(s);nx.setMonth(nx.getMonth()+6);while(nx<=now)nx.setMonth(nx.getMonth()+6);
  box.innerHTML=`<div class="top"><img src="img/extreme-amblem.svg" alt=""><div><small>${demo?'Örnek dijital sertifika':'Dijital garanti belgesi'}</small><b>No. ${r.no}</b></div></div>
  <div class="plate-row"><div class="plate"><i>TR</i><span>${pretty(key)}</span></div><div class="micron"><small>Boya Kalınlık Kaydı</small><b>${r.mic}</b></div></div>
  <dl><div><dt>Araç</dt><dd>${r.car}</dd></div><div><dt>Uygulama</dt><dd>${r.prod}</dd></div><div><dt>Uygulama tarihi</dt><dd>${fmt(s)}</dd></div><div><dt>Garanti bitişi</dt><dd>${fmt(e)}</dd></div></dl>
  <div class="bar"><div class="t"><span>${r.y} yıllık garanti · Kalan: %${Math.round(rem*100)}</span><b>${tl(left)} gün kaldı</b></div><div class="tr"><i style="--p:0%"></i></div></div>
  <div class="foot"><span class="ok">${ICON_CHECK}Garanti aktif</span><small>Sonraki ücretsiz kontrol: <b style="color:var(--ink)">${fmt(nx)}</b></small></div>
  <div class="c-acts"><button type="button" data-copy="${key}">${ICO_LINK}<span>Satış İlanı Doğrulama Linkini Kopyala</span></button><button type="button" data-print="1">${ICO_PRN}<span>Belgeyi Yazdır / PDF</span></button></div>`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>box.querySelector('.tr i').style.setProperty('--p',(rem*100).toFixed(1)+'%')))}
 box.addEventListener('click',e=>{
  const cb=e.target.closest('[data-copy]');
  if(cb){
   const k=cb.dataset.copy,url=`${location.origin&&location.origin!=='null'?location.origin+location.pathname:'https://extremedetailing.com.tr/'}?plaka=${k}#garanti`;
   if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(url).catch(()=>{});
   const sp=cb.querySelector('span'),orig=sp.textContent;
   sp.textContent='Bağlantı kopyalandı · İlana ekleyebilirsiniz';
   setTimeout(()=>sp.textContent=orig,2600);
  }
  if(e.target.closest('[data-print]'))window.print();
 });
 document.getElementById('wq').addEventListener('submit',e=>{e.preventDefault();const k=norm(inp.value);if(k)show(k)});
 if(demos)demos.addEventListener('click',e=>{const b=e.target.closest('[data-plate]');if(b){inp.value=pretty(b.dataset.plate);show(b.dataset.plate)}});
 const urlP=new URLSearchParams(location.search).get('plaka');
 if(urlP){const k=norm(urlP);inp.value=pretty(k);show(k,false);setTimeout(()=>document.getElementById('garanti').scrollIntoView({behavior:'smooth'}),250)}
 else show('66EX066',true);
})();

// ---- out-of-town journey & delivery planner (#hakkimizda .road)
(()=>{const host=document.getElementById('cityBtns'),plan=document.getElementById('roadPlan');if(!host||!plan)return;
 const CITIES=[
  {n:'Sorgun',km:'35 km',t:'30 dk',p:'Sabah 09:00’da bırakın; Boya Koruma, Pasta Cila veya İç Sterilizasyon işleminizi aynı gün 17:30’da teslim alıp dönün.'},
  {n:'Yerköy',km:'60 km',t:'45 dk',p:'Sabah 09:30’da stüdyomuza ulaşın; tek günlük paketlerde aynı akşam 18:00’de aracınızı garantili teslim edelim.'},
  {n:'Boğazlıyan',km:'85 km',t:'1 saat',p:'Gelmeden fotoğraflarla fiyatı netleştiriyoruz; sabah bıraktığınız aracınızı akşam çayınızı içerken teslim alabilirsiniz.'},
  {n:'Çorum',km:'105 km',t:'1 saat 15 dk',p:'Çorum’dan gelen müşterilerimiz için randevu gününü özel kapatıyoruz; 1 günlük işlemleri aynı gün, seramik kaplamayı 2. gün teslim ediyoruz.'},
  {n:'Kırşehir',km:'110 km',t:'1 saat 20 dk',p:'Yolculuğunuza değmesi için ön incelemeyi WhatsApp’tan fotoğrafla yapıyor, stüdyoda sıra beklemeden doğrudan işleme başlıyoruz.'},
  {n:'Kayseri',km:'185 km',t:'2 saat',p:'Kayseri’den Gyeon seramik ve PPF için gelen müşterilerimize özel randevu planlaması ve adım adım fotoğraflı süreç bilgilendirmesi sunuyoruz.'},
  {n:'Ankara',km:'215 km',t:'2,5 saat',p:'Ankara’dan birçok müşterimiz hem Gyeon sertifikalı işçilik hem de fiyat avantajı için geliyor; randevunuzu geliş saatinize göre sabitliyoruz.',q:1},
  {n:'Sivas',km:'225 km',t:'2,5 saat',p:'Sivas’tan geliş saatinize göre stüdyomuzu hazırlıyor; işlem boyunca her aşamanın fotoğraf ve mikron ölçüm videosunu WhatsApp’tan paylaşıyoruz.'},
  {n:'Aksaray',km:'245 km',t:'2 saat 45 dk',p:'Aksaray’dan gelen müşterilerimiz için aynı gün teslim Boya Koruma & İç Sterilizasyon veya 2 günlük Gyeon Seramik programı uyguluyoruz.',q:1}
 ];
 let curC=6;
 function renderCity(idx){curC=idx;const c=CITIES[idx];
  host.querySelectorAll('button').forEach((b,j)=>b.classList.toggle('on',j===idx));
  plan.innerHTML=`<div><b>${c.n} · ${c.km} (${c.t}):</b> ${c.p}</div><a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(`Merhaba, ${c.n}’dan geleceğim. Aracım için fiyat ve yol randevusu planlamak istiyorum.`)}">${WAI}${c.n} için randevu planla</a>`;
 }
 host.innerHTML=CITIES.map((c,i)=>`<button type="button" data-ci="${i}" class="${i===curC?'on':''}">${c.n} <small>${c.km}</small></button>`).join('');
 host.addEventListener('click',e=>{const b=e.target.closest('[data-ci]');if(b)renderCity(+b.dataset.ci)});
 renderCity(curC);
})();

// ---- whatsapp links
document.querySelectorAll('[data-msg]').forEach(a=>{a.href=waLink(a.dataset.msg);a.target='_blank';a.rel='noopener'});

// ---- open now (Europe/Istanbul, Pzt–Cmt 09:00–19:00)
(()=>{const el=document.getElementById('openNow');try{
 const f=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Istanbul',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());
 const g=t=>f.find(x=>x.type===t).value,d=g('weekday'),m=(+g('hour'))*60+(+g('minute'));
 const work=d!=='Sun',open=work&&m>=540&&m<1140;
 el.innerHTML=open?'<span class="dot on"></span>Şu an açık · 19:00’a kadar':'<span class="dot"></span>'+(d==='Sun'?'Pazar · Randevuyla açık (Pzt 09:00)':(m<540?'Bugün 09:00’da açılıyor':(d==='Sat'?'Pazartesi 09:00’da açılıyor':'Yarın 09:00’da açılıyor')));
}catch(e){}})();

// ---- before / after (tüm protokollerde file:// ve https:// çalışan gerçekçi kusur simülasyonu)
(()=>{
const ba=document.getElementById('ba'),img=document.getElementById('baAfter'),cv=document.getElementById('baBefore'),rg=document.getElementById('baRange'),txt=document.getElementById('baTxt'),go=document.getElementById('baGo');
const FX={
 hare:{t:'<b>Hare ve çizikler:</b> Otomatik yıkama fırçalarının ve kuru bezlerin bıraktığı örümcek ağı hareler 3 kademe Menzerna &amp; Koch Chemie pasta ile giderilir; seramik kaplama yenilerinin oluşmasını önler.',m:'hare ve çizik'},
 su:{t:'<b>Su lekeleri (kireç izleri):</b> Sert kuyu/şebeke suyu ve güneşle verniğe işleyen kalsiyum halkaları özel mineral sökücü ve polisajla alınır; seramik kaplama suyun boyaya tutunmasını engeller.',m:'su lekesi'},
 mat:{t:'<b>Matlaşma ve oksidasyon:</b> Güneş (UV), yol tuzu ve fırçalı yıkamalarla zamanla solup grileşen vernik katmanı, derin boya düzeltme ile ilk günkü ayna parlaklığına ve derinliğine kavuşur.',m:'matlaşma'}
};
let cur='hare',seed=7;
const rand=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
function draw(){
 if(!img.complete||!img.naturalWidth)return;
 const r=ba.getBoundingClientRect(),dpr=Math.min(1.6,devicePixelRatio||1),W=Math.round(r.width*dpr),H=Math.round(r.height*dpr);
 if(!W||!H)return;
 const nw=img.naturalWidth,nh=img.naturalHeight,ir=nw/nh,cr=W/H;
 let sw,sh,sx,sy;
 if(ir>cr){sh=nh;sw=sh*cr;sx=(nw-sw)/2;sy=0}else{sw=nw;sh=sw/cr;sx=0;sy=(nh-sh)/2}
 const ux=u=>(u*nw-sx)/sw*W,vy=v=>(v*nh-sy)/sh*H;
 // Kaporta + far yüzeyi maskesi (üst karanlık stüdyo fonunu ve sağ alt lastik/jantı hariç tutar)
 const onBody=(u,v)=>v>(0.15-u*0.04)&&Math.hypot((u-0.79)*1.15,v-0.77)>0.26;
 const rnd=(a,b)=>a+rand()*(b-a);
 cv.width=W;cv.height=H;
 const x=cv.getContext('2d');
 x.save();

 if(cur==='hare'){
  seed=19;
  x.filter=`saturate(.74) contrast(.88) brightness(.94) blur(${(.35*dpr).toFixed(2)}px)`;
  x.drawImage(img,sx,sy,sw,sh,0,0,W,H);
  x.filter='none';
  // Hafif yüzey matlığı
  x.globalCompositeOperation='screen';
  x.fillStyle='rgba(110,106,98,.07)';
  x.fillRect(0,0,W,H);

  // Stüdyo spot ışıklarının kaporta üzerindeki yansıma merkezleri (örümcek ağı hare odakları)
  const spots=[
   [0.24,0.24,1.0,0.78,-0.12],
   [0.47,0.20,1.15,0.75,-0.08],
   [0.68,0.27,1.05,0.82,0.18],
   [0.83,0.36,0.85,0.88,0.32],
   [0.37,0.48,0.95,0.85,-0.15],
   [0.21,0.72,0.90,0.85,-0.10],
   [0.46,0.76,0.95,0.82,0.05]
  ];
  const R=Math.max(W,H);
  x.lineCap='round';

  for(const [cu,cv0,sc,flat,rot] of spots){
   const cx=ux(cu),cy=vy(cv0),maxR=R*0.20*sc;
   // Spot ışık yansıma halesi
   const grd=x.createRadialGradient(cx,cy,0,cx,cy,maxR*0.85);
   grd.addColorStop(0,'rgba(255,248,232,.20)');
   grd.addColorStop(0.35,'rgba(225,232,245,.08)');
   grd.addColorStop(1,'rgba(225,232,245,0)');
   x.fillStyle=grd;
   x.beginPath();x.arc(cx,cy,maxR*0.85,0,6.283);x.fill();

   // Konsantrik örümcek ağı (cobweb) hare çizikleri
   x.save();
   x.translate(cx,cy);
   x.rotate(rot);
   x.scale(1,flat);
   const count=340;
   for(let k=0;k<count;k++){
    const t=Math.pow(rand(),0.78),rr=t*maxR+3*dpr;
    const a0=rnd(0,6.283),sp=rnd(0.08,0.52)*(1-t*0.45);
    const xm=cu+Math.cos(a0)*rr/W*0.7,ym=cv0+Math.sin(a0)*rr/H*0.7;
    if(!onBody(xm,ym))continue;
    const fade=Math.pow(1-t,1.35);
    const al=rnd(0.18,0.68)*fade;
    x.strokeStyle=rand()<.3?`rgba(255,244,218,${al.toFixed(3)})`:`rgba(235,242,255,${al.toFixed(3)})`;
    x.lineWidth=rnd(0.45,1.35)*dpr;
    x.beginPath();
    x.arc(0,0,rr,a0,a0+sp);
    x.stroke();
   }
   x.restore();
  }

  // Fırçalı yıkama ve bez kaynaklı doğrusal/kavisli kılcal çizikler
  for(let k=0;k<220;k++){
   const u0=rnd(0.04,0.92),v0=rnd(0.16,0.92);
   if(!onBody(u0,v0))continue;
   const x0=ux(u0),y0=vy(v0),len=rnd(24,125)*dpr,ang=rnd(-0.38,0.32);
   const al=rnd(0.14,0.42);
   x.strokeStyle=`rgba(240,244,252,${al.toFixed(3)})`;
   x.lineWidth=rnd(0.45,1.15)*dpr;
   x.beginPath();
   x.moveTo(x0,y0);
   x.quadraticCurveTo(x0+Math.cos(ang)*len*0.5,y0+Math.sin(ang)*len*0.5+rnd(-7,7)*dpr,x0+Math.cos(ang)*len,y0+Math.sin(ang)*len);
   x.stroke();
  }
 }
 else if(cur==='su'){
  seed=31;
  x.filter=`saturate(.78) contrast(.90) brightness(.95)`;
  x.drawImage(img,sx,sy,sw,sh,0,0,W,H);
  x.filter='none';
  x.globalCompositeOperation='screen';
  x.fillStyle='rgba(130,136,142,.05)';
  x.fillRect(0,0,W,H);

  // Kireç ve mineral halkaları (Tip 1 & Tip 2 kurumuş su damlası izleri)
  const dropCount=260;
  for(let k=0;k<dropCount;k++){
   const u0=rnd(0.04,0.94),v0=rnd(0.16,0.93);
   if(!onBody(u0,v0))continue;
   const px=ux(u0),py=vy(v0);
   // Kaput üzerinde yatay perspektif, çamurluk/tamponda eğimli perspektif
   const isHood=v0<0.42;
   const r0=(isHood?rnd(3.2,13.5):rnd(2.4,9.5))*dpr;
   const syScale=isHood?rnd(0.58,0.82):rnd(0.72,0.95);
   const rot=isHood?rnd(-0.18,0.15):rnd(-0.45,0.45);
   const pts=10;

   x.save();
   x.translate(px,py);
   x.rotate(rot);
   x.scale(1,syScale);

   // Organik damla formu (düzgün geometrik daire yerine gerçekçi kuruma kenarı)
   const rads=[];
   for(let p=0;p<pts;p++)rads.push(r0*rnd(0.86,1.14));
   const tracePath=scale=>{
    x.beginPath();
    for(let p=0;p<pts;p++){
     const a1=(p/pts)*6.283,a2=((p+1)/pts)*6.283,am=(a1+a2)/2;
     const r1=rads[p]*scale,r2=rads[(p+1)%pts]*scale,rm=(r1+r2)*0.52;
     const x1=Math.cos(a1)*r1,y1=Math.sin(a1)*r1;
     const xm=Math.cos(am)*rm,ym=Math.sin(am)*rm;
     const x2=Math.cos(a2)*r2,y2=Math.sin(a2)*r2;
     if(p===0)x.moveTo(x1,y1);
     x.quadraticCurveTo(xm,ym,x2,y2);
    }
    x.closePath();
   };

   tracePath(1);
   // Damla içi hafif kireç bulanıklığı
   x.fillStyle=`rgba(218,224,230,${rnd(0.06,0.16).toFixed(3)})`;
   x.fill();
   // Damla dış çeperinde biriken belirgin beyazımsı kalsiyum/kireç halkası
   x.strokeStyle=`rgba(238,242,246,${rnd(0.32,0.68).toFixed(3)})`;
   x.lineWidth=rnd(0.75,1.55)*dpr;
   x.stroke();

   // Büyük damlalarda ikinci iç buharlaşma halkası
   if(r0>6.5*dpr&&rand()<.65){
    tracePath(rnd(0.55,0.74));
    x.strokeStyle=`rgba(235,240,245,${rnd(0.16,0.34).toFixed(3)})`;
    x.lineWidth=rnd(0.5,0.9)*dpr;
    x.stroke();
   }
   x.restore();
  }

  // Dikey yüzeylerde kurumuş su akıntısı izleri
  for(let k=0;k<22;k++){
   const u0=rnd(0.08,0.65),v0=rnd(0.45,0.82);
   if(!onBody(u0,v0))continue;
   const x0=ux(u0),y0=vy(v0),hLen=rnd(18,55)*dpr;
   x.strokeStyle=`rgba(230,235,240,${rnd(0.12,0.26).toFixed(3)})`;
   x.lineWidth=rnd(0.8,1.6)*dpr;
   x.beginPath();
   x.moveTo(x0,y0);
   x.bezierCurveTo(x0+rnd(-4,4)*dpr,y0+hLen*0.35,x0+rnd(-4,4)*dpr,y0+hLen*0.7,x0+rnd(-2,2)*dpr,y0+hLen);
   x.stroke();
  }
 }
 else {
  // Matlaşma (UV güneş yanığı / oksidasyon, solmuş ve tebeşirlenmiş vernik)
  seed=47;
  x.filter=`saturate(.26) contrast(.65) brightness(1.03) blur(${(1.65*dpr).toFixed(2)}px)`;
  x.drawImage(img,sx,sy,sw,sh,0,0,W,H);
  x.filter='none';

  // Genel oksidasyon ve solma perdesi
  x.globalCompositeOperation='screen';
  x.fillStyle='rgba(136,130,118,.24)';
  x.fillRect(0,0,W,H);

  // Güneşi dik alan kaput ve üst çamurlukta yoğunlaşan tebeşirlenme (oksidasyon bulutları)
  const oxZones=[
   [0.32,0.24,0.38,0.26],
   [0.64,0.26,0.34,0.25],
   [0.28,0.66,0.32,0.20],
   [0.78,0.42,0.24,0.22]
  ];
  const R=Math.max(W,H);
  for(const [ou,ov,rad,op] of oxZones){
   const cx=ux(ou),cy=vy(ov),rr=R*rad;
   const g=x.createRadialGradient(cx,cy,0,cx,cy,rr);
   g.addColorStop(0,`rgba(195,190,178,${op})`);
   g.addColorStop(0.55,`rgba(165,160,150,${(op*0.5).toFixed(3)})`);
   g.addColorStop(1,'rgba(165,160,150,0)');
   x.fillStyle=g;
   x.beginPath();x.arc(cx,cy,rr,0,6.283);x.fill();
  }

  // Oksitlenmiş vernik dokusu ve ince aşınma pürüzleri
  x.globalCompositeOperation='source-over';
  for(let k=0;k<1800;k++){
   const u0=rnd(0.02,0.96),v0=rnd(0.15,0.95);
   if(!onBody(u0,v0))continue;
   const px=ux(u0),py=vy(v0),sz=rnd(0.7,1.9)*dpr;
   x.fillStyle=rand()<.55?`rgba(210,205,194,${rnd(0.08,0.22).toFixed(3)})`:`rgba(35,33,30,${rnd(0.08,0.18).toFixed(3)})`;
   x.fillRect(px,py,sz,sz);
  }
 }
 x.restore();
}
function setTab(k){cur=k;document.querySelectorAll('#baTabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.k===k));
 txt.innerHTML=FX[k].t;go.href=waLink(`Merhaba, aracımda ${FX[k].m} sorunu var. Fotoğraflarını gönderip fiyat almak istiyorum.`);
 cv.classList.add('busy');requestAnimationFrame(()=>{draw();cv.classList.remove('busy')})}
document.getElementById('baTabs').addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b&&b.dataset.k!==cur)setTab(b.dataset.k)});
rg.addEventListener('input',()=>ba.style.setProperty('--x',rg.value+'%'));
let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(draw,180)});
const start=()=>setTab(cur);
if(img.complete&&img.naturalWidth)start();else img.addEventListener('load',start,{once:true});
new IntersectionObserver((es,ob)=>{if(es[0].isIntersecting){ob.disconnect();img.loading='eager';if(img.complete&&img.naturalWidth)start();else img.addEventListener('load',start,{once:true})}},{rootMargin:'600px'}).observe(ba);
let swept=false;new IntersectionObserver((es,ob)=>{if(es[0].isIntersecting&&!swept){swept=true;ob.disconnect();const t0=performance.now(),path=[50,22,78,50];
 const step=now=>{const k=Math.min(1,(now-t0)/2600),sg=Math.min(2,Math.floor(k*3)),lt=k*3-sg,e=lt<.5?2*lt*lt:1-Math.pow(-2*lt+2,2)/2,v=path[sg]+(path[sg+1]-path[sg])*e;ba.style.setProperty('--x',v+'%');rg.value=v;if(k<1)requestAnimationFrame(step)};
 setTimeout(()=>requestAnimationFrame(step),400)}},{threshold:.5}).observe(ba);
})();

// ---- nav / mobile menu / KVKK modal / sticky bar / reveal
const nav=document.getElementById('nav'),mbar=document.getElementById('mbar'),mnavBtn=document.getElementById('mnavBtn');
if(mnavBtn){
 mnavBtn.onclick=()=>{const on=nav.classList.toggle('open');mnavBtn.setAttribute('aria-expanded',on)};
 document.getElementById('navLinks').addEventListener('click',e=>{if(e.target.tagName==='A'){nav.classList.remove('open');mnavBtn.setAttribute('aria-expanded','false')}});
}
const kvkkBtn=document.getElementById('kvkkBtn'),kvkkModal=document.getElementById('kvkkModal'),kvkkClose=document.getElementById('kvkkClose');
if(kvkkBtn&&kvkkModal){
 kvkkBtn.onclick=()=>kvkkModal.classList.add('open');
 kvkkClose.onclick=()=>kvkkModal.classList.remove('open');
 kvkkModal.addEventListener('click',e=>{if(e.target===kvkkModal)kvkkModal.classList.remove('open')});
 addEventListener('keydown',e=>{if(e.key==='Escape')kvkkModal.classList.remove('open')});
}
const onScroll=()=>{nav.classList.toggle('solid',scrollY>20);mbar.classList.toggle('show',scrollY>500)};addEventListener('scroll',onScroll,{passive:true});onScroll();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
