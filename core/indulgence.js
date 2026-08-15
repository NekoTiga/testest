'use strict';

// ---------------------------------------------------------------------------
// Craving (addiction) — how much the body now asks for food, beyond appetite.
// Eating pushes it up. Going hungry feeds it at first, then burns into
// withdrawal once the body is hooked. High craving opens new actions.
// ---------------------------------------------------------------------------

function cravingLevel(){
  const c = state.crave;
  if (c >= 80) return 4;
  if (c >= 65) return 3;
  if (c >= 45) return 2;
  if (c >= 25) return 1;
  return 0;
}

function cravingLabel(){
  const c = state.crave;
  if (c >= 90) return 'food is all you think about';
  if (c >= 70) return 'you’re hungry all the time';
  if (c >= 50) return 'strong cravings';
  if (c >= 30) return 'a craving';
  if (c >= 10) return 'a taste for it';
  return 'none';
}

const CRAVE_ROOM_LINES = [
  '<p class="small">Your mouth waters at nothing. You catch yourself thinking about the snack box — the weight of it, the first bite — and you swallow hard and reach for the tray without deciding to.</p>',
  '<p class="small">You are hungry again, and you were full an hour ago. It’s a different hunger — patient, quiet, pressing up behind your ribs — and it already knows exactly what it wants.</p>',
  '<p class="small">The thought of food sits at the front of your mind like a door left open. You keep looking at the tray. You keep deciding it’s not time. You keep losing the argument.</p>',
  '<p class="small">You can almost taste it. Not any one thing — just food, warm and endless, the way it’s been all term. Your hand is already on the way to your mouth, and there’s nothing in it.</p>'
];

function cravingRoomLine(){
  if (state.crave < 45) return '';
  return CRAVE_ROOM_LINES[Math.min(3, (state.day + state.releaseN) % CRAVE_ROOM_LINES.length)];
}

function cravingHubLine(){
  if (state.crave < 65) return '';
  return ' <em>You’re hungry. Again. It’s loud now — a constant, patient pull toward the next tray.</em>';
}

function cravingClassLine(){
  const c = cravingLevel();
  if (c < 3) return '';
  const lines = [
    '<p>The professor is talking, but the words slide past you — you can’t hold a sentence when the thought of the snack box is holding you. You doodle food in your notes. You catch yourself chewing your pen. When the tray on the desk beside you gets set down, your hand is already reaching.</p>',
    '<p>You try to take notes and your pencil draws a pastry. Twice. The hunger is a low, constant hum under the lecture — not pain, just pull — and you count the minutes by the thought of food the way you used to count by the clock. It’s the only number in your head that holds.</p>'
  ];
  return lines[(state.crave >= 80 ? 1 : 0)];
}

// ---------------------------------------------------------------------------
// Sweat — exertion and heat leave you damp, and a shower clears it.
// ---------------------------------------------------------------------------

function sweatLabel(){
  const s = state.sweat;
  if (s >= 80) return 'slick with sweat';
  if (s >= 60) return 'sweaty';
  if (s >= 40) return 'damp';
  if (s >= 20) return 'a little damp';
  return 'dry';
}

function sweatGain(n){
  return Math.min(100, state.sweat + n);
}

const SWEAT_ROOM_LINES = [
  '<p class="small">You’re still damp from the effort — the small of your back, the deep crease under your belly, the tops of your thighs. The room is warm, and the warmth sits on your skin like a second shirt.</p>',
  '<p class="small">A line of sweat runs down your neck when you lean forward, and you don’t bother to wipe it. The tray is warmer than your skin. The bite is warmer still.</p>'
];

function sweatRoomLine(){
  if (state.sweat < 50) return '';
  return SWEAT_ROOM_LINES[(state.sweat >= 75 ? 1 : 0)];
}

// ---------------------------------------------------------------------------
// Grazing — late-game passive: the tray stays by you and you never really stop.
// ---------------------------------------------------------------------------

function grazingUnlocked(){
  return wTier(state.lbs) >= 7 || (state.metZola && state.zola >= 60 && wTier(state.lbs) >= 6);
}

function grazingLine(){
  return '<p class="small">You’ve been grazing all day — a bite here, a bite there, the tray never quite out of reach. You didn’t decide to. The eating just happens in the spaces between everything else, like breathing. Your belly is never quite empty and never quite full, and the tray is always within arm’s length.</p>';
}

// ---------------------------------------------------------------------------
// Release — staged masturbation that couples with food as the PC fattens.
// ---------------------------------------------------------------------------

function releaseStage(){
  const t = wTier(state.lbs);
  const c = cravingLevel();
  if (t >= 6 || c >= 3) return 2;
  if (t >= 3 || c >= 2) return 1;
  return 0;
}

function releaseLabel(){
  const c = pcCorrupt();
  if (wTier(state.lbs) >= 6 || cravingLevel() >= 3){
    return c ? 'Your hand finds itself — you don’t even decide anymore' : 'Your hand finds itself — automatic now';
  }
  if (wTier(state.lbs) >= 3 || cravingLevel() >= 2){
    return 'Take care of yourself — the thoughts keep drifting to food';
  }
  return 'Take care of yourself — quick and quiet';
}

const RELEASE_AFTER = [
  '<p>You close the door and take care of it the way you’ve always taken care of it — quick, quiet, your mind somewhere private. When it’s done you feel the small, sharp guilt of it, the way you used to feel the day after a dessert. It passes. You pull your shirt down, and the room is the same as it was, and the bed is the same, and you are the same — for now.</p>',
  '<p>You mean to take care of it quickly, but your mind keeps sliding off the usual thoughts and landing somewhere else — on the way a tray looks set down in front of you, on the weight of a bite, on the low hum of eating that runs under this whole campus. You give up fighting it and let the thoughts come, and somewhere in the middle your hand finds the snack on the nightstand and you eat while you do it, and it’s better than either thing alone. When it’s over you lie there, full and warm and a little ashamed, and you already know the shame won’t last.</p>',
  '<p>You don’t really decide to. Your hand finds itself the way it finds food now — automatic, patient, half of it happening before you’re fully aware. The tray is already within reach, and you eat through it in the slow, rocking rhythm your body has learned: a bite, a swell of pleasure, another bite. The room hums around you, and your hips shift against the mattress in time with your jaw, and it all runs together until you can’t tell the meal from the climax from the heat of your own body. When it’s over you lie there sticky and full, breath still coming in soft shudders, and the tray is already being refilled.</p>'
];

AFTER['room:release'] = function (){
  const s = releaseStage();
  let out = RELEASE_AFTER[s];
  if (vibActive()){
    out += '<p>The Comfort unit hums through the whole of it, doing half the work — a low, patient pulse that the band runs in the background, climbing when your jaw slows, easing when you swallow. You don’t have to do anything. It knows. It’s been learning you all term.</p>';
  }
  if (s >= 1 && state.zolaReleaseDay === state.day){
    out = '<p>You’re halfway there, eyes closed, hand working, when the door opens and Zola steps in like she owns the room — because she does. She doesn’t stop. She watches for a second, delighted, then settles on the edge of the bed, takes the snack from your hand, and feeds it to you herself, one slow bite at a time, her other hand replacing yours. “There you are,” she hums, low and pleased. “You don’t even hide it from me anymore. That’s mine. All of that’s mine.” She works you through the rest of it unhurried and thorough, feeding you between shudders, and when it’s over she wipes your chin and pats your belly. “Good girl. Now eat — properly.”</p>';
  }
  return out;
};

addAction('room:release', function (){
  const s = releaseStage();
  const zolaHere = state.metZola && state.zola >= 60 && wTier(state.lbs) >= 5 && state.submission >= 30 && state.zolaReleaseDay !== state.day;
  const p = {
    releaseN: (state.releaseN | 0) + 1,
    clock: clockPlus([0.5, 1, 1.5][s]),
    lastScene: 'room:release',
    screen: 'room'
  };
  if (zolaHere){
    p.zolaReleaseDay = state.day;
    p.zola = Math.min(100, state.zola + 5);
    p.submission = Math.min(100, state.submission + 3);
    p.selfestem = Math.min(100, state.selfestem + 2);
    p.selfcontrol = Math.max(0, state.selfcontrol - 6);
    p.glut = Math.min(50, state.glut + 1);
    p.crave = Math.min(100, state.crave + 2);
    p.notice = 'Zola walks in and makes it hers. −6 self-control · +5 approval · +3 submission · +2 self-esteem';
  } else if (s === 0){
    p.selfcontrol = Math.min(100, state.selfcontrol + 2);
    p.selfestem = Math.max(0, state.selfestem - 2);
    p.crave = Math.min(100, state.crave + 1);
    p.notice = 'Quick and quiet. +2 self-control · −2 self-esteem';
  } else if (s === 1){
    p.selfcontrol = Math.max(0, state.selfcontrol - 3);
    p.selfestem = Math.min(100, state.selfestem + 1);
    p.glut = Math.min(50, state.glut + 1);
    p.crave = Math.min(100, state.crave + 2);
    if (state.metZola) p.submission = Math.min(100, state.submission + 1);
    p.notice = 'You eat while you do it. −3 self-control · +1 self-esteem · +1 submission';
  } else {
    p.selfcontrol = Math.max(0, state.selfcontrol - 4);
    p.selfestem = Math.min(100, state.selfestem + 2);
    p.glut = Math.min(50, state.glut + 2);
    p.crave = Math.min(100, state.crave + 3);
    if (state.metZola) p.submission = Math.min(100, state.submission + 2);
    p.notice = 'Automatic now — half-asleep, full, the tray on the nightstand. −4 self-control · +2 self-esteem · +2 submission';
  }
  if (vibActive()) p.selfestem = Math.min(100, p.selfestem + 1);
  apply(p);
});

// ---------------------------------------------------------------------------
// Rock and snack — rocking in bed while eating, late-stage comfort.
// ---------------------------------------------------------------------------

AFTER['room:rock'] = '<p>You settle back against the pillows and let your hips find their rhythm — a slow, rocking sway that the bed has grown used to, the springs keeping time. Your hand moves between the tray and your mouth without a single decision attached, and the two motions braid together until you can’t tell them apart: rock, reach, bite, swallow, rock. The room is warm and close and full of the sound of you. Your belly settles deeper into your lap with every bite, and a low, contented hum rides under your breath. You don’t want to stop. You’re not sure you could if you wanted to.</p>';

addAction('room:rock', function (){
  if (state.glut < 2 && cravingLevel() < 2 && !lazy()){
    apply({ notice: 'Your belly is too empty to find the rhythm. You need something in it first.', lastScene: '', screen: 'room' });
    return;
  }
  const p = {
    glut: Math.min(50, state.glut + 1),
    selfcontrol: Math.max(0, state.selfcontrol - 2),
    selfestem: Math.min(100, state.selfestem + 1),
    crave: Math.min(100, state.crave + 1),
    clock: clockPlus(0.5),
    lastScene: 'room:rock',
    notice: 'You rock and snack. Stomach +1 (now ' + fullnessAt(state.glut + 1) + ') · −2 self-control · +1 self-esteem',
    screen: 'room'
  };
  if (state.metZola) p.submission = Math.min(100, state.submission + 1);
  apply(p);
});

// ---------------------------------------------------------------------------
// Night fridge run — at high craving, food pulls you out of bed while you
// sleep. sleep:go routes to the fridge-night screen when the trigger fires;
// the effect converts overnight like any meal.
// ---------------------------------------------------------------------------

function fridgeNightTrigger(){
  if (state.fridgeNightDay === state.day) return false;
  if (state.lbs < 200) return false;
  const c = cravingLevel();
  if (c >= 3) return true;
  if (c >= 2 && state.glut <= 1) return true;
  return false;
}

const FRIDGE_NIGHT = [
  '<p>You tell yourself no, turn out the light, and make it halfway down the hall before hunger pulls you toward the kitchen. You move quietly through the dark, your breathing a little quicker than usual. There is more softness around your middle than there was at the start of the term. Your belly has begun to round outward, and it shifts slightly ahead of you as you walk. Your hips are fuller, and your thighs now touch near the top, brushing together with each step.</p><p>You stand in front of the open refrigerator and start eating. The cold light falls across your body as you reach for one thing and then another. You chew quickly, occasionally smacking your lips between bites. Your stomach gradually fills, making the soft curve of your belly more noticeable beneath your hand. You tell yourself you’re only having a few bites, but you keep reaching back for more.</p><p>Eventually the hunger begins to fade. You pause, breathe out, and swallow the last mouthful. Your belly feels warm and comfortably full. You wipe your mouth with the back of your hand, close the refrigerator, and start back toward the bedroom.</p><p>The walk is quiet and unhurried. Your hips sway slightly with each step, and your thighs brush together as you move. There is a little more weight to your body now, enough that you notice it in the way your belly shifts and your legs move against one another.</p><p>You reach the bed and sit down. Your hips settle into the mattress, and your rounded belly rests softly against your lap as you lean forward. You take a final breath, then lie back down, still feeling the warmth and fullness of the food in your stomach.</p>',
  '<p>You tell yourself no, turn out the light, and make it halfway down the hall before hunger pulls you toward the kitchen. You move more slowly now, breathing harder than the short walk should require. Your belly has become noticeably rounder and heavier, shifting slightly ahead of you with each step. Your hips are fuller, and your thighs brush together from the upper legs downward. The soft rolls at your sides move with each step, settling again after every shift of your weight.</p><p>You stand in front of the open refrigerator and start eating. The cold light falls across your body as you reach for one thing after another. You chew quickly, smacking your lips between bites, occasionally pausing for a deep breath. Your breasts feel heavier against your chest when you lean forward, while the softness around your waist jiggles with each movement.</p><p>You keep eating long after the first few bites. Your stomach gradually feels fuller and more distended beneath the rounded belly. You place a hand against it and feel the firm fullness underneath the soft outer layer. Another bite, another swallow, another quiet smack of your lips. Eventually you burp and pause, breathing heavily through your nose before reaching for another mouthful.</p><p>When you finally stop, your belly feels heavy and stretched with food. You wipe your mouth with the back of your hand and close the refrigerator. On the way back to your room, your hips sway more noticeably and your thighs rub together with each step. Your belly shifts in front of you, and the soft rolls around your waist jiggle as you walk.</p><p>You reach the bed and sit down carefully. Your hips settle into the mattress, and your rounded belly rests against your upper thighs as you lean forward. You let out a quiet burp, breathe deeply, and lie back. The mattress gives beneath your weight as you settle into place, your full stomach heavy beneath your hand.</p>',
  '<p>You tell yourself no, turn out the light, and make it halfway down the hall before hunger pulls you toward the kitchen. You move slowly through the dark, breathing heavily as you walk. Your belly is large and heavy now, a broad, rounded mass that shifts ahead of you with every step. Your thick thighs press firmly together as you walk, rubbing from the upper thighs downward. Your hips sway broadly from side to side, carrying much more weight than they did before. Behind you, your buttocks are large and heavy, wobbling noticeably with every step, the soft weight shifting from one side to the other a moment after your body moves.</p><p>You stand in front of the open refrigerator and start eating. The cold light falls across your body as you reach for one thing after another. Each movement sends visible ripples through the fat around your waist and belly. Your breasts shift heavily against your chest when you lean forward, while the folds at your sides jiggle and settle. You chew quickly, smacking your lips between mouthfuls, pausing only long enough to breathe before reaching for more.</p><p>You keep eating until your stomach feels increasingly full beneath the thick softness of your abdomen. Your belly pushes farther forward as it fills, heavy and rounded beneath your hand. You let out a deep burp, swallow, and continue for several more bites before finally stopping.</p><p>You wipe your mouth and close the refrigerator. The walk back toward the bedroom is slow and heavy. Your hips swing broadly with every step, your large buttocks wobbling from side to side behind you. The fat around your belly and waist jiggles continuously as you walk, while your thighs rub together with each stride. Your breathing is loud and heavy by the time you reach the bed.</p><p>You turn carefully and lower yourself onto the edge. Your broad hips spread against the mattress as you sit, and your heavy belly settles forward over your thighs. Your buttocks sink deeply into the bed, the soft weight shifting underneath you before coming to rest. You breathe hard, let out another small burp, and place both hands over your full, rounded stomach.</p>',
  '<p>You tell yourself no, turn out the light, and make it only halfway down the hall before hunger pulls you toward the kitchen. Your breathing is already heavy from the short walk. Your belly has become a large, heavy mass, round and soft beneath your hand as it shifts ahead of you. Your hips are broad and heavily padded with lard, and your thick thighs press together with every step.</p><p>Behind you, your ass has grown enormous. The heavy flesh wobbles broadly from side to side as you walk, shifting a moment behind each movement. The fat around your hips and upper thighs moves along with it, creating thick folds that jiggle with every footfall.</p><p>You stand in front of the open refrigerator and start eating. The cold light falls across your body as you reach for one thing after another. You chew quickly, smacking your lips between mouthfuls. Your breasts shift heavily against your chest whenever you lean forward, while the rolls of lard around your waist and belly jiggle each time you move.</p><p>You keep eating until your stomach feels tight and heavy. Your belly pushes farther forward as it fills, its soft weight settling lower over your thighs. You place a hand against it and feel the fullness beneath the layer of fat. A deep burp escapes, followed by another mouthful. You keep eating until you finally have to stop and breathe.</p><p>You wipe your mouth and close the refrigerator. The trip back to the bedroom is slow. Your hips swing heavily from side to side, and your enormous ass wobbles behind you with every step. Your belly sways in front, while thick rolls of lard around your waist and sides jiggle continuously. Your thighs rub together throughout the walk, and your breathing grows louder with the effort.</p><p>You reach the bed and turn carefully before lowering yourself onto the edge. Your broad hips spread against the mattress, and your enormous ass sinks deeply into it, wobbling once more as your weight settles. Your belly drops forward over your thighs, forming several soft folds.</p><p>You sit there breathing heavily, one hand resting on your full stomach. You let out another burp, smack your lips, and slowly lean back, feeling the weight of your belly, hips, thighs, and massive ass settle into the mattress around you.</p>',
  '<p>You tell yourself no, turn out the light, and make it halfway down the hall before the hunger pulls you toward the kitchen. You move slowly through the dark, breathing heavily as you walk. Your large belly shifts ahead of you with each step, while your thick thighs press and rub together. Behind you, your heavy buttocks wobble from side to side, the soft flesh moving a moment after the rest of your body.</p><p>You stand in front of the open refrigerator and eat. The cold light falls across your body as you reach for one thing after another. Each movement makes the rolls around your waist and belly jiggle, while the weight of your breasts shifts against your chest. You chew quickly, smacking your lips between mouthfuls. After several bites, you burp quietly and continue eating.</p><p>You keep going until your stomach feels increasingly full beneath the heavy folds of your belly. Your breathing grows deeper and heavier. When you finally stop, you wipe your mouth and take another breath, your lips still working slightly from the last bite.</p><p>You close the refrigerator and turn toward the bedroom. Your body sways with each step. Your belly moves from side to side, the fat around your waist and hips jiggling with every footfall. Your buttocks wobble heavily behind you, with cellulite dimpling the skin across their rounded surface. Your thighs rub together as you walk, and the soft folds around your abdomen shift and settle with each movement.</p><p>By the time you reach the bed, you are breathing heavily. You pause, swallow, and burp again before lying down. Your belly settles heavily against your thighs as you lower yourself, while the rest of your weight follows and gradually comes to rest.</p>',
  '<p>You tell yourself you should go back to bed, but the hunger pulls you toward the kitchen. Even the short distance feels exhausting now. You move slowly, breathing heavily, your enormous belly shifting in front of you with every step. Your hips sway beneath the weight of your body, and your thighs press together as you walk.</p><p>By the time you reach the refrigerator, you’re already winded. Standing still is difficult enough that you’ve prepared for this. Two sturdy chairs sit side by side in front of the open refrigerator, close enough that you can reach the shelves without having to get up.</p><p>You lower yourself onto them carefully. The chairs creak sharply under your weight as your enormous hips descend. Your massive ass spreads across both seats, spilling over the edges on either side. Thick folds of fat settle around the chair backs and beneath your thighs, and your belly drops heavily into your lap.</p><p>You leave the refrigerator open and begin eating. You reach forward, take food, and bring it back without having to stand. Your breathing remains heavy between mouthfuls. You chew slowly now, smacking your lips before swallowing, then reach forward again.</p><p>Your enormous belly shifts whenever you lean toward the refrigerator. Rolls of lard around your waist compress against one another, while the fat across your hips and ass jiggles each time you move. Your breasts rest heavily against your upper belly. A deep burp escapes after several mouthfuls, but you simply reach for more.</p><p>You continue eating from the chairs, barely moving except to reach into the refrigerator. The seats creak whenever you shift your weight. Your huge ass spreads farther across them, soft flesh pressing over the edges, while your thighs remain planted heavily beneath your belly.</p><p>Eventually you close the refrigerator and sit there catching your breath. Your stomach is enormously full, pushing outward beneath the weight of your belly. You rest both hands against it and let out another long burp.</p><p>Getting back to bed can wait. For now, the chairs hold your weight, the refrigerator is within arm’s reach, and you have no reason to stand.</p><p>You finally decide to get up. It takes several attempts. You plant your feet beneath you, brace both hands against the chairs, and push. The chairs creak as your enormous weight shifts forward. Your belly hangs heavily in front of you, your thighs spread beneath it, and your massive ass lifts slowly from the seats before you manage to stand.</p><p>You remain there for several seconds, breathing hard. Your body wobbles as you find your balance. The fat around your hips and belly shifts in waves, and your enormous ass settles heavily behind you. You reach back into the refrigerator before leaving, grabbing several snacks and holding them against your belly.</p><p>The walk back to the bedroom is slow and unsteady. You waddle from one step to the next, breathing heavily. Your enormous belly swings in front of you, while your hips sway broadly beneath it. Your massive ass wobbles from side to side with every step, the heavy flesh shifting and settling after each movement. Rolls of lard around your waist and sides jiggle continuously as you walk.</p><p>You eat as you go. You tear open one of the snacks, chew between breaths, and smack your lips before swallowing. A burp escapes, but you keep moving and reach for another bite. Your thighs rub together with every step, and your belly continues to sway heavily in front of you.</p><p>By the time you reach the bedroom, you’re breathing hard. You stop beside the bed, brace yourself against it, and slowly lower your weight onto the mattress. Your enormous ass spreads across the bed as you sit, sinking deeply into it. Your belly drops heavily into your lap, covering much of your thighs.</p><p>You look down at the remaining snacks in your hands. You eat those too. Sitting there, you chew slowly, smacking your lips between bites while your breathing gradually settles. Another deep burp escapes after you swallow.</p><p>Only when the food is gone do you finally lie back. Your massive body sinks into the mattress, your belly spreading heavily across your middle while your hips and enormous ass settle into the bed. You take several deep breaths, close your eyes, and remain there beneath the full weight of your body.</p>',
  '<p>You finally make it to the kitchen, but the effort leaves you exhausted. Your enormous body moves slowly through the doorway, your belly projecting far in front of you and your hips spreading broadly from side to side. Your thighs press together with every step, while your massive buttocks sway and wobble heavily behind you. By the time you reach the refrigerator, you’re breathing hard and need to stop before you can do anything else.</p><p>Three sturdy chairs have been positioned together in front of the refrigerator. You lower yourself onto them carefully. The chairs creak under your weight as your enormous hips spread across the seats. Your massive ass spills over the edges and presses around the chair backs, while your belly settles heavily across your thighs. Thick rolls of fat gather around your waist, sides, and back.</p><p>You leave the refrigerator open and begin eating. You barely have to move; everything is within reach. You take one bite after another, chewing slowly between heavy breaths. Your lips smack softly as you eat. After several mouthfuls, you let out a deep burp and continue reaching for more.</p><p>Your proportions are immense now. Your belly forms a huge rounded mass extending far forward, while your hips and ass are extraordinarily broad behind you. Your thighs are enormous, pressed together beneath the weight of your abdomen. The fat around your waist forms multiple deep rolls that shift whenever you lean forward. Cellulite covers the broad surfaces of your hips, buttocks, and thighs.</p><p>You continue eating until your stomach is painfully full. Your breathing becomes slower and heavier, and you lean back against the chairs. Another burp escapes as you rest both hands over your enormous belly.</p><p>For several minutes you remain there, too exhausted to move. Eventually your eyes begin to close. The refrigerator light remains open beside you while your head drops forward and your breathing becomes slow and heavy. You slip into a deep, food-heavy sleep right there across the three chairs, your enormous body settled across the seats and your belly resting heavily in your lap.</p><p>You wake several hours later with a loud burp, blinking slowly as you come back to awareness. Your body feels heavy and sluggish after the long sleep. Your enormous belly rests heavily across your middle, while your hips and massive ass remain spread across the three chairs.</p><p>Before you even think about getting up, you reach toward the refrigerator again. Hunger takes over almost automatically. You grab something and eat while still sitting, chewing slowly and smacking your lips between bites. Another burp escapes, and you reach for more.</p><p>Eventually you decide to stand. You plant your feet beneath you and push against the chairs, but your first attempt fails. You sit back down, breathing hard. On the second attempt you get halfway upright before losing your balance and dropping back onto the seats. You rest for a moment, take several deep breaths, and try again.</p><p>The third attempt works. You push yourself upright and remain standing, swaying slightly while you catch your breath. Your enormous belly hangs heavily in front of you, your thighs press together beneath it, and your massive ass shifts behind you as you find your balance.</p><p>Before leaving the kitchen, you grab a large bag of snacks. You hold it against your belly and begin the long walk back toward your room.</p><p>You waddle slowly down the hall. Each step makes your huge belly sway and the fat rolls around your waist jiggle. Your hips move broadly from side to side, while your enormous ass wobbles heavily behind you. You breathe hard with every few steps, stopping once to steady yourself against the wall.</p><p>Halfway to your room, you reach a bench and lower yourself onto it. The bench creaks as your enormous hips settle onto the seat. Your ass spreads heavily across the surface, and your belly drops into your lap. You open the bag of snacks immediately and begin eating again.</p><p>You chew between heavy breaths, smacking your lips and occasionally burping. Crumbs collect across the folds of your belly as you eat. After several minutes, you force yourself back to your feet and continue toward your room, still carrying the bag.</p><p>When you finally reach the bedroom, you turn and lower yourself onto the bed. Your massive ass sinks deeply into the mattress, and your belly settles heavily across your thighs. You keep eating instead of lying down, taking handful after handful from the bag while your breathing gradually slows.</p><p>Eventually the bag is nearly empty. You let it fall beside you, surrounded by discarded wrappers and crumbs. You lie back, your enormous belly rising and falling with each slow breath. Another quiet burp escapes as your eyes close.</p><p>Within minutes, you are asleep again, sprawled across the bed with empty wrappers scattered around you and the remaining snacks within reach.</p>'
];

AFTER['fridge-night'] = function (){
  const w = state.lbs;
  if (w < 250) return FRIDGE_NIGHT[0];
  if (w < 300) return FRIDGE_NIGHT[1];
  if (w < 350) return FRIDGE_NIGHT[2];
  if (w < 400) return FRIDGE_NIGHT[3];
  if (w < 550) return FRIDGE_NIGHT[4];
  if (w < 700) return FRIDGE_NIGHT[5];
  return FRIDGE_NIGHT[6];
};

// ---------------------------------------------------------------------------
// Grazing toggle.
// ---------------------------------------------------------------------------

addAction('room:grazing', function (){
  if (state.grazing){
    if (state.selfcontrol < 40){
      apply({ notice: 'You mean to stop — and your hand finds the tray anyway, mid-thought, like it never heard you. The grazing doesn’t stop. It just waits for you to stop pretending.', lastScene: '', screen: 'room' });
      return;
    }
    apply({ grazing: false, selfcontrol: Math.max(0, state.selfcontrol - 2), notice: 'You push the tray to the far edge of the table and tell yourself that’s it. −2 self-control', screen: 'room' });
    return;
  }
  apply({ grazing: true, selfcontrol: Math.max(0, state.selfcontrol - 4), notice: 'The tray stays by you now. −4 self-control', screen: 'room' });
});

// ---------------------------------------------------------------------------
// Zola calls — at night, she phones and talks you toward the tray.
// ---------------------------------------------------------------------------

function zolaCallPanel(){
  if (!state.metZola) return '';
  if (state.zola < 50) return '';
  if (wTier(state.lbs) < 4) return '';
  if (clockHour() < 19) return '';
  if (state.zolaCallDay === state.day) return '';
  const here = state.screen;
  return `
    <div class="panel">
      <p>Your phone buzzes, and it’s Zola’s name — a picture of her eating, sticky-fingered and delighted. She calls you every evening now, and the voice on the other end is warm and certain and always hungry. “Sweet thing. You eaten tonight? Tell me you’ve eaten.” You hear a low hum behind her voice, the sound of her finishing something. “Good. Now go back and get more — I want to hear you happy in the morning.” It isn’t a suggestion. It’s the warmest thing you’ll hear all day.</p>
      <div class="actions">${btn('Let her talk you into the tray', 'zola:call', here)}</div>
    </div>`;
}

AFTER['zola:call'] = '<p>You stay on the phone with her the whole time. She eats while she talks, and you eat while you listen — two girls on a call, both chewing, neither of them pretending to be anywhere else. “That’s it,” she hums, hearing the rhythm of your jaw. “Good girl. One more bite for me.” The tray empties. She’s still talking. You’re still chewing. By the time she says goodnight — soft, satisfied, already half-asleep on her own full stomach — your belly is warm and heavy and the craving is quiet, and you hang up feeling like the whole campus just approved of you.</p>';

addAction('zola:call', function (arg){
  apply({
    zolaCallDay: state.day,
    zola: Math.min(100, state.zola + 5),
    submission: Math.min(100, state.submission + 2),
    selfcontrol: Math.max(0, state.selfcontrol - 3),
    selfestem: Math.min(100, state.selfestem + 2),
    crave: Math.min(100, state.crave + 3),
    glut: Math.min(50, state.glut + 1),
    lastScene: 'zola:call',
    notice: 'Zola talked you into the tray. +5 approval · −3 self-control · +2 self-esteem · +2 submission',
    screen: arg || 'room'
  });
});

// ---------------------------------------------------------------------------
// Room integration: extra activities and flavor lines.
// ---------------------------------------------------------------------------

function roomIndulgeMenu(){
  const lvl = cravingLevel();
  let html = '';
  if (state.glut >= 2 || lvl >= 2 || lazy()) html += btn('Rock and snack — slow, warm, easy', 'room:rock');
  html += btn(releaseLabel(), 'room:release');
  if (grazingUnlocked()){
    html += state.grazing
      ? btn('Stop grazing — try to', 'room:grazing')
      : btn(pcCorrupt() ? 'Grazing — just let the tray stay by you' : 'Start grazing — eat without deciding', 'room:grazing');
  }
  if (!html) return '';
  return '<h3>Indulgence</h3><div class="actions">' + html + '</div>';
}

function roomIndulgeFlavor(){
  let out = '';
  const cl = cravingRoomLine();
  if (cl) out += cl;
  const sl = sweatRoomLine();
  if (sl) out += sl;
  if (state.grazing) out += grazingLine();
  const zp = zolaCallPanel();
  if (zp) out += zp;
  const sp = roomSkinPanel();
  if (sp) out += sp;
  return out;
}

// ---------------------------------------------------------------------------
// Class integration: eating during lecture and dozing off.
// ---------------------------------------------------------------------------

function classIndulgeButtons(){
  const s = classStage();
  const lvl = cravingLevel();
  const eat = [
    { l: 'Eat a granola bar during the lecture', g: 1, sc: 1, c: 1 },
    { l: 'Snack during the lecture', g: 2, sc: -1, c: 2 },
    { l: 'Eat a tray during the lecture', g: 3, sc: -2, c: 3 },
    { l: 'Eat with the room', g: 4, sc: -3, c: 4 }
  ][s];
  const dozeOk = state.glut >= 2 || lvl >= 2 || lazy();
  let html = '<div class="actions">';
  if (state.classAte){
    html += btn('You already ate during this lecture', 'class:eat', null, true);
  } else {
    html += btn(eat.l, 'class:eat');
  }
  if (state.classDozed){
    html += btn('You already dozed off once', 'class:doze', null, true);
  } else {
    html += btn(dozeOk ? 'Doze off and wake up fed' : 'Doze off — you’re too awake', 'class:doze', null, !dozeOk);
  }
  html += '</div>';
  return html;
}

AFTER['class:eat'] = function (){
  const s = classStage();
  const t = wTier(state.lbs);
  if (s === 0){
    if (t <= 1) return '<p>You unwrap the granola bar under the desk and eat it in careful, quiet bites, eyes on the board, like it’s nothing. The professor never notices — or pretends not to. It’s a small, private hunger, and you feed it and sit up a little straighter. One bar. That was the whole of it. That was manageable.</p>';
    if (t <= 4) return '<p>You unwrap the granola bar under the desk and eat it in careful bites, eyes on the board. The professor never notices — or pretends not to. One bar, gone in four mouthfuls, settling into a belly that’s started to expect more than it used to. It’s a small, private hunger, and you feed it and sit up a little straighter — but your hand is already thinking about the next thing, and the next thing is already thinking about you.</p>';
    return '<p>You unwrap the granola bar under the desk and eat it in two bites, quiet as you can make it — a formality, against the size of the hunger sitting in your body. The professor never notices, or pretends not to. One bar at your size is nothing; it goes down like a penny into a fountain. You sit up as straight as the seat lets you and wait for the real food to find you, and you know it will, because it always does.</p>';
  }
  if (s === 1){
    if (t <= 1) return '<p>You eat during the lecture now — a snack from your bag, then the one the girl next to you hands over without being asked. The professor talks over the sound of it, and nobody looks up. It’s normal here. That’s the strange part: it’s so normal that your hand finds the next thing without you deciding, and the hour passes in a low, comfortable haze of bites.</p>';
    if (t <= 4) return '<p>You eat during the lecture now — a snack from your bag, then the one passed over without being asked, and then the tray that shows up at the edge of your desk like it has a standing order. The professor talks over the sound of it, and nobody looks up. It’s normal here. That’s the strange part: it’s so normal that your hand finds the next thing without you deciding, and by the end the snack is a memory and the tray is half-gone and the hour has passed in a low, comfortable haze of bites.</p>';
    return '<p>You eat during the lecture now — not a snack, a tray, and nobody so much as glances. The professor talks over the sound of your chewing, and the girl beside you reaches across to help you with the far side of the tray, because there’s more of you to feed now and everyone can tell. It’s normal here. That’s the strange part: it’s so normal that your hand finds the next thing without you deciding, and the tray is gone before the hour is, and the empty comes back like a tide.</p>';
  }
  if (s === 2){
    if (t <= 1) return '<p>The tray arrives on the desk beside your notebook and you eat through it without missing a word of the lecture — or missing the point of the lecture, which is that this is what class is for now. Around you, a third of the room eats through trays of their own, and the low hum under the professor’s voice isn’t the heating system. You finish, and the tray is replaced before you’ve quite decided you were done.</p>';
    if (t <= 4) return '<p>The tray arrives on the desk beside your notebook and you eat through it without missing a word of the lecture — or missing the point of the lecture, which is that this is what class is for now. Your belly fills warm and heavy against the desk edge, and a low satisfied hum runs under the professor’s voice, and it takes you a moment to realize it’s coming from you. You finish, and the tray is replaced before you’ve quite decided you were done — and you weren’t.</p>';
    return '<p>The tray arrives on the desk beside your notebook and you eat through it without missing a word of the lecture — or missing the point of the lecture, which is that this is what class is for now. You eat the way the biggest ones eat: steadily, unhurried, the tray vanishing into a body that’s built a real appetite. Your belly presses warm against the desk edge, and the hum under the professor’s voice is half the room and half you. The tray is replaced before you’ve quite decided you were done, and you weren’t, and it knows.</p>';
  }
  if (t <= 1) return '<p>You eat with the room — all of you, together, a steady rhythm of jaws and trays and low, pleased sounds that has long since become the lecture’s real soundtrack. The professor talks through it, and you eat through it, and by the end you’re not sure which one of you was teaching and which was learning, or why it ever mattered. You’re lighter than most of them, still eating at a human pace, and it takes you a moment to realize how unusual that makes you in here.</p>';
  if (t <= 4) return '<p>You eat with the room — all of you, together, a steady rhythm of jaws and trays and low, pleased sounds that has long since become the lecture’s real soundtrack. The professor talks through it, and you eat through it, and by the end you’re not sure which one of you was teaching and which was learning, or why it ever mattered. Your belly is heavy and warm and the seat takes all of you, and the tray is already empty and already being replaced.</p>';
  return '<p>You eat with the room — all of you, together, a steady rhythm of jaws and trays and low, pleased sounds that has long since become the lecture’s real soundtrack. The professor talks through it, and you eat through it, and by the end you’re not sure which one of you was teaching and which was learning, or why it ever mattered. You eat until the tray is gone and the replacement is gone, your belly a warm, heavy shelf against the desk, and the scooter seat takes the whole weight of you without complaint. This is what class is for now. You’ve never been better at anything.</p>';
};

AFTER['class:doze'] = function (){
  const s = classStage();
  const t = wTier(state.lbs);
  if (s === 0){
    if (t <= 1) return '<p>Your head dips once, twice — and then the lecture is over and there’s a piece of fruit on your desk that wasn’t there before. You must have slept through most of it. Nobody woke you. Nobody cared. You wake a little foggier, a little slower, and the walk out takes a breath longer than it should.</p>';
    if (t <= 4) return '<p>Your head dips once, twice — and then the lecture is over and there’s a piece of fruit on your desk that wasn’t there before, set down quiet by a drone that’s already gone. You must have slept through most of it, belly rising and falling slow against the desk edge, nobody waking you, nobody caring. You wake a little foggier, a little heavier in the seat than you remember sitting down, and the walk out takes a breath longer than it should.</p>';
    return '<p>Your head dips once, twice — and then the lecture is over and there’s a tray on your desk that wasn’t there before, already half-eaten. You must have slept through most of it, eating in your sleep, the way your body does now. Nobody woke you. Nobody would. You wake a little foggier, your belly fuller than you remember it being, and the walk out takes a breath longer than it should — and the tray is already being replaced.</p>';
  }
  if (s === 1){
    if (t <= 1) return '<p>You doze off mid-lecture, head bobbing, and when you come back there’s a snack set down beside your elbow — a blue sample cup, still cool. You drink it without thinking, because it’s there and you’re groggy and it’s easier than deciding. You spend the rest of the class half-asleep and half-fed, and neither half minds.</p>';
    if (t <= 4) return '<p>You doze off mid-lecture, head bobbing, and when you come back there’s a snack set down beside your elbow — and a tray at the edge of your desk, already started. You eat without thinking, because it’s there and you’re groggy and it’s easier than deciding. You spend the rest of the class half-asleep and half-fed, your belly a little heavier against the desk than when you closed your eyes, and neither half minds.</p>';
    return '<p>You doze off mid-lecture, head bobbing, and when you come back there’s a tray on your desk and your hand is already reaching. You eat without thinking, because it’s there and you’re groggy and it’s easier than deciding — and your body finished most of it before you even surfaced. You spend the rest of the class half-asleep and half-fed, belly heavy and warm against the desk, and neither half minds, and the tray is replaced before the bell.</p>';
  }
  if (s === 2){
    if (t <= 1) return '<p>You fall asleep with the lecture humming around you, and you wake to a tray on your desk — placed there by a drone, which is already hovering away, patient. You eat it before you’re fully awake, mouth working in the comfortable dark behind your eyelids, and the food settles into you like a second, deeper sleep. The class ends. You’re not sure you were ever really in it.</p>';
    if (t <= 4) return '<p>You fall asleep with the lecture humming around you, and you wake to a tray on your desk — placed there by a drone, which is already hovering away, patient. You eat it before you’re fully awake, mouth working in the comfortable dark behind your eyelids, and the food settles into you like a second, deeper sleep. Your belly has gained a little weight while you slept — or it feels that way, pressed warm and heavy against the desk. The class ends. You’re not sure you were ever really in it.</p>';
    return '<p>You fall asleep with the lecture humming around you, and you wake to a tray on your desk — placed there by a drone, which is already hovering away, patient. You eat it before you’re fully awake, mouth working in the comfortable dark behind your eyelids, and the food settles into you like a second, deeper sleep. The tray is replaced before you’ve finished. The class ends. You’re not sure you were ever really in it, or whether it was ever about anything but this.</p>';
  }
  if (t <= 1) return '<p>The lecture runs itself. You doze, and a drone feeds you through it — bites at your mouth, a sip of something sweet, your jaw working without your head lifting, the low hum of the hall rocking you like the scooter seat beneath you. You surface at the bell, sticky and full, and the tray is already being cleared, and you can’t remember the last time a class asked anything of you at all. You’re still one of the smaller ones, and it surprises you how much that stands out in here.</p>';
  if (t <= 4) return '<p>The lecture runs itself. You doze, and a drone feeds you through it — bites at your mouth, a sip of something sweet, your jaw working without your head lifting, the low hum of the hall rocking you like the scooter seat beneath you. You surface at the bell, sticky and full, and the tray is already being cleared, and you can’t remember the last time a class asked anything of you at all.</p>';
  return '<p>The lecture runs itself. You doze, and a drone feeds you through it — bites at your mouth, a sip of something sweet, your jaw working without your head lifting, the scooter seat creaking under the whole of you, the low hum of the hall rocking you. You surface at the bell, sticky and full and enormous, and the tray is already being cleared, and you can’t remember the last time a class asked anything of you at all. It hasn’t. It won’t. That’s the point.</p>';
};

addAction('class:eat', function (){
  if (state.classAte){
    apply({ notice: 'You already ate during this lecture. There’s only so much one class can hold.', lastScene: '', screen: 'class' });
    return;
  }
  const s = classStage();
  const eat = [
    { g: 1, sc: 1, c: 1 },
    { g: 2, sc: -1, c: 2 },
    { g: 3, sc: -2, c: 3 },
    { g: 4, sc: -3, c: 4 }
  ][s];
  const p = {
    glut: Math.min(50, state.glut + eat.g),
    selfcontrol: Math.max(0, Math.min(100, state.selfcontrol + eat.sc)),
    crave: Math.min(100, state.crave + eat.c),
    clock: clockPlus(0.25 + s * 0.25),
    classAte: true,
    lastScene: 'class:eat',
    notice: 'You eat during the lecture. Stomach +' + eat.g + ' (now ' + fullnessAt(state.glut + eat.g) + ') · ' + (eat.sc >= 0 ? '+' : '') + eat.sc + ' self-control · +' + eat.c + ' craving',
    screen: 'class'
  };
  if (s >= 2) p.sweat = sweatGain(5);
  apply(p);
});

addAction('class:doze', function (){
  if (state.classDozed){
    apply({ notice: 'You already dozed off this lecture. There’s nothing left of it to sleep through.', lastScene: '', screen: 'class' });
    return;
  }
  if (state.glut < 2 && cravingLevel() < 2 && !lazy()){
    apply({ notice: 'You’re too awake — the last meal was a while ago, and the lecture has your attention, for now.', lastScene: '', screen: 'class' });
    return;
  }
  const s = classStage();
  const g = s >= 2 ? 2 : 1;
  const p = {
    glut: Math.min(50, state.glut + g),
    selfcontrol: Math.max(0, state.selfcontrol - 2),
    selfestem: Math.min(100, state.selfestem + 1),
    crave: Math.min(100, state.crave + (s >= 2 ? 2 : 1)),
    sweat: sweatGain(5),
    clock: clockPlus(1),
    classDozed: true,
    lastScene: 'class:doze',
    notice: 'You doze and wake fed. Stomach +' + g + ' (now ' + fullnessAt(state.glut + g) + ') · −2 self-control · +1 self-esteem',
    screen: 'class'
  };
  apply(p);
});

// ---------------------------------------------------------------------------
// Overnight drift — called from doSleep. Mutates the overnight patch `p`.
// ---------------------------------------------------------------------------

function craveOvernight(p){
  const lines = [];
  if (state.glut > 0){
    p.crave = Math.min(100, state.crave + 3);
    if (state.crave >= 70) lines.push('You dream of trays — endless, warm, one after another, and you wake mid-bite into a pillow.');
  } else {
    if (state.crave >= 40){
      p.crave = Math.max(0, state.crave - 3);
      p.selfestem = Math.max(0, state.selfestem - 2);
      p.selfcontrol = Math.max(0, state.selfcontrol - 2);
    if (state.crave >= 70){
      lines.push('You slept badly — a low, pressing hunger under everything, your hand reaching for a nightstand that was empty, the fridge humming its quiet, patient note from down the hall. You wake restless and emptied out.');
      p.selfcontrol = Math.max(0, p.selfcontrol - 2);
    } else {
        lines.push('You slept badly — a low, pressing hunger under everything, your hand reaching for a nightstand that was empty. You wake restless and emptied out.');
      }
    } else {
      p.crave = Math.min(100, state.crave + 5);
      lines.push('You dream of the trays in the commons, and wake with your stomach hollow and your mouth already watering.');
    }
  }
  p.sweat = Math.max(0, state.sweat - 30);
  if (state.grazing){
    p.lbs = Math.round((p.lbs + 1) * 100) / 100;
    lines.push('You grazed half the night — your hand finding the nightstand tray without your head ever waking. The scale is not surprised.');
  }
  return lines;
}

// ---------------------------------------------------------------------------
// Skin health — softness and upkeep. Creams restore it; neglect lets it
// decline as the body outgrows itself.
// ---------------------------------------------------------------------------

function skinLabel(){
  const s = state.skin;
  if (s >= 90) return 'supple and soft';
  if (s >= 70) return 'soft and smooth';
  if (s >= 50) return 'healthy';
  if (s >= 30) return 'dry';
  return 'raw';
}

function skinTier(){
  const t = wTier(state.lbs);
  if (t >= 7) return 3;
  if (t >= 5) return 2;
  if (t >= 3) return 1;
  if (t >= 2) return 0;
  return -1;
}

const SKIN_MENU = [
  'Your skin is taut and clear — the kind of skin that doesn’t think about itself. There’s no reason to think about it now. You dab a little lotion on your elbows and call it done, the way you always have.',
  'Your skin is starting to notice the extra weight — the soft red lines where the band sits, the dry patch at the small of your back, the way the new stretch marks itch when you’re warm. Lotion helps. It’s not enough, but it helps.',
  'The deeper softness is changing your skin. It’s dry and hot where it folds, new marks itch under your clothes, and the creases go pink if you forget to tend them. You keep a bottle of lotion by the bed now, and you use it like you used to use a towel — as a matter of course.',
  'Your skin is an upkeep now. The folds go red and chafed without cream, the weight pulls at the soft under-skin until it burns, and every inch of you feels tender and enormous and worth tending. You’ve stopped pretending it isn’t something you need. It is. The cream is not optional anymore.'
];

function skinMenuLine(){
  const t = skinTier();
  return SKIN_MENU[Math.max(0, t)];
}

const SHO_AFTER = {
  basic: '<p>You work the lotion in slow circles — elbows, knees, the dry patch at your waistband — and the tightness eases. Your skin drinks it in and settles, smooth and ordinary, the way it did before any of this. It’s a small knot, and you’re a little surprised how much the room feels like yours again when it’s untied.</p>',
  tender: '<p>You are gentler than you used to be. There’s more of you to go over now, and the softness is tender in places — under the belly, between the thighs, where the new weight has creased and reddened. You work the cream in slowly, breathing through the sting, and the relief comes on like the room cooling down. You run your hands over the soft sweep of your hips and it doesn’t hurt anymore. It just feels like you.</p>',
  ritual: '<p>The ritual is longer every week. There is so much of you now that your arms ache by the end, reaching around the soft mountain of yourself to find every fold and pink line. You do it in sections, taking breaks to breathe, the way someone fields a much larger life. When it’s done you lie back, slick and smooth and humming, every inch of you soft and tended. Nobody needs to see it. You know what you are now — a body that needs care, and finally, one that takes it.</p>'
};

addAction('room:skin', function (){
  if (state.skinDay === state.day){
    apply({ notice: 'You already tended your skin today. The softness holds its sheen; the ritual can wait for tomorrow.', lastScene: '', screen: 'room' });
    return;
  }
  const t = skinTier();
  const stage = t >= 3 ? 'ritual' : t >= 1 ? 'tender' : 'basic';
  const p = {
    skin: Math.min(100, state.skin + 30),
    selfcontrol: t >= 1 ? Math.max(0, state.selfcontrol - 1) : state.selfcontrol,
    selfestem: Math.min(100, state.selfestem + (t >= 1 ? 2 : 1)),
    clock: clockPlus(0.5),
    skinDay: state.day,
    lastScene: 'room:skin',
    notice: 'You tend your skin. +30 softness · ' + (t >= 1 ? '−1 self-control · ' : '') + '+' + (t >= 1 ? 2 : 1) + ' self-esteem',
    screen: 'room'
  };
  if (t < 0) p.selfestem = Math.min(100, state.selfestem + 1);
  apply(p);
});

AFTER['room:skin'] = function (){
  return SHO_AFTER[skinTier() >= 3 ? 'ritual' : skinTier() >= 1 ? 'tender' : 'basic'];
};

function roomSkinPanel(){
  const t = skinTier();
  if (t < 0) return '';
  if (state.skinDay === state.day){
    return '<div class="panel"><p>' + skinMenuLine() + ' Your skin is already tended for today — soft and sheened, the ritual done.</p></div>';
  }
  const label = t >= 3 ? 'Tend your skin — the long ritual' : t >= 1 ? 'Lotion your softness — it’s getting chafed' : 'Take a moment with lotion';
  return '<div class="panel"><p>' + skinMenuLine() + '</p><div class="actions">' + btn(label, 'room:skin') + '</div></div>';
}
