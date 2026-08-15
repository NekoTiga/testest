'use strict';

function raviGarble(){
  return wTier(state.lbs) >= 7 || state.selfcontrol < 30;
}

function raviBodyLine(){
  const t = raviTier(raviLbs(state.day));
  const lines = [
    '<p>Ravi is lean and restless, all jitter and fountain coffee — she talks with her hands and finishes your sentences before you do. In August you’d have called her the healthiest girl in the building.</p>',
    '<p>Ravi is a little softer than when you met. A few weeks of campus food will do that — her collar sits snugger, and the coffee cup comes with a pastry she doesn’t mention. She still leans forward when she talks, quick and sharp.</p>',
    '<p>Ravi is visibly softening now. The spreadsheets share the table with an empty tray, and her thumb hovers over the snack drawer while she reads. She talks faster, like she’s racing the weight.</p>',
    '<p>Ravi is properly heavy now, and the study carrel has gotten smaller around her. She shifts her weight before she talks and the chair complains. She eats while she reads, and the food is always in reach — and so is the truth, when you can get a word in.</p>',
    '<p>Ravi is soft and heavy, and it’s hard not to stare. The desk holds her the way it holds a stack of books — barely. She talks in shorter sentences now, resting between them, one hand still in the bag of chips.</p>',
    '<p>Ravi is huge, and the corner of the library is shaped around her now — the reinforced chair, the tray that arrives without her ordering it, the table pushed back to fit her hips. She greets you without getting up. She doesn’t get up much anymore.</p>',
    '<p>Ravi is enormous — a soft mountain of a girl in a chair that’s been reinforced once and probably needs it again. The carrel is a toy behind her shoulders. She eats to talk and talks between bites, and every sentence costs her a little more air than the last one. She’s still in there, sharp as ever, buried under the campus’s version of comfort.</p>'
  ];
  return lines[t];
}

function raviWeightLine(){
  const pt = wTier(state.lbs);
  const rt = raviTier(raviLbs(state.day));
  if (pt >= 6 && rt >= 2){
    return '<p>Neither of you says it. Both of you are heavier than you were at the start of the term, and the walk to the library is longer than it used to be. Ravi catches her breath. You do too, sinking into the chair and letting the weight of you settle — the seat groaning, the spread of your hips pressing against its arms.</p>';
  }
  if (pt >= 4){
    return '<p>Ravi watches you lower yourself into the chair — the soft weight of you dropping down, your hips spreading over the seat, your belly pressing the front of the desk. She’s not cruel about it; she’s tired too, these days. The investigation keeps you both hunched over the table, and neither of you moves like you used to.</p>';
  }
  if (pt >= 2){
    return '<p>Ravi’s not looking at you the way she did in August. Nobody is. You’re both softer — the chair creaks under you, and the desk presses warm against the soft weight of your belly.</p>';
  }
  return '';
}

function raviSnackLine(){
  if (state.selfcontrol < 40){
    return '<p>You’re eating while she talks — a tray, a pastry, something sweet from the vending machines. You’re mostly listening, jaw working, the sweet heat of it filling your mouth while her words slide by. Ravi waits until you’ve swallowed before she goes on.</p>';
  }
  return '';
}

function raviNightLine(){
  if (raviWhere() !== 'library'){
    return '<p class="small">Ravi’s gone for the night — a light is on in her dorm across the quad. Her carrel is dark, but her files are all still here where she left them, and you can pick up where you left off in the morning.</p>';
  }
  return '';
}

addScreen('library', function (){
    if (state.lastScene === 'lib:reply'){
      return `
        <h2>The library</h2>
        <div class="talk">${state.libReply}</div>
        <div class="actions">${btn('Keep talking', 'lib:reset')}${btn('Leave', 'nav', 'hub')}</div>`;
    }
    if (state.ravi === 0){
      if (isNight()){
        return `
          <h2>The library</h2>
          <p>The library is quiet this late, most of the lamps off, the stacks dim. Ravi’s usual carrel is empty — she’s back in her dorm by now, her laptop dark beside a neatly stacked pile of journals.</p>
          ${raviWeightLine()}
          <div class="actions">${btn('Leave', 'nav', 'hub')}</div>`;
      }
      if (state.day < 30){
        return `
          <h2>The library</h2>
          ${raviBodyLine()}
          <p>She looks up and waves you over. “Ravi,” she says. “Transferred in this term. You’re new too — want the good table?”</p>
          <p>She talks about her classes, the quiet floor, the coffee that’s “aggressively fine.” For now, she’s just a girl who studies a lot. You settle into the chair across the table, your hands flat on the warm wood.</p>
          <div class="actions">${btn('Leave', 'nav', 'hub')}</div>`;
      }
      return `
        <h2>The library</h2>
        ${raviBodyLine()}
        <p>This time her papers look different — a spreadsheet, not a syllabus. She waves you over and lowers her voice. “You’re new too. That means you might still see it.”</p>
        <p>Wellness+ sync rates. Every band logs the same odd pattern: a spike at 11 p.m., logged as a success.</p>
        ${raviWeightLine()}
        ${raviSnackLine()}
        ${raviNightLine()}
        <div class="actions">
          ${btn('Ask her what it means', 'lib:ask')}
          ${btn('Leave', 'nav', 'hub')}
        </div>`;
    }
    if (state.ravi === 1){
      const bare = state.bandHandout && !state.bandOn ? '<p>Ravi glances at your bare wrist and nods slowly. “You took it off. Good. You’re not in the sync logs anymore. Keep it that way as long as you can.”</p>' : '';
      return `
        <h2>The library</h2>
        ${raviBodyLine()}
        <p>Ravi has the FreshFix terms of service open now. She reads aloud, careful: “FreshFix may fulfill orders proactively, based on predictive need, without requiring an explicit request.” She taps the screen. “They can feed you before you ask.”</p>
        ${bare}
        ${raviWeightLine()}
        ${raviSnackLine()}
        ${raviNightLine()}
        <div class="actions">
          ${btn('Read the clause yourself', 'lib:read')}
          ${btn('Leave', 'nav', 'hub')}
        </div>`;
    }
    const hint = state.clue1 ? '' : '<p class="small">Something about the emptying gym keeps nagging at you.</p>';
    let extra = '';
    if (state.day >= 60 && !state.clue3) extra += btn('Ask about the blue sample', 'lib:sample');
    if (state.day >= 100 && !state.clue4) extra += btn('Ask about the drones', 'lib:drones');
    if (state.day >= 150 && !state.clue5) extra += btn('Ask why nobody leaves', 'lib:stuck');
    return `
      <h2>The library</h2>
      ${raviBodyLine()}
      <p>Ravi leans back. “You’ve got the gym. You’ve got the terms. You know what the samples do.” She looks at you, finally, like she’s been waiting for you to catch up.</p>
      ${raviWeightLine()}
      ${raviSnackLine()}
      ${raviNightLine()}
      ${hint}
      <div class="actions">
        ${extra}
        ${btn('Press for the whole truth', 'lib:truth')}
        ${btn('Leave', 'nav', 'hub')}
      </div>`;
});

addAction('lib:ask', function (){
  if (state.day < 30){
    apply({ lastScene: 'lib:reply', libReply: '<p>“Just the usual,” Ravi says, a little embarrassed. “Ask me again in a few weeks.”</p>', screen: 'library' });
  } else if (raviGarble()){
    apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'lib:reply', libReply: '<p>Ravi is explaining the spreadsheet — sync rates, the spike at 11 p.m. — and your body is busy being hungry, heavy, tired. The words slide off you. You nod anyway, and you’ve missed it.</p>', notice: '−5 self-control', screen: 'library' });
  } else {
    apply({ ravi: 1, metRavi: true, selfcontrol: state.selfcontrol + 20, lastScene: 'lib:reply', libReply: '<p>Ravi turns the laptop around and walks you through the sync table — every band on campus logs the same pattern, a sharp spike at 11 p.m., each one filed as a success. “Look at the column, not the rows,” she says, low and quick. “They’re not feeding people because they’re hungry. They’re feeding them so they stop asking.” She glances at the door, then back at you, sharp and tired. “Keep your head down. And keep asking.”</p>', notice: '+20 self-control. Ravi is suspicious of the Wellness+ data.', screen: 'library' });
  }
});
addAction('lib:read', function (){
  if (raviGarble()){
    apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'lib:reply', libReply: '<p>You read the clause three times. “proactively… based on predictive need…” The words are there. The meaning keeps ducking behind your appetite. You close the laptop, unenlightened.</p>', notice: '−5 self-control', screen: 'library' });
  } else {
    apply({ ravi: 2, clue2: true, selfcontrol: state.selfcontrol + 10, lastScene: 'lib:reply', libReply: '<p>You take the laptop and read the clause yourself — “FreshFix may fulfill orders proactively, based on predictive need, without requiring an explicit request.” Ravi taps the screen. “They can feed you before you ask.” She lets it sit a moment. “Which means they can feed you after you tell them no, too.”</p>', notice: 'Clue found: proactive fulfillment. +10 self-control', screen: 'library' });
  }
});
addAction('lib:sample', function (){
  if (state.day < 60){
    apply({ lastScene: 'lib:reply', libReply: '<p>Ravi doesn’t have anything on the samples yet. “Ask me again in a few weeks,” she says, and she doesn’t look up from her notes.</p>', screen: 'library' });
  } else if (raviGarble()){
    apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'lib:reply', libReply: '<p>Ravi is describing the blue cups — where they come from, what’s in them, who drinks them — and you’re halfway through a pastry, half-listening. By the time she finishes you’ve lost the thread.</p>', notice: '−5 self-control', screen: 'library' });
  } else {
    apply({ clue3: true, selfcontrol: state.selfcontrol + 10, lastScene: 'lib:reply', libReply: '<p>“The blue samples,” Ravi says, lowering her voice. “I got a tester into one. It’s not water, and it’s not a supplement — it tastes sweet, syrupy, wrong, and it’s got a lab accession number, not a batch number. The campus store doesn’t stock them. They come from somewhere else.” She taps the table. “Somewhere on this campus makes those.”</p>', notice: 'Clue found: the taste of the blue sample. +10 self-control', screen: 'library' });
  }
});
addAction('lib:drones', function (){
  if (state.day < 100){
    apply({ lastScene: 'lib:reply', libReply: '<p>Ravi shrugs. “The drones are the least weird thing here. Ask me again later.” She says it like she’s already decided not to look too close.</p>', screen: 'library' });
  } else if (raviGarble()){
    apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'lib:reply', libReply: '<p>Ravi pulls up the drone flight logs and starts pointing at timestamps — and you’re watching one out the window instead, lulled, a little full, the food settling. You blink, and she’s waiting for you.</p>', notice: '−5 self-control', screen: 'library' });
  } else {
    apply({ clue4: true, selfcontrol: state.selfcontrol + 10, lastScene: 'lib:reply', libReply: '<p>Ravi has the drone flight logs up now, and she scrolls until the pattern is unmistakable. “Look at the route weights,” she says. “Every drone that passes the dorms spends extra time over the room doors — and they’re not all deliveries. Some of them are just logging.” She points at a cluster of pings. “The drones know your name, your schedule, your weight.” She closes the laptop. “They’re not delivering food. They’re keeping records.”</p>', notice: 'Clue found: the drones know your name. +10 self-control', screen: 'library' });
  }
});
addAction('lib:stuck', function (){
  if (state.day < 150){
    apply({ lastScene: 'lib:reply', libReply: '<p>Ravi goes quiet. “I’m not ready to ask that yet,” she says, and her voice is smaller than you’ve heard it.</p>', screen: 'library' });
  } else if (raviGarble()){
    apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'lib:reply', libReply: '<p>Ravi is trying to say something real — about leaving, about what happens at the end of the term — and you can feel the bed already, the next tray, the easy drift. You come back when she stops talking.</p>', notice: '−5 self-control', screen: 'library' });
  } else {
    apply({ clue5: true, selfcontrol: state.selfcontrol + 10, lastScene: 'lib:reply', libReply: '<p>“Why nobody leaves?” Ravi lets the question sit. “I went through the records. Every term, the students who make it to day three hundred — they don’t go home. They get a room upgrade. A permanent one.” She looks at you, and there’s no humor in it. “Nobody leaves at three hundred days. They just stop being asked.”</p>', notice: 'Clue found: nobody leaves at 300 days. +10 self-control', screen: 'library' });
  }
});
addAction('lib:truth', function (){
  if (raviGarble()){
    apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'lib:reply', libReply: '<p>You’re almost there. The whole truth is sitting in the room with you — and your body is heavier, softer, so much harder to move toward it. Ravi waits while you catch your breath.</p>', notice: '−5 self-control', screen: 'library' });
  } else if (state.selfcontrol >= 60 && state.clue1 && state.clue2){
    apply({ ending: 'truth', screen: 'truth' });
  } else if (state.selfcontrol < 60){
    apply({ selfcontrol: state.selfcontrol - 10, lastScene: 'lib:reply', libReply: '<p>You reach for it and come up empty. The words won’t line up — the gym, the terms, the samples, they’re all there, but your mouth can’t find the shape of the whole truth. Ravi watches you search for it, and her face is kind, and tired, and sure.</p>', notice: '−10 self-control', screen: 'library' });
  } else {
    apply({ lastScene: 'lib:reply', libReply: '<p>You try to lay it all out and it won’t close. Ravi tilts her head, listening, then shakes it slowly. “You’re missing a piece,” she says. “The gym? The terms? Something doesn’t line up yet. Go look again.”</p>', screen: 'library' });
  }
});
addAction('lib:reset', function (){
  apply({ lastScene: '', libReply: '', screen: 'library' });
});
