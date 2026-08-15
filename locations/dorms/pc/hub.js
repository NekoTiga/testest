'use strict';

addScreen('hub', function (){
    const room = !state.piper1 ? 'Your room — unpack' :
      (state.day >= 40 && !state.piperq) ? 'Your room — Piper wants to talk' :
      (state.day >= 45 && !state.minaQ) ? 'Your room — Mina wants to show you something' : 'Your room';
    const gym = state.zolaCollar ? 'The gym — forbidden by Zola (greyed on your map)' :
      state.day > 50 ? 'The gym — a snack lounge now' :
      state.day > 30 ? 'The gym — quiet, still open' : 'The gym';
    const lib = state.metRavi && raviWhere() === 'library' ? 'The library — Ravi is there' : 'The library';
    const mood = lazy() ? ' <em>Your belly is already rumbling, heavy in your lap. Lunch sounds good.</em>' : '';
    let bandLine = '';
    if (bandWorn()){
      bandLine = ' <em>Your wristband hums, counting you as a success.</em>';
    } else if (state.bandHandout){
      bandLine = ' <em>Your wrist is bare. A drone circles the roofline, patient, checking.</em>';
    }
    const dl = dressDayLine();
    const dressLine = dl ? ' <em>' + dl + '</em>' : '';
    let bandPanel = '';
    const bandLock = state.day >= 11 && !state.bandHandout;
    if (bandLock){
      bandPanel = `
        <p>A resident assistant comes through with a box of wristbands. “Wellness+ initiative — campus well-being tracker. Free this term, every student’s wearing one. Tracks your meals, your sleep, your wellness score.” She presses one into your palm before you can answer. It’s warm, like it’s been worn. Across the hall, Piper and Mina are getting theirs. “Everyone wears one,” she says, and it isn’t a request.</p>
        <div class="actions">
          ${btn('Let her fit it around your wrist', 'accept-band')}
        </div>`;
    }
    const zolaUnlocked = state.metZola && state.zola >= 40;
    if (isNight()){
      return `
        <h2>Day ${state.day} — the quad</h2>
        <p class="small">${clockText()} — ${clockPart()}.</p>
        <p>It’s the middle of the night. The quad is empty, the lamps buzzing low, and the far doors are all dark. Your room is where you should be.</p>
        <div class="actions">
          ${btn('Go back to your room', 'nav', 'room', bandLock)}
        </div>`;
    }
    return `
      <h2>Day ${state.day} — the quad</h2>
      <p class="small">${clockText()} — ${clockPart()}.</p>
      <p>${hubLine()}${mood}${bandLine}${dressLine}${cravingHubLine()}${nurseHubLine()}</p>
      ${bandPanel}
      ${schedHubPanel()}
      <div class="actions">
        ${btn(room, 'nav', 'room', bandLock)}
        ${btn('Commons', 'nav', 'commons', bandLock)}
        ${btn(gym, 'nav', 'gym', bandLock || state.zolaCollar)}
        ${btn(lib, 'nav', 'library', bandLock)}
        ${btn('Dorm bathroom', 'nav', 'mirror', bandLock)}
        ${btn('Your journal (stats)', 'nav', 'stats', bandLock)}
        ${btn('Student union', 'nav', 'union', bandLock)}
        ${btn('Market', 'nav', 'market', bandLock)}
        ${btn('Bakery', 'nav', 'bakery', bandLock)}
        ${btn('Park', 'nav', 'park', bandLock)}
        ${btn('Clinic', 'nav', 'clinic', bandLock)}
        ${btn('The town gate', 'nav', 'gate', bandLock)}
        ${(state.day >= 2 && classWindow()) ? btn('Attend class — it’s ' + clockText(), 'class:go', null, bandLock) : ''}
        ${zolaUnlocked ? btn('Zola’s dorm — at the end of the far hall', 'nav', 'zola-room', bandLock) : ''}
      </div>`;
});

function hubLine(){
  const d = state.day;
  const m = {
    1: 'Orientation. You eat dinner in the commons with Piper and Mina. Piper orders the salad bar and talks about her training schedule. You clear your tray, and your belly lies flat beneath your shirt, the waistband of your jeans loose at your hips.',
    2: 'Your first classes are a blur. You find the quiet floor of the library, where a junior named Ravi waves you over. You fold into a chair and your weight settles light against the seat.',
    3: 'The gym is open. You can hear the treadmills from the quad. Your joggers hang loose at the waist, the drawstring swinging as you walk.',
    5: 'Piper went for a dawn run. Mina is already deep in a bio textbook. You sit on your bed and the mattress takes your weight without a sound, your stomach soft against the waistband of your shorts.',
    7: 'A weekend. The commons does a brunch spread, and someone’s got a guitar on the quad. You go back for a second plate, the button of your jeans pressing a red line into your middle.',
    9: 'FreshFix posted flyers around campus: “Eat Well. Fuel Well.” Just ads. You read them over a full tray, your belly rounded against the table edge.',
    10: 'Something small changes today. A vending machine in the commons is restocked with blue cups nobody ordered. Nobody knows what’s in them.',
    11: 'The halls hum with new wristbands today — half the floor is wearing them by noon.',
    12: 'Most of the floor is wearing their bands now. They chime in the halls at every meal, marking the end of each tray.',
    14: 'The vending machine sells the blue samples now. They’re free. They’re always free.',
    16: 'A FreshFix drone lands beside you with a “free welcome meal.” Piper got one too. “Free is free.”',
    18: 'Piper ordered a second tray. She says the app recommended it.',
    21: 'Piper looks a little softer. She says the laundry shrunk her shorts.',
    25: 'The blue sample cups are everywhere now. Nobody asks what’s in them.',
    29: 'The gym is quieter this week — half the treadmills are taped off “for maintenance,” and a tray of free snack bars has appeared by the door. Nobody’s sure who puts them there.',
    30: 'The gym is still open, but the floor is nearly empty. The vending machines hum louder than the treadmills now.',
    35: 'Ravi keeps pulling you aside. “The sync logs are wrong,” she says. “Every band, 11 p.m., logged as a success.”',
    40: 'Piper looks different. Really different — you can’t put your finger on it. She wants to talk.',
    45: 'Mina lowers her voice in the room. “I ran a pH strip on mine. It’s not water.”',
    50: 'Nobody works out at the gym anymore. The machines run on repeat, the free snacks pile up on the tables, and students wander in, eat, and leave without touching a single weight.',
    60: 'It’s a normal campus. Your jeans sit snug at the waist, your belly hanging soft over the button, and nobody looks at you twice.',
    75: 'The app sends you a “wellness goal” for the month. You don’t read it. You don’t need to.',
    90: 'Some of the students are very big now. Nobody remarks on it. The dining hall got extra chairs.',
    120: 'The dorms got new beds — wider, sturdier. The RA calls it “an investment in comfort.”',
    150: 'You can tell who moved in first by how they move. The upperclassmen barely move at all.',
    180: 'The beds have feeding trays now, built into the frame. “Accessibility,” the RA says.',
    200: 'The semester is almost over. You’ve been here for two hundred days. Your body fills the bed, the springs groaning when you shift your weight.',
    300: 'The commons hums with scooters and drones. You ride between the tables, your weight settled deep in the seat, your thighs spilling over the edges of it.'
  };
  if (m[d]) return m[d];
  if (d <= 9) return 'A normal day. Classes, the commons, the gym. You move through it all easily, your body light under your clothes, the campus humming around you.';
  if (d <= 29) return 'The days blur a little. Your jeans are snugger at the waist, the seam pressing into the soft curve of your belly.';
  if (d <= 59) return 'Things keep happening, quietly. Your clothes keep growing snugger, the seams pressing red lines into your skin.';
  if (d <= 119) return 'Your belly hangs heavier over your waistband now, swaying as you walk, and you take the bench that creaks the least.';
  if (d <= 199) return 'The days fold into each other. Your body spreads wider in the bed each night, your belly heavy across your thighs, the tray within reach of the headboard.';
  return 'Day ' + d + ', and you wake with your weight pressed deep into the mattress, your hands sinking into the soft pad of your belly.';
}

function nurseHubLine(){
  const p = clinicPhase(state.day);
  if (p === 0) return '';
  if (p === 1) return ' <em>The clinic nurse crossed the quad this morning, a little heavier in the hips than she was, taking the slow way over.</em>';
  if (p === 2) return ' <em>The clinic nurse waved from her desk as you passed — her scrubs fit snugger now, and the lunch drones stopped at her door before they reached the dorm.</em>';
  if (p === 3) return ' <em>The clinic nurse rides a scooter now. She still comes out to check on you, soft and breathless, and she still does her job properly.</em>';
  return ' <em>The nurse was out on the quad on her scooter, vast and kind, clipping a care pass to a first-year’s shirt. She saw you and waved, slow and warm.</em>';
}

