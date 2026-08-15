'use strict';

const MAP_LOCS = { hub:1, room:1, commons:1, gym:1, library:1, mirror:1, 'zola-room':1, union:1, market:1, clinic:1, gate:1, bakery:1, park:1 };
const PLACE_NAMES = { hub:'the quad', room:'Room 217', commons:'the commons', gym:'the gym', library:'the library', mirror:'the dorm bathroom', 'zola-room':'Zola’s dorm', union:'the student union', market:'the market', clinic:'the clinic', gate:'the town gate', bakery:'the bakery', park:'the park' };
let travelTarget = '';

function travelFrom(cur, dest){
  return !!MAP_LOCS[dest] && (!!MAP_LOCS[cur] || cur === 'morning');
}

function travelHip(){
  const s = {
    rigid: 'Your jeans bite into the soft roll at your hip',
    active: 'Your running shorts press a red line into the roll at your hip',
    soft: 'Your leggings cling warm and tight to the heavy swell of your hips',
    baggy: 'Your joggers strain over the wide mass of your hips',
    robe: 'Your robe binds snug against the heavy spread of your hips'
  };
  const w = state.worn;
  return s[w] || s.rigid;
}

function travelWaist(){
  const s = {
    rigid: 'your belly a heavy, soft weight rolling over the waistband of your jeans',
    active: 'your belly a heavy, soft weight rolling over the waistband of your running shorts',
    soft: 'your belly a heavy, soft weight rolling over the waistband of your leggings',
    baggy: 'your belly a heavy, soft weight rolling over the waistband of your joggers',
    robe: 'your belly a heavy, soft weight straining against the belt of your robe'
  };
  const w = state.worn;
  return s[w] || s.rigid;
}

const TRAVEL_PACE = [
  [
    '<p>The walk is quick — a few minutes of easy stride across the quad, the path cool under your shoes, your bag light on your shoulder, your belly a soft, heavy weight rocking gently with each step. You’re at the far door before your hips have settled into their rhythm.</p>',
    '<p>You cross campus at a clip, your steps long and even, your chest rising and falling steadily. The paths are wide and flat under your shoes, and your thighs brush together lightly with every stride.</p>'
  ],
  [
    function (){
      return '<p>You walk a little slower now, your hips rolling a beat behind your steps. ' + travelHip() + ', your breath comes in shorter pulls, and you take the shortcut through the quiet hall to cut the distance down.</p>';
    },
    '<p>The walk is still easy, mostly, but your body feels it now — a heavier roll in your hips, the soft weight of your belly pressing against your waistband, each step landing a little more firmly than the last. You arrive slightly winded, your chest heaving in short, warm breaths.</p>'
  ],
  [
    function (){
      return '<p>The walk takes a little more out of you than it used to — a strain low in your back, a burn in your calves. Your thighs press together at the top when you move, ' + travelWaist() + ', and you take the slower, flatter route, your feet landing heavy and flat with each step.</p>';
    },
    '<p>You’re winded by the time you cross the quad — not badly, but your breath comes in quick, shallow pulls, your chest rising and falling under the soft weight of your breasts. You stop once to let a group pass, leaning your weight onto one hip, and swallow the heat out of your throat before you move on.</p>'
  ],
  [
    '<p>You waddle a little now — your hips swinging wide with each step, your belly rocking and settling against your thighs, the soft mass of your ass shifting heavily behind you. The soles of your shoes grind against the path, and the walk stretches out longer than your legs want to make it.</p>',
    '<p>You take the walk slow and steady, stopping at the bench halfway, sinking into the seat until the boards creak under your weight. When you push off again your knees groan and your belly hangs heavy and low over your waistband, swaying with each step. You arrive heavier and breathless, gripping the door frame until your breath comes back.</p>'
  ],
  [
    '<p>You walk in stages — a stretch, a rest on a bench, a stretch — your chest heaving, the soft mass of you swaying with every step. Each bench takes the full weight of you, the boards groaning as you settle and letting out a sigh as you push yourself up.</p>',
    '<p>You shuffle along the path, your feet sliding slow and flat, your ass swaying wide with each step, your belly bouncing softly under your shirt. Students on scooters part around you. By the time you reach the door your thighs are burning, and you grip the frame and wait for your breath to settle before you go in.</p>'
  ],
  [
    '<p>The walk takes real effort — hips grinding in their sockets, belly swinging low and heavy, breath coming in long, warm pulls. You lean on the railing at the first landing, then drop onto the bench at the second, the seat groaning as your weight sinks into it. Somewhere a scooter hums past and doesn’t wait.</p>',
    '<p>You move heavy and careful, winded within a hundred yards, your breath loud in your chest, your belly rolling against the tops of your thighs with each step. The path is smooth and gently sloped, and your shoes land flat and slow, the whole soft weight of you settling into each stride before the next one begins.</p>'
  ],
  [
    '<p>Crossing the quad is a slow, rolling shuffle — each step swinging your hips wide, your belly swaying heavy over your waistband, your thighs rubbing damp at the top. You grip the handrail at the underpass, lean your weight into your arms, and breathe until your chest settles. The scooter ranks hum at the corner, their seats polished and waiting.</p>',
    '<p>Each step is a settling — your weight shifting forward, your belly swinging and settling against your thighs, your breath pushing out in a hard puff. You rest twice, sinking onto benches that groan under you and shift as you rise. The soft roll over your waistband is damp with sweat by the time you reach the door.</p>'
  ],
  [
    '<p>This trip is proof of how much your body carries now. The walk is short stages and long breathers — the railing taking more of your weight than your legs do, your belly hanging heavy and low, swaying with every slow step. The scooter is right there at the curb, its seat worn smooth and waiting.</p>',
    '<p>You move in a slow, rolling shuffle, one heavy foot and then the other, your ass swaying wide and your belly bouncing against the strain of your shirt. By the time you reach the corner your breath is loud and your thighs are slick with sweat, and the rest of the way you lean into the steady hum of a scooter keeping pace beside you.</p>'
  ],
  [
    '<p>You don’t walk. You ride — the scooter slides under you mid-step, the seat dipping low under your weight, and the campus flows past as the machine hums along the path. Your belly rests in your lap, heavy and warm, swaying gently with the motion of the ride.</p>',
    '<p>You ride, and the seat holds your weight without a groan, and your hands rest on the soft roll of your belly as the machine carries you along. Your thighs press wide and warm against the seat, each breath lifting the heavy curve of your chest, and your feet dangle above the path as it rolls by underneath.</p>'
  ]
];

const TRAVEL_EVENTS = [
  [
    { minW: 0, txt: '<p>A first-year from your section waves from a bench, holding up a bag of pretzels. You split it, standing, your belly pressing warm and heavy against the waistband of your jeans. “Finals aren’t for months,” she says, “but the snacks don’t know that.” You chew standing, your weight settled onto one hip, the soft give of your stomach pressing into the fabric with each swallow.</p>' },
    { minW: 0, txt: '<p>A flyer peels off a board and lands at your feet: EAT WELL. FUEL WELL., with a smiley. You leave it on the path, stepping over it with a heavy stride that rolls your belly forward in your shirt. Somewhere a machine hums, waiting to be restocked.</p>' },
    { minW: 0, txt: '<p>A lost sock lies by the fountain, pale in the sun. You leave it where it is, standing with your weight on one hip, your chest heaving gently from the walk. The fountain gurgles on, and the soft roll of your belly presses warm and damp against the band of your jeans.</p>' }
  ],
  [
    { minW: 0, txt: function (){ return lazy()
      ? '<p>A vending machine beeps as you pass and a little blue cup drops into the tray, the plastic warm in your palm. You drink it walking, your belly swinging ahead of you with each heavy step. It’s sweet and cold on your tongue, and you swallow it down between warm breaths.</p>'
      : '<p>A vending machine spits out a free blue cup as you pass. You hold it, tilt it, read BLUEBERRY WELLNESS in tiny print, and drink it anyway, the cold sweetness rolling down your throat. You keep walking, your hips swaying wide, the cup empty in your hand before the next building.</p>'; } },
    { minW: 0, txt: '<p>A student passes with two trays, beaming. “The app recommended seconds,” she calls over her shoulder. “Free is free.” She is already a little rounder than she was in the brochure, and you watch the heavy sway of her hips as she moves on, your own weight settled deep in your shoes.</p>' },
    { minW: 180, txt: '<p>You pass the gym — still chained, still SOON. Behind the doors the machines stand in rows, dark and quiet, and your breath comes in warm, heavy pulls as you walk past without slowing.</p>' }
  ],
  [
    { minW: 0, txt: '<p>A drone descends as you walk, lowers a still-warm pastry into your hand, and rises without waiting. You eat it walking, the flaky layers sticking to your fingers, your belly swinging heavy ahead of you with each step. Crumbs settle on the front of your shirt, over the soft curve of your stomach.</p>' },
    { minW: 0, txt: '<p>You sit to catch your breath on a bench, your weight settling into the seat until the boards groan under you. Your belly folds into deep creases against your lap. When you stand, the wood keeps a warm, damp impression of you for a moment before it springs back.</p>' },
    { minW: 220, txt: '<p>Ahead of you, a heavy girl swings onto a scooter and it hums away, the seat dipping low under her and carrying her smooth. You watch the sway of her weight, then start walking again, your own hips rolling heavy with each step. You don’t follow. Not yet.</p>' }
  ],
  [
    { minW: 300, txt: '<p>An empty scooter hums beside the path, its seat worn smooth and warm. It keeps pace with you for a few feet, bobbing level with your heavy stride, then turns away and hums off down the path without you.</p>' },
    { minW: 0, txt: '<p>A drone drifts alongside and tips a cup toward you. You take it, the warmth seeping into your palm, and drink as you walk, the sweet liquid sliding down your throat in time with your heavy steps. The cup is empty by the time the drone peels away.</p>' },
    { minW: 260, txt: '<p>A student waves you over — the third tray is already out, an extra fork set in place. “I ordered for two,” she says, and her eyes are bright and soft and certain. You sit, the bench groaning under your weight, your belly settling forward over your thighs as you reach for the first forkful.</p>' }
  ],
  [
    { minW: 0, txt: '<p>A feeding drone paces you, spoon at the ready, and you eat without stopping, chewing to the rhythm of your heavy steps. It beeps and peels away to find the next mouth, and you swallow the last bite with your chest still heaving from the walk.</p>' },
    { minW: 0, txt: '<p>You stop to rest, sinking onto a bench that creaks under your weight, and a tray settles onto the seat beside you, still warm. No one claims it. You eat it where you sit, your belly pressing soft against your lap, the bench sagging lower under you with every swallow.</p>' },
    { minW: 300, txt: '<p>The scooters part around you. One slows, hovers at your side, its seat level with the widest part of your hips. The handles are warm from the last rider, and the seat is low and wide, and your weight shifts toward it as you stand there breathing.</p>' }
  ],
  [
    { minW: 0, txt: '<p>You don’t really walk now — you drift between machines, and the machines drift between you, and a drone meets your mouth at every corner. You eat as you go, your belly swinging heavy and low, your hips rolling wide with each slow step, each swallow settling another soft weight against the front of you.</p>' },
    { minW: 0, txt: '<p>A warm hand closes over yours — another student, huge and smiling, guiding you to a bench already groaning under its regulars. “Sit with us. There’s always room.” You sit, and the boards bend under the added weight, and your belly settles over your thighs, and the bench sags low under all of you.</p>' },
    { minW: 340, txt: '<p>A scooter slides under you mid-step and carries you the rest of the way, the seat taking your weight in a low, easy dip. Your belly rests heavy in your lap, swaying with the motion of the ride, and your thighs spread warm and wide against the seat as the machine hums you across the quad.</p>' }
  ]
];

function travelPace(t){
  const v = TRAVEL_PACE[t];
  const s = v[(Math.random() * v.length) | 0];
  return typeof s === 'function' ? s() : s;
}

function placeName(){
  return PLACE_NAMES[travelTarget] || 'your destination';
}

const SCOOTER_PACE = [
  '<p>The scooter carries your weight low and steady, its motor a low, even hum as it glides along the path. Your belly rests heavy in your lap, swaying with the motion, your thighs spread wide and warm against the seat, and the ground slides past under your feet without any effort from you.</p>',
  '<p>You ride, and the scooter takes the slope without slowing, the seat holding the full spread of you warm and level. Walking students step aside as you pass, and the soft mass of your belly jostles gently with every bump in the path, settling against your thighs.</p>'
];

const SCOOTER_EVENTS = [
  [
    { minW: 0, txt: '<p>You glide past the first-year with the pretzels, and she waves, and the bag lands in your lap, resting on the soft rise of your belly. “For the ride,” she says. You split it open on the move, crumbs settling in the fold of your shirt as the scooter hums on.</p>' }
  ],
  [
    { minW: 0, txt: '<p>A feeding drone matches your pace, tipping a warm cup toward your mouth, and you drink without stopping, the liquid warm all the way down. It peels off. The scooter hums on, your belly swaying heavy in your lap with every glide.</p>' }
  ],
  [
    { minW: 0, txt: '<p>Another scooter pulls up alongside, ridden by a girl so round she makes the machine look small, her belly resting heavy over the seat. “Yours is broken in,” she says, nodding at your seat. “You’ll know when it’s yours.” She glides ahead, and you watch the soft sway of her weight until she rounds the corner.</p>' }
  ],
  [
    { minW: 0, txt: '<p>You rest your hand on the warm controls and the scooter turns onto the shaded route without being asked — the long way, the way that passes the vending machines. The seat holds you low and easy, your belly swaying with each turn.</p>' }
  ],
  [
    { minW: 0, txt: '<p>The scooter carries you low and level, never dipping, never wobbling under the full weight of you. Halfway there, a drone settles a pastry into your hand and you eat it over your belly, crumbs sticking to the front of your shirt, the machine humming on beneath you.</p>' }
  ],
  [
    { minW: 0, txt: '<p>You don’t steer anymore. You sit back, your belly rising and falling with each slow breath, and the drone meets your mouth at the corner. The seat holds your weight low and warm, and the path unrolls beneath you without a single step from your legs.</p>' }
  ]
];

const AGRAV_PACE = [
  '<p>The anti-grav hums to life as you settle in, lifting you a hand’s width off the ground — no wheels, no jolt. The field holds your belly low and steady, cradling the full weight of you, and the campus glides past as you hang there, your feet dangling and swaying.</p>',
  '<p>You ride the anti-grav, and the field cradles the whole soft weight of you, your belly resting suspended, your breasts settled against it. There is no seat-bounce, no groan, no sway — just a low, steady hum, and your legs dangle weightless above the path, swinging slowly with the ride.</p>',
  '<p>The anti-grav holds you an inch off the ground, the field pressing soft and warm under your belly and thighs. It banks gently around the quad, and you hang there, your weight suspended, your arms resting on the soft curve of your stomach, the path gliding past under your dangling feet.</p>'
];

function scooterEvent(){
  const sev = eventSeverity();
  const pool = SCOOTER_EVENTS[sev].filter(function (e){ return state.lbs >= e.minW; });
  if (!pool.length) return '';
  const e = pool[(Math.random() * pool.length) | 0];
  return typeof e.txt === 'function' ? e.txt() : e.txt;
}

function scootRideScene(){
  let html = '<h2>Crossing campus</h2>';
  html += SCOOTER_PACE[(Math.random() * SCOOTER_PACE.length) | 0];
  const ev = scooterEvent();
  if (ev) html += ev;
  html += '<div class="actions">' + btn('Arrive at ' + placeName(), 'travel:go') + '</div>';
  return html;
}

function scootBreakScene(){
  return '<h2>Crossing campus</h2>' +
    '<p>The scooter gives a low groan as it takes the first slope, the frame flexing under the full weight of you. Then it happens mid-stroke: a sharp crack under the seat, a sag, and the machine folds beneath you, dumping you onto the grass in a heavy, soft heap. The scooter lies on its side, a single thin crack running through its frame. You broke a scooter. You broke it with your ass.</p>' +
    '<p>And then the drones arrive — three, five, a dozen, pouring in from around the buildings with the low hum of their rotors. Two lift the broken machine away, gripping its frame. One steadies your back, its prongs pressing gently into the softness. A feeding drone lowers a tray over your lap and tips the first spoonful toward your mouth, and you take it, chewing slowly as the warm food settles heavy in your stomach. You sit on the grass, eating while they work, your belly resting over your thighs in deep, damp folds.</p>' +
    '<p>It doesn’t take long. A repair drone beeps its assessment and trundles off. And then something new glides into the circle — lower, smoother, silent. No wheels. It floats a hand’s width above the grass, a soft band of light holding it up, and the seat cradles the spread of you as you settle onto it. It lifts you without a creak, the field pressing warm against your belly and thighs, holding the whole weight of you suspended. The hum is almost nothing.</p>' +
    '<p>“This is yours now,” the campus seems to say, and the machine turns toward your destination before you’ve moved, the field cradling your weight low and steady. Your feet hang above the grass, swinging gently, and your belly settles heavy and calm under the soft hold of the light.</p>' +
    '<div class="actions">' + btn('Ride the anti-grav to ' + placeName(), 'travel:go') + '</div>';
}

function eventSeverity(){
  const d = state.day;
  if (d <= 29) return 0;
  if (d <= 59) return 1;
  if (d <= 119) return 2;
  if (d <= 179) return 3;
  if (d <= 239) return 4;
  return 5;
}

function travelEvent(){
  const sev = eventSeverity();
  const chance = 0.4 + sev * 0.04 + Math.min(0.1, wTier(state.lbs) * 0.02);
  if (Math.random() >= chance) return '';
  const pool = TRAVEL_EVENTS[sev].filter(function (e){ return state.lbs >= e.minW; });
  if (!pool.length) return '';
  const e = pool[(Math.random() * pool.length) | 0];
  return typeof e.txt === 'function' ? e.txt() : e.txt;
}

function travelScene(){
  let html = '<h2>Crossing campus</h2>';
  if (state.agrav){
    html += AGRAV_PACE[(Math.random() * AGRAV_PACE.length) | 0];
    const ev = scooterEvent();
    if (ev) html += ev;
    html += '<p class="quiet">You ride the anti-grav now, suspended above the path, your belly resting heavy and warm in the field’s hold, your feet dangling above the ground.</p>';
    html += '<div class="actions">' + btn('Ride to ' + placeName(), 'travel:go') + '</div>';
    return html;
  }
  if (scooterActive()){
    html += SCOOTER_PACE[(Math.random() * SCOOTER_PACE.length) | 0];
    const ev = scooterEvent();
    if (ev) html += ev;
    html += '<p class="quiet">You ride now — your scooter carries the full weight of you, and you don’t have to walk at all.</p>';
    html += '<div class="actions">' + btn('Ride to ' + placeName(), 'travel:scooter') + '</div>';
    return html;
  }
  html += travelPace(wTier(state.lbs));
  const ev = travelEvent();
  if (ev) html += ev;
  html += '<div class="actions">' + btn('Arrive at ' + placeName(), 'travel:go') + '</div>';
  return html;
}

addScreen('travel', function (){
  return travelScene();
});
addScreen('scootride', function (){
  return scootRideScene();
});
addScreen('scootbreak', function (){
  return scootBreakScene();
});
const TRAVEL_MINUTES = {
  mirror: 1, room: 1, hub: 4, commons: 7, gym: 7, library: 7,
  union: 9, market: 9, clinic: 7, gate: 10, 'zola-room': 8,
  bakery: 8, park: 6
};

function travelMinutes(){
  const dest = travelTarget || 'hub';
  return TRAVEL_MINUTES[dest] != null ? TRAVEL_MINUTES[dest] : 7;
}

function walkMinutes(){
  return Math.max(1, Math.round(travelMinutes() * (1 + wTier(state.lbs) * 0.1) * 10) / 10);
}

function rideMinutes(){
  return Math.max(5, Math.round(travelMinutes() / 2 * 10) / 10);
}

function travelTimeCost(){
  if (state.agrav) return 0.15;
  if (scooterActive()) return rideMinutes() / 60;
  return walkMinutes() / 60;
}

addAction('travel:go', function (){
  const dest = travelTarget || 'hub';
  const cost = travelTimeCost();
  travelTarget = '';
  const slow = !state.agrav && wTier(state.lbs) >= 4 ? ' Your weight makes the crossing slower than it used to be.' : '';
  apply({ screen: dest, lastScene: '', notice: 'The crossing takes ' + timeText(cost) + ' — it’s ' + clockText(clockPlus(cost)) + ' now.' + slow, clock: clockPlus(cost) });
});
addAction('travel:scooter', function (){
  const dest = travelTarget || 'hub';
  if (state.lbs >= 750 && !state.agrav){
    state.agrav = true;
    travelTarget = dest;
    apply({ scooters: (state.scooters || 0) + 1, selfcontrol: state.selfcontrol - 2, screen: 'scootbreak', lastScene: '', notice: 'The scooter gives out beneath you.' });
    return;
  }
  const cost = rideMinutes() / 60;
  travelTarget = '';
  apply({ scooters: (state.scooters || 0) + 1, selfcontrol: state.selfcontrol - 2, clock: clockPlus(cost), screen: dest, lastScene: '', notice: 'The scooter carries you the rest of the way — ' + timeText(cost) + ', it’s ' + clockText(clockPlus(cost)) + ' now. −2 self-control' });
});
addAction('travel:walk', function (){
  const dest = travelTarget || 'hub';
  const cost = walkMinutes() / 60;
  travelTarget = '';
  apply({ selfcontrol: state.selfcontrol + 1, clock: clockPlus(cost), screen: dest, lastScene: '', notice: 'You keep walking. +1 self-control' });
});
