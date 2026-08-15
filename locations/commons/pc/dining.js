'use strict';

const CROWD = [
  '<p>The dining commons is packed with first-years, bright and loud, trays clattering. Students move in quick lines, laughing, checking their phones between bites. Everyone here looks like everyone you left at home — ordinary, hungry. The air smells like oil and something sweet, thick enough to taste. Nobody in the room is paying it any mind.</p>',
  '<p>The commons is busy, the lines moving a little slower than they did the first week. There are more trays on the tables than before, more second trips to the vending machine. By the stairs, students hold little blue cups and drink, gulping down the thick liquid. Everyone seems to be having one. Nobody is reading the label.</p>',
  '<p>The commons feels fuller, even off-peak. Students take up more bench space than they did a month ago, hips spilling over the edges of the benches, bellies pressing against the table edges. Second helpings are the default now. The gym closed a while back, and nobody walks anywhere fast. The blue cups are everywhere, sitting drained at the edge of every tray.</p>',
  '<p>The dining hall has added chairs, then wider chairs, then benches with reinforcements. Some of the students are very big now — round, slow, their bellies bumping the tables as they shuffle between trays, their thighs rubbing together with each step. Nobody remarks on it. The vending machines hum at every corner, and the food keeps coming, and the app keeps recommending, and the room is full and quiet, and nobody in it is moving fast.</p>',
  '<p>Mobility scooters have started appearing in the commons — a low hum between the tables, students steering one-handed while they eat from a tray on the handlebars. The chairs have arms now, and the tables sit farther apart to let the scooters through. Students sit for hours, phones glowing, trays refilling, their weight settled deep in the seats, and nobody walks more than a few steps at a time anymore. The hall is quieter than it used to be.</p>',
  '<p>The commons is serviced by drones now — low silver trays drifting between the tables, setting down beside the seated, waiting to be emptied. Most students barely lift their hands; they eat with their eyes on their phones, jaws working, crumbs gathering in the folds of their shirts, and the drones wait and take the empties away. The scooters are everywhere, charging in a row along the wall, and the air is warm with bodies and food and the low hum of machinery. Nobody gets up.</p>',
  '<p>Everyone in the commons is on a scooter now, or being fed where they sit. Drones move between the tables in a steady circuit, tipping cups to slack mouths, pressing food between parted lips, wiping crumbs from chins. Students stare at their phones, enormous and still, their weight pressing deep into the seats, and every so often one of them lets out a long, low burp and nobody looks up. The tables groan under the weight of them. The trays never stop. The food never stops. The hall is warm with bodies and the steady hum of eating.</p>'
];

function mealLabels(phase){
  const band = bandWorn();
  if (phase >= 3) return {
    light: lazy() ? 'Light plate — whatever (15 cr)' : 'Light — a small plate (15 cr)',
    medium: lazy() ? 'Medium — fine, whatever (40 cr)' : 'Medium — all-you-can-eat (40 cr)',
    heavy: lazy() ? 'Heavy — sure, whatever (90 cr)' : (band ? 'Heavy — the app’s recommendation (90 cr)' : 'Heavy — the recommended order (90 cr)')
  };
  if (phase === 2) return {
    light: 'Light — a small plate (15 cr)',
    medium: 'Medium — the standard tray, seconds included (40 cr)',
    heavy: band ? 'Heavy — the app’s recommendation, seconds included (90 cr)' : 'Heavy — the recommended order, seconds included (90 cr)'
  };
  if (phase === 1) return {
    light: 'Light — fruit and toast (15 cr)',
    medium: 'Medium — the standard tray (40 cr)',
    heavy: band ? 'Heavy — the app says everyone’s having one (90 cr)' : 'Heavy — the recommended order, everyone’s having one (90 cr)'
  };
  return {
    light: 'Light — fruit and toast (15 cr)',
    medium: 'Medium — the standard tray (40 cr)',
    heavy: band ? 'Heavy — the app’s recommendation (90 cr)' : 'Heavy — the recommended order (90 cr)'
  };
}

function dineOpen(opt){
  if (opt === 'light') return '<p>You pick the light option — a small plate of fruit, a piece of toast, a glass of juice. It is small against the spread of your palm. You make it last, and it is not enough, and your hand is already reaching for the next tray before you are done.</p>';
  if (opt === 'medium') return '<p>The medium tray is the standard one — protein, carbs, a side of something sweet, a dessert cup. You clear it without quite deciding to, your jaw working steadily, and the tray is already being collected before you’ve stopped chewing.</p>';
  if (opt === 'heavy'){
    if (state.day >= 14) return '<p>The recommended order arrives and there is a blue cup beside it — a free sample, everyone’s having one. You don’t read the label. You drink it, and it is sweet and thick, coating your throat, and the band chimes once on your wrist, and your tray is already half gone.</p>';
    return '<p>The recommended order arrives — more food than you’d have ordered, sized to you by the app. You don’t read it. You eat, your belly filling against the waistband, and the tray empties faster than it should, and the line is already moving toward second helpings.</p>';
  }
  return '';
}

function vibPortableFlavor(){
  if (!vibPortableActive()) return '';
  const eatScenes = ['eat:light','eat:medium','eat:heavy','eat:feast','eat:sample','eat:seconds','eat:block'];
  if (eatScenes.indexOf(state.lastScene) < 0) return '';
  return '<p>The portable vibrator runs hot and relentless the whole meal, stepping up the moment the first bite goes down and never letting go. You eat through a rolling, endless climax — jaw working around mouthful after mouthful, hips pressing into the seat as the waves keep coming, each swallow pushing you higher until you’re trembling against the table and still eating, still swallowing, the band on your wrist lighting up with every spasm. The girl across the aisle is trembling the same way, mid-bite, eyes shut. Nobody looks up.</p>';
}

function vibCommonsMates(){
  let out = '';
  const eatScenes = ['eat:light','eat:medium','eat:heavy','eat:feast','eat:sample','eat:seconds','eat:block'];
  if (eatScenes.indexOf(state.lastScene) < 0) return '';
  if (piperUsesVib() && !piperSlob()) out += '<p>Across the aisle, a low hum works under Piper’s side of the table, and her jaw slows with each wave — eyes half-closed, breath catching between mouthfuls, one hand pressed to the softness of her belly as she rides it out and keeps eating, the band on her wrist lighting up like it’s counting. She doesn’t hide it. She eats through it, and the tray empties, and nobody remarks.</p>';
  if (minaUsesVib() && !minaSlob()) out += '<p>At the end table, Mina’s chin lifts on a slow, private rhythm, her throat working around a swallow as a long, silent tremor runs through her — and she keeps eating, methodical, exact, eyes half-lidded, the band humming its approval between bites. She rides it out without changing expression, and the drone presses the next spoonful forward, and she takes it.</p>';
  return out;
}

const DINE_SCOOTER = [
  '<p>You ride into the commons on your scooter and don’t get off it. The seat takes the full settled weight of you low and steady, your belly resting heavy on your thighs, and a tray is fitted to the handlebars before you’ve stopped moving. You eat from it without lifting your hands much, your head bowed to the food, students at the tables around you eating from theirs. A drone refills your cup; another clears the empty tray. When you lean back, the seat holds the whole soft weight of you without a sound, and you eat like everyone else in the room — where you sit, without getting up.</p>',
  '<p>You don’t look for a table anymore. Your scooter hums down the wide aisle the commons has opened for it, and you stay on it — your enormous soft body spilling over the seat, thighs overflowing the edges, the heavy curve of your belly pressing against the tray fitted to the handlebars. Drones circle you, refilling your cup, wiping your chin, pressing a napkin into your slack grip, and you eat with your head bowed, jaw working, a low burp rolling out of you when the tray empties. The scooter settles deeper under your weight and carries the next one to you without being asked. Nobody looks up.</p>'
];

function dinePcScene(){
  const t = wTier(state.lbs);
  if (scooterActive() && t >= 5 && t <= 6) return DINE_SCOOTER[t - 5];
  const d = DINE_PC[t];
  return typeof d === 'function' ? d() : d;
}

function dineMateFlavor(npc, tierFlavor){
  if (!npcActive(npc)) return '';
  if (npcHere('commons').indexOf(npc) >= 0) return tierFlavor;
  const where = npcWhereName(npc);
  const name = npc === 'piper' ? 'Piper' : 'Mina';
  return '<p class="small">' + name + ' isn’t at this meal — she’s ' + where + '.</p>';
}

function dineScene(opt){
  return dineOpen(opt) + dinePcScene() + dineMateFlavor('piper', DINE_PIPER[piperTier(state.piperLbs)]) + dineMateFlavor('mina', DINE_MINA[minaTier(state.minaLbs)]) + zolaDineFlavor();
}

function vibCrowdFlavor(){
  if (!vibActive()) return '';
  return '<p>Around you, the commons hums with more than the machines. A girl across the aisle shifts in her seat, eyes half-closed, jaw slowing around a mouthful. Another, by the vending machine, leans into the counter and lets out a breath she didn’t mean to let out. Nobody looks up. Nobody remarks on it. The bands make sure of it — yours humming the same low note as theirs, all of you fed and quiet and full.</p>';
}

function dineBlockScene(){
  return '<p>You reach for the lighter tray and your hand stops an inch short. You are so hungry — a pressing, empty hunger low in your gut — and the heavier tray is already sliding into reach. Your hand closes around it, and the other one is already reaching for the fork.</p>';
}

addAction('eat:light', function (){
  if (state.selfcontrol < 60){ apply({ notice: 'You reach for the light tray and your hand refuses. You’re not that far gone yet — but you’re closer than you were.', lastScene: 'eat:block', screen: 'commons' }); return; }
  if (!canAfford(15)){ apply({ notice: 'Not enough credits for a light meal.', screen: 'commons' }); return; }
  apply({ credits: state.infCredits ? state.credits : state.credits - 15, glut: state.glut + 2, selfcontrol: state.selfcontrol + 2, selfestem: state.selfestem + (vibPortableActive() ? 1 : 0), crave: Math.min(100, state.crave + 1), clock: clockPlus(mealTime(2)), lastScene: 'eat:light', notice: 'Stomach +2 (now ' + fullnessAt(state.glut + 2) + '). Converts to ~' + (2 * STOMACH_LB_PER_UNIT).toFixed(1) + ' lbs tomorrow. +2 self-control · −15 cr · ~' + timeText(mealTime(2)) + ' eating' + (vibPortableActive() ? ' · the portable vibrator hums' : ''), screen: 'commons' });
});
addAction('eat:medium', function (){
  if (lazy()){ apply({ notice: 'The medium tray isn’t on the table anymore. The app has already ordered for you.', lastScene: 'eat:block', screen: 'commons' }); return; }
  if (!canAfford(40)){ apply({ notice: 'Not enough credits for a medium meal.', screen: 'commons' }); return; }
  apply({ credits: state.infCredits ? state.credits : state.credits - 40, glut: state.glut + 4, selfcontrol: state.selfcontrol - 0.5, selfestem: state.selfestem + (vibPortableActive() ? 1 : 0), crave: Math.min(100, state.crave + 2), clock: clockPlus(mealTime(4)), lastScene: 'eat:medium', notice: 'Stomach +4 (now ' + fullnessAt(state.glut + 4) + '). Converts to ~' + (4 * STOMACH_LB_PER_UNIT).toFixed(1) + ' lbs tomorrow. −0.5 self-control · −40 cr · ~' + timeText(mealTime(4)) + ' eating' + (bandWorn() ? ' · the band logs a success' : '') + (vibPortableActive() ? ' · the portable vibrator hums' : ''), screen: 'commons' });
});
addAction('eat:heavy', function (){
  if (!canAfford(90)){ apply({ notice: 'Not enough credits for the recommended order.', screen: 'commons' }); return; }
  const drop = state.day >= 14 ? 1.5 : 1;
  const sc = state.selfcontrol - drop;
  const extra = state.day >= 14 ? ' · blue sample included' : '';
  apply({ credits: state.infCredits ? state.credits : state.credits - 90, vending: state.day >= 14 ? true : state.vending, glut: state.glut + HEAVY_MEAL_UNITS, selfcontrol: sc, selfestem: state.selfestem + (vibPortableActive() ? 1 : 0), crave: Math.min(100, state.crave + 3), clock: clockPlus(mealTime(6)), lastScene: 'eat:heavy', notice: 'Stomach +6 (now ' + fullnessAt(state.glut + 6) + '). Converts to ~' + (HEAVY_MEAL_UNITS * STOMACH_LB_PER_UNIT).toFixed(1) + ' lbs tomorrow. −' + drop + ' self-control · −90 cr · ~' + timeText(mealTime(6)) + ' eating' + extra + (bandWorn() ? ' · the band logs a success' : '') + (vibPortableActive() ? ' · the portable vibrator hums' : ''), screen: 'commons' });
});
addAction('eat:feast', function (){
  if (!canAfford(90)){ apply({ notice: 'Not enough credits for a feast.', screen: 'commons' }); return; }
  const g = greaseStage();
  const target = state.capacity * 1.25;
  const sc = state.selfcontrol - (2 + g);
  apply({ credits: state.infCredits ? state.credits : state.credits - 90, glut: target, selfcontrol: sc, selfestem: state.selfestem + (vibPortableActive() ? 1 : 0), crave: Math.min(100, state.crave + 4), clock: clockPlus(mealTime(target)), lastScene: 'eat:feast', notice: 'Feast. Stomach full ' + fullnessAt(target) + ' (capacity ' + Math.round(state.capacity) + '). Converts to ~' + (target * STOMACH_LB_PER_UNIT).toFixed(1) + ' lbs tomorrow. −' + (2 + g) + ' self-control · −90 cr · ~' + timeText(mealTime(target)) + ' eating' + (vibPortableActive() ? ' · the portable vibrator hums' : ''), screen: 'commons' });
});
addAction('eat:water', function (){
  apply({ selfcontrol: state.selfcontrol + 10, clock: clockPlus(0.25), notice: '+10 self-control', screen: 'commons' });
});
addAction('eat:sample', function (){
  if (state.sampleUsed){ apply({ notice: 'The band’s sample for today is already used. It hums, satisfied anyway.', screen: 'commons' }); return; }
  apply({ sampleUsed: true, vending: true, glut: state.glut + 1, selfcontrol: state.selfcontrol - 3, selfestem: state.selfestem + (vibPortableActive() ? 1 : 0), crave: Math.min(100, state.crave + 1), clock: clockPlus(mealTime(1)), lastScene: 'eat:sample', notice: 'The blue sample is free. Once a day, says the band. Stomach +1 (now ' + fullnessAt(state.glut + 1) + ') · −3 self-control' + (vibPortableActive() ? ' · the portable vibrator hums' : ''), screen: 'commons' });
});
addAction('eat:seconds', function (){
  if (state.secondsUsed){ apply({ notice: 'The app has already sent your second tray today.', screen: 'commons' }); return; }
  apply({ secondsUsed: true, glut: state.glut + 2, selfcontrol: state.selfcontrol - 3, selfestem: state.selfestem + (vibPortableActive() ? 1 : 0), crave: Math.min(100, state.crave + 2), clock: clockPlus(mealTime(2)), lastScene: 'eat:seconds', notice: 'A drone sets a second tray down. Free — the one for today. Stomach +2 (now ' + fullnessAt(state.glut + 2) + ') · −3 self-control' + (vibPortableActive() ? ' · the portable vibrator hums' : ''), screen: 'commons' });
});

AFTER['eat:light'] = function (){ return dineScene('light'); };
AFTER['eat:medium'] = function (){ return dineScene('medium'); };
AFTER['eat:heavy'] = function (){ return dineScene('heavy'); };
AFTER['eat:block'] = function (){ return dineBlockScene(); };
function feastScene(){
  const t = wTier(state.lbs);
  let pc;
  if (t >= 7) pc = (scooterActive() || state.agrav)
    ? '<p>The drones bring tray after tray, and you eat through them all from the machine that carries you — hips spilling over the edges of the seat, belly resting on your thighs in front of you, the tray fitted to the handlebars. You lose count somewhere in the middle. You stop only when the food physically backs up against the top of your stomach, the robe riding high under the weight of it. When it’s finally done you sit heavy and quiet, the top of the belly distended against the fabric, and a low burp rolls out of you. The scooter settles deeper under your weight, and nobody in the room even looks up.</p>'
    : '<p>The drones bring tray after tray, and you eat through them all on the end bench, hips spilling over the edges of the seat, belly resting on your thighs in front of you. You lose count somewhere in the middle. You stop only when the food physically backs up against the top of your stomach, the waistband of the robe riding high under the weight of it. When it’s finally done you sit heavy and quiet, the top of the belly distended against the fabric, and a low burp rolls out of you. Nobody in the room even looks up.</p>';
  else if (t >= 5) pc = '<p>The feast arrives in stages — two trays, then a third, then the blue cup you don’t read the label on. You eat past the point of hunger, until the food starts backing up against the top of your stomach and each bite has to be pushed down. The waistband of your jeans has gone slack under the weight of your belly, the fabric hanging loose below the curve of it. The app chimes, and a drone glides over to take the empties. You let it.</p>';
  else pc = '<p>You order the feast — more than you’ve ever ordered in one sitting — and you eat every last bite of it, methodically, hungrily. The tray empties and a second one takes its place before you’ve fully stopped chewing. When you finally stop, your belly is round and pressed against the table edge, the waistband of your jeans digging a red line into the skin above your hips. A low burp comes up as you lean back, and the seat creaks under your weight.</p>';
  return pc + dineMateFlavor('piper', DINE_PIPER[piperTier(state.piperLbs)]) + dineMateFlavor('mina', DINE_MINA[minaTier(state.minaLbs)]) + zolaDineFlavor();
}
AFTER['eat:feast'] = function (){ return feastScene(); };
AFTER['eat:sample'] = function (){
  return '<p>The little blue cup is cold in your hand. You drink it without reading the label — sweet, thick, warm going down, a heavy heat settling in your stomach. Your wristband chimes approval. A student at the next table is holding hers the same way, lips parted, swallowing the last of it.</p>';
};
AFTER['eat:seconds'] = function (){
  return '<p>A drone settles a second tray beside you before you’ve asked. Your wristband lights up: “Looks like you could use a refuel. On the house.” You eat it, your belly swelling against the waistband with each bite, and your wristband hums, logging another success.</p>';
};

