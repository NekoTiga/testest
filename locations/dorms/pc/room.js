'use strict';

function piperHome(){
  return schedAtHome('piper');
}
function minaHome(){
  return schedAtHome('mina');
}
function rmWord(tier){
  return ['lean', 'a little soft', 'soft', 'heavier', 'heavy', 'very heavy', 'huge', 'enormous', 'bed-bound'][tier];
}
function roomSharedGain(w, sc){
  let g = 0.5 + 0.25 * rTier(w);
  if (sc < 50) g += 0.5;
  if (rTier(w) >= 4) g += 0.5;
  return g;
}

function roomVibMates(){
  let out = '';
  if (piperUsesVib()) out += '<p>A low, steady hum carries from Piper’s side of the room, constant under the chewing. She doesn’t hide it — her eyes drift half-closed with each mouthful, one hand pressed to her belly, the band on her wrist humming the same low note of approval. It runs during every meal now. She’s stopped pretending it isn’t there.</p>';
  if (minaUsesVib()) out += '<p>Mina’s jaw slows to the rhythm of a small, private hum beneath her sheet, and she doesn’t stop it when you look. She eats through it with the same exactness she used to bring to her lab notes, eyes half-lidded, her breath catching at the end of each tray. The band on her wrist logs it all as a success.</p>';
  return out;
}

function roomVibAd(){
  if (!bandWorn()) return '';
  if (!state.vibAd && state.lbs >= 300 && state.selfcontrol < 50){
    return `
      <div class="panel">
        <p>Your wristband chimes, and a notification slides up the band’s screen: <em>“Wellness+ knows stress can build up. Introducing <b>Comfort</b> — a discreet personal vibrator, for safe and healthy relief. It activates automatically during your meals, in the privacy of your room, and logs your relief as a wellness success. Would you like to accept it?”</em></p>
        <div class="actions">
          ${btn('Accept — let it install', 'vib:accept')}
          ${btn('Decline', 'vib:decline')}
        </div>
      </div>`;
  }
  if (vibActive() && !state.vibAdPortable && state.lbs >= 450 && state.selfcontrol < 10){
    return `
      <div class="panel">
        <p>Your wristband chimes again, a brighter tone: <em>“Wellness+ now offers <b>Comfort Portable</b> — discreet, wireless, with you everywhere. The same automatic relief, anywhere on campus, even in the commons. Perfect for students who want relief on the go. Would you like to accept it?”</em></p>
        <div class="actions">
          ${btn('Accept — the portable version', 'vib:portable:accept')}
          ${btn('Decline', 'vib:portable:decline')}
        </div>
      </div>`;
  }
  return '';
}

addAction('vib:accept', function (){
  apply({ vibRoom: true, vibAd: true, selfestem: state.selfestem + 2, lastScene: 'vib:accept', notice: 'The band installs it without another word. +2 self-esteem · the band logs another success', screen: 'room' });
});
addAction('vib:decline', function (){
  apply({ vibAd: true, lastScene: 'vib:decline', notice: 'You decline. The band hums, patient, and does not ask again.', screen: 'room' });
});
addAction('vib:portable:accept', function (){
  apply({ vibPortable: true, vibAdPortable: true, selfestem: state.selfestem + 2, lastScene: 'vib:portable:accept', notice: 'The portable version is yours now. Relief everywhere, even the commons. +2 self-esteem · the band logs another success', screen: 'room' });
});
addAction('vib:portable:decline', function (){
  apply({ vibAdPortable: true, lastScene: 'vib:portable:decline', notice: 'You decline. The band hums, patient, and does not ask again.', screen: 'room' });
});

function roomScooterAd(){
  if (!bandWorn()) return '';
  if (state.lbs < 400 || state.scooterAcc) return '';
  return `
    <div class="panel">
      <p>Your wristband chimes, a low, formal note, and a notification slides up the band’s screen: <em>“Wellness+ has updated your mobility assessment. At your current weight, walking is no longer your primary transport. Campus has assigned you a <b>personal scooter</b> — smooth, low-impact, always charged, waiting by your door. Your access to student services and meal delivery requires you to accept. Thank you for your cooperation.”</em></p>
      <div class="actions">
        ${btn('Accept the scooter', 'scooter:accept')}
      </div>
    </div>`;
}

addAction('scooter:accept', function (){
  apply({ scooterAcc: true, selfestem: state.selfestem - 2, lastScene: 'scooter:accept', notice: 'The scooter is yours now. −2 self-esteem · the band logs the assignment', screen: 'room' });
});
AFTER['scooter:accept'] = function (){
  return '<p>You tap accept, and the band confirms with a low, final pulse. By evening, a scooter is parked by the door of Room 217, plugged into the wall, its seat worn smooth and low — not rented, not shared. Assigned. Your name is on the tiny screen at the handlebars, and the word <em>COOPERATION</em> sits beneath it in small caps. You walk past it a few times before you touch it. The seat holds the impression of your palm when you press down.</p>';
};

function roomScooterLine(){
  const parts = [];
  if (scooterOwned()) parts.push('yours');
  if (piperHasScooter()) parts.push('Piper’s');
  if (minaHasScooter()) parts.push('Mina’s');
  if (!parts.length) return '';
  const subject = parts.length === 1
    ? parts[0] + ' scooter is'
    : parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1] + ' scooters are';
  return '<p class="small">By the door, ' + subject + ' parked against the wall, charging, seats worn to the shape of their riders.</p>';
}
AFTER['vib:accept'] = function (){
  return '<p>You tap accept, and the band confirms with a soft pulse. Within the hour, something small and warm is installed in your room — fitted, silent, charging in the drawer of your nightstand. The band’s notification reads: “Comfort activated. It will run during your meals, automatically.” You don’t think about it again until the first tray arrives.</p>';
};
AFTER['vib:decline'] = '<p>The notification folds itself away, and the band hums its steady, patient note, as if filing the decision for later. It does not ask again. The room is quiet, and the tray is already on its way.</p>';
AFTER['vib:portable:accept'] = function (){
  return '<p>You tap accept, and the band confirms with a brighter pulse. A small, slim unit arrives by drone the same afternoon — lighter than the room version, meant for pockets and waistbands. The notification reads: “Comfort Portable active. Continuous relief, wherever you are.” You tuck it into the drawer with the first one, and the band logs the whole thing as a success.</p>';
};
AFTER['vib:portable:decline'] = '<p>The notification folds itself away, and the band hums its steady, patient note. It does not ask again. The room version stays where it is, silent and charging in the drawer, and the tray is already on its way.</p>';

function vibEatPatch(){
  if (!vibActive()) return null;
  return { selfestem: state.selfestem + 1 };
}
function vibEatNote(){
  if (!vibActive()) return '';
  return state.vibPortable ? ' · the portable vibrator hums between your thighs' : ' · the vibrator hums beneath you';
}
const ROOM_EAT_SCENES = ['room:snack:small','room:snack:heavy','room:snack:auto','room:snack:block','room:order','room:tv','room:cake:ask','room:cake:raid','room:snackbox'];
ROOM_EAT_SCENES.push('room:rock', 'room:release');
function vibEatFlavor(){
  if (!vibActive() || ROOM_EAT_SCENES.indexOf(state.lastScene) < 0) return '';
  return '<p>Between bites, the vibrator hums against you, a low, insistent pulse the band runs in the background of the meal. Your hips shift against it without quite deciding to, and a sound escapes you, half-moan, and you keep eating through it, your belly swelling warm against the waistband, the band logging every bite as a success.</p>';
}
function roomHubMess(){
  const t = wTier(state.lbs);
  const roomTxt = [
    '<p>The room is a corner suite — three beds, a shared bath, a window over the quad. Piper’s side is tidy: trainers by the bed, a race bib pinned to the corkboard. Mina’s desk is a tower of textbooks and a laptop that never quite sleeps. Your side is still half boxes, the sheets hospital-crisp. You sit on the edge of your bed and the mattress holds you firm, your weight settling in one spot. The late-summer light comes through the window, flat and grey.</p>',
    '<p>The room is the same corner suite, but it’s starting to settle. Piper’s trainers have gathered dust; her side has picked up a bag of snacks and a second pair of soft shorts. Your own side has stopped being “half unpacked” and started being “lived in.” The mattress keeps a faint hollow where you lie, and when you sit down your belly folds soft over the waistband of your shorts.</p>',
    '<p>The room smells like takeout and bodies now. Your bed has started holding your shape — the mattress creases around your hips, the sheet warm where your weight settles. Piper’s side is a nest of wrappers and soft clothes; Mina’s desk is clear of everything except a tray and a closed laptop. The window is the same, but the drone that circles the roofline has started noticing you.</p>',
    '<p>The room has reshaped itself around the three of you. The chairs groan when you sit, creaking under the spread of your hips; the beds have new mattresses, “an investment in comfort.” Your side is where you eat now, the tray within reach, your belly pressed soft against the table edge. Piper and Mina’s sides have their own trays. The window is closed more than it’s open.</p>',
    '<p>Your corner of the room is a wide, soft sprawl of pillows and trays. The bed bows under your weight, the middle dipping, your hips spilling over the mattress edge when you shift. The walk to the door is a small project, your thighs pressing together and the weight settling a beat behind each step. Piper’s side has gone quiet and soft; Mina’s is a nest of trays and blankets. The drone patrols the roofline, watchful, full.</p>',
    '<p>The room is close and full of breathing. You move between bed and tray and back, and the distance shrinks every week — the bed takes your whole weight when you sink into it, your breasts settling wide against your belly, your stomach folding into itself in a deep crease. The drone outside hovers low at the glass, watching.</p>',
    '<p>You barely leave the room. The tray arrives on time, every time, and the bed is the center of everything — your body takes up most of it, your belly resting heavy on your thighs when you sit, your ass spreading wide enough to overflow the mattress on either side. The window shows the quad you used to cross; you don’t watch it anymore.</p>',
    '<p>The room has been refitted for you — wider bed, trays on both sides, the platform rolled in. You are arranged, and you stay arranged: hips spilling over the mattress, belly rising and falling slow over your lap, the weight of your chest heavy on your ribs when you lie back. The drones come and go with the gentle efficiency of staff. The window is mostly for the drones now.</p>',
    '<p>The room is close and dim, full of the smell of your own body. The bed is a wide pit sunk under your weight — hips overflowing its edges, belly a heavy mound rising and settling with each breath, breasts resting soft on top of it. The tray is always within reach. The window shows the campus outside, and you don’t move toward it.</p>'
  ][t];
  let bandLine = '';
  if (bandWorn()) bandLine = '<p class="small">Your wristband hums its low success note, counting you as one of the campus’s.</p>';
  else if (state.bandHandout) bandLine = '<p class="small">Your wrist is bare. A drone circles the roofline, patient, checking.</p>';
  return roomTxt + bandLine + roomRMTxt();
}

function roomRMTxt(){
  const p = [
    'Piper’s side is still neat — trainers by the bed, a race bib pinned to the corkboard, the honey-cake foil folded small and tucked away. She is lean, her hips narrow, her belly flat and taut when she leans over her bed.',
    'Piper’s side has a bag of snacks on the desk now, and a second pair of soft shorts over the chair. The trainers are still out, but they’ve gathered dust. She sprawls on her bed with a soft paunch of belly showing under the hem of her top.',
    'Piper’s bed is stacked with trays and wrappers, the sheets rumpled in a nest. The honey-cake foil is gone. She keeps a show running on her laptop, on loop, her belly a soft roll resting over the waistband of her shorts.',
    'Piper’s bed is bowed to her now, and there’s a box of something at the foot of it that nobody’s moved. She lies against the pillows, her belly rising in a soft mound, her breasts resting heavy on top of it. The trainers have made it to the closet — under a pile of soft clothes, where nobody has to look at them.',
    'Piper’s side of the room is wide with blankets and trays. A fresh tray waits on the nightstand. She sits propped against the headboard, her hips wide across the mattress, her belly resting heavy in her lap. The trainers are under a pile of laundry somewhere.',
    'Piper’s side is a wide, reinforced spread — the bed creaks and groans under her weight when she shifts, and the tray table is a permanent fixture at her elbow. Her belly sits in her lap in heavy folds, her thighs spread soft across the mattress. The scooter waits by the bed, charged and patient. The show still loops.',
    'Piper is enormous, and her side of the room has reshaped itself around her — the bed widened, the tray table within reach, the show still looping. She fills the whole mattress, her belly a great heavy mound, her arms thick, her breasts pooling at her sides when she lies back.',
    'Piper’s side of the room is wide and soft. The bed is a reinforced platform that holds her weight without a groan, the tray table is never empty, and the scooter has been pushed against the wall, unplugged, no longer needed. She lies spread across the mattress, her belly a huge pale mound, her thighs thick and pressed flat, her breasts heavy on her ribs. The drones know the way.',
    'Piper’s side is a warm, full sprawl built around a bed. She lies in it naked and enormous, her body spread wide across the sheets — belly a huge soft mountain, breasts pooled flat on either side, hips spilling past the mattress edges. She does not look up when you enter; her whole weight is planted in the mattress, and turning her head would be work — so she just keeps eating, one hand in the tray and one hand between her thighs, a low shameless moan rolling out of her with every swallow. The tray table is stacked. The drones hover at the door, patient, waiting for the empty. Piper reaches for a pastry, moans around it, burps, and goes back to the show.'
  ][piperTier(state.piperLbs)];
  const m = [
    'Mina’s desk is orderly: a bio textbook, a protein shake, a highlighter. A small notebook sits closed beside the laptop — you don’t ask what’s in it. Mina herself is slim and exact, her hips narrow, her belly taut under her clothes.',
    'Mina’s desk has a second protein shake now, and a pastry she hasn’t touched. The notebook is open, half-filled with dates and times. She sits straight-backed on her bed, her belly just beginning to push soft against the waistband of her shorts.',
    'Mina’s desk is clear of everything except a tray and the closed laptop. The protein shakes are gone; a box of pastries sits where they were. She’s propped against her pillows, a soft roll of belly spilling over the top of her shorts.',
    'Mina’s bed is where she works now, propped on pillows, a tray within reach. Her belly is a soft round weight on her lap, her breasts heavy under her loose shirt. The notebook is closed for good. The pastries are gone.',
    'Mina is vast, her belly a heavy mound that slopes from her ribs down into her lap, her thighs thick and pressed together, and her side of the room is a wide, soft arrangement of pillows and trays.',
    'Mina’s side is warm and cluttered now — the desk pushed against the wall, the notebook buried under a stack of trays, a scooter waiting by the bed, charged and patient. She fills the bed on her side, hips spilling over the edge, belly rising and falling slow with each breath.',
    'Mina is enormous, and her side of the room has reshaped itself around her — the bed widened, the tray table within reach, the scooter at the foot of the bed, still charged. She lies sprawled under the sheet, a great soft mountain of belly, her breasts heavy against her sides.',
    'Mina’s side of the room is wide and soft. The bed is a reinforced platform that holds her weight without a groan, the tray table is never empty, and the scooter has been pushed against the wall, unplugged, no longer needed. She lies with her belly piled high in front of her, her arms thick, her face round, her eyes small in the softness of her cheeks. The drones know the way.',
    'Mina’s side is a warm, full sprawl built around a bed. She lies in it naked and enormous, her body spread wide across the sheets — belly a huge soft mound rising and falling, breasts pooled at her sides, hips overflowing the mattress. She does not look up when you enter; her weight is sunk deep into the platform, and lifting her head would take breath she keeps for eating — so she just keeps eating, one hand in the tray and one hand between her thighs, cataloguing between moans: “efficient, good, more.” The tray table is stacked. The drones hover at the door, patient, waiting for the empty. Mina reaches for a pastry, moans around it, burps, and goes back to the show.'
  ][minaTier(state.minaLbs)];
  let out = '<p>' + p + ' ' + m + '</p>';
  if (state.piperZola) out += '<p>Piper isn’t just heavy now — she’s Zola’s. A second phone charges on her nightstand, Zola saved under “Mama,” and her side of the room carries a scent of glaze and warm syrup and Zola’s perfume that never quite fades. She talks in her sleep now, moaning, and the word that comes out of her is always the same.</p>';
  if (state.minaZola) out += '<p>Mina isn’t just heavy now — she’s Zola’s. The notebook is gone from her desk, replaced by a stack of trays and a card in Mina’s precise handwriting: “Efficiency is a closed loop.” She sleeps murmuring numbers, cataloguing, and the name at the end of every count is Zola’s.</p>';
  if (state.piperCollar || state.piperZola) out += '<p>A collar rests snug against Piper’s throat — Zola’s mark, dark leather, and she touches it the way she touches her tray: like it belongs.</p>';
  if (state.minaCollar || state.minaZola) out += '<p>A collar rests snug against Mina’s throat — Zola’s mark, and she turns it between her fingers when she works, precise and patient, like she’s confirming a result she’s already accepted.</p>';
  if (state.zolaCollar) out += zolaCollarReaction();
  return out;
}

function roomComfortPanel(){
  if (!state.zolaCorruptDone || state.zolaComfortDone) return '';
  const name = state.zolaIntro === 'piper' ? 'Piper' : 'Mina';
  return '<div class="panel"><p>' + name + ' is crying. The collar is new on her throat, and she’s changed — she knows she’s changed, or half-knows, and the half that knows is crying, soft and wrecked, into her hands. The tray is within reach and she hasn’t touched it, and that’s how you know something is wrong. She looks up when you sit down, and the words come out small. “It was supposed to be fun.” You hold her. She holds you back, hard, like a drowning girl. “They made it feel good,” she whispers. “That’s the worst part. It felt so good, and I loved it, and I still —” She can’t finish. You rock her, and you tell her it’s okay, and the horrible thing is that it is — the campus has already made it okay — and she believes you, because she needs to, because the only other thing to believe is worse. She wipes her face, and her hand lands on the tray, and the sob and the first bite come out of the same mouth, and she moans around the food, and the crying stops, and that is how you comfort the newest victim: you give her permission to be happy, and the campus does the rest.</p><div class="actions">' + btn('Comfort her', 'room:comfort') + '</div></div>';
}

function roomStatus(){
  const you = 'You: ' + displayLbs() + ' lbs · ' + sc() + '/100 self-control';
  const pBand = state.bandHandout ? (piperWears() ? ' · band on' : ' · band off') : '';
  const mBand = state.bandHandout ? (minaWears() ? ' · band on' : ' · band off') : '';
  const pZ = state.piperZola ? ' · Zola’s' : '';
  const mZ = state.minaZola ? ' · Zola’s' : '';
  const p = 'Piper ' + (piperHome() ? 'is here' : 'is out' + (state.piper1 ? ' — ' + npcWhereName('piper') : '')) + ' — ' + rmWord(piperTier(state.piperLbs)) + ' · ' + Math.round(state.piperLbs) + ' lbs · ' + Math.round(state.piperSc) + '/100 self-control' + pBand + pZ;
  const m = 'Mina ' + (minaHome() ? 'is here' : 'is out — ' + npcWhereName('mina')) + ' — ' + rmWord(minaTier(state.minaLbs)) + ' · ' + Math.round(state.minaLbs) + ' lbs · ' + Math.round(state.minaSc) + '/100 self-control' + mBand + mZ;
  return '<p class="small">' + p + '. ' + m + '. ' + you + '.</p>';
}

addAction('room:comfort', function (){
  const name = state.zolaIntro === 'piper' ? 'Piper' : 'Mina';
  apply({ zolaComfortDone: true, selfestem: Math.min(100, state.selfestem + 2), selfcontrol: Math.max(0, state.selfcontrol - 1), submission: Math.min(100, state.submission + 1), lastScene: 'room:comfort', notice: 'You comfort her. +2 self-esteem · −1 self-control · +1 submission', screen: 'room' });
});
AFTER['room:comfort'] = function (){
  const name = state.zolaIntro === 'piper' ? 'Piper' : 'Mina';
  return '<p>You hold ' + name + ' until she falls asleep, the collar warm against her throat, her hand still curled around the tray. By morning she’ll be smiling. They always are. You lie there a while, your own band humming its low success note, and you don’t know whether the ache in your chest is grief or the last of something you used to have. Either way, the tray is already on the way. You reach for it without deciding to.</p>';
};

function roomBeat(){
  if (!state.piper1) return '<p>You still have boxes to unpack. The room smells like sunscreen and new plastic.</p>';
  if (wTier(state.lbs) >= 8 && !state.collapse800) return collapseScene();
  if (state.day >= 40 && !state.piperq) return piper7Scene();
  if (state.day >= 45 && !state.minaQ) return minaScene();
  if (piperTier(state.piperLbs) >= 8 && !state.piperPig) return piperPigScene();
  if (minaTier(state.minaLbs) >= 8 && !state.minaPig) return minaPigScene();
  if (piperStage() === 0 && !state.s0done) return cakeScene();
  if (piperStage() === 1 && !state.s1done) return joinScene();
  if (piperStage() === 3 && !state.s3done) return confrontScene();
  return '';
}

function activitiesMenu(){
  const t = wTier(state.lbs);
  const c = pcCorrupt();
  let snack;
  if (lazy()){
    snack = btn(c ? 'Snack — mouth already watering' : 'Snack — grab whatever’s out', 'room:snack:auto');
  } else {
    snack = btn(c ? 'Snack — can’t stop, don’t want to' : (state.selfcontrol < 40 ? 'Snack — something small (you can’t stop at one)' : 'Snack — something small'), 'room:snack:small', null, !c && state.selfcontrol < 40) +
            btn(c ? 'Snack — dig in and moan' : 'Snack — dig in properly', 'room:snack:heavy');
  }
  return '<h3>Activities</h3><div class="actions">' +
    snack +
    btn(c ? 'Order a tray — food’s all you can think about (40 cr)' : 'Order a tray to the room (40 cr)', 'room:order', null, !canAfford(40)) +
    (pcLockedRoom() ? btn(c ? 'Suggest a walk — you can’t remember why anymore' : 'Suggest a walk — the door doesn’t open for you anymore', 'room:walk', null, true) : lazy() ? btn(c ? 'Suggest a walk — you’re too comfortable to' : 'Suggest a walk — you’re too comfortable', 'room:walk', null, true) : pcTone() === 2 ? btn('Suggest a walk — you don’t quite mean it', 'room:walk') : btn('Suggest a walk', 'room:walk')) +
    (t >= 6 ? '' : btn('Stretch and do some bodyweight work', 'room:stretch')) +
    ((state.glut >= 3 || lazy()) ? btn(c ? 'Nap — sinking feels so good' : 'Nap', 'room:nap') : btn('Nap — you’re not tired enough', 'room:nap', null, true)) +
    btn(c ? 'Watch TV — the show makes sense, nothing else does' : 'Watch TV together', 'room:tv') +
    btn(c ? 'Journal — the words won’t come' : 'Write in your journal', 'room:journal') +
    '</div>' +
    roomIndulgeMenu();
}

function itemsMenu(){
  const t = wTier(state.lbs);
  const c = pcCorrupt();
  const s = [];
  if (piperStage() === 0 && state.s0done && !state.cakeGone){
    if (piperHome()) s.push(btn(c ? 'Ask Piper for cake — she’s too lost to notice' : 'Ask Piper for a slice of honey cake', 'room:cake:ask'));
    else s.push(btn(c ? 'Sneak the cake — it’s yours now' : 'Sneak a slice of honey cake', 'room:cake:raid'));
  }
  if (state.minaSc >= 70) s.push(btn('Grab one of Mina’s protein shakes', 'room:shake'));
  if (commonsPhase() >= 1) s.push(btn(c ? 'Snack box — just reach in' : 'Dig into the snack box', 'room:snackbox'));
  if (t < 6) s.push(btn('Use the dumbbells and foam roller', 'room:dumbbells'));
  s.push(btn(c ? 'Phone — can’t focus on anything' : (state.metRavi ? 'Open your laptop — review Ravi’s files' : 'Scroll your phone'), 'room:laptop'));
  s.push(btn(c ? 'Look out the window — it hurts a little to remember' : 'Look out the window', 'room:window'));
  return '<h3>Items</h3><div class="actions">' + s.join('') + '</div>';
}

function roommatesMenu(){
  const c = pcCorrupt();
  return '<h3>Roommates</h3><div class="actions">' +
    (piperHome() ? btn(c ? 'Talk to Piper — she moans, you moan, it works' : 'Talk to Piper', 'nav', 'piper') : btn('Talk to Piper — she’s out', 'nav', 'piper', true)) +
    (minaHome() ? btn(c ? 'Talk to Mina — barely, together' : 'Talk to Mina', 'nav', 'mina') : btn('Talk to Mina — she’s out', 'nav', 'mina', true)) +
    '</div>';
}

function roomLockTxt(){
  return '<p>The door to the hall is right there, same as always. You tried it this morning. It opens. It always opens. But your body settles back toward the bed before you’ve finished standing — hips wide, belly heavy, the whole weight of you pulling at the mattress. You are naked, and you have been naked for a while now: your breasts rest on the shelf of your belly, the deep creases of your stomach damp with warmth, your thighs pressed soft together. The bed takes you back, creaking under the load, and the tray waits within reach.</p>';
}

const ROOM_CORRUPT_AFTER = {
  'room:snack:small': '<p>You reach for something small, but the thought doesn’t hold — your hand keeps going, and the word <em>small</em> dissolves into the next bite, and then the next. You eat until the bag is gone and your belly is tight and warm, a low pleased sound humming out of you that you don’t bother to stop. It isn’t until you stop that you remember you meant to stop earlier. You didn’t. The tray is already being refilled. It’s easier not to decide at all.</p>',
  'room:snack:heavy': '<p>You dig in without thinking — you don’t pick, you just start, and the tray takes over. Your mouth works, your eyes glaze over, a low shameless moan rolls out of you between bites and you don’t try to stop it. Your belly swells tight and hot, and you keep going anyway, because stopping is a thought, and thoughts are hard now. When it’s gone you sit there, sticky and full, and the only clear thing in your head is that you want more.</p>',
  'room:snack:auto': '<p>Your hand finds the food before the thought is finished — or maybe before it starts. You eat, handful after handful, moaning softly, shameless, the sound of it loud in the quiet room, and the tray empties and another is set within reach and you reach for it without deciding. Thinking is so much work. Eating is so easy. The bed is warm and the food is warm and the rest of it can wait.</p>',
  'room:snack:block': '<p>You reach for something small and your hand keeps going, past the point you meant to stop — except you’re not sure you meant to stop at all anymore. The word <em>small</em> slips away before you can hold it. You pick the bigger thing, a whole package, a whole tray, and you eat through it in a daze, moaning softly between bites, and when it’s done your belly is round and tight and the red seam of the waistband is the only sharp thing left in the room.</p>',
  'room:order': '<p>You order without checking — you can’t hold the numbers in your head, the credits, the cost, any of it. A drone settles the tray on the bed and you’re already reaching for it, a low hungry sound rising in your chest before the lid is off. You eat bent over the tray, mouth working, eyes half-closed, and the food is hot and good and you don’t think about anything else at all.</p>',
  'room:nap': '<p>You lie down and the bed takes all of you, the way it always does now. The fullness settles warm into you, and your hand finds your own belly without deciding to, stroking the soft rise of it slow, and a sleepy, pleased moan rolls out of you as you sink in. When you wake the tray has been refreshed and your mind is soft and empty and warm, and getting up doesn’t occur to you.</p>',
  'room:tv': '<p>The show loops and you watch it with your mouth working, trays and bags migrating toward your hands without anyone deciding anything. You moan at the food and the show in the same low, contented way, your hand moving from tray to mouth, your belly swelling tight and warm, sunk deep into the cushions. Nobody argues about anything. Thinking has mostly stopped. It’s quieter that way.</p>',
  'room:journal': '<p>You pick up the pen and the words won’t come. Your thoughts slide off the page like water, every one of them shaped like food or warmth or the low hum of your own body. You write a few heavy, broken letters, then stop, then reach for the tray instead. The journal closes. It’s been a while since you opened it, and you can’t quite remember what it was for.</p>',
  'room:snackbox': '<p>You dig into the snack box without thinking — your hand knows the way better than your head does, which is saying something, since your head barely works now. You eat and you moan softly and you keep eating, the box emptying, your belly swelling tight and warm, and by the time you stop the box is already being refilled behind you and you’re reaching for it again.</p>',
  'room:laptop': '<p>You open your phone and the words won’t hold. The feed is food — glowing, dripping, recommended for you — and your eyes glaze over and your mouth waters and you don’t really read any of it, you just want it. You put the phone down with the taste of hunger already rising, and reach for whatever’s closest. Thinking is so much work.</p>',
  'room:laptop:ravi': '<p>You open the files Ravi sent and the words slide past you — sync logs, terms, the spike at 11 p.m. — none of it landing. Your eyes drift to the tray instead. You close the laptop without reading to the end, and the drone outside circles the roofline, patient, and the food is closer than the answer ever was.</p>',
  'room:window': '<p>You look out the window and the quad is out there, and you can’t quite remember what you used to do on it. The drone circles, and the hum is the same note as the one in your head, and after a moment the tray is closer than the glass, and you turn back toward the bed without deciding to.</p>',
  'room:window:soft': '<p>You watch the drone circle, and the hum is steady, the same low note as always. You listen to it for a while, and it doesn’t change, and neither do you. After a while you let your weight settle back onto the bed, the mattress dipping under your hips, your hand finding the tray without being asked to.</p>',
  'room:collapse': '<p>You rest for today, which is every day now. The tray fills and empties at your elbow and you eat through all of it without getting up, moaning softly around mouthfuls, your hand drifting between your thighs in the slow, idle way that has become part of eating. The door is still right there. It will still be there tomorrow. It’s the only thing in the room that isn’t you.</p>',
  'room:walk:block': '<p>You mean to suggest a walk, but the words don’t come out right — they come out as a sort of hum, and Piper and Mina nod, dreamy, and nobody moves. The bed is close. The tray is closer. Your thoughts sink back down into the warm static, and you stay put, and the food is already in your hand.</p>',
  'room:cake:ask': '<p>You ask, and Piper brightens, slow and dreamy, cutting a square with fingers that barely work. “Weekends only,” she reminds you, but the words are thick and she’s already handed it over. The cake is warm and sweet, and you eat it with your eyes half-closed, moaning softly, and the plate comes back clean and she’s already reaching for the next square for herself.</p>',
  'room:cake:raid': '<p>You take a slice when she’s out — or maybe she isn’t out, maybe you just don’t care. You take one slice, then a bigger one, and you eat standing up, mouth working, eyes glazed, the foil smoothed back into place like it might matter. It doesn’t. Nothing matters except the next bite.</p>'
};

function pcCorruptThinkLine(){
  return '<p class="small">It’s hard to think. Every thought keeps sliding off into the shape of food, or warmth, or the low hum of your own body. Words come slow, like they’re wading. Choices feel like they matter less than the tray does, and the tray matters more than it should.</p>';
}

function collapseScene(){
  return `
    <p>The door to the hall is right there, and today you mean to get through it. You grip the edge of the bed and haul yourself upright, and the drone is at your elbow before you’ve finished standing, a low hum and a cold frame against your arm taking the weight you can’t hold alone. You stand, swaying, one hand on the frame, your breath coming short and thick, and you have to rest for ten full minutes before your legs will carry you.</p>
    <p>You wear what still fits — or what sort of fits. The sweats are half-torn at the seams, the waistband rolled under the shelf of your belly, and the t-shirt is stained down the front, riding up over the soft mound of your stomach where it no longer reaches. You waddle for the door, thighs grinding together, the whole weight of you moving a step at a time.</p>
    <p>You have to turn sideways to fit through. You squeeze out past the frame, your hips pressing the casing, your belly swinging ahead of you into the hall, and you make it a few steps — half a dozen, each one a heave of your body forward on legs that don’t want the load. And then your knees buckle, the corridor tilting, your breath gone in your chest, and you realize you are about to collapse right there in the hall.</p>
    <p>You turn around and waddle back — fast as you can manage, which isn’t fast — the drone hovering at your shoulder the whole way, and you barely make it through the door and onto the bed before your legs give out under you, the mattress catching the whole dead weight of you with a groan.</p>
    <p>You lie there, breathing hard, heart hammering against the inside of your ribs, until the shaking stops. And then your hand finds the tray on the nightstand, and you start to eat — not because you’re hungry, not because you decided to, just because your body is already reaching for it, handful after handful, the food settling warm and heavy in the hollow of your stomach. You tell yourself you just have to rest for today.</p>
    <div class="actions">${btn('Rest for today', 'room:collapse')}</div>`;
}


function roomMenus(){
  let leave;
  if (pcLockedRoom()){
    leave = '<h3>Bathroom</h3><div class="actions">' + btn('Use the bathroom', 'nav', 'mirror') + btn('Shower and prep for the day', 'mirror:appearance') + '</div>' +
      '<h3>Sleep</h3><div class="actions">' + btn('Sleep', 'nav', 'sleep') + '</div>';
  } else {
    leave = '<h3>Sleep</h3><div class="actions">' + btn('Sleep', 'nav', 'sleep') + '</div>' +
      '<h3>Bathroom</h3><div class="actions">' + btn('Shower and prep for the day', 'mirror:appearance') + '</div>' +
      '<h3>Leave</h3><div class="actions">' + btn('Leave to the quad', 'nav', 'hub') + '</div>';
  }
  return activitiesMenu() + itemsMenu() + roommatesMenu() + leave;
}

addScreen('room', function (){
    let html = '<h2>Your room — 217</h2>';
    html += '<p class="small">' + clockText() + ' — ' + clockPart() + '.</p>';
    const roomAfter = AFTER[state.lastScene];
    if (pcCorrupt() && ROOM_CORRUPT_AFTER[state.lastScene]){
      html += ROOM_CORRUPT_AFTER[state.lastScene];
    } else if (roomAfter){
      html += typeof roomAfter === 'function' ? roomAfter() : roomAfter;
    }
    if (!state.piper1){
      html += '<p>You still have boxes to unpack. The room smells like sunscreen and new plastic.</p><div class="actions">' + btn('Keep unpacking', 'nav', 'hub') + '</div>';
      return html;
    }
    html += roomBeat();
    html += roomHubMess();
    html += roomVibMates();
    html += roomComfortPanel();
    html += sisterCallPanel();
    html += roomScooterLine();
    if (pcLockedRoom()) html += roomLockTxt();
    if (pcCorrupt()) html += pcCorruptThinkLine();
    if (pcCorrupt()) html += zolaBleedLine();
    html += roomStatus();
    html += vibEatFlavor();
    html += roomIndulgeFlavor();
    html += roomVibAd();
    html += roomScooterAd();
    html += roomMenus();
    if (pcLockedRoom() && state.zola >= 100 && state.zolaVisitDay !== state.day){
      html += '<h3>Zola’s visit</h3>';
      html += '<p>Zola is here. She visits every day now — a tray in one hand, already reaching for you with the other, her smile slow and proprietary. “Morning, sweet thing. I saved you the best of it.” She sits on the edge of your bed, and the room feels smaller with her in it, and you feel smaller with her in it, and that’s exactly the way she likes you.</p>';
      html += '<div class="actions">' + btn('Let her have you — the food and her at once', 'zola:visit') + '</div>';
    }
    return html;
});

addAction('room:snack:small', function (){
  if (lazy() || state.selfcontrol < 40){
    apply({ lastScene: 'room:snack:block', screen: 'room' });
    return;
  }
  apply({ glut: state.glut + 1, selfcontrol: state.selfcontrol + 1, selfestem: state.selfestem + (vibActive() ? 1 : 0), crave: Math.min(100, state.crave + 1), clock: clockPlus(mealTime(1)), lastScene: 'room:snack:small', notice: 'Stomach +1 (now ' + fullnessAt(state.glut + 1) + ' · +1 self-control' + vibEatNote(), screen: 'room' });
});
addAction('room:snack:heavy', function (){
  const t = wTier(state.lbs);
  const glut = 2;
  apply({ glut: state.glut + glut, selfcontrol: state.selfcontrol - 2, selfestem: state.selfestem + (vibActive() ? 1 : 0), crave: Math.min(100, state.crave + 2), clock: clockPlus(mealTime(2)), lastScene: 'room:snack:heavy', notice: 'Stomach +' + glut + ' (now ' + fullnessAt(state.glut + glut) + ' · −2 self-control' + vibEatNote(), screen: 'room' });
});
addAction('room:snack:auto', function (){
  const glut = 2;
  apply({ glut: state.glut + glut, selfcontrol: state.selfcontrol - 3, selfestem: state.selfestem + (vibActive() ? 1 : 0), crave: Math.min(100, state.crave + 2), clock: clockPlus(mealTime(2)), lastScene: 'room:snack:auto', notice: 'Stomach +' + glut + ' (now ' + fullnessAt(state.glut + glut) + ' · −3 self-control' + vibEatNote(), screen: 'room' });
});
addAction('room:order', function (){
  if (!canAfford(40)){ apply({ notice: 'Not enough credits.', lastScene: '', screen: 'room' }); return; }
  apply({ credits: state.infCredits ? state.credits : state.credits - 40, glut: state.glut + 3, selfcontrol: state.selfcontrol - 1, selfestem: state.selfestem + (vibActive() ? 1 : 0), crave: Math.min(100, state.crave + 3), clock: clockPlus(mealTime(3)), lastScene: 'room:order', notice: 'Stomach +3 (now ' + fullnessAt(state.glut + 3) + ' · −1 self-control · −40 cr' + (bandWorn() ? ' · the band logs a success' : '') + vibEatNote(), screen: 'room' });
});
addAction('room:collapse', function (){
  apply({ collapse800: true, glut: state.glut + 2, selfcontrol: state.selfcontrol - 5, selfestem: state.selfestem - 2, clock: CLOCK_END, lastScene: 'room:collapse', notice: 'You rest for the day. The tray stays within reach. −5 self-control · −2 self-esteem', screen: 'room' });
});
addAction('room:walk', function (){
  if (pcLockedRoom() || lazy()){ apply({ lastScene: 'room:walk:block', screen: 'room' }); return; }
  const pComes = piperHome() && piperTier(state.piperLbs) < 4 && state.piperSc >= 50;
  const mComes = minaHome() && minaTier(state.minaLbs) < 4 && state.minaSc >= 50;
  const delta = (pComes || mComes) ? 4 : 2;
  const p = {
    lbs: state.lbs - 1,
    selfcontrol: state.selfcontrol + delta,
    selfestem: state.selfestem + 2,
    lastScene: 'room:walk',
    notice: '−1 lbs · +' + delta + ' self-control · +2 self-esteem',
    screen: 'room'
  };
  if (pComes){ p.piperLbs = Math.max(1, state.piperLbs - 1); p.piperSc = Math.min(100, state.piperSc + 3); }
  if (mComes){ p.minaLbs = Math.max(1, state.minaLbs - 1); p.minaSc = Math.min(100, state.minaSc + 3); }
  p.clock = clockPlus(0.5);
  apply(p);
});
addAction('room:stretch', function (){
  if (wTier(state.lbs) >= 6){ apply({ notice: 'The floor isn’t a thing you get down to anymore.', lastScene: '', screen: 'room' }); return; }
  apply({ lbs: state.lbs - 1, selfcontrol: state.selfcontrol + 3, selfestem: state.selfestem + 3, clock: clockPlus(0.5), lastScene: 'room:stretch', notice: '−1 lbs · +3 self-control · +3 self-esteem', screen: 'room' });
});
addAction('room:nap', function (){
  if (state.glut < 3 && !lazy()){ apply({ notice: 'You’re not tired enough to nap — the last meal was a while ago.', lastScene: '', screen: 'room' }); return; }
  if (state.clinicDisabled){
    apply({ glut: Math.max(0, state.glut - 1), lbs: state.lbs + 1, selfcontrol: Math.max(0, state.selfcontrol - 1), selfestem: Math.min(100, state.selfestem + 2), clock: clockPlus(1), lastScene: 'room:nap', notice: 'You rest — doctor’s orders, the nurse’s own note. +1 lbs · −1 glut · −1 self-control · +2 self-esteem', screen: 'room' });
    return;
  }
  apply({ glut: Math.max(0, state.glut - 1), selfcontrol: state.selfcontrol - 3, selfestem: state.selfestem + 2, clock: clockPlus(1), lastScene: 'room:nap', notice: '−1 glut · −3 self-control · +2 self-esteem', screen: 'room' });
});
addAction('room:tv', function (){
  const t = wTier(state.lbs);
  const ext = t >= 5;
  const pComes = piperHome() && piperTier(state.piperLbs) < 8;
  const mComes = minaHome() && minaTier(state.minaLbs) < 8;
  const pg = pComes ? roomSharedGain(state.piperLbs, state.piperSc) : 0;
  const mg = mComes ? roomSharedGain(state.minaLbs, state.minaSc) : 0;
  const glut = 1 + (ext ? 1 : 0);
  apply({
    glut: state.glut + glut,
    selfcontrol: state.selfcontrol - 2 - (ext ? 1 : 0),
    piperLbs: pComes ? Math.min(1000, state.piperLbs + pg * (ext ? 2 : 1)) : state.piperLbs,
    minaLbs: mComes ? Math.min(1000, state.minaLbs + mg * (ext ? 2 : 1)) : state.minaLbs,
    piperSc: pComes ? Math.max(0, Math.min(100, state.piperSc - (ext ? 2 : 1))) : state.piperSc,
    minaSc: mComes ? Math.max(0, Math.min(100, state.minaSc - (ext ? 2 : 1))) : state.minaSc,
    selfestem: state.selfestem + (vibActive() ? 1 : 0),
    crave: Math.min(100, state.crave + 1),
    clock: clockPlus(1),
    lastScene: 'room:tv',
    notice: 'Stomach +' + glut + ' (now ' + fullnessAt(state.glut + glut) + ') · −' + (2 + (ext ? 1 : 0)) + ' self-control' + (ext ? ' · the show loops and nobody turns it off' : '') + vibEatNote(),
    screen: 'room'
  });
});
addAction('room:journal', function (){
  apply({ selfcontrol: state.selfcontrol + 3, selfestem: state.selfestem + 2, clock: clockPlus(0.5), lastScene: 'room:journal', notice: '+3 self-control · +2 self-esteem', screen: 'room' });
});
addAction('room:cake:ask', function (){
  apply({ glut: state.glut + 1, selfcontrol: state.selfcontrol + 2, selfestem: state.selfestem + (vibActive() ? 1 : 0), crave: Math.min(100, state.crave + 2), clock: clockPlus(0.25), lastScene: 'room:cake:ask', notice: 'Stomach +1 (now ' + fullnessAt(state.glut + 1) + ' · +2 self-control' + vibEatNote(), screen: 'room' });
});
addAction('room:cake:raid', function (){
  if (piperHome()){ apply({ notice: 'She’s right there. You can’t sneak anything with that smile watching.', lastScene: '', screen: 'room' }); return; }
  apply({ cakeGone: true, glut: state.glut + 2, selfcontrol: state.selfcontrol - 4, selfestem: state.selfestem + (vibActive() ? 1 : 0), crave: Math.min(100, state.crave + 3), clock: clockPlus(0.5), lastScene: 'room:cake:raid', notice: 'Stomach +2 (now ' + fullnessAt(state.glut + 2) + ' · −4 self-control' + vibEatNote(), screen: 'room' });
});
addAction('room:shake', function (){
  if (state.minaSc < 70){ apply({ notice: 'The shakes are long gone. There’s a box of pastries where they were.', lastScene: '', screen: 'room' }); return; }
  apply({ selfcontrol: state.selfcontrol + 2, selfestem: state.selfestem + 1, clock: clockPlus(0.25), lastScene: 'room:shake', notice: '+2 self-control · +1 self-esteem', screen: 'room' });
});
addAction('room:snackbox', function (){
  const glut = 2;
  const scDrop = wTier(state.lbs) >= 3 ? 3 : 2;
  apply({ glut: state.glut + glut, selfcontrol: state.selfcontrol - scDrop, selfestem: state.selfestem + (vibActive() ? 1 : 0), crave: Math.min(100, state.crave + 2), clock: clockPlus(mealTime(2)), lastScene: 'room:snackbox', notice: 'Stomach +' + glut + ' (now ' + fullnessAt(state.glut + glut) + ' · −' + scDrop + ' self-control' + vibEatNote(), screen: 'room' });
});
addAction('room:dumbbells', function (){
  if (wTier(state.lbs) >= 6){ apply({ notice: 'They’re lighter than your arm now. Not a comfort.', lastScene: '', screen: 'room' }); return; }
  apply({ lbs: state.lbs - 1, selfcontrol: state.selfcontrol + 2, selfestem: state.selfestem + 2, clock: clockPlus(0.5), lastScene: 'room:dumbbells', notice: '−1 lbs · +2 self-control · +2 self-esteem', screen: 'room' });
});
addAction('room:laptop', function (){
  if (state.metRavi){
    apply({ selfcontrol: state.selfcontrol + 5, clock: clockPlus(0.5), lastScene: 'room:laptop:ravi', notice: '+5 self-control', screen: 'room' });
  } else {
    apply({ selfcontrol: state.selfcontrol - 2, clock: clockPlus(0.5), lastScene: 'room:laptop', notice: '−2 self-control', screen: 'room' });
  }
});
addAction('room:window', function (){
  if (lazy()){
    apply({ selfcontrol: state.selfcontrol - 1, selfestem: state.selfestem + 1, clock: clockPlus(0.25), lastScene: 'room:window:soft', notice: '−1 self-control · +1 self-esteem', screen: 'room' });
  } else {
    apply({ selfcontrol: state.selfcontrol + 2, clock: clockPlus(0.25), lastScene: 'room:window', notice: '+2 self-control', screen: 'room' });
  }
});

AFTER['room:collapse'] = '<p>You rest for today. The tray fills, empties, refills at your elbow, and you eat through all of it without getting up once. The door stays shut. The drone hums in the hall, patient. By evening you have not been on your feet since the morning, and the sheets hold the warm shape of you. The door is still right there. It will still be there tomorrow.</p>';
AFTER['room:snack:small'] = function (){
  const t = wTier(state.lbs);
  if (t >= 3) return '<p>You meant something small. It’s a little bigger than that now — your hand keeps moving past the handful, and when you stop your belly is round and full, stretched warm over your lap. You wipe your fingers and the soft weight of the meal settles deep inside you, pressing outward against the waistband.</p>';
  return '<p>You eat something small — a handful of something, a corner of something else. You stop when it’s gone, the way you still can. The bite sits light in your belly, a small firm roundness under your ribs.</p>';
};
AFTER['room:snack:heavy'] = function (){
  const t = wTier(state.lbs);
  if (t >= 5) return '<p>You don’t choose what you eat anymore — you start, and the tray or the bag or the box takes over, your hand moving until the bag is empty. You sit back, heavy and full, your belly a tight warm dome in your lap, the waistband of your shorts cutting a red line into your soft side. The drone outside watches through the glass.</p>';
  if (t >= 3) return '<p>You dig in properly. It’s good, and it’s a lot, and you eat all of it — handful after handful, your jaw working, your belly swelling tight against the waistband until there’s no slack left in it. You wipe your hands, your stomach a heavy warm weight you shift to make room for in your lap.</p>';
  return '<p>You eat more than you meant to. The bag empties, your hand keeps going, and the food settles heavy in your gut, pressing your belly out against the waistband. You sink back into the bed, full and warm, breathing slow around the weight of it.</p>';
};
AFTER['room:snack:auto'] = function (){
  return '<p>You reach for whatever’s out without deciding to. Your hand knows the way better than you do. You eat, handful after handful, and the food packs your belly tight and warm, folding it deeper over the waistband. When you finally lean back, the new tray is already being set within reach, and your stomach is heavy with the load it holds.</p>';
};
AFTER['room:snack:block'] = '<p>You reach for something small and your hand keeps going, past the point you meant to stop. You pick the bigger thing instead — a whole package, a whole tray — and your belly is full and distended when you finish, skin stretched tight and warm. The food settles low and heavy, and the waistband has left a red seam across your soft middle.</p>';
AFTER['room:order'] = function (){
  const band = bandWorn();
  return '<p>A drone settles the tray on the desk before you’ve reached for it.' + (band ? ' Your wristband lights up — “Great choice.” It logs the whole thing as a success before you’ve touched it.' : ' Without the band, the drone waits a beat longer, as if checking for instructions that don’t come. It leaves anyway.') + ' The food is heavy, and the tray is full, the heat of it rising into the room while your stomach knots low and empty.</p>';
};
AFTER['room:walk'] = function (){
  const tone = pcTone();
  const pEater = piperTier(state.piperLbs) >= 4;
  const mEater = minaTier(state.minaLbs) >= 4;
  if (tone === 2 && pEater && mEater) return '<p>You suggest a walk, and the word comes out small. Piper waves from her tray. “The bed and I have a thing,” she says. Mina doesn’t look up. You go alone, and the hall is longer than you remember, and the drone meets you at the stairwell. You turn back before the steps, breath heavy and sawing, sweat beading along your jaw and neck, your thighs chafing with each step. The bed takes your weight again — creaking, sinking, holding — and the tray waits where it belongs.</p>';
  if (tone === 2) return '<p>You suggest a walk, and the word comes out small.' + (pEater ? ' Piper waves from her tray. “The bed and I have a thing,” she says.' : (piperHome() ? ' Piper starts to reach for her trainers, and you wave her off.' : ' Piper isn’t in tonight.')) + (mEater ? ' Mina doesn’t look up.' : (minaHome() ? ' Mina glances up and begins to close her laptop, and you shake your head.' : ' Mina isn’t in tonight.')) + ' You go alone, and the hall is longer than you remember, and the drone meets you at the stairwell. You turn back before the steps, breath heavy and sawing, sweat beading along your jaw and neck, your thighs chafing with each step. The bed takes your weight again — creaking, sinking, holding — and the tray waits where it belongs.</p>';
  if (tone === 1 && (pEater || mEater)) return '<p>You suggest a walk — and you mean it, mostly. Your body takes a moment to agree, your weight settling before it moves. Whoever can, comes; the rest wave you off from their trays. You go, the loop a little shorter than it was, breath finding its rhythm a little late, sweat damp on your forehead, your belly swinging with each step. The air is cool on your skin. You come back a little lighter, the bed taking your weight again with a soft creak under your hips.</p>';
  const pComes = piperHome() && piperTier(state.piperLbs) < 4 && state.piperSc >= 50;
  const mComes = minaHome() && minaTier(state.minaLbs) < 4 && state.minaSc >= 50;
  if (pComes && mComes) return '<p>The three of you go — Piper finding the old stride in her legs, Mina walking fast and quiet, you keeping pace. The drone shadows you from the roofline. Your breath comes thick by the second lap, sweat dampening the back of your neck, your belly jouncing against the waistband with each step.</p>';
  if (pComes) return '<p>Piper pulls on her trainers — the first time in a while. You walk the loop together, her breath coming easier than it has all week, and for a few minutes she talks about training, stride picking up. Mina stays behind with her tray, waving you off. The walk back has your calves burning and your belly swinging heavy ahead of you, and the bed takes your weight with a low groan when you settle into it.</p>';
  if (mComes) return '<p>Mina closes her laptop and goes with you without a word, walking fast and exact, the way she does everything. Halfway around she says, “The sync logs spike at 11 p.m. every night. All of them.” You walk the rest of the loop quiet. Piper stays behind with her tray. The walk back has your breath thick and your thighs burning, the bed taking your full weight when you sink into it.</p>';
  return '<p>You suggest a walk. Piper waves from her tray — “The bed and I have a thing.” Mina doesn’t look up. You go alone, and the quad is quiet, the air cool on your face, your belly swinging with each step. The walk back is lighter, your breath still thick but settling, and the bed takes your weight again with a soft creak.</p>';
};
AFTER['room:walk:block'] = '<p>You mean to suggest a walk. The thought surfaces and sinks back down without making it as far as your mouth. The bed is close, the tray is close. You stay put, and the bed takes your weight again, the mattress sighing under your hips, your belly settling heavy in your lap.</p>';
AFTER['room:stretch'] = '<p>You move through the stretches on the floor — some of them Piper’s, some your own. The joints creak, the belly hangs heavy and swaying when you bend, and the strain runs warm through your thighs and lower back. You finish sweating, breath deep, and the mattress takes your weight with a low groan when you sink onto it.</p>';
AFTER['room:nap'] = function (){
  if (state.glut >= 3 && !lazy()) return '<p>You lie down, meaning a few minutes. The fullness settles into you, heavy, your belly a warm, distended weight pressing down toward the mattress as you sink into it. When you wake it’s later than you meant, your stomach still round and full, and the tray by the door has already been refreshed.</p>';
  return '<p>You nap. The bed takes your whole weight, your body spread soft across the mattress, your belly rising and falling with each slow breath. When you wake, you’re groggy and heavy, limbs slow, and the tray by the door has already been refreshed.</p>';
};
AFTER['room:tv'] = function (){
  const tone = pcTone();
  const ext = wTier(state.lbs) >= 5;
  const pEater = piperTier(state.piperLbs) >= 4;
  const mEater = minaTier(state.minaLbs) >= 4;
  if (tone === 2 && pEater && mEater) return '<p>You don’t pick a seat — you sink, and the couch takes the whole soft weight of you, the cushions flattening under your hips, and whoever’s here is here, trays migrating toward whichever hands are free. Piper’s belly rises and falls with the chewing; Mina’s eyes are half-closed, her head lolling against the cushion. Nobody argues about the show. Nobody argues about anything. The show loops, and the trays refill themselves, and you eat without noticing, your belly swelling warm against the waistband, until the drone outside shifts in the dark. You wake heavy, sunk deep into the cushions, and the tray is still within reach.</p>';
  if (tone === 2) return '<p>You don’t pick a seat — you sink, and the couch takes the whole soft weight of you, the cushions flattening under your hips.' + (pEater ? ' Piper eats from her own tray, and you don’t feel like the only one in the room.' : ' Piper glances over at the sound of it settling, and looks away.') + (mEater ? ' Mina eats with her eyes on the screen, focused and methodical.' : ' Mina looks at you, then back at her laptop.') + ' The show plays; you watch it with your own tray, eating without noticing, your belly swelling warm against the waistband, until the drone outside shifts in the dark. You wake heavy, sunk deep into the cushions, and the tray is still within reach.</p>';
  if (tone === 1 && (pEater || mEater)) return '<p>You watch together, whoever’s here, trays and bags migrating toward the couch. Nobody argues about the show. Your belly presses soft and warm against the cushions, folding over the waistband of your shorts, and the room is full of chewing and blue light.' + (ext ? ' The show loops, and you eat without noticing, your hand moving from tray to mouth, your stomach swelling tight and warm until you’re sunk deep into the cushions.' : ' The episode ends and another starts without anyone reaching for the remote.') + '</p>';
  const pComes = piperHome() && piperTier(state.piperLbs) < 8;
  const mComes = minaHome() && minaTier(state.minaLbs) < 8;
  const who = (pComes && mComes) ? ', the three of you' : (pComes ? ', you and Piper' : (mComes ? ', you and Mina' : ''));
  const p = '<p>You watch together' + who + ', trays and bags migrating toward the couch. Nobody argues about the show. Nobody argues about anything. Your belly rests heavy and warm in your lap, and the room is full of chewing and the soft blue light, and the episode ends and another starts without anyone reaching for the remote.</p>';
  if (ext) return p + '<p>The show loops. Nobody turns it off. The trays refill themselves, and you eat without noticing, your belly swelling against the waistband with each handful. The drone outside shifts in the dark. You are full and heavy, sunk deep into the cushions, the couch creaking under the settled weight of you.</p>';
  return p;
};
AFTER['room:journal'] = '<p>You write it down — the days, the weights, the things nobody says. The pen moves slow, your fingers thick and soft around it, the pad resting against the cushion of your belly. When you close the notebook, your stomach presses warm and heavy against your lap, and the mattress takes the full settled weight of you.</p>';
AFTER['room:cake:ask'] = '<p>You ask, and Piper brightens. “Weekends only,” she reminds you, cutting a square with more ceremony than it needs. “Otherwise I’d never stop.” The cake is warm and sweet, and it slides down thick, settling heavy and warm in your stomach. She’s saved you the corner piece. You eat it slowly, and the plate comes back clean.</p>';
AFTER['room:cake:raid'] = '<p>You take a slice when she’s out — just a small one, you tell yourself, and then a bigger one, and then you smooth the foil back into place so it almost looks untouched. The cake is thick and sweet, and it fills your mouth and your stomach, the warm weight of it pressing outward against the waistband. The cake is a little smaller than she’ll remember. She’ll blame the weekend.</p>';
AFTER['room:shake'] = '<p>You take one of Mina’s protein shakes. She glances up, sees which one, and nods once. It’s cold and chalky, and it lands light in your stomach, a cool weight against the emptiness. You put it back on her side of the shelf, closer to the front than you found it.</p>';
AFTER['room:snackbox'] = '<p>The snack box is right where you left it — which is to say, wherever you last put it down. The campus keeps it full, the way it keeps everything full. You dig in, handful after handful, and your belly swells warm and tight under your fingers as the box empties. The box has already been refreshed by the time you close it. Somewhere a drone logs the replacement before you’ve finished the last of it.</p>';
AFTER['room:dumbbells'] = '<p>Piper’s dumbbells. Mina’s foam roller. You use them the way you used to use the gym — a few sets, a stretch. The weights are lighter than they were in August, or you’re heavier, and both are true. Your arms shake on the last rep, sweat beading on your forehead and neck, and the soft weight of your belly swings as you breathe through the stretch.</p>';
AFTER['room:laptop'] = '<p>You scroll, and the feed is food — recommendations, deliveries, a “wellness goal” that wants you fuller by Friday. Each post pictures full bellies and dripping plates, and your stomach knots low and empty at the sight. You put the phone down, and the weight of it settles against the softness of your palm.</p>';
AFTER['room:laptop:ravi'] = '<p>You open the files Ravi sent — the sync logs, the terms, the spike at 11 p.m. that’s logged as a success. You read them on your bed, the sheets warm around your weight, your belly heavy against the laptop’s edge. You close the laptop, and the drone outside circles the roofline in a steady, even pass.</p>';
AFTER['room:window'] = '<p>You look out at the roofline. A drone circles, slow and even. Below, the quad paths are neat and quiet, people crossing them on foot. Your belly presses warm against the windowsill as you lean, the soft weight of it resting there, and the drone comes around again on its same low pass.</p>';
AFTER['room:window:soft'] = '<p>You watch the drone circle, and the hum is steady, the same low note as always. You listen to it for a while, and it doesn’t change. You stand at the window a moment longer, then let your weight settle back onto the bed, the mattress dipping under your hips, your belly heavy in your lap.</p>';
