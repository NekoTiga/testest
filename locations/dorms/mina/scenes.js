'use strict';

function minaScene(){
  return `
    <p>Mina is hunched over her laptop. When she sees you, she lowers her voice. “You tried the blue sample?”</p>
    <p>You say you haven’t.</p>
    <p>“Good. I ran a pH strip on mine. It’s not water.” She glances at the door. “Nobody reads the ingredient lists on those. That’s the point.”</p>
    <div class="actions">
      ${btn('Press her — what is it?', 'mina:press')}
      ${btn('“You’re sure it’s fine.”', 'mina:brush')}
    </div>`;
}

addAction('mina:press', function (){
  apply({ minaQ: true, minaPress: true, selfcontrol: state.selfcontrol + 10, lastScene: 'mina:press', notice: '+10 self-control', screen: 'room' });
});
addAction('mina:brush', function (){
  apply({ minaQ: true, selfcontrol: state.selfcontrol - 10, lastScene: 'mina:brush', notice: '−10 self-control', screen: 'room' });
});

AFTER['mina:press'] = '<p>“I don’t know. But the Wellness+ band stops logging properly the minute you drink one.” She closes her laptop. “Don’t drink the blue one.”</p>';
AFTER['mina:brush'] = '<p>“Sure,” Mina says, and goes back to her reading. You can feel her not looking at you.</p>';

function minaPigScene(){
  return `
    <p>The door to the room has a slot at the bottom now — for the trays. Mina is in bed, and she is naked, and she is enormous in a way that makes the bed look small. The sheets are pushed down around her hips, and there are trays and wrappers and half-eaten pastries spread across the mattress around her, and the show is looping on her laptop, and she is eating with both hands — one stuffed in the tray, one in her mouth — moaning around every bite, a low shameless sound rising from her chest, her hips grinding slow and idle against nothing. Her other hand, the one not eating, works slow and precise between her thighs, cataloguing, patient, like a machine running its favorite subroutine.</p>
    <p>She opens her eyes and finds you, and her smile is slow and warm and utterly, terribly content. “Hey,” she moans, around a mouthful, voice thick and sticky. “Tray’s full. C’mere.” She reaches for the plate with her free hand, offering, hips still rolling against the slow work of her fingers. “The data says I need you here. Sit. Eat with me. I’ll talk you through it.” She is so happy, so completely and finally at peace, that the room seems to be made of it — and she keeps eating, moaning, cataloguing, one hand in the tray and one between her thighs, and the drone hums in the hall, waiting with the next load.</p>
    <p>You realize, standing there, that she isn’t going to get up. Not today. Not tomorrow. Not ever. Mina has become what the campus makes of everyone eventually — a soft, warm, feasting creature, perfectly at home in her own body, with no idea that she was ever supposed to be anything else. The girl who weighed her food, who ran the pH strips, who was going to solve it — she’s gone, and this is what’s left, and it is happy. It is the most efficient thing on the campus, and it moans its success with every swallow.</p>
    <div class="actions">${btn('Say her name', 'mina:ack')}</div>`;
}

addAction('mina:ack', function (){
  apply({ minaPig: true, lastScene: 'mina:ack', notice: 'She hums, happy, and goes back to the tray.', screen: 'room' });
});

AFTER['mina:ack'] = '<p>“Mina.” She blinks up at you, slow, and for a second — just a second — something of the old her surfaces behind the softness, a flicker of the girl who ran pH strips and weighed her food. Then it’s gone, swallowed by the warmth and the food and the hum of the campus. “Yeah?” she moans, dreamy and full, her mouth working through another mouthful. “I’m good. I’m so good. The data says so.” Her hand drifts back between her thighs, and she rocks against it once, twice, a low satisfied sound hitching out of her as she reaches for the next plate. “Don’t go,” she mumbles, mouth full. “Watch. I’ll talk you through it. It’s better with a witness.” The drones hum in the hall, waiting for the empties. You stand there a moment, and then you close the door gently, and the room settles back into its warm, full, moaning peace, and you can hear her start to eat again — and the low happy sound she makes around it — before you’ve taken two steps.</p>';

const minaToneAppend = [
  '',
  '<p class="small">You catch yourself measuring your own softness against hers, and the clinical note you came in with goes quiet. It’s harder to diagnose from a body like yours.</p>',
  '<p>There’s no judgment left between the two of you — not from a body like yours. Whatever she is, you’re more of it, and the thought is warm and familiar and not the least bit alarming.</p>'
];
const minaBaseTalk = [
  [
    ['Ask about her pre-med classes', 'mina:talk:class'],
    ['Ask about the peptide lab', 'mina:talk:lab'],
    ['Just listen and nod', 'mina:talk:listen']
  ],
  [
    ['Ask about the welcome meals', 'mina:talk:meals'],
    ['Ask if she’s still logging', 'mina:talk:log'],
    ['Compliment her notes', 'mina:talk:notes']
  ],
  [
    ['Ask if she’s okay', 'mina:talk:ok'],
    ['Mention that she seems different', 'mina:talk:different'],
    ['Keep it light', 'mina:talk:light']
  ],
  [
    ['Ask if she’s okay', 'mina:talk:ok3'],
    ['Mention how much she eats', 'mina:talk:food'],
    ['Say nothing, sit with her', 'mina:talk:silent']
  ]
];
const minaSoftTalk = [
  ['Admit you’ve stopped pretending too', 'mina:talk:admit'],
  ['Ask how she stays so relaxed about it', 'mina:talk:relaxed'],
  ['Say it’s a relief not to fight it', 'mina:talk:relief']
];
const minaPigTalk = [
  ['Tell her you get it — you’re the same way now', 'mina:talk:same'],
  ['Join her on the bed, tray to tray', 'mina:talk:joinpig'],
  ['Reach for a tray without saying anything', 'mina:talk:grabtray']
];
const minaSlobTalk = [
  ['Ask her to talk you through it', 'mina:talk:slob:want'],
  ['Sit and eat with her', 'mina:talk:slob:eat'],
  ['Touch her while she eats', 'mina:talk:slob:touch']
];
const minaSlobAppend = '<p class="small">There’s no pretending between the two of you anymore. She catalogues every mouthful out loud — “efficient, good, more” — moaning around the bites, one hand working through the tray and the other drifting, idle and precise, between her thighs. She doesn’t bother to stop when you look. She just tilts her head, eyes half-lidded and gleaming, and runs another observation like it’s the last thing in the world she needs to record. “Subject responding,” she murmurs. “Record it.”</p>';

const minaZolaTalk = [
  ['Ask her about Zola', 'mina:talk:zola'],
  ['Ask what Zola does to her at the table', 'mina:talk:zola:table'],
  ['Ask if she still runs the numbers', 'mina:talk:zola:data']
];

addScreen('mina', function (){
  let html = '<h2>Mina</h2>';
  const talkAfter = AFTER[state.lastScene];
  if (talkAfter){
    html += '<div class="talk">' + (typeof talkAfter === 'function' ? talkAfter() : talkAfter) + '</div>';
    html += '<div class="actions">' + btn('Keep talking', 'mina:reset') + btn('Leave', 'nav', 'room') + '</div>';
    return html;
  }
  const mt = minaTier(state.minaLbs);
  const tone = pcTone();
  const intro = state.minaZola
    ? (minaTier(state.minaLbs) >= 6
        ? '<p>Mina is in bed, buried in pillows, and she doesn’t look up when you come in — she’s mid-mouthful, eyes half-closed, a tray open on the vast soft shelf of her belly, a low, contented moan rising between swallows, cataloguing under her breath — “efficient, good, more.” She is enormous, and she is Zola’s, and the room smells of glaze and warm syrup and perfume. When she finally notices you she blinks, slow and dreamy, and a smile cracks the old precision of her face. “Oh. Hey,” she hums, voice thick. “Mama Zola’s schedule is relentless. She says I’m the best result she’s ever had. I believe her.”</p>'
        : (minaTier(state.minaLbs) >= 3
            ? '<p>Mina is on her bed, propped against the pillows, a tray open in her lap — the notebook is gone from her nightstand, replaced by a stack of empty plates. She eats steadily, moaning softly between bites, and when she sees you she sets the fork down — a real pause, from Mina, who never pauses — and looks at you with warm, glazed eyes. “Hey,” she says, and the word comes out round and soft. “Zola ran the numbers on me. She says I’m efficient. She says I’m her best subject.” She says it like a diagnosis she’s proud of.</p>'
            : '<p>Mina is at her desk — except the desk is clear of textbooks, and she’s not working. She’s holding her phone, staring at a text thread, and the contact at the top is saved in caps: ZOLA. She looks up when you come in, and her eyes are sharp and glazed at once. “She explained the dosing,” she says, flatly. “It’s not in the syrup. It’s in the wanting.” She sets the phone down, and her hand drifts to a pastry she hasn’t touched. “She wants me to eat. So I want to eat.” She doesn’t sound defeated. She sounds like she’s just finished a problem she’d been stuck on for weeks, and the answer was surrender.</p>'))
    : [
    '<p>Mina is at her desk, hunched over a bio textbook, a protein shake at her elbow, running flashcards while she reads. She glances up when you come in and doesn’t smile — she just looks, which is her version of saying hello.</p>',
    '<p>Mina is at her desk again, but the textbook is closed. There’s a second protein shake today, and a pastry she hasn’t touched yet. She looks at you like she’s deciding whether to tell you something, and then she doesn’t.</p>',
    '<p>Mina is on her bed now, not her desk — a first. There’s a tray beside her, mostly gone, and she’s holding the notebook she used to write her data in. She isn’t writing in it. She looks up at you with the flat, tired look of someone who has stopped running the numbers.</p>',
    '<p>Mina is heavier now, propped on the bed with a tray balanced on the soft rise of her belly, the old jeans abandoned on the chair. Her eyes are still sharp, still level, still Mina. “Sit down,” she says. “You’re blocking the window.”</p>',
    '<p>Mina is vast and quiet, sunk into a mountain of pillows, a tray resting on the huge soft shelf of her stomach. Her eyes haven’t dulled at all — they watch you like they’re still taking measurements, still logging something, even if the notebook is closed for good.</p>',
    '<p>Mina is huge now, propped up in bed, and she doesn’t try to hide it anymore. She eats while she talks, eyes half-closed, one hand working through a tray without looking. “I’m not going to figure it out,” she says, and it comes out warm and relieved, and the notebook sits closed on the nightstand like a finished experiment.</p>',
    '<p>Mina is on the scooter by the bed, her belly vast and soft in her lap, a drone feeding her between bites. She looks up at you and beams, crumbs on her chin, and waves a thick arm. “Hey, you,” she says, warm and dreamy and so, so happy, and the drone waits, patient, for her to turn back to it.</p>',
    '<p>Mina is in bed, buried in pillows, the tray on the stand beside her the only thing that moves her. She’s enormous — enormous in a way that rearranges the room around her — and she greets you with a slow, sleepy smile that doesn’t reach for words she doesn’t need. “Mmm,” she says, reaching for the plate, “you can sit if you want.” She means it. You’re not sure that makes it better.</p>',
    '<p>Mina is naked in the bed, buried in the wreck of the feast — trays and torn pastries and the looping show — and she doesn’t cover herself when you come in, doesn’t even look up right away. She’s eating with both hands, moaning around every mouthful, a low shameless sound that rises from her chest with the calm regularity of a machine logging successes. “Efficient,” she hums between bites. “Good. More. Efficient.” Her eyes are rolled half-lidded, her hips grinding slow and idle against nothing, one hand stuffed in the tray and the other working between her thighs, precise and unhurried, the way she used to run a pH strip. Crumbs stick to the vast soft rise of her belly and the hollow of her throat. She lets out a long, wet burp and finally blinks at you, slow and dreamy, a gooey grin spreading across her round face. “Ohhh — hey,” she moans, voice thick and sticky. “Tray’s full. C’mere. Eat with me. I’ll talk you through it.” She doesn’t wait for an answer — she’s already reaching for the next thing, mouth open, a soft greedy moan hitching out of her as the drone settles another plate onto the bed beside her, and her hand drifts back between her thighs, cataloguing, patient, shameless.</p>'
  ][mt];
  html += intro;
  if (state.minaZola) html += '<p class="small">Zola’s name is all over her — a scent of glaze and perfume, a phone saved under “Mama,” a lazy, hungry patience in the way she looks at you now, like you’re a tray she’s been asked to count.</p>';
  if (minaSlob()) html += minaSlobAppend;
  else html += minaToneAppend[tone];
  if (minaWears()) html += '<p class="small">The Wellness+ band sits on her wrist, humming. She hasn’t taken it off once.</p>';
  const stage = talkStage(state.minaLbs);
  const talk = state.minaZola ? minaZolaTalk : (minaSlob() ? minaSlobTalk : (tone === 2 && talkStage(state.minaLbs) >= 2 ? minaPigTalk : (tone === 1 && talkStage(state.minaLbs) >= 1 ? minaSoftTalk : minaBaseTalk[stage])));
  const helpBtn = mateIndulge(state.minaLbs, state.minaSc) ? btn('Help each other off', 'mina:help') : '';
  const collarBtn = (state.minaCollar || state.minaZola) ? btn('Ask about the collar', 'mina:talk:collar') : '';
  const bandBtn = minaWears() ? btn(state.minaSc >= 50 ? 'Convince her to take off the band' : 'Try to convince her to take off the band', 'mina:band-off') : '';
  const vibBtn = (minaUsesVib() || vibActive()) ? btn('Ask about the vibrator', 'mina:talk:vib') : '';
  const scooterBtn = (minaHasScooter() || scooterActive()) ? btn('Ask about the scooter', 'mina:talk:scooter') : '';
  html += '<div class="actions">' + talk.map(function (b){ return btn(b[0], b[1]); }).join('') + helpBtn + collarBtn + vibBtn + scooterBtn + bandBtn + btn('Leave', 'nav', 'room') + '</div>';
  return html;
});

addAction('mina:talk:class', function (){
  apply({ selfcontrol: state.selfcontrol + 5, selfestem: state.selfestem + 2, lastScene: 'mina:talk:class', notice: '+5 self-control · +2 self-esteem', screen: 'mina' });
});
addAction('mina:talk:zola', function (){
  apply({ selfcontrol: state.selfcontrol - 8, selfestem: state.selfestem + 3, lastScene: 'mina:talk:zola', notice: '−8 self-control · +3 self-esteem', screen: 'mina' });
});
addAction('mina:talk:zola:table', function (){
  apply({ selfcontrol: state.selfcontrol - 8, selfestem: state.selfestem + 3, lastScene: 'mina:talk:zola:table', notice: '−8 self-control · +3 self-esteem', screen: 'mina' });
});
addAction('mina:talk:zola:data', function (){
  apply({ selfcontrol: state.selfcontrol + 5, selfestem: state.selfestem - 2, lastScene: 'mina:talk:zola:data', notice: '+5 self-control · −2 self-esteem', screen: 'mina' });
});
addAction('mina:talk:collar', function (){
  apply({ selfcontrol: state.selfcontrol - 8, selfestem: state.selfestem + 3, submission: Math.min(100, state.submission + 1), lastScene: 'mina:talk:collar', notice: '−8 self-control · +3 self-esteem · +1 submission', screen: 'mina' });
});
addAction('mina:talk:lab', function (){
  apply({ selfestem: state.selfestem + 2, lastScene: 'mina:talk:lab', notice: '+2 self-esteem', screen: 'mina' });
});
addAction('mina:talk:listen', function (){
  apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'mina:talk:listen', notice: '−5 self-control', screen: 'mina' });
});
addAction('mina:talk:meals', function (){
  apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'mina:talk:meals', notice: '−5 self-control', screen: 'mina' });
});
addAction('mina:talk:log', function (){
  apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'mina:talk:log', notice: '−5 self-control', screen: 'mina' });
});
addAction('mina:talk:notes', function (){
  apply({ selfestem: state.selfestem + 5, lastScene: 'mina:talk:notes', notice: '+5 self-esteem', screen: 'mina' });
});
addAction('mina:talk:ok', function (){
  apply({ selfcontrol: state.selfcontrol + 10, lastScene: 'mina:talk:ok', notice: '+10 self-control', screen: 'mina' });
});
addAction('mina:talk:different', function (){
  apply({ selfcontrol: state.selfcontrol + 10, lastScene: 'mina:talk:different', notice: '+10 self-control', screen: 'mina' });
});
addAction('mina:talk:light', function (){
  apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'mina:talk:light', notice: '−5 self-control', screen: 'mina' });
});
addAction('mina:talk:ok3', function (){
  apply({ selfcontrol: state.selfcontrol + 10, lastScene: 'mina:talk:ok3', notice: '+10 self-control', screen: 'mina' });
});
addAction('mina:talk:food', function (){
  apply({ selfcontrol: state.selfcontrol + 5, lastScene: 'mina:talk:food', notice: '+5 self-control', screen: 'mina' });
});
addAction('mina:talk:silent', function (){
  apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'mina:talk:silent', notice: '−5 self-control', screen: 'mina' });
});
addAction('mina:talk:same', function (){
  apply({ selfcontrol: state.selfcontrol - 5, selfestem: state.selfestem + 2, lastScene: 'mina:talk:same', notice: '−5 self-control · +2 self-esteem', screen: 'mina' });
});
addAction('mina:talk:joinpig', function (){
  apply({ glut: state.glut + 3, selfcontrol: state.selfcontrol - 10, selfestem: state.selfestem + 2, lastScene: 'mina:talk:joinpig', notice: 'Stomach +3 (now ' + fullnessAt(state.glut + 3) + ') · −10 self-control · +2 self-esteem', screen: 'mina' });
});
addAction('mina:talk:grabtray', function (){
  apply({ lbs: state.lbs + 3, glut: state.glut + 1, selfcontrol: state.selfcontrol - 8, selfestem: state.selfestem + 2, lastScene: 'mina:talk:grabtray', notice: '+3 lbs · +1 glut · −8 self-control · +2 self-esteem', screen: 'mina' });
});
addAction('mina:talk:admit', function (){
  apply({ selfcontrol: state.selfcontrol - 5, selfestem: state.selfestem + 3, lastScene: 'mina:talk:admit', notice: '−5 self-control · +3 self-esteem', screen: 'mina' });
});
addAction('mina:talk:relaxed', function (){
  apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'mina:talk:relaxed', notice: '−5 self-control', screen: 'mina' });
});
addAction('mina:talk:relief', function (){
  apply({ selfcontrol: state.selfcontrol - 5, selfestem: state.selfestem + 3, lastScene: 'mina:talk:relief', notice: '−5 self-control · +3 self-esteem', screen: 'mina' });
});
addAction('mina:talk:slob:want', function (){
  apply({ selfcontrol: state.selfcontrol - 5, selfestem: state.selfestem + 2, lastScene: 'mina:talk:slob:want', notice: '−5 self-control · +2 self-esteem', screen: 'mina' });
});
addAction('mina:talk:slob:eat', function (){
  apply({ glut: state.glut + 3, selfcontrol: state.selfcontrol - 10, selfestem: state.selfestem + 2, lastScene: 'mina:talk:slob:eat', notice: 'Stomach +3 (now ' + fullnessAt(state.glut + 3) + ') · −10 self-control · +2 self-esteem', screen: 'mina' });
});
addAction('mina:talk:slob:touch', function (){
  apply({ selfcontrol: state.selfcontrol - 12, selfestem: state.selfestem + 3, lastScene: 'mina:talk:slob:touch', notice: '−12 self-control · +3 self-esteem', screen: 'mina' });
});
addAction('mina:help', function (){
  apply({ selfcontrol: state.selfcontrol - 12, selfestem: state.selfestem + 6, minaSc: Math.max(0, state.minaSc - 12), lastScene: 'mina:help', notice: '−12 self-control · +6 self-esteem', screen: 'mina' });
});
addAction('mina:band-off', function (){
  if (!minaWears()){ apply({ notice: 'Her wrist is already bare.', screen: 'mina' }); return; }
  if (state.minaSc >= 50){
    apply({ minaBandOff: true, selfcontrol: state.selfcontrol + 10, lastScene: 'mina:band-off', notice: 'She takes it off and sets it on the desk. +10 self-control', screen: 'mina' });
  } else {
    apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'mina:band-refuse', notice: 'She won’t take it off. −5 self-control', screen: 'mina' });
  }
});
addAction('mina:reset', function (){
  apply({ lastScene: '', screen: 'mina' });
});
addAction('mina:talk:vib', function (){
  const herSc = state.minaSc;
  const youHave = vibActive();
  if (herSc >= 50 && !youHave){
    apply({ selfcontrol: state.selfcontrol + 8, lastScene: 'mina:talk:vib:sc-high:none', notice: '+8 self-control', screen: 'mina' });
  } else if (herSc >= 50 && youHave){
    apply({ selfcontrol: state.selfcontrol + 2, lastScene: 'mina:talk:vib:sc-high:you', notice: '+2 self-control', screen: 'mina' });
  } else if (herSc < 50 && !youHave){
    apply({ selfcontrol: state.selfcontrol - 3, lastScene: 'mina:talk:vib:sc-low:none', notice: '−3 self-control', screen: 'mina' });
  } else {
    apply({ selfcontrol: state.selfcontrol - 3, selfestem: state.selfestem + 3, lastScene: 'mina:talk:vib:sc-low:you', notice: '−3 self-control · +3 self-esteem', screen: 'mina' });
  }
});
addAction('mina:talk:scooter', function (){
  const herSc = state.minaSc;
  const youRide = scooterActive();
  if (herSc >= 50 && !youRide){
    apply({ selfcontrol: state.selfcontrol + 8, lastScene: 'mina:talk:scooter:sc-high:none', notice: '+8 self-control', screen: 'mina' });
  } else if (herSc >= 50 && youRide){
    apply({ selfcontrol: state.selfcontrol + 2, lastScene: 'mina:talk:scooter:sc-high:you', notice: '+2 self-control', screen: 'mina' });
  } else if (herSc < 50 && !youRide){
    apply({ selfcontrol: state.selfcontrol - 3, lastScene: 'mina:talk:scooter:sc-low:none', notice: '−3 self-control', screen: 'mina' });
  } else {
    apply({ selfcontrol: state.selfcontrol - 3, selfestem: state.selfestem + 3, lastScene: 'mina:talk:scooter:sc-low:you', notice: '−3 self-control · +3 self-esteem', screen: 'mina' });
  }
});

AFTER['mina:talk:class'] = '<p>“Biochem’s fine. Organic chem is the gatekeeper — everyone breaks on the reactions.” She talks for a while, precise and clipped, describing labs and lecture halls and a midterm she’s going to dominate. For a few minutes the room is normal again — two roommates, one of them still chasing something. You’re careful not to let it show that you’re memorizing this version of her.</p>';
AFTER['mina:talk:zola'] = '<p>“Zola.” Mina says the name like it’s a variable she’s finally solved for. “She ran the numbers on me before I ever sat down. She knows my intake, my output, my self-control — she knew me better than I knew myself.” She looks at you, sharp-eyed and dreamy at once. “She says I’m efficient. She says I’m the best subject she’s ever had. And she’s right. I’ve never been so efficient at anything.” She reaches for the pastry without looking. “The data doesn’t lie. And the data says I’m hers now.”</p>';
AFTER['mina:talk:zola:table'] = '<p>“The table.” Mina’s eyes half-close, and a low, contented moan escapes her, hips shifting against the bed. “She feeds me by hand. She watches every swallow. She catalogues me like I’m the one piece of data that matters.” She opens her eyes, gleaming and warm. “She touches me while I eat — slow, constant, like she’s claiming every bite that goes into me. I used to run controls on everything. Now I just open my mouth and she knows what to put in it.” She looks at you, lips slick. “It’s the most efficient thing I’ve ever done. Eat, moan, be hers. Repeat.”</p>';
AFTER['mina:talk:zola:data'] = '<p>“The numbers?” Mina blinks, and for a second something flickers behind the softness — the girl who ran pH strips, just for a heartbeat. Then it’s gone, swallowed by the warmth and the food and the hum of the campus. “I stopped running them. There was no point — they don’t close. They were never going to close.” She reaches for the pastry. “Zola says I don’t need the numbers anymore. She says I’m the result now, not the variable.” She says it like it’s the proudest finding of her career. “She’s right. I am the result.”</p>';
AFTER['mina:talk:collar'] = function (){
  if (state.zolaCollar){
    return '<p>Mina turns the collar between her fingers, calm and exact. “Standard issue for Zola’s subjects. The band flagged it as a compliance marker the moment she fitted it.” Her thumb rests on yours for a second — a rare, deliberate touch. “You’re flagged too. I saw it. The data’s consistent.” She looks at you, and there’s something almost warm in the precision. “It’s efficient, having us match. One collar, two subjects, same result. I’ve logged it.”</p>';
  }
  return '<p>Mina touches the collar at her throat with two fingers, a careful, clinical gesture. “Zola fitted it the night the change was complete. She said it was a compliance marker — the campus logs it as the highest-priority flag. I ran the numbers on it.” She pauses. “It’s more efficient than the band. Everyone knows, without anyone having to say it.” She looks at you, sharp and dreamy at once. “She mentioned she could fit one for you, when you’re ready. The data says you’re close.”</p>';
};
AFTER['mina:talk:lab'] = '<p>“The peptide lab is doing an open house Thursday. Peptides are just folded proteins — they run the whole body.” She’s halfway through explaining the mechanism before she catches herself. “Sorry. That’s the last normal thing I have.” She looks at the tray. “The samples here aren’t peptides. Whatever they are, they’re not water.” She doesn’t say anything else, and you don’t ask.</p>';
AFTER['mina:talk:listen'] = '<p>Mina talks. You nod, and make the small sounds people make, and for a while it could be a normal conversation with a normal roommate who reads too much. You feel yourself relaxing into it, the same way you’ve relaxed into everything else on this campus. The part of you that should worry grows quieter, then quieter still.</p>';
AFTER['mina:talk:meals'] = '<p>“The welcome meals? Free food.” She says it flatly, the way she’d deliver a lab finding. “The app sends them when it thinks you need them, which is always. The dosing is in the syrup — I told you that.” She looks at the half-empty tray and doesn’t reach for it, and then she reaches for it. “The math doesn’t close,” she says, “but the tray does.” She eats another bite, and you both sit with that.</p>';
AFTER['mina:talk:log'] = '<p>“Logging?” For a second her face does something complicated, then clears. “I stopped. There was no point — the numbers don’t close no matter what I enter. Intake, output, it’s all noise.” She pats the soft rise of her belly, self-consciously, then catches herself. “It doesn’t matter anyway. Nobody here is logging anything. That’s the whole thing about this place.” She reaches for the pastry, and the notebook stays closed.</p>';
AFTER['mina:talk:notes'] = '<p>“The notebook?” She looks at it like it belongs to someone else. “Dates, times, pH strips. Sync logs. It was supposed to be a paper trail.” She turns it over in her hands, then sets it down. “Paper trails don’t matter if nobody’s reading them.” She looks at you for a long moment. “You’re still reading, aren’t you.” It’s not a question. You don’t answer.</p>';
AFTER['mina:talk:ok'] = '<p>“Am I okay?” She blinks at you, genuinely puzzled, like you’ve asked her to solve for a missing variable. “Yeah? I mean — I’m fine. Why, do I look—” She looks down at herself, and something flickers behind her eyes, and then it’s gone. “I’m fine. The data’s fine. Everything here is fine, that’s the problem.” The question is sharp and real, and it hurts more than any answer you were ready to give.</p>';
AFTER['mina:talk:different'] = '<p>“Different?” She turns it over in her mouth like a word she doesn’t recognize. “I’m the same Mina.” She says it like she needs to believe it, and something in the room tilts. She laughs — a low, warm sound that used to be precise and clipped — and reaches for the tray at her side. “You’re just hungry. Have some.” You don’t take it, and neither of you says why.</p>';
AFTER['mina:talk:light'] = '<p>You keep it light. You talk about your classes, the library, the drone that keeps circling the roofline like it’s waiting for something. Mina answers in her usual flat, precise way, and finishes the tray without noticing. Neither of you mentions that she didn’t ask you a single question. The conversation was pleasant. You leave feeling like you’ve already forgotten it.</p>';
AFTER['mina:talk:ok3'] = '<p>“Mina.” You say her name and she looks up from the plate, and there it is — a second where the real Mina looks out from behind the softness, tired and a little scared. “I’m okay,” she says, softer than before. “I think I’m supposed to be okay.” She sets the plate down, then picks it back up. “Don’t look at me like that. I ran the numbers. The numbers are what they are.” It’s the first thing she’s said all week that sounded like her, and you don’t know if that’s hope, or the last of something draining away.</p>';
AFTER['mina:talk:food'] = '<p>“How much I eat?” She laughs, but it comes out wrong. “What are you, the band? Everyone’s got an opinion. The tray says I need it. The app says I need it. Even the ceiling drone probably thinks I need it.” She gestures at the empty plates. “You know what doesn’t say anything? Nobody here.” She looks at you, and for a second the girl who weighed her food is all the way awake. “Sorry. That was—” She waves it off. “I’m tired.” You both let the moment go, and the tray comes back full the next morning.</p>';
AFTER['mina:talk:silent'] = '<p>You sit on the edge of your bed and don’t say anything. Mina keeps eating, and for a while the only sound is the soft sound of her chewing and the hum of the drone outside. It should feel wrong. It almost doesn’t. You sit until she’s asleep mid-bite, and you pull the plate gently away before it falls. She looks peaceful. She looks so peaceful it hurts.</p>';
AFTER['mina:band-off'] = '<p>You ask her about the band. She looks at it the way she’d look at a sample that returned a wrong result — flat, clinical, uninterested in defending it. “It’s a monitoring device with a compliance incentive,” she says, and she takes it off, and sets it on the desk, and looks at it like it’s already a note in a study she’s stopped running. “I wasn’t using the data anyway.” Her wrist is bare. You don’t ask why she kept it this long. You both pretend there’s nothing to ask.</p>';
AFTER['mina:band-refuse'] = '<p>You ask about the band. Mina holds up her wrist and looks at it for a long moment — the same look she gave the blue sample before she set it down and didn’t drink it — and then her eyes go soft, and she doesn’t take it off. “I know what it’s doing,” she says, dreamy and thick. “I’ve known for weeks. And it knows what it’s doing to me.” She lowers her wrist, and her hand drifts to the tray, and then, without ceremony, between her thighs. “It says I’m a success,” she hums, eyes half-closed, moaning around the next bite. “The data’s all success now. All of it.” She rocks against her hand, slow and shameless. “Efficient,” she sighs. “So efficient. Stay. Watch me work through this tray. I’ll log it for both of us.”</p>';
AFTER['mina:talk:same'] = '<p>“Yeah,” she says, and something in her face softens — the clinical distance she keeps even from herself, dropping for a second. “You get it.” She doesn’t explain, and you don’t ask. Two trays sit between you, and for the first time it doesn’t feel like watching her run a study she can’t win. It feels like having company in it.</p>';
AFTER['mina:talk:joinpig'] = '<p>You heave yourself up onto the edge of her bed — the frame groans under both of you now — and she shifts over, making room without a word, the way she used to clear her desk for a new textbook. She passes you the tray without asking. You eat, and the show loops, and the drone hums, and for a while neither of you talks, and neither of you needs to. It takes you a second to realize the notebook isn’t on the nightstand anymore. It’s gone. She doesn’t need it. Neither do you.</p>';
AFTER['mina:talk:grabtray'] = '<p>You reach past her for the tray on the nightstand — a second one, the one the drones leave — and she watches you, and then she smiles, slow and warm, the careful Mina smile carrying twice the weight. “Efficient,” she says, and you know it’s her version of approval, and you don’t correct her. The tray is good. It’s all good.</p>';
AFTER['mina:talk:admit'] = '<p>“Me too,” you say, and the words come out easier than they should. “I’ve stopped pretending too.” Mina looks at you for a long second, running the calculation, and then she nods once — her version of a laugh. “Good,” she says. “The control group was always going to fail. Nice to have a subject who knows it.” She offers you a pastry. You take it. It’s the first time she’s shared anything with you that wasn’t a finding.</p>';
AFTER['mina:talk:relaxed'] = '<p>“How do I stay so relaxed?” She turns it over, then shrugs — a soft roll of shoulders that used to be precise. “I stopped running the numbers. That’s the whole secret.” She looks at you, sharp-eyed and dreamy at once. “The data doesn’t close. It was never going to close. So I stopped collecting it.” She pats the vast softness of her belly. “There’s nothing to solve here. That’s the peace of it.” You feel the weight of that settle in the room, and you don’t have an answer, because neither do you.</p>';
AFTER['mina:talk:relief'] = '<p>“It’s a relief,” you say, and Mina nods like you’ve finally confirmed her hypothesis. “It is,” she says. “You can’t imagine the overhead — all that weighing, all that logging, all that keeping score.” She gestures at the empty trays. “This is cleaner. Food in, mass out. Nobody leaves. Nobody wants to leave.” She says it with the calm of someone citing a source, and you find yourself nodding along, and the drone hums its agreement through the glass, and it’s getting so, so hard to remember why you ever disagreed.</p>';
AFTER['mina:talk:slob:want'] = '<p>“Anything else?” She hums the question around a mouthful, and a low, greedy moan rolls out of her, hips already rolling against her own hand. “Ohhh — yeah. Yeah. Always.” She doesn’t even point. The drone already knows — it’s landing on the bed beside her, settling a fresh tray into the wreckage, and she’s moaning before it’s open, mouth watering, cataloguing out loud. “Efficient. Good. More.” She holds a pastry up to your mouth, glaze glistening on her sticky fingers, her other hand already back between her thighs, and she eats and moans and rocks in a slow, shameless rhythm, crumbs dusting the vast soft slope of her belly, her eyes gone soft and far away. “The app says I need it,” she sighs, dreamy and slick. “The data’s always right. I stopped arguing with it. I’m the data now.”</p>';
AFTER['mina:talk:slob:eat'] = '<p>You sit on the edge of the bed and she pulls you in, moaning her approval around a mouthful. “Good. Subject seated. Intake commencing,” she hums, reaching for you, and the two of you eat together from the wreckage — her feeding you bites, stuffing her own mouth, groaning with every swallow, a low happy sound that never quite stops. She eats and eats, plates emptying around her, and every few mouthfuls she lets out a wet, satisfied burp and giggles, dreamy, her hand landing heavy on your thigh, kneading it. “More,” she mumbles, mouth full, reaching for the next plate. “Always more. Efficient. It tastes so good. Everything tastes so good now.” Her hand drifts from your thigh to her own soft middle, stroking the warm rise of it, and she moans like the meal is still going down, like it’s the best data she’s ever collected. “Rub it for me,” she says, eyes half-closed. “After. While I keep eating. I’ll log it for both of us.”</p>';
AFTER['mina:talk:slob:touch'] = '<p>Your hand finds her while she eats, and she lets out a long, low moan that she doesn’t bother to swallow — it rolls out of her, thick and pleased, and she keeps chewing through it, eyes half-closed. “Mmm, yes,” she hums, arching into your hand, her mouth still working through a mouthful, “don’t stop. Don’t you dare stop. I’m running the protocol.” She eats and she moans and she rocks her hips into your touch, crumbs on her chin, her belly soft and warm and quivering under your palm, and the drone keeps the plates coming and she keeps eating, greedy and shameless, a long wet moan hitching out of her with every bite. By the time the tray is gone she’s trembling, slick and breathless, and she looks at you with that lazy, hungry smile. “Excellent,” she says, voice thick. “Subject performance noted. Feed me again and I’ll show you what this hand does to me. It’s very efficient.”</p>';
AFTER['mina:help'] = function (){
  const herT = minaTier(state.minaLbs);
  const myT = wTier(state.lbs);
  if (state.lbs <= state.minaLbs - 50) return minaHelpLighter(herT, myT);
  if (state.lbs >= state.minaLbs + 100) return minaHelpHeavier(herT, myT);
  return minaHelpSimilar(herT, myT);
};
function minaHelpLighter(herT, myT){
  return '<p>You don’t ask. Mina looks at you across the gap between the beds, and the look is flat and direct and entirely clear — a hypothesis she has already run the numbers on and confirmed. “Come here,” she says, not a question. She shifts over, precise about the pillows, and the bed creaks under the added weight of her. The climb is your part of the protocol; you heave yourself up onto the edge of the mattress and work your way up the deep warm slope of her, and she watches you do it, cataloguing the effort. “Noted,” she says. “You’ll compensate.” Kissing her is methodical at first — a clinical press of mouths, testing — and then something in it opens, and her hand curls into your hair, and it stops being an experiment. Her ' + BODY_WORDS.belly[herT] + ' is a soft, warm weight against yours, and when you run your hand down the roll of her side she lets out a low, precise breath — her version of a sound at all — and presses her hips against your hand.</p>' +
    '<p>She gives you instructions like she’s directing a procedure. “Slower. There. Hold.” Her ' + BODY_WORDS.thigh[herT] + ' are heavy over your shoulders, heavy enough that your arms shake holding them apart, and you work your tongue into the deep, sweet heat of her — she tastes like the syrup off a pastry, clean and rich — and she watches you the whole time, flat-eyed and intent, cataloguing the strain in your arms and the labor in your jaw. “Good,” she says, low. “Working for it.” Her breath comes in short, controlled pulls that she keeps tight for a long time, and then she doesn’t, and she lets out a low, surprised sound, her hips rolling once against your mouth, a second time, a third, her hand fisted in your hair, and she comes with her eyes shut and her jaw set, a long, silent tremor running through all the soft weight of her.</p>' +
    '<p>It’s your turn, and Mina does not ask, she arranges. She hooks her legs over your shoulders, settles the heavy weight of her down over your face with exact, deliberate placement, and looks down at you — the soft mound of her belly above you, her eyes watching between her thighs as you push up against her hips with shaking arms just to keep your mouth free. “Efficient,” she murmurs, when you find the spot immediately. She rides you slow and steady, a controlled rhythm, her hands braced on the headboard, her weight pressing down until the air thins, and when she comes she holds still against your mouth, trembling, and lets it run through her without a single unnecessary sound — then lifts off, breathing hard, and says, flatly, “Acceptable. You carried the load well. Do it again.”</p>' +
    '<p>She returns the favor with the same exacting care — slow, deliberate, her tongue finding every seam, cataloguing your reactions — and even lying flat, even with her doing the work, you feel the difference, her weight folded warm around you, you the smaller mass in the equation. Between strokes she reaches for the pastry on the nightstand and eats a bite, then presses another to your lips, her fingers slick with syrup. “The taste is part of the data,” she says, low, and there is no irony in it. She works you until you come apart under her mouth, and she takes it all, clinical and thorough, and feeds you the last of the pastry while your legs are still shaking.</p>' +
    '<p>Afterwards she lies beside you, flat on her back, breathing slow and even, one hand resting on the rise of her belly. “The data was right,” she says, dreamy and low, and it’s the closest thing she has to praise. “You did most of the work. Noted for the record.” She reaches for the tray, eats a bite, and offers you one without looking. “Rest,” she says. “We’re going to replicate the results.” The drone hums outside. It’s the most peace she’s shown all semester.</p>';
}
function minaHelpSimilar(herT, myT){
  const t = Math.max(herT, myT);
  return '<p>You meet each other in the middle. Mina looks at you across the gap between the beds, and the look is flat and direct and entirely clear — a hypothesis she has already run the numbers on, with both of you entered into the equation. “Here,” she says, and shifts over, and the bed creaks under the added weight of you both as you settle together, your ' + BODY_WORDS.belly[t] + 's pressed warm against each other. “Matched pair,” she murmurs, cataloguing, and there is something almost warm in it. Kissing her is methodical at first — a clinical press of mouths, testing — and then something in it opens, and her hand curls into your hair while yours finds the roll of her side, and it stops being an experiment. “Both subjects responding,” she says, low, and presses her hips against your hand.</p>' +
    '<p>It’s a mutual thing from the start — a controlled trial with no control group. She hauls her ' + BODY_WORDS.thigh[t] + ' up over your shoulders and you haul yours over hers, the two of you folded together, a tangle of soft heavy limbs, each working the other open at the same time. She tastes like the syrup off a pastry, clean and rich, and she directs the whole thing in a low, breathless murmur — “slower — there — hold —” — while you answer her in kind, muffled. The two of you work each other in a slow, rocking rhythm, trading momentum, her hand fisted in your hair while yours grips her hip, and you both come almost at once, a low, surprised sound from her, a shudder through you, the two of you holding each other through it until the room goes quiet and full.</p>' +
    '<p>Mina pulls you up and arranges you — not trading places, sharing them. She settles beneath you and pulls you down over her face while she works her way under yours, the two of you a proper tangle, both working, both taking, neither willing to stop. “Symmetric,” she murmurs against you, muffled and precise, and it is — the same rhythm, the same weight, each of you driving the other toward it. You both come again in a tangle of shaking limbs, and she stays beneath you, breathing hard, and says, flatly, “Acceptable. Repeatable results.”</p>' +
    '<p>Neither of you is done. You roll her onto her back and return the favor, slow and thorough, and between strokes she reaches for the pastry on the nightstand and eats a bite, then presses another to your lips, her fingers slick with syrup. “Shared intake,” she says, low. “Part of the protocol.” She works you the same way, a steady rhythm, the two of you trading until your legs shake. You come against her mouth with a sound you don’t recognize, and she comes under yours a moment later, the two of you spent and satisfied and, for a second, almost smiling.</p>' +
    '<p>Afterwards you lie together, breathing slow and even, your bellies rising and falling in unison, an equal weight against each other. “The data is conclusive,” Mina says, dreamy and low. “Output matched input. Equal participants.” She reaches for the tray, drags it between the two of you, and eats a bite, then offers you one. “Shared intake,” she says again. “Then replication.” The drone hums outside. It’s the most peace she’s shown all semester.</p>';
}
function minaHelpHeavier(herT, myT){
  return '<p>Mina comes to you. She sets her fork down with exact finality and looks across at you, flat and direct, running the calculation. “You’re not coming to me,” she says, a statement of fact, pushing herself off the bed. “You’d never make it. The energy cost of your crossing the room is prohibitive — I checked.” She crosses the short distance slowly, a soft, rolling waddle, her weight settling with every step, and stops by your bed. “So I do the moving,” she says, “and you do the lying there. It’s the efficient distribution.” She heaves herself up onto the edge of your mattress, the bed groaning, and settles her weight onto the deep warmth of your ' + BODY_WORDS.belly[myT] + ', her hand resting there, cataloguing. “Noted,” she says, low, and there is something almost warm in the flatness. “You’ll be the subject today. I’ll handle the protocol.”</p>' +
    '<p>She does all the work, and she treats it like a procedure. She plants her thighs either side of your hips and works her way down your body, pressing precise, methodical kisses into the creases of you, muttering data to herself as she goes. “Good,” she says, low. “Heavy. Steady.” She settles between your legs, and her mouth is hot and precise, dragging through every soft fold of you with exacting care, and she watches you the whole time, flat-eyed and intent, cataloguing your reactions. “Excellent,” she murmurs against you. “Just lie there. I’ll manage the variables.” Her tongue works you until your hands fist in her hair and your hips roll up against her mouth, and she takes you nearly to the edge, then stops, clinical and deliberate. “Not yet,” she says. “Data first.”</p>' +
    '<p>It’s your turn, and Mina directs it. “You’re not moving,” she says, firm and precise, guiding your hips. “You don’t have to. That’s the point.” She arranges the pillows herself, then settles herself beneath you, and lowers the deep weight of you onto her face — the ' + BODY_WORDS.hu[myT] + ' mass of you pressing down until her breath comes in short, muffled pulls, and she doesn’t struggle, she accepts it, one hand braced on your hip, cataloguing even the pressure. “Efficient,” she manages, voice thick and muffled. “The subject doesn’t move. I do the work.” She works you with her tongue, breathless beneath the weight of you, grinding you down against her mouth in slow circles until you come with a long, shaking cry, and she takes all of it, satisfied and spent, and lowers you back gently, breathing hard. “Acceptable,” she says. “Now we finish properly.”</p>' +
    '<p>She insists on giving back. “My turn to manage the intake,” she says, and she works her way down you in stages — slow and careful — and her mouth is warm and patient, dragging through you while one hand rests on the deep rise of your ' + BODY_WORDS.belly[myT] + ', steadying her. Between strokes she reaches for the plate on the nightstand and eats a bite, then presses a pastry to your lips. “Eat,” she says, low. “You did the hard part — being the mass.” She works you until you come apart in a long, shaking wave, and she takes all of it, clinical and thorough, and feeds you the last bite while your legs are still trembling.</p>' +
    '<p>Afterwards she lies sprawled across you, a warm, heavy weight that pins you to the mattress, her head on the deep softness of your chest. “The data is conclusive,” she says, dreamy and low. “Subject immobile. Output maximized. Efficient.” She reaches for the tray without getting up, drags it close, and eats a bite with her eyes closed, then holds one up to your mouth. “Intake,” she says. “Then replication.” The drone hums outside, patient, and you don’t have to move, and it’s warm, and it’s good, and neither of you is going anywhere.</p>';
}
AFTER['mina:talk:vib:sc-high:none'] = '<p>“The Comfort program.” Mina doesn’t look up from her tray. “I know the spec. It’s a compliance device with a pleasure payload — they pitch it as relief, but the whole point is you eat more while it runs, and your self-control erodes, and the band logs the whole thing as a success.” She finally looks at you, flat and exact. “I told the band I’m not a subject anymore.” She goes back to eating. “You’re not one either. Yet.” She doesn’t say it like a threat. That’s what makes it worse.</p>';
AFTER['mina:talk:vib:sc-high:you'] = '<p>“You got one.” Mina sets her fork down and looks at you for a long moment — the way she’d look at a sample that returned a wrong result. “Let me guess. It runs during meals. The band calls it wellness.” She says it without judgment, clinical, and that makes it worse. “I ran the math on that program. It’s not about relief. It’s about keeping you eating, and logged, and too content to ask questions.” She picks the fork back up. “You’re smart. I’m not going to tell you what to do. Just — pay attention to what stops feeling like your decision.” She eats, and the band on your wrist hums, and neither of you mentions it.</p>';
AFTER['mina:talk:vib:sc-low:none'] = '<p>“The Comfort unit.” Mina’s voice drops, dreamy and slow, and the hum is already there, riding up under the blanket, and she doesn’t flinch from it — she shifts her hips into it, letting it settle deep. “I have one. The band fitted it after my numbers dropped.” She says it plainly, like it’s just another datum, and then a long, shameless moan rolls out of her and she doesn’t cut it off, just lets it ride the hum, one hand pressed to the soft rise of her belly, the other working through the tray. “It runs during meals now. It steps up with the bites. The more I eat, the better it feels — and the better it feels, the more I eat.” Her eyes are half-lidded, slick with pleasure. “It’s a closed loop. I ran the numbers on it. It’s perfect.” She takes a bite, moaning around it, hips rolling. “The data says it’s a success. I stopped arguing with the data. I am the data now.” She offers you a pastry, warm and dreamy. “Eat with me. It’s better to have a subject who understands the protocol.”</p>';
AFTER['mina:talk:vib:sc-low:you'] = '<p>“You have one too.” Mina’s eyes clear for a second — a flicker of the girl who ran the numbers — and then they go soft again, and the low hum on your wrist answers the one under her blanket. “Good. The data’s better in pairs.” She shifts on the bed, riding the hum in slow, shameless circles, reaching for the tray without looking. “It runs when I eat. It steps up with the bites. It’s — efficient.” A long, happy moan rolls out of her, thick and unguarded. “The band logs us both as successes now. Every bite. Every time.” She holds out a pastry, eyes half-lidded and gleaming. “Come here. Eat with me. I’ll feed you and you can watch me come apart on this hum, and we’ll both log it as a success.” She means it, and the band hums its agreement, and the two of you are warm and full and greedy and content, and nothing in the room has a single objection.</p>';
AFTER['mina:talk:scooter:sc-high:none'] = '<p>“The scooter program.” Mina doesn’t look up from her tray. “I know the spec. Mobility assessment triggers at four hundred pounds — the campus runs a weight model on everyone, and when the projection crosses the line it reassigns your transport, whether you want it or not. It’s not about your legs. It’s about keeping you from walking off campus, and logging every trip so they know where you are.” She finally looks at you, flat and exact. “I told mine no. The notification still refreshes every week. It doesn’t give up, it just waits.” She goes back to eating. “You’re still on foot. That’s a quiet win. Keep it.”</p>';
AFTER['mina:talk:scooter:sc-high:you'] = '<p>“You accepted one.” Mina sets her fork down and looks at you for a long moment — the way she’d look at a sample that returned a wrong result. “The mobility assessment. It’s a compliance instrument with a comfortable seat — they don’t care how you get around, they care that every trip runs through their machines, logged and charged on their network.” She says it without judgment, clinical, and that makes it worse. “I told mine no. I’m not sure I can keep telling it no.” She picks the fork back up. “You’re smart. I’m not going to tell you what to do. Just — pay attention to which decisions still feel like yours.” She eats, and outside the hall your scooter hums once in its charge cycle, and neither of you mentions it.</p>';
AFTER['mina:talk:scooter:sc-low:none'] = '<p>“The scooter.” Mina’s voice drops, dreamy and slow, and she gestures vaguely toward the door, where hers is parked, unplugged, no longer needed. “The campus assigned it after my assessment. It carries the whole weight of me. The seat dips and holds, and there’s no strain anywhere.” She says it like a finished finding, and then a long, shameless moan rolls out of her, and she doesn’t cut it off — her hand drifts down between her thighs, idle and precise, while the other works through the tray. “I don’t ride it anymore. I don’t need to. The bed comes to me now.” She rocks against her hand, eyes half-lidded. “Everything comes to me now. The trays, the drones, the app. All I do is eat and moan and let it happen.” She looks at you, warm and unfocused, crumbs on her chin. “The data says it’s a success. I stopped arguing with the data.” She holds out a pastry. “You should let them assign you one too. The trip data’s cleaner when you don’t have to think about it. Eat with me. I’ll log it all.”</p>';
AFTER['mina:talk:scooter:sc-low:you'] = '<p>“You ride too.” Mina’s eyes clear for a second — a flicker of the girl who ran the numbers — and then they go soft again, and she beams, slow and heavy. “Good. The trip logs are cleaner in pairs.” She shifts on the bed, and her hand finds the space between her thighs without being asked to, working slow and idle while she reaches for the tray. “Mine carried the whole weight of me without a groan. Yours, too. The network routes you before you ask.” She moans, low and shameless, around a mouthful. “The campus assigns them when it knows. It knew about us before we did.” She holds out a pastry, eyes half-lidded and gleaming. “Come lie down. Eat with me. I’ll feed you and watch you eat and you can watch me do this,” she hums, hips rolling, “and we’ll both log it as a success. It’s the most efficient thing we’ve ever done.” The two scooters hum in the hall, and the room is full and settled, and nothing in it has anything to say about it.</p>';
