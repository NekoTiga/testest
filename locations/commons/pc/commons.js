'use strict';

addScreen('commons', function (){
    const phase = commonsPhase();
    const L = mealLabels(phase);
    const lightLock = state.selfcontrol < 60;
    const medLock = lazy();
    const heavy = canAfford(90);
    const gs = greaseStage();
    const eatAfter = AFTER[state.lastScene];
    const zolaOrdering = state.metZola && state.submission > 50 && state.zolaOrderDay !== state.day;
    const zolaHere = state.day >= 30 && zolaWhere() === 'commons';
    let html = '<h2>The dining commons</h2>';
    if (isNight()){
      html += '<p>The dining commons is closing for the night — the chairs are already stacked on the tables and the serving line is dark. The vending machine still hums by the stairs. Whatever it sells, it sells all night.</p>';
    } else {
      html += CROWD[phase];
    }
    if (zolaHere) html += zolaCommonsFlavor();
    if (state.day >= 30 && !zolaHere){
      html += '<p class="small">Zola’s table sits empty — she’s back in her room for the night, the way she is after dark. The drones still loop the room, patient, waiting.</p>';
    }
    html += vibCrowdFlavor();
    if (wTier(state.lbs) >= 4){
      html += (scooterActive() || state.agrav)
        ? '<p>You don’t take a chair. Your scooter hums to the end of the aisle and you stay on it, the seat taking your full weight low and easy, and the tray is already being fitted to the handlebars. Around you the commons is full of scooters and chairs, students eating where they sit, and you eat where you ride, your belly resting heavy against the tray. You don’t get off. You haven’t gotten off in a while.</p>'
        : '<p>You take your tray to a table and lower yourself into a chair carefully. It takes your weight with a low creak, the frame groaning as you settle, and your hips spread wide over the seat, soft and heavy, pressing into the edges. You’ve started picking the end of the benches, where you have room for the wide of you. Nobody has ever said anything about it.</p>';
    }
    if (eatAfter) html += typeof eatAfter === 'function' ? eatAfter() : eatAfter;
    if (zolaOrdering) html += zolaOrderPanel();
    html += vibPortableFlavor();
    html += vibCommonsMates();
    html += '<div class="actions">' +
      btn(lightLock ? 'Light — you’re too hungry to stop there' : L.light, 'eat:light', null, zolaOrdering || lightLock) +
      btn(medLock ? 'Medium — the app has already ordered for you' : L.medium, 'eat:medium', null, zolaOrdering || medLock) +
      (gs >= 1
        ? stageBtn(gs, 'FEAST — everything, seconds included (90 cr)', 'eat:feast', null, zolaOrdering || !heavy)
        : btn(heavy ? L.heavy : 'Heavy — not enough credits', 'eat:heavy', null, zolaOrdering || !heavy)) +
      btn(lazy() ? 'Water — sure (free)' : 'Just water (free)', 'eat:water', null, zolaOrdering) +
      (bandWorn() && !state.sampleUsed ? btn('Free wellness sample (the band says yes)', 'eat:sample', null, zolaOrdering) : '') +
      (bandWorn() && !state.secondsUsed ? btn('Free second tray (the app says you need it)', 'eat:seconds', null, zolaOrdering) : '') +
      (state.day >= 30 && zolaHere ? btn(state.metZola ? 'Visit Zola at her table' : 'Talk to Zola', 'zola:meet', null, zolaOrdering) : '') +
      btn('Leave', 'nav', 'hub', zolaOrdering) +
      '</div>';
    html += phase >= 1
      ? '<p class="small">By the stairs, the vending machine hums, restocked. A cluster of students sips from little blue cups.</p>'
      : '<p class="small">By the stairs, a vending machine hums, waiting for restocking.</p>';
    if (!bandWorn() && state.bandHandout){
      html += '<p class="small">The vending machine and the drones make no move toward you. You’re not in their system anymore.</p>';
    }
    return html;
});

