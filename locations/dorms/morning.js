'use strict';

function roomMess(){
  const avg = (state.lbs + state.piperLbs + state.minaLbs) / 3;
  const messes = [
    '<p>The room is still mostly clean. Two beds are made, more or less — Piper’s is a tangled nest, but there’s an order to it. A couple of water bottles stand on the windowsill, a gym bag hangs on the door, and the trash can is empty. It looks like a dorm room at the start of the semester. It looks clean, and bright, and yours.</p>',
    '<p>The room is starting to carry evidence. A takeout bag sits on Piper’s desk, its edges greasy. Another one, crumpled, peeks out from under her bed. There are crumbs on the floor by the shared trash can, and a damp pair of socks on the radiator that nobody claims. The window is propped open, but the room has begun to keep the smell of last night’s dinner. It’s not dirty, not really. It’s just starting to hold on to things.</p>',
    '<p>The room is cluttered now, in the specific way rooms get when nobody is trying anymore. Takeout bags and cups crowd Piper’s desk and spill onto the floor. Crumpled wrappers lie in drifts against the skirting. There are grease spots on the sheets that don’t wash out all the way, and a small pile of clothes in the corner that has stopped pretending to be laundry. The trash can is full — has been full — and someone has started stacking the trays by the door instead. The window barely opens, and the trays keep stacking by the door.</p>',
    '<p>The room has gone soft. Takeout containers are stacked in towers by the door, some with the forks still in them. There are cups everywhere — on the windowsill, on the desks, under the beds. A pair of torn underwear lies on the floor near the trash can, pale and forgotten, the elastic snapped, and nobody has picked it up in days. There are stains on the carpet nobody can name, and the room smells, faintly and constantly, of warm grease and old food and three bodies. The beds have bowed deep under the weight of the bodies that sleep in them. The trash can has given up. The trays stack by the door.</p>',
    '<p>The room is a soft ruin. Takeout bags and cups and trays everywhere — on every surface, in drifts against the walls, stacked on the floor. A torn pair of panties, crusted and old, lies wedged between the nightstand and the wall where it fell weeks ago. Grease-spotted sheets hang half off the beds. The smell is permanent now: warm food, sweat, the three of you. The window is sealed shut. The beds are bowed deep under the weight of the bodies that sleep in them, and the trays never stop arriving.</p>'
  ];
  if (avg < 165) return messes[0];
  if (avg < 190) return messes[1];
  if (avg < 235) return messes[2];
  if (avg < 290) return messes[3];
  return messes[4];
}

function morningSnack(who){
  if (who === 'pc'){
    if (state.day < 16 && wTier(state.lbs) < 2) return '';
    if (wTier(state.lbs) >= 5){
      return '<p>You don’t even pretend to wait for breakfast anymore. There’s a box of pastries on the desk from the night before, and you eat two of them sitting on the edge of the bed, the sugar landing in a stomach that’s already pressing against the waistband of your shorts. The crumbs you miss land on the roll of your belly, and you brush at them with a flat hand without bothering to catch the ones that settle in the fold of your thigh. You eat a third one sitting on the edge of the bed, crumbs working their way into the crease of your belly.</p>';
    }
    if (wTier(state.lbs) >= 3){
      return '<p>You reach for the leftover cake before you’re done getting dressed — a square of Piper’s honey cake, then another, eaten standing at the desk. The sugar lands soft in your belly and you can feel it sit there, heavy at the bottom of the curve. You catch Mina watching you, and you shrug. “Breakfast of champions.” She doesn’t say anything. Nobody says anything.</p>';
    }
    return '<p>You grab a piece of toast from the tray by the door on your way out — butter, jam, gone in three bites. It’s just toast, and the tray was already there by the door, already sized to you.</p>';
  }
  if (who === 'piper'){
    const pt = piperTier(state.piperLbs);
    if (state.day < 16 && pt < 2) return '';
    if (pt >= 8){
      return '<p>A drone delivers a tray to the room before Piper has even opened her eyes — a heavy spread, pastries and bacon and something sweet — and she eats it lying down, one arm behind her head, crumbs on her chest, letting out small, contented sounds between bites. She doesn’t reach for it so much as it reaches for her. “Mmm,” she says, eyes closed, when the drone brings the second one, and the word is pure, unbothered bliss.</p>';
    }
    if (pt >= 6){
      return '<p>Piper eats before she’s fully awake, the tray pulled onto the vast softness of her stomach, and she doesn’t open her eyes for the first three bites. A drone waits at the foot of the bed until the tray is empty, then takes it and glides out. She burps, softly, and settles deeper into the pillows, already reaching for the second tray.</p>';
    }
    if (pt >= 3){
      return '<p>Piper eats while she’s still in bed, propped up against the headboard, a whole box of something open in her lap. She eats steadily, contentedly, crumbs on her chest, one hand on her belly like she’s keeping it company. “Mornings are better with food,” she says, and it comes out like the least remarkable sentence in the world. She’s right. It is.</p>';
    }
    return '<p>Piper is eating before her feet touch the floor — a protein bar now, or a pastry, whatever’s closest. “Gotta fuel up,” she says, the way she used to say it before a run, and the words land different now, because there’s no run after. Just the food, and the softness, and the smile she gives you over it.</p>';
  }
  if (who === 'mina'){
    const mt = minaTier(state.minaLbs);
    if (state.day < 30 && mt < 3) return '';
    if (mt >= 8){
      return '<p>A drone delivers a tray to Mina before she has even opened her eyes — pastries and bacon and something sweet — and she eats it lying naked on her back, one arm behind her head, crumbs on her chest, letting out small, contented sounds between bites. She doesn’t reach for it so much as it reaches for her. “Mmm,” she says, eyes closed, when the drone brings the second one, and the word is pure, unbothered bliss. The old Mina, who once logged every bite, is not in this bed. Nobody in this bed misses her.</p>';
    }
    if (mt >= 6){
      return '<p>Mina eats before she’s fully awake, the tray pulled onto the vast softness of her stomach, and she doesn’t open her eyes for the first three bites. A drone waits at the foot of the bed until the tray is empty, then takes it and glides out. She lets out a small, wet burp, softly, and settles deeper into the pillows, already reaching for the second tray. She used to weigh her food. She hasn’t weighed anything in months.</p>';
    }
    if (mt >= 3){
      return '<p>Mina eats while she’s still in bed, propped up against the headboard, a whole tray open in her lap. She eats steadily, contentedly, crumbs on her chest, one hand on her belly like she’s keeping it company. “The dosing is in the syrup,” she says once, mid-bite, and it comes out like the least remarkable sentence in the world, like it’s just the reason for the food, and the food is all that matters. She’s right. It is.</p>';
    }
    return '<p>Mina eats at her desk, hunched over the laptop, a pastry in one hand that she’s trying to hide behind the screen. She used to eat like she was ashamed of it — quick, furtive, apologetic. The shame has gotten slower lately, the bites bigger. The shame is starting to lose.</p>';
  }
  return '';
}

function slobBit(who, tier){
  if (who === 'pc'){
    if (tier >= 8){
      return '<p>You don’t get dressed. There’s nothing to get dressed into — nothing that fits, nothing worth the fight. You sit on the edge of the bed, naked, enormous, one hand resting on the shelf of your belly, watching the window you used to cross. The tray is on the little table by your bed, close enough that you don’t have to lean. Your hips spill over the mattress edge on both sides, and your belly rests in your lap, heavy, as you eat.</p>';
    }
    if (tier >= 5){
      return '<p>You don’t bother finishing getting dressed right away. You sit on the edge of the bed for a while, robe open, one hand resting on the shelf of your belly, watching the window. The tray is on the little table by your bed, and you reach for it without getting up, your belly settling across your thighs as you eat.</p>';
    }
    if (tier >= 3){
      return '<p>The burp comes up without permission — a low, wet rumble that surprises you as much as anyone. You press a hand to your chest, startled, then laugh. “Sorry.” Nobody’s looking. You swallow the next one down and it comes up anyway, quieter, and you stop apologizing for it halfway through.</p>';
    }
    return '';
  }
  if (who === 'piper'){
    if (tier >= 8){
      return '<p>Piper lets out a long, wet, utterly contented burp without opening her eyes, one hand resting on the rise of her belly, the other on a tray she has no intention of letting go. “That’s better,” she says, and she says it like it’s the only sentence she needs. She doesn’t get dressed. She doesn’t get up. She doesn’t do anything except smile, slow and heavy and happy, and reach for the next thing on the tray.</p>';
    }
    if (tier >= 6){
      return '<p>Piper lets out a long, low, rumbling burp that rolls out of her as she shifts on the bed, and she doesn’t flinch, doesn’t cover her mouth, doesn’t even open her eyes. “There,” she says, satisfied, one hand patting the huge softness of her belly. A drone glides in and takes the empty tray. She doesn’t thank it. She doesn’t need to.</p>';
    }
    if (tier >= 3){
      return   '<p>Piper lets out a long, contented burp as she gets out of bed, one hand on the soft rise of her belly, and doesn’t even flinch. “That’s better,” she says, and gets dressed sitting down, taking her time. “Used to be I’d be halfway to the track by now.” She says it like it’s a funny thing, like it’s not a goodbye. It’s a goodbye.</p>';
    }
    if (tier >= 2){
      return '<p>A small burp escapes Piper mid-stretch and she covers her mouth, grinning. “Sorry — the honey cake’s coming back to say hi.” She laughs at her own joke and goes back to dressing, a little slower than she used to, a little rounder at the middle than she used to be.</p>';
    }
    return '';
  }
  if (who === 'mina'){
    if (tier >= 8){
      return '<p>Mina lets out a long, wet, utterly contented burp without opening her eyes, one hand resting on the rise of her belly, the other on a tray she has no intention of letting go. “That’s better,” she says, and she says it like it’s the only sentence she needs. She doesn’t get dressed. She doesn’t get up. She doesn’t do anything except smile, slow and heavy and happy, and reach for the next thing on the tray. Somewhere underneath all that softness, the girl who weighed her food is gone, and the room is quieter for it.</p>';
    }
    if (tier >= 6){
      return '<p>Mina lets out a long, low, rumbling burp that rolls out of her as she shifts on the bed, and she doesn’t flinch, doesn’t cover her mouth, doesn’t even open her eyes. “There,” she says, satisfied, one hand patting the huge softness of her belly. A drone glides in and takes the empty tray. She doesn’t thank it. She doesn’t need to. Once she would have logged the burp like an anomaly. Now it’s just the sound of her mornings, and she likes it.</p>';
    }
    if (tier >= 4){
      return '<p>Mina doesn’t get up. She lies on her side, one hand on the top of her belly, and watches you dress with half-lidded eyes. When she finally rolls to get up, the bed groans and a wet burp escapes her, loud in the quiet room. She doesn’t apologize. She doesn’t even seem to notice. She reaches for the tray instead, and that says everything she’s not saying.</p>';
    }
    if (tier >= 3){
      return '<p>Mina burps quietly into her hand as she gets up, then freezes, then decides not to care. “It’s the yogurt,” she says, though there’s no yogurt. She gets dressed slowly, her pajama waistband digging into the softness above her hips, and for the first time she doesn’t hurry through it.</p>';
    }
    return '';
  }
  return '';
}

function dressBlock(){
  if (pcNaked()){
    return '<div class="dress">' + dressText('naked') + '</div>';
  }
  if (state.worn){
    return '<div class="dress">' + dressText(state.worn) + '</div>';
  }
  let html = '<p class="small">What do you wear today?</p>';
  html += '<div class="actions">';
  DRESS_KEYS.forEach(function (k){
    if (dressAvailable(k)) html += btn(dressLabel(k), 'dress:' + k);
  });
  html += '</div>';
  return html;
}

function morningScene(){
  if (state.zolaStayNight){
    state.zolaStayNight = false;
    return zolaWakeScene();
  }
  const t = wTier(state.lbs);
  let html = '<h2>Day ' + state.day + ' — morning</h2>';
  html += '<p class="small">Room 217, first light. The blinds are still half-drawn.</p>';
  html += sliceTier(PC_MORN, PC_TIERS, t);
  html += dressBlock();
  html += morningSnack('pc');
  html += slobBit('pc', t);
  const pt = piperTier(state.piperLbs);
  html += (PIPER_MORN[pt] || []).join('');
  html += morningSnack('piper');
  html += slobBit('piper', pt);
  if (state.piperZola) html += piperZolaMorn(pt);
  else if (state.zolaIntro === 'piper' && state.zolaCorruptT > 0) html += piperCourtingMorn(state.zolaCorruptT, pt);
  const mt = minaTier(state.minaLbs);
  html += (MINA_MORN[mt] || []).join('');
  html += morningSnack('mina');
  html += slobBit('mina', mt);
  if (state.minaZola) html += minaZolaMorn(mt);
  else if (state.zolaIntro === 'mina' && state.zolaCorruptT > 0) html += minaCourtingMorn(state.zolaCorruptT, mt);
  if (state.piperCollar || state.piperZola) html += '<p class="small">A collar rests snug against Piper’s throat — Zola’s mark, dark leather against her soft skin. She touches it when she eats, the way she touches everything Zola gives her: like it belongs, like it’s always been there.</p>';
  if (state.minaCollar || state.minaZola) html += '<p class="small">A collar rests snug against Mina’s throat — Zola’s mark, dark leather against her skin. She turns it between her fingers once, precisely, like she’s confirming a result, and leaves it exactly where Zola put it.</p>';
  if (state.zolaCollar) html += zolaCollarReaction();
  html += roomMess();
  if (pcCorrupt()) html += zolaBleedLine();
  html += '<div class="actions">' +
    (pcLockedRoom()
      ? btn('Stay in the room', 'nav', 'room')
      : (state.worn ? btn('Dressed. Head out to the quad.', 'nav', 'hub') : btn('You need to choose what to wear', 'nav', 'hub', true))) +
    (greaseStage() >= 2 ? stageBtn(greaseStage(), 'Stay at the dorms for today', 'stay:dorms') : '') +
    '</div>';
  return html;
}

addScreen('morning', morningScene);

addAction('stay:dorms', function (){
  const g = greaseStage();
  const glut = state.capacity * 1.5;
  const tooFat = wTier(state.lbs) >= 6;
  const p8 = piperTier(state.piperLbs) >= 8;
  const m8 = minaTier(state.minaLbs) >= 8;
  let wake = '<p>You wake and you do not get up. Your hand finds the tray before your brain finishes the thought of breakfast.';
  if (p8 || m8){
    const parts = [];
    if (p8) parts.push('Piper is already awake in her own bed, naked and enormous, the show looping on the laptop, a tray balanced on the huge soft rise of her belly — she greets you with a lazy, blissful smile and says, “Tray’s coming,” like it’s the most ordinary fact in the world, and for her it is');
    if (m8) parts.push('Mina is naked and enormous across the room, pastries and half-finished trays spread across her sheets, a drone already hovering for the empties, and she looks up, dreamy, and says, “You have to try this. The drones keep bringing it”');
    wake += ' ' + parts.join('. ') + '. Neither of them gets up. Neither of them leaves. The click of the door doesn’t come — the three of you stay, trays sliding in and out all day, and the room settles into its daytime rhythm. There is nothing ahead of you today except the meals.</p>';
  } else {
    wake += ' You hear the others leave, the click of the door, and the room settles into its daytime quiet. There is nothing ahead of you today except the meals.</p>';
  }
  const evening = (p8 || m8)
    ? '<p>By evening you’ve moved only to eat and to doze, and across the room the same soft rhythm keeps time — trays sliding through the door, the show looping, the drone humming for the empties, three huge bodies feeding and dozing together. The light has gone amber against the blinds. You fall asleep mid-thought, a tray balanced on your belly, and you wake heavier and softer than you went to sleep, the folds of you pressed into the sheets in new places.</p>'
    : '<p>By evening you’ve moved only to eat and to doze, and the light has gone amber against the blinds. You fall asleep mid-thought, a tray balanced on your belly, and you wake heavier and softer than you went to sleep, the folds of you pressed into the sheets in new places.</p>';
  beddayScene = [
    wake,
    '<p>The first tray comes at mid-morning, slid through the door by a drone that hovers long enough to make sure you take it. You eat propped against the headboard, sheets twisted around your hips, and the crumbs fall where they fall — into the hollow of your belly, onto the blanket, into the crease of your thigh. You don’t brush them away anymore. A second tray arrives before the first is fully taken away, and you eat through it steadily, without ceremony. The room smells like the trays, and you can’t tell where one ends and the other begins.</p>',
    tooFat
      ? '<p>Later, your belly is too heavy to reach around — the soft mass of it rests between your thighs — and a drone hovers down and feeds you the rest of the tray, spoonful by spoonful. It tilts the cup to your mouth and wipes the corner of your chin when you are done, and you don’t have to ask anymore.</p>'
      : '<p>In the middle of the long day you touch yourself, slow and unhurried, dozing between. The sheets twist around your hips and the mattress creaks under the shift of your weight, and you let your hand fall when you are too tired to finish properly, and the bed holds all of it.</p>',
    evening
  ].join('');
  apply({ glut: glut, selfcontrol: Math.max(0, state.selfcontrol - (3 + g)), screen: 'sleep' });
  doSleep();
});

function zolaWakeScene(){
  const t = wTier(state.lbs);
  let html = '<h2>Day ' + state.day + ' — morning, at Zola’s</h2>';
  html += '<p class="small">Zola’s room, first light. The drone dock hums; the bed is warm and vast, and it is still holding you.</p>';
  html += sliceTier(PC_MORN, PC_TIERS, t);
  html += wakeAtZolaText();
  html += zolaBleedLine();
  html += '<div class="actions">' +
    (pcLockedRoom()
      ? btn('Stay — she’ll feed you all day', 'nav', 'zola-room') + btn('Let her take you back to Room 217', 'nav', 'room')
      : (state.worn
          ? btn('In her clothes. Head to the quad.', 'nav', 'hub')
          : btn('Head to the quad', 'nav', 'hub'))) +
    '</div>';
  return html;
}

function wakeAtZolaText(){
  if (pcLockedRoom()){
    return '<p>Zola is up before you — or never went down, more like — already warm and moving, and she looks at the whole naked spread of you on her bed with pure, unmixed joy. “Look at you. All mine, and too big for anything I own to fit you. Good.” She doesn’t try to dress you. There isn’t anything in the world that would fit. She feeds you instead, bite by bite, kneeling on the floor at the edge of the bed so she can reach, and when she finally lets you go she wraps you in her own robe, open at the back, and settles you against her. “We’ll sort out a bigger bed soon,” she says, and she says it like a promise.</p>';
  }
  const f = zolaFitTier();
  state.worn = (f === 2) ? 'zola-tight' : 'zola';
  persist();
  if (f === 0){
    return '<p>You wake to the smell of her breakfast and the weight of her clothes folded at the foot of the bed. Zola holds one of her shirts up against you and laughs, warm and delighted — it comes down past your knees, the shoulders swimming on you, the whole of you lost inside it. She dresses you herself, careful and pleased, rolling the sleeves up twice, cinching a robe over it so it almost fits. “Look at you, drowning in me,” she hums. “Adorable. We’ll grow you into them soon enough, sweet thing. I’m very good at that.” She sends you off with a pat on your ass and a full tray to carry, and the borrowed clothes hang loose and warm around you all the way to the quad.</p>';
  }
  if (f === 1){
    return '<p>You wake and reach for the clothes folded at the foot of Zola’s bed, and they fit. They fit — her shirt closing across your shoulders, her jeans buttoning over your hips like they were cut for you. Zola goes still when she sees you dressed in her things, and then her face lights up with something close to awe. “You’re my size,” she breathes, delighted, circling you, tugging the hem into place, smoothing the fabric over the soft curve of your belly. “Look at you. All that work, and here you are — my mirror, my equal, my perfect girl.” She kisses your cheek and packs you off, beaming, and the clothes sit on you the way hers sit on her: exactly right, and hers.</p>';
  }
  return '<p>You wake to the sound of Zola cooing — “oh, sweetheart, no, don’t—” — too late. You’ve reached for the clothes folded at the foot of her bed, and they’re her clothes, and they are far, far too small. The shirt won’t close across your shoulders and rides up over the soft mound of your belly; the jeans stop halfway up your thighs, seams straining white at the hip. You stand there half-clothed and stuck, and you can feel yourself burning, and Zola is watching you with eyes gone wide and dark and hungry. “Oh, look at you,” she whispers, and she is delighted past speech. “You’ve outgrown me.”</p><p>She pulls you down onto the bed and feeds you — tray after tray, forkful after forkful, moaning praise into your ear the whole time — and while you eat she has you, hand between your thighs, slow and thorough, until you come apart against her with your mouth still full and your belly round and tight under the ruined shirt. When she’s done she dresses you in what’s left of her clothes — the shirt half-buttoned, the waistband rolled under the shelf of your belly, your hips and the lower curve of you bare where the fabric won’t reach — and she kisses your forehead, smug and satisfied. “Go on, then. Go show the campus what you are now.” And she pats your ass, hard enough to sting, and sends you off half-naked in her too-small clothes.</p>';
}
