'use strict';

const btn = (label, go, arg, disabled) =>
  `<button data-go="${go}"${arg == null ? '' : ` data-arg="${arg}"`}${disabled ? ' disabled' : ''}>${label}</button>`;

const stageBtn = (stage, label, go, arg, disabled) =>
  `<button data-go="${go}"${arg == null ? '' : ` data-arg="${arg}"`}${disabled ? ' disabled' : ''} class="gbtn"><img src="GUI/Buttons/Greasy/${stage}.png" alt=""><span class="gcap">${label}</span></button>`;

function colorize(html){
  const rf = /\b(belly|bellies|waist|thighs|hips|hungry|hungrier|hunger|burp|burps|burping|burped|greedy|greedily|gluttony|gluttonous|glutton|waddle|waddled|waddling|huge|enormous|vast|obese|immobile|heavy|heavier|heaviest|chubby|plump|pudge|pudgy|feed|feeds|feeding|fed|round|rounder|rounding|roundness|so soft|soft and heavy|soft and round|soft and plump|soft belly|soft flesh|soft mound|soft mountain|soft landscape|soft curve|round and soft|round mound|round belly|wide plateau|second helpings)\b/gi;
  const nm = /\b(Piper|Mina|Ravi|Zola)\b/g;
  return html.replace(/<[^>]*>|[^<]+/g, function (tok){
    if (tok.charAt(0) === '<') return tok;
    return tok.replace(rf, '<span class="rf">$&</span>').replace(nm, '<span class="nm">$&</span>');
  });
}

function pcStageImg(){
  const w = state.lbs;
  if (w < 160) return '130lbs-159lbs.jpg';
  if (w < 201) return '160lbs-200lbs.jpg';
  if (w < 251) return '201lbs-250lbs.jpg';
  if (w < 301) return '251lbs-300lbs.jpg';
  if (w < 351) return '301lbs-350lbs.jpg';
  if (w < 401) return '351lbs-400lbs.jpg';
  if (w < 451) return '401lbs-450lbs.jpg';
  if (w < 501) return '451lbs-500lbs.jpg';
  if (w < 551) return '501lbs-550lbs.jpg';
  if (w < 601) return '551lbs-600lbs.jpg';
  if (w < 651) return '601lbs-650lbs.jpg';
  if (w < 700) return '651lbs-699lbs.jpg';
  return '700lbs.jpg';
}
function pcPortraitImg(){
  const w = state.lbs;
  if (w < 160) return '130lbs-159lbs.jpg';
  if (w < 201) return '160lbs-200lbs.jpg';
  if (w < 251) return '201lbs-250lbs.jpg';
  if (w < 301) return '251lbs-300lbs.jpg';
  if (w < 351) return '301lbs-350lbs.jpg';
  if (w < 401) return '401lbs-450lbs.jpg';
  if (w < 451) return '401lbs-450lbs.jpg';
  if (w < 501) return '451lbs-500lbs.jpg';
  if (w < 551) return '501lbs-550lbs.jpg';
  if (w < 601) return '551lbs-600lbs.jpg';
  if (w < 651) return '601lbs-650lbs.jpg';
  if (w < 700) return '651lbs-699lbs.jpg';
  return pcNaked() ? 'Lbs700_noclothes+.jpg' : 'Lbs700+.jpg';
}
function pcStage(){
  const t = wTier(state.lbs);
  return t <= 2 ? 1 : t <= 5 ? 2 : 3;
}
let pcImgView = '';
const PC_VIEW_CYCLE = ['', 's', 'b'];
const PC_VIEW_LABEL = { '': 'front', s: 'side', b: 'back' };
function pcView(){
  return pcImgView;
}
function npcName(){
  const n = { piper: 'Piper', mina: 'Mina', library: 'Ravi', commons: 'The commons', zola: 'Zola', 'zola-room': 'Zola', bakery: 'The bakery', park: 'The park' }[state.screen];
  return n || '';
}

function render(){
  const el = function (id){ return document.getElementById(id); };
  el('statDay').textContent = state.day;
  el('statLbs').textContent = displayLbs() + ' lbs';
  el('statSelfcontrol').textContent = sc() + '/100';
  el('statSelf').textContent = state.selfestem;
  el('statCredits').textContent = state.infCredits ? '∞' : state.credits;
  if (el('statClock')) el('statClock').textContent = clockText();
  if (el('statStomach')) el('statStomach').textContent = fullness();
  if (el('statSubmission')) el('statSubmission').textContent = state.submission;
  if (el('statCrave')) el('statCrave').textContent = Math.round(state.crave);
  if (el('statSweat')) el('statSweat').textContent = Math.round(state.sweat);
  const pcImg = el('pcImg');
  if (pcImg){
    pcImg.src = 'GUI/PC_STAGES/Portraits/' + pcPortraitImg();
  }
  const cap = el('pcCaption');
  if (cap) cap.textContent = 'You — ' + PC_VIEW_LABEL[pcImgView] + ' view (click to change)';
  const npc = el('npcName');
  if (npc) npc.textContent = npcName();
  const mapCanvas = el('mapCanvas');
  if (mapCanvas) mapCanvas.innerHTML = mapSvg();
  const mapLoc = el('mapLoc');
  if (mapLoc) mapLoc.textContent = locName(state.screen) ? 'You are: ' + locName(state.screen) : '';
  const inv = el('invList');
  if (inv) inv.innerHTML = inventoryHtml();
  el('notice').textContent = state.notice;
  el('story').innerHTML = colorize(SCREENS[state.screen]());
}

function locName(screen){
  return PLACE_NAMES[screen] || '';
}

function inventoryHtml(){
  const items = state.items || {};
  const list = Object.keys(items).filter(function (k){ return (items[k] || 0) > 0; });
  if (!list.length) return '<span class="empty">Nothing in your pockets yet.</span>';
  const rows = list.map(function (k){
    const it = ITEMS[k];
    const name = it ? it.name : k;
    const use = it && !it.special
      ? '<button class="invu" data-go="items:use" data-arg="' + k + '">' + (it.eat ? 'Eat' : 'Use') + '</button>'
      : '';
    return '<div class="invrow"><span>' + name + ' <em class="invn">x' + items[k] + '</em>' + use + '</span></div>';
  });
  rows.push('<div class="invcap">Carry: ' + invUsed() + '/' + invCap() + '</div>');
  return rows.join('');
}

function saveToFile(){
  persist();
  const blob = new Blob([stateToFile()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'full-enrollment-save-day-' + state.day + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  state.notice = 'Save file downloaded.';
  render();
}
function openLoadDialog(){
  if (!window.confirm('Load a save file? This will overwrite your current progress in this browser.')) return;
  const inp = document.getElementById('loadFile');
  if (inp) inp.click();
}

document.addEventListener('click', function (e){
  if (e.target && e.target.id === 'pcImg'){
    const i = PC_VIEW_CYCLE.indexOf(pcImgView);
    pcImgView = PC_VIEW_CYCLE[(i + 1) % PC_VIEW_CYCLE.length];
    const pcImg = document.getElementById('pcImg');
    if (pcImg){
      pcImg.src = 'GUI/PC_STAGES/Portraits/' + pcPortraitImg();
    }
    const cap = document.getElementById('pcCaption');
    if (cap) cap.textContent = 'You — ' + PC_VIEW_LABEL[pcImgView] + ' view (click to change)';
    e.preventDefault();
    return;
  }
  const target = e.target;
  const el = target && target.closest ? target.closest('[data-go]') : null;
  if (!el) return;
  e.preventDefault();
  go(el.getAttribute('data-go'), el.getAttribute('data-arg'));
});

render();

(function initLoadInput(){
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.id = 'loadFile';
  inp.accept = '.json,application/json';
  inp.style.display = 'none';
  inp.addEventListener('change', function (){
    const file = inp.files && inp.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (){
      try {
        stateFromFile(String(reader.result || ''));
        state.notice = 'Save loaded from ' + file.name + '.';
        render();
      } catch (err){
        state.notice = 'Load failed: ' + (err && err.message ? err.message : 'not a valid save file.');
        render();
      }
    };
    reader.readAsText(file);
  });
  document.body.appendChild(inp);
})();

if (typeof window !== 'undefined'){
  window.DEMO = { go: go, get state(){ return state; } };
}
