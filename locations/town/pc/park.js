'use strict';

function parkScene(){
  state.parkVisits = (state.parkVisits || 0) + 1;
  const night = isNight();
  const part = clockPart();
  const pt = wTier(state.lbs);
  let html = '<h2>The park</h2>';
  if (night){
    html += '<p>The park is quiet under its path lights, the benches empty, the pond a dark mirror. The food truck is gone — only a chalkboard remains, propped against a tree, reading <em>back at 4.</em> The air is cool and still.</p>';
  } else {
    if (pt >= 6){
      html += '<p>The park paths wind between oaks, and the morning light falls easy on the grass. It’s beautiful, and it costs you something to be here — your hips swing wide as you move, your breath coming short, a bench always a few steps too far away. The pond is a circle of slow water where the ducks paddle, rounder than they were in August, just like everyone else.</p>';
    } else if (pt >= 3){
      html += '<p>The park paths wind between oaks, and the pond is a circle of slow water with the ducks working a stale loaf someone left. Students move along the path, some of them heavier than they were in August — including, quietly, you. A couple of them sit on benches with food, and the smell carries.</p>';
    } else {
      html += '<p>The park paths wind between oaks, the pond is a circle of slow water with ducks, and a handful of students run or walk or sit with coffee. It smells like cut grass and cold air. A normal park, and you’re just here.</p>';
    }
    if (part === 'afternoon' || part === 'evening'){
      if (pt >= 5){
        html += '<p>The food truck is parked at the far edge of the path — the Golden Wheel, paper lanterns strung above the hatch, a line of students in front of it. The guy working it catches your eye and grins, already reaching for the biggest boat of fries. He knows his regulars.</p>';
      } else {
        html += '<p>The food truck is parked at the far edge of the path — the Golden Wheel, paper lanterns strung above the hatch, a short line of students in front of it. The smell of hot oil carries the whole way across the grass.</p>';
      }
    }
  }
  html += npcHerePanel('park');
  html += '<div class="actions">';
  if (!night){
    html += btn('Walk the path', 'park:walk');
    html += btn('Sit on a bench', 'park:bench');
    html += btn('Feed the ducks at the pond', 'park:ducks');
    if (part === 'afternoon' || part === 'evening'){
      html += btn('Golden Wheel: loaded fries — 20 cr', 'park:truck', null, !canAfford(20));
    }
  } else {
    html += btn('Night walk around the quiet paths', 'park:walk');
  }
  html += btn('Leave', 'nav', 'hub');
  html += '</div>';
  return html;
}

addScreen('park', parkScene);

function parkWalkAfter(){
  const pt = wTier(state.lbs);
  if (pt >= 7){
    return '<p>You take the path one slow lap at a time, and the bench catches you twice. By the far side your breath is loud in your chest and your thighs burn with the load they carry, but you did it — one full round, slow, heavy, yours. You stand at the pond a moment, hands on your knees, and the ducks look up at you with what you choose to read as approval.</p>';
  }
  if (pt >= 5){
    return '<p>You walk the path at a pace you’d once have called a dawdle, and it’s real work by the second lap — your stride wide, your breath short, a stop at the bench to let the world settle. You finish anyway, warm and honest, and sitting down again in the grass at the far end feels earned, even if it used to feel like nothing.</p>';
  }
  if (pt >= 3){
    return '<p>You walk the path twice, and you notice the difference in yourself — where you used to run the whole loop you now take it steady, the weight of you settling into your hips, the burn coming earlier than it used to. You finish warm, and a little out of breath, and you don’t run from the fact of it.</p>';
  }
  return '<p>You walk the path at a good clip, the loop easy and even, the cool air doing its work. One lap, then another for the joy of it. You feel light, and free, and the park holds you like it’s holding its breath.</p>';
}

addAction('park:walk', function (){
  const pt = wTier(state.lbs);
  const effort = pt >= 7 ? 1 : pt >= 5 ? 0.5 : 0;
  const sc = Math.max(0, state.selfcontrol - effort);
  const est = Math.min(100, state.selfestem + 1);
  apply({
    selfcontrol: sc,
    selfestem: est,
    clock: clockPlus(pt >= 5 ? 1 : 0.75),
    screen: 'park',
    lastScene: 'park:walk',
    notice: (effort ? '−' + effort + ' self-control · ' : '') + '+1 self-esteem · ~' + timeText(pt >= 5 ? 1 : 0.75) + ' walking'
  });
});

addAction('park:bench', function (){
  apply({
    selfestem: Math.min(100, state.selfestem + 1),
    crave: Math.min(100, state.crave + 1),
    clock: clockPlus(0.5),
    screen: 'park',
    lastScene: 'park:bench',
    notice: '+1 self-esteem · +1 craving · ~30 min resting'
  });
});

addAction('park:ducks', function (){
  const pt = wTier(state.lbs);
  apply({
    selfestem: Math.min(100, state.selfestem + 1),
    clock: clockPlus(0.5),
    screen: 'park',
    lastScene: 'park:ducks',
    notice: '+1 self-esteem · ~30 min feeding ducks'
  });
});

addAction('park:truck', function (){
  if (isNight()){
    apply({ notice: 'The truck’s gone — the chalkboard says it’s back at 4.', screen: 'park' });
    return;
  }
  const part = clockPart();
  if (part !== 'afternoon' && part !== 'evening'){
    apply({ notice: 'The truck hasn’t rolled in yet. The chalkboard says 4.', screen: 'park' });
    return;
  }
  if (!canAfford(20)){
    apply({ notice: 'Not enough credits.', screen: 'park' });
    return;
  }
  const glut = Math.min(state.capacity, state.glut + 3);
  const crave = Math.min(100, state.crave + 2);
  apply({
    credits: state.credits - 20,
    glut: glut,
    crave: crave,
    selfcontrol: Math.max(0, state.selfcontrol - 1),
    clock: clockPlus(mealTime(3)),
    screen: 'park',
    lastScene: 'park:truck',
    notice: 'Stomach +3 (now ' + fullnessAt(glut) + '). Converts to ~' + (3 * STOMACH_LB_PER_UNIT).toFixed(1) + ' lbs tomorrow. −1 self-control · −20 cr · ~' + timeText(mealTime(3)) + ' eating' + (bandWorn() ? ' · the band logs a success' : '')
  });
});

AFTER['park:walk'] = function (){ return parkWalkAfter(); };
AFTER['park:bench'] = function (){
  const pt = wTier(state.lbs);
  const txt = pt >= 6
    ? '<p>You lower yourself onto the bench and let the whole load of you settle onto the slats, the wood taking the weight with a long groan. You sit a while, breath evening out, watching the path. People walk past in both directions. A few of them are eating, and your mouth waters before you can stop it, and you let yourself watch — just for a minute. The bench holds you. The park keeps the light soft. It’s almost restful, and your stomach rumbles like a distant engine starting.</p>'
    : '<p>The bench is warm where the sun’s been on it, and you sit a while, watching the path and the pond and the students moving past. It’s quiet and ordinary and yours. A few people carry food by, and your mouth waters a little — the park smells like the truck and the truck smells like dinner. You stay until the bench feels less like an indulgence and more like a right.</p>';
  return txt;
};
AFTER['park:ducks'] = function (){
  const pt = wTier(state.lbs);
  const txt = pt >= 4
    ? '<p>The ducks paddle over when they see you, round and low in the water, and you sit at the edge breaking up the stale loaf someone left. They eat like they’ve got a schedule — steady, ungreedy, certain. One of them floats near your knees, then two, and you wonder, watching them, if you and they are keeping the same appointment. They’ve gotten rounder too. Everyone has. It’s almost a comfort.</p>'
    : '<p>The ducks paddle over when they see you, and you sit at the edge of the pond breaking up the stale loaf someone left on the grass. They eat steadily and without shame, which you find you admire. When the bread is gone they circle the water a moment, hopeful, and then drift off. You feel lighter than when you sat down, even though you know you’re exactly the same.</p>';
  return txt;
};
AFTER['park:truck'] = function (){
  const pt = wTier(state.lbs);
  const txt = pt >= 5
    ? '<p>The truck guy hands the boat of fries across the hatch and then a second one, free, without being asked. “You look hungry,” he says, and there’s no judgment in it, just fact. You take both to the bench and work through them, the salt hot and good, the can of soda cold against your palm. The fries are gone before you’ve quite decided they were the plan. He catches your eye from the hatch and grins, and points at his own stomach, and you laugh despite yourself.</p>'
    : '<p>The paper boat is hot in your hands and the fries are golden and salted, and you eat them on the grass by the path, the truck’s lanterns bobbing overhead. It’s good, and it’s exactly what you wanted, and the can of soda goes down sweet and cold. You finish and sit a moment, full and warm, the park going gold around you, and it doesn’t occur to you to want to be anywhere else.</p>';
  return txt;
};
