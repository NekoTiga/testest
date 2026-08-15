'use strict';

const BAKERY_SWEETS = {
  donut: { name: 'Glazed donut', price: 8, glut: 1, crave: 1 },
  cinnamon: { name: 'Cinnamon roll', price: 15, glut: 2, crave: 2 },
  cake: { name: 'Slice of layered cake', price: 25, glut: 3, crave: 2 },
  pie: { name: 'Slice of pie', price: 40, glut: 5, crave: 3 }
};

function bakeryScene(){
  state.bakeryVisits = (state.bakeryVisits || 0) + 1;
  const night = isNight();
  const pt = wTier(state.lbs);
  let html = '<h2>The bakery</h2>';
  if (night){
    html += '<p>The bakery is dark behind its grille, the ovens quiet, the glass counter empty. A single drone sits on the sill, charging, patient. It’ll be warm again in the morning.</p>';
  } else {
    if (pt >= 5){
      html += '<p>The bakery is small, steamy, and sweet — shelves of bread, a glass counter of pastries, the smell of sugar settling into your clothes. You’re not the heaviest person here, and nobody in this room is in a hurry. The baker — a soft, round woman with flour up her forearms — smiles when she sees you and reaches for the tray without asking. It’s your table now.</p>';
    } else if (pt >= 3){
      html += '<p>The bakery is small, steamy, and sweet — shelves of bread, a glass counter of pastries, the smell of sugar settling into your clothes. A few students sit by the window with plates of things, some of them rounder than they were in August. The baker, a soft woman with flour up her forearms, nods when you come in. "Saw you coming," she says, already reaching for the counter.</p>';
    } else {
      html += '<p>The bakery is small, steamy, and sweet — shelves of bread, a glass counter of pastries, the smell of sugar settling into your clothes. Students come and go with paper bags. The baker — a soft, round woman with flour up her forearms — nods at you. "Donut’s fresh." It sounds like a suggestion.</p>';
    }
    if ((state.bakeryVisits || 0) >= 3){
      const card = (state.bakeryPunch || 0) === 0 ? 'a fresh card' : (state.bakeryPunch || 0) + '/5 punches';
      html += '<p class="small">The baker knows your order now. She doesn’t ask. On the wall behind the counter a punch card board reads: <em>sugar club — five pastries, one on the house.</em> Your card has ' + card + '.</p>';
    } else {
      html += '<p class="small">On the wall behind the counter a sign reads: <em>sugar club — five pastries, one on the house.</em></p>';
    }
  }
  html += '<p class="small">You can carry ' + invSpace() + ' more item' + (invSpace() === 1 ? '' : 's') + '.</p>';
  html += npcHerePanel('bakery');
  if (state.lastScene === 'bakery:piper') html += AFTER['bakery:piper']();
  const here = npcHere('bakery');
  html += '<div class="actions">';
  if (night){
    html += btn('Leave', 'nav', 'hub');
  } else {
    for (const id in BAKERY_SWEETS){
      const s = BAKERY_SWEETS[id];
      const punch = ((state.bakeryPunch || 0) + 1) % 5 === 0;
      const label = (punch ? 'Sugar club — free: ' : '') + s.name + ' — ' + s.price + ' cr';
      html += btn(label, 'bakery:buy', id, !canAfford(s.price));
    }
    if (here.indexOf('piper') >= 0){
      html += btn('Talk to Piper at her booth', 'bakery:piper');
    }
    html += btn('Leave', 'nav', 'hub');
  }
  html += '</div>';
  return html;
}

addScreen('bakery', bakeryScene);

addAction('bakery:buy', function (id){
  const s = BAKERY_SWEETS[id];
  if (!s){
    apply({ screen: 'bakery', notice: 'That isn’t on the menu.' });
    return;
  }
  if (isNight()){
    apply({ notice: 'The bakery is closed.', screen: 'bakery' });
    return;
  }
  if (!canAfford(s.price)){
    apply({ notice: 'Not enough credits.', screen: 'bakery' });
    return;
  }
  const punch = ((state.bakeryPunch || 0) + 1) % 5;
  const free = punch === 0;
  const glut = Math.min(state.capacity, state.glut + s.glut);
  const crave = Math.min(100, state.crave + s.crave);
  const sc = Math.max(0, state.selfcontrol - 0.25 * s.glut);
  const pieces = [
    'Stomach +' + s.glut + ' (now ' + fullnessAt(glut) + '). Converts to ~' + (s.glut * STOMACH_LB_PER_UNIT).toFixed(1) + ' lbs tomorrow.',
    '−' + (free ? '0' : s.price) + ' cr',
    (free ? 'Sugar club — pastry #5, on the house. ' : ''),
    (s.crave ? '+' + s.crave + ' craving' : ''),
    '−' + (0.25 * s.glut).toFixed(1) + ' self-control',
    '~' + timeText(mealTime(Math.max(1, s.glut))) + ' eating',
    (bandWorn() ? '· the band logs a success' : '')
  ].filter(function (x){ return x; }).join(' · ');
  apply({
    bakeryPunch: punch,
    credits: free ? state.credits : state.credits - s.price,
    glut: glut,
    crave: crave,
    selfcontrol: sc,
    clock: clockPlus(mealTime(Math.max(1, s.glut))),
    screen: 'bakery',
    notice: pieces
  });
});

addAction('bakery:piper', function (){
  apply({
    selfestem: Math.min(100, state.selfestem + 1),
    screen: 'bakery',
    lastScene: 'bakery:piper',
    notice: 'You sit with Piper. +1 self-esteem'
  });
});

AFTER['bakery:piper'] = function (){
  const pt = piperTier(state.piperLbs);
  if (pt <= 2){
    return '<p>Piper’s at a window stool, a coffee and a single donut on the counter. She waves you over, half sheepish. "Recovery food. Scientifically." She breaks the donut in half and pushes the other half toward you without looking at it, like it costs her something she’s not going to name. "One won’t hurt," she says, and she says it to herself more than to you.</p>';
  }
  if (pt <= 4){
    return '<p>Piper’s at the counter, two pastries in, the box open in front of her. She grins when she sees you and gestures at the empty chair. "Pre-fueling," she says, deadpan, and then she laughs at herself, soft and easy — a little rounder than she used to be and a lot more comfortable about it. "You want in? I’ll split the tray. That’s what friends are for."</p>';
  }
  return '<p>Piper’s in the corner booth, a plate and a half in front of her, crumbs on the front of her shirt. She’s not pretending about any of it anymore. She waves you over and pushes a fresh pastry across the table without being asked. "Sit," she says, warm and certain, the way she used to say <em>run it again</em>. "Tray’s coming. You’re staying." She waits until you’ve taken a bite before she takes hers, and the booth settles around the two of you like it’s been waiting all along.</p>';
};
