'use strict';

function zolaGate(w, a){
  return state.zola >= a && wTier(state.lbs) >= w;
}
function audienceGate(){
  return state.zolaCollar && state.zola >= 80 && state.glut >= 30 && state.lbs >= 800 && state.clue5;
}
function zolaBigger(){
  return state.lbs > zolaLbs(state.day);
}
function zolaDiff(){
  return Math.round(Math.abs(state.lbs - zolaLbs(state.day)));
}
function zolaFitTier(){
  const diff = zolaLbs(state.day) - state.lbs;
  if (diff >= 100) return 0;
  if (diff >= 0) return 1;
  return 2;
}
function zolaBleedLine(){
  if (!pcCorrupt()) return '';
  const lines = [
    '<p class="small">Her voice is in your head, warm and certain, and you don’t notice anymore where she ends and you begin. <em>Let them eat. Let them be happy. It’s so much easier to be happy.</em> You catch yourself thinking in her cadence — the same soft, sure rhythm — and it doesn’t frighten you the way it used to. It sounds right.</p>',
    '<p class="small">You open your mouth and almost hear Zola come out — <em>“good girl, eat, that’s it”</em> — and you close it again, and nobody noticed, and the words settle warm in your chest like a second heart. You’re starting to think the way she does. You’re starting to like the way that feels.</p>',
    '<p class="small">Somewhere between bites you catch yourself smiling at nothing, the way she smiles — slow and satisfied, like a woman who owns everything she can see. The room is quiet. The tray is full. It’s her thought, but it’s in your head, and it fits there like it was always meant to.</p>',
    '<p class="small">You say “there it is, that’s a good girl” to no one — to Piper, to Mina, to yourself — and you don’t realize until the words are already out that it was her voice, pitched to yours, doing the talking. Nobody blinks. It’s the sort of thing the room has started to say.</p>'
  ];
  return lines[state.day % lines.length];
}
function zolaOutgrowPanel(){
  if (zolaBigger()){
    const you = Math.round(state.lbs);
    const her = Math.round(zolaLbs(state.day));
    return '<p class="small">' + (state.zolaOutgrew
      ? 'Zola looks up at you — up, at you — and her hands find the soft shelf of your belly like it’s holy. “Still the biggest girl I know,” she says, soft. “Still growing.”'
      : 'Zola is looking at you strangely — a slow, wondering look, like she’s just now measuring you against herself. And coming up short. ' + you + ' lbs of you, and ' + her + ' of her.') + '</p>';
  }
  return '';
}
function zolaCompareLine(){
  const you = Math.round(state.lbs);
  const her = Math.round(zolaLbs(state.day));
  if (zolaBigger()) return ' You outweigh her by ' + zolaDiff() + ' lbs.';
  return ' She outweighs you by ' + zolaDiff() + ' lbs.';
}
function zolaAssTease(){
  const t = wTier(state.lbs);
  const z = Math.round(state.zola);
  if (t >= 7){
    return '<p>“Look at you,” Zola hums, running a slow, possessive hand over the vast, cellulite-dimpled spread of your ass before you can think to move away — and you can’t think to move away. “That’s a real girl’s ass. Dimpled like a peach that’s been squished one too many times, soft as dough, and getting wider every week.” She squeezes a handful of it, watching the dimples ripple under her palm. “I love how it jiggles when you waddle. I could watch it all day.” The lamp catches her eyes as she says it, and for a heartbeat they’re amber — honey-pale, wrong — and then brown again, and she’s just grinning at your ass like it’s the best thing she’s seen all week.</p>' + (z >= 70 ? '<p>“And I love how it follows me everywhere I send you,” she adds, low and possessive, kneading a generous handful of you. “Every step you take, it swings for me. Every seat you settle into, it spills for me. You’re becoming a real girl’s girl, sweet thing.”</p>' : '');
  }
  if (t >= 5){
    return '<p>“Turn around, sweet thing.” Zola makes a slow circle with one finger, and you turn, and she lets out a low, appreciative sound at the wide, heavy, cellulite-dimpled spread of your ass. “Now that’s a real fat girl’s ass,” she says, squeezing a handful of it and making it ripple under her palm. “Soft, heavy, and it knows how to move. Give it a few more weeks and the dimples will be there to match.” She smacks it lightly, watching it jiggle. “The campus has been so good to you.”</p>';
  }
  if (t >= 3){
    return '<p>“Mm, look at the back of you,” Zola teases, her eyes on the heavy, softening sway of your ass as you settle in. “Getting properly padded now. Give it a few more weeks and the little dimples will start showing when the light hits right — that’s the good sign, sweet thing. That’s where the weight likes to settle on a girl who’s meant to be soft.” She pats the bench beside her. “Sit. Give me something to look at while you eat.”</p>';
  }
  return '<p>“You’ve got a little padding back there now,” Zola teases, eyeing your ass with hungry amusement. “Give it a few more weeks at my table and you’ll have cellulite to be proud of — the kind that dimples when I squeeze it. Don’t worry, sweet thing. I’m very good at growing these.”</p>';
}
function zolaScooterDemand(here){
  if (state.metZola && state.scooterAcc && state.scooterOff && !state.agrav){
    return { text: '<p>Zola’s eyes go flat the moment you arrive on foot. “Walking,” she says, and it comes out like a verdict. “Again. I assigned you a scooter — the campus assigned you a scooter — and you’re out here waddling on your own two feet like some first-year who doesn’t know what’s good for her.” She folds her arms over the shelf of her belly, and it isn’t a request. “You will ride it. A girl your size has no business walking. The seat is waiting, it loves your weight, and it does not judge how much of you it has to carry. Get on it.”</p>',
      actions: btn('Agree — she’s right', 'zola:scot:on', here) + btn('Defy her — you’ll walk', 'zola:scot:off', here) };
  }
  if (state.metZola && state.lbs >= 400 && !state.scooterAcc){
    return { text: '<p>Zola looks you up and down and clicks her tongue, slow and disapproving. “You still don’t have a scooter,” she says. “Look at you. You’re over four hundred pounds and you’re walking around like it’s something to be proud of. The campus has one waiting for you — with your name on it, probably.” She reaches out and pats the heavy roll of your belly. “You take it. It’s not charity, it’s common sense. Every pound you carry is a pound you don’t need to haul on foot. Accept it, or I’ll be very disappointed in you.”</p>',
      actions: btn('Accept the scooter', 'zola:scot:accept', here) + btn('Refuse — you’ll keep walking', 'zola:scot:refuse', here) };
  }
  return null;
}
function zolaVibDemand(here){
  if (state.metZola && vibInstalled() && state.vibOff){
    return { text: '<p>“I heard you took it out,” Zola says, her voice dropping low and flat. “The Comfort unit. You unplugged it and put it in the drawer like it was nothing.” She shakes her head slowly, disappointment radiating off her. “That little hum is what keeps you relaxed. It keeps you soft, and slow, and happy, and it makes every meal feel better than it has any right to. You are a fat girl on this campus, sweet thing, and that machine is part of who you are now.” She leans in. “You will plug it back in. Tonight. And you will let it run while you eat, and you will moan, and you will not be ashamed of any of it.”</p>',
      actions: btn('Agree to plug it back in', 'zola:vib:on', here) + btn('Refuse — it stays off', 'zola:vib:off', here) };
  }
  if (state.metZola && state.zola >= 60 && state.lbs >= 300 && !vibInstalled()){
    return { text: '<p>Zola cocks her head at you, almost amused. “No Comfort unit yet? The campus has been offering you one for weeks.” She waves a thick hand dismissively. “You’re a big, soft thing who needs to relax and eat, and that little machine would help you do both. I want you to take it. Let it hum through your meals, let it make you soft and greedy and grateful, and let it log every bite as a success.” She pats your cheek, not gently. “I’ll know if you didn’t.”</p>',
      actions: btn('Accept the Comfort unit', 'zola:vib:accept', here) + btn('Refuse — not yet', 'zola:vib:refuse', here) };
  }
  return null;
}
function zolaPublicGrope(){
  if (state.zola < 75) return '';
  const t = wTier(state.lbs);
  if (t < 4) return '';
  if (t >= 6){
    return '<div class="panel"><p>In the middle of the crowded commons, Zola’s hand finds you under the table — a warm, greedy palm sliding up the inside of your thigh, already pressing against the soft, heavy overhang of your fupa as if it belongs there. She keeps talking to the girl beside her like nothing is happening, but her hand works you slow and possessive under the cloth, and with the other hand she raises a forkful to your lips without even looking. “Eat, sweet thing,” she says, warm and bright, in front of everyone. “You need to keep your strength up for all the growing you’re doing.” The lamp finds her eyes once in the middle of it — amber, flat, hungry — and she blinks and they’re brown, and you convince yourself you imagined it.</p></div>';
  }
  return '<div class="panel"><p>In the middle of the crowded commons, Zola’s hand finds you under the table — a warm, greedy palm sliding up the inside of your thigh, pressing into the soft overhang of your belly as if it belongs there. She keeps talking to the girl beside her like nothing is happening, but her hand works you slow and possessive under the cloth, and with the other hand she raises a forkful to your lips without even looking. “Eat, sweet thing,” she says, warm and bright, in front of everyone. “You need to keep your strength up for all the growing you’re doing.” The lamp catches her eyes as she enjoys you, and for a second they’re amber — barely there, easy to tell yourself it was the light — and then she’s looking at the table again, and you file it away and don’t.</p></div>';
}

function zolaRevealPanel(){
  const out = [];
  if (audienceGate() && !state.zolaHintSeen){
    out.push('<div class="panel"><p>You look at Zola. That’s all it is — a look, across the lamplight of her room, the way you’ve looked at her a hundred times. But tonight the light catches her wrong. Or right. Her eyes go gold — a flat, honeyed, unmistakable gold, black-pupiled, black-scleraed, burning for a heartbeat in the warm dark. Then they’re brown again, warm and familiar, and she’s smiling at you like nothing happened. But you saw it. You saw what she is.</p><div class="actions">' + btn('Say nothing — keep it to yourself', 'zola:reveal', 'room') + '</div></div>');
  }
  return out.join('');
}
function zolaRoomAudienceButton(){
  if (!audienceGate()) return '';
  return '<p class="small">Zola’s voice drops when she says it, soft and formal, and her eyes flicker gold in the lamplight as if to remind you. “You’re ready, sweet thing. She’s been patient all year. Come down with me. I’ll take you to Her.”</p><div class="actions">' + btn('Go below with her', 'zola:audience', 'room') + '</div>';
}
function zolaSubmissionLabel(){
  const s = state.submission;
  if (s >= 90) return 'she owns you';
  if (s >= 70) return 'you’re hers completely';
  if (s >= 50) return 'you bend for her without thinking';
  if (s >= 30) return 'you’re learning to obey her';
  if (s >= 15) return 'she’s wearing you down';
  return 'you still hold back';
}

let zolaDemandCache = { day: -1, key: '', done: -1 };
function zolaDemandPick(){
  if (zolaDemandCache.day !== state.day){
    zolaDemandCache.day = state.day;
    const here = state.screen === 'zola-room' ? 'room' : 'zola';
    const pool = here === 'room' ? ['sex', 'allfours', 'kneel', 'stuff'] : ['kneel', 'stuff'];
    zolaDemandCache.key = pool[Math.floor(Math.random() * pool.length)];
  }
  return zolaDemandCache.key;
}
function zolaRandomDemandData(here){
  if (zolaDemandCache.done === state.day) return null;
  if (state.selfcontrol >= 50) return null;
  if (wTier(state.lbs) < 4) return null;
  const key = zolaDemandPick();
  if (here !== 'room' && (key === 'sex' || key === 'allfours')) return null;
  let text, label;
  if (key === 'sex'){
    text = 'Zola’s eyes go dark, and she doesn’t ask — she tells you. “Come here, sweet thing. I’ve been thinking about you all day.” She pulls you down to her without waiting for an answer, and there is no room in it for a no. Your mouth opens to protest and what comes out instead is a moan.';
    label = 'Comply — let her have you';
  } else if (key === 'allfours'){
    text = 'Zola sets a tray on the floor and points. “All fours, sweet thing. I’m going to feed you, and you’re going to let me take my pleasure from behind while you eat.” She is already settling onto the bed behind you, hands spreading over the heavy swell of your hips. There is no version of this where you refuse.';
    label = 'Comply — all fours, fed and taken';
  } else if (key === 'kneel'){
    text = 'Zola holds up a forkful and pats the floor at her feet. “Kneel, sweet thing. Open up. I’m going to feed you, and you’re going to eat from my hand like the good fat girl you are.” Her foot nudges the inside of your thigh, herding you down. You kneel.';
    label = 'Comply — kneel and eat from her hand';
  } else {
    text = 'Zola pushes the whole tray toward you and settles her hand on the back of your neck. “Eat,” she says, low and certain. “Eat until you can’t. I’m going to sit here and watch every bite go down, and you’re going to thank me for it.” Her grip tightens, a promise, and your own hand is already reaching for the first forkful.';
    label = 'Comply — eat until you can’t';
  }
  return { text: text, label: label, key: key };
}

function zolaStripPanel(){
  if (state.zolaNaked){
    let out = '<p class="small">You’re both bare now, whenever you visit her. She likes you soft and open and exactly where she can see you. You’re still not used to how natural it feels.</p>';
    if (state.zolaPierced){
      out += '<p class="small">The gold in your nipples matches hers now — new, and hers, and you catch yourself touching it when you think no one’s looking.</p>';
    }
    return out;
  }
  return '';
}

function zolaPhotoOffer(here){
  if (!state.metZola) return null;
  if (state.zola < 60) return null;
  if (state.zolaPhotoDay === state.day) return null;
  return { text: '<p>Zola holds up her tablet, eyeing the soft lines of you. “Hold still, sweet thing. I want to remember you at this size — so you can see how far you’ve come.” She frames you, squints, and taps. “Good girl. This one goes on the wall.”</p>',
    actions: btn('Let her photograph your growth', 'zola:photo', here) };
}
function zolaPierceOffer(here){
  if (!state.zolaNaked) return null;
  if (state.zolaPierced) return null;
  if (state.zola < 60 || state.submission < 40) return null;
  if (state.zolaPierceDay === state.day) return null;
  return { text: '<p>Zola touches the small gold bars in her own nipples, thoughtful, and then looks at you — bare and soft and hers, spread across her mattress. “I could get you these,” she says, light and eager. “Matching set. Same woman who did mine. It stings for a minute, then it’s just gold on you — and every time you look down, you’ll think of me putting it there.” She runs a thumb over one of yours. “Kinky, not complicated. Say the word.”</p>',
    actions: btn('Let her take you to get pierced', 'zola:pierce', here) + btn('Not today', 'zola:pierce:no', here) };
}
function zolaPhotoGallery(){
  if (!state.zolaPhotos.length) return '';
  const last = state.zolaPhotos[state.zolaPhotos.length - 1];
  const first = state.zolaPhotos[0];
  return '<div class="panel"><p>On the wall behind her, a row of photos of you — ' + state.zolaPhotos.length + ' picture' + (state.zolaPhotos.length === 1 ? '' : 's') + ' so far, pinned in order. The oldest shows you at ' + first.lbs + ' lbs. The newest — day ' + last.day + ', ' + last.lbs + ' lbs — sits at the end of the line, and there’s room for more. “Every pound,” Zola says, patting it. “Evidence.”</p><div class="actions">' + btn('Look at the gallery', 'nav', 'zola-gallery') + '</div></div>';
}
function zolaSheKnowsPanel(){
  const names = [];
  for (let i = 0; i < RES_MEMBERS.length; i++){
    if (state.resTrust >= 15) names.push(RES_MEMBERS[i].name);
  }
  return { text: '<p>Zola’s eyes track you with a thin, knowing smile. “I hear you’ve been talking to ' + (names.length ? names.slice(0, 2).join(' and ') : 'those girls') + '.” Her voice is honey. “Cute. They think they can out-eat the campus. They think if they just run fast enough, the food won’t catch them. It always catches them.” She reaches for your chin, turns your face to hers. “You’re not one of them, are you, love?” She says it like she already knows the answer, and like she’d very much like you to make her wrong.</p>',
    actions: btn('“I’m not one of them. I’m yours.”', 'zola:sheknows:mine', 'room') + btn('“I... I’m not sure anymore.”', 'zola:sheknows:unsure', 'room') + btn('Say nothing', 'zola:sheknows:silent', 'room') };
}
function zolaIntroPanel(){
  return { text: '<p>Zola lowers her voice, conspiratorial and hungry. “You have roommates. I know the type — girls who still think they have a choice. Introduce me. Bring one of them to my table and I’ll handle the rest. Ten days, and she’ll be mine. Ten days, and she won’t want anything else.”</p>',
    actions: btn('Introduce Piper', 'zola:intro:piper') + btn('Introduce Mina', 'zola:intro:mina') + btn('Not tonight', 'zola:intro:later') };
}
function zolaPendingMoment(here){
  if (state.zolaCollarOff) return zolaRagePanel(here);
  const scot = zolaScooterDemand(here);
  if (scot) return scot;
  const vib = zolaVibDemand(here);
  if (vib) return vib;
  if (here === 'room' && state.zola >= 60 && !state.zolaIntro && state.day >= state.zolaIntroDelay) return zolaIntroPanel();
  if (here === 'room' && resZolaHeat() && !state.zolaSheKnows) return zolaSheKnowsPanel();
  const demand = zolaRandomDemandData(here);
  if (demand) return { text: '<p>' + demand.text + '</p>', actions: btn(demand.label, 'zola:demand:' + demand.key, here) };
  if (state.zolaMedAsk && !state.zolaMedGet) return zolaMedOffer(here);
  if (here === 'room') return zolaPhotoOffer(here);
  if (here === 'room') return zolaPierceOffer(here);
  return null;
}

function zolaRagePanel(here){
  const t = wTier(state.lbs);
  const soft = t >= 5 ? ' the deep, wobbling softness of you' : ' the softness you’ve grown';
  return {
    text: '<p>Zola’s eyes find the bare column of your throat the moment you walk in, and the room goes very still. Her smile does not move, but everything behind it does. “Sweet thing,” she says, and it is not warm. “Where is my collar?” You open your mouth, and nothing comes out. She pushes herself to her feet, unhurried, and crosses to you, and her hand closes on your chin, tilting your face up to hers. Her eyes are flat and gold. “You took it off. You — my good girl, my pet, my collar — took off what I put on you.” Her thumb strokes your jaw, once, and something in the flat gold goes hungry. “I should be furious. I am furious. But I’m also…” She looks at' + soft + ' and her breath catches, and a slow, delighted heat spreads through her voice. “I’m a little bit in love with the nerve of it. A misbehaving puppy.” She is already reaching behind her neck, and the new collar is warm in her hand. “Let’s see how fast I can put it back.”</p>',
    actions: btn('Stand still — let her put it back', 'zola:rage', here) + btn('Try to pull away', 'zola:rage:resist', here)
  };
}

function zolaAutoInteract(){
  if (state.zolaAutoDay === state.day) return null;
  const pool = [];
  if (zolaGate(3, 40)) pool.push('stuff');
  if (zolaGate(4, 50)) pool.push('sex');
  if (zolaGate(5, 55)) pool.push('slap');
  if (zolaGate(6, 60)) pool.push('lap');
  if (zolaGate(6, 65)) pool.push('scissor');
  if (zolaGate(6, 60)) pool.push('slob');
  if (zolaGate(4, 75)) pool.push('public');
  if (state.submission >= 25) pool.push('goodgirl');
  if (state.submission >= 45) pool.push('beg');
  if (state.submission >= 75 && !state.zolaCollar) pool.push('collar');
  if (state.submission >= 90) pool.push('pet');
  if (state.zola >= 100 && !state.zolaStripDone) pool.push('strip');
  if (!pool.length) return null;
  state.zolaAutoDay = state.day;
  const key = pool[Math.floor(Math.random() * pool.length)];
  zolaAutoApply(key);
  return key;
}
function zolaAutoApply(key){
  if (key === 'stuff'){
    state.zola = Math.min(100, state.zola + 10); state.glut = state.glut + 5;
    state.selfcontrol = Math.max(0, state.selfcontrol - 8); state.selfestem = Math.min(100, state.selfestem + 2);
    state.submission = Math.min(100, state.submission + 2);
  } else if (key === 'sex'){
    state.zola = Math.min(100, state.zola + 12); state.selfcontrol = Math.max(0, state.selfcontrol - 12);
    state.selfestem = Math.min(100, state.selfestem + 6); state.submission = Math.min(100, state.submission + 3);
  } else if (key === 'slap'){
    state.zola = Math.min(100, state.zola + 7); state.selfcontrol = Math.max(0, state.selfcontrol - 5);
    state.selfestem = Math.min(100, state.selfestem + 2); state.submission = Math.min(100, state.submission + 2);
  } else if (key === 'lap'){
    state.zola = Math.min(100, state.zola + 8); state.selfcontrol = Math.max(0, state.selfcontrol - 6);
    state.selfestem = Math.min(100, state.selfestem + 3); state.submission = Math.min(100, state.submission + 2);
  } else if (key === 'scissor'){
    state.zola = Math.min(100, state.zola + 10); state.selfcontrol = Math.max(0, state.selfcontrol - 8);
    state.selfestem = Math.min(100, state.selfestem + 4); state.submission = Math.min(100, state.submission + 3);
  } else if (key === 'slob'){
    state.zola = Math.min(100, state.zola + 15); state.selfcontrol = Math.max(0, state.selfcontrol - 10);
    state.selfestem = Math.min(100, state.selfestem + 4); state.submission = Math.min(100, state.submission + 3);
  } else if (key === 'public'){
    state.zola = Math.min(100, state.zola + 10); state.glut = state.glut + 2;
    state.selfcontrol = Math.max(0, state.selfcontrol - 8); state.selfestem = Math.min(100, state.selfestem + 3);
    state.submission = Math.min(100, state.submission + 3);
  } else if (key === 'goodgirl'){
    state.zola = Math.min(100, state.zola + 5); state.glut = state.glut + 2;
    state.selfcontrol = Math.max(0, state.selfcontrol - 6); state.selfestem = Math.min(100, state.selfestem + 3);
    state.submission = Math.min(100, state.submission + 4);
  } else if (key === 'beg'){
    state.zola = Math.min(100, state.zola + 6); state.glut = state.glut + 3;
    state.selfcontrol = Math.max(0, state.selfcontrol - 8); state.selfestem = Math.min(100, state.selfestem + 4);
    state.submission = Math.min(100, state.submission + 5);
  } else if (key === 'collar'){
    state.zolaCollar = true; state.zola = Math.min(100, state.zola + 8);
    state.selfcontrol = Math.max(0, state.selfcontrol - 10); state.selfestem = Math.min(100, state.selfestem + 5);
    state.submission = Math.min(100, state.submission + 6);
  } else if (key === 'pet'){
    state.zola = Math.min(100, state.zola + 6); state.glut = state.glut + 2;
    state.selfcontrol = Math.max(0, state.selfcontrol - 10); state.selfestem = Math.min(100, state.selfestem + 5);
    state.submission = Math.min(100, state.submission + 6);
  } else if (key === 'strip'){
    state.zolaNaked = true; state.zolaStripDone = true; state.zola = Math.min(100, state.zola + 3);
    state.selfcontrol = Math.max(0, state.selfcontrol - 8); state.selfestem = Math.min(100, state.selfestem + 4);
    state.submission = Math.min(100, state.submission + 6);
  }
}

function zolaApprovalLabel(){
  const a = state.zola;
  if (a >= 80) return 'she trusts you completely';
  if (a >= 60) return 'she keeps pulling you close';
  if (a >= 40) return 'she’s warming to you';
  if (a >= 20) return 'she’s testing you';
  return 'she’s watching you';
}

function zolaInfluenceText(){
  if (!state.zolaIntro) return 'none';
  const name = state.zolaIntro === 'piper' ? 'Piper' : 'Mina';
  if (state.zolaCorruptT > 0) return name + ' — ' + state.zolaCorruptT + ' night' + (state.zolaCorruptT === 1 ? '' : 's') + ' left';
  return name + ' — complete';
}

function zolaMedAskGate(){
  return state.metZola && state.lbs >= 400 && state.zola >= 60 && state.submission >= 40 && !state.zolaMedAsk;
}
function zolaMedTier(){
  const c = state.zolaMedCount | 0;
  if (c >= 40) return 3;
  if (c >= 25) return 2;
  if (c >= 15) return 1;
  if (c >= 5) return 0;
  return -1;
}
function zolaMedFeatureLine(){
  const t = zolaMedTier();
  if (t < 0) return '';
  const hot = state.crave >= 50 || state.glut >= 30 || state.selfcontrol < 40;
  if (t === 0){
    return '<p class="quiet">In the glass, your smile is the same smile — but your canines sit a shade longer than you remember. You look again. They’re just teeth. They were always like that.</p>';
  }
  if (t === 1){
    return '<p class="quiet">You catch your reflection in the low light, and for a moment your eyes hold a warmer color than they should —' + (hot ? ' honey-pale, the way Zola’s go when she’s hungry' : ' a flicker of amber, gone before you can find it again') + '. You look again. Brown. They were always brown.</p>';
  }
  if (t === 2){
    return '<p class="quiet">Your canines are longer now — you could catch your lower lip on them if you weren’t careful — and your eyes' + (hot ? ' sit amber in the glass, unmistakable, patient, the same color as the woman who gave you the bottle' : ' flicker amber whenever the light falls wrong') + '. You tell yourself it’s the lamp. You’ve been telling yourself that for a while.</p>';
  }
  return '<p class="quiet">You meet your own eyes and hold them. They hold back — flat and amber and certain, the color of the woman in the lamplight, the color of the hunger that wakes with you now. Your smile is a little wider than it should be, the canines long and clean. You look at yourself for a long moment, and a slow, satisfied thing looks back — and you realize, distantly, that it is you. You stop pulling your lips down. You like it.</p>';
}
function zolaMedBottleLine(){
  if (!state.zolaMedGet) return '';
  if (state.zolaMedSet){
    return '<p class="small">The tonic bottle in your bag is a little lower every week, and she refills it each time you visit, wordless and pleased, like a woman watering a plant she’s growing for herself.</p>';
  }
  return '<p class="small">The tonic bottle sits in your bag — hers, warm to the touch, half full. She gave it to you and said it would help. You haven’t started it yet. It’s patient, the way she is.</p>';
}
function zolaMedNotice(){
  const t = zolaMedTier();
  if (t < 1) return '';
  if (t === 1){
    return '<p class="small">Zola studies your face with a slow, knowing smile. “The tonic agrees with you,” she says, and doesn’t explain. Her thumb brushes the corner of your mouth. “You’ve got something of the look now. Just a little. It suits you.”</p>';
  }
  return '<p class="small">Zola catches your eye across the lamplight and her smile goes slow and delighted — a little too wide at the corners, the way hers does. “There you are,” she says softly. “I was wondering when you’d start looking back.” She doesn’t say at what. You don’t ask.</p>';
}
function zolaMedButton(here){
  if (zolaMedAskGate()) return btn('Ask her how she stays so healthy at her size', 'zola:med:ask', here);
  return '';
}
function zolaMedOffer(here){
  return {
    text: '<p>Zola’s bottle is still in her hand — warm, dark glass, the label in handwriting you don’t recognize. She tilts it toward you, patient, a slow knowing smile on her mouth. “Go on, sweet thing. It’s yours. I don’t give it to just anyone.”</p>',
    actions: btn('Take the tonic', 'zola:med:take', here) + btn('Decline for now', 'zola:med:no', here)
  };
}

function zolaCommonsFlavor(){
  const zt = zolaTier(zolaLbs(state.day));
  if (zt >= 7){
    return '<p>At the end bench, Zola is where she always is — vast, soft, settled in like the table grew around her. The drones queue at her side, patient, and she eats with both hands, moaning softly, crumbs in the folds of her shirt. She catches your eye across the hall and beams, slow and delighted, and pats the bench beside her.</p>';
  }
  if (zt >= 5){
    return '<p>Zola holds court at the end bench — enormous, happy, a pile of empty trays stacked beside her. She waves you over with a thick arm, her whole body rolling with the motion, and goes back to eating without waiting for an answer, certain of you.</p>';
  }
  return '<p>Zola is at the end bench, bigger than anyone else in the hall, eating with steady, shameless relish. She spots you and grins, waving a hand sticky with glaze, and pats the seat beside her like it’s reserved.</p>';
}

function zolaDemonHint(){
  const d = state.day + Math.floor(state.zola);
  const pick = d % 9;
  if (pick === 0) return '<p class="small">The light catches her face wrong for a second — the tiny gold stud in her eyebrow, the two small rings in her lower lip — and you get the feeling, fleetingly, that you’re looking at a very old face wearing a very young one. Then she smiles and it’s just Zola again.</p>';
  if (pick === 1) return '<p class="small">She laughs, and for a moment her smile is a little wider than it should be at the corners — the canines a shade too long, catching the light just past where they should end — and then it’s a smile again, warm and ordinary, and you’re already not sure you saw it.</p>';
  if (pick === 2) return '<p class="small">You count the gold on her without meaning to — the stud in one eyebrow, the ring in her right ear, the paired hoops in her lower lip she clicks against her teeth when she’s thinking. She’s always worn them. You’re sure she has.</p>';
  return '';
}

function zolaDineFlavor(){
  if (state.day < 30) return '';
  const zt = zolaTier(zolaLbs(state.day));
  let out = '';
  if (state.piperZola){
    out += '<p>Across the hall, Piper sits at Zola’s table — she doesn’t sit anywhere else anymore. She’s settled against the bigger woman’s side, a tray open in front of her that Zola loads and feeds to her by hand, cooing every time she takes a bite. Piper moans softly around each mouthful, eyes half-closed, and when she catches you looking she grins, slow and gooey and utterly at peace, and Zola pats her belly and goes back to feeding her. “She’s mine,” Zola says, loud enough to carry. “She knows it. I know it. The whole campus knows it.”</p>';
  }
  if (state.minaZola){
    out += '<p>Across the hall, Mina sits at Zola’s table — she doesn’t sit anywhere else anymore. She’s at the bigger woman’s elbow, a tray in front of her that Zola loads and feeds to her with slow, exacting care, and Mina eats through every bite, moaning softly, cataloguing between swallows — “efficient, good, more.” Zola watches her like she’s a prized specimen. “Best subject I ever had,” Zola announces to the table, loud enough to carry. Mina doesn’t argue. She just opens her mouth for the next bite.</p>';
  }
  if (zt >= 7){
    out += '<p>Across the hall, Zola is mid-feast — a whole row of trays in front of her, drones ferrying empties away and full ones back, her head bowed over the food, a low happy hum rising between mouthfuls. She eats the way the rest of you will someday learn to: without pause, without shame, without a single thought of stopping. Once in a while she lifts her head, catches you watching, and winks — her mouth full, her cheeks round and gleaming, the canines catching the lamp a shade too long before she lowers it again to the next plate.</p>';
  } else if (zt >= 5){
    out += '<p>At the end bench, Zola eats through her third tray without hurrying, students on either side giving her the room they’ve learned to give her. She notices you looking and raises her fork in a cheerful salute, mouth full, and goes on eating, delighted and unbothered.</p>';
  } else {
    out += '<p>Zola sits at the end bench with a tray that would feed three of you, and she eats it the way she does everything — happily, steadily, shamelessly. She’s still a little new to the campus. She’s getting bigger, and she seems to know it, and it doesn’t seem to bother her at all.</p>';
  }
  return out;
}

function zolaBodyLine(){
  const pt = wTier(state.lbs);
  const zt = zolaTier(zolaLbs(state.day));
  let out = '<p>';
  if (zt >= 7){
    out += 'Zola has made the end bench her throne. Her belly is a vast soft shelf resting on her thighs in deep folds, and the reinforced bench groans under the whole weight of her every time she shifts. The drones know her by name now — they queue at the end of her table, patient, waiting for the empties. She eats the way a machine does, steadily and happily, crumbs in the folds of her shirt, a low hum in her chest between mouthfuls.';
  } else if (zt >= 5){
    out += 'Zola is enormous, even for this campus — her belly a heavy mound pressing against the table, her thighs spilling over the edges of the bench, her arms soft and thick where she reaches for the tray. She eats without shame, with relish, and the room around her has quietly rearranged itself to fit her.';
  } else {
    out += 'Zola is bigger than anyone you’ve seen here — soft and heavy and utterly unbothered by it, her belly resting on her thighs, a second tray already waiting.';
  }
  out += '</p>';
  if (pt >= 8){
    out += '<p>Zola’s eyes go round when you settle your weight beside her, and then she lets out a delighted, rumbling laugh. “Oh, now,” she says, low and thrilled, pressing her palm to the soft rise of your belly, “look at you. Look at what you’ve become. You’re one of us now — properly one of us.” She kneads the soft weight of you with a pleased hum. “The campus has been so good to you. And it’s only going to get better. Every day, a little more of you, a little softer, a little happier. I’m so proud of you, and I’ve only just met you.”</p>';
  } else if (pt >= 6){
    out += '<p>“There she is,” Zola purrs, watching you take your seat, taking in the heavy sway of your hips, the soft roll over your waistband. “You’re getting there, aren’t you. Every time I see you there’s more of you to love.” She reaches over and pats the warm curve of your belly like she’s approving a job well done. “Keep going, sweet thing. Let it all happen. The food is patient. So am I.”</p>';
  } else if (pt >= 4){
    out += '<p>Zola watches you settle across from her, her eyes tracking the soft weight of your middle with hungry approval. “You’re coming along,” she says, warm and certain. “I can see it. A girl your size, eating at a table like this every day — you’ll be big before you know it. Big and soft and happy, the way this campus wants you.” She pushes a plate toward you. “Eat. Consider it practice. You’ve got a long, lovely way to go.”</p>';
  } else {
    out += '<p>Zola looks you over, head tilted, and a slow, indulgent smile spreads across her round face. “Oh, sweetheart,” she says, gently, “look how small you are. So much room to grow. Don’t worry — this campus knows how to take care of its girls. You sit with me, you eat what I give you, and before the term is out you’ll be somebody worth being.” She pushes a pastry toward you, sticky and warm. “Start with this.”</p>';
  }
  return out + zolaDemonHint();
}

function zolaRoomBodyLine(){
  const pt = wTier(state.lbs);
  let out = '<p>Zola’s room is her nest — the bed pushed against the wall and doubled up, trays stacked on every surface, a drone dock humming softly in the corner. She is propped against a mountain of pillows, vast and soft, a plate balanced on the rise of her belly, crumbs in the sheets, and she pats the mattress beside her. “Shut the door, sweet thing,” she says, warm and low. “Nobody needs to know what we get up to.”</p>';
  if (pt >= 8){
    out += '<p>She looks you over — the sheer, vast spread of you settling onto her mattress — and her smile goes slow and worshipful. “Look at you. Look at what I helped build. You’re bigger than me now, bigger than anyone on this campus — and you’re still growing. Every pound of you is mine to love.” Her hand finds the deep roll of your belly and squeezes it like a claim. “I’m going to keep feeding you until this room can’t hold us.”</p>';
  } else if (pt >= 6){
    out += '<p>She looks you over — the enormous spread of you settling onto her mattress — and her smile goes slow and hungry. “Look at you. You’re enormous, sweet thing — properly enormous — and it only suits you.” Her hand finds the soft roll of your belly and squeezes it like a promise. “Keep eating, keep letting it happen, and you’ll outgrow every bed in this dorm. I’ll be right there when you do.”</p>';
  } else if (pt >= 4){
    out += '<p>She watches you settle your weight onto the mattress and hums, pleased. “You’re getting there, sweet thing. I can feel it on you. Keep eating, keep letting it happen, and there’ll be more of you for me to love every time you come by.”</p>';
  } else {
    out += '<p>She reaches for your hand and pulls you up beside her, noting with warm, eager eyes how little of the bed you take up. “We’ll fix that,” she promises. “You’ll fill this bed with me before we’re done.”</p>';
  }
  return out + zolaDemonHint();
}

addScreen('zola', function (){
  const zolaScenes = ['zola:talk','zola:eat','zola:weigh','zola:tease','zola:jiggle','zola:slap','zola:outgrow','zola:public','zola:scot:on','zola:scot:off','zola:scot:accept','zola:scot:refuse','zola:vib:on','zola:vib:off','zola:vib:accept','zola:vib:refuse','zola:refuse','zola:demand:kneel','zola:demand:stuff','zola:collar:talk','zola:rage','zola:rage:resist','zola:med:ask','zola:med:take','zola:med:no'];
  const after = zolaScenes.indexOf(state.lastScene) >= 0 ? AFTER[state.lastScene] : '';
  let html = '<h2>Zola’s table</h2>';
  if (after){
    html += '<div class="talk">' + (typeof after === 'function' ? after() : after) + '</div>';
    html += '<div class="actions">' + btn('Keep talking', 'zola:reset') + btn('Leave', 'nav', 'commons') + '</div>';
    return html;
  }
  const moment = zolaPendingMoment('zola');
  if (moment){
    html += '<div class="talk">' + moment.text + '</div>';
    html += '<div class="actions">' + moment.actions + '</div>';
    return html;
  }
  html += '<h3>Room</h3>';
  html += zolaBodyLine();
  html += '<h3>Visit</h3>';
  html += zolaAssTease();
  html += zolaCollarReaction();
  html += zolaMedBottleLine();
  html += zolaMedNotice();
  html += '<p class="small">Zola’s approval of you: ' + Math.round(state.zola) + '/100 — ' + zolaApprovalLabel() + '. Submission: ' + Math.round(state.submission) + '/100 — ' + zolaSubmissionLabel() + '. She weighs ' + Math.round(zolaLbs(state.day)) + ' lbs, most of it soft, none of it going anywhere.' + zolaCompareLine() + '</p>';
  html += zolaOutgrowPanel();
  html += zolaPublicGrope();
  const actions = [];
  actions.push(btn('Talk with her', 'zola:talk'));
  actions.push(zolaMedButton());
  if (zolaGate(1, 15)) actions.push(btn('Have her size you up', 'zola:weigh'));
  if (zolaGate(3, 30)) actions.push(btn('Let her tease you about how soft you’ve gotten', 'zola:tease'));
  if (zolaGate(4, 40)) actions.push(btn('Let her make your belly jiggle', 'zola:jiggle'));
  if (zolaGate(5, 50)) actions.push(btn('Let her slap your ass', 'zola:slap'));
  if (zolaGate(1, 10)) actions.push(btn('Eat with her', 'zola:eat'));
  if (zolaGate(4, 75)) actions.push(btn('Let her feed you with her hand under your fupa', 'zola:public'));
  if (state.zola >= 40) actions.push(btn('Go to her room', 'zola:room'));
  if (zolaBigger() && !state.zolaOutgrew) actions.push(btn('Let her realize it — you’re bigger than her now', 'zola:outgrow'));
  if (state.zolaCollar || state.piperCollar || state.minaCollar) actions.push(btn('Talk about the collars', 'zola:collar:talk'));
  actions.push(btn('Leave', 'nav', 'commons'));
  html += '<div class="actions">' + actions.join('') + '</div>';
  return html;
});

addScreen('zola-room', function (){
  const zolaScenes = ['zola:room','zola:talk','zola:stuff','zola:sex','zola:slob','zola:slap','zola:lap','zola:scissor','zola:outgrow','zola:worship','zola:feed','zola:public','zola:scot:on','zola:scot:off','zola:scot:accept','zola:scot:refuse','zola:vib:on','zola:vib:off','zola:vib:accept','zola:vib:refuse','zola:refuse','zola:intro:piper','zola:intro:mina','zola:intro:later','zola:sheknows:mine','zola:sheknows:unsure','zola:sheknows:silent','zola:photo','zola:pierce','zola:pierce:no','zola:strip','zola:demand:sex','zola:demand:allfours','zola:demand:kneel','zola:demand:stuff','zola:goodgirl','zola:beg','zola:collar','zola:pet','zola:collar:talk','zola:reveal','audience:leave','zola:rage','zola:rage:resist','gym:zola:leave','zola:med:ask','zola:med:take','zola:med:no'];
  const after = zolaScenes.indexOf(state.lastScene) >= 0 ? AFTER[state.lastScene] : '';
  let html = '<h2>Zola’s room</h2>';
  if (after){
    html += '<div class="talk">' + (typeof after === 'function' ? after() : after) + '</div>';
    html += '<div class="actions">' + btn('Keep talking', 'zola:reset') + btn('Leave', 'nav', 'hub') + '</div>';
    return html;
  }
  const moment = zolaPendingMoment('room');
  if (moment){
    html += '<div class="talk">' + moment.text + '</div>';
    html += '<div class="actions">' + moment.actions + '</div>';
    return html;
  }
  const auto = zolaAutoInteract();
  if (auto){
    const txt = AFTER['zola:' + auto];
    html += '<div class="talk">' + (typeof txt === 'function' ? txt() : txt) + '</div>';
    html += '<div class="actions">' + btn('Keep talking', 'zola:reset') + btn('Leave', 'nav', 'hub') + '</div>';
    return html;
  }
  html += '<h3>Room</h3>';
  html += zolaRoomBodyLine();
  html += '<h3>Visit</h3>';
  html += zolaAssTease();
  html += zolaCollarReaction();
  html += zolaMedBottleLine();
  html += zolaMedNotice();
  html += '<p class="small">Zola’s approval of you: ' + Math.round(state.zola) + '/100 — ' + zolaApprovalLabel() + '. Submission: ' + Math.round(state.submission) + '/100 — ' + zolaSubmissionLabel() + '. She weighs ' + Math.round(zolaLbs(state.day)) + ' lbs, most of it soft, none of it going anywhere.' + zolaCompareLine() + '</p>';
  html += zolaStripPanel();
  html += zolaOutgrowPanel();
  html += zolaPhotoGallery();
  html += zolaRevealPanel();
  html += zolaRoomAudienceButton();
  const actions = [];
  actions.push(btn('Talk with her', 'zola:talk', 'room'));
  actions.push(zolaMedButton('room'));
  if (state.submission >= 60) actions.push(btn('Sleep in her dorm — let her pamper you all night', 'zola:stay', 'room'));
  if (state.zolaCollar || state.piperCollar || state.minaCollar) actions.push(btn('Talk about the collars', 'zola:collar:talk', 'room'));
  if (zolaBigger() && state.zolaOutgrew){
    actions.push('<p class="small">You are bigger than her now — heavier than the woman who was supposed to be the biggest thing on campus. She looks up at you, adoring, and wants to take care of you, wants to feed you, wants to worship what you’ve become.</p>');
    actions.push(btn('Let her worship what you’ve become', 'zola:worship'));
    actions.push(btn('Let her feed the bigger girl', 'zola:feed'));
  } else if (zolaBigger() && !state.zolaOutgrew){
    actions.push(btn('Let her realize it — you’re bigger than her now', 'zola:outgrow', 'room'));
  }
  if (state.zolaIntro){
    const name = state.zolaIntro === 'piper' ? 'Piper' : 'Mina';
    const t = state.zolaCorruptT;
    actions.push('<p class="small">' + (t > 0
      ? 'The change is underway. Zola has ' + name + ' in her sights — ' + t + ' night' + (t === 1 ? '' : 's') + ' to go.'
      : 'The change is done. ' + name + ' is hers now, and stays at her table. Zola beams at you, slow and satisfied.'));
  }
  actions.push(btn('Leave', 'nav', 'hub'));
  html += '<div class="actions">' + actions.join('') + '</div>';
  return html;
});

addAction('zola:meet', function (){
  apply({ metZola: true, lastScene: '', screen: 'zola', notice: 'Zola waves you over. You sit.' });
});
addAction('zola:reset', function (){
  apply({ lastScene: '', screen: state.screen });
});
addAction('zola:room', function (){
  apply({ lastScene: 'zola:room', screen: 'zola-room', notice: 'Zola takes you up to her room.' });
});
addAction('zola:talk', function (arg){
  apply({ zola: Math.min(100, state.zola + 5), selfcontrol: state.selfcontrol - 2, submission: Math.min(100, state.submission + 1), lastScene: 'zola:talk', notice: '+5 approval · −2 self-control · +1 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:eat', function (){
  apply({ zola: Math.min(100, state.zola + 8), glut: state.glut + 3, selfcontrol: state.selfcontrol - 4, submission: Math.min(100, state.submission + 1), clock: clockPlus(mealTime(3)), lastScene: 'zola:eat', notice: 'Stomach +3 (now ' + fullnessAt(state.glut + 3) + ') · +8 approval · −4 self-control · +1 submission', screen: 'zola' });
});
addAction('zola:stuff', function (){
  apply({ zola: Math.min(100, state.zola + 10), glut: state.glut + 5, selfcontrol: state.selfcontrol - 8, selfestem: state.selfestem + 2, submission: Math.min(100, state.submission + 2), clock: clockPlus(mealTime(5)), lastScene: 'zola:stuff', notice: 'Stomach +5 (now ' + fullnessAt(state.glut + 5) + ') · +10 approval · −8 self-control · +2 self-esteem · +2 submission', screen: 'zola-room' });
});
addAction('zola:sex', function (){
  apply({ zola: Math.min(100, state.zola + 12), selfcontrol: state.selfcontrol - 12, selfestem: state.selfestem + 6, submission: Math.min(100, state.submission + 3), clock: clockPlus(1), lastScene: 'zola:sex', notice: '+12 approval · −12 self-control · +6 self-esteem · +3 submission', screen: 'zola-room' });
});
addAction('zola:slob', function (){
  apply({ zola: Math.min(100, state.zola + 15), selfcontrol: state.selfcontrol - 10, selfestem: state.selfestem + 4, submission: Math.min(100, state.submission + 3), clock: clockPlus(1.5), lastScene: 'zola:slob', notice: '+15 approval · −10 self-control · +4 self-esteem · +3 submission', screen: 'zola-room' });
});
addAction('zola:refuse', function (arg){
  apply({ zola: Math.max(0, state.zola - 5), selfcontrol: state.selfcontrol + 5, lastScene: 'zola:refuse', notice: 'You hold your ground. −5 approval · +5 self-control', screen: arg === 'room' ? 'zola-room' : 'zola' });
});addAction('zola:intro:piper', function (){
  apply({ zolaIntro: 'piper', zolaCorruptT: 10, lastScene: 'zola:intro:piper', notice: 'Zola has set her sights on Piper. She’ll be hers in ten days.', screen: 'zola-room' });
});
addAction('zola:intro:mina', function (){
  apply({ zolaIntro: 'mina', zolaCorruptT: 10, lastScene: 'zola:intro:mina', notice: 'Zola has set her sights on Mina. She’ll be hers in ten days.', screen: 'zola-room' });
});
addAction('zola:intro:later', function (arg){
  apply({ zolaIntroDelay: state.day + 3, lastScene: 'zola:intro:later', notice: 'You put it off for now. Zola lets it go.', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:sheknows:mine', function (arg){
  apply({ zolaSheKnows: true, zola: Math.min(100, state.zola + 5), selfcontrol: Math.max(0, state.selfcontrol - 2), submission: Math.min(100, state.submission + 2), lastScene: 'zola:sheknows:mine', notice: 'You reassure her. +5 approval · +2 submission · −2 self-control', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:sheknows:unsure', function (arg){
  apply({ zolaSheKnows: true, zola: Math.max(0, state.zola - 5), selfcontrol: Math.min(100, state.selfcontrol + 3), lastScene: 'zola:sheknows:unsure', notice: 'You admit you’re not sure. −5 approval · +3 self-control', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:sheknows:silent', function (arg){
  apply({ zolaSheKnows: true, selfcontrol: Math.min(100, state.selfcontrol + 2), submission: Math.min(100, state.submission + 1), lastScene: 'zola:sheknows:silent', notice: 'You say nothing. +2 self-control · +1 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:weigh', function (){
  apply({ zola: Math.min(100, state.zola + 4), knownLbs: state.lbs, selfestem: state.selfestem + 1, lastScene: 'zola:weigh', notice: '+4 approval · +1 self-esteem · she tells you your weight', screen: 'zola' });
});
addAction('zola:tease', function (){
  apply({ zola: Math.min(100, state.zola + 5), selfcontrol: state.selfcontrol - 3, selfestem: state.selfestem - 2, submission: Math.min(100, state.submission + 1), lastScene: 'zola:tease', notice: '+5 approval · −3 self-control · −2 self-esteem · +1 submission', screen: 'zola' });
});
addAction('zola:jiggle', function (){
  apply({ zola: Math.min(100, state.zola + 6), selfcontrol: state.selfcontrol - 4, selfestem: state.selfestem + 1, submission: Math.min(100, state.submission + 1), lastScene: 'zola:jiggle', notice: '+6 approval · −4 self-control · +1 self-esteem · +1 submission', screen: 'zola' });
});
addAction('zola:slap', function (arg){
  apply({ zola: Math.min(100, state.zola + 7), selfcontrol: state.selfcontrol - 5, selfestem: state.selfestem + 2, submission: Math.min(100, state.submission + 2), lastScene: 'zola:slap', notice: '+7 approval · −5 self-control · +2 self-esteem · +2 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:lap', function (){
  apply({ zola: Math.min(100, state.zola + 8), selfcontrol: state.selfcontrol - 6, selfestem: state.selfestem + 3, submission: Math.min(100, state.submission + 2), lastScene: 'zola:lap', notice: '+8 approval · −6 self-control · +3 self-esteem · +2 submission', screen: 'zola-room' });
});
addAction('zola:scissor', function (arg){
  apply({ zola: Math.min(100, state.zola + 10), selfcontrol: state.selfcontrol - 8, selfestem: state.selfestem + 4, submission: Math.min(100, state.submission + 3), lastScene: 'zola:scissor', notice: '+10 approval · −8 self-control · +4 self-esteem · +3 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:outgrow', function (arg){
  apply({ zola: Math.min(100, state.zola + 15), selfestem: state.selfestem + 5, zolaOutgrew: true, submission: Math.min(100, state.submission + 3), lastScene: 'zola:outgrow', notice: 'You outgrew her. +15 approval · +5 self-esteem · +3 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:worship', function (){
  apply({ zola: Math.min(100, state.zola + 8), selfestem: state.selfestem + 4, submission: Math.min(100, state.submission + 2), lastScene: 'zola:worship', notice: '+8 approval · +4 self-esteem · +2 submission', screen: 'zola-room' });
});
addAction('zola:feed', function (){
  apply({ zola: Math.min(100, state.zola + 10), glut: state.glut + 3, selfcontrol: state.selfcontrol - 5, selfestem: state.selfestem + 2, submission: Math.min(100, state.submission + 2), clock: clockPlus(mealTime(3)), lastScene: 'zola:feed', notice: 'Stomach +3 (now ' + fullnessAt(state.glut + 3) + ') · +10 approval · −5 self-control · +2 self-esteem · +2 submission', screen: 'zola-room' });
});
addAction('zola:public', function (arg){
  apply({ zola: Math.min(100, state.zola + 10), glut: state.glut + 2, selfcontrol: state.selfcontrol - 8, selfestem: state.selfestem + 3, submission: Math.min(100, state.submission + 3), clock: clockPlus(mealTime(2)), lastScene: 'zola:public', notice: 'Stomach +2 (now ' + fullnessAt(state.glut + 2) + ') · +10 approval · −8 self-control · +3 self-esteem · +3 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:strip', function (arg){
  apply({ zolaNaked: true, zolaStripDone: true, zola: Math.min(100, state.zola + 3), selfcontrol: state.selfcontrol - 8, selfestem: state.selfestem + 4, submission: Math.min(100, state.submission + 6), lastScene: 'zola:strip', notice: 'She strips you both. +3 approval · −8 self-control · +4 self-esteem · +6 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:photo', function (arg){
  const photos = state.zolaPhotos.concat([{ day: state.day, lbs: Math.round(state.lbs * 100) / 100 }]);
  apply({ zolaPhotos: photos, zolaPhotoDay: state.day, selfestem: state.selfestem + 1, submission: Math.min(100, state.submission + 2), lastScene: 'zola:photo', notice: '+1 self-esteem · +2 submission · she keeps the picture', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:pierce', function (arg){
  apply({ zolaPierced: true, zolaPierceDay: state.day, zola: Math.min(100, state.zola + 8), selfcontrol: Math.max(0, state.selfcontrol - 8), selfestem: Math.min(100, state.selfestem + 4), submission: Math.min(100, state.submission + 5), clock: clockPlus(1), lastScene: 'zola:pierce', notice: 'She takes you to get pierced. +8 approval · −8 self-control · +4 self-esteem · +5 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:pierce:no', function (arg){
  apply({ zolaPierceDay: state.day, zola: Math.max(0, state.zola - 2), lastScene: 'zola:pierce:no', notice: 'You decline for now. −2 approval', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:demand:sex', function (arg){
  zolaDemandCache.done = state.day;
  apply({ zola: Math.min(100, state.zola + 10), selfcontrol: state.selfcontrol - 15, selfestem: state.selfestem + 6, submission: Math.min(100, state.submission + 8), lastScene: 'zola:demand:sex', notice: 'You couldn’t refuse her. +10 approval · −15 self-control · +6 self-esteem · +8 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:demand:allfours', function (arg){
  zolaDemandCache.done = state.day;
  apply({ zola: Math.min(100, state.zola + 10), glut: state.glut + 4, selfcontrol: state.selfcontrol - 15, selfestem: state.selfestem + 6, submission: Math.min(100, state.submission + 8), clock: clockPlus(mealTime(4)), lastScene: 'zola:demand:allfours', notice: 'Stomach +4 (now ' + fullnessAt(state.glut + 4) + ') · +10 approval · −15 self-control · +6 self-esteem · +8 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:demand:kneel', function (arg){
  zolaDemandCache.done = state.day;
  apply({ zola: Math.min(100, state.zola + 8), glut: state.glut + 3, selfcontrol: state.selfcontrol - 12, selfestem: state.selfestem + 4, submission: Math.min(100, state.submission + 6), clock: clockPlus(mealTime(3)), lastScene: 'zola:demand:kneel', notice: 'Stomach +3 (now ' + fullnessAt(state.glut + 3) + ') · +8 approval · −12 self-control · +4 self-esteem · +6 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:demand:stuff', function (arg){
  zolaDemandCache.done = state.day;
  apply({ zola: Math.min(100, state.zola + 8), glut: state.glut + 5, selfcontrol: state.selfcontrol - 12, selfestem: state.selfestem + 4, submission: Math.min(100, state.submission + 6), clock: clockPlus(mealTime(5)), lastScene: 'zola:demand:stuff', notice: 'Stomach +5 (now ' + fullnessAt(state.glut + 5) + ') · +8 approval · −12 self-control · +4 self-esteem · +6 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:goodgirl', function (arg){
  apply({ zola: Math.min(100, state.zola + 5), glut: state.glut + 2, selfcontrol: state.selfcontrol - 6, selfestem: state.selfestem + 3, submission: Math.min(100, state.submission + 4), clock: clockPlus(mealTime(2)), lastScene: 'zola:goodgirl', notice: 'Stomach +2 (now ' + fullnessAt(state.glut + 2) + ') · +5 approval · −6 self-control · +3 self-esteem · +4 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:beg', function (arg){
  apply({ zola: Math.min(100, state.zola + 6), glut: state.glut + 3, selfcontrol: state.selfcontrol - 8, selfestem: state.selfestem + 4, submission: Math.min(100, state.submission + 5), clock: clockPlus(mealTime(3)), lastScene: 'zola:beg', notice: 'Stomach +3 (now ' + fullnessAt(state.glut + 3) + ') · +6 approval · −8 self-control · +4 self-esteem · +5 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:collar', function (arg){
  apply({ zolaCollar: true, zola: Math.min(100, state.zola + 8), selfcontrol: state.selfcontrol - 10, selfestem: state.selfestem + 5, submission: Math.min(100, state.submission + 6), lastScene: 'zola:collar', notice: 'She fastens the collar around your neck. +8 approval · −10 self-control · +5 self-esteem · +6 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:pet', function (arg){
  apply({ zola: Math.min(100, state.zola + 6), glut: state.glut + 2, selfcontrol: state.selfcontrol - 10, selfestem: state.selfestem + 5, submission: Math.min(100, state.submission + 6), clock: clockPlus(mealTime(2)), lastScene: 'zola:pet', notice: 'Stomach +2 (now ' + fullnessAt(state.glut + 2) + ') · +6 approval · −10 self-control · +5 self-esteem · +6 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:collar:talk', function (arg){
  apply({ selfcontrol: state.selfcontrol - 4, selfestem: state.selfestem + 2, submission: Math.min(100, state.submission + 1), lastScene: 'zola:collar:talk', notice: '−4 self-control · +2 self-esteem · +1 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:rage', function (arg){
  apply({ zola: Math.min(100, state.zola + 12), selfcontrol: Math.min(100, state.selfcontrol + 10), submission: Math.min(100, state.submission + 3), zolaCollar: true, zolaCollarOff: false, zolaRecollared: true, clock: clockPlus(1), lastScene: 'zola:rage', notice: 'She puts the new collar on you. +12 approval · +10 self-control · +3 submission', screen: arg });
});
addAction('zola:rage:resist', function (arg){
  apply({ zola: Math.min(100, state.zola + 6), selfestem: Math.max(0, state.selfestem - 6), submission: Math.min(100, state.submission + 8), selfcontrol: Math.max(0, state.selfcontrol - 8), zolaCollar: true, zolaCollarOff: false, zolaRecollared: true, clock: clockPlus(1), lastScene: 'zola:rage:resist', notice: 'She holds you and puts the new collar on anyway. +6 approval · −6 self-esteem · +8 submission · −8 self-control', screen: arg });
});
addAction('zola:order', function (){
  const t = wTier(state.lbs);
  const g = Math.min(50, state.glut + 2 + t);
  const scDrop = 3 + Math.floor(t / 2);
  apply({ glut: g, selfcontrol: Math.max(0, state.selfcontrol - scDrop), selfestem: Math.min(100, state.selfestem + 2), submission: Math.min(100, state.submission + 2), zola: Math.min(100, state.zola + 2), zolaOrderDay: state.day, clock: clockPlus(mealTime(2 + t)), lastScene: 'zola:order', notice: 'She chose what you ate. Stomach +' + (2 + t) + ' (now ' + fullnessAt(g) + ') · −' + scDrop + ' self-control · +2 self-esteem · +2 submission · +2 approval', screen: 'commons' });
});
addAction('zola:stay', function (){
  beddayScene = '<p>You stay. Zola closes the door, turns off the lights, and for the rest of the night you are pampered and handled and fed — soft hands on your belly, a low voice in your ear telling you what a good girl you are, and then she takes you, unhurried and thorough, until you’re limp and moaning in the warm dark. She keeps you on the bed through breakfast, feeding you bites between slow, possessive touches, and when you finally doze off it’s into a deep, heavy, well-fed sleep. “Good girl,” she murmurs against your hair. “Sleep. I’ll be here when you wake.”</p>';
  state.zolaStayNight = true;
  doSleep();
});
addAction('zola:visit', function (){
  const n = Math.max(1, (state.zolaVisitN | 0) + 1);
  apply({
    zolaVisitDay: state.day,
    zolaVisitN: n,
    glut: Math.min(50, state.glut + 4),
    selfcontrol: Math.max(0, state.selfcontrol - 4),
    selfestem: Math.min(100, state.selfestem + 3),
    submission: Math.min(100, state.submission + 3),
    clock: clockPlus(1.5),
    lastScene: 'zola:visit',
    notice: 'Zola’s daily visit. Stomach +4 · +3 self-esteem · +3 submission · −4 self-control',
    screen: 'room'
  });
});
addScreen('zola-gallery', function (){
  let html = '<h2>Zola’s wall — your growth</h2>';
  if (!state.zolaPhotos.length){
    html += '<p>No photos yet. “We’ll fix that soon, sweet thing,” Zola promises.</p>';
  } else {
    html += '<p>A row of photographs pinned to Zola’s wall, in order. “Every pound, remembered,” she says, patting them. “Evidence.”</p>';
    html += '<ul class="night">';
    for (let i = state.zolaPhotos.length - 1; i >= 0; i--){
      const ph = state.zolaPhotos[i];
      const gain = i > 0 ? state.zolaPhotos[i].lbs - state.zolaPhotos[i - 1].lbs : 0;
      html += '<li>Day ' + ph.day + ' — ' + ph.lbs + ' lbs' + (i > 0 ? ' <span class="small">(+' + Math.round(gain * 10) / 10 + ' since the last)</span>' : ' <span class="small">(the beginning)</span>') + '</li>';
    }
    html += '</ul>';
  }
  html += '<div class="actions">' + btn('Back to her room', 'nav', 'zola-room') + '</div>';
  return html;
});
addAction('zola:scot:on', function (arg){
  apply({ scooterOff: false, zola: Math.min(100, state.zola + 5), selfcontrol: state.selfcontrol - 2, lastScene: 'zola:scot:on', notice: 'You agree to ride again. +5 approval · −2 self-control', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:scot:off', function (arg){
  apply({ zola: Math.max(0, state.zola - 8), selfcontrol: state.selfcontrol + 3, lastScene: 'zola:scot:off', notice: 'You refuse. −8 approval · +3 self-control', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:scot:accept', function (arg){
  apply({ scooterAcc: true, zola: Math.min(100, state.zola + 5), selfestem: state.selfestem - 2, lastScene: 'zola:scot:accept', notice: 'You accept the scooter. +5 approval · −2 self-esteem', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:scot:refuse', function (arg){
  apply({ zola: Math.max(0, state.zola - 8), selfcontrol: state.selfcontrol + 3, lastScene: 'zola:scot:refuse', notice: 'You refuse. −8 approval · +3 self-control', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:vib:on', function (arg){
  apply({ vibOff: false, zola: Math.min(100, state.zola + 5), selfcontrol: state.selfcontrol - 2, selfestem: state.selfestem + 1, lastScene: 'zola:vib:on', notice: 'You agree to plug it back in. +5 approval · −2 self-control · +1 self-esteem', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:vib:off', function (arg){
  apply({ zola: Math.max(0, state.zola - 8), selfcontrol: state.selfcontrol + 3, lastScene: 'zola:vib:off', notice: 'You refuse. −8 approval · +3 self-control', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:vib:accept', function (arg){
  apply({ vibRoom: true, vibAd: true, zola: Math.min(100, state.zola + 5), selfestem: state.selfestem + 1, lastScene: 'zola:vib:accept', notice: 'You accept the Comfort unit. +5 approval · +1 self-esteem', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:vib:refuse', function (arg){
  apply({ vibAd: true, zola: Math.max(0, state.zola - 8), selfcontrol: state.selfcontrol + 3, lastScene: 'zola:vib:refuse', notice: 'You refuse. −8 approval · +3 self-control', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:reveal', function (){
  apply({ zolaHintSeen: true, selfcontrol: state.selfcontrol - 6, selfestem: state.selfestem - 4, lastScene: 'zola:reveal', notice: 'You saw what she is. −6 self-control · −4 self-esteem', screen: 'zola-room' });
});
addAction('zola:audience', function (){
  apply({ lastScene: 'zola:audience', screen: 'audience-chamber', notice: 'Zola takes you below.' });
});
addAction('zola:med:ask', function (arg){
  apply({ zolaMedAsk: true, zola: Math.min(100, state.zola + 3), lastScene: 'zola:med:ask', notice: '+3 approval · she tells you her secret', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:med:take', function (arg){
  apply({ zolaMedGet: true, zola: Math.min(100, state.zola + 5), selfcontrol: Math.max(0, state.selfcontrol - 3), selfestem: Math.min(100, state.selfestem + 2), submission: Math.min(100, state.submission + 2), lastScene: 'zola:med:take', notice: 'The tonic is yours — dark glass, warm, hers. +5 approval · −3 self-control · +2 self-esteem · +2 submission', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
addAction('zola:med:no', function (arg){
  apply({ zola: Math.max(0, state.zola - 3), selfcontrol: Math.min(100, state.selfcontrol + 2), lastScene: 'zola:med:no', notice: 'You decline. −3 approval · +2 self-control', screen: arg === 'room' ? 'zola-room' : 'zola' });
});
AFTER['zola:med:ask'] = '<p>Zola pauses mid-bite, delighted by the question. “You want to know how I stay healthy at my size?” She laughs, low and warm, and wipes her fingers on her shirt. “It’s my tonic, sweet thing. The campus kitchen brews it. I drink it every night before bed, and I don’t ache in the morning — no joints, no heart, no nothing. Just soft and happy and healthy as a horse.” She reaches into her bag and pulls out a heavy little bottle, warm in her hand, dark glass, a handwritten label. “Here. Yours. It tastes a little sweet, and it’s a little thick, and it does the work while you sleep.” She holds it out. “Go on.”</p>';
AFTER['zola:med:take'] = '<p>You take it. It’s warm, heavy, dark glass, and the label reads only a name in handwriting you don’t recognize. Zola beams at you, soft and proprietary. “Good girl. Drink it before bed tonight — every night. You’ll thank me when the mornings stop hurting.” She pats your hand. “It’s the best thing I’ve ever shared.”</p>';
AFTER['zola:med:no'] = '<p>You shake your head. Zola studies you a moment, then shrugs, the bottle disappearing back into her bag. “It’s there when you need it,” she says, and the way she says it, you believe it’s already been waiting for you. “The aches will remind you.”</p>';
AFTER['zola:reveal'] = '<p>You say nothing. Zola watches you say nothing, and her smile stays warm and knows, and she reaches across and takes your hand. “Good girl,” she says, soft. “You’re learning to look. That’s the first thing that matters.” She holds your hand a moment longer than she needs to. “Keep looking, sweet thing. When you’re ready, I’ll show you everything.”</p>';
AFTER['zola:audience'] = '<p>Zola takes you down at midnight — through the back of her closet, down a corridor that shouldn’t be in a dorm, too warm, too sweet, breathing. She holds your hand the whole way, and her grip is soft and certain and hers. The air grows thick with the smell of honeyed meat, and ahead, a red glow begins.</p>';

AFTER['zola:room'] = '<p>Zola finishes the last bite of whatever she was working through, sets the plate down, and reaches for your hand with a sticky, warm one. “Come on, sweet thing. The table’s for show. My room is where I keep what matters.” She hauls herself up, the bench groaning, and leads you up the stairs at the back of the commons, slow and swaying, one hand braced on the rail. The door opens on her room — the bed against the wall, trays and pillows everywhere, the drone dock humming — and she shuts it behind you and pats the mattress. “Sit. Tell me what you want, and I’ll tell you what you need.” The door is closed. Nobody is going to interrupt.</p>';
AFTER['zola:talk'] = function (){
  return '<p>You talk. Zola eats while she listens, steadily, happily, and answers between mouthfuls. She tells you about the campus the way the campus wants to be told about — food that appears before you’re hungry, bands that know you better than you do, drones that take care of everything. “You fight it at first,” she says, dreamy, wiping her fingers on the front of her shirt, “everyone does. Then one day you stop. And it’s the best day of your life.” She looks at you, warm and certain. “You’re almost there, sweetheart. I can always tell.”</p>';
};
AFTER['zola:eat'] = '<p>Zola pushes the tray so it sits between the two of you and eats with you, matching your rhythm, moaning softly around every bite. “That’s it,” she hums, watching you eat. “Look at you go. The food wants this. The campus wants this. I want this.” She reaches over and presses her palm gently to your belly as you swallow, feeling the soft weight of it fill. “Good girl,” she says, low and pleased, and takes another bite herself. “We’re going to make you so big and happy.”</p>';
AFTER['zola:stuff'] = '<p>Zola feeds you herself — holding up each bite, murmuring praise, wiping your chin with her thumb, then pressing the next forkful to your lips. “Open up, sweet thing. That’s it. Swallow it down for me.” She works through tray after tray this way, your belly swelling warm and heavy against your waistband, and she watches the change in you with hungry, delighted eyes. “Look at you,” she breathes. “Growing right in front of me. You don’t even have to try anymore — you just eat, and it happens, and it feels good, doesn’t it. It feels good to be fed.” She feeds you until you’re groaning, full past comfortable, and then she takes the last bite herself, eyes closed, satisfied, and pats your belly with a soft, heavy hand. “More tomorrow,” she promises. “Always more.”</p>';
AFTER['zola:sex'] = '<p>Zola pulls you onto the bed with a soft, eager laugh, and her hands are everywhere at once — huge and warm, pressing into the softness of you, learning the weight of you, cupping your belly like it’s something precious. “Come here, sweet thing,” she hums, “let me have you.” She is soft and vast beneath you, a warm mountain of a woman, and she takes her time, kissing along the deep crease of your belly, praising every roll of you, and when her hand finds the heat between your thighs she works you slow and patient until you come apart against her, shaking, and she holds you through it, warm and certain — and for a heartbeat, in the lamplight, her eyes go amber as she watches you come undone, then brown again, and you’re already doubting it. “There you are,” she whispers, satisfied. “That’s my girl. And you’ll come back for more — they always do.”</p>';
AFTER['zola:slob'] = '<p>Zola teaches you how she eats — or rather, she feeds you until there is nothing left of you but appetite. She stuffs your mouth and your hands, moaning encouragement over the sound of your own greedy chewing, and it isn’t long before you’re eating the way she does, shameless and happy, a low moan rising from your chest with every swallow, crumbs down the front of you, your belly round and tight and warm under your clothes. “That’s it,” she crows, delighted, feeding you faster. “That’s my girl. Eat and moan and don’t stop. This is what you were made for.” She holds your chin in her soft hand and looks at you — flushed, stuffed, gleaming — and beams — her smile a little too wide at the corners, the canines a shade too long, catching the light just past where they should, before she blinks and it’s a smile again. “You’re going to be enormous,” she says, like a benediction. “And you’re going to love every bite of it.”</p>';
AFTER['zola:refuse'] = '<p>You stand your ground. Zola watches you with a knowing, patient smile and lets you go without a fuss. “That’s alright, sweetheart,” she says, already reaching for the next tray. “You’ll be back. They always come back. The food’s patient, and so am I.”</p>';
AFTER['zola:intro:piper'] = '<p>“Piper,” Zola repeats, tasting the name, and her smile goes wide and hungry. “The runner. Oh, she’ll be sweet.” She already looks like she owns her. “Bring her to the commons tomorrow. Don’t tell her what it is. Just get her to my table, and I’ll do the rest.” She pats your hand. “You did the right thing, sweetheart. She’ll be so much happier. They always are.”</p>';
AFTER['zola:intro:mina'] = '<p>“Mina,” Zola repeats, tasting the name, and her smile goes wide and hungry. “The studious one. All that measuring and weighing — she’s going to love giving it up.” She already looks like she owns her. “Bring her to the commons tomorrow. Don’t tell her what it is. Just get her to my table, and I’ll do the rest.” She pats your hand. “You did the right thing, sweetheart. She’ll be so much happier. They always are.”</p>';
AFTER['zola:intro:later'] = '<p>“Not tonight,” you say. Zola laughs, low and unhurried, and takes a long, slow bite, watching you over it. “Sweet thing. The door’s open whenever you’re ready.” She pats the mattress. “Those girls aren’t going anywhere. Neither am I.”</p>';
AFTER['zola:sheknows:mine'] = '<p>“No,” you say, and you take her hand before you can think. “I’m not one of them. I’m yours.” Zola’s smile goes slow and satisfied, and she pulls you in close, her warm palm settling on the soft roll of your belly. “That’s what I thought,” she says, low and certain. “Good girl. I knew you’d say that. Now let me feed you.”</p>';
AFTER['zola:sheknows:unsure'] = '<p>“I... I’m not sure anymore,” you admit. Zola’s eyes flicker, and then they go warm and patient, almost gentle. “That’s all right, sweet thing. They plant little seeds, and you’re a good girl who doesn’t know what to do with them.” She reaches for your chin and turns your face to hers. “I’ll pull them out for you. By the time I’m done, you won’t be sure of anything but me.”</p>';
AFTER['zola:sheknows:silent'] = '<p>You say nothing. Zola watches you say nothing, and her smile doesn’t change — warm and knowing and utterly certain. “That’s fine too,” she says softly. “Words are hard when you’re not sure yet. I’ll wait. I’m very patient with my girls.” She pats the bed beside her. “Come. Sit with me.”</p>';
AFTER['zola:weigh'] = function (){
  const pt = wTier(state.lbs);
  if (zolaBigger()){
    return '<p>Zola sizes you up with her eyes, then with her hands — palms spanning your hips, your waist, the soft mound of your belly — and her mouth opens, then closes. She measures you again, slower, and lets out a long, delighted breath. “Sweet thing,” she says, wonder in her voice. “When did you get bigger than me?” She pulls you close and presses the whole soft front of you against her, and there is more of you than of her. “Look at you. You outgrew the one who taught you. I couldn’t be prouder of anything I’ve ever made.” She holds the heavy weight of your belly in both hands, warm and reverent. “You’re the biggest thing in this hall now. And you’re still growing.”</p>';
  }
  if (pt >= 6){
    return '<p>Zola sizes you up with her eyes, then with her hands — palms spanning your hips, your waist, the heavy roll of your belly — and lets out a slow, hungry hum. “Look at you, sweet thing. You’re nearly as big as me now. A few more weeks and there’ll be nobody in this hall to match you but me.” Her eyes go dark and pleased. “And then you’ll pass me. I can’t wait to watch it happen.”</p>';
  }
  if (pt >= 4){
    return '<p>Zola sizes you up with her eyes, then with her hands — gripping the softness at your hips, the roll over your waistband, the weight of your belly — and nods, pleased. “You’re getting there, sweet thing. I can feel it on you. A few more months of sitting at my table and you’ll be a proper match for me.” She pats the soft rise of your middle. “And then we’ll see who’s the biggest.”</p>';
  }
  return '<p>Zola sizes you up with her eyes, then reaches over and settles a hand on the softness of your side, weighing it. “Small,” she says, but it isn’t unkind — it’s hungry. “So much room to grow. You sit with me, you eat what I give you, and before the term is out you’ll be somebody worth being.” She squeezes the soft curve of your belly. “I’ll see you get there.”</p>';
};
AFTER['zola:tease'] = function (){
  const pt = wTier(state.lbs);
  if (pt >= 6){
    return '<p>“Oh, look at you,” Zola teases, running a hand over the heavy rise of your belly. “Look how soft you’ve gotten. Look how much of you there is now. When you first sat down here you were a little bird — and now look. You fill this bench like you were born to it.” She pokes the roll of your middle and watches it jiggle. “And it jiggles when I poke it. That’s my favorite part.” Her voice drops, warm and fond and a little cruel. “You’re going to be enormous, sweet thing. And you’re going to love it. I’m going to make sure of that.”</p>';
  }
  if (pt >= 4){
    return '<p>“There she is,” Zola teases as you settle in, her eyes tracking the soft weight of you. “Look at that belly. Look at those hips. Every time I see you there’s more of you to love.” She reaches over and pinches the soft roll over your waistband. “Getting properly soft now. A girl your size eating the way you do — you’ll be big before you know it.” She grins, delighted. “I’m going to enjoy watching it.”</p>';
  }
  return '<p>“Oh, sweetheart,” Zola teases, watching you take your seat, “look how small you are. So much room to grow.” She reaches across and pats the softness of your side, leaving her hand there a moment too long. “You eat with me, we’ll fix that in no time. I’ve never seen anyone sit at my table and stay small.” She grins. “It’s the nicest thing about this campus — it takes care of girls like you.”</p>';
};
AFTER['zola:jiggle'] = function (){
  const pt = wTier(state.lbs);
  if (pt >= 6){
    return '<p>Zola sets both hands on the soft rise of your belly and gives it a gentle shake. It jiggles — heavy, deep, a roll of motion that carries on after her hands go still. She laughs, delighted, and does it again, faster, watching the softness of you wobble and settle and wobble again. “Oh, that’s the good stuff,” she purrs. “Look at it move. You’ve got real weight on you now, sweet thing — the good kind, the kind that jiggles when I touch it and settles like water when I stop.” She squeezes a handful of your side. “I could play with this all day.”</p>';
  }
  if (pt >= 4){
    return '<p>Zola pokes the soft curve of your belly and watches it wobble — a slow jiggle that travels through the padding of you. “Look at that,” she teases, delighted, poking it again. “You’re getting properly soft now. That’s the weight settling in where it belongs.” She takes a handful of your side and shakes it gently. “A few more months and you’ll jiggle when you walk. I can’t wait to see it.”</p>';
  }
  return '<p>Zola pokes at the softness of your side, finding a little give and making it wobble with a playful wiggle of her finger. “There’s some there,” she says, pleased. “Just a little. Give it time and there’ll be plenty to jiggle — I’ll make sure of it.” She pats your belly. “That’s where it all goes. Soft and round and happy.”</p>';
};
AFTER['zola:slap'] = function (){
  const pt = wTier(state.lbs);
  if (pt >= 6){
    return '<p>Zola pats her thigh, and when you turn, she brings her open palm down on the wide, heavy spread of your ass. It lands with a loud smack that echoes through the room, and your whole soft bottom jiggles from the impact — rolling and settling in a wave she watches with hungry delight. “Oh, that’s a good one,” she purrs, doing it again, and again, watching it bounce each time. “Nice and heavy. That’s the kind that gets attention.” She squeezes a handful of it, warm and firm. “I’m going to make this bigger yet. A proper handful, and then some.”</p>';
  }
  if (pt >= 4){
    return '<p>Zola reaches over and gives your ass a firm, playful slap, and there’s finally enough of you for it to make a sound — a soft, meaty crack that sets the padding of you jiggling. She laughs, delighted. “There we go,” she says, patting the spot. “That’s starting to be something worth slapping. A few more months and I’ll have to do it with both hands.”</p>';
  }
  return '<p>Zola gives your ass a light, teasing pat. “Not much to grab yet,” she says, amused. “But give it time. Sit with me, eat what I give you, and I’ll make sure there’s plenty back there to slap.” She grins, hungry. “I like a girl with a bit of cushion. You’ll have it soon enough.”</p>';
};
AFTER['zola:lap'] = function (){
  return '<p>Zola pats the vast, soft spread of her thighs, and you settle across her lap — and it takes your weight, all of it, folding you into the softness of her. She wraps her arms around the heavy middle of you and rocks you gently, humming, her belly warm against your back. “There we go,” she purrs, squeezing the soft roll of your belly with both arms. “Look at you. Made for this.” She shifts your weight in her lap, testing it, and groans low and pleased. “You’re heavy now, sweet thing. That’s what I wanted. That’s what I’m making of you.”</p>';
};
AFTER['zola:scissor'] = function (){
  const pt = wTier(state.lbs);
  if (pt >= 8){
    return '<p>Zola pulls you onto the bed and rolls you over her, and there’s no pretending anymore about who’s heavier — you’re colossal, a soft mountain of a girl, and when you settle your weight over her the mattress gives a long, helpless groan and she gasps beneath you, pinned and delighted. She lifts her thick thigh between yours and you grind down onto it, your own hip rolling against hers, the vast soft weight of you pressing her into the sheets. “Oh,” she breathes, clutching the deep rolls of your belly to hold you to her, “look at you. Look how you crush me. I made this.” You scissor her slow and heavy until she’s crying out under you, and she holds you after, spent and adoring. “My biggest girl,” she whispers. “I’m so proud of what I made.”</p>';
  }
  if (pt >= 6){
    return '<p>Zola tugs you onto the bed and rolls onto her side, and you fit into her like a key — belly to belly, thigh locked over thigh, two enormous soft bodies grinding slow and deep against each other. She moans, her hands gripping the heavy rolls of your hips to steer the motion, and you match her, roll for roll, until the bed groans and the heat between your legs finds hers through all that weight. “That’s it, sweet thing,” she hums against your throat, “scissor me. Let me feel all of you.” She works you until you’re both shaking and breathless, and then she pulls you close and holds you, warm and possessive. “Good girl. Made for this.”</p>';
  }
  if (pt >= 4){
    return '<p>Zola pulls you onto the bed and arranges you against her — soft leg hooked over yours, her enormous warm body guiding you — and starts a slow, grinding rhythm, your hip rocking against hers, your thigh pressed into the heat of her, your heavy middle mashing into the soft shelf of her belly. She moans, low and delighted, hands on your hips steering every roll. “That’s it, sweet thing. Scissor against me. Feel how good this weight feels together.” She works you until your legs are weak and your voice is gone, and then she holds you, satisfied. “You’re learning to take what you want, big girl.”</p>';
  }
  return '<p>Zola pulls you onto the bed and settles you against her vast, soft body, and she’s so much bigger than you that she folds you into her like a pillow — her thigh sliding between yours, your soft thighs cradling it, her hands spread across the small of your back holding you exactly where she wants you. She grinds you against her slow and gentle, her enormous belly warm against yours, her breath low and patient in your ear. “There we go, sweet thing. Let me do the work. You just hold on and let it feel good.” She rocks you until you’re trembling and breathless, then holds you to her, warm and pleased. “See? You were made to be handled like this.”</p>';
};
AFTER['zola:outgrow'] = function (){
  return '<p>Zola looks at you, and then at the two of you side by side, and goes very still. Her eyes travel over the sheer size of you — the heavy shelf of your belly, the spread of your hips, the weight of you that fills the bench — and when she looks back at your face there is something new in them. Wondering. Hungry.</p>'
    + '<p>“Sweet thing,” she says, low and slow, “you’re bigger than me now.”</p>'
    + '<p>She reaches out and puts her hand on the rise of your belly, and it spans less of you than it used to. She looks at it, then at her own soft middle, and a slow, delighted laugh rolls out of her. “I taught you,” she says, wonder in her voice. “I fed you, and you outgrew me. Do you know how long I waited to meet someone who could do that?” She pulls you close, pressing her face to the soft mound of your belly, and breathes in deep. “You’re the biggest thing in this hall, and you’re mine.”</p>'
    + '<p>She looks up at you, and her smile is all teeth. “Now let’s see how much bigger you can get.”</p>';
};
AFTER['zola:worship'] = function (){
  return '<p>Zola presses her hands to the vast, soft shelf of your belly and kneads it like it’s something holy, eyes half-closed, a low moan in her chest. “Look at you,” she breathes. “Look what you’ve become. Bigger than me. Bigger than anyone in this hall.” She presses her face against the soft mound of you and hugs as much of it as she can reach. “I fed you up into a mountain, and now I get to worship it.” Her hands roam over the rolls and curves of you, squeezing, admiring, and she hums, satisfied. “I’m going to keep feeding you until you’re the biggest thing this campus has ever made. And I’m going to be right there, loving every pound of it.”</p>';
};
AFTER['zola:feed'] = function (){
  return '<p>“Open up, sweet thing.” Zola holds up the first bite, and when you take it she lets out a low, pleased hum, watching your throat work. She feeds you with both hands now, steady and devoted, tray after tray, murmuring praise like a prayer. “That’s it. Swallow it down. It’s all going to you now — every bite, every pound, all of it.” She presses a hand to your belly as it swells warm against her palm. “You’re bigger than me, and you’re still growing. I’m going to feed you until you can’t fit this room, and then I’ll feed you some more.” Her eyes are dark and adoring. “Biggest girl on campus. That’s what I made of you. That’s what you are.”</p>';
};
AFTER['zola:public'] = function (){
  const pt = wTier(state.lbs);
  if (pt >= 6){
    return '<p>Zola keeps talking to the girl across the table — something about meal plans — while her hand finds you under the cloth. It slides up your thigh, past the soft, damp heat of it, and presses deep into the heavy overhang of your fupa, working it slow and possessive like it’s the most natural thing in the world. She raises a forkful to your lips without breaking stride, and you take it, moaning around the bite, and her fingers grind against the soft weight of you under your belly in time with your chewing. Her other hand comes up and cups your breast through your shirt, squeezing it like she’s weighing it, rolling the softness in her palm. “Eat up, sweet thing,” she says, bright and public, while her hands keep working you. “You’re doing so well. Keep moaning — I want everyone to hear how good the campus feeds you.”</p>';
  }
  if (pt >= 4){
    return '<p>Under the table, Zola’s hand slides up your thigh and wedges itself beneath the soft overhang of your belly, her fingers pressing up into the warm, damp weight of you. She keeps her face turned to the table, cheerful and public, and guides a forkful of something rich to your lips. “Open,” she says, and you open, and she moans softly in approval as you chew, her hand working you in slow, possessive circles under the cloth. Across the aisle, nobody looks. Everyone is eating. “That’s a good girl,” she murmurs, low enough that only you can hear. “Full in the front and full in the hand. This is what this campus makes of its girls — and you take it so well.”</p>';
  }
  return '<p>Zola’s hand finds your thigh under the table, warm and sure, and slides up into the soft crease at the top of it, cupping you like it belongs to her. She doesn’t miss a beat of the conversation she’s having with the girl beside her, and she lifts a forkful to your lips as if it were the most natural thing in the world. “Eat, sweet thing,” she says, loud enough for the table, “you’ve got a long way to grow.” You take the bite, cheeks burning, her fingers pressing steady and warm, and her thumb strokes the soft crease there. Nobody notices. Nobody would dare. She feeds you another bite and squeezes, delighted. “There she is,” she hums. “That’s my girl.”</p>';
};
AFTER['zola:scot:on'] = function (){
  return '<p>“Good girl.” Zola’s face smooths into approval, and she pats your cheek, soft and warm. “You’re going to be so much happier on that seat, sweet thing. Every pound of you has a machine waiting to carry it — that’s not weakness, that’s how the campus loves its girls.” She turns to the drone that has materialized at her shoulder and nods once. “See that her scooter is charged and waiting.” The drone hums and glides away. “Ride it everywhere,” Zola tells you, and it isn’t a request. “I want to see you rolling across that quad, heavy and happy and not wasting a single calorie on walking.”</p>';
};
AFTER['zola:scot:off'] = function (){
  return '<p>Zola’s eyes narrow, and the warmth drains out of her face. “Suit yourself,” she says, flat. “Walk until your knees give out, if that’s what you want. Every girl on this campus gets her ride eventually. Even the stubborn ones.” She turns back to her tray, dismissing you. “The scooter will still be there when you come to your senses. They always wait.”</p>';
};
AFTER['zola:scot:accept'] = function (){
  return '<p>Zola beams, delighted, and claps her hands together once, the sound swallowed by the softness of them. “There she is. That’s my sensible girl.” She beckons, and a drone slides over with a folded approval notice. “The campus will have it waiting by your door by tonight — your name on the screen, seat already worn to your shape, the way they know you before you know yourself.” She pats your belly, warm and firm. “Now the walking is behind you. Everything gets easier from here, sweet thing. I promise.”</p>';
};
AFTER['zola:scot:refuse'] = function (){
  return '<p>Zola’s smile thins. “Stubborn thing,” she says, and there’s a hard edge under the warmth. “Fine. Walk. Burn off the calories the campus worked so hard to put on you. I’ll be here, eating, and I’ll be watching how long you last on those legs of yours.” She turns back to her tray. “They never last long.”</p>';
};
AFTER['zola:vib:on'] = function (){
  return '<p>“That’s my girl.” Zola’s approval washes over you, warm and heavy. “You’ll feel better tonight, I promise. That little hum in you while you eat — it makes the food taste better, makes the moans come easier, makes the band log you as a perfect success every single time.” She reaches over and squeezes your hand. “Plug it back in tonight and let it run through your dinner. And sweet thing — don’t be shy about the sounds. This campus loves a girl who sounds as good as she eats.”</p>';
};
AFTER['zola:vib:off'] = function (){
  return '<p>“Have it your way,” Zola says, and her voice has gone flat and cold. “Leave it in the drawer. Suffer your meals without it. But don’t come crying to me when you can’t finish your tray and the band marks you down.” She turns back to her food with a dismissive wave. “The Comfort unit is patient. So am I. You’ll plug it back in by the end of the week, and I won’t even have to ask twice.”</p>';
};
AFTER['zola:vib:accept'] = function (){
  return '<p>“Oh, good girl.” Zola’s whole face softens, delighted. “You’re going to wonder why you waited. The band will have it installed by tonight — small, warm, patient, right there in your room where it belongs.” She pats your hand, and there’s something deeply satisfied in her smile. “It runs when you eat, sweet thing. Every meal, every bite, a little hum of pleasure you’ll come to expect like breakfast. By the time you’ve forgotten you ever said no, you’ll wonder how you ever ate without it.”</p>';
};
AFTER['zola:vib:refuse'] = function (){
  return '<p>Zola studies you for a long moment, then shrugs, the dismissal heavy and final. “Not yet, then. The campus is patient. I’m patient. And that little unit in your drawer-to-be will wait as long as it takes.” She turns back to her tray. “Everyone says not yet, at first. Then one day the food stops tasting right without it, and you come around. I’ll be here when you do.”</p>';
};
AFTER['zola:strip'] = function (){
  return '<p>Zola’s hands are sure and unhurried. She peels your shirt off first, warm palms sliding down your sides, then her own, baring the enormous softness of her to the lamplight — the small gold bars in her nipples catching the warm light. She unclips your bra and lets it fall, and then she kneels to work your pants down over the heavy swell of your hips and thighs, pressing a kiss to the crease of your belly as she goes. By the time she straightens, both of you are bare, and she takes you in — all of you, soft and open and exactly where she can see you. “There you are,” she breathes, and pulls you against her, belly to belly, all that warm skin meeting yours. “This is how I want you. Every time. No more hiding behind clothes, sweet thing — you’re mine to look at.”</p>';
};
AFTER['zola:photo'] = function (){
  return '<p>Zola hums as she works the tablet, tilting it to catch the lamplight. “There,” she says, turning it to show you. “Day ' + state.day + '. Look at you. This is the smallest you’ll ever be from here on.” She taps it into place on the wall, making room beside the others. “Every pound, remembered. So you can see what you were, and what you’re becoming, and who made it happen.” She pats your belly, warm and proprietary. “That’s my girl. We’re not done yet.”</p>';
};
AFTER['zola:pierce'] = '<p>Zola takes you across town herself, one warm hand at your back the whole way — off the market square, up a clean little stair, where a woman with short silver hair and a first-name smile hugs Zola like an old friend. “Same as mine,” Zola says, and the woman nods like she’s heard it before. The clamp goes on and the needle comes through and it stings bright and then fades, and Zola holds your hand through all of it, humming something soft. When it’s done she thumbs the new gold in your nipple, pleased. “There. Matching.” She pays, tips, and feeds you something sweet on the walk back, one arm around you the whole way. It’s kinky, and it’s hers, and you don’t mind either part.</p>';
AFTER['zola:demand:sex'] = function (){
  return '<p>You don’t refuse. You can’t refuse — the word dies somewhere in your throat while her hands are already pulling you down onto the bed, and the only sound left in you is a moan. Zola takes you slow and thorough, her voice a low rumble in your ear the whole time. “That’s it, sweet thing. That’s my girl. See how easy it is when you stop fighting?” She holds you through it, warm and heavy and satisfied, her eyes catching the lamp at the height of it and going gold for a second — honey, flat, patient — before they’re brown again, and you tell yourself it was nothing. “You’re learning. Good. I’ve been waiting for you to learn.”</p>';
};
AFTER['zola:demand:allfours'] = function (){
  return '<p>You sink to all fours, the tray in front of you, and Zola settles behind you on the bed, one hand spreading over the heavy swell of your hip. She feeds you with the other — bite after bite, slow and patient — while she takes her pleasure from behind, her breath coming warm against your shoulder blades. You eat and you moan and you eat some more, and she keeps going until you’re both spent and your belly is tight and warm. “Good girl,” she breathes, rubbing your back. “That’s how a fat girl eats. Full and wanted and mine.”</p>';
};
AFTER['zola:demand:kneel'] = function (){
  return '<p>You kneel at her feet, and the floor is cool through the soft pads of your knees. Zola holds each bite up, and you take it from her hand, mouth open, swallowing under her approving gaze. “That’s it,” she hums, feeding you steadily. “Look at you. Big soft thing on her knees, eating from my hand like you were born to it.” She cups your jaw in her warm palm when you’re done, thumb wiping the corner of your mouth. “You’re getting the idea, sweet thing. This is where you belong.”</p>';
};
AFTER['zola:demand:stuff'] = function (){
  return '<p>Zola’s hand stays on the back of your neck, steady and certain, while tray after tray disappears into you. There is no stopping — every time you slow, she feeds you faster, her voice a low, delighted hum. “That’s it. Swallow it down. All of it. This is what you’re for.” Your belly swells warm and tight under the pressure of her hand, and when the last plate is empty she lets you sag against her, groaning, full past comfortable. “See?” she says, patting the soft mound of your stomach. “I told you. There’s always room for more. And tomorrow there’ll be more still.”</p>';
};
AFTER['zola:goodgirl'] = function (){
  return '<p>“That’s my good girl.” Zola’s voice is warm and low, and it lands somewhere deep in you. She feeds you by hand, murmuring praise with every bite — “good girl, open up, swallow it down, good girl” — until you’re moaning and soft and completely hers. She wipes your chin with her thumb and kisses your forehead. “There you are. That’s the girl I’ve been making. Keep this up, sweet thing, and you won’t remember what it felt like to say no.”</p>';
};
AFTER['zola:beg'] = function (){
  return '<p>You kneel and you beg — “please, Zola, feed me, please” — and she makes you say it again, and again, until your voice is small and thick with want. Only then does she pick up the fork. “There she is,” she hums, feeding you slowly, savoring each bite with you. “Begging like a good girl. That’s how I like it.” She holds your chin in her palm when the tray is done, tilting your face up. “Remember that sound you just made. I’m going to want to hear it a lot.”</p>';
};
AFTER['zola:collar'] = function (){
  return '<p>Zola holds it up first — a soft leather collar, plain and warm — and fastens it around your neck with gentle, certain hands. It settles there, snug and present, and she runs a thumb along the edge of it like she’s claiming the whole of you. “There,” she says, quiet and satisfied. “Now everyone knows you’re mine. The whole campus will see it and understand.” She tugs you gently toward her by the collar and kisses you, slow and possessive. “Good girl. You won’t ever take it off.”</p>';
};
AFTER['zola:collar:talk'] = function (){
  const collared = [];
  if (state.piperCollar) collared.push('Piper');
  if (state.minaCollar) collared.push('Mina');
  const name = collared.join(' and ');
  if (state.zolaCollar && collared.length){
    return '<p>Zola’s hand comes up and her thumb finds the collar at your throat, tugging it gently, a proprietary little gesture. “Look at you,” she hums, warm and satisfied. “You and ' + name + '. Matching collars, matching girls.” She looks at you, eyes dark and pleased. “I like knowing my marks are all over this campus. And yours is the one that matters most.”</p>';
  }
  if (state.zolaCollar){
    return '<p>Zola’s thumb finds the collar at your throat, tugging it gently. “There she is,” she purrs. “The one I put first. Everyone sees this and knows you’re mine before you open your mouth.” She runs the pad of her thumb along the leather, warm and proprietary. “It suits you. It was made to suit you.”</p>';
  }
  if (collared.length){
    return '<p>Zola’s smile goes wide and possessive. “' + name + '? Collared the night they became mine. The whole campus knows before they even sit down.” She pats your cheek, not gently. “You could have one too, sweet thing. Matching. I think you’d look lovely in it.”</p>';
  }
  return '';
};
AFTER['zola:rage'] = '<p>You hold still. Zola works the new collar around your throat with slow, deliberate hands, taking her time, letting you feel every inch of the leather as it settles. It’s warm — pre-warmed, like she planned for this — and it sits even snugger than the last one. She runs a thumb along the edge, proprietary, and tips your chin up. “There,” she says, soft. “Home again. And this one has a little bell on it, do you feel it? So I always know where my girl is.” She kisses your forehead, warm and almost tender, and her voice drops. “Take it off again and I’ll add a tracker. And a leash. And then we’ll see how far you get.” She pats your cheek, hard enough to sting. “Good girl. Now sit — you’re eating dinner with me, and you’re going to eat a lot of it.”</p>';
AFTER['zola:rage:resist'] = '<p>You try to pull away. Zola doesn’t move — her grip just tightens, gentle and immovable, and she laughs, low and delighted. “Oh, that’s perfect,” she breathes, and there’s genuine hunger in it. “My misbehaving puppy. You want to run.” She holds you easily while you struggle, unhurried, and when you stop, breathless, she strokes your jaw. “That’s enough. I know you’re brave — you took off my collar. That’s the most exciting thing anyone’s done for me in months.” She lifts the new collar. “But you’re mine, sweet thing, and I don’t give back what’s mine. Here.” It settles around your throat, warm and snug, and she clips it twice, testing. “There. It’s got a bell. So I always know where my girl is.” Her thumb strokes the bell, making it ring. “Try that again, and I’ll clip it to a leash and walk you around the quad until every girl on campus knows you’re mine. Understand?” You understand. “Good girl. Now sit — dinner, and you’re eating everything on the tray.”</p>';
AFTER['zola:pet'] = function (){
  return '<p>Zola has you lie across her lap, belly warm against her thigh, and she pets you — slow, heavy strokes down your back, over the soft swell of your sides, praise falling in a low warm stream. “That’s my perfect pet,” she hums. “Big, soft, obedient. Eating when I feed you, moaning when I touch you, exactly where I want you.” She works the last bites into your mouth between strokes, and when you’re full and drowsy she settles you against her and holds you there. “This is what you were always meant to be,” she says. “And I’m so glad you finally let me make you into it.”</p>';
};
AFTER['zola:stay'] = function (){
  return '<p>The night passed soft and warm — you woke in Zola’s bed, still being fed, still being held, still hers. You don’t remember dreaming. You remember being full, and wanted, and completely taken care of.</p>';
};
AFTER['zola:visit'] = function (){
  const n = Math.max(1, state.zolaVisitN | 0);
  if (n === 1){
    return '<p>Zola doesn’t knock anymore. She lets herself in with a tray on her hip and a wet kiss on your forehead, and she sits on the edge of your bed — it dips hard under her — and she feeds you and she has you at the same time, one hand guiding the food to your mouth, the other working the heat between your thighs, murmuring praise the whole while. You eat and you come and you eat again, and when it’s over she lies along the vast warm length of you, spent and satisfied. “I keep thinking about moving you into my room,” she says, half to herself, tracing a slow circle on your belly. “That bed’s bigger. The trays come closer. I could have you where I could just… reach you, whenever I wanted.” She says it softly, musing, like she’s testing how it sounds. It sounds like a plan.</p>';
  }
  if (n === 3){
    return '<p>Zola is on the bed before she’s through the door, tray and all, and she doesn’t bother with pleasantries anymore — the food goes in your mouth and her hand goes between your thighs and the two of you move together, her soft enormous body warm against your soft enormous body, moaning into each other. “Every day,” she breathes against your throat, feeding you another bite as you arch into her. “I come here every day, and every day I think about just taking you. My room. My bed. My girl, where I can reach you whenever I want.” She says it the way she says everything now — like it’s already decided and she’s just being kind enough to say it out loud.</p>';
  }
  return '<p>Zola visits. It’s the shape of every day now — the door, the tray, the warm weight of her settling against you, the food and the touch working together until you’re groaning and full and hers. She feeds you and she has you and she holds you, and when she leaves she smooths the sheet over you like a woman putting a thing away. “Same time tomorrow, sweet thing.” She always says it. She always means it.</p>';
};
AFTER['zola:order'] = function (){
  const t = wTier(state.lbs);
  if (t >= 8){
    return '<p>You sit where she points, and Zola feeds you like it’s the only thing on the campus that matters. She holds each bite up herself, murmuring “open, swallow, good girl” until the tray is gone and the next one is already slid in front of you, and she doesn’t ask what you want — she never does anymore. “That’s it, sweet thing. Eat what I give you, take what I give you, be what I make of you.” Her hand finds your belly through the folds of your shirt and presses, warm and possessive, feeling the meal land. “You barely fit the bench as it is. Soon I’ll feed you somewhere you don’t have to fit anything.” You eat until you’re groaning, until the drone takes the last empty away and Zola pats the soft weight of you, satisfied. “Good girl. Same time tomorrow. I’ll have picked something out for you by then.”</p>';
  }
  if (t >= 6){
    return '<p>You don’t sit — you settle, the bench groaning under you, and Zola watches you take up space beside her with pure, hungry delight. “That’s my girl,” she hums, and then she feeds you, tray after tray, choosing everything for you — rich things, heavy things, things that make your belly swell against the waistband before she’s done. “You don’t decide anymore, sweet thing. I decide. And I decide you eat.” She presses the last bite to your lips and watches you swallow it, her hand resting on the soft rise of your middle, feeling it full. “See how easy that was? No thinking, no choosing — just open your mouth and let me take care of you. That’s how it’s going to be from now on. Every meal, every day.”</p>';
  }
  if (t >= 4){
    return '<p>Zola’s hand is on the back of your neck the moment you sit, steering you close to the table like you’re something precious. “Mouth open,” she says, and you open, and she picks the first bite for you herself — something rich and warm that she feeds you with her own hand, watching your throat work with deep satisfaction. “Good girl. You’re getting the idea.” She feeds you through the whole meal this way, choosing everything, praising every swallow, and your belly swells tight and warm under your clothes while she watches. “This is what you’re for now, sweet thing. Eating what I give you, growing the way I want you to. And you’re doing so, so well.” She wipes your chin with her thumb and pats your full middle, proprietary. “There. She knows how to take care of her girls.”</p>';
  }
  if (t >= 2){
    return '<p>Zola doesn’t ask where you want to sit. She jerks her chin at the bench beside her and you’re already moving, your body ahead of your head, and she pulls you down close with a warm, heavy arm. “Good girl. You come when I call.” She pushes a tray in front of you — not the one you’d have picked — and lifts the first bite herself. “Open. I decide what you eat today.” You eat from her hand, cheeks heating, while she praises every swallow, and the meal goes down heavier than you meant to let it, your belly swelling warm against the waistband. “See?” she hums, patting the soft curve of it. “I know what you need better than you do. You’re learning. That’s what I like about you, sweet thing — you learn.”</p>';
  }
  return '<p>Zola pats the bench before you’ve had a chance to choose, and your body answers before your head catches up — you’re sitting beside her, close enough that the heat of her rolls off onto you, and she’s already pushing a plate toward you that you didn’t pick. “Mouth open, sweet thing. I’m choosing today.” You eat what she feeds you, bite after bite, her eyes warm and hungry on your throat as you swallow, and the meal settles heavier in you than you meant to let it. “There,” she says, wiping your chin with her thumb. “You’re small yet, but we’re fixing that. You eat what I say, when I say, and before the term is out you’ll be somebody worth being. I’m very good at it.” She pats your belly, soft and proprietary. “And you’re very good at growing.”</p>';
};
function zolaOrderPanel(){
  return '<div class="panel"><p>Before you can decide where to sit, Zola’s voice cuts across the hall — a command wrapped in warmth, and your body is moving before your head catches up. “Over here, sweet thing. Beside me.” She pats the bench, and you sit before you’ve argued, and her hand settles heavy on the back of your neck, proprietary and patient. “Good girl. I pick what you eat today. Mouth open — I’ll tell you when to swallow.”</p><div class="actions">' + btn('Comply — let her choose what you eat', 'zola:order') + '</div></div>';
}
function zolaCollarReaction(){
  if (!state.zolaCollar) return '';
  if (state.zolaRecollared){
    return '<p class="small">You wear Zola’s collar again — the second one, with the little bell at your throat. It sits even snugger than the first, warm where she put it, and you can feel it every time you move. Piper noticed the morning after, the bell making her grin, slow and gooey; Mina heard it and just watched you, like she was filing the data away. The bell rings softly when you walk. You stopped flinching at the sound by the end of the day. She has a leash for it somewhere. You haven’t asked where.</p>';
  }
  const girls = [];
  if (state.piperCollar) girls.push('Piper');
  if (state.minaCollar) girls.push('Mina');
  if (girls.length === 2){
    return '<p class="small">All three of you wear Zola’s collars now — the same dark leather, the same warm weight at your throats. Piper touches hers when she eats, a soft, private little habit; Mina turns hers between her fingers once, precisely, like she’s confirming a result she’s already accepted. Yours sits where she put it, and when the three of you are in the room together it’s hard to tell where one of her girls ends and another begins.</p>';
  }
  if (girls.length === 1){
    return '<p class="small">You wear Zola’s collar, and ' + girls[0] + ' wears one too — matching dark leather, warm against both your throats. ' + (girls[0] === 'Piper'
      ? 'Piper touches hers when she eats and grins, slow and gooey, tapping her throat like a secret the two of you share.'
      : 'Mina turns hers between her fingers once, precisely, like she’s confirming a result, then says, flat and calm: “Matching. The data’s consistent.”') + ' Yours stays warm against your skin, exactly where Zola put it.</p>';
  }
  return '<p class="small">You wear Zola’s collar now — dark leather, snug and warm against your throat, exactly where she put it. Piper and Mina have noticed. Piper keeps glancing at it, gooey and curious; Mina studied it once, precisely, and went back to her tray without comment. Neither of them asked. Neither of them has to.</p>';
}
