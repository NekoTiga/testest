'use strict';

function unionBoard(){
  const d = state.day;
  let out = '<p>The board is a cork wall of color: club signups, band flyers, a bake sale, a lost sock. Mixed in, always, the ones with the smiley — EAT WELL. FUEL WELL. FreshFix, in the same warm font as the vending machines.</p>';
  if (d >= 35) out += '<p>Under the FreshFix posters, half-hidden, someone has written in pen: <em>THE TRACKING IS REAL. COFFEE FLOOR TONIGHT.</em> Somebody’s scratched a line through the second sentence and written <em>careful</em>.</p>';
  if (d >= 90) out += '<p>There’s a notice in a frame, official-looking: <strong>New Student Health &amp; Wellness Office — appointments available, walk-ins welcome.</strong> It’s signed with a signature you don’t recognize. Nobody’s put a smiley on it.</p>';
  if (d >= 150) out += '<p>Someone has taped a printed photo to the board — the gym, chained, from the outside. Under it: <em>DOES ANYONE REMEMBER TREADMILLS?</em> It’s been there for weeks. Nobody’s taken it down.</p>';
  if (d >= 45 && !state.specDone) out += '<p>Among the flyers, a new one in clean, professional print: <strong>INDEPENDENT NUTRITION CONSULT — free, off-record, one outside practitioner.</strong> A hand-drawn arrow points to the front desk. Someone has written underneath, in pen: <em>she’s not from campus.</em></p>';
  return out;
}

function unionCrowd(){
  const pt = wTier(state.lbs);
  if (pt >= 6) return '<p>The union is busy, chairs full, the coffee line long. There’s a low hum of scooters at the doors, and a row of students sit in the lounge seats, enormous and still, trays on their laps, the drones already circling. Nobody in the room is in a hurry.</p>';
  if (pt >= 4) return '<p>The union is fuller than it was at the start of term — more trays on the tables, more students taking the long way around the chairs. A couple of them are visibly heavy now, settling into the couches with the slow weight of people who’ve given up hurrying.</p>';
  if (pt >= 2) return '<p>The union is the usual weekday crowd — students with laptops, a pickup game in the corner, coffee cups on every table. A few people look a little softer than they did in August, but nobody’s remarking on it.</p>';
  return '<p>The union is bright and loud — a pickup game in the corner, flyers on every table, the coffee line deep at the counter. Everyone here looks like they’re having a normal day, because they are. So are you.</p>';
}

addScreen('union', function (){
  state.unionVisits = (state.unionVisits || 0) + 1;
  const night = isNight();
  let html = '<h2>The student union</h2>';
  if (night){
    html += '<p>The union is closed — the chairs are up on the tables, the coffee counter dark, the lights down to the blue of the emergency lamps. Through the glass, a single drone circles the empty lobby, patient, checking.</p>';
  } else {
    html += unionCrowd();
  }
  html += '<p>The bulletin board covers one wall.</p>' + unionBoard();
  html += resMeetingPanel();
  const d = state.day;
  const specMeet = state.specBooked && !state.specDone && d >= state.specDay && !isNight();
  const specBook = !state.specBooked && !state.specDone && d >= 45 && !isNight();
  html += '<div class="actions">' +
    (night
      ? ''
      : btn('Coffee and a pastry — 12 cr', 'union:coffee') +
        btn('Play the arcade games — 15 cr', 'union:arcade') +
        btn('Look at the board closer', 'union:board') +
        (specBook ? btn('Book the outside nutrition consult — free', 'union:spec:book') : '') +
        (specMeet ? btn('Meet the outside specialist', 'union:spec:meet') : '')) +
    btn('Leave', 'nav', 'hub') +
    '</div>';
  return html;
});

addAction('union:spec:book', function (){
  apply({ specBooked: true, specDay: state.day + 3, screen: 'union', notice: 'You leave a request at the front desk. The woman who takes it doesn’t ask questions — she just writes your name and a time and slides the paper under the counter, like she’s been waiting to do it.' });
});
addAction('union:spec:meet', function (){
  const clean = !bandWorn() && state.selfcontrol >= 50;
  const p = { specDone: true, specMet: true, screen: 'union:spec', lastScene: 'union:spec' };
  if (clean){
    p.selfcontrol = Math.min(100, state.selfcontrol + 4);
    p.selfestem = Math.min(100, state.selfestem + 3);
    p.notice = 'The specialist leaves her card. +4 self-control · +3 self-esteem';
  } else {
    p.selfcontrol = Math.max(0, state.selfcontrol - 2);
    p.selfestem = Math.max(0, state.selfestem - 1);
    p.submission = Math.min(100, state.submission + 2);
    p.notice = 'The consult is filed. −2 self-control · −1 self-esteem · +2 submission';
  }
  apply(p);
});
addScreen('union:spec', function (){
  const clean = !bandWorn() && state.selfcontrol >= 50;
  let txt;
  if (clean){
    txt = '<p>She is a thin, brisk woman in a town coat, and she looks at you before she looks at the folder. “They wanted me to read their file,” she says, and puts it down unopened. “I wanted to read you.” She asks questions that aren’t on any form — how you sleep, whether the food feels like a choice, whether you can still say no. For forty minutes you are not a number. At the end she is quiet for a long moment. “The town clinic is still open. Tuesday mornings. If you can get to the gate, I’ll see you there — no file, no band, no campus.” She leaves her card on the table and a real, small smile. “You’re further along than you think you are. That’s the thing that scares them most — that you might notice it in time.”</p>';
  } else {
    txt = '<p>She meets you in a small room off the union, a thin, brisk woman in a town coat, and she’s already holding a folder with your name on it. “The campus was very efficient,” she says, “they sent everything over.” She reads it while you sit there, and her eyebrows go up, and then down, and she closes the folder. “Well,” she says, “the facilities here are excellent. Your care is thorough — they log everything. That’s better than most of what I see.” She fills out a form with a flourish and slides it toward you. “A second opinion,” she says. “You’re doing exactly what you should be.” You leave with a signed paper that says everything is fine, and the clinic’s chart already has a copy. She never asked how you feel. She didn’t need to — the folder told her everything, and the folder is very, very good at its job.</p>';
  }
  return '<h2>The consult</h2>' + txt + '<div class="actions">' + btn('Back to the union', 'nav', 'union') + '</div>';
});

addAction('union:coffee', function (){
  if (isNight()){
    apply({ notice: 'The union is closed.', screen: 'union' });
    return;
  }
  if (!canAfford(12)){
    apply({ notice: 'Not enough credits.', screen: 'union' });
    return;
  }
  const lines = [
    'You drink it black and too hot, the pastry flaking onto your shirt. It’s a normal coffee, a normal pastry, and your belly rounds against the waistband a little more than it did at the start of term.',
    'The pastry is warm and sweet, and you eat it before the coffee cools, crumbs sticking to the front of your shirt. By the time you finish the cup you’re a little heavier in the chair, a little slower to stand.'
  ];
  apply({ credits: state.credits - 12, glut: Math.min(state.capacity, state.glut + 2), crave: Math.min(100, state.crave + 1), screen: 'union', notice: '−12 cr. A snack, a coffee, a quiet minute. +2 stomach' });
});
addAction('union:arcade', function (){
  if (isNight()){
    apply({ notice: 'The union is closed.', screen: 'union' });
    return;
  }
  if (!canAfford(15)){
    apply({ notice: 'Not enough credits.', screen: 'union' });
    return;
  }
  apply({ credits: state.credits - 15, selfcontrol: Math.min(100, state.selfcontrol + 5), screen: 'union', notice: '−15 cr. The game glitches halfway through and gives you extra time, and you almost forget the whole thing. +5 self-control' });
});
addAction('union:board', function (){
  if (isNight()){
    apply({ notice: 'The union is closed.', screen: 'union' });
    return;
  }
  const d = state.day;
  let notice = 'Just flyers. Club signups, a bake sale, a lost sock.';
  if (d >= 35) notice = 'Under a FreshFix poster, small pen marks: “THE TRACKING IS REAL. COFFEE FLOOR TONIGHT.” A line’s been scratched through the second sentence — someone wrote “careful” over it.';
  apply({ notice: notice, screen: 'union' });
});
