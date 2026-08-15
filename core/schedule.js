'use strict';

const SCHED_LOC_NAMES = {
  room: 'the room', gym: 'the gym', bakery: 'the bakery', park: 'the park',
  commons: 'the commons', library: 'the library', lab: 'the lab',
  classes: 'class', quad: 'the quad', 'zola-room': 'her dorm'
};

const SCHED_NPC_NAMES = { piper: 'Piper', mina: 'Mina', ravi: 'Ravi', zola: 'Zola' };

let schedTxtCache = {};
function schedTxtKey(){
  return state.day + '|' + clockHour();
}
function schedPick(arr, key){
  const k = schedTxtKey();
  if (!schedTxtCache[k]) schedTxtCache[k] = {};
  if (!schedTxtCache[k][key]) schedTxtCache[k][key] = arr[Math.floor(Math.random() * arr.length)];
  return schedTxtCache[k][key];
}

function piperBeatPending(){
  return (!state.s0done && piperStage() === 0) || (!state.s1done && piperStage() === 1) || (!state.s3done && piperStage() === 3) || (state.day >= 40 && !state.piperq);
}
function minaBeatPending(){
  return state.day >= 45 && !state.minaQ;
}

function piperWhere(){
  const pt = piperTier(state.piperLbs);
  const part = clockPart();
  if (state.piperZola || pt >= 7 || state.piperSc < 30 || piperBeatPending()) return 'room';
  if (part === 'night') return 'room';
  const gymDay = state.day <= 28 && state.day % 2 === 0;
  if (part === 'morning'){
    if (pt <= 2 && gymDay) return 'gym';
    if (pt <= 2) return 'park';
    if (pt === 3) return 'bakery';
    if (pt <= 5) return 'commons';
    return 'room';
  }
  if (part === 'afternoon'){
    if (pt <= 3) return 'commons';
    if (pt <= 6) return 'bakery';
    return 'room';
  }
  if (pt <= 2 && gymDay) return 'gym';
  if (pt <= 2) return 'park';
  if (pt <= 5) return 'commons';
  if (pt <= 6) return 'bakery';
  return 'room';
}

function minaWhere(){
  const mt = minaTier(state.minaLbs);
  const part = clockPart();
  if (state.minaZola || mt >= 7 || state.minaSc < 60 || minaBeatPending()) return 'room';
  if (part === 'night') return 'room';
  if (part === 'morning'){
    if (mt <= 3) return 'lab';
    if (mt <= 5) return 'commons';
    return 'room';
  }
  if (part === 'afternoon'){
    if (mt <= 3) return 'lab';
    if (mt === 4) return 'library';
    if (mt <= 6) return 'bakery';
    return 'room';
  }
  if (mt <= 6) return 'commons';
  return 'room';
}

function raviWhere(){
  if (!state.metRavi) return '';
  return clockPart() === 'night' ? 'room' : 'library';
}

function zolaWhere(){
  if (!state.metZola || state.day < 30) return '';
  return clockPart() === 'night' ? 'zola-room' : 'commons';
}

function npcActive(npc){
  if (npc === 'piper') return !!state.piper1;
  if (npc === 'mina') return true;
  if (npc === 'ravi') return !!state.metRavi;
  if (npc === 'zola') return !!state.metZola;
  return false;
}

function piperWhereLine(){
  const pt = piperTier(state.piperLbs);
  const where = piperWhere();
  if (where === 'room'){
    if (state.piperZola) return 'Piper is in the room, curled into the mound of herself, a collar warm at her throat and a tray within reach.';
    if (pt >= 7) return 'Piper is in the room, spread wide across the reinforced bed, the tray table at her elbow and no intention of moving.';
    if (pt >= 5) return 'Piper is in the room, propped against the pillows with a show running and a tray in reach.';
    if (state.piperSc < 30) return 'Piper is in the room, lying on her back on the bed, half-dreaming, a hand resting on her belly.';
    return schedPick([
      'Piper is in the room, sprawled on her bed with a snack and a rerun.',
      'Piper is in the room, stretched out on the floor doing abs, sweating lightly.',
      'Piper is in the room, half-dressed and late for nothing, picking at a granola bar.'
    ], 'piper:room');
  }
  if (where === 'gym'){
    return schedPick([
      'Piper is at the gym, on the treadmill at the far wall, long even strides and a ponytail swinging.',
      'Piper is at the gym, spotting somebody on the bench, arms crossed, grinning.',
      'Piper is at the gym, doing the leg press rack, heavier than last week and smiling about it.'
    ], 'piper:gym');
  }
  if (where === 'park'){
    if (pt <= 1) return schedPick([
      'Piper is on the park path, running hard, the morning still cool around her.',
      'Piper is on the park path, doing sprints between the lampposts, breathing in rhythm.'
    ], 'piper:park:slim');
    if (pt <= 3) return 'Piper is on the park path, walking now more than running, her stride shorter than it used to be, stopping to catch her breath on the benches.';
    return 'Piper has given up the path for a bench, a pastry in one hand, watching the runners without watching them.';
  }
  if (where === 'bakery'){
    if (pt <= 3) return 'Piper is at the bakery, debating the glazed versus the cinnamon with the intensity of someone choosing between gym days. She picks the tray.';
    if (pt <= 5) return 'Piper is at the bakery, at the counter, two pastries in, and the girl behind the counter already knows her order.';
    return 'Piper is at the bakery, settled into a corner booth, a plate and a half in front of her and no sign of leaving.';
  }
  if (where === 'commons'){
    if (pt <= 3) return 'Piper is in the commons, tray balanced, eating with the steady unselfconscious rhythm of someone who used to burn it off.';
    if (pt <= 5) return 'Piper is in the commons, tray stacked higher than she’d have carried in August, eating slow and happy, crumbs in the fold of her shirt.';
    return 'Piper is in the commons, eating slowly and deliberately, the empty plates piling up beside her while she works through the tray.';
  }
  return 'Piper is somewhere on campus.';
}

function minaWhereLine(){
  const mt = minaTier(state.minaLbs);
  const where = minaWhere();
  if (where === 'room'){
    if (state.minaZola) return 'Mina is in the room, wrapped in the bathrobe that barely closes anymore, a collar at her throat and a tray at her side.';
    if (mt >= 7) return 'Mina is in the room, legs propped up, tablet in hand, the sheets pulled up over the curve of her belly.';
    if (state.minaSc < 60) return 'Mina is in the room, staring at her tablet without reading it, her hand resting on the soft rise of her stomach.';
    return schedPick([
      'Mina is in the room, at her desk, notes spread out, sipping a protein shake.',
      'Mina is in the room, doing a careful round of stretches, face set with concentration.',
      'Mina is in the room, on her bed with a book, a bag of carrot sticks at her elbow.'
    ], 'mina:room');
  }
  if (where === 'lab'){
    return schedPick([
      'Mina is at the lab, hunched over a centrifuge, her lab coat pulled tight across the shoulders.',
      'Mina is at the lab, arguing cheerfully with a grad student about sample sizes.',
      'Mina is at the lab, logging data at a terminal, her half-eaten lunch going cold beside her.'
    ], 'mina:lab');
  }
  if (where === 'library'){
    return schedPick([
      'Mina is in the library, at a table by the stacks, three books open and a highlighter in hand.',
      'Mina is in the library, frowning at a journal article, taking notes in the margins.'
    ], 'mina:library');
  }
  if (where === 'bakery'){
    if (mt <= 4) return 'Mina is at the bakery, getting exactly one pastry, eating it with her notes open on the table like it’s part of the experiment.';
    return 'Mina is at the bakery, one pastry and then another, telling herself it’s a controlled trial.';
  }
  if (where === 'commons'){
    if (mt <= 3) return 'Mina is in the commons, tray portioned with precision, eating with the neat methodical neatness of a woman who schedules everything.';
    if (mt <= 5) return 'Mina is in the commons, tray a little fuller than her own rules allow, eating steadily while she reads.';
    return 'Mina is in the commons, eating slowly and deliberately, a hand resting on her belly between bites.';
  }
  return 'Mina is somewhere on campus.';
}

function raviWhereLine(){
  const where = raviWhere();
  if (!where) return 'Ravi isn’t around yet.';
  if (where === 'room') return 'Ravi is in her own dorm, lights low, laptop screen the only glow.';
  return schedPick([
    'Ravi is at the library, at her usual carrel, headphones on and three screens going.',
    'Ravi is at the library, half-buried in a stack of journals, scribbling in a margin.',
    'Ravi is at the library, coffee going cold, watching the front door like she’s waiting for someone.'
  ], 'ravi:library');
}

function zolaWhereLine(){
  const where = zolaWhere();
  if (!where) return 'Zola hasn’t shown herself yet.';
  if (where === 'zola-room') return 'Zola is in her dorm, the door propped open, a drone fanning her through the gap.';
  return schedPick([
    'Zola is at her table in the commons, a spread of plates in front of her, waving people over with one ringed hand.',
    'Zola is at her table in the commons, working through a tray and a half, enjoying every bite like it’s an art form.',
    'Zola is at her table in the commons, holding court, her laugh carrying across the room.'
  ], 'zola:commons');
}

function npcAt(npc){
  if (npc === 'piper') return { where: piperWhere(), line: piperWhereLine() };
  if (npc === 'mina') return { where: minaWhere(), line: minaWhereLine() };
  if (npc === 'ravi') return { where: raviWhere(), line: raviWhereLine() };
  if (npc === 'zola') return { where: zolaWhere(), line: zolaWhereLine() };
  return { where: '', line: '' };
}

function npcHere(loc){
  const out = [];
  if (npcActive('piper') && piperWhere() === loc) out.push('piper');
  if (npcActive('mina') && minaWhere() === loc) out.push('mina');
  if (npcActive('ravi') && raviWhere() === loc) out.push('ravi');
  if (npcActive('zola') && zolaWhere() === loc) out.push('zola');
  return out;
}

function schedAtHome(npc){
  return npcActive(npc) && npcAt(npc).where === 'room';
}

function npcWhereLine(npc){
  if (!npcActive(npc)) return '';
  return npcAt(npc).line;
}

function npcWhereName(npc){
  if (!npcActive(npc)) return '';
  const where = npcAt(npc).where;
  return SCHED_LOC_NAMES[where] || 'somewhere on campus';
}

function npcHerePanel(loc){
  const here = npcHere(loc);
  if (!here.length) return '';
  const lines = here.map(function (npc){
    const line = npcWhereLine(npc);
    return '<p class="small">' + line + '</p>';
  });
  return '<div class="sched"><h3>People here</h3>' + lines.join('') + '</div>';
}

function schedHubPanel(){
  const parts = [];
  const order = ['piper', 'mina', 'ravi', 'zola'];
  for (let i = 0; i < order.length; i++){
    const npc = order[i];
    if (!npcActive(npc)) continue;
    const at = npcAt(npc);
    const where = SCHED_LOC_NAMES[at.where] || 'somewhere on campus';
    parts.push('<p class="small"><strong>' + SCHED_NPC_NAMES[npc] + '</strong> — ' + where + '. ' + at.line + '</p>');
  }
  if (!parts.length) return '';
  return '<h3>Around campus</h3>' + parts.join('');
}
