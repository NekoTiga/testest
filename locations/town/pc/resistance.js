'use strict';

const RES_MEMBERS = [
  { id: 'mara', name: 'Mara', home: 'union', sched: function (d){ return d % 3 === 0; }, blurb: 'a senior, pre-med, still lean and sharp-eyed — she reads the food labels no one else bothers with' },
  { id: 'jo', name: 'Jo', home: 'market', sched: function (d){ return d % 2 === 0; }, blurb: 'an ex-runner with a faded track singlet and a hate-on for the vending machines' },
  { id: 'priya', name: 'Priya', home: 'clinic', sched: function (d){ return d % 4 === 0; }, blurb: 'a quiet first-year who keeps a garden of vegetables in a boarded-up greenhouse behind the gym' }
];

const RES_SPOTS = { union: 1, market: 1, clinic: 1 };

const RES_DLG = {
  mara: [
    '<p>“The clinic logs every weigh-in,” she says, voice low, finger tapping the table. “There’s a file with your name on it — every pound, every tray, every skipped hour at the gym. It’s not health tracking. It’s an inventory.” She looks at you. “You’re the inventory.”</p>',
    '<p>“The app’s ‘predictive orders’?” Mara snorts. “They’re not predicting anything. They’re prescribing. You eat what they push, you weigh what they expect, and the machine calls it a success on both ends.” She taps her temple. “That’s the whole trick — making you grateful for the hand that feeds the file.”</p>',
    '<p>“The girl on my floor stopped fighting two weeks ago,” she says, quieter now. “She was like us. Then the band started praising her and she just… believed it. That’s the part that scares me. They don’t have to force you. They just have to make you want to be easy.”</p>'
  ],
  jo: [
    '<p>Jo’s thumb is worn, runner’s callus. “The vending machines, the dining hall, the ‘free’ welcome meals — everything’s measured. Everything’s a calorie they want inside you. I used to count mine out. Now I just count what they’re counting.”</p>',
    '<p>“The gym keys,” she says. “Owner’s office, not the front desk. I’ve seen the one who goes in. He comes out looking like a Wellness poster — heavier every week, and smiling about it. That’s what the weights are for in there now.”</p>',
    '<p>She catches you looking at her singlet. “I ran cross-country. Two years ago I could’ve outrun the whole campus.” She laughs, thin and dry. “Now I’m just outrunning the tray. Some days that’s all the resistance there is.”</p>'
  ],
  priya: [
    '<p>Priya keeps her voice low, both hands around a cup of something green. “The clinic weigh-ins aren’t optional — they just stopped calling them check-ins. The scale reads you like a number they’re growing on purpose.”</p>',
    '<p>“There’s a greenhouse, behind the gym. Vegetables.” She smiles, small and fierce. “The campus doesn’t know about it yet. Real food — the kind that keeps a body light. If you need something real, come find me. Not through the app.”</p>',
    '<p>She glances up at the drone circling the roofline. “They watch everything. The app knows when you eat, how much, how fast. The band knows your heartbeat. It’s all just data they’re collecting to feed you more.” She looks at you. “Don’t let them make you the data.”</p>'
  ]
};

function resActive(){
  return state.day >= 35 && !state.resShut;
}

function resPresent(loc){
  if (!resActive()) return [];
  if (isNight()) return [];
  if (pcLockedRoom()) return [];
  const out = [];
  for (let i = 0; i < RES_MEMBERS.length; i++){
    const m = RES_MEMBERS[i];
    if (m.home === loc && m.sched(state.day)) out.push(m);
  }
  return out;
}

function resTrusted(){
  return state.resTrust >= 15;
}

function resGuarded(){
  return bandWorn() && state.lbs >= 250;
}

function resZolaHeat(){
  return state.zola >= 40 && state.resTrust > 0;
}

function resMemberById(id){
  for (let i = 0; i < RES_MEMBERS.length; i++){
    if (RES_MEMBERS[i].id === id) return RES_MEMBERS[i];
  }
  return null;
}

function resMemberLine(id){
  const m = resMemberById(id);
  if (!m) return '';
  return '<p>' + m.name + ' is here — ' + m.blurb + '.</p>';
}

function resMeetingPanel(){
  if (!resActive() || isNight()) return '';
  const here = resPresent(state.screen);
  if (!here.length) return '';
  let html = '<div class="panel res-panel">';
  for (let i = 0; i < here.length; i++){
    const m = here[i];
    html += resMemberLine(m.id);
    html += '<div class="actions">' +
      btn('Talk to ' + m.name, 'res:talk', m.id) +
      btn('Offer her something from your bag', 'res:help', m.id) +
      (resTrusted() ? btn('Ask what she knows', 'res:tip', m.id) : '') +
      '</div>';
  }
  html += '</div>';
  return html;
}

function resErodeLine(){
  if (!(wTier(state.lbs) >= 5 && state.selfcontrol < 50)) return '';
  const t = wTier(state.lbs);
  if (t >= 8){
    return '<p class="quiet">She’s still talking — the labels, the files, the choice you still have — and you hear every word, and none of it lands. The argument has worn smooth, a pebble you’ve turned a thousand times. You believe her, the way you believe the weather. It doesn’t reach your hands. You nod, and your mouth is already watering for the walk back.</p>';
  }
  if (t >= 6){
    return '<p class="quiet">She talks about the files, the tracking, the choice you still have — and the words arrive smaller than they used to, like they’re coming through water. You hear the shape of the argument, the same shape you used to make yourself, and it doesn’t grip. You agree with her, distantly, the way you agree with a poster. It has nothing to do with your next meal.</p>';
  }
  return '<p class="quiet">Her arguments land — they always do — but they land softer than they used to. The old shape of them is worn, and you catch yourself running a hand over your belly while she talks, and you have to remind yourself to be angry, and the reminding takes longer every time.</p>';
}

addScreen('res-talk', function (){
  const m = resMemberById(state.resDlgMember);
  const me = state.resDlgMember === 'me';
  const name = me ? 'Your reflection' : (m ? m.name : 'The resistance');
  const dlg = m ? (RES_DLG[state.resDlgMember] || []) : [];
  const turn = state.resDlgTurn || 0;
  let html = '<h2>' + name + '</h2>';
  html += '<div class="talk">' + (state.resDlgText || (dlg[Math.min(turn, dlg.length - 1)] || '<p>She’s quiet, watching you.</p>')) + '</div>';
  if (!me) html += resErodeLine();
  if (me){
    html += '<div class="actions">' + btn('Done for now', 'nav', state.resDlgLoc || 'room') + '</div>';
    return html;
  }
  const keep = turn < dlg.length - 1 ? btn('Keep talking', 'res:keep') : '';
  html += '<div class="actions">' +
    keep +
    btn('Offer her something from your bag', 'res:help', state.resDlgMember) +
    (resTrusted() ? btn('Ask what she knows', 'res:tip', state.resDlgMember) : '') +
    btn('Leave her be', 'nav', state.resDlgLoc || 'hub') +
    '</div>';
  return html;
});

function resTrustGain(base){
  let g = base;
  if (resGuarded()) g = Math.ceil(g / 2);
  if (state.zolaCollar) g = 0;
  return g;
}

function resHelpItem(){
  for (const k in ITEMS){
    if (itemCount(k) > 0 && ITEMS[k].eat) return k;
  }
  return '';
}

addAction('res:talk', function (id){
  const m = resMemberById(id);
  if (!m) return;
  if (resGuarded()){
    const g = resTrustGain(10);
    apply({
      resTrust: Math.min(100, state.resTrust + g),
      selfcontrol: Math.min(100, state.selfcontrol + 2),
      screen: state.screen,
      notice: m.name + ' clocks the band on your wrist, the softness at your waist. She still talks — warily, shorter than she would. You hold your weight back from her half a dozen times. ' + (g ? '+' + g + ' trust' : 'She keeps her distance.') + ' · +2 self-control'
    });
    return;
  }
  if (state.zolaCollar){
    apply({
      screen: state.screen,
      notice: m.name + ' looks at the collar and goes quiet. Whatever she was about to say, she closes it down and steps back. “Not you,” she says. “Not you too.” You’re carrying the campus with you, and she can see it.'
    });
    return;
  }
  const g = resTrustGain(10);
  const dlg = RES_DLG[id] || [];
  apply({
    resTrust: Math.min(100, state.resTrust + g),
    resMet: true,
    resDlgMember: id,
    resDlgLoc: state.screen,
    resDlgTurn: 0,
    resDlgText: dlg[0] || '',
    selfcontrol: Math.min(100, state.selfcontrol + 5),
    lastScene: 'res:talk',
    screen: 'res-talk',
    notice: '+' + g + ' trust · +5 self-control'
  });
});

addAction('res:keep', function (){
  const m = resMemberById(state.resDlgMember);
  if (!m) return;
  const dlg = RES_DLG[state.resDlgMember] || [];
  const turn = (state.resDlgTurn || 0) + 1;
  if (turn >= dlg.length){
    apply({
      resDlgTurn: turn,
      resDlgText: '<p>' + m.name + ' shrugs. “That’s all I know for now. Keep your ears open.”</p>',
      screen: 'res-talk',
      notice: ''
    });
    return;
  }
  const g = resTrustGain(3);
  apply({
    resTrust: Math.min(100, state.resTrust + g),
    resDlgTurn: turn,
    resDlgText: dlg[turn],
    selfcontrol: Math.min(100, state.selfcontrol + 2),
    lastScene: 'res:talk',
    screen: 'res-talk',
    notice: (g ? '+' + g + ' trust · ' : '') + '+2 self-control'
  });
});

addAction('res:help', function (id){
  const m = resMemberById(id);
  if (!m) return;
  const item = resHelpItem();
  if (!item){
    apply({ screen: state.screen, notice: 'Your pockets are empty. She raises an eyebrow — “thought so” — and turns back to what she was doing.' });
    return;
  }
  const name = ITEMS[item].name;
  if (!removeItem(item, 1)){
    apply({ screen: state.screen, notice: 'You don’t have that anymore.' });
    return;
  }
  const g = resTrustGain(15);
  apply({
    resTrust: Math.min(100, state.resTrust + g),
    resDlgMember: id,
    resDlgLoc: state.screen,
    resDlgText: '<p>You hand over the ' + name + '. ' + m.name + ' takes it like it’s contraband — because it is. “We’ll ration it. Thank you.”</p>',
    selfcontrol: Math.min(100, state.selfcontrol + 3),
    lastScene: 'res:help',
    screen: 'res-talk',
    notice: '+' + g + ' trust · +3 self-control'
  });
});

addAction('res:tip', function (id){
  const m = resMemberById(id);
  if (!m) return;
  if (state.resTipDay === state.day){
    apply({ screen: state.screen, notice: m.name + ' shakes her head. “Nothing new today. Keep your ears open.”' });
    return;
  }
  state.resTipDay = state.day;
  const g = resTrustGain(5);
  const tips = [
    '“The clinic logs your weigh-ins,” she says. “Every time. There’s a file with your name on it, getting heavier.” +5 self-control for knowing.',
    '“The gym keys are kept by the owner’s office,” she says. “Not the front desk. The office.” She taps her temple. “I’ve seen the one who goes in.” +5 self-control for knowing.',
    '“The blue drinks,” she says, “aren’t the only thing they’re dosing. Check your coffee.” She’s joking. She’s not sure she’s joking.'
  ];
  const tip = tips[(Math.random() * tips.length) | 0];
  apply({
    resTrust: Math.min(100, state.resTrust + g),
    resDlgMember: id,
    resDlgLoc: state.screen,
    resDlgText: '<p>' + tip + '</p>',
    selfcontrol: Math.min(100, state.selfcontrol + 5),
    lastScene: 'res:tip',
    screen: 'res-talk',
    notice: '+' + g + ' trust · +5 self-control'
  });
});

addAction('res:betray', function (){
  if (!state.metRes){
    apply({ screen: state.screen, notice: 'There’s nobody here to tell on.' });
    return;
  }
  if (state.resShut){
    apply({ screen: state.screen, notice: 'There’s nothing left of them to betray.' });
    return;
  }
  state.resShut = true;
  apply({
    resTrust: 0,
    zola: Math.min(100, state.zola + 10),
    selfestem: Math.max(0, state.selfestem - 5),
    screen: state.screen,
    notice: 'You tell. You tell the campus — the clinic, the app, whoever is listening — about the girls who were fighting. It’s done in a sentence, and it’s done. The resistance goes quiet after that, the spots empty, the names gone from the board. Zola, later, calls you a good girl. +10 Zola · −5 self-esteem'
  });
});
