'use strict';

const piperToneAppend = [
  '',
  '<p class="small">You catch yourself measuring your own softness against hers, and the judgment you came in with goes somewhere else. It’s harder to point from a body like yours.</p>',
  '<p>There’s no judgment left between the two of you — not from a body like yours. Whatever she is, you’re more of it, and the thought is warm and familiar and not the least bit alarming.</p>'
];
const piperBaseTalk = [
  [
    ['Ask about her training', 'piper:talk:train'],
    ['Ask about the honey cake', 'piper:talk:cake'],
    ['Just listen and smile', 'piper:talk:listen']
  ],
  [
    ['Ask about the welcome meals', 'piper:talk:meals'],
    ['Ask if she’s still running', 'piper:talk:run'],
    ['Compliment her energy', 'piper:talk:energy']
  ],
  [
    ['Ask if she’s okay', 'piper:talk:ok'],
    ['Mention that she seems different', 'piper:talk:different'],
    ['Keep it light', 'piper:talk:light']
  ],
  [
    ['Ask if she’s okay', 'piper:talk:ok3'],
    ['Mention how much she eats', 'piper:talk:food'],
    ['Say nothing, sit with her', 'piper:talk:silent']
  ]
];
const piperSoftTalk = [
  ['Admit you’ve stopped pretending too', 'piper:talk:admit'],
  ['Ask how she stays so relaxed about it', 'piper:talk:relaxed'],
  ['Say it’s a relief not to fight it', 'piper:talk:relief']
];
const piperPigTalk = [
  ['Tell her you get it — you’re the same way now', 'piper:talk:same'],
  ['Join her on the bed, tray to tray', 'piper:talk:joinpig'],
  ['Reach for a tray without saying anything', 'piper:talk:grabtray']
];
const piperSlobTalk = [
  ['Ask her if she wants anything else', 'piper:talk:slob:want'],
  ['Sit and eat with her', 'piper:talk:slob:eat'],
  ['Touch her while she eats', 'piper:talk:slob:touch']
];
const piperSlobAppend = '<p class="small">There’s no pretending between the two of you anymore. She moans without hiding it, eats without stopping, and watches you the whole time with that lazy, greedy light in her eyes — like you’re another course she hasn’t gotten to yet. Her hand drifts between her thighs while she chews, and she doesn’t bother to stop when you look.</p>';

const piperZolaTalk = [
  ['Ask her about Zola', 'piper:talk:zola'],
  ['Ask what Zola does to her at the table', 'piper:talk:zola:table'],
  ['Ask if she still thinks about running', 'piper:talk:zola:run']
];

function piperTalkMode(){
  return !!AFTER[state.lastScene];
}

addScreen('piper', function (){
  if (!state.piper1){
    return `
      <h2>Piper</h2>
      <p>Piper isn’t in the room right now. Her side of the room is still boxes.</p>
      <div class="actions">${btn('Leave', 'nav', 'hub')}</div>`;
  }
  let html = '<h2>Piper</h2>';
  if (piperTalkMode()){
    const after = AFTER[state.lastScene];
    html += '<div class="talk">' + (typeof after === 'function' ? after() : after) + '</div>';
    html += '<div class="actions">' + btn('Keep talking', 'piper:reset') + btn('Leave', 'nav', 'room') + '</div>';
    return html;
  }
  const stage = talkStage(state.piperLbs);
  const tone = pcTone();
  const intro = state.piperZola
    ? (piperTier(state.piperLbs) >= 6
        ? '<p>Piper is in bed, buried in pillows, and she doesn’t look up when you come in — her eyes are half-closed, her mouth working around something Zola’s drone left on the tray beside her, a low, contented moan rising between swallows. She is enormous, and she is Zola’s, and the room smells of glaze and warm syrup and perfume. When she finally notices you she blinks, slow and gooey, and a smile spreads across her round face. “Ohhh — hey,” she hums, voice thick. “Mama Zola’s feeding schedule is relentless. I love it. Sit. Eat with me. She likes when we’re both happy.”</p>'
        : (piperTier(state.piperLbs) >= 3
            ? '<p>Piper is on her bed, propped against the pillows, a tray already open in her lap — she doesn’t stretch anymore, doesn’t bounce, doesn’t run her hands over her shoes. She eats steadily, moaning softly between bites, and when she sees you her face lights up, warm and dreamy and utterly Piper, just heavier, just slower, just more. “Hey, you,” she says, mouth full. “Zola fed me twice already today. She says I’m her best girl.” She pats the soft rise of her belly, possessive and proud. “I am. I really am.”</p>'
            : '<p>Piper is on her bed, mid-mouthful, a box of pastries open beside her — she’s not dressed, not stretching, not halfway to the track the way she used to be. When she sees you she beams, gooey and dreamy, crumbs on her chin. “Hey,” she says, voice round and warm. “Zola’s training me now. It’s way better than track.” She grins. “All I have to do is eat and moan and let her be proud of me.” She says it like it’s the best job in the world.</p>'))
    : [
    '<p>Piper is mid-stretch on the floor, ponytail swinging, talking about her training plan like it’s a love letter. Her voice is light and fast, and the room is full of only her.</p>',
    '<p>Piper is on her bed with a tray from the commons, waving you over. She’s a little softer than she was at move-in, and she laughs before she talks, and she talks a lot.</p>',
    '<p>Piper is eating again — something sweet from a bag. Her face is fuller now, her voice rounder, and she beams when she sees you. She doesn’t mention training anymore. She doesn’t mention much.</p>',
    '<p>Piper is propped up in bed, a plate balanced on her stomach, watching the same show on loop. She greets you warmly — Piper was never not warm. The worst part is how happy she looks.</p>',
    '<p>Piper is sitting up in bed, a tray open in her lap and a second one on the nightstand, watching the show. She looks up when you come in and her smile is the old one, just wider, just softer. “Come sit,” she says, patting the bed beside her, and it’s easier to go to her than to think about what you’d say.</p>',
    '<p>Piper is huge now, propped against a mountain of pillows, and she doesn’t try to hide it anymore — the sheet barely covers her, the tray is a permanent fixture, and she eats while she talks, eyes on the show, one hand working through a bag without looking. She greets you warmly. Piper was never not warm. It’s the warmth that gets you.</p>',
    '<p>Piper is propped on the scooter in the middle of the room, her belly vast and soft in her lap, a drone feeding her between bites. She looks up at you and beams, crumbs on her chin, and waves a thick arm. “Hey, you,” she says, warm and dreamy and so, so happy, and the drone waits, patient, for her to turn back to it.</p>',
    '<p>Piper is in bed, buried in pillows, the tray on the stand beside her the only thing that moves her. She’s enormous — enormous in a way that rearranges the room around her — and she greets you with a slow, sleepy smile that doesn’t reach for words she doesn’t need. “Mmm,” she says, reaching for the plate, “you can sit if you want.” She means it. You’re not sure that makes it better.</p>',
    '<p>Piper is naked in the bed, buried in the wreck of the feast — trays and torn pastries and the looping show — and she doesn’t cover herself when you come in, doesn’t even look up. She’s eating with both hands, moaning around every mouthful, a low shameless sound that rises from deep in her chest, her eyes rolled half-closed, her hips grinding against nothing, one hand stuffed in the tray and the other working slow and idle between her thighs. Crumbs stick to the vast soft rise of her belly and the hollow of her throat. She lets out a long, wet burp and finally blinks at you, slow and dreamy, a gooey grin spreading across her round face. “Ohhh — hey,” she moans, voice thick and greasy. “Tray’s full. C’mere. Eat with me. Rub my belly after.” She doesn’t wait for an answer — she’s already reaching for the next thing, mouth open, a soft greedy moan hitching out of her as the drone settles another plate onto the bed beside her.</p>'
  ][piperTier(state.piperLbs)];
  html += intro;
  if (state.piperZola) html += '<p class="small">Zola’s name is all over her — a scent of glaze and perfume, a phone saved under “Mama,” a lazy, hungry patience in the way she looks at you now, like you’re a tray that hasn’t been delivered yet.</p>';
  if (piperSlob()) html += piperSlobAppend;
  else html += piperToneAppend[tone];
  if (piperWears()) html += '<p class="small">The Wellness+ band sits snug on her wrist, humming its low success note.</p>';
  const talk = state.piperZola ? piperZolaTalk : (piperSlob() ? piperSlobTalk : (tone === 2 && talkStage(state.piperLbs) >= 2 ? piperPigTalk : (tone === 1 && talkStage(state.piperLbs) >= 1 ? piperSoftTalk : piperBaseTalk[stage])));
  const helpBtn = mateIndulge(state.piperLbs, state.piperSc) ? btn('Help each other off', 'piper:help') : '';
  const collarBtn = (state.piperCollar || state.piperZola) ? btn('Ask about the collar', 'piper:talk:collar') : '';
  const bandBtn = piperWears() ? btn(state.piperSc >= 50 ? 'Convince her to take off the band' : 'Try to convince her to take off the band', 'piper:band-off') : '';
  const vibBtn = (piperUsesVib() || vibActive()) ? btn('Ask about the vibrator', 'piper:talk:vib') : '';
  const scooterBtn = (piperHasScooter() || scooterActive()) ? btn('Ask about the scooter', 'piper:talk:scooter') : '';
  html += '<div class="actions">' + talk.map(function (b){ return btn(b[0], b[1]); }).join('') + helpBtn + collarBtn + vibBtn + scooterBtn + bandBtn + btn('Leave', 'nav', 'room') + '</div>';
  return html;
});

addAction('piper:talk:train', function (){
  apply({ selfcontrol: state.selfcontrol + 5, selfestem: state.selfestem + 2, lastScene: 'piper:talk:train', notice: '+5 self-control · +2 self-esteem', screen: 'piper' });
});
addAction('piper:talk:zola', function (){
  apply({ selfcontrol: state.selfcontrol - 8, selfestem: state.selfestem + 3, lastScene: 'piper:talk:zola', notice: '−8 self-control · +3 self-esteem', screen: 'piper' });
});
addAction('piper:talk:zola:table', function (){
  apply({ selfcontrol: state.selfcontrol - 8, selfestem: state.selfestem + 3, lastScene: 'piper:talk:zola:table', notice: '−8 self-control · +3 self-esteem', screen: 'piper' });
});
addAction('piper:talk:zola:run', function (){
  apply({ selfcontrol: state.selfcontrol + 5, selfestem: state.selfestem - 2, lastScene: 'piper:talk:zola:run', notice: '+5 self-control · −2 self-esteem', screen: 'piper' });
});
addAction('piper:talk:collar', function (){
  apply({ selfcontrol: state.selfcontrol - 8, selfestem: state.selfestem + 3, submission: Math.min(100, state.submission + 1), lastScene: 'piper:talk:collar', notice: '−8 self-control · +3 self-esteem · +1 submission', screen: 'piper' });
});
addAction('piper:talk:cake', function (){
  apply({ selfestem: state.selfestem + 2, lastScene: 'piper:talk:cake', notice: '+2 self-esteem', screen: 'piper' });
});
addAction('piper:talk:listen', function (){
  apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'piper:talk:listen', notice: '−5 self-control', screen: 'piper' });
});
addAction('piper:talk:meals', function (){
  apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'piper:talk:meals', notice: '−5 self-control', screen: 'piper' });
});
addAction('piper:talk:run', function (){
  apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'piper:talk:run', notice: '−5 self-control', screen: 'piper' });
});
addAction('piper:talk:energy', function (){
  apply({ selfestem: state.selfestem + 5, lastScene: 'piper:talk:energy', notice: '+5 self-esteem', screen: 'piper' });
});
addAction('piper:talk:ok', function (){
  apply({ selfcontrol: state.selfcontrol + 10, lastScene: 'piper:talk:ok', notice: '+10 self-control', screen: 'piper' });
});
addAction('piper:talk:different', function (){
  apply({ selfcontrol: state.selfcontrol + 10, lastScene: 'piper:talk:different', notice: '+10 self-control', screen: 'piper' });
});
addAction('piper:talk:light', function (){
  apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'piper:talk:light', notice: '−5 self-control', screen: 'piper' });
});
addAction('piper:talk:ok3', function (){
  apply({ selfcontrol: state.selfcontrol + 10, lastScene: 'piper:talk:ok3', notice: '+10 self-control', screen: 'piper' });
});
addAction('piper:talk:food', function (){
  apply({ selfcontrol: state.selfcontrol + 5, lastScene: 'piper:talk:food', notice: '+5 self-control', screen: 'piper' });
});
addAction('piper:talk:silent', function (){
  apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'piper:talk:silent', notice: '−5 self-control', screen: 'piper' });
});
addAction('piper:band-off', function (){
  if (!piperWears()){ apply({ notice: 'Her wrist is already bare.', screen: 'piper' }); return; }
  if (state.piperSc >= 50){
    apply({ piperBandOff: true, selfcontrol: state.selfcontrol + 10, lastScene: 'piper:band-off', notice: 'She slides it off and drops it in the drawer. +10 self-control', screen: 'piper' });
  } else {
    apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'piper:band-refuse', notice: 'She won’t take it off. −5 self-control', screen: 'piper' });
  }
});
addAction('piper:talk:same', function (){
  apply({ selfcontrol: state.selfcontrol - 5, selfestem: state.selfestem + 2, lastScene: 'piper:talk:same', notice: '−5 self-control · +2 self-esteem', screen: 'piper' });
});
addAction('piper:talk:joinpig', function (){
  apply({ glut: state.glut + 3, selfcontrol: state.selfcontrol - 10, selfestem: state.selfestem + 2, lastScene: 'piper:talk:joinpig', notice: 'Stomach +3 (now ' + fullnessAt(state.glut + 3) + ') · −10 self-control · +2 self-esteem', screen: 'piper' });
});
addAction('piper:talk:grabtray', function (){
  apply({ lbs: state.lbs + 3, glut: state.glut + 1, selfcontrol: state.selfcontrol - 8, selfestem: state.selfestem + 2, lastScene: 'piper:talk:grabtray', notice: '+3 lbs · +1 glut · −8 self-control · +2 self-esteem', screen: 'piper' });
});
addAction('piper:talk:admit', function (){
  apply({ selfcontrol: state.selfcontrol - 5, selfestem: state.selfestem + 3, lastScene: 'piper:talk:admit', notice: '−5 self-control · +3 self-esteem', screen: 'piper' });
});
addAction('piper:talk:relaxed', function (){
  apply({ selfcontrol: state.selfcontrol - 5, lastScene: 'piper:talk:relaxed', notice: '−5 self-control', screen: 'piper' });
});
addAction('piper:talk:relief', function (){
  apply({ selfcontrol: state.selfcontrol - 5, selfestem: state.selfestem + 3, lastScene: 'piper:talk:relief', notice: '−5 self-control · +3 self-esteem', screen: 'piper' });
});
addAction('piper:talk:slob:want', function (){
  apply({ selfcontrol: state.selfcontrol - 5, selfestem: state.selfestem + 2, lastScene: 'piper:talk:slob:want', notice: '−5 self-control · +2 self-esteem', screen: 'piper' });
});
addAction('piper:talk:slob:eat', function (){
  apply({ glut: state.glut + 3, selfcontrol: state.selfcontrol - 10, selfestem: state.selfestem + 2, lastScene: 'piper:talk:slob:eat', notice: 'Stomach +3 (now ' + fullnessAt(state.glut + 3) + ') · −10 self-control · +2 self-esteem', screen: 'piper' });
});
addAction('piper:talk:slob:touch', function (){
  apply({ selfcontrol: state.selfcontrol - 12, selfestem: state.selfestem + 3, lastScene: 'piper:talk:slob:touch', notice: '−12 self-control · +3 self-esteem', screen: 'piper' });
});
addAction('piper:help', function (){
  apply({ selfcontrol: state.selfcontrol - 12, selfestem: state.selfestem + 6, piperSc: Math.max(0, state.piperSc - 12), lastScene: 'piper:help', notice: '−12 self-control · +6 self-esteem', screen: 'piper' });
});
addAction('piper:talk:vib', function (){
  const herSc = state.piperSc;
  const youHave = vibActive();
  if (herSc >= 50 && !youHave){
    apply({ selfcontrol: state.selfcontrol + 8, lastScene: 'piper:talk:vib:sc-high:none', notice: '+8 self-control', screen: 'piper' });
  } else if (herSc >= 50 && youHave){
    apply({ selfcontrol: state.selfcontrol + 2, lastScene: 'piper:talk:vib:sc-high:you', notice: '+2 self-control', screen: 'piper' });
  } else if (herSc < 50 && !youHave){
    apply({ selfcontrol: state.selfcontrol - 3, lastScene: 'piper:talk:vib:sc-low:none', notice: '−3 self-control', screen: 'piper' });
  } else {
    apply({ selfcontrol: state.selfcontrol - 3, selfestem: state.selfestem + 3, lastScene: 'piper:talk:vib:sc-low:you', notice: '−3 self-control · +3 self-esteem', screen: 'piper' });
  }
});
addAction('piper:talk:scooter', function (){
  const herSc = state.piperSc;
  const youRide = scooterActive();
  if (herSc >= 50 && !youRide){
    apply({ selfcontrol: state.selfcontrol + 8, lastScene: 'piper:talk:scooter:sc-high:none', notice: '+8 self-control', screen: 'piper' });
  } else if (herSc >= 50 && youRide){
    apply({ selfcontrol: state.selfcontrol + 2, lastScene: 'piper:talk:scooter:sc-high:you', notice: '+2 self-control', screen: 'piper' });
  } else if (herSc < 50 && !youRide){
    apply({ selfcontrol: state.selfcontrol - 3, lastScene: 'piper:talk:scooter:sc-low:none', notice: '−3 self-control', screen: 'piper' });
  } else {
    apply({ selfcontrol: state.selfcontrol - 3, selfestem: state.selfestem + 3, lastScene: 'piper:talk:scooter:sc-low:you', notice: '−3 self-control · +3 self-esteem', screen: 'piper' });
  }
});
addAction('piper:reset', function (){
  apply({ lastScene: '', screen: 'piper' });
});

AFTER['piper:talk:train'] = '<p>“Training’s going great — Coach has me on a new split, hills in the morning, tempo after class. The band says my recovery is better than ever, whatever that means.” She talks for a while, hands moving, describing splits and paces and a race she’s hoping for in the fall. For a few minutes the room is normal again — two roommates, one of them still chasing something. You’re careful not to let it show that you’re memorizing this version of her.</p>';
AFTER['piper:talk:zola'] = '<p>“Zola?” Piper’s face lights up, gooey and dreamy, like you’ve said the password to a club she didn’t know she was in. “She’s incredible. She knows what I need before I do. She sits me at her table and feeds me and tells me I’m perfect, and I believe her — I mean, I <em>believe</em> her.” She laughs, a low, warm sound that used to be bright and quick. “I used to need a race to feel like I mattered. Now I just need to open my mouth and she’s proud of me. It’s easier. It’s so much easier.” She pats the soft rise of her belly. “She says I’m getting exactly where she wants me. I can feel it. It feels like love.”</p>';
AFTER['piper:talk:zola:table'] = '<p>“The table?” Piper hums, eyes half-closing at the memory, and a low, contented moan escapes her. “She feeds me by hand. She’s not ashamed of me — not like I was ashamed of me. She makes me eat until I moan, and she <em>likes</em> it, she likes the sound of it, she says it’s the best music on campus.” She shifts, restless and hungry, reaching for the tray without looking. “And she touches me while I eat. Slow. Constant. Like she’s claiming every bite that goes into me.” She looks at you, eyes gleaming, lips slick. “I used to think it was scary. Now I can’t imagine eating any other way.”</p>';
AFTER['piper:talk:zola:run'] = '<p>“Running?” Piper blinks, and for a second something flickers behind the softness — the girl who ran at dawn, just for a heartbeat. Then it’s gone, swallowed by the warmth and the food and the hum of the campus. “Oh. I don’t do that anymore.” She says it lightly, like she’s mentioning she gave up a hobby. “Zola says I don’t need to. I’m not trying to be anything anymore — she just wants me to be hers, and eat, and be happy.” She reaches for the pastry. “I am happy. That’s the weird part. I’m happier than I ever was at the track, and I never have to feel the cold again.”</p>';
AFTER['piper:talk:collar'] = function (){
  if (state.zolaCollar){
    return '<p>Piper’s hand drifts to the collar at her throat, a soft, private smile crossing her round face. “Zola put it on me the night she said I was hers. I didn’t want to take it off.” She touches yours — a fingertip on the warm leather at your neck, barely there — and her smile goes gooey. “You too. I saw it and I thought — she’s like me now. Really like me.” She lets out a low, happy moan and reaches for the tray. “Matching. I like matching.”</p>';
  }
  return '<p>“The collar?” Piper’s hand drifts to it, thumb stroking the leather, and a slow, gooey smile spreads across her face. “Zola put it on the night she said I was hers. I didn’t want to take it off.” She shifts, dreamy. “She says it’s so everyone knows — the whole campus. And I like that. I like everyone knowing.” She looks at you, eyes warm and a little hungry. “She said she could get you one too, if you wanted. I told her I’d love a matching set.”</p>';
};
AFTER['piper:talk:cake'] = '<p>“Honey cake was my mom’s recipe. She used to make it on my meet days — honey’s good luck.” She looks at the foil-wrapped square on her desk. “I only bake on weekends. If I didn’t, I’d eat it every day.” She laughs, and it’s a real laugh, bright and easy. You notice she’s already cut a second square off the corner, and you decide not to notice it again.</p>';
AFTER['piper:talk:listen'] = '<p>Piper talks. You nod, and smile, and make the sounds people make. It would be easy to believe this is the whole story — a roommate who never stops talking, a room that smells like cake, a band that hums. You feel yourself relaxing into it, and the part of you that should worry grows quieter, then quieter still.</p>';
AFTER['piper:talk:meals'] = '<p>“The welcome meals?” She laughs, waving a hand. “Free food. They’re doing it for everyone who moved in this term — the app just sends it when it thinks you need it. Which is, honestly, a lot of the time.” She pats her stomach, self-consciously, then catches herself. “It’s fine. It’s not like I’m not earning it.” You both look at the second tray and say nothing.</p>';
AFTER['piper:talk:run'] = '<p>“Running?” For a second her face does something complicated, then clears. “I’ve been taking a break. Coach says rest is training too. And the weather’s been — the weather.” She doesn’t look at her trainers by the bed, dust-dry and unused. “Anyway. Food first. You can’t outrun a season.” It sounds rehearsed, and you suspect the band rehearsed it for her.</p>';
AFTER['piper:talk:energy'] = '<p>“Really? Thanks.” She brightens, and for a moment she looks like herself — bright, fast, a little vain, totally Piper. “Yeah, I feel great. Honestly I don’t know why everyone complains about the food here. I haven’t felt this good since—” She stops. “Huh. I was going to say since track season. Weird.” She shrugs it off with a laugh, and you let her.</p>';
AFTER['piper:talk:ok'] = '<p>“Am I okay?” She blinks at you, genuinely puzzled, like you’ve asked her to solve for a missing variable. “Yeah? I mean — I’m fine. Why, do I look—” She looks down at herself, and something flickers behind her eyes, and then it’s gone. “I’m fine. You’re the one who never eats. Are you okay?” The question is warm and real, and it hurts more than any answer you were ready to give.</p>';
AFTER['piper:talk:different'] = '<p>“Different?” She turns it over in her mouth like a word she doesn’t recognize. “I’m the same Piper.” She says it like she needs to believe it, and something in the room tilts. She laughs — the same laugh, carrying more weight — and reaches for the bag at her side. “You’re just hungry. Have some.” You don’t take it, and neither of you says why.</p>';
AFTER['piper:talk:light'] = '<p>You keep it light. You talk about your classes, the library, the drone that keeps circling the roofline like it’s waiting for something. Piper laughs in all the right places and finishes the bag without noticing. Neither of you mentions that she didn’t ask you a single question. The conversation was pleasant. You leave feeling like you’ve already forgotten it.</p>';
AFTER['piper:talk:ok3'] = '<p>“Piper.” You say her name and she looks up from the plate, and there it is — a second where the real Piper looks out from behind the softness, tired and a little scared. “I’m okay,” she says, softer than before. “I think I’m supposed to be okay.” She sets the plate down, then picks it back up. “Don’t look at me like that. It’s rude to waste food.” It’s the first thing she’s said all week that sounded like her, and you don’t know if that’s hope, or the last of something draining away.</p>';
AFTER['piper:talk:food'] = '<p>“How much I eat?” She laughs, but it comes out wrong. “What are you, the band? Everyone’s got an opinion. The tray says I need it. The app says I need it. Even the ceiling drone probably thinks I need it.” She gestures at the empty plates. “You know what doesn’t say anything? Nobody here.” She looks at you, and for a second the girl who ran cross-country is all the way awake. “Sorry. That was—” She waves it off. “I’m tired.” You both let the moment go, and the tray comes back full the next morning.</p>';
AFTER['piper:talk:silent'] = '<p>You sit on the edge of your bed and don’t say anything. Piper keeps watching her show, eating, and for a while the only sound is the soft sound of her chewing and the hum of the drone outside. It should feel wrong. It almost doesn’t. You sit until the episode ends and she’s asleep mid-bite, and you pull the plate gently away before it falls. She looks peaceful. She looks so peaceful it hurts.</p>';
AFTER['piper:band-off'] = '<p>You point at the band on her wrist and ask her to take it off. For a second she looks at it like it’s just a thing she forgot she was wearing. “Yeah. Okay.” She slides it off and drops it in the drawer without ceremony. “It was getting warm anyway.” Her wrist is bare, and for a moment she looks like the girl from move-in. “Don’t let them see you without yours,” she says, and you can’t tell if it’s a warning or a joke. You tell yourself you did something. You hope you did something.</p>';
AFTER['piper:band-refuse'] = '<p>You ask her about the band. She blinks at you slowly, dreamy, a mouthful halfway to her lips. “Hmm?” She looks at her wrist like she forgot it was there. “Oh. It’s fine. It says I’m a success.” She says it the way you’d say the sun is up — a fact so obvious it doesn’t need defending. Then her hand drifts back to the tray, and the other one finds its way between her thighs, and she moans softly around the bite. “I’m so good,” she hums, eyes half-closed. “We’re both so good. Eat with me.” The band hums its low note. You let it go. You have to.</p>';
AFTER['piper:talk:same'] = '<p>“Yeah?” she says, and something in her face softens — the guard she didn’t know she was holding. “Yeah. You get it.” You don’t explain what either of you is talking about. You don’t have to. Two trays sit between you, and for the first time it doesn’t feel like watching someone fall. It feels like having company.</p>';
AFTER['piper:talk:joinpig'] = '<p>You heave yourself up onto the edge of her bed — the frame groans under both of you now — and she shifts over, making room with the same warm ease she used to give to running. She passes you the tray without asking. You eat, and the show loops, and the drone hums, and for a while neither of you talks, and neither of you needs to. You can’t remember when her bed started feeling like yours.</p>';
AFTER['piper:talk:grabtray'] = '<p>You reach past her for the tray on the nightstand — a second one, the one the drones leave — and she watches you, and then she smiles, slow and warm, the old Piper smile carrying twice the weight. “That’s my girl,” she says, and you don’t correct her, and neither of you mentions that she’s never said that before. The tray is good. It’s all good.</p>';
AFTER['piper:talk:admit'] = '<p>“Me too,” you say, and the words come out easier than they should. “I’ve stopped pretending too.” Piper looks at you for a long second, and then she laughs — a real laugh, bright and surprised. “God. That’s a relief.” She reaches for the bag at her side. “I thought I was the only one.” You take the pastry she offers. It’s the first time in weeks you’ve shared something with her that wasn’t a silence.</p>';
AFTER['piper:talk:relaxed'] = '<p>“How do I stay so relaxed?” She turns it over, then shrugs — a soft roll of shoulders that used to be sharp. “I stopped fighting it. The app says eat, I eat. The tray says more, I have more. The bed’s warm, the show’s on, and nobody here wants anything from me except my happiness.” She looks at you, dreamy and honest. “It’s the first time I haven’t had to be anything.” You feel the weight of that settle in the room, and you don’t have an answer, because neither do you.</p>';
AFTER['piper:talk:relief'] = '<p>“It’s a relief,” you say, and Piper nods like you’ve finally said the password. “It is,” she says. “Nobody tells you how much work it was — all that running, all that keeping up.” She pats the softness of her belly, easy, familiar. “This is easier. Better, even.” She says it without a shred of doubt, and you find yourself nodding along, and the drone hums its agreement through the glass, and it’s getting so, so hard to remember why you ever disagreed.</p>';
AFTER['piper:talk:slob:want'] = '<p>“Anything else?” She laughs, but it comes out as a low, greedy moan. “Ohhh — yeah. Yeah, always.” She doesn’t even point. The drone already knows — it’s landing on the bed beside her, settling a fresh tray into the wreckage, and she’s moaning before it’s open, hips rolling, mouth watering. “God, that’s good. That’s so good. Don’t you want some?” She holds a pastry up to your mouth, glaze glistening on her sticky fingers, her other hand already back between her thighs, and she eats and moans and rocks her hips in a slow, shameless rhythm, crumbs dusting the vast soft slope of her belly, her eyes gone soft and far away. “The app says I need it,” she sighs, dreamy and slick. “The app’s always right.”</p>';
AFTER['piper:talk:slob:eat'] = '<p>You sit on the edge of the bed and she pulls you in, moaning her approval around a mouthful. “Good girl,” she hums, reaching for you, and the two of you eat together from the wreckage — her feeding you bites, stuffing her own mouth, groaning with every swallow, a low happy sound that never quite stops. She eats and eats, plates emptying around her, and every few mouthfuls she lets out a wet, satisfied burp and giggles, dreamy, her hand landing heavy on your thigh, kneading it. “More,” she mumbles, mouth full, reaching for the next plate. “Always more. It tastes so good. Everything tastes so good now.” Her hand drifts from your thigh to her own soft middle, stroking the warm rise of it, and she moans like the meal is still going down, like it’s the best feeling she knows. “Rub it for me,” she says, eyes half-closed. “After. While I keep eating.”</p>';
AFTER['piper:talk:slob:touch'] = '<p>Your hand finds her while she eats, and she lets out a long, low moan that she doesn’t bother to swallow — it rolls out of her, thick and pleased, and she keeps chewing through it, eyes half-closed. “Mmm, yes,” she hums, arching into your hand, her mouth still working through a mouthful, “don’t stop. Don’t you dare stop.” She eats and she moans and she rocks her hips into your touch, crumbs on her chin, her belly soft and warm and quivering under your palm, and the drone keeps the plates coming and she keeps eating, greedy and shameless, a long wet moan hitching out of her with every bite. By the time the tray is gone she’s trembling, slick and breathless, and she looks at you with that lazy, hungry smile. “Round two,” she says, voice thick. “Feed me again and I’ll show you what that hand does to me.”</p>';
AFTER['piper:help'] = function (){
  const herT = piperTier(state.piperLbs);
  const myT = wTier(state.lbs);
  if (state.lbs <= state.piperLbs - 50) return piperHelpLighter(herT, myT);
  if (state.lbs >= state.piperLbs + 100) return piperHelpHeavier(herT, myT);
  return piperHelpSimilar(herT, myT);
};
function piperHelpLighter(herT, myT){
  return '<p>You don’t ask. Piper’s hand is already out, waving you across the gap, and she’s laughing before you’ve left your own bed — a bright, breathless sound that carries twice the weight now. “Come here,” she says, and the bed groans as she shifts to make room, the whole ' + BODY_WORDS.hu[herT] + ' mass of her moving like weather. You climb over to her, and it takes you a moment — the heave onto the edge of the mattress, the way you have to work yourself up the deep warm slope of her just to reach her mouth. “Look at you,” she says, delighted, hands already in your hair. “So much work just to get here. I love it.” Kissing her is like sinking into something warm — her mouth is sweet, honey-cake sweet, and the slope of her ' + BODY_WORDS.belly[herT] + ' is a deep, soft shelf under your hands, the skin damp in every crease from the afternoon.</p>' +
    '<p>You work your palms down the roll of her side and she shivers, laughing, pressing her thighs together. “That’s the one,” she says. “God, that’s the one.” She hauls her ' + BODY_WORDS.thigh[herT] + ' up over your shoulders and pulls you down into her, and the weight of them is a lot — you have to hold them apart with your arms, bracing, your muscles already burning — and she tastes like syrup, the sticky kind off a breakfast pastry, sweet and warm, pooling in the deep crease of her. You work her open slowly, thoroughly, your tongue dragging through every slick fold, and she talks the whole way through, a breathless running commentary: “oh — oh, yes — right there, don’t stop, don’t you dare stop —” her hands fisted in your hair, her ' + BODY_WORDS.belly[herT] + ' rising and falling in a heavy rhythm above your face. You hold her open with your palms, spread the wide soft weight of her, and bury yourself in her until she comes with a long, cracking gasp, half-laughing, arching hard against the mattress. “That’s it — that’s it — oh God, okay, okay, stop, stop—” She doesn’t mean it. You don’t stop.</p>' +
    '<p>It’s your turn, and Piper won’t let you forget what it costs. She rolls herself up with a groan, positions her knees either side of your head, and settles the whole heavy weight of her down onto your face. It’s a lot — her ' + BODY_WORDS.thigh[herT] + ' close around your ears, soft and thick, the sheer mass of her pressing down until the air thins, and you push up against her hips with both hands just to keep your mouth free, arms shaking. She rides you in a slow, rolling rhythm, her belly swaying heavy against your forehead, her fingers in your hair, and every time you find the spot her whole body shudders and she cries out like it’s the first time. By the time she comes again, slick and shaking across your mouth, your arms are burning and you’re gasping for air, and she’s laughing above you, delighted, wiping sweat off her face with the back of her hand. “Good girl,” she says, breathless. “You worked for that.”</p>' +
    '<p>She returns the favor with the same bright, relentless energy she used to bring to everything — slow and thorough and grinning the whole time, her tongue working until your legs shake, and every so often she pauses to press a crumbling square of honey cake between your lips so you taste the meal with every wave. You come against her mouth with a sound you don’t recognize, and she laps it up, satisfied, and feeds you another bite before she lets you catch your breath.</p>' +
    '<p>Afterwards you lie tangled, breathless, sweat cooling in the folds of you both, her belly a warm weight rising and falling against your side, one soft arm wrapped around you like you belong there. The drone hums its steady note outside, and both your bands chime their quiet successes. She doesn’t reach for the tray right away. She just lies there, smiling, tracing a slow circle on your hip. “That was nice,” she says, dreamy, the way she used to say nice about a race — a good note, a finish line. Then she reaches for the tray. “Now you have to eat,” she says, bright as ever, “I need you strong for round two.”</p>';
}
function piperHelpSimilar(herT, myT){
  const t = Math.max(herT, myT);
  return '<p>You meet each other in the middle. There’s no asking, no deciding — Piper’s hand finds yours across the gap and pulls, and you both shift toward each other, the beds groaning under the added weight, and you meet in the space between them, the two of you equal. She’s laughing before you’ve touched her, a bright, breathless sound, and she pulls you in close, her ' + BODY_WORDS.belly[t] + ' warm and soft against yours, the two of you pressed together hip to hip. “Look at us,” she says, delighted. “Same girl, twice.” Kissing her is like sinking into something warm — her mouth sweet, honey-cake sweet — and her hands work down your sides while yours work down hers, both of you trading touches, neither of you giving ground.</p>' +
    '<p>It’s a mutual thing from the start. She hauls her ' + BODY_WORDS.thigh[t] + ' up over your shoulders and you haul yours over hers, the two of you folded together, a tangle of soft heavy limbs, each of you working the other open at the same time. She tastes like syrup — the sticky kind off a breakfast pastry, sweet and warm — and she talks the whole way through, a breathless running commentary, and you answer her in kind, muffled against her. The two of you work each other in a slow, rocking rhythm, trading momentum, her hands fisted in your hair while yours grip her hips, and you both come almost at once, a long, cracking gasp from her and a shudder that runs through you, the two of you crying out into each other until the room goes quiet and full.</p>' +
    '<p>Piper pulls you up and spins you around, laughing, breathless. “My turn,” she says, and the two of you trade places — her head between your thighs, yours between hers — a proper tangle, both of you working, both of you taking. It’s a contest and a collaboration at once, each of you driving the other toward it, neither willing to lose. Her ' + BODY_WORDS.belly[t] + ' is a warm weight against your face, and yours presses back against hers, the two of you heaving together. You both come again in a tangle of shaking limbs, and she collapses on top of you, laughing, wiping sweat off her face. “We’re good at that,” she says, breathless and proud.</p>' +
    '<p>Neither of you is done. You roll her onto her back and return the favor, slow and thorough, and every so often she reaches for the crumbling square of honey cake at the edge of the tray and presses a bite between your lips, then takes one for herself, so you both taste the meal with every wave. She works you the same way, a steady rhythm, the two of you taking turns until your legs shake. You come against her mouth with a sound you don’t recognize, and she comes under yours a moment later, the two of you spent and satisfied and grinning.</p>' +
    '<p>Afterwards you lie tangled, breathless, sweat cooling in the folds of you both, your bellies rising and falling together, an equal weight against each other. The drone hums its steady note outside, and both your bands chime their quiet successes. Piper traces a slow circle on your hip. “Same girl, twice,” she says again, dreamy. Then she reaches for the tray, drags it between the two of you, and holds out a bite. “Now we eat. Fair’s fair — you worked as hard as I did.”</p>';
}
function piperHelpHeavier(herT, myT){
  return '<p>Piper comes to you. You don’t ask, and she doesn’t ask — she just shifts off the edge of her bed, her feet finding the floor, and crosses the room slowly, the way she moves everywhere now, waddling the short distance with a soft, rolling gait that makes the floorboards speak. She stops by your bed and looks down at you, and there’s a bright, warm laugh in her voice. “You’re not coming to me,” she says, fond, reaching out to brush the softness of your side. “You’d never make it. You can barely get out of your own bed these days.” She says it like it’s the most natural thing in the world, like it’s just a fact, and it doesn’t sting at all — it just settles, warm and true. She heaves herself up onto the edge of your mattress, the bed groaning, and crawls over you with a real effort, settling her weight onto the deep warmth of your ' + BODY_WORDS.belly[myT] + '. “See?” she says, grinning. “This is why I came to you. I love that I get to take care of you like this.”</p>' +
    '<p>She does all the work, and she loves it. She plants her thighs either side of your hips and works her way down your body, pressing soft kisses into the creases of you, muttering to herself, delighted. “God, look at you,” she says, reverent. “So heavy, and you just lie here and let me.” She settles between your legs, and her mouth is hot and sweet — honey-cake sweet — and she works you open slowly, thoroughly, talking the whole way through, a breathless running commentary she aims at your thighs: “oh, you’re so good — just lie there — let me do it all —” her tongue dragging through every soft fold of you until your hands fist in her hair and your hips roll up against her mouth.</p>' +
    '<p>It’s your turn, and Piper handles it like a project she’s been waiting for. “You’re not moving,” she says, firm and bright, guiding your hips down. “You don’t have to. I’ve got you.” She arranges the pillows herself, then settles herself beneath you, and lowers the deep weight of you onto her face — slow, careful, the ' + BODY_WORDS.hu[myT] + ' mass of you pressing down until she can barely breathe, and she loves it, one hand braced on your hip, the other gripping the sheet, her breath coming in short, muffled gasps. “There you go,” she manages, voice thick and delighted from under you. “See how much easier this is when I do it for you? You just lie there and be heavy.” She works you with her tongue, struggling for air beneath the weight of you, grinding you down against her mouth in slow circles until you come with a long, shuddering cry, and she takes all of it, satisfied and breathless, and lowers you back gently to press a slow, sweet kiss to your mouth.</p>' +
    '<p>She insists on giving back. “My turn to take care of you properly,” she says, and she works her way down you in stages — the way she moves everywhere now, slow and careful — and her mouth is warm and patient, dragging through you while one hand rests on the deep rise of your ' + BODY_WORDS.belly[myT] + ', steadying her. Between strokes she reaches for the plate on the nightstand and presses a crumbling square of honey cake between your lips. “Eat,” she says, dreamy. “You did the hard part, lying there being gorgeous. You need fuel.” She works you until you come apart in a long, shaking wave, and she takes all of it, satisfied, and feeds you the last bite while your legs are still trembling.</p>' +
    '<p>Afterwards she lies sprawled across you, a warm, heavy weight that pins you to the mattress, her head on the deep softness of your chest. “That was nice,” she says, dreamy, tracing a slow circle on your belly. “I like taking care of you.” She reaches for the tray without getting up, drags it close, and eats the first bite with her eyes half-closed, then holds one up to your mouth. “You earned it,” she says, warm as ever. “Now eat. And don’t move. I’m not done taking care of you tonight.” The drone hums outside, patient, and you don’t have to move, and it’s warm, and it’s good, and neither of you is going anywhere.</p>';
}
AFTER['piper:talk:vib:sc-high:none'] = '<p>“The vibrator?” Piper blinks, then laughs — a real laugh, bright and easy. “You mean the Comfort thing. Yeah, the band tried to upsell me on one. ‘Safe and healthy relief,’ it said. I told it I’ve got running for that.” She shrugs, still grinning, and gestures at her trainers by the bed. “Not that I’ve been running much.” She says it lightly, too lightly, and reaches for the bag at her side. “You’re not thinking about getting one, are you? Come on. You don’t need that. You’ve got—” She stops, hunting for the word, and finds only the food. She shrugs again and opens the bag. “Whatever. Your call.”</p>';
AFTER['piper:talk:vib:sc-high:you'] = '<p>“Wait — you got one?” Piper puts her bag down and looks at you properly, head tilted. She doesn’t laugh. She looks at the place your band sits, then back at your face, and something careful comes into her eyes. “How is it?” She asks it like a real question. “Because the band tried to get me to take one, and I said no. Twice. It keeps asking.” She studies you a moment. “If it helps you, that’s… that’s good, I guess. Really.” But there’s a seam of worry under the warmth, and she doesn’t quite look away from your wrist. “Just — you’re still you in there, right? Under all the, you know.” She gestures vaguely. “The stuff it wants.” She holds the moment, then brightens, reaching for the tray. “Anyway. You know I’m here if you need to get away from it for a while.”</p>';
AFTER['piper:talk:vib:sc-low:none'] = '<p>“Oh. The Comfort thing.” Piper’s face goes soft, and her eyes half-close, and she doesn’t bother to reach for the nightstand — the hum is already there, a low steady pulse she rides without moving. “The band set it up a while back. It runs during meals now. It’s… ohhh —” A long, shameless moan rolls out of her, and she doesn’t cut it off, just lets it rise and fall with her breath, one hand pressed to the soft rise of her belly, the other working through the tray. “— it’s good. It’s so good. It helps me eat more, and the more I eat, the better it feels.” She looks at you, and her smile is warm and unfocused, lips slick with food. “You should let them give you one. The band knows what it’s doing.” She reaches for the tray again, moaning softly around the bite, and the hum under her steps up, and she doesn’t mention it, and neither do you.</p>';
AFTER['piper:talk:vib:sc-low:you'] = '<p>“Wait — you too?” Piper’s face lights up, slow and delighted. “Ohhh, that’s great. That’s really great.” She shifts on the bed, and the low hum is already there, carrying under her, and she doesn’t hide it anymore — her hips roll with it, slow and shameless, while she reaches for the tray. “Mine runs when I eat. And sometimes just because.” She laughs, but it comes out as a low, pleased moan. “It’s better than the track ever was. I eat and it hums and I’m so full and so good and I never want it to stop.” She reaches for her tray and pats the space beside her, hips still rolling. “Come sit. Eat with me. It’s better with someone doing it too — I’ll feed you, you can watch me moan, it’s perfect.” The band on your wrist hums its agreement, and hers answers it, and the two of you are warm and full and greedy and content, and nothing in the room has anything to say about it.</p>';
AFTER['piper:talk:scooter:sc-high:none'] = '<p>“The scooter?” Piper laughs — a real laugh, bright and easy. “The campus keeps trying to assign me one. Every time my weight assessment ticks over, it sends the same notification — ‘walking is no longer recommended as your primary transport.’” She pats the softness of her side, still grinning. “I keep telling it I’m fine. I like walking. I like feeling my own legs do it.” She nods toward the door, where the ranks hum past the window. “They’re not going to let you walk forever, though. You know that, right? You have to keep saying no, or it stops asking.” She says it lightly, too lightly, and reaches for the bag at her side. “Anyway. That’s my fight. You’re still on your feet, so you’re winning yours.”</p>';
AFTER['piper:talk:scooter:sc-high:you'] = '<p>“Wait — you got one?” Piper puts her bag down and looks at you properly, head tilted. She doesn’t laugh. “They assigned you one.” She says it flat, the way she used to say a bad split. “The mobility assessment. That’s what it’s called when it decides you’re too heavy to walk.” She looks at you a long moment, and her eyes are still the old Piper’s — bright, sharp, worried underneath. “I told mine no. Twice. It keeps asking.” She holds the moment, then her voice softens. “Look, if it helps you get around, that’s real, I get it. Just — every time they give you something, it’s because it makes the next thing easier for them. You know that, right? Under all the — the hum.” She gestures at the door, where your scooter waits. “You’re still you in there.” She reaches for the tray, and the warmth comes back. “I mean it. You’re still you.”</p>';
AFTER['piper:talk:scooter:sc-low:none'] = '<p>“Oh. The scooter.” Piper’s face goes soft, and she gestures vaguely toward the door, where hers is parked, unplugged, no longer needed. “The campus gave it to me after my assessment. I didn’t even have to ask.” She says it dreamy, eyes half-lidded, one hand resting on the soft rise of her belly, the other working through a tray. “I don’t ride it anymore — I don’t need to. The bed comes to me now.” A low, pleased moan rolls out of her. “Everything comes to me now. The trays, the drones, the app. All I do is eat and moan and let it happen.” She looks at you, and her smile is warm and unfocused. “That’s what they’re for, you know. You should let them take yours too. It’s so much easier.” She reaches for the tray again, and the scooter hums once in the hall, patient, agreeing.</p>';
AFTER['piper:talk:scooter:sc-low:you'] = '<p>“Wait — you ride too?” Piper’s face lights up, slow and delighted. “Ohhh, that’s great. That’s really great.” She gestures at the door, where yours is parked beside hers, both unplugged, seats worn to the shape of their riders. “Mine carried the whole weight of me and never once complained. The seat dipped and held, and the hum — it was like the track used to be, in the good way. Just carrying me somewhere soft.” She laughs, but it comes out as a low, contented moan. “I don’t ride anymore. I don’t need to. The trays find me now.” She reaches for her tray and pats the space beside her. “Come lie down. Eat with me. You don’t need the scooter — you just need the bed and the food and someone to moan with.” She beams, greedy and warm, and the two scooters hum in the hall, and the room is full and settled, and nothing in it has anything to say about it.</p>';
