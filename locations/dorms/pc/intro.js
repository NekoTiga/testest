'use strict';

addScreen('arrive', function (){
  return `
    <h2>Northgate University</h2>
    <p>Late August. The bus drops you at the east gate and you stand in the heat with a duffel on your shoulder, the strap digging into your collarbone, sweat beading at the back of your neck. You look up at the sandstone arches, your chest rising and falling in the close air.</p>
    <p>You’re here for free. That’s the part that hasn’t landed yet. The Tech Merit Scholarship — a full ride, meals included — for the campus-flagging system you built in your final year. Three hundred applicants. One slot. Your mother cried over the phone; your dad told you not to forget to eat.</p>
    <p>Somewhere over the commons roof, a few birds cross the early sky. The campus looks exactly like the brochure.</p>
    <div class="actions">${btn('Carry your duffel inside', 'nav', 'squad-hall')}</div>`;
});

addScreen('squad-hall', function (){
  return `
    <h2>Squad Hall</h2>
    <p>The hall smells like fresh paint and lemon cleaner. You set the duffel down at your feet and the strap slips off your shoulder, leaving a damp line across your shirt. A resident assistant in a campus polo meets you at the desk with a smile and a folder.</p>
    <p>“You’re the scholarship student. Room 217, corner suite. You’ve got two roommates already — Piper and Mina. Breakfast’s seven to ten, the gym’s open till ten.”</p>
    <p>The campus is still waking up around you. The quad is empty, the sky is clear. It’s quiet, and you stand in it with the duffel at your feet, your shoulder aching where the strap sat.</p>
    <div class="actions">${btn('Take your keys and head to Room 217', 'nav', 'room-intro')}</div>`;
});

addScreen('room-intro', function (){
  return `
    <h2>Room 217</h2>
    <p>Your room is a corner suite — three beds, a shared bathroom, a window over the quad. Two beds are already claimed.</p>
    <p>Piper looks up first. Thin, ponytail, runner’s build, cross-trainers drying on the radiator. “Hey! You’re the scholarship person! I’m Piper. Cross country, bio major, and I make a killer honey cake when I’m not running.”</p>
    <p>The third bed belongs to Mina, who waves once from behind a bio textbook and doesn’t look up. “Mina. Pre-med.” You set your duffel on the third bed and the springs creak under its weight.</p>
    <p>Piper gestures at the window. “You get the bed by the window. Sunrise is nice.”</p>
    <div class="actions">${btn('Get settled and unpack', 'intro-done')}</div>`;
});

addAction('intro-done', function (){
  apply({ piper1: true, screen: 'hub', lastScene: '', notice: 'Day 1 begins.' });
});
addAction('accept-band', function (){
  apply({ bandHandout: true, screen: 'hub', lastScene: '', notice: 'The band settles around your wrist. It chimes: “Good morning, well-being 72.” Across the hall, Piper and Mina are already being fitted with theirs.' });
});
