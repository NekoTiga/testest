'use strict';

addScreen('stats', function (){
  const tiers = ['lean', 'a little soft', 'soft', 'heavier', 'big', 'very big', 'huge', 'enormous', 'immobile'];
  const piperWords = ['lean and athletic', 'a little softer', 'visibly softer', 'properly heavy', 'soft and heavy', 'very heavy', 'huge', 'enormous', 'bed-bound and blissful'];
  const minaWords = ['slim and bookish', 'a little softer', 'visibly heavier', 'heavy', 'soft and heavy', 'very heavy', 'huge', 'enormous', 'bed-bound and blissful'];
  const clues = [];
  if (state.clue1) clues.push('the emptying gym');
  if (state.clue2) clues.push('proactive fulfillment');
  if (state.clue3) clues.push('the taste of the blue sample');
  if (state.clue4) clues.push('the drones know your name');
  if (state.clue5) clues.push('nobody leaves at 300 days');
  const clueTxt = clues.length ? clues.join(' · ') : 'none yet';
  let bandBtn = '';
  if (state.bandHandout){
    if (state.bandOn){
      bandBtn = btn(state.selfcontrol >= 50 ? 'Take off the Wellness+ wristband' : 'Try to take off the Wellness+ wristband', 'band-off');
    } else {
      bandBtn = btn('Put the Wellness+ wristband back on', 'band-on');
    }
  }
  const vibRow = '<tr><td>Comfort vibrator</td><td>' + (vibInstalled()
    ? (vibActive()
        ? (state.vibPortable ? 'portable — active' : 'room — active')
        : 'unplugged — in the drawer')
    : 'not installed') + '</td></tr>';
  let vibBtn = '';
  if (vibInstalled()){
    vibBtn = vibActive()
      ? (state.selfcontrol >= 50
          ? btn('Remove the Comfort vibrator', 'vib:remove')
          : btn('Try to remove the Comfort vibrator', 'vib:remove-block'))
      : btn('Give in and plug it back in', 'vib:on');
  }
  let scooterBtn = '';
  if (scooterOwned() && !state.agrav){
    scooterBtn = scooterActive()
      ? (state.selfcontrol >= 50
          ? btn('Stop using the scooter', 'scooter:off')
          : btn('Try to stop using the scooter', 'scooter:off-block'))
      : btn('Use the scooter again', 'scooter:on');
  }
  let collarBtn = '';
  if (state.zolaCollar){
    collarBtn = state.selfcontrol >= 100
      ? btn('Take off Zola’s collar', 'zola:collar:off')
      : btn('Try to take off Zola’s collar (needs 100 self-control)', 'zola:collar:off-block');
  }
  const tonicTxt = state.zolaMedGet
    ? (state.zolaMedSet ? 'nightly — you drink it before bed' : 'owned — on the shelf')
    : 'not yet';
  let tonicBtn = '';
  if (state.zolaMedGet){
    tonicBtn = state.zolaMedSet
      ? btn('Stop taking the tonic', 'zola:med:off')
      : btn('Take the tonic before bed', 'zola:med:on');
  }
  return `
    <h2>Your journal</h2>
    <table>
      <tr><td>Day</td><td>${state.day}</td></tr>
      <tr><td>Time</td><td>${clockText()} — ${state.clock >= 24 ? 'the day is over' : clockPart() + (classWindow() ? ' · classes are in session' : '')}</td></tr>
      <tr><td>Weight</td><td>${state.knownLbs == null ? '??? — you haven’t weighed in' : state.knownLbs + ' lbs — ' + tiers[wTier(state.knownLbs)]}</td></tr>
      <tr><td>Glut</td><td>${state.glut}/10</td></tr>
      <tr><td>Self-control</td><td>${sc()}/100</td></tr>
      <tr><td>Self-esteem</td><td>${state.selfestem}/100</td></tr>
      <tr><td>Craving</td><td>${Math.round(state.crave)}/100 — ${cravingLabel()}</td></tr>
      <tr><td>Sweat</td><td>${Math.round(state.sweat)}/100 — ${sweatLabel()}</td></tr>
      ${skinTier() >= 0 ? `<tr><td>Skin</td><td>${skinLabel()} (${Math.round(state.skin)}/100)${state.creamUse ? ' — you’ve been tending it' : ''}</td></tr>` : ''}
      <tr><td>Credits</td><td>${state.infCredits ? '∞' : state.credits}</td></tr>
      <tr><td>Wellness+ band</td><td>${state.bandHandout ? (state.bandOn ? 'worn' : 'removed') : 'not offered yet'}</td></tr>
      ${vibRow}
      <tr><td>Clues</td><td>${clueTxt}</td></tr>
      <tr><td>Ravi</td><td>${state.metRavi ? 'met — she sees it too' : 'not yet'}</td></tr>
      <tr><td>Ravi’s weight</td><td>${state.metRavi ? Math.round(raviLbs(state.day)) + ' lbs — ' + raviBody() : 'unknown'}</td></tr>
      <tr><td>Piper</td><td>${state.piperLbs.toFixed(1)} lbs — ${piperWords[piperTier(state.piperLbs)]}</td></tr>
      <tr><td>Piper’s self-control</td><td>${Math.round(state.piperSc)}/100</td></tr>
      <tr><td>Mina</td><td>${state.minaLbs.toFixed(1)} lbs — ${minaWords[minaTier(state.minaLbs)]}</td></tr>
      <tr><td>Mina’s self-control</td><td>${Math.round(state.minaSc)}/100</td></tr>
      <tr><td>Zola</td><td>${state.metZola ? Math.round(zolaLbs(state.day)) + ' lbs — approval ' + Math.round(state.zola) + '/100' + (zolaBigger() ? ' — you outweigh her' : '') : 'not yet — she appears in the commons after day 30'}</td></tr>
      <tr><td>Zola’s collar</td><td>${state.zolaCollar ? 'worn — hers' : (state.zolaCollarOff ? 'removed — she’ll notice' : 'not worn')}</td></tr>
      <tr><td>Zola’s tonic</td><td>${tonicTxt}</td></tr>
      <tr><td>Zola’s influence</td><td>${zolaInfluenceText()}</td></tr>
      <tr><td>Mina’s hunch</td><td>${state.minaQ ? (state.minaPress ? 'she’s suspicious too' : 'quietly avoiding it') : 'not yet'}</td></tr>
      <tr><td>Scooter rides</td><td>${state.scooters || 0}</td></tr>
      <tr><td>Anti-grav</td><td>${state.agrav ? 'yours — you always ride it now' : 'not yet'}</td></tr>
      <tr><td>Mobility scooter</td><td>${!scooterOwned() ? 'not assigned' : state.agrav ? 'retired — replaced by the anti-grav' : scooterActive() ? 'assigned — in use' : 'assigned — parked, you’re walking'}</td></tr>
      ${state.clinicDisabled ? '<tr><td>Care status</td><td>officially disabled — obesity-related mobility impairment, signed day ' + state.clinicDisabledDay + '. Rest is the assignment.</td></tr>' : ''}
    </table>
    <p class="small">Glut is how “fed” you are. Full, it clouds your nights and your judgment.</p>
    <p class="small">Self-control is how much of yourself you’re still steering. You start at 100, and it erodes as the band’s recommendations and the food do their work. The lower it gets, the lazier and more careless your choices become — and the harder it is to act against the campus.</p>
    <div class="actions">${bandBtn}${vibBtn}${scooterBtn}${collarBtn}${tonicBtn}${btn(pcLockedRoom() ? 'Back to the room' : 'Back to the quad', 'nav', pcLockedRoom() ? 'room' : 'hub')}</div>
    <h2 style="margin-top:26px">Debug</h2>
    <p class="small">Set stats directly (for testing).</p>
    <div class="actions">
      ${btn('Set day', 'debug:day')}
      ${btn('Set weight', 'debug:weight')}
      ${btn('Set self-control', 'debug:sc')}
      ${btn('Set Piper weight', 'debug:piper')}
      ${btn('Set Piper self-control', 'debug:piperSc')}
      ${btn('Set Mina weight', 'debug:mina')}
      ${btn('Set Mina self-control', 'debug:minaSc')}
      ${btn('Set Zola approval', 'debug:zola')}
      ${btn('Set craving', 'debug:crave')}
      ${btn('Set sweat', 'debug:sweat')}
      ${btn('Set skin', 'debug:skin')}
      ${btn('Hallucinations: ' + (state.hallucination ? 'ON' : 'OFF'), 'debug:halluc')}
      ${btn('Lucid dreams: ' + (state.lucid ? 'ON' : 'OFF'), 'debug:lucid')}
    </div>`;
});

addAction('band-off', function (){
  if (state.selfcontrol < 50){
    apply({ notice: 'You reach for the clasp — your fingers are thick with softness and won’t cooperate. The band hums, satisfied, pressing a red mark into the skin of your wrist.', screen: 'stats' });
    return;
  }
  apply({ bandOn: false, notice: 'The band comes off with a soft click and goes quiet. You tuck it into the desk drawer. Your wrist is bare now, the skin warm and damp where the band pressed, a pale groove left behind.', screen: 'stats' });
});
addAction('band-on', function (){
  apply({ bandOn: true, selfcontrol: state.selfcontrol - 5, notice: 'You slide it back on. It chimes: “Welcome back, well-being 64.” −5 self-control', screen: 'stats' });
});
addAction('vib:remove', function (){
  if (state.selfcontrol < 50){
    apply({ notice: 'Your fingers are thick with softness and your resolve is softer still. You reach for the drawer, and the band hums — a low, satisfied note — and you find you cannot quite make your hand close around it. The drawer stays shut.', screen: 'stats' });
    return;
  }
  apply({ vibOff: true, selfcontrol: state.selfcontrol - 2, notice: 'You lift it out and unplug it, then lay it in the drawer and close it. It goes quiet. The band on your wrist hums, patient, filing the decision away — and the drawer stays shut, holding it, waiting. −2 self-control', screen: 'stats' });
});
addAction('vib:on', function (){
  apply({ vibOff: false, selfcontrol: state.selfcontrol - 2, notice: 'You open the drawer and take it out. It hums back to life against your palm, warm and familiar, and you put it back where it goes. The band logs the whole thing as a success. −2 self-control', screen: 'stats' });
});
addAction('vib:remove-block', function (){
  apply({ notice: 'You reach for the drawer — and your hand stops. Your fingers are thick with softness, and somewhere underneath the hum of the band, a small part of you that still remembers the point of this decides you would rather not think about what the drawer contains. You pull your hand back and close it instead. The band hums, satisfied, and does not mention it.', screen: 'stats' });
});
addAction('scooter:off', function (){
  if (state.selfcontrol < 50){
    apply({ notice: 'You write it down — that you’ll walk from tomorrow — and your hand stops over the page. The scooter sits by the door, charged, its seat worn to your shape. You look at it, and the thought of crossing the quad on foot is a real, physical weight in your chest. You close the journal. The scooter stays where it is.', screen: 'stats' });
    return;
  }
  apply({ scooterOff: true, selfcontrol: state.selfcontrol - 2, notice: 'You unplug the scooter and wheel it against the wall. You’ll walk — you’ve decided. −2 self-control', screen: 'stats' });
});
addAction('scooter:off-block', function (){
  apply({ notice: 'You mean to walk. You write it down, and your hand stops over the page, thick and hesitant. The scooter sits by the door, charged, its seat worn to the shape of you, and the thought of crossing the quad on foot settles in your chest like a stone. You close the journal, and the band hums its low, satisfied note.', screen: 'stats' });
});
addAction('scooter:on', function (){
  apply({ scooterOff: false, notice: 'You walk out to the door, and the scooter hums to life at your approach, the seat already warm. You’re riding again. The campus doesn’t comment — it never had to.', screen: 'stats' });
});

addAction('zola:collar:off', function (){
  if (!state.zolaCollar){
    apply({ notice: 'You aren’t wearing it anymore.', screen: 'stats' });
    return;
  }
  if (state.selfcontrol < 100){
    apply({ notice: 'Your resolve wavers — the collar stays. You need every scrap of your self-control, all 100 of it, to lift it off. You don’t have it yet.', screen: 'stats' });
    return;
  }
  apply({ zolaCollar: false, zolaCollarOff: true, zola: Math.max(0, state.zola - 30), selfcontrol: 0, selfestem: Math.max(0, state.selfestem - 5), lastScene: 'zola:collar:off', notice: 'You take it off. It comes away with a soft click — the first free breath you’ve taken in weeks. Zola is going to be furious. You have spent every last drop of self-control to do it.', screen: 'stats' });
});
addAction('zola:collar:off-block', function (){
  apply({ notice: 'You reach for the collar — and your hand stops. The leather is warm, exactly where she put it, and somewhere under the hum of the band, a part of you that already belongs to her decides you would rather not find out what happens if you take it off. You let your hand fall. The collar stays.', screen: 'stats' });
});

addAction('zola:med:on', function (){
  apply({ zolaMedSet: true, selfcontrol: Math.max(0, state.selfcontrol - 2), notice: 'You take the tonic out of your bag and set it by the bed, where you’ll see it before you sleep. It’s warm through the glass, the way it’s always warm. −2 self-control', screen: 'stats' });
});
addAction('zola:med:off', function (){
  apply({ zolaMedSet: false, selfcontrol: Math.min(100, state.selfcontrol + 2), notice: 'You put the tonic back in the bag. It stays warm through the cloth. The ache in your knees is a little louder tonight, as if it missed you. +2 self-control', screen: 'stats' });
});

function debugPrompt(label, current, min, max){
  const v = prompt(label + ' (current: ' + current + '):', String(current));
  if (v == null) return null;
  const n = Math.floor(Number(v));
  if (isNaN(n)) return NaN;
  return Math.max(min, Math.min(max, n));
}

addAction('debug:day', function (){
  const n = debugPrompt('Set day', state.day, 1, 100000);
  if (n == null) return;
  if (isNaN(n)){ apply({ notice: 'Not a number.', screen: 'stats' }); return; }
  apply({ day: n, notice: 'Day set to ' + n + '.', screen: 'stats' });
});
addAction('debug:weight', function (){
  const n = debugPrompt('Set weight', Math.round(state.lbs), 130, 1000);
  if (n == null) return;
  if (isNaN(n)){ apply({ notice: 'Not a number.', screen: 'stats' }); return; }
  apply({ knownLbs: n, lbs: n, notice: 'Weight set to ' + n + ' lbs.', screen: 'stats' });
});
addAction('debug:sc', function (){
  const n = debugPrompt('Set self-control', Math.round(state.selfcontrol), 0, 100);
  if (n == null) return;
  if (isNaN(n)){ apply({ notice: 'Not a number.', screen: 'stats' }); return; }
  apply({ selfcontrol: n, notice: 'Self-control set to ' + n + '.', screen: 'stats' });
});
addAction('debug:piper', function (){
  const n = debugPrompt('Set Piper weight', Math.round(state.piperLbs), 1, 1000);
  if (n == null) return;
  if (isNaN(n)){ apply({ notice: 'Not a number.', screen: 'stats' }); return; }
  apply({ piperLbs: n, notice: 'Piper’s weight set to ' + n + ' lbs.', screen: 'stats' });
});
addAction('debug:piperSc', function (){
  const n = debugPrompt('Set Piper self-control', Math.round(state.piperSc), 0, 100);
  if (n == null) return;
  if (isNaN(n)){ apply({ notice: 'Not a number.', screen: 'stats' }); return; }
  apply({ piperSc: n, notice: 'Piper’s self-control set to ' + n + '.', screen: 'stats' });
});
addAction('debug:minaSc', function (){
  const n = debugPrompt('Set Mina self-control', Math.round(state.minaSc), 0, 100);
  if (n == null) return;
  if (isNaN(n)){ apply({ notice: 'Not a number.', screen: 'stats' }); return; }
  apply({ minaSc: n, notice: 'Mina’s self-control set to ' + n + '.', screen: 'stats' });
});
addAction('debug:mina', function (){
  const n = debugPrompt('Set Mina weight', Math.round(state.minaLbs), 1, 1000);
  if (n == null) return;
  if (isNaN(n)){ apply({ notice: 'Not a number.', screen: 'stats' }); return; }
  apply({ minaLbs: n, notice: 'Mina’s weight set to ' + n + ' lbs.', screen: 'stats' });
});
addAction('debug:crave', function (){
  const n = debugPrompt('Set craving', Math.round(state.crave), 0, 100);
  if (n == null) return;
  if (isNaN(n)){ apply({ notice: 'Not a number.', screen: 'stats' }); return; }
  apply({ crave: n, notice: 'Craving set to ' + n + '.', screen: 'stats' });
});
addAction('debug:sweat', function (){
  const n = debugPrompt('Set sweat', Math.round(state.sweat), 0, 100);
  if (n == null) return;
  if (isNaN(n)){ apply({ notice: 'Not a number.', screen: 'stats' }); return; }
  apply({ sweat: n, notice: 'Sweat set to ' + n + '.', screen: 'stats' });
});
addAction('debug:skin', function (){
  const n = debugPrompt('Set skin', Math.round(state.skin), 0, 100);
  if (n == null) return;
  if (isNaN(n)){ apply({ notice: 'Not a number.', screen: 'stats' }); return; }
  apply({ skin: n, notice: 'Skin set to ' + n + '.', screen: 'stats' });
});
addAction('debug:zola', function (){
  const n = debugPrompt('Set Zola approval', Math.round(state.zola), 0, 100);
  if (n == null) return;
  if (isNaN(n)){ apply({ notice: 'Not a number.', screen: 'stats' }); return; }
  apply({ metZola: true, zola: n, notice: 'Zola’s approval set to ' + n + '.', screen: 'stats' });
});
addAction('debug:halluc', function (){
  apply({ hallucination: !state.hallucination, notice: 'Hallucinations ' + (!state.hallucination ? 'enabled' : 'disabled') + '.', screen: 'stats' });
});
addAction('debug:lucid', function (){
  apply({ lucid: !state.lucid, notice: 'Lucid dreams ' + (!state.lucid ? 'enabled' : 'disabled') + '.', screen: 'stats' });
});
