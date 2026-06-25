/* =========================================================================
   گەشتی عومرە — App Logic
   ========================================================================= */
'use strict';

/* ---------------- Inline SVG icons (24×24, currentColor) ---------------- */
const ICONS = {
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  chev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20.5 20.5l-4.2-4.2"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  aa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18L7.5 7l4.5 11M4.4 14.3h6.2"/><path d="M14.5 18l3-7.5 3 7.5M15.7 15.5h3.6"/></svg>',
  share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="M8.2 10.8l7.6-4M8.2 13.2l7.6 4"/></svg>',
  bookmark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/></svg>',
  sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>',
  moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.3A8.2 8.2 0 0 1 9.7 3.5 8.2 8.2 0 1 0 20.5 14.3z"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-7 8 7M6 10v9h12v-9"/></svg>',
  /* ---- Kaaba: front cube with gold band (hizam) + door ---- */
  kaaba:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="6" width="14" height="14" rx="1"/><path d="M5 9.6h14"/><rect x="10.3" y="13.6" width="3.4" height="6.4" rx="0.4"/></svg>',
  /* ---- 8-point Islamic star (rub el hizb) ---- */
  star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="6.3" y="6.3" width="11.4" height="11.4" rx="1.2"/><rect x="6.3" y="6.3" width="11.4" height="11.4" rx="1.2" transform="rotate(45 12 12)"/></svg>',
  /* ---- Mosque dome + crescent finial + mihrab (closing dua) ---- */
  dua:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.4c.8.55.8 1.5 0 2.05-.8-.55-.8-1.5 0-2.05z"/><path d="M6 20v-6.5C6 10.5 8.7 8 12 8s6 2.5 6 5.5V20"/><path d="M4.5 20h15"/><path d="M10 20v-3.2a2 2 0 0 1 4 0V20"/></svg>',
  /* ---- Two figures: Ibrahim & Hajar ---- */
  family:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="6.3" r="2.3"/><path d="M4.3 19v-2.6A3.7 3.7 0 0 1 8 12.7a3.7 3.7 0 0 1 3.7 3.7V19"/><circle cx="16.6" cy="8.2" r="1.8"/><path d="M13.4 19v-2.2a3.15 3.15 0 0 1 6.3 0V19"/></svg>',
  /* ---- Hourglass: opportunity / don\'t lose time ---- */
  hourglass:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 3h11M6.5 21h11"/><path d="M7.5 3c0 4 3.3 5.4 4.5 6.6C13.2 8.4 16.5 7 16.5 3M7.5 21c0-4 3.3-5.4 4.5-6.6 1.2 1.2 4.5 2.6 4.5 6.6"/></svg>',
  /* ---- Minaret with finial (callers / muezzins) ---- */
  minaret:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.2c.85.6.85 1.7 0 2.3-.85-.6-.85-1.7 0-2.3z"/><path d="M10.7 6.2h2.6l-.5 3.3h-1.6z"/><path d="M10.2 9.6h3.6V20h-3.6z"/><path d="M8.6 20h6.8"/><path d="M11 12.6h2M11 15.6h2"/></svg>',
  /* ---- Droplet (sibgha / dye of faith) ---- */
  drop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.2c3.4 4 5.3 6.6 5.3 9.3a5.3 5.3 0 0 1-10.6 0c0-2.7 1.9-5.3 5.3-9.3z"/><path d="M9.6 13.2a2.4 2.4 0 0 0 2.4 2.4" opacity=".75"/></svg>',
  /* ---- Eye with a tear (when the Prophet wept) ---- */
  cry:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.6 9.4C6 7 9 5.9 12 5.9c2.4 0 4.7.7 6.8 2.4"/><path d="M3.6 9.4C5.7 11.7 8.5 12.8 11 12.8"/><circle cx="11.4" cy="9.4" r="1.7"/><path d="M17 13.2c1.2 1.5 1.9 2.6 1.9 3.5a1.9 1.9 0 0 1-3.8 0c0-.9.7-2 1.9-3.5z"/></svg>',
  /* ---- Compass (seeking the true religion) ---- */
  seeker:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15.7 8.3l-2 4.7-4.7 2 2-4.7z"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/></svg>',
  /* ---- Flower bud on stem (a woman of faith) ---- */
  rose:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.2c2.5 2 3.6 4.1 3.6 6.1a3.6 3.6 0 0 1-7.2 0c0-2 1.1-4.1 3.6-6.1z"/><path d="M12 9.3v11.5"/><path d="M12 15.6c-1.7-.4-3.2-1.9-3.4-3.6M12 15.6c1.7-.4 3.2-1.9 3.4-3.6"/></svg>',
  /* ---- Question bubble (Q&A) ---- */
  quiz:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-7l-4 3.4V15.5H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z"/><path d="M9.4 9.3a2.6 2.6 0 0 1 5 .85c0 1.6-2.3 1.85-2.3 3.15"/><circle cx="12.1" cy="15.3" r="0.55" fill="currentColor"/></svg>',
  /* ---- Medal: from disgrace to honor (المكرمان) ---- */
  medal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5.6"/><path d="M12 6.3l.95 1.9 2.1.3-1.5 1.47.35 2.08L12 11.06l-1.9 1-.35-2.09L8.95 8.5l2.1-.3z"/><path d="M8.6 13.7L6.7 21l5.3-2.7L17.3 21l-1.9-7.3"/></svg>',
  /* ---- Quiz category icons ---- */
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5h6a2 2 0 0 1 2 2v13a1.6 1.6 0 0 0-1.6-1.6H4z"/><path d="M20 4.5h-6a2 2 0 0 0-2 2v13a1.6 1.6 0 0 1 1.6-1.6H20z"/><path d="M12 8.5c-.6 1-1.6 1-2.4 1M12 8.5c.6 1 1.6 1 2.4 1" opacity=".55"/></svg>',
  pray:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21c0-4.2 3.1-6.4 7-6.4s7 2.2 7 6.4z"/><path d="M5 21h14"/><circle cx="12" cy="6" r="2"/><path d="M12 8.4c-2 .6-3.3 2-3.6 3.9M12 8.4c2 .6 3.3 2 3.6 3.9" opacity=".6"/></svg>',
  coins:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="9" cy="7" rx="5.5" ry="2.6"/><path d="M3.5 7v4c0 1.45 2.46 2.6 5.5 2.6s5.5-1.15 5.5-2.6V7"/><path d="M14.5 13.4c1.9.35 4 .1 5.5-.9M9 17.4c-3.04 0-5.5-1.15-5.5-2.6"/><ellipse cx="15" cy="13.6" rx="5.5" ry="2.6"/><path d="M9.5 17c0 1.4 2.46 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-3.4"/></svg>',
  trophy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5.5H4.5V7a3 3 0 0 0 3 3M17 5.5h2.5V7a3 3 0 0 1-3 3"/><path d="M12 14v3M9 21h6M9.5 21c0-1.6 1.1-2.4 2.5-2.4s2.5.8 2.5 2.4"/></svg>',
  pencil:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5l4 4M4 20l1-4L16 5a2.1 2.1 0 0 1 3 3L8 19z"/></svg>',
  moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.2A7.5 7.5 0 0 1 9.8 4 6.6 6.6 0 1 0 20 14.2z"/><path d="M17.5 4.4l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5z" opacity=".75"/></svg>',
  install:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v10.5M8 10l4 4 4-4"/><path d="M5 20h14"/></svg>',
  iosshare:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5v11M8.5 7L12 3.5 15.5 7"/><path d="M6 11H5.5v9.5h13V11H18"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle cx="12" cy="7.7" r=".7" fill="currentColor"/></svg>',
  reset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4.5V8h3.5"/></svg>',
  font:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18L10 6l5 12M6.5 14h7"/></svg>',
  empty:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7.5"/><path d="M21 21l-4.2-4.2M8 11h6"/></svg>',
};
function sectionIcon(key){ return ICONS[key] || ICONS.star; }

/* ---------------- State ---------------- */
const LS = {
  get(k,d){ try{ const v=localStorage.getItem(k); return v==null?d:JSON.parse(v); }catch(e){ return d; } },
  set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} },
};
const FSCALE=[0.9,1,1.15,1.32], FSIZE_LBL=['بچووک','ستاندارد','گەورە','زۆر گەورە'];
const LHV=[1.75,1.95,2.2], LH_LBL=['چِپ','ئاسایی','فراوان'];
const FONTS={naskh:"'Noto Naskh Arabic','Amiri',serif", modern:"'Vazirmatn',sans-serif", amiri:"'Amiri',serif"};
const FONT_LBL=[['naskh','نەسخ'],['modern','مۆدێرن'],['amiri','ئەمیری']];

let settings = LS.get('umrah.settings', null);
if(!settings){
  settings = { theme:'light', fsize:1, font:'modern', lh:1 };   // default: light, modern reading
}
let progress = LS.get('umrah.progress', { lastRead:null, done:{} });

/* ── Quiz state: awards per question drive the scores (so undo/reset are exact) ── */
let quiz = LS.get('umrah.quiz', { awards:{}, names:{ g1:'گروپی یەکەم', g2:'گروپی دووەم' } });
if(!quiz.names) quiz.names={ g1:'گروپی یەکەم', g2:'گروپی دووەم' };
if(!quiz.awards) quiz.awards={};
function saveQuiz(){ LS.set('umrah.quiz', quiz); }

function saveSettings(){ LS.set('umrah.settings', settings); }
function saveProgress(){ LS.set('umrah.progress', progress); }

function applySettings(){
  const r=document.documentElement.style;
  r.setProperty('--fscale', FSCALE[settings.fsize]);
  r.setProperty('--lh', LHV[settings.lh]);
  r.setProperty('--read-font', FONTS[settings.font]||FONTS.naskh);
  document.documentElement.setAttribute('data-theme', settings.theme);
  const tc = settings.theme==='dark' ? '#081320' : '#F1E7D3';
  const meta=document.querySelector('meta[name="theme-color"]'); if(meta) meta.content=tc;
}

/* ---------------- Helpers ---------------- */
const $=(s,el=document)=>el.querySelector(s);
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function toFa(n){ return String(n).replace(/[0-9]/g,d=>'٠١٢٣٤٥٦٧٨٩'[+d]); }
function fullText(block){ return block.runs.map(r=>r.t).join(''); }
function runsToHTML(runs){ return runs.map(r=>{ const h=esc(r.t).replace(/\n/g,'<br>'); return r.b?('<b>'+h+'</b>'):h; }).join(''); }

/* ---- Multi-section content registry (each dataset self-registers; umrah back-filled) ---- */
window.CONTENT = window.CONTENT || {};
if(window.UMRAH_DATA && !window.CONTENT['umrah']) window.CONTENT['umrah'] = window.UMRAH_DATA;
function getData(id){ return window.CONTENT[id]; }
function getStation(dataId, stationId){ const d=getData(dataId); return d?d.sections.find(s=>s.id===stationId):null; }
function getMenu(id){ return window.SECTIONS.find(s=>s.id===id); }

function go(hash){ location.hash = hash; }
function toast(msg){
  let t=$('#toast'); t.textContent=msg; t.classList.add('show');
  clearTimeout(t._tm); t._tm=setTimeout(()=>t.classList.remove('show'),2200);
}

/* ---------------- Block rendering ---------------- */
function wrapDelimited(text, open, close, arClass){
  // wrap the open..close span (ayah/hadith) in arClass, keep everything else
  const i=text.indexOf(open); if(i<0) return '<span class="tr">'+esc(text)+'</span>';
  const j=text.indexOf(close, i+1); if(j<0) return '<span class="tr">'+esc(text)+'</span>';
  const before=text.slice(0,i), ar=text.slice(i,j+close.length), after=text.slice(j+close.length);
  let out='';
  if(before) out+='<span class="tr">'+esc(before)+'</span>';
  out+='<span class="ar">'+esc(ar)+'</span>';
  if(after) out+='<span class="tr">'+esc(after)+'</span>';
  return out;
}
function renderBlock(b){
  const t=fullText(b);
  switch(b.type){
    case 'bismillah':  return '<div class="b-bismillah">'+esc(t)+'</div>';
    case 'opening_dua':return '<div class="b-odua">'+esc(t)+'</div>';
    case 'greeting':   return '<div class="b-greeting">'+runsToHTML(b.runs)+'</div>';
    case 'doc_title':
    case 'doctitle':   return '<div class="b-doctitle">'+esc(t)+'</div>';
    case 'title':      return '';                       // shown in reader header
    case 'subtitle':   return '<div class="b-subtitle">'+esc(t)+'</div>';
    case 'subheading': return '<h3 class="b-subheading">'+runsToHTML(b.runs)+'</h3>';
    case 'ayah':       return '<div class="b-ayah">'+wrapDelimited(t,'﴿','﴾')+'</div>';
    case 'qayah':      return '<div class="b-ayah"><span class="ar">'+esc(t)+'</span></div>';
    case 'hadith':     return '<div class="b-hadith">'+wrapDelimited(t,'«','»')+'</div>';
    case 'dua':        return '<div class="b-dua">'+esc(t)+'</div>';
    case 'kdua':       return '<div class="b-kdua">'+runsToHTML(b.runs)+'</div>';
    case 'bullet':{
      let html=runsToHTML(b.runs);
      html=html.replace(/^(\s*[*\-•]+\.?\s*)/, m=>'<span class="mk">'+m+'</span>');
      return '<div class="b-bullet">'+html+'</div>';
    }
    default:           return '<p class="b-para">'+runsToHTML(b.runs)+'</p>';
  }
}

/* ---------------- Station meta ---------------- */
function stationEyebrow(sec){
  if(sec.eyebrow) return sec.eyebrow;
  if(sec.id==='intro') return 'پێشەکی';
  if(sec.id==='closing') return 'کۆتایی';
  return 'قۆناغی '+sec.num;
}
function stationDesc(sec){
  if(sec.desc) return sec.desc;
  if(sec.id==='intro')   return 'بسم الله، حەمد و پێشەکیی گەشتەکە';
  if(sec.id==='closing') return 'نزای کۆتایی و داواکاری لە خوای گەورە';
  const sub=sec.blocks.find(b=>b.type==='subtitle');
  return sub?fullText(sub):'';
}
function stationNode(sec){
  if(sec.node==='star') return ICONS.star;
  if(sec.node==='dua')  return ICONS.dua;
  if(sec.id==='intro')   return ICONS.star;
  if(sec.id==='closing') return ICONS.dua;
  return sec.num;
}

/* ====================================================================
   VIEWS
   ==================================================================== */
const appEl=()=>document.getElementById('app');

function topbar({title, back=true, actions='', home=true}){
  const lead = back
    ? '<button class="iconbtn ghost" aria-label="گەڕانەوە" onclick="history.back()">'+ICONS.back+'</button>'
    : '<button class="iconbtn ghost" aria-label="ڕێکخستن" onclick="go(\'#/settings\')">'+ICONS.gear+'</button>';
  const homeBtn = home ? '<button class="iconbtn ghost" aria-label="سەرەکی" onclick="go(\'#/\')">'+ICONS.home+'</button>' : '';
  const tail = (actions||'') + homeBtn;
  return '<div class="topbar">'
    + lead
    + '<div class="tb-title">'+esc(title)+'</div>'
    + (tail || '<span style="width:42px"></span>')
    + '</div>';
}

function viewHome(){
  const m=window.SECTIONS;
  let cont='';
  if(progress.lastRead){
    const dId=progress.lastRead.section, sId=progress.lastRead.station;
    const sec=getStation(dId,sId);
    const men=getMenu(dId);
    if(sec&&men){
      cont='<button class="continue-card" onclick="go(\'#/r/'+dId+'/'+sId+'\')">'
        +'<span class="cc-ic">'+ICONS.bookmark+'</span>'
        +'<span class="cc-tx"><span class="cc-ey">بەردەوامبە لە خوێندنەوە</span>'
        +'<span class="cc-tt">'+esc(men.title+' · '+sec.title)+'</span></span>'
        +'<span class="cc-go">'+ICONS.chev+'</span></button>';
    }
  }
  const cards=m.map(s=>{
    const isQuiz = s.kind==='quiz';
    const soon = isQuiz ? !window.QUIZ : !getData(s.id);
    const href = isQuiz ? '#/q' : '#/s/'+s.id;
    return '<button class="card'+(soon?' soon':'')+'" onclick="go(\''+href+'\')">'
      +'<span class="emblem">'+sectionIcon(s.icon)+'</span>'
      +'<span class="ct"><span class="tt">'+esc(s.title)+'</span><span class="ds">'+esc(s.desc)+'</span></span>'
      +(soon?'<span class="badge-soon">بەمزووانە</span>':'<span class="chev">'+ICONS.chev+'</span>')
      +'</button>';
  }).join('');

  return '<div class="topbar">'
      +'<button class="iconbtn ghost" aria-label="ڕێکخستن" onclick="go(\'#/settings\')">'+ICONS.gear+'</button>'
      +'<div class="tb-title">گەشتی عومرە</div>'
      +'<button class="iconbtn ghost" aria-label="گەڕان" onclick="go(\'#/search\')">'+ICONS.search+'</button>'
    +'</div>'
    +'<div class="screen view">'
      +'<div class="hero">'
        +'<div class="hero-frame"><span class="halo"></span><img src="./assets/img/logo.png" alt="گەشتی عومرە"></div>'
        +'<h1>گەشتی عومرە</h1>'
        +'<p class="tagline">ڕێبەرێکی ڕۆحی بۆ ناو نهێنییەکانی قۆناغەکانی عومرە</p>'
      +'</div>'
      + cont
      + '<div class="section-eyebrow">بەشەکان</div>'
      + '<div class="cards">'+cards+'</div>'
      + '<div id="installSlot"></div>'
      + '<div class="spacer"></div>'
    +'</div>';
}

function viewStations(dataId){
  const data=getData(dataId);
  const stations=data.sections.map(sec=>{
    const done=!!progress.done[dataId+'/'+sec.id];
    const node=stationNode(sec);
    const isGlyph=node.length>3;
    return '<div class="station'+(done?' done':'')+'">'
      +'<div class="rail"><div class="node">'+(isGlyph?node:esc(node))+'</div></div>'
      +'<button class="body" onclick="go(\'#/r/'+dataId+'/'+sec.id+'\')">'
        +'<div class="eyebrow">'+esc(stationEyebrow(sec))+'</div>'
        +'<div class="stt">'+esc(sec.title)+'</div>'
        +'<div class="sds">'+esc(stationDesc(sec))+'</div>'
      +'</button>'
    +'</div>';
  }).join('');

  const kicker=data.kicker||data.title;
  const intro=data.intro||(dataId==='umrah'?'گەشتێک بە ٩ قۆناغدا — لە ئیحرامەوە تا تاشین، لەگەڵ نهێنییە ڕۆحییەکانی هەر قۆناغێک.':'');
  return topbar({title:data.title})
    +'<div class="screen view">'
      +'<div class="path-intro">'
        +'<div class="ornament">'+ICONS.star+'</div>'
        +'<div class="pi-kicker">'+esc(kicker)+'</div>'
        +(intro?'<p>'+esc(intro)+'</p>':'')
      +'</div>'
      +'<div class="path">'+stations+'</div>'
      +'<div class="spacer"></div>'
    +'</div>';
}

function viewReader(dataId, stationId){
  const data=getData(dataId);
  if(!data){ go('#/'); return ''; }
  const idx=data.sections.findIndex(s=>s.id===stationId);
  const sec=data.sections[idx];
  if(!sec){ go('#/s/'+dataId); return ''; }

  // mark progress (namespaced per dataset so ids never collide)
  progress.done[dataId+'/'+sec.id]=true;
  progress.lastRead={section:dataId, station:sec.id};
  saveProgress();

  const body=sec.blocks.map(renderBlock).join('');
  const prev=data.sections[idx-1], next=data.sections[idx+1];
  const nav='<div class="reader-nav">'
    + (prev?'<button class="rn-prev" onclick="go(\'#/r/'+dataId+'/'+prev.id+'\')">'+ICONS.back
        +'<span class="lbl"><small>پێشوو</small><b>'+esc(prev.title)+'</b></span></button>'
        :'<button class="rn-prev" disabled>'+ICONS.back+'<span class="lbl"><small>پێشوو</small><b>—</b></span></button>')
    + (next?'<button class="rn-next" onclick="go(\'#/r/'+dataId+'/'+next.id+'\')"><span class="lbl"><small>دواتر</small><b>'+esc(next.title)+'</b></span>'+ICONS.chev+'</button>'
        :'<button class="rn-next" disabled><span class="lbl"><small>دواتر</small><b>—</b></span>'+ICONS.chev+'</button>')
    +'</div>';

  const actions='<button class="iconbtn ghost" aria-label="هاوبەشکردن" onclick="shareStation(\''+dataId+'\',\''+sec.id+'\')">'+ICONS.share+'</button>';

  // Reader header: prefer an exact original title block (umrah); else the section label (no character is ever dropped — every paragraph is in the body)
  const titleBlock=sec.blocks.find(b=>b.type==='title');
  const headTitle=titleBlock?fullText(titleBlock):sec.title;

  return topbar({title:data.title, actions})
    +'<div class="screen view reader">'
      +'<div class="reader-head">'
        +'<div class="rh-eyebrow">'+esc(stationEyebrow(sec))+'</div>'
        +'<h1 class="rh-title">'+esc(headTitle)+'</h1>'
      +'</div>'
      +'<div class="ornament">'+ICONS.star+'</div>'
      +'<div class="content">'+body+'</div>'
      + nav
    +'</div>'
    +'<button class="fab" aria-label="ڕێکخستنی خوێندنەوە" onclick="openReadSheet()">'+ICONS.aa+'</button>';
}

function viewComingSoon(id){
  const s=getMenu(id);
  if(!s) { go('#/'); return ''; }
  if(id==='questions'){
    return topbar({title:s.title})
      +'<div class="screen view"><div class="soon-view">'
        +'<div class="sv-em">'+ICONS.quiz+'</div>'
        +'<h2>'+esc(s.title)+'</h2>'
        +'<div class="sv-badge">بەمزووانە</div>'
        +'<p>ئەم بەشە بریتی دەبێت لە پێشبڕکێیەکی زیندوو لە نێوان <b>گروپی یەکەم</b> و <b>گروپی دووەم</b>دا، لەگەڵ داشبۆردی نمرە لە سەرەوە و دوگمەی نمرەدان بۆ هەر پرسیارێک.</p>'
      +'</div></div>';
  }
  return topbar({title:s.title})
    +'<div class="screen view"><div class="soon-view">'
      +'<div class="sv-em">'+sectionIcon(s.icon)+'</div>'
      +'<h2>'+esc(s.title)+'</h2>'
      +'<div class="sv-badge">بەمزووانە</div>'
      +'<p>'+esc(s.desc)+'. ئەم بەشە بەمزووانە زیاد دەکرێت ان شاء اللە.</p>'
    +'</div></div>';
}

/* ---------------- Search ---------------- */
let SEARCH_INDEX=null;
function buildIndex(){
  if(SEARCH_INDEX) return SEARCH_INDEX;
  SEARCH_INDEX=[];
  Object.keys(window.CONTENT).forEach(dataId=>{
    const data=window.CONTENT[dataId];
    data.sections.forEach(sec=>{
      sec.blocks.forEach(b=>{
        const t=fullText(b).trim();
        if(t.length>1) SEARCH_INDEX.push({dataId, station:sec.id, loc:data.title+' · '+sec.title, text:t});
      });
    });
  });
  return SEARCH_INDEX;
}
function norm(s){ return s.replace(/[\u064B-\u0652\u0670]/g,''); } // strip tashkeel for matching
function runSearch(q){
  const idx=buildIndex(); q=q.trim();
  const box=$('#searchResults');
  if(q.length<2){ box.innerHTML='<div class="empty">'+ICONS.empty+'<div>ووشەیەک بنووسە بۆ گەڕان لە ناو ناوەڕۆکی گەشتی عومرە.</div></div>'; return; }
  const nq=norm(q);
  const hits=idx.filter(it=>norm(it.text).includes(nq)).slice(0,40);
  if(!hits.length){ box.innerHTML='<div class="empty">'+ICONS.empty+'<div>هیچ ئەنجامێک نەدۆزرایەوە بۆ «'+esc(q)+'».</div></div>'; return; }
  box.innerHTML=hits.map(h=>{
    let i=norm(h.text).indexOf(nq);
    let start=Math.max(0,i-30);
    let snip=(start>0?'…':'')+h.text.slice(start,i+nq.length+50)+(i+nq.length+50<h.text.length?'…':'');
    // highlight (best-effort on raw)
    const re=new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','g');
    snip=esc(snip).replace(new RegExp('('+esc(q).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','g'),'<mark>$1</mark>');
    return '<button class="search-result" onclick="go(\'#/r/'+h.dataId+'/'+h.station+'\')">'
      +'<div class="sr-loc">'+esc(h.loc)+'</div>'
      +'<div class="sr-tx">'+snip+'</div></button>';
  }).join('');
}
function viewSearch(){
  setTimeout(()=>{ const i=$('#searchInput'); if(i){ i.focus(); runSearch(''); } },60);
  return topbar({title:'گەڕان'})
    +'<div class="screen view">'
      +'<div class="search-bar">'+ICONS.search
        +'<input id="searchInput" type="search" placeholder="گەڕان لە ناوەڕۆکی گەشتی عومرە…" '
        +'oninput="runSearch(this.value)" enterkeyhint="search" autocomplete="off">'
      +'</div>'
      +'<div id="searchResults"></div>'
    +'</div>';
}

/* ---------------- Settings ---------------- */
function seg(cur, items, fn){
  return '<div class="segmented">'+items.map((it,i)=>{
    const val=Array.isArray(it)?it[0]:i, lbl=Array.isArray(it)?it[1]:it;
    const active=(val===cur)?' active':'';
    return '<button class="'+active.trim()+'" onclick="'+fn+'('+(typeof val==='string'?("\'"+val+"\'"):val)+')">'+esc(lbl)+'</button>';
  }).join('')+'</div>';
}
/* ====================================================================
   QUIZ — پرسیارەکان (live two-group scoreboard)
   ==================================================================== */
let qRevealed = {};   // transient: which questions have their answer revealed this session
function quizCat(id){ return window.QUIZ ? window.QUIZ.categories.find(c=>c.id===id) : null; }
function quizQ(c,qid){ return c ? c.questions.find(q=>q.id===qid) : null; }
function qKey(catId,qId){ return catId+'/'+qId; }
function quizScores(){
  let g1=0,g2=0;
  for(const k in quiz.awards){ const a=quiz.awards[k]; if(a==='g1'||a==='both')g1++; if(a==='g2'||a==='both')g2++; }
  return {g1,g2};
}
function catDone(c){ return c.questions.reduce((n,q)=> n + (quiz.awards[qKey(c.id,q.id)]!==undefined?1:0), 0); }
function quizTotals(){ let total=0,done=0; (window.QUIZ.categories||[]).forEach(c=>{ total+=c.questions.length; done+=catDone(c); }); return {total,done}; }
function setAward(catId,qId,val){
  const k=qKey(catId,qId);
  if(quiz.awards[k]===val) delete quiz.awards[k];   // tap same award again → un-answer
  else quiz.awards[k]=val;
  saveQuiz(); render();
}
function clearAward(catId,qId){ delete quiz.awards[qKey(catId,qId)]; saveQuiz(); render(); }
function resetQuiz(){
  if(typeof confirm==='function' && !confirm('دڵنیایت لە سفرکردنەوەی هەموو نمرە و پرسیارە کراوەکان؟')) return;
  quiz.awards={}; saveQuiz(); render(); toast('نمرەکان سفر کرانەوە');
}
function renameGroup(g){
  const v = (typeof prompt==='function') ? prompt('ناوی گروپ:', quiz.names[g]||'') : null;
  if(v!=null && v.trim()){ quiz.names[g]=v.trim().slice(0,24); saveQuiz(); render(); }
}
function revealAnswer(catId,qId){ qRevealed[qKey(catId,qId)]=true; render(); }

function scoreboard(compact){
  const s=quizScores();
  const lead = s.g1>s.g2?'g1':(s.g2>s.g1?'g2':'');
  const team=(g,score)=>'<div class="sb-team team-'+g+(lead===g?' lead':'')+'">'
    +'<div class="sb-name">'+esc(quiz.names[g])
      +(compact?'':' <button class="sb-edit" aria-label="ناوگۆڕین" onclick="renameGroup(\''+g+'\')">'+ICONS.pencil+'</button>')+'</div>'
    +'<div class="sb-score">'+toFa(score)+'</div>'
    +(lead===g?'<div class="sb-crown">'+ICONS.trophy+'</div>':'')+'</div>';
  return '<div class="scoreboard'+(compact?' compact':'')+'">'
    + team('g1',s.g1) + '<div class="sb-vs">بەرامبەر</div>' + team('g2',s.g2) + '</div>';
}

function viewQuiz(){
  const t=quizTotals();
  const cats=window.QUIZ.categories.map(c=>{
    const d=catDone(c), tot=c.questions.length, pct=tot?Math.round(d/tot*100):0;
    return '<button class="qcat" onclick="go(\'#/q/'+c.id+'\')">'
      +'<span class="emblem">'+sectionIcon(c.icon)+'</span>'
      +'<span class="qcat-tx"><span class="qcat-tt">'+esc(c.title)+'</span>'
        +'<span class="qcat-meta">'+toFa(d)+'/'+toFa(tot)+' کراو · ئامانج '+toFa(c.target)+'</span>'
        +'<span class="qbar"><span style="width:'+pct+'%"></span></span></span>'
      +'<span class="chev">'+ICONS.chev+'</span></button>';
  }).join('');
  return topbar({title:'پرسیارەکان'})
    +'<div class="screen view">'
      + scoreboard(false)
      +'<div class="q-progress">'+toFa(t.done)+' لە '+toFa(t.total)+' پرسیار کراوە</div>'
      +'<div class="section-eyebrow">بەشەکان</div>'
      +'<div class="cards">'+cats+'</div>'
      +'<button class="reset-btn" onclick="resetQuiz()">'+ICONS.reset+'<span>سفرکردنەوەی نمرەکان</span></button>'
      +'<div class="spacer"></div>'
    +'</div>';
}

function viewQuizCategory(catId){
  const c=quizCat(catId);
  if(!c){ go('#/q'); return ''; }
  if(!c.questions.length){
    return topbar({title:c.title})
      +'<div class="screen view">'
        + scoreboard(true)
        +'<div class="soon-view" style="padding-top:30px">'
          +'<div class="sv-em">'+sectionIcon(c.icon)+'</div>'
          +'<h2>'+esc(c.title)+'</h2>'
          +'<div class="sv-badge">بەمزووانە</div>'
          +'<p>پرسیارەکانی ئەم بەشە بەمزووانە زیاد دەکرێن — ئامانج '+toFa(c.target)+' پرسیارە.</p>'
        +'</div>'
      +'</div>';
  }
  const tiles=c.questions.map((q,i)=>{
    const a=quiz.awards[qKey(catId,q.id)];
    return '<button class="qtile'+(a!==undefined?' done a-'+a:'')+'" onclick="go(\'#/q/'+catId+'/'+q.id+'\')">'
      +'<span class="qn">'+toFa(i+1)+'</span>'
      +(a!==undefined?'<span class="qtick">'+ICONS.check+'</span>':'')+'</button>';
  }).join('');
  const lg=(cls,label)=>'<span><i class="lg '+cls+'"></i>'+esc(label)+'</span>';
  return topbar({title:c.title})
    +'<div class="screen view">'
      + scoreboard(true)
      +'<div class="qcat-head"><span class="emblem big">'+sectionIcon(c.icon)+'</span>'
        +'<div class="qch-tx"><div class="qch-tt">'+esc(c.title)+'</div>'
        +'<div class="qch-meta">'+toFa(catDone(c))+'/'+toFa(c.questions.length)+' پرسیار کراوە</div></div></div>'
      +'<div class="qlegend">'+lg('a-g1',quiz.names.g1)+lg('a-g2',quiz.names.g2)+lg('a-both','هەردووکیان')+lg('a-none','هیچیان')+'</div>'
      +'<div class="qgrid">'+tiles+'</div>'
      +'<div class="spacer"></div>'
    +'</div>';
}

function viewQuizQuestion(catId,qId){
  const c=quizCat(catId); const q=quizQ(c,qId);
  if(!c||!q){ go('#/q/'+catId); return ''; }
  const idx=c.questions.findIndex(x=>x.id===qId);
  const a=quiz.awards[qKey(catId,qId)];
  const shown=qRevealed[qKey(catId,qId)];
  const hasOpts=!!(q.options&&q.options.length);
  const validCorrect=hasOpts&&q.options.some(function(o){return o.k===q.correct;});
  const prev=c.questions[idx-1], next=c.questions[idx+1];
  const aw=(val,label,cls)=>'<button class="award '+cls+(a===val?' on':'')+'" onclick="setAward(\''+catId+'\',\''+qId+'\',\''+val+'\')">'
    +(a===val?'<span class="aw-check">'+ICONS.check+'</span>':'')+'<span>'+esc(label)+'</span></button>';
  const nav='<div class="reader-nav">'
    +(prev?'<button class="rn-prev" onclick="go(\'#/q/'+catId+'/'+prev.id+'\')">'+ICONS.back+'<span class="lbl"><small>پێشوو</small><b>پرسیاری '+toFa(idx)+'</b></span></button>'
        :'<button class="rn-prev" disabled>'+ICONS.back+'<span class="lbl"><small>پێشوو</small><b>—</b></span></button>')
    +(next?'<button class="rn-next" onclick="go(\'#/q/'+catId+'/'+next.id+'\')"><span class="lbl"><small>دواتر</small><b>پرسیاری '+toFa(idx+2)+'</b></span>'+ICONS.chev+'</button>'
        :'<button class="rn-next" disabled><span class="lbl"><small>دواتر</small><b>—</b></span>'+ICONS.chev+'</button>')
    +'</div>';
  return topbar({title:c.title})
    +'<div class="screen view">'
      + scoreboard(true)
      +'<div class="q-card">'
        +'<div class="q-num">پرسیاری '+toFa(idx+1)+' لە '+toFa(c.questions.length)+'</div>'
        +'<div class="q-text">'+esc(q.q)+'</div>'
        + (hasOpts
            ? '<div class="q-opts">'+q.options.map(function(o){
                var ok = shown && validCorrect && q.correct===o.k;
                return '<div class="q-opt'+(ok?' correct':'')+'">'
                  +'<span class="opt-k">'+esc(o.k)+'</span>'
                  +'<span class="opt-t">'+esc(o.t)+'</span>'
                  +(ok?'<span class="opt-tick">'+ICONS.check+'</span>':'')
                +'</div>';
              }).join('')+'</div>'
            : '')
        +(shown
            ? (function(){
                var inner='';
                if(!validCorrect) inner+='<div class="qa-label">وەڵام</div><div class="qa-text">'+esc(q.a)+'</div>';
                if(q.e) inner+='<div class="qa-label'+(validCorrect?'':' qa-exp-label')+'">ڕوونکردنەوە</div><div class="qa-text qa-exp">'+esc(q.e)+'</div>';
                return inner ? '<div class="q-answer">'+inner+'</div>' : '';
              })()
            : '<button class="q-reveal" onclick="revealAnswer(\''+catId+'\',\''+qId+'\')">'+ICONS.quiz+'<span>پیشاندانی وەڵام</span></button>')
      +'</div>'
      +'<div class="award-block">'
        +'<div class="award-title">نمرە بدە بە:</div>'
        +'<div class="award-grid">'
          + aw('g1',quiz.names.g1,'a-g1') + aw('g2',quiz.names.g2,'a-g2')
          + aw('both','هەردووکیان','a-both') + aw('none','هیچیان','a-none')
        +'</div>'
        +(a!==undefined?'<button class="award-clear" onclick="clearAward(\''+catId+'\',\''+qId+'\')">'+ICONS.reset+'<span>هەڵوەشاندنەوەی نمرە</span></button>':'')
      +'</div>'
      + nav
      +'<div class="spacer"></div>'
    +'</div>';
}

function viewSettings(){
  return topbar({title:'ڕێکخستن'})
    +'<div class="screen view">'
      +'<div class="set-row"><span class="si">'+(settings.theme==='dark'?ICONS.moon:ICONS.sun)+'</span>'
        +'<span class="st"><span class="t1">دۆخی ڕووناکی</span><span class="t2">'+(settings.theme==='dark'?'دۆخی شەو (تاریک)':'دۆخی ڕۆژ (ڕووناک)')+'</span></span>'
        +'<button class="toggle'+(settings.theme==='light'?' is-light':'')+'" aria-label="گۆڕینی دۆخ" onclick="toggleTheme()"><span class="knob">'+(settings.theme==='dark'?ICONS.moon:ICONS.sun)+'</span></button>'
      +'</div>'
      +'<div class="field"><label>قەبارەی فۆنت</label>'+seg(settings.fsize,FSIZE_LBL,'setFsize')+'</div>'
      +'<div class="field"><label>جۆری فۆنتی خوێندنەوە</label>'+seg(settings.font,FONT_LBL,'setFont')+'</div>'
      +'<div class="field"><label>بۆشایی نێوان دێڕەکان</label>'+seg(settings.lh,LH_LBL,'setLh')+'</div>'
      +'<div class="field preview-box"><span class="pl">پێشبینین</span>'
        +'<div class="pt">نموونەی دەق: گەشتی عومرە گەشتێکی ڕۆحییە بۆ نزیکبوونەوە لە خوای گەورە.</div></div>'
      +'<div class="set-row" onclick="go(\'#/about\')" style="cursor:pointer">'
        +'<span class="si">'+ICONS.info+'</span>'
        +'<span class="st"><span class="t1">دەربارەی ئەپ</span><span class="t2">زانیاری و وەشان</span></span>'
        +'<span class="cc-go">'+ICONS.chev+'</span></div>'
      +'<div class="set-row" onclick="resetReading()" style="cursor:pointer">'
        +'<span class="si">'+ICONS.reset+'</span>'
        +'<span class="st"><span class="t1">سفرکردنەوەی ڕێکخستنەکان</span><span class="t2">گەڕانەوە بۆ بنەڕەت</span></span></div>'
      +'<div class="spacer"></div>'
    +'</div>';
}
function viewAbout(){
  return topbar({title:'دەربارە'})
    +'<div class="screen view"><div class="about-card">'
      +'<img src="./assets/img/logo.png" alt="گەشتی عومرە">'
      +'<h2>گەشتی عومرە</h2>'
      +'<p>ڕێبەرێکی ڕۆحی بۆ ناو نهێنییەکانی قۆناغەکانی عومرە، بە زمانی کوردی سۆرانی. ئەم ئەپە بەبێ ئینتەرنێت کاردەکات و دەتوانرێت وەک ئەپێکی ڕاستەقینە دابمەزرێت.</p>'
      +'<p style="color:var(--gold)">ناوەڕۆکەکە بە تەواوی و بەبێ کەمکردنەوەی هیچ پیتێک لە سەرچاوەکەوە پارێزراوە.</p>'
      +'<div class="ornament">'+ICONS.star+'</div>'
      +'<div class="ver">وەشانی ١.٠ · گەشتی عومرە</div>'
    +'</div><div class="spacer"></div></div>';
}

/* ---------------- Settings actions ---------------- */
function toggleTheme(){ settings.theme = settings.theme==='dark'?'light':'dark'; saveSettings(); applySettings(); render(); }
function setFsize(i){ settings.fsize=i; saveSettings(); applySettings(); render(); }
function setFont(v){ settings.font=v; saveSettings(); applySettings(); render(); }
function setLh(i){ settings.lh=i; saveSettings(); applySettings(); render(); }
function resetReading(){ settings={theme:settings.theme,fsize:1,font:'modern',lh:1}; saveSettings(); applySettings(); render(); toast('ڕێکخستنەکان سفر کرانەوە'); }

/* ---------------- Reading sheet ---------------- */
function openReadSheet(){
  const html='<div class="grab"></div><h3>ڕێکخستنی خوێندنەوە</h3>'
    +'<div class="field"><label>قەبارەی فۆنت</label>'+seg(settings.fsize,FSIZE_LBL,'setFsizeS')+'</div>'
    +'<div class="field"><label>جۆری فۆنت</label>'+seg(settings.font,FONT_LBL,'setFontS')+'</div>'
    +'<div class="field"><label>بۆشایی دێڕەکان</label>'+seg(settings.lh,LH_LBL,'setLhS')+'</div>'
    +'<div class="field"><label>دۆخی ڕووناکی</label>'+seg(settings.theme,[['dark','شەو'],['light','ڕۆژ']],'setThemeS')+'</div>';
  $('#sheet').innerHTML=html;
  $('#scrim').classList.add('open'); $('#sheet').classList.add('open');
}
function closeSheet(){ $('#scrim').classList.remove('open'); $('#sheet').classList.remove('open'); }
function refreshSheet(){ if($('#sheet').classList.contains('open')) openReadSheet(); }
function setFsizeS(i){ settings.fsize=i; saveSettings(); applySettings(); refreshSheet(); }
function setFontS(v){ settings.font=v; saveSettings(); applySettings(); refreshSheet(); }
function setLhS(i){ settings.lh=i; saveSettings(); applySettings(); refreshSheet(); }
function setThemeS(v){ settings.theme=v; saveSettings(); applySettings(); refreshSheet(); }

/* ---------------- Share ---------------- */
async function shareStation(dataId, id){
  const data=getData(dataId); const sec=getStation(dataId,id);
  const text=(data?data.title:'گەشتی عومرە')+' — '+(sec?sec.title:'');
  try{
    if(navigator.share){ await navigator.share({title:'گەشتی عومرە', text, url:location.href}); }
    else { await navigator.clipboard.writeText(text+'\n'+location.href); toast('بەستەر کۆپی کرا'); }
  }catch(e){}
}

/* ====================================================================
   ROUTER
   ==================================================================== */
function render(){
  const h=location.hash.replace(/^#/,'') || '/';
  const parts=h.split('/').filter(Boolean);   // e.g. ['r','umrah','step1']
  let html='';
  closeSheet();
  if(parts.length===0){ html=viewHome(); }
  else if(parts[0]==='q'){
    if(!window.QUIZ){ html=viewHome(); }
    else if(parts.length===1){ html=viewQuiz(); }
    else if(parts.length===2){ html=viewQuizCategory(parts[1]); }
    else { html=viewQuizQuestion(parts[1],parts[2]); }
  }
  else if(parts[0]==='s'){ html = getData(parts[1]) ? viewStations(parts[1]) : viewComingSoon(parts[1]); }
  else if(parts[0]==='r'){ html = getData(parts[1]) ? viewReader(parts[1],parts[2]) : viewHome(); }
  else if(parts[0]==='search'){ html=viewSearch(); }
  else if(parts[0]==='settings'){ html=viewSettings(); }
  else if(parts[0]==='about'){ html=viewAbout(); }
  else { html=viewHome(); }
  appEl().innerHTML=html;
  window.scrollTo(0,0);
  mountInstall();
}
window.addEventListener('hashchange', render);

/* ====================================================================
   PWA — service worker + install
   ==================================================================== */
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  });
}
let deferredPrompt=null, installDismissed=LS.get('umrah.installDismissed',false);
window.addEventListener('beforeinstallprompt',(e)=>{ e.preventDefault(); deferredPrompt=e; mountInstall(); });
window.addEventListener('appinstalled',()=>{ deferredPrompt=null; installDismissed=true; mountInstall(); });

function isStandalone(){ return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true; }
function isIOS(){ return /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream; }
function mountInstall(){
  const slot=$('#installSlot'); if(!slot) return;
  if(installDismissed || isStandalone()){ slot.innerHTML=''; return; }
  if(deferredPrompt){
    slot.innerHTML='<div class="install-banner">'
      +'<span class="ib-ic">'+ICONS.install+'</span>'
      +'<span class="ib-t"><b>دامەزراندنی ئەپ</b><br>گەشتی عومرە وەک ئەپ زیاد بکە بۆ سەرەکیی مۆبایلەکەت.</span>'
      +'<button class="ib-go" onclick="doInstall()">دامەزراندن</button>'
      +'<button class="ib-x" aria-label="داخستن" onclick="dismissInstall()">✕</button></div>';
  } else if(isIOS() && !isStandalone()){
    slot.innerHTML='<div class="install-banner">'
      +'<span class="ib-ic">'+ICONS.iosshare+'</span>'
      +'<span class="ib-t"><b>زیادکردن بۆ سەرەکی</b><br>دوگمەی هاوبەشکردن '
      +'<span style="color:var(--gold)">⎋</span> لێبدە، پاشان «Add to Home Screen».</span>'
      +'<button class="ib-x" aria-label="داخستن" onclick="dismissInstall()">✕</button></div>';
  } else { slot.innerHTML=''; }
}
async function doInstall(){ if(!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; mountInstall(); }
function dismissInstall(){ installDismissed=true; LS.set('umrah.installDismissed',true); mountInstall(); }

/* ---------------- Boot ---------------- */
function boot(){
  applySettings();
  render();
  // hide splash
  setTimeout(()=>{ const s=$('#splash'); if(s) s.classList.add('hide'); }, 1500);
}
document.addEventListener('DOMContentLoaded', boot);
// expose handlers used in inline onclick
Object.assign(window,{go,runSearch,toggleTheme,setFsize,setFont,setLh,resetReading,
  openReadSheet,closeSheet,setFsizeS,setFontS,setLhS,setThemeS,shareStation,
  doInstall,dismissInstall,
  setAward,clearAward,resetQuiz,renameGroup,revealAnswer});
