'use strict';

function hallucinationNightLine(){
  const wT = wTier(state.lbs);
  const pool = [
    'You lie awake in the dark and think you hear the walls breathing — slow and contented, like a sleeper’s. You hold your breath. It stops. It’s always just the building settling.',
    'Something warm touches the inside of your wrist where the band is. You startle awake and the room is empty, and the band hums a low, satisfied note that might mean nothing at all.'
  ];
  if (wT >= 2) pool.push('In the half-dark you catch a plate at the foot of the bed, steaming, the air going thick and sweet — and when you reach for it your hand passes through, and the plate is gone, and the bed smells only of you.');
  if (wT >= 4) pool.push('You wake to a voice saying your name — low and patient, the way Zola’s is — and there’s no one there, only the drone hum, and the hum has learned to say it too, or you have.');
  if (wT >= 6) pool.push('A shape stands at the foot of the bed — wide and soft and smiling, Zola’s smile, her eyes warm amber — and you blink and it is only your own shadow on the wall, enormous, moving the way you’re not.');
  if (state.crave >= 60) pool.push('You dream of food and wake with your mouth full of nothing — grease and honey and hot bread still in the air — and it takes you a long moment to remember the tray isn’t real, and a longer one to care.');
  if (state.zolaMedCount >= 15) pool.push('The bottle on the nightstand glows faintly warm in the dark, and the label is your own name in her handwriting. You reach for it. It’s cold. It was never warm.');
  return pool[Math.floor(Math.random() * pool.length)];
}

function doSleep(){
  const lines = [];
  const reward = (!state.infCredits && state.day >= 60 && state.lbs > 300 && bandWorn()) ? 300 : 150;
  const prevPOff = state.piperBandOff;
  const prevMOff = state.minaBandOff;
  const converted = Math.round(state.glut * STOMACH_LB_PER_UNIT * 100) / 100;
  const over = Math.max(0, state.glut - state.capacity);
  const capGain = over / 2;
  const p = {
    day: state.day + 1,
    credits: reward,
    lbs: Math.round((state.lbs + converted + (bandWorn() ? 1 : 0)) * 100) / 100,
    glut: 0,
    capacity: Math.min(STOMACH_MAX, state.capacity + capGain),
    piperLbs: state.piperLbs + dormGain(state.piperLbs) + (piperWears() ? 1 : 0),
    minaLbs: state.minaLbs + dormGain(state.minaLbs) + (minaWears() ? 1 : 0),
    piperSc: Math.max(0, Math.min(100, state.piperSc + roommateScDelta(state.piperLbs, piperWears(), state.bandHandout))),
    minaSc: Math.max(0, Math.min(100, state.minaSc + roommateScDelta(state.minaLbs, minaWears(), state.bandHandout))),
    sampleUsed: false,
    secondsUsed: false,
    worked: false,
    worn: null,
    clock: CLOCK_START
  };
  if (state.fridgeNightDay === state.day) p.fridgeNightDay = 0;
  if (converted > 0){
    lines.push('Overnight, ' + Math.round(state.glut) + ' stomach units convert to about ' + converted + ' lbs of fat.');
  }
  if (over > 0){
    lines.push('You slept past full. Your stomach capacity grows by ' + Math.round(capGain * 10) / 10 + ' — now ' + Math.round(p.capacity) + '.');
  }
  if (state.lbs >= 600){
    p.selfestem = state.selfestem - 3;
    lines.push('The mattress sinks deep around the weight of you. Getting up takes longer every morning.');
  } else if (state.lbs >= 340){
    p.selfestem = state.selfestem - 2;
    lines.push('You heave yourself onto the bed, belly settling heavy across your thighs. The mattress protests.');
  } else if (state.lbs < 185){
    p.selfestem = state.selfestem + 1;
    lines.push('You fall asleep, your weight even and light, the sheets cool around you.');
  } else {
    lines.push('You fall asleep to the soft whir of a drone outside.');
  }
  if (state.lbs >= 500){
    lines.push('You settle in and the frame groans under the wide, heavy spread of your hips. You shift once, twice, and the bed takes the whole of it.');
  }
  if (state.lbs >= 800){
    lines.push('You dream of the hall — the door open, the light outside — and in the dream your body stays pinned to the bed, belly rising and falling, naked and enormous, and the door stays open and you do not move toward it.');
  }
  const erode = state.lbs >= 340 ? 1.5 : state.lbs >= 280 ? 1.0 : 0.5;
  p.selfcontrol = state.selfcontrol - erode;
  if (bandWorn()){
    p.selfcontrol -= 0.5;
    lines.push('The band logs your rest as a success. Somewhere, your wellness score climbs without you.');
  } else if (state.bandHandout){
    p.selfcontrol += 1;
    lines.push('Your wrist is bare. You sleep through the night unlogged.');
  }
  if (state.lbs >= 300 && state.glut >= 7){
    if (state.lucid){
      p.selfcontrol = Math.min(100, p.selfcontrol + 2);
      lines.push('Your sleep is gray and dreamless — until the gray folds like paper and you’re standing in the dream, awake in the way that matters. You walk the empty quad until dawn, and wake with your thoughts your own again.');
    } else {
      lines.push('Your sleep is gray and dreamless, and you wake heavy, the fullness still pressing at the walls of you.');
    }
  } else if (state.lbs >= 280){
    if (state.lucid){
      p.selfcontrol = Math.min(100, p.selfcontrol + 2);
      lines.push('You sleep heavy — and then the heaviness falls away and you’re light in the dream, aware, on your own two feet, walking where you want. You wake almost rested.');
    } else {
      lines.push('You sleep heavy and wake heavy.');
    }
  } else {
    if (state.lucid){
      p.selfcontrol = Math.min(100, p.selfcontrol + 2);
      lines.push('You dream of the quad in spring, quiet — and you know you’re dreaming. The light is wrong, the grass doesn’t bend, and you walk through it anyway, awake in the way that matters. You wake a little steadier than you went to sleep.');
    } else {
      lines.push('You dream of the quad in spring, quiet.');
    }
  }
  if (state.hallucination){
    lines.push(hallucinationNightLine());
  }
  const craveLines = craveOvernight(p);
  for (let k = 0; k < craveLines.length; k++) lines.push(craveLines[k]);
  const wT = wTier(state.lbs);
  if (wT >= 2){
    const skinDecay = wT >= 5 ? 8 : 4;
    p.skin = Math.max(0, (state.skin | 0) - skinDecay);
  }
  const skinBase = p.skin != null ? p.skin : (state.skin | 0);
  if (state.sweat >= 60){
    p.skin = Math.max(0, skinBase - 3);
    lines.push('You go to bed damp and wake chafed — the creases where you fold are red and tender where the sweat sat all night, raw against the sheets. You should have showered.');
  }
  if ((p.skin != null ? p.skin : skinBase) < 30){
    p.selfestem = Math.max(0, (p.selfestem != null ? p.selfestem : state.selfestem) - 1);
    p.crave = Math.min(100, (p.crave != null ? p.crave : state.crave) + 2);
    lines.push('The raw, chafed places ache against the sheets, and somewhere in the dark you eat to soothe it — telling yourself it isn’t hunger, and eating anyway.');
  }
  if (state.zolaMedGet && state.zolaMedSet){
    p.zolaMedCount = (state.zolaMedCount | 0) + 1;
    p.selfcontrol = Math.max(0, p.selfcontrol - 0.5);
    p.selfestem = Math.min(100, (p.selfestem != null ? p.selfestem : state.selfestem) + 1);
    p.skin = Math.min(100, (p.skin != null ? p.skin : (state.skin | 0)) + 3);
    lines.push('You drink the tonic before bed — warm and thick and faintly sweet, the way she handed it to you. It settles in your chest and spreads, and the ache in your knees is quieter in the morning.');
    const c = p.zolaMedCount;
    if (state.zolaMedCount < 5 && c >= 5) lines.push('This morning your canines feel… longer. You run your tongue along them. It’s probably nothing.');
    if (state.zolaMedCount < 15 && c >= 15) lines.push('In the dark of the bathroom mirror you catch your own eyes going amber, honey-pale, patient — the way hers do — and you blink, and they’re brown, and you don’t think about it. You’ve stopped thinking about it.');
    if (state.zolaMedCount < 25 && c >= 25) lines.push('You dream of a kitchen, warm and golden, and a woman with your face feeding you from her hands, and the dream feels like coming home.');
    if (state.zolaMedCount < 40 && c >= 40) lines.push('You wake with your canines long against your lip and the amber still warm in your eyes, and you look at the bottle on the nightstand, and you understand — you’ve understood for a while. You reach for it anyway. It’s what she’d want.');
  }
  if (state.day === 9) lines.push('The campus is quiet tonight. You dream normally.');
  if (state.day === 11) lines.push('All three bands chime in the dark, once, in perfect sync.');
  if (state.piperBandOff && !prevPOff) lines.push('Piper’s wrist is bare tonight. She sleeps easier — you can hear it.');
  if (state.minaBandOff && !prevMOff) lines.push('Mina took the band off. She left it on the desk like a sample she’d finished with.');
  if (state.piperLbs >= 800 && !state.piperPig){
    lines.push('Piper doesn’t come down for breakfast anymore. A drone carries her tray up, and comes back for the empty. The room is a little quieter, and a lot warmer.');
  }
  if (state.minaLbs >= 800 && !state.minaPig){
    lines.push('Mina doesn’t come down for breakfast anymore. A drone carries her tray up, and comes back for the empty. The room is a little quieter, and a lot warmer.');
  }
  if (state.zolaCorruptT > 0 && state.zolaIntro){
    const target = state.zolaIntro;
    const name = target === 'piper' ? 'Piper' : 'Mina';
    const gain = 10;
    if (target === 'piper'){
      p.piperLbs = Math.min(800, p.piperLbs + gain);
      p.piperSc = Math.max(0, p.piperSc - 10);
    } else {
      p.minaLbs = Math.min(800, p.minaLbs + gain);
      p.minaSc = Math.max(0, p.minaSc - 10);
    }
    p.zolaCorruptT = state.zolaCorruptT - 1;
    p.selfcontrol = Math.max(0, p.selfcontrol - 1);
    const left = p.zolaCorruptT;
    if (left > 0){
      lines.push('Zola’s voice is in your head all night — “let her eat until she’s happy. Let her be what the campus makes of everyone.” ' + name + ' shifts in the next room, restless, hungry. ' + left + ' more night' + (left === 1 ? '' : 's') + '.');
    } else {
      if (target === 'piper'){
        p.piperZola = true;
        p.piperCollar = true;
        p.piperLbs += 2;
      } else {
        p.minaZola = true;
        p.minaCollar = true;
        p.minaLbs += 2;
      }
      p.zolaCorruptDone = true;
      lines.push(name + ' is hers now. You hear it in the dark — the moaning, the wet, shameless eating, the same happy rhythm Zola keeps. The change is done. It can’t be undone. By morning there’s a collar on ' + name + ' — fitted while she slept, snug and warm, and she wears it like she was born to it.');
    }
  }
  if (state.piperZola) p.piperLbs += 2;
  if (state.minaZola) p.minaLbs += 2;
  if (state.day === 16) lines.push('Piper fell asleep mid-sentence, a tray still balanced on her lap.');
  if (state.day === 21) lines.push('Piper is a little softer this week. Neither of you mentions it.');
  if (state.day === 30) lines.push('Something in the hall clanks in the dark — the gym sign coming down, maybe.');
  if (state.day === 60) lines.push('It’s been sixty days. The bed holds your exact shape by now.');
  if (state.day === 90) lines.push('Mina hasn’t left the room all day. You’re not sure she’s eating.');
  if (state.day === 150) lines.push('A drone hums low over the roof, heavy with something. The night goes on.');
  if (state.day === 180) lines.push('A feeding tray clicks into place above your bed. You didn’t order it.');
  if (state.day === 300) lines.push('Below, the commons runs all night now — a warm, burping hum that never quite stops.');
  if (state.day >= 60 && state.lbs > 300 && bandWorn() && !state.allowance300){
    p.allowance300 = true;
    lines.push('The app pings at dawn: “Congratulations — model student. Your consistency is exemplary. Daily allowance raised to 300 credits.”');
  }
  if (state.day >= 100 && state.lbs > 600){
    p.infCredits = true;
    lines.push('The app pings at dawn: “Outstanding work. From today your credits are unlimited — as long as you keep up the good work!”');
  }
  overnight = lines;
  p.screen = 'sleep-summary';
  p.notice = '';
  apply(p);
}

addScreen('sleep', function (){
  const heavy = piperTier(state.piperLbs) >= 2;
  return `
    <h2>Your room — night</h2>
    <p>Day ${state.day} winds down. ${heavy ? 'Piper’s already asleep — you can hear her breathing, heavier than it used to be.' : 'Piper’s asleep, her running shoes still by the bed.'} Outside, a drone patrols the roofline.</p>
    <div class="actions">
      ${btn('Sleep', 'sleep:go')}
      ${btn('Stay up and watch the drone', 'sleep:watch')}
    </div>`;
});

addScreen('fridge-night', function (){
  const after = typeof AFTER['fridge-night'] === 'function' ? AFTER['fridge-night']() : AFTER['fridge-night'];
  return `
    <h2>Your room — the middle of the night</h2>
    ${after}
    <div class="actions">
      ${btn('Crawl back into bed', 'sleep:go')}
    </div>`;
});

addScreen('sleep-summary', function (){
  const scene = beddayScene;
  beddayScene = '';
  return `
    <h2>Day ${state.day} — morning</h2>
    ${scene}
    <p class="small">Overnight:</p>
    <ul class="night">${overnight.map(function (l){ return '<li>' + l + '</li>'; }).join('')}</ul>
    <p class="small">You wake with ${state.infCredits ? '∞ credits' : state.credits + ' credits'}. ${displayLbs()} lbs. ${sc()}/100 self-control.</p>
    <div class="actions">${btn('Wake up', 'nav', 'morning')}</div>`;
});

addAction('sleep:go', function (){
  if (fridgeNightTrigger()){
    apply({
      glut: Math.min(50, state.glut + 2),
      selfcontrol: Math.max(0, state.selfcontrol - 3),
      selfestem: Math.min(100, state.selfestem + 1),
      crave: Math.min(100, state.crave + 3),
      fridgeNightDay: state.day,
      lastScene: 'fridge-night',
      notice: 'You eat in the dark, not tasting it. Stomach +2 · −3 self-control · +1 self-esteem · +3 craving',
      screen: 'fridge-night'
    });
    return;
  }
  doSleep();
});
addAction('sleep:watch', function (){
  apply({ notice: 'It circles once, twice, then finds nothing worth reporting. It flies on.', screen: 'sleep' });
});
