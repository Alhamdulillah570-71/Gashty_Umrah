// ڕیجستری بەشەکانی سیستەم — مۆدیولار، بەشی نوێ بەئاسانی زیاد دەکرێت
// available:true ⇐ ناوەڕۆکی هەیە | available:false ⇐ بەمزووانە
// ناونیشانەکان وەک خۆیان دانراون. (وەسفە کورتەکان دەتوانرێن دواتر بگۆڕدرێن.)
window.SECTIONS = [
  { id:'umrah',         title:'گەشتی عومرە',                   desc:'گەشتی ڕۆحی بە ٧ قۆناغی پیرۆزی عومرەدا', icon:'kaaba',   available:true,  kind:'stations' },
  { id:'ibrahim-hajar', title:'پێغەمبەر ابراهيم و دایە هاجرە', desc:'بنیاتنانی کەعبە و چیرۆکی تەسلیمبوون',   icon:'family',  available:false },
  { id:'fursat',        title:'فرصەت لە دەست مەدە',             desc:'هەلە ڕۆحییەکان کە نابێت لەدەست بچن',     icon:'hourglass', available:false },
  { id:'bangbezh',      title:'بانگ بێژەکانی پێغەمبەر',         desc:'ئەوانەی بانگەوازی پێغەمبەریان هەڵگرت',   icon:'minaret', available:false },
  { id:'sibgha',        title:'صبغە',                          desc:'ڕەنگ و نیشانەی ئیمان',                   icon:'drop',    available:false },
  { id:'griya',         title:'ئەوکاتەی پێغەمبەر خودا گریا',     desc:'ئەو ساتانەی فرمێسکی پێغەمبەر هاتنە خوارەوە', icon:'cry',    available:false },
  { id:'zaid',          title:'زیدی کوڕی عەمری کوڕی نەوفەل',     desc:'گەڕان بەدوای دینی ڕاستەقینەدا',          icon:'seeker',  available:false },
  { id:'rumaysa',       title:'خاتوو ڕومەیصە',                 desc:'نموونەی ئیمان و خۆڕاگری',               icon:'rose',    available:false },
  { id:'questions',     title:'پرسیارەکان',                     desc:'پێشبڕکێی نمرە لە نێوان دوو گروپدا',       icon:'quiz',    available:false, kind:'quiz' },
];
