'use strict';

function classStage(){
  const d = state.day;
  if (d <= 9) return 0;
  if (d <= 29) return 1;
  if (d <= 59) return 2;
  return 3;
}

function classBody(){
  return ['Economics 101', 'Intro to Wellness Economics', 'Applied Fulfillment', 'Comfort Studies'][classStage()];
}

const TEACHER_STAGE = [
  '<p>Professor Cole is at the podium in a neat blouse, pacing between the aisles, tapping the projector remote against her palm. She is crisp and professional — quick with a pointer, sharper with a question — and the blouse hangs loose at her waist. She looks like a teacher.</p>',
  '<p>Professor Cole is a little softer at the podium now. The blouse sits snugger at the seams, and she leans on the lectern more than she used to, one hand pressed to the small of her back. She doesn’t pace the aisles anymore — she stands, mostly, and there’s a bag of something at the corner of her desk that she reaches for mid-sentence, chewing through the end of her own lecture without seeming to notice.</p>',
  '<p>Professor Cole lectures from behind the lectern now, planted there, and she is visibly heavy — the blouse straining at the buttons, her chin rounding over the collar, a tray open on the desk in front of her that she eats from without pausing, crumbs on the podium. She talks and chews in the same rhythm, and nobody in the room finds it strange. The desks are getting wider. So is she.</p>',
  '<p>Professor Cole has stopped standing entirely. She teaches from a scooter now, vast and soft behind the lectern, a feeding drone hovering at her shoulder and tipping bites into her mouth while she lectures, her voice thick and dreamy, one hand resting on the enormous shelf of her belly. She hasn’t stood up in weeks. The class doesn’t notice. Nobody on this campus does.</p>'
];

function teacherScene(){
  return TEACHER_STAGE[classStage()];
}

function classScene(){
  const s = classStage();
  const rooms = [
    'The lecture hall is bright and airy, the projector up, the seats full of students who sit up straight. Someone at the front is taking notes. The professor runs through supply and demand, and you copy it down, your pencil moving easy and light in your hand.',
    'The lecture hall is warm. More students than last term are eating during the lecture — a granola bar, a bag of chips, a blue sample cup set down beside a textbook. A few of the seats in the front row are visibly snugger now. The professor talks over the low, constant sound of chewing, and nobody seems to mind. You take notes a little slower than you used to.',
    'The lecture hall smells like warm food. A third of the room is eating open trays during the lecture, and a low, satisfied hum runs under the professor’s voice — the kind that isn’t from the food. Some of the students are very heavy now, spilling over the arms of their chairs, and nobody remarks on it. Near the front, the biggest student in the room eats through a tray without once looking up from her food. The professor never stops. The trays never stop. Neither do the quieter hums, rising and falling with each bite.',
    'The lecture hall has been redesigned. The desks are wider, and a third of the chairs are scooters now, idling low and patient in the aisles. Nearly everyone is eating; several of the biggest students eat with one hand and keep the other between their thighs, a low steady hum riding under their breaths, eyes half-lidded between bites. Zola is at the end of the front row — enormous, settled in, a stack of empties beside her — and she eats with the unhurried relish of someone the campus has already decided belongs to it. Nobody asks what the class is about anymore. The Comfort Studies lecture runs itself; you mostly eat and rock and let the hour pass, and the seat takes the whole weight of you without a complaint.'
  ];
  return rooms[s];
}

function classZolaScene(){
  return '<p>You find your seat and Zola is already there — not at the podium, where Professor Cole is lecturing, but in the row beside you, wedged in like the bench grew around her. She is one of the biggest students in the hall, vast and soft, and the seats on either side of her sit empty in a way that isn’t an accident. She pats the spot beside her, already delighted. “There you are, sweet thing. I saved you the best seat.” A tray is being fitted to the desk in front of you before you’ve sat down, and she lifts the first bite to your lips herself, her other hand settling warm and proprietary on your thigh. The professor’s voice washes over the hall — supply, demand, something about fulfillment — and Zola watches the lecture the way she watches everything: like it’s a tray being delivered to her table. “Eat, sweet thing,” she hums, feeding you another bite. “The teacher talks. You grow. That’s the whole class.”</p>';
}

function classSweatConsequences(){
  const p = {};
  if (state.sweat >= 80){
    p.selfestem = Math.max(0, state.selfestem - 3);
    p.crave = Math.min(100, state.crave + 2);
  } else if (state.sweat >= 60){
    p.selfestem = Math.max(0, state.selfestem - 2);
  }
  return p;
}

function classSweatLine(){
  const s = state.sweat;
  if (s >= 80) return '<p class="small">You sit in your own heat, soaked through — the seat slick under you, your neck running, the creases where you sit going hot and pink. You can’t focus past the thrum of it, and the restless hunger keeps climbing the longer you sit, until you’re counting down to the tray in the commons like it’s the only thing that will cool the blood.</p>';
  if (s >= 60) return '<p class="small">You’re damp through by the second hour — the back of your shirt stuck to the chair, your skin hot where it folds, the heat of your own body pressing up out of the seat. You keep your head down and wait for the hour to end, and the sweat sits on you the whole way out.</p>';
  return '';
}

addScreen('class', function (){
    const s = classStage();
    const zola = state.metZola && state.submission >= 50;
    let html = '<h2>' + classBody() + '</h2>';
    html += '<p class="small">' + clockText() + ' — a class in session.</p>';
    html += teacherScene();
    html += zola ? classZolaScene() : classScene();
    html += classSweatLine();
    const after = AFTER[state.lastScene];
    if (after) html += typeof after === 'function' ? after() : after;
    html += classIndulgeButtons();
    html += '<div class="actions">' + btn('Leave class', 'nav', 'hub') + '</div>';
    return html;
});

addAction('class:go', function (){
  const s = classStage();
  if (state.metZola && state.submission >= 50){
    const sw = classSweatConsequences();
    const se = sw.selfestem != null ? sw.selfestem : state.selfestem;
    const note = (sw.crave != null ? ' — and the heat of you has you hungry for a tray' : '');
    apply({
      clock: clockPlus(3),
      classDays: state.classDays + 1,
      glut: Math.min(50, state.glut + 4),
      selfcontrol: Math.max(0, state.selfcontrol - 8),
      selfestem: Math.min(100, se + 1),
      submission: Math.min(100, state.submission + 4),
      zola: Math.min(100, state.zola + 5),
      crave: (sw.crave != null ? sw.crave : state.crave),
      classAte: false,
      classDozed: false,
      lastScene: 'class:zola',
      notice: 'Class ends. Zola fed you through all of it — Stomach +4 · −8 self-control · +4 submission · +5 approval' + note,
      screen: 'class'
    });
    return;
  }
  const glutGain = [0, 1, 2, 3][s];
  const scDelta = [2, 1, 0, -1][s];
  const sw = classSweatConsequences();
  const se = sw.selfestem != null ? sw.selfestem : state.selfestem;
  const p = {
    clock: clockPlus(3),
    classDays: state.classDays + 1,
    selfestem: Math.min(100, se + 1),
    classAte: false,
    classDozed: false,
    lastScene: 'class',
    screen: 'class'
  };
  if (glutGain > 0) p.glut = Math.min(50, state.glut + glutGain);
  p.selfcontrol = Math.max(0, Math.min(100, state.selfcontrol + scDelta));
  if (sw.crave != null) p.crave = sw.crave;
  let sweatNote = '';
  if (sw.crave != null) sweatNote = ' · you sat soaked through, and the hunger climbed on you';
  else if (sw.selfestem != null) sweatNote = ' · you sat in your own sweat, and it wore on you';
  p.notice = 'You sat through ' + classBody() + '. ' +
    (glutGain > 0 ? 'Stomach +' + glutGain + ' · ' : '') +
    (scDelta > 0 ? '+' + scDelta + ' self-control' : scDelta < 0 ? scDelta + ' self-control' : 'self-control unchanged') +
    ' · +1 self-esteem' + sweatNote;
  apply(p);
});

AFTER['class'] = function (){
  const s = classStage();
  const t = wTier(state.lbs);
  if (s === 0){
    if (t <= 1) return '<p>The bell rings and the room empties. Professor Cole gathers her notes and leaves the podium looking like she’ll be back to the gym after this. Your own notes are clean, your body is light, and the next class is a hallway away. It’s easy.</p>';
    if (t <= 4) return '<p>The bell rings and the room empties. Professor Cole gathers her notes and leaves the podium, a little looser at the collar than she was in August. You gather your things a beat slower than you used to, your belly pressing soft against the desk edge as you stand, and the next class is a hallway away — a hallway that’s a little longer for your body than it was when you arrived. Still easy. Just heavier.</p>';
    return '<p>The bell rings and the room empties around you. Professor Cole gathers her notes slowly, a tray already waiting at the corner of her desk. You rise with a hand on the desk edge, your belly heavy against your lap, the seat sighing under the weight you leave behind — and the next class is a hallway away, a hallway you take a breath before you cross. It used to be easy. Now it’s just how it is, and nobody comments.</p>';
  }
  if (s === 1){
    if (t <= 1) return '<p>The bell rings and half the room keeps eating. Professor Cole stacks her notes slowly, reaching for the bag at the corner of her desk before she leaves, and a seatmate waves a half-eaten pastry at you in goodbye. You’re a little fuller than you were an hour ago, and the walk to your next class is a little slower than it used to be.</p>';
    if (t <= 4) return '<p>The bell rings and half the room keeps eating. Professor Cole stacks her notes slowly, reaching for the bag at the corner of her desk. You’re a little fuller than you were an hour ago, and getting up takes a beat — your belly pressing against the desk edge as you rise, your thighs heavy in the walk between the rows. The next class is a hallway away, and the hallway is a little harder on your body than it was last month. Nobody hurries you.</p>';
    return '<p>The bell rings and half the room keeps eating. Professor Cole stacks her notes slowly, chewing through the end of something from the bag at her desk. You don’t get up with the rest of them. The scooter hums up to your chair, the seat already worn to the shape of you, and you swing your weight aboard, the frame settling low under you as the students part for the width of you in the aisle. The next class is a hallway away. You ride it, and the hallway has never felt shorter.</p>';
  }
  if (s === 2){
    if (t <= 1) return '<p>The bell rings. A few students groan at the interruption, and the hums take a moment to wind down. Professor Cole finishes her tray before she dismisses the class, dabbing her mouth with a napkin like it’s always been part of the routine. Around you, the heavy students rise slow from their chairs, and you slip out among them, lighter than most, the hall parting around bodies that barely move. The next lecture is already starting over the sound of fresh trays being opened.</p>';
    if (t <= 4) return '<p>The bell rings. A few students groan at the interruption, and the hums take a moment to wind down. Professor Cole finishes her tray before she dismisses the class, dabbing her mouth with a napkin like it’s always been part of the routine. You rise a little heavier than you sat, the tray on your desk scraped clean, your belly settling into the walk ahead of you, and the next lecture is already starting over the sound of fresh trays being opened.</p>';
    return '<p>The bell rings. A few students groan at the interruption, and the hums take a moment to wind down. Professor Cole finishes her tray before she dismisses the class, dabbing her mouth with a napkin. You don’t stand. The scooter carries you out of the row, your tray scraped clean, your weight settled deep in the seat, and the desks part for you like they’ve always known your width. The next lecture is already starting over the sound of fresh trays being opened — and you’ll ride in for that one too.</p>';
  }
  if (t <= 1) return '<p>The lecture ends the way it always does — a tray landing on the desk in front of you before you’re fully awake, a hum still riding under your ribs. Around you, the biggest students are folded into their scooters, being fed as they wait, and Professor Cole doesn’t get up from behind her lectern. You’re one of the smallest in the room now — a lightness that feels almost conspicuous, a body that still remembers how to walk out under its own power. You get up and do it, and the trays keep coming, and the room keeps the rest of them warm.</p>';
  if (t <= 4) return '<p>The lecture ends the way it always does — a tray landing on the desk in front of you before you’re fully awake, a hum still riding under your ribs, the seat creaking as you shift. Professor Cole doesn’t get up; the drone is already settling the next tray onto the lectern for her. You rise a little slower than you sat, your belly heavy across your thighs, and the walk out takes the whole weight of you a step at a time. The class folds into the next class, and the trays keep coming, and your body keeps the seat warm.</p>';
  return '<p>The lecture ends the way it always does — a tray landing on the desk in front of you before you’re fully awake, a hum still riding under your ribs, the scooter seat creaking as you shift your weight on it. Professor Cole doesn’t get up. She doesn’t need to; the drone is already settling the next tray onto the lectern for her. You don’t get up either. The scooter hums out of the row with you aboard, your tray scraped clean, the desks parting for the width of you without a word, and the class folds into the next class, and the trays keep coming, and you keep the seat warm — and you’re not sure when the walking part stopped being expected of any of you.</p>';
};

AFTER['class:zola'] = '<p>The bell rings and the room empties around you, but Zola keeps one hand on your tray, holding it steady while you finish the last bites, her thumb sweeping a crumb from the corner of your mouth. “Good student,” she hums, low and pleased. Behind her, Professor Cole is being helped off the scooter by a drone, and Zola doesn’t spare her a glance — the teacher is just another tray getting bigger. “Come back tomorrow,” Zola says, patting your belly like it’s hers already. “I’ll save you the best seat.” The hall is empty before she lets go, and your belly is warm and full, and the day already feels easier than it should.</p>';
