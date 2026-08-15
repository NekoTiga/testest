'use strict';

const stageObservation = [
  '<p>Piper is doing her stretches, talking a mile a minute about her training plan. Everything in this room is normal.</p>',
  '<p>Piper has a FreshFix bag by her bed. She laughs it off. “Free meals.” You almost believe her.</p>',
  '<p>Piper is on her bed with something from the commons. Her face is fuller, her voice rounder. She doesn’t mention training anymore. When she laughs — and she laughs a lot — it’s the same laugh, carrying more weight.</p>',
  '<p>Piper is on the bed, eating, watching the same show on loop. She greets you warmly — Piper was never not warm. The worst part is how happy she looks.</p>',
  '<p>Piper has two trays going and doesn’t get up for either of them. She’s heavy now, and she eats like it’s the one thing she still wants to win.</p>',
  '<p>Piper is huge now, propped on pillows with the scooter waiting by the bed. She eats continuously, contentedly, and waves at you with a hand that still has a pastry in it. She looks like she’s finally, completely at home.</p>',
  '<p>Piper is on the scooter, a drone feeding her, her belly vast and warm in her lap. She is enormous and she is radiant and she has stopped pretending otherwise.</p>',
  '<p>Piper is buried in her bed, the tray table a permanent fixture, the show looping on her laptop. She is enormous beyond anything she ever was, and the room has become a machine for keeping her exactly where she is — fed, full, content.</p>',
  '<p>Piper is naked in the bed, a feast spread around her, one hand feeding her and the other drifting idle and pleased between her thighs. She is enormous, and she is happy, and she is never getting up again. She doesn’t know there was ever anything else.</p>'
];

function cakeScene(){
  return `
    <p>Piper is on the floor stretching, ponytail swinging, mid-sentence about her training plan. A foil-wrapped cake sits on her desk, cut into squares.</p>
    <p>“Honey cake. I only bake on weekends, otherwise I’d never stop.” She grins. “Want a slice?”</p>
    <div class="actions">
      ${btn(lazy() ? 'Sure — slice of cake' : 'Take a slice', 'room:cake')}
      ${btn(lazy() ? 'Eh. Later.' : '“Maybe later.”', 'room:nocake')}
    </div>`;
}

function joinScene(){
  return `
    <p>Piper comes back from the commons with a tray. Then a second tray. She looks a little softer than she did at move-in — or is that just you noticing?</p>
    <p>“They gave me a free welcome meal,” she says. “Two of them, actually. It’d be rude to waste it. Join me?”</p>
    <div class="actions">
      ${btn('Join her', 'room:join')}
      ${btn('Suggest a run instead', 'room:run')}
    </div>`;
}

function confrontScene(){
  return `
    <p>Piper is where she’s been all week — on the bed, eating, watching the same show on loop. She greets you warmly. Piper was never not warm. The worst part is how happy she looks.</p>
    <p>You could say something. You could say nothing. Both feel like choices.</p>
    <div class="actions">
      ${btn('Say something', 'room:confront')}
      ${btn('Let it go', 'room:leave')}
    </div>`;
}

function piperPigScene(){
  return `
    <p>The door to the room has a slot at the bottom now — for the trays. Piper is in bed, and she is naked, and she is enormous in a way that makes the bed look small. The sheets are pushed down around her hips, and the mattress is buried under trays and torn wrappers and half-eaten pastries, and the show is looping on her laptop, and she is eating with both hands and moaning with every bite — a low, shameless sound that carries across the room, wet and greedy — while her other hand, the one not stuffing her mouth, works slow and idle between her thighs, her eyes half-closed, her hips grinding against her own fingers in a lazy rhythm she doesn’t try to hide.</p>
    <p>She opens her eyes and finds you, and a gooey grin spreads across her round face, crumbs stuck to her chin and the hollow of her throat. “Mmm — hey,” she moans, mouth full, and it comes out like she’s been waiting for you, like she was hoping you’d watch. “C’mere. Try this. The drones keep bringing it.” She reaches for the plate with her sticky hand, offering, her other hand still moving between her thighs, a low pleased hum rolling out of her as she chews. She is so happy, so completely and finally at peace, that the room seems to be made of it.</p>
    <p>You realize, standing there, that she isn’t going to get up. Not today. Not tomorrow. Not ever. Piper has become what the campus makes of everyone eventually — a soft, warm, moaning, feasting creature, one hand in the tray and one hand between her legs, perfectly at home in her own body, with no idea that she was ever supposed to be anything else.</p>
    <div class="actions">${btn('Say her name', 'room:ack')}</div>`;
}

function piper7Scene(){
  return `
    <p>Piper’s talking about the new dining credits like they’re a prize she won. If you’re going to say something — that she looks different, that none of this feels right — it has to be now.</p>
    <div class="actions">
      ${btn('Say something', 'piper7:say')}
      ${btn('Let it go', 'piper7:let')}
    </div>`;
}

addAction('room:cake', function (){
  apply({ s0done: true, lbs: state.lbs + 2, glut: state.glut + 1, lastScene: 'room:cake', notice: '+2 lbs · +1 glut', screen: 'room' });
});
addAction('room:nocake', function (){
  apply({ s0done: true, lastScene: 'room:nocake', notice: '', screen: 'room' });
});
addAction('room:join', function (){
  apply({ s1done: true, lbs: state.lbs + 4, glut: state.glut + 1, selfcontrol: state.selfcontrol - 10, lastScene: 'room:join', notice: '+4 lbs · +1 glut · −10 self-control', screen: 'room' });
});
addAction('room:run', function (){
  apply({ s1done: true, selfcontrol: state.selfcontrol + 10, lastScene: 'room:run', notice: '+10 self-control', screen: 'room' });
});
addAction('piper7:say', function (){
  apply({ piperq: true, selfcontrol: state.selfcontrol + 10, lastScene: 'piper7-say', notice: '+10 self-control', screen: 'room' });
});
addAction('piper7:let', function (){
  apply({ piperq: true, selfcontrol: state.selfcontrol - 10, lastScene: 'piper7-let', notice: '−10 self-control', screen: 'room' });
});
addAction('room:confront', function (){
  apply({ s3done: true, selfcontrol: state.selfcontrol + 10, lastScene: 'room:confront', notice: '+10 self-control', screen: 'room' });
});
addAction('room:leave', function (){
  apply({ s3done: true, selfcontrol: state.selfcontrol - 10, lastScene: 'room:leave', notice: '−10 self-control', screen: 'room' });
});
addAction('room:ack', function (){
  apply({ piperPig: true, lastScene: 'room:ack', notice: 'She hums, happy, and goes back to the tray.', screen: 'room' });
});

AFTER['room:cake'] = '<p>The cake is warm and sweet. “Told you,” Piper says. “Weekends only.” It’s just cake. It’s normal.</p>';
AFTER['room:nocake'] = '<p>“Respect,” she says, and wraps it back up. “I’ll save you a piece for when your resolve cracks.”</p>';
AFTER['room:join'] = '<p>You split the second tray. It’s heavier food than you’d usually order — fried, sweet, easy. Piper laughs between bites. “This is so much better than training.” You don’t say anything.</p>';
AFTER['room:run'] = '<p>“Let’s go for a run instead. The quad’s empty.” Piper looks at the tray, then at you. “...Yeah. Okay.” She pulls on her trainers, and for a few blocks everything feels normal again.</p>';
AFTER['piper7-say'] = '<p>Her face goes still for one second. “Different good?” she says, and you know the conversation is already over. But you saw the second.</p>';
AFTER['piper7-let'] = '<p>She polishes off the whole tin. You say nothing. It’s the second tin this week.</p>';
AFTER['room:confront'] = '<p>“Piper. You look different. Are you okay?” She blinks, genuinely confused. “Different?” A second passes, and then she laughs — the same laugh. “I’m great. You look like you haven’t eaten.” You walk away knowing she didn’t hear you.</p>';
AFTER['room:leave'] = '<p>You close the door softly and stand in the hall a moment. It’s easier not to think about it. It gets easier every day.</p>';
AFTER['room:ack'] = '<p>“Piper.” She blinks up at you, slow, and for a second — just a second — something of the old her surfaces behind the softness, a flicker of the girl who ran at dawn. Then it’s gone, swallowed by the warmth and the food and the hum of the campus. “Yeah?” she moans, dreamy and full, her mouth working through another mouthful. “I’m good. I’m so good.” Her hand drifts back between her thighs, and she rocks against it once, twice, a low satisfied sound hitching out of her as she reaches for the next plate. “Don’t go,” she mumbles, mouth full. “Watch. It’s better with an audience.” The drones hum in the hall, waiting for the empties. You stand there a moment, and then you close the door gently, and the room settles back into its warm, full, moaning peace, and you can hear her start to eat again — and the low happy sound she makes around it — before you’ve taken two steps.</p>';
