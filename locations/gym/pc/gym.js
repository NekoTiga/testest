'use strict';

function gymEra(){
  const d = state.day;
  if (d <= 14) return 'busy';
  if (d <= 30) return 'thinning';
  if (d <= 59) return 'lounge';
  return 'snack';
}

function gymBurn(){
  const t = wTier(state.lbs);
  if (t <= 1) return 2;
  if (t === 2) return 1.7;
  if (t === 3) return 1.5;
  if (t === 4) return 1.2;
  if (t === 5) return 1;
  if (t === 6) return 0.7;
  return 0.4;
}

function gymWeightLine(){
  const t = wTier(state.lbs);
  const lines = [
    '<p>You step onto the floor and your body moves light and easy beneath your clothes, the drawstring of your joggers swinging as you walk. You fit in here. You belong in here.</p>',
    '<p>You step onto the floor and settle into the rhythm of it, the softness at your hips a little new, a little noticeable when you glance at the mirrors. Nobody looks twice. Neither do you.</p>',
    '<p>You cross to the machines and your belly rolls ahead of you, the waistband digging in. The mirror by the free weights shows a soft middle you’d rather not meet, and you angle past it. The seat creaks under you as you sit.</p>',
    '<p>You take the widest treadmill, and it hums to life under the weight of you. Your belly rests against the console in a soft, heavy fold, and you have to grip the rails to step on. You catch yourself in the mirror and look away.</p>',
    '<p>You pick the machine at the end — the reinforced one — and settle onto it with a creak of the frame. The weight of you sways a moment before it settles, belly heavy in your lap, thighs spilling over the seat. Somewhere behind you, a girl stops stretching to watch, then doesn’t.</p>',
    '<p>The floor is harder now than the food is easy. You take the one machine that doesn’t whine under you and lower yourself onto it, the whole soft mass of you spreading across the seat, your belly resting on your thighs, your breath already short from the walk across the room.</p>',
    '<p>You pick the bench in the corner and sit — the boards groan, and a man two machines over stops and stares and doesn’t hide it. You stare back until he looks away, and then you sit a while, catching your breath from the doorway, and wonder what you came here to do.</p>',
    '<p>The machines are all too small, the aisles too narrow, the mirrors too honest. You walk the floor twice, breathing hard, and settle on the bench by the wall — it takes the weight of you with a long groan — and you sit there, heavy and winded, and everyone in the room is very careful not to look at you.</p>'
  ];
  return lines[Math.min(t, lines.length - 1)];
}

function gymIntro(){
  const era = gymEra();
  let out;
  if (era === 'busy'){
    out = '<p>The gym is open and busy — treadmills humming, weights clanking, the room smelling of chalk and clean sweat. Every machine is taken, and the air is loud with effort.</p>';
  } else if (era === 'thinning'){
    out = '<p>The gym is open, but it’s quieter than it was at the start of term. Half the treadmills are taped off “for maintenance,” and someone has set a tray of free snack bars by the door. A few students wander in, take one, and wander back out without touching a machine.</p>';
  } else if (era === 'lounge'){
    out = '<p>The gym is still open, but it doesn’t feel like one anymore. The treadmills are dark, most of them draped with sheets. A row of vending machines hums along the back wall, and tables of free snacks stand where the benches used to be. Students stand around eating, and nobody works out.</p>';
  } else {
    out = '<p>The gym is a snack lounge now. The machines stand in rows under the sheets, the lights low, the vending row bright and humming. Free snacks cover every table, and the “energy booster” drinks glow in the machine like something worth the walk. It’s the least athletic room on campus, and it’s always full.</p>';
  }
  return out + gymWeightLine();
}

function piperGymSched(){
  if (!state.piper1) return false;
  return piperWhere() === 'gym';
}

function piperGymPanel(){
  if (!piperGymSched()) return '';
  const pt = piperTier(state.piperLbs);
  const run = pt === 0
    ? 'She’s all motion — long strides, even breathing, a runner who eats this for breakfast.'
    : pt === 1
      ? 'She’s running, but her stride is shorter than it was at move-in, and she has to slow to a jog twice, catching her breath with a rueful grin.'
      : 'She jogs at a pace she’d have called a warm-up in August, a soft sheen of sweat on her face, and she waves when she sees you, slowing to a walk.';
  return '<div class="panel"><p>Piper is on the treadmill at the far wall, ponytail swinging, a towel around her neck. ' + run + ' “Hey!” she calls, warm and bright. “Sweat with me? I’m on schedule.”</p><div class="actions">' + btn('Work out alongside Piper', 'gym:piper') + '</div></div>';
}

function gymZolaGate(){
  return state.metZola && !state.zolaCollar && state.zola >= 40 && state.zolaGymDay !== state.day;
}

function gymZolaPanel(){
  const t = wTier(state.lbs);
  let body;
  if (t >= 6){
    body = '<p>Zola is at the door of the gym before you’ve reached the machines, arms folded over the shelf of her belly, and her face is a mask of dark displeasure. “Wasting calories,” she says, flat. “On a treadmill. After everything this campus has done to feed you.” She points a thick finger at you, then drops her voice, and it goes almost warm — almost hungry — as her eyes travel over the heavy sway of your hips, the soft, wobbling roll of your middle. “Though I have to admit, sweet thing — watching all of you jiggle while you run is its own entertainment.” She smiles, slow. “Go on. Run. I’ll watch. I’ll enjoy it more than you will.”</p>';
  } else if (t >= 3){
    body = '<p>Zola appears in the gym doorway, arms folded over the soft shelf of her belly, disapproval plain on her face. “Working out?” she says, and it comes out like a question with no good answer. “After everything this campus feeds you, you burn it off? Where did I go wrong with you.” She watches you for a moment, and then her mouth curves, slow and pleased, as your body jiggles and settles with every step. “Though I suppose there’s something to be said for watching you bounce,” she admits, half to herself. “The calories you burn are nothing next to what I’ll put back on you tonight.”</p>';
  } else {
    body = '<p>Zola is leaning in the gym doorway when you arrive, and she is clearly not exercising. She takes in the room, then you, and lets out a long, disappointed sigh. “What are you doing here, sweet thing? The campus feeds you, I feed you — and you come here to burn it off?” She folds her arms over the swell of her belly. “You are wasting your potential. And yourself.” She pauses, then looks you over, and the corner of her mouth curls. “Still. There’s a wobble in you now that wasn’t there in August. Come find me after. We’ll do something about the rest of it.”</p>';
  }
  return '<div class="panel"><h3>Zola is here</h3>' + body + '<div class="actions">' +
    btn('Work out anyway, under her eye', 'gym:zola:go') +
    btn('Leave — she’s right', 'gym:zola:leave') +
    '</div></div>';
}

const GYM_AFTER_KEYS = ['gym:workout', 'gym:piper', 'gym:snack', 'gym:booster', 'gym:zola:go', 'gym:look:early', 'gym:look:clue', 'gym:look:again'];

addScreen('gym', function (){
  if (state.zolaCollar){
    return `
      <h2>The gym</h2>
      <p>You don’t come here. You can’t. Zola’s rule is absolute — the moment you drift toward the path, your feet slow, and the memory of her voice settles warm and heavy in your chest: <em>no gym, sweet thing. No burning off what I put on you.</em> You stand at the edge of the quad, and the gym stays greyed out on your map, and you turn around. The collar holds you to it.</p>
      <div class="actions">${btn('Leave', 'nav', 'hub')}</div>`;
  }
  const after = GYM_AFTER_KEYS.indexOf(state.lastScene) >= 0 ? AFTER[state.lastScene] : '';
  if (after){
    return `
      <h2>The gym</h2>
      <div class="talk">${typeof after === 'function' ? after() : after}</div>
      <div class="actions">${btn('Done', 'gym:reset')}${btn('Leave', 'nav', 'hub')}</div>`;
  }
  const era = gymEra();
  let html = '<h2>The gym</h2>';
  html += gymIntro();
  if (gymZolaGate()){
    html += gymZolaPanel();
  } else {
    html += piperGymPanel();
  }
  const actions = [];
  actions.push(btn(state.worked ? 'Work out — you’ve already trained today' : 'Work out (burn ~' + gymBurn() + ' lbs)', 'gym:workout', null, state.worked));
  if (era === 'thinning' || era === 'lounge' || era === 'snack') actions.push(btn('Grab a free snack', 'gym:snack'));
  if (era === 'lounge' || era === 'snack') actions.push(btn('Energy booster drink (free)', 'gym:booster'));
  if (era === 'lounge' || era === 'snack') actions.push(btn(state.clue1 ? 'Look around the quiet gym again' : 'Look around the quiet gym', 'gym:look'));
  actions.push(btn('Leave', 'nav', 'hub'));
  html += '<div class="actions">' + actions.join('') + '</div>';
  return html;
});

addAction('gym:reset', function (){
  apply({ lastScene: '', screen: 'gym' });
});

addAction('gym:workout', function (){
  if (state.worked){
    apply({ notice: 'You’ve already trained today. Your body needs rest.', screen: 'gym' });
    return;
  }
  const b = gymBurn();
  apply({
    worked: true,
    lbs: Math.round((state.lbs - b) * 100) / 100,
    glut: Math.max(0, state.glut - 1),
    selfcontrol: Math.min(100, state.selfcontrol + 5),
    selfestem: Math.min(100, state.selfestem + 3),
    sweat: Math.min(100, state.sweat + 5),
    lastScene: 'gym:workout',
    notice: '−' + b + ' lbs · +5 self-control · +3 self-esteem · the effort leaves you flushed and damp',
    screen: 'gym'
  });
});

addAction('gym:piper', function (){
  if (state.worked){
    apply({ lastScene: '', notice: 'You’ve already trained today, but you and Piper do a slow lap and stretch together instead.', screen: 'gym' });
    return;
  }
  apply({
    worked: true,
    selfcontrol: Math.min(100, state.selfcontrol + 6),
    selfestem: Math.min(100, state.selfestem + 5),
    sweat: Math.min(100, state.sweat + 6),
    clock: clockPlus(1),
    lastScene: 'gym:piper',
    notice: 'You train beside Piper. +6 self-control · +5 self-esteem · the company makes it easy',
    screen: 'gym'
  });
});

addAction('gym:snack', function (){
  apply({
    lbs: Math.round((state.lbs + 1) * 100) / 100,
    glut: Math.min(50, state.glut + 1),
    crave: Math.min(100, state.crave + 2),
    selfcontrol: Math.max(0, state.selfcontrol - 1),
    lastScene: 'gym:snack',
    notice: 'Free snack. +1 lb · Stomach +1 · +2 craving · −1 self-control — it’s free, so you take two',
    screen: 'gym'
  });
});

addAction('gym:booster', function (){
  apply({
    lbs: Math.round((state.lbs + 4) * 100) / 100,
    glut: Math.min(50, state.glut + 2),
    crave: Math.min(100, state.crave + 5),
    selfcontrol: Math.max(0, state.selfcontrol - 3),
    sweat: Math.min(100, state.sweat + 2),
    lastScene: 'gym:booster',
    notice: 'Energy booster drink. +4 lbs · Stomach +2 · +5 craving · −3 self-control · it says “energy”',
    screen: 'gym'
  });
});

addAction('gym:zola:go', function (){
  state.zolaGymDay = state.day;
  const b = gymBurn();
  apply({
    worked: true,
    lbs: Math.round((state.lbs - b) * 100) / 100,
    glut: Math.max(0, state.glut - 1),
    selfcontrol: Math.min(100, state.selfcontrol + 4),
    selfestem: Math.min(100, state.selfestem + 3),
    sweat: Math.min(100, state.sweat + 6),
    zola: Math.min(100, state.zola + 3),
    clock: clockPlus(1),
    lastScene: 'gym:zola:go',
    notice: 'You work out under her eye. −' + b + ' lbs · +4 self-control · +3 self-esteem · +3 approval · she watched the whole thing',
    screen: 'gym'
  });
});

addAction('gym:zola:leave', function (){
  state.zolaGymDay = state.day;
  const g = Math.min(50, state.glut + 8);
  apply({
    glut: g,
    selfcontrol: Math.max(0, state.selfcontrol - 12),
    selfestem: Math.min(100, state.selfestem + 4),
    submission: Math.min(100, state.submission + 5),
    zola: Math.min(100, state.zola + 8),
    clock: clockPlus(mealTime(8)),
    lastScene: 'gym:zola:leave',
    notice: 'She takes you to her room and feeds you an enormous post-workout meal. Stomach +8 (now ' + fullnessAt(g) + ') · converts to ~' + (8 * STOMACH_LB_PER_UNIT).toFixed(1) + ' lbs tomorrow · +8 approval · −12 self-control · +4 self-esteem · +5 submission',
    screen: 'zola-room'
  });
});

addAction('gym:look', function (){
  const era = gymEra();
  if (era === 'busy' || era === 'thinning'){
    apply({ lastScene: 'gym:look:early', screen: 'gym', notice: 'The gym is open and ordinary. There’s nothing off here yet.' });
    return;
  }
  if (!state.clue1){
    apply({ clue1: true, selfcontrol: state.selfcontrol + 10, lastScene: 'gym:look:clue', notice: 'Clue found: the emptying gym. +10 self-control', screen: 'gym' });
  } else {
    apply({ lastScene: 'gym:look:again', screen: 'gym', notice: 'The machines are still sheeted, the snacks still free. The clue stays where it was.' });
  }
});

AFTER['gym:workout'] = function (){
  const t = wTier(state.lbs);
  if (t >= 6){
    return '<p>You give the machine your best — which is to say you walk against it until your chest heaves and the soft mass of you wobbles with every stride, your belly bouncing against the strain of your shirt, your breath loud in the quiet room. It takes everything you have, and it buys you almost nothing, and you’re still proud of it. You grip the rail and let the sweat run, and when you step off, the machine sighs under you, relieved.</p>';
  }
  if (t >= 4){
    return '<p>You push through it — the walk, the wobble, the weight of you settling and swaying with every step, the mirror showing a soft body that moves a beat behind the motion. By the end your thighs are burning and your belly is damp with sweat, and you’re winded in a way that feels almost like winning. You stop the machine and stand there a while, hands on your knees, breath loud in your ears, and the room hums on around you.</p>';
  }
  return '<p>You fall into the rhythm of it easily — the stride, the pace, the sweat starting clean. Your body answers the machine the way it used to, and for twenty minutes you’re just someone working out, the day running off you with the effort. You finish flushed and steady, the small bright feeling of a thing done well settling over you as you step off.</p>';
};

AFTER['gym:piper'] = function (){
  const t = wTier(state.lbs);
  if (t >= 5){
    return '<p>Piper drops her pace to match yours without being asked, jogging slow beside you, her own softness settling with each step. “We’re a team now,” she says, warm and easy, and the two of you do a slow, rolling lap of the track, side by side, heavyset and happy. She slows to a walk first, grinning, and elbows you gently in the soft of your side. “See? That counts. We’ll be here again — I’m on a schedule, you know.”</p>';
  }
  return '<p>You take the machine beside hers and match her stride, and for a while it’s like August again — two girls running together, laughing at nothing, the world simple. Piper’s pace is slower than it used to be, and yours is slower than you’ll admit, and neither of you comments. When you finish, she towels off and knocks her water bottle against yours. “Same time in two days,” she says. “It’s on my schedule now.”</p>';
};

AFTER['gym:snack'] = function (){
  if (gymEra() === 'snack'){
    return '<p>The snack table is covered in wrapped bars and pastries, and nobody is watching who takes how many. You take two — it’s free — and eat them standing by the dark machines, crumbs settling on the soft shelf of your belly. Across the room, another student does the same. Nobody works out. The gym has become a place you come to eat, and you’re not sure anyone has noticed except you.</p>';
  }
  return '<p>The free snack bars sit in a neat tray by the door, a little sign propped against them: <em>FUEL WELL, ENJOY FREE.</em> You take one, then another — it’s free — and eat them standing, watching the empty floor. A girl walks in, takes a bar, and walks out without looking at a single machine. The tray is refilled by the time you leave.</p>';
};

AFTER['gym:booster'] = function (){
  return '<p>The drink glows in the machine — <em>ENERGY BOOSTER — ZERO GUILT, ALL FUEL</em> — and it’s free, so you take it. It’s thick and sweet, syrupy on the tongue, and it goes down easy, warm in your chest, and for a few minutes you do feel lighter, sharper, full of something bright. Then it settles. The brightness sinks into your middle like it belonged there, heavy and warm, and by the time you put the empty cup down you feel less like running and more like the nap the label never mentioned. You look at the machine. It hums, patient, full of more of the same. The label says zero guilt. It says nothing at all about pounds.</p>';
};

AFTER['gym:zola:go'] = function (){
  const t = wTier(state.lbs);
  if (t >= 5){
    return '<p>You climb on the machine under her eye, and you run — or you move the way you can, the whole soft weight of you wobbling and settling with every stride, your belly bouncing against your thighs. Zola watches the whole thing with her arms folded, and she does not hide her enjoyment. “There it is,” she murmurs, low enough that only you can hear, her eyes fixed on the rolling sway of your ass and the deep bounce of your belly. “That’s the show. I came for that.” She lets you finish, flushed and heaving, and then she walks over and pats the soft shelf of your middle with a warm, heavy hand. “There. Now come eat. You’ve earned it — and you’ll need the calories.”</p>';
  }
  return '<p>You run under her eye, and you can feel her watching the whole time — the softness of you bouncing and settling with every step, your hips swaying a beat behind the motion. When you finally stop, flushed and breathless, she is standing by the door with her arms folded, and her face has softened from displeasure into something closer to hunger. “See?” she says, walking over and settling a warm hand on the curve of your hip. “Even now you wobble when you move. The campus has been very good to you, sweet thing. Now come eat with me — we’re not done yet.”</p>';
};

AFTER['gym:zola:leave'] = function (){
  const t = wTier(state.lbs);
  const belly = t >= 6
    ? 'the huge, soft swell of your belly'
    : t >= 4
      ? 'the soft, heavy rise of your belly'
      : 'the gentle softness that’s been settling at your middle';
  return '<p>She is right, and you know it. You leave the gym with her, walking out of the quiet rows of dark machines into the daylight, her hand settled on the back of your neck like she’s guiding you somewhere you already belong. She doesn’t take you back to the commons. She takes you to her room — up the stairs at the back of the hall, her key turning the lock, the door closing behind you with a soft, final click — and she sits you on the bed and disappears, and comes back with a tray. Then another. Then a third.</p><p>“Post-workout meal,” she says, settling the last tray beside you, and she says it the way someone says <em>punishment</em>. “You went to the gym, sweet thing. You burned calories. Calories I put on you, calories this campus put on you, calories that belong to me.” She lifts the first bite herself and holds it to your lips. “Open.” You open. She feeds you every bite of all three trays — heavy, rich, endless things, your belly swelling warm and tight against your waistband while she murmurs praise and accusation in the same breath. “That’s my good girl,” she says, feeding you faster. “Naughty girl. Burning off what I put on you, like I wouldn’t notice.” By the end you’re groaning, full past full, ' + belly + ' a heavy, warm weight in your lap, and she sets the last empty tray aside and turns to you.</p><p>And then she is gentle. Her huge, warm hands settle on ' + belly + ' and begin to work — slow, kneading circles, pressing the ache out of the fullness, soothing the overfull stretch until you sag back into the pillows, eyes half closed, a soft sound falling out of you. “There,” she hums, working the pads of her thumbs in deep, careful circles. “You came to my gym to burn off my food, so I feed you more, and then I do this — fix you up, soften you, make sure it all stays put. That’s how this works, sweet thing. You get naughty, and I get to take care of you for it.” Her hands keep moving on your stuffed belly, slow and warm and possessive, and she is still scolding you, soft as a lullaby. “No more gym. No more wasting what I put on you. When you get ideas, you come find me, and I’ll remind you what you’re for. You’re for being fed, and being full, and being mine.” She kisses your forehead, and her hands keep working ' + belly + ' until you’re gone — pliant, warm, completely, entirely hers.</p>';
};

AFTER['gym:look:clue'] = function (){
  return '<p>You walk the quiet floor, and you look — properly look, for the first time. The taped-off treadmills aren’t waiting for maintenance; the tags are dated months back, the cords coiled and tied. Under the sheet on the last machine, a FreshFix key fob is wedged in the console, and beside it a maintenance log: <em>UNIT 14 — RETIRED. DO NOT REPAIR.</em> Every machine, the same line. They aren’t fixing the gym. They’re emptying it — slowly, quietly, while the free snacks make sure nobody asks why. You pocket the fob. <b>Clue found: the emptying gym.</b></p>';
};

AFTER['gym:look:early'] = function (){
  return '<p>The gym is open and ordinary — treadmills humming, weights clanking, the smell of chalk and clean sweat. There’s nothing off here yet. You’re not sure whether that’s a relief or a warning.</p>';
};

AFTER['gym:look:again'] = function (){
  return '<p>You walk the floor again. The machines are still sheeted, the tags still dated, the free snacks still stacked on the tables. Nothing has changed since the last time you looked — and that, you suppose, is the point. The gym isn’t being fixed. It’s being retired, one quiet week at a time, and the snacks are the apology nobody asked for.</p>';
};
