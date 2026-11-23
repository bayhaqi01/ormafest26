const LOGO_EVENT="logo/ormafest.png"; // alamat file logo Ormafest 2026
const IMG_COVER="img/cover.jpg"; // gambar cover
const IMG_FIL="img/rhapsody.jpg";   // gambar filosofi
const LOGO={};      // {"Nama Ormawa":"data:image/png;base64,..."}
const VIDEO={};     // {"Nama Ormawa":"https://youtube.com/..."}
const API="";            // URL web app Google Apps Script (berakhiran /exec); kosong = mode contoh
const FORM_EXPLORE="";   // link Google Form pilih ormawa OrmaExplore
const TOTAL_BOOTH=53;
const SESI={1:"08.00–09.00",2:"09.25–10.25",3:"10.50–11.50",4:"13.35–14.35"};
const MAPS={ormafair:"",ormaexplore:"denah/ormaexplore.png"};  // alamat gambar denah final
const TL=[
 {d:"Day 1",t:"4 Des",k:"Opening",p:"Drama musikal, penerjunan bendera, parade seluruh ormawa, dan flashmob bersama.",c:"#e8557a"},
 {d:"Day 1",t:"4 Des",k:"OrmaFair",p:"Berkeliling di 4 zona, mengenal ormawa lewat booth, dan mengumpulkan stempel di paspormu.",c:"#2c7bb6"},
 {d:"Day 2",t:"5 Des",k:"OrmaExplore",p:"Mini class dan open class untuk merasakan langsung kegiatan khas tiap ormawa dalam sesi 60 menit.",c:"#2f9aa3"},
 {d:"Day 2",t:"5 Des",k:"Closing",p:"Awarding Maba Miba Ter-Outstanding, Booth dan Ormawa Terfavorit, seremoni penutupan, serta mini concert.",c:"#c9731a"}];
const DATA={
"Keahlian Khusus":["#8a6bd6","Cocok untuk kamu yang ingin mengasah keterampilan khusus, mulai dari kepedulian sosial dan kemanusiaan, kerohanian, kecintaan pada alam, hingga media dan protokoler.",["Bambu Pelangi","Green House","KSR PMI Unit PKN STAN","Kelompok Pencinta Alam STAPALA","Keluarga Mahasiswa Hindu Buddha","Keluarga Mahasiswa Katolik PKN STAN","Koperasi Mahasiswa PKN STAN","Korps Utama (KORTAMA)","Masjid Baitul Maal","Master of Ceremony (Mercy) PKN STAN","Media Center","PMK STAN","Program Kakak Asuh (PKA) PKN STAN","Radioblast","SCENE","Spesialisasi Antikorupsi (SPEAK)","Tim Protokoler"]],
"Manajerial dan Akademik":["#ee5d7f","Cocok untuk kamu yang ingin melatih kepemimpinan dan kemampuan berorganisasi, serta menambah wawasan akademik melalui kajian, bahasa, keuangan, dan teknologi.",["AL-LUGHOH","Badan Asrama Mahasiswa PKN STAN","Badan Audit Kemahasiswaan (BAK)","Badan Eksekutif Mahasiswa","Dewan Perwakilan Mahasiswa (DPM)","Kelompok Studi Pasar Modal (KSPM)","PUSPA","Pusat Kajian Akuntansi dan Keuangan Publik","Pusat Studi CENTURY","Pusat Studi Kepabeanan dan Cukai","STAN English Club","STAN INFORMATICS CLUB","STEMA"]],
"Olahraga":["#2f8fd0","Jika kamu memiliki minat dan bakat untuk beraktivitas fisik, kamu dapat memilih ormawa di kategori Olahraga.",["Aikido STAN Dojo","Aliwardhana Esport Network (AEN) PKN STAN","Canon","IPSI PKN STAN","PKN STAN CHESS CLUB","PKN STAN FC","STAN Aquatic Club","STAN BILLIARD","STAN Basketball Club","STAN Karate Club","STAN Runners","STAN Tennis Club (STC)","STAN Volleyball Club","STTC","Taekwondo PKN STAN"]],
"Seni":["#f5a623","Cocok untuk kamu yang gemar bermusik, bernyanyi, bermain teater, atau menulis karya sastra, dan ingin menyalurkan kreativitas.",["Aktualisasi Sastra (Aksara) PKN STAN","Animac","Marching Band Gita Dana Rakca","STAN Music Community (SMC)","Sanggar Budaya Nusantara (Sabdanusa)","Teater Alir","Voca Wardhana Choir","WADH"]]};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],R=(a,b)=>a+Math.random()*(b-a),P=a=>a[Math.floor(R(0,a.length))];
if(LOGO_EVENT){const im='<img src="'+LOGO_EVENT+'" alt="Logo Ormafest 2026">';["#lgo","#lgc","#lgf"].forEach(k=>{const e=$(k);e.innerHTML=im;e.classList.add("has")})}
$("#cvbg").style.backgroundImage="url("+IMG_COVER+")";$("#rf").src=IMG_FIL;
// goresan kuas: tiap bagian punya latar lukisan sendiri
function sw(cx,cy,r0,r1,cols,len=7,wd=2.4){let o="";for(let r=r0;r<=r1;r+=wd*2.3){const n=Math.floor(6.28*r/(len*2.3));for(let i=0;i<n;i++){const a=i/n*6.28+r*.07,x=cx+Math.cos(a)*r+R(-1,1),y=cy+Math.sin(a)*r+R(-1,1);o+=`<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(len*R(.7,1.2)).toFixed(1)}" ry="${wd}" fill="${P(cols)}" transform="rotate(${(a*57.3+90).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`}}return o}
function st(n,cols,y0,y1,op,a0=-38,a1=-18){let o="";for(let i=0;i<n;i++){const x=R(0,1000),y=R(y0,y1);o+=`<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${R(12,30).toFixed(0)}" ry="${R(3.4,6).toFixed(1)}" fill="${P(cols)}" opacity="${op}" transform="rotate(${R(a0,a1).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`}return o}
const fl=(x,y,s)=>`<g class="sf" style="animation-delay:-${R(0,4).toFixed(1)}s"><path d="M${x} ${y}V${y+90}" stroke="#3f6b3a" stroke-width="5"/><g transform="translate(${x} ${y}) scale(${s})"><use href="#sun"/></g></g>`;
const BG={
 sky:()=>st(260,["#6fb0f2","#4a8fe0","#a9d3f8","#f6dc7a","#ffffff","#7fd3c4"],0,1000,.55)+sw(780,210,6,120,["#f6f2b0","#f2c230","#a9b8dc","#8095c4"],9,2.8)+sw(170,760,4,70,["#f2c230","#f6dc7a"],7,2.4),
 wheat:()=>st(300,["#f6e48a","#ead66a","#ffffff","#c9d77a","#e9c35a","#f7c6d3","#bfe3dc"],0,1000,.7)+fl(70,860,.5)+fl(930,520,.45)+fl(880,900,.6),
 night:()=>st(220,["#3f82dc","#5aa0ec","#2a68c8","#7cc0f0","#fff3a8"],0,1000,.75,-20,10)+sw(860,130,6,95,["#f6f2b0","#f2c230","#8fa0cc"],9,2.6)+sw(120,300,4,60,["#f2c230","#f6dc7a"],7,2.4)+Array.from({length:40},()=>`<circle class="st" cx="${R(0,1000)}" cy="${R(0,1000)}" r="${R(.8,2)}" fill="#f6e9a0" style="animation-delay:${R(0,3).toFixed(1)}s"/>`).join(""),
 blue:()=>st(280,["#c6d6ee","#a9c0e6","#dfe9f6","#f6e48a","#ffffff","#f7c6d3","#bfe3dc"],0,1000,.65)+sw(900,180,5,80,["#a9c0e6","#7f9fd4","#f6e48a"],8,2.4)+fl(80,880,.5)+fl(920,860,.55),
 field:()=>st(160,["#4a8fe0","#6fb0f2","#2a68c8"],0,500,.7,-20,10)+sw(120,120,4,40,["#f2c230","#f6dc7a"],7,2.4)+st(110,["#eef0a8","#f2c230","#d9dd8a","#2c4476"],620,1000,.4)+fl(110,830,.55)+fl(330,880,.7)+fl(600,860,.6)+fl(860,890,.75)};
$$("[data-bg]").forEach(s=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("class","bg");e.setAttribute("viewBox","0 0 1000 1000");e.setAttribute("preserveAspectRatio","xMidYMid slice");e.setAttribute("aria-hidden","true");e.innerHTML=BG[s.dataset.bg]();s.prepend(e)});
// cover
$("#sun").innerHTML=Array.from({length:14},(_,i)=>`<ellipse cy="-30" rx="9" ry="19" fill="#f2a61e" transform="rotate(${i*25.7})"/>`).join("")+Array.from({length:14},(_,i)=>`<ellipse cy="-23" rx="7" ry="13" fill="#f6cf4a" transform="rotate(${i*25.7+13})"/>`).join("")+'<circle r="14" fill="#5a3416"/><circle r="8" fill="#7a4a22"/>';
$("#tl").insertAdjacentHTML("beforeend",TL.map((e,i)=>`<div class="ti rv${i%2?"":" l"}" style="--c:${e.c}"><div class="stamp"><span>${e.d}<b>${e.t}</b></span></div><div class="c"><h3>${e.k}</h3><p>${e.p}</p></div></div>`).join(""));
addEventListener("load",()=>setTimeout(()=>$("#ld").classList.add("d"),1100));
const hb=$("#hb"),nv=$("#nv"),tg=o=>{nv.classList.toggle("o",o);hb.classList.toggle("o",o);hb.setAttribute("aria-expanded",o)};
hb.onclick=()=>tg(!nv.classList.contains("o"));$$("#nv a").forEach(a=>a.onclick=()=>tg(false));
const secs=$$("main section[id]"),lk=$$("#nv a"),ly=$$("#cvbg");
function sc(){const y=scrollY;$("#hd").classList.toggle("s",y>40);
 if(y<innerHeight*1.2)ly.forEach(g=>g.style.transform=`translateY(${(y*g.dataset.s).toFixed(1)}px)`);
 const t=$("#tl").getBoundingClientRect();$("#ln").style.height=Math.max(0,Math.min(t.height,innerHeight*.65-t.top))+"px";
 let c="";secs.forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.4)c=s.id});lk.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+c))}
addEventListener("scroll",sc,{passive:true});sc();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.18});
$$(".rv").forEach(e=>io.observe(e));
const cats=Object.keys(DATA);let act=null,all=false,q="";const ALL=cats.flatMap(k=>DATA[k][2].map(n=>({n,k,c:DATA[k][0]})));
const PH='<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="1.8"/><path d="M21 16l-5-5-9 9"/></svg>';
const lg=n=>LOGO[n]?`<img src="${LOGO[n]}" alt="Logo ${n}">`:PH;
function render(){const sh=q||act||all,l=!sh?[]:q?ALL.filter(o=>o.n.toLowerCase().includes(q)):act?ALL.filter(o=>o.k===act):ALL;
 $("#tabs").innerHTML=cats.map(k=>`<button class="tab${k===act?" on":""}" role="tab" style="--c:${DATA[k][0]}" data-c="${k}"><i class="dot"></i>${k}<b class="n">${DATA[k][2].length}</b></button>`).join("");
 $$("#tabs .tab").forEach(b=>b.onclick=()=>{act=act===b.dataset.c?null:b.dataset.c;all=false;render()});
 const ds=$("#dsc");$("#es").style.display=sh?"none":"";ds.style.setProperty("--c",act?DATA[act][0]:"#f2c230");const d=act&&!q?DATA[act][1]:"";ds.style.display=d?"":"none";ds.style.opacity=0;setTimeout(()=>{ds.textContent=d;ds.style.opacity=1},180);
 $("#cnt").textContent=!sh?"":q?(l.length?l.length+" ormawa ditemukan untuk “"+q+"”":"Belum ada ormawa yang cocok dengan “"+q+"”. Coba gunakan kata lain."):l.length+" ormawa";
 $("#og").innerHTML=l.map((o,i)=>`<button class="oc" style="--i:${Math.min(i,20)};--c:${o.c}" data-i="${i}"><span class="lb">${lg(o.n)}</span><span>${o.n}</span></button>`).join("");
 $$(".oc").forEach(b=>b.onclick=()=>{const o=l[b.dataset.i];show(o.n,o.c,o.k)})}
function show(n,c,k){const v=VIDEO[n];$("#mc").style.setProperty("--c",c);
 $("#mc").innerHTML=`<div class="lb">${lg(n)}</div><h3>${n}</h3><small>${k}</small><br>${v?`<a class="btn" href="${v}" target="_blank" rel="noopener noreferrer">Lihat Video Profil</a>`:'<a class="btn" aria-disabled="true">Video profil ormawa</a>'}<button class="btn o" id="cl">Tutup</button>`;
 $("#md").classList.add("o");$("#cl").focus();$("#cl").onclick=()=>$("#md").classList.remove("o")}
$("#md").onclick=e=>{if(e.target.id==="md")$("#md").classList.remove("o")};
addEventListener("keydown",e=>{if(e.key==="Escape")$("#md").classList.remove("o")});
$("#q").oninput=e=>{q=e.target.value.trim().toLowerCase();render()};$("#all").onclick=()=>{all=true;act=null;render()};render();
const ZF='<svg viewBox="0 0 560 520" role="img" aria-label="Acuan zona OrmaFair: empat zona mengelilingi Student Center, bergerak searah jarum jam"><g font-family="Nunito" font-weight="800" font-size="13" text-anchor="middle"><rect x="150" y="20" width="260" height="90" rx="8" fill="#b79cf0"/><text x="280" y="62">ZONA KEAHLIAN KHUSUS</text><text x="280" y="80" font-weight="600">17 ormawa</text><rect x="20" y="130" width="100" height="260" rx="8" fill="#ee5d7f"/><text x="70" y="250">MANAJERIAL</text><text x="70" y="268">DAN AKADEMIK</text><text x="70" y="286" font-weight="600">13 ormawa</text><rect x="150" y="130" width="260" height="260" rx="8" fill="#f4b3b0"/><text x="280" y="262">STUDENT CENTER</text><rect x="440" y="130" width="100" height="260" rx="8" fill="#f2c27e"/><text x="490" y="258">ZONA SENI</text><text x="490" y="276" font-weight="600">8 ormawa</text><rect x="150" y="410" width="260" height="90" rx="8" fill="#86b6e8"/><text x="280" y="452">ZONA OLAHRAGA</text><text x="280" y="470" font-weight="600">15 ormawa</text></g><g fill="none" stroke="#16254a" stroke-width="3" stroke-linecap="round"><path d="M60 110V70q0-20 25-20h35m-12-12 12 12-12 12"/><path d="M430 50h50q20 0 20 20v40m-12-10 12 10 12-10"/><path d="M500 410v40q0 20-20 20h-40m10-12-10 12 10 12"/><path d="M130 470H90q-20 0-20-20v-40m-12 10 12-10 12 10"/></g></svg>';
const MP={ormafair:["OrmaFair",ZF,""],ormaexplore:["OrmaExplore",'<div>Denah kampus STAN beserta venue tiap ormawa akan tampil di sini.</div>',"Denah OrmaExplore akan menyusul dari panitia."]};
let mk="ormafair";
function rm(){$("#mt").innerHTML=Object.keys(MP).map(k=>`<button class="tab${k===mk?" on":""}" style="--c:#2c7bb6" data-k="${k}">${MP[k][0]}</button>`).join("");
 $$("#mt .tab").forEach(b=>b.onclick=()=>{mk=b.dataset.k;rm()});
 $("#mp").innerHTML=MAPS[mk]?`<img src="${MAPS[mk]}" alt="Denah ${MP[mk][0]}">`:MP[mk][1];$("#mc2").textContent=MAPS[mk]?"":MP[mk][2];
 const z=$("#mp img,#mp svg");if(z)z.onclick=()=>z.classList.toggle("z")}
rm();
// ===== Passport: leaderboard + cek NIM (Google Sheets lewat Apps Script) =====
const esc=t=>String(t==null?"":t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const KCOL=Object.fromEntries(Object.entries(DATA).map(([k,v])=>[k,v[0]]));
const DEMO={lb:{status:"ok",demo:true,top:[{nama:"Maba Contoh 1",jumlah:41},{nama:"Maba Contoh 2",jumlah:37},{nama:"Maba Contoh 3",jumlah:33}]},
 fair:{status:"ok",demo:true,nama:"Ma** Co****",visited:17,total:TOTAL_BOOTH},
 explore:{status:"ok",demo:true,nama:"Ma** Co****",pilihan:[{kategori:"Seni",ormawa:"Contoh Ormawa Seni",sesi:1},{kategori:"Olahraga",ormawa:"Contoh Ormawa Olahraga",sesi:2},{kategori:"Keahlian Khusus",ormawa:"Contoh Ormawa Keahlian",sesi:3},{kategori:"Manajerial dan Akademik",ormawa:"Contoh Ormawa Manajerial",sesi:4}]}};
let last=0;
async function get(q,cool){
 if(cool){const t=Date.now();if(t-last<2500)throw new Error("cd");last=t}
 if(!API){await new Promise(r=>setTimeout(r,500));return DEMO[q.action==="leaderboard"?"lb":q.action]}
 return (await fetch(API+"?"+new URLSearchParams(q))).json()}
const note=d=>d.demo?"<small>Data contoh. Hasil asli muncul setelah website terhubung ke Google Spreadsheet.</small>":"";
const bad=x=>x.message==="cd"?"Mohon tunggu sebentar, coba lagi dalam 2 detik.":"Belum bisa terhubung. Silakan coba lagi.";
const okNim=n=>/^\d{6,12}$/.test(n);
function countUp(el,to){let t0=null;const f=ts=>{t0=t0||ts;const p=Math.min(1,(ts-t0)/1200);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
$$("#ptabs .tab").forEach(b=>b.onclick=()=>{$$("#ptabs .tab").forEach(x=>x.classList.toggle("on",x===b));$$(".pz").forEach(z=>z.classList.toggle("on",z.id==="pz-"+b.dataset.p))});
const fx=$("#fx");if(FORM_EXPLORE)fx.href=FORM_EXPLORE;else{fx.setAttribute("aria-disabled","true");fx.textContent="Form segera dibuka"}
async function loadLB(){
 try{const d=await get({action:"leaderboard"});
  if(d.status!=="ok")throw 0;
  const t=d.top||[],o=[[t[1],2],[t[0],1],[t[2],3]];
  $("#pd").innerHTML=o.map(([u,r],i)=>`<div class="pc2${r===1?" r1":""}" style="--i:${i}"><div class="rk">${r}</div><b>${u?esc(u.nama):"—"}</b><span>${u?u.jumlah:"-"}</span><small>booth</small></div>`).join("");
  $("#lbu").textContent=d.demo?"Data contoh":"Update "+new Date(d.updated||Date.now()).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})
 }catch(e){$("#pd").innerHTML="";$("#lbu").textContent="Leaderboard belum bisa dimuat."}}
$("#lbr").onclick=loadLB;loadLB();
$("#ff").onsubmit=async e=>{e.preventDefault();const n=$("#fn").value.trim(),r=$("#fr");
 if(!okNim(n)){r.textContent="NIM hanya berisi angka (6 sampai 12 digit).";return}
 r.textContent="Mencari datamu…";let d;try{d=await get({action:"fair",nim:n},1)}catch(x){r.textContent=bad(x);return}
 if(d.status!=="ok"){r.textContent="NIM belum ditemukan. Pastikan kamu sudah presensi di minimal satu booth.";return}
 const tot=d.total||TOTAL_BOOTH;
 r.innerHTML=`<div class="hy">Halo, ${esc(d.nama||"Maba/Miba")}!</div><div class="big2" id="fc">0</div><div>dari ${tot} booth sudah kamu datangi</div><div class="pgb"><i id="fp"></i></div>${note(d)}`;
 requestAnimationFrame(()=>$("#fp").style.width=Math.min(100,d.visited/tot*100)+"%");countUp($("#fc"),d.visited)};
$("#xf").onsubmit=async e=>{e.preventDefault();const n=$("#xn").value.trim(),r=$("#xr");
 if(!okNim(n)){r.textContent="NIM hanya berisi angka (6 sampai 12 digit).";return}
 r.textContent="Mencari pilihanmu…";let d;try{d=await get({action:"explore",nim:n},1)}catch(x){r.textContent=bad(x);return}
 if(d.status!=="ok"||!(d.pilihan||[]).length){r.textContent="Pilihanmu belum tercatat. Silakan isi form OrmaExplore terlebih dahulu, kuota terbatas.";return}
 const l=d.pilihan.slice().sort((a,b)=>a.sesi-b.sesi);
 r.innerHTML=`<div class="hy">Halo, ${esc(d.nama||"Maba/Miba")}!</div><div class="odr">Silakan ikuti urutan berikut dari atas ke bawah:</div><div class="xr">`+l.map((o,i)=>`<div class="xc" style="--i:${i};--c:${KCOL[o.kategori]||"#2c7bb6"}"><div class="ss"><span>Sesi<b>${esc(o.sesi)}</b></span></div><div><div class="xn">${esc(o.ormawa)}</div><small>${esc(o.kategori)}</small></div><div class="xt">${esc(o.jam||SESI[o.sesi]||"")}</div></div>`).join("")+`</div>`+(l.length<4?`<small>Baru ${l.length} dari 4 kategori yang tercatat. Silakan lengkapi lewat form.</small>`:"")+note(d)};
