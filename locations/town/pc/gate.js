'use strict';

function gateScene(){
  state.gateSeen = true;
  let html = '<h2>The town gate</h2>';
  if (isNight()){
    html += '<p>At the north edge of the quad, the town gate. Two tall posts of dark metal, a crossbar overhead, the big gates closed. A chain wraps the handles — new, heavy, thick as your wrist — and a lock the size of a fist hangs from it. Through the bars, the street beyond: a closed market, a shuttered bus stop, the far houses dark. A drone circles the gate slowly, its red eye blinking.</p>';
    return html + '<div class="actions">' + btn('Look at the street beyond', 'gate:look') + btn('Leave', 'nav', 'hub') + '</div>';
  }
  html += '<p>At the north edge of the quad, the town gate. Two tall posts of dark metal, a crossbar overhead, the big gates closed. A chain wraps the handles — new, heavy, thick as your wrist — and a lock the size of a fist hangs from it. Through the bars, the street beyond: a row of shops, a bus stop, cars moving on a road that could take you anywhere. A campus police drone hovers beside the gate, watching.</p>';
  html += '<div class="actions">' +
    btn('Test the chain', 'gate:chain') +
    btn('Look at the street beyond', 'gate:look') +
    btn('Ask the drone about it', 'gate:drone') +
    btn('Leave', 'nav', 'hub') +
    '</div>';
  return html;
}

addScreen('gate', gateScene);

addAction('gate:chain', function (){
  apply({
    screen: 'gate',
    selfcontrol: state.selfcontrol + 1,
    notice: 'You give the chain a tug. It doesn’t move. The metal is cold, the lock heavy, and beyond the bars the town keeps its ordinary rhythm — shops, buses, cars. You let the chain go and stand there a moment. +1 self-control'
  });
});
addAction('gate:look', function (){
  if (isNight()){
    apply({ screen: 'gate', notice: 'The street is dark and quiet — a shuttered market, a bus stop with no buses, the windows of the nearest houses lit warm and ordinary. You could walk out that gate in about thirty seconds, if it weren’t chained, if it weren’t watched. You turn back to the quad.' });
    return;
  }
  apply({ screen: 'gate', notice: 'The street beyond is normal — shops with their awnings out, a bus sliding past, people going places you could, in theory, go. A student shuffles up beside you, heavy on their feet, and sighs. “Waste of time,” they say. “They opened it once, at the start of term, for the new intake. Nobody here has seen it open since.”' });
});
addAction('gate:drone', function (){
  if (isNight()){
    apply({ screen: 'gate', notice: 'The drone hovers, silent, its red eye fixed on you. You get the feeling it isn’t going to answer, and you get the feeling it isn’t going to leave you alone near the chain, either.' });
    return;
  }
  const lines = [
    'The drone descends to eye level, hovers, and beeps once. A recorded voice, warm and friendly: “The gate is closed for the wellness of the community. Health and safety. Please enjoy campus.” It rises again and resumes its orbit.',
    'The drone bobs toward you, its camera turning. A recorded voice: “The gate is closed for the wellness of the community. Health and safety.” There’s a smiley sticker on its casing, small and worn, right next to the lens.',
    'The drone doesn’t answer. It hovers, watching you, patient as a parking lot camera. After a moment it turns and resumes its slow circuit of the gate, and you’re left with the sense that your face is saved somewhere, logged, counted.'
  ];
  apply({ screen: 'gate', notice: lines[(Math.random() * lines.length) | 0] });
});
