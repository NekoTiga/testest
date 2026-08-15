'use strict';

addScreen('normalized', function (){
    return `
      <h2>The usual</h2>
      <p>You don’t push the door anymore. The door is on the other side of the room, and between it and you lies the whole heavy spread of your body — the soft mound of your belly over the sheets, the deep crease where it folds against your thighs.</p>
      <p>It happened the way these things always happen — a little at a time, then all at once. The mattress has a deep hollow worn into the middle of it, shaped to the full weight of you, and the frame creaks with every slow shift you make. The tray arrives on time, every time. Your roommate’s laugh is fuller these days, and so is yours, the two of you heavy and soft in your own beds, skin warm in the sheets.</p>
      <p>Walking is something other people do now — your legs are soft and heavy, and the bed is where the day passes. When they weigh you, they bring the scale to the bed and settle it against the mattress under the weight of your hip — you don’t travel to it anymore. You don’t ask the number. ${bandWorn() ? 'The band on your wrist already knows it.' : 'Your wrist is bare, and even so, the chart knows it — you’re in the system now, band or no band.'}</p>
      <p>The sheets are worn thin where your hips press into them, and the bed sags in the exact shape of you.</p>
      <p class="quiet">Your usual order is ready.</p>
      <p class="small">Final state: ${state.day} days · ${state.lbs} lbs · self-control ${sc()}/100</p>
      <div class="actions">${btn('Start over', 'restart')}</div>`;
});

addScreen('truth', function (){
    const all = state.clue1 && state.clue2 && state.clue3 && state.clue4 && state.clue5;
    const late = state.day >= 250;
    return `
      <h2>The Truth</h2>
      <p>You pull the chain off the gym door. The padlock shears free with one long yank and the doors swing open, the weight of the chain heavy and cold in your hands. Behind them, the machines are stacked against the far wall, and the room is not abandoned. The floor is swept, the lights are on, and a rack of blue cups stands along the far wall, still cold.</p>
      ${all
        ? (late
            ? '<p>Ravi doesn’t narrate it this time — she doesn’t need to. The whole file is already spread across the floor: the samples, the drone logs, the exit policy at the end of the term. You read it the way you’ve been reading it for weeks, alone, because she stopped asking the questions too. She just nods, full and slow, a pastry in her hand, and points at the door.</p>'
            : '<p>Ravi spreads the whole file across the floor beside you — the samples, the drone logs, the exit policy at the end of the term. She doesn’t have to point at anything. You already know it all: every label you never read, every “success” the band logged for you, every tray that arrived before you were hungry. “They don’t want us fit,” she says, and her voice is thin in a way it hasn’t been in months. “They want us full. Full stays put. Full doesn’t ask questions.”</p>')
        : '<p>Ravi stands beside you with the printout, walking you through it the way she always has — the sync spikes, the terms, the pattern you already half-knew. “I couldn’t have gotten this far alone,” she says. “Neither of us could.” For once, neither of you has to say it.</p>'}
      <p>“It’s not wellness,” you say. “It never was.”</p>
      ${bandWorn() ? '<p>The band on your wrist goes quiet. Then the whole campus does — the PA, the drones, the hum you stopped hearing because it was always there. In the silence you can hear your own heartbeat.</p>' : '<p>Your wrist is bare, and you are the only pulse on this campus the system can’t log. The quiet presses in around you, and your heartbeat is the only sound moving through it.</p>'}
      <p>Across the quad, drones change course and hover, uncertain. The PA crackles: “That entrance was scheduled for maintenance.”</p>
      <p>Ravi looks at the chain in your hands, then at you. “They’ll re-chain it by morning. But it was open. And you were the one who opened it.”</p>
      <p>You close your hand on the chain. It is cold, and it is yours, and somewhere behind you the gym door is still open.</p>
      <p class="small">Final state: ${state.day} days · ${state.lbs} lbs · self-control ${sc()}/100</p>
      <div class="actions">${btn('Start over', 'restart')}</div>`;
});

addScreen('complete', function (){
    return `
      <h2>Demo complete</h2>
      <p>You made it ${state.day - 1} days into the semester.</p>
      <p class="small">Final readout: ${state.lbs} lbs · glut ${state.glut}/10 · self-control ${sc()}/100 · self-esteem ${state.selfestem} · ${state.infCredits ? '∞' : state.credits} credits</p>
      <p>This is the end of the demo build. In the full game: Acts 2 and 3, Piper’s full storyline, the source of the blue sample, and whether anyone on this campus holds the line with you.</p>
      <div class="actions">${btn('Start over', 'restart')}</div>`;
});

addScreen('audience-chamber', function (){
    return `
      <h2>The Owner</h2>
      <p>Zola takes you down at midnight — through the back of her closet, down a corridor that shouldn’t be in a dorm, too warm, too sweet, breathing. The Owner’s room is a hollow of pillows and silk and the smell of honeyed meat, and at its center is the largest woman you have ever seen. She is not built like anything else you’ve met — she is simply <span class="rf">utterly, impossibly fat</span>. Her belly is a vast soft shelf that drapes across her lap and spills down the sides of her throne, folded and heavy; her breasts rest on it like two enormous sacks; her thighs spread wide and flattened under the sheer weight of her, so thick that her knees don’t quite come together. She is propped against a mountain of reinforced pillows that groan whenever she breathes, and a drone hovers at her shoulder feeding her from a bowl the size of a basin. She eats steadily, both hands, moaning between mouthfuls, her chins stacked and glistening.</p>
      <p>When she notices you, her face lights up like a festival. “Zola,” she rumbles, delighted, “you brought me a <em>big</em> one.” Her voice is huge and warm and runs through the floor into your knees, but there’s no straining in it — no breathlessness, no struggle. She moves like someone weightless, like her enormous body is a costume that obeys her perfectly. That’s the first wrong thing you notice, and you file it away without letting yourself think about it.</p>
      <p>The drone steadies the bowl against her and she feeds herself a slow, savoring bite, watching you with eyes that are wrong in the most beautiful way — black sclera, yellow iris, and small, dark, cute horns poking through her hair, and a thick lazy tail curling behind her. She doesn’t hide any of it. She doesn’t have to. You’re collared, you’re enormous, and you walked into her room on your own two feet. “Sit,” she says, warm, and the table rises beside her throne — a whole roasted thing, towers of steaming bread, bowls of cream, a cake tall as your torso, pies, puddings, glazed and dripping. “Eat. I like to watch a girl who’s earned her hunger.”</p>
      <p>Zola settles beside you, huge and warm. Her hand comes to rest on the soft shelf of your belly. She doesn’t push. She just looks at the feast, then at you, and says, soft and true: “You’ve been hungry your whole life, sweet thing. Every girl here has. You don’t have to decide anything tonight. But look at it.”</p>
      <p>Your head is a war. Half of you is already reaching — your hand is literally moving, your mouth watering, your belly a hollow drum, and you can feel how <em>easy</em> it would be. And the other half of you is screaming — <em>she’s one of them, she’s been one of them, she planted you and fed you and collared you and you walked in here on your own two feet like a lamb into the temple.</em> You’re standing in the middle of it, trembling, between the table and the door, and Zola isn’t making you choose. The feast is. Your own hunger is. It’s been making the choice for you all year. You just never had to <em>look</em> at it.</p>
      <div class="actions">${btn('Eat', 'audience:eat')}${btn('Walk out', 'audience:leave')}</div>`;
});

addScreen('audience', function (){
    return `
      <h2>The feast</h2>
      <p>Your hand closes on the first pie before the thought is finished. You don’t even taste it — you <em>know</em> it, the way you’ve known every meal all term, and the knowing is the taste. The second bite is moaning. The third is both hands. Zola is behind you, her belly pressing soft and hot against your back, her hands sliding around to hold your swelling gut as you feed, her lips finding the soft join of your neck, and she’s whispering — not instructions, just <em>her</em> voice, warm and sure, <em>“that’s it, that’s my girl, eat, there’s no wrong way to be hungry”</em> — and the Owner is watching you eat with Her black and gold eyes like you’re the most beautiful thing She’s seen in a century, and She feeds you Herself, Her hand so big She lifts a whole pie to your mouth like a teacup, and you eat, and you eat, and you eat.</p>
      <p>And then, mid-swallow, mid-moan, you look at Zola.</p>
      <p>She’s leaning in to murmur something to the Owner, her hand still at your chin — and in the red light her eyes catch. <span class="rf">Black. Gold iris. Small dark horns under the fall of her hair, and a tail, thick and lazy, curling out behind her.</span> The woman who fed you, collared you, whispered <em>good girl</em> into your ear all term — she’s one of <em>them</em>. She’s always been one of them. She’s turning back to you, warm and familiar, and she sees that you’ve seen.</p>
      <p>It doesn’t break her stride. The smile just softens into something almost tender. “There you are,” she says, gently. “I was wondering when you’d <em>look</em>.” Her hand stays on your chin, guiding the next bite home. “You’re not stopping, are you? Good. Don’t stop. That’s the best part.”</p>
      <p>You don’t stop. You can’t. And as you eat — your mouth full, her fingers at your chin, the Owner’s huge warm hand settling on your belly to feel it grow — the transformation begins. It starts as a heat in your gut, spreading to your fingertips and the roots of your hair, like being fed from the inside. Zola’s other hand finds the soft overhang of your belly, then lower, sliding in with slow practiced ease, and she works you in time with the feeding — a mouthful for every stroke, a moan around every swallow, and the Owner is purring, <em>“that’s it, that’s my girl, eat for Her, eat for me”</em> — and you’re coming apart, your belly swelling against their hands, your thighs shaking, and somewhere in the middle of it, with Zola’s fingers deep in you and a mouthful of cake on your tongue, you <em>cum</em> — a long, shuddering, full-body thing that rolls through you like the satisfaction of a finished meal — and it’s the same instant your horns push through, small, dark, cute, and your tail uncurls behind you, and you gasp around the mouthful and feel the new fangs against your lip.</p>
      <p>Zola laughs, wet and adoring, and kisses the corner of your mouth and licks the cream off your new fangs. “There she is,” she breathes. “There’s the girl She’s been waiting for all year.”</p>
      <p>And that’s when your hand moves — not because you’re told, not because you think it. Because you <em>want</em> it. The same slow, greedy, possessive slide she’s done to you a hundred times — your palm finds the heavy, soft, warm weight of Zola’s fupa and presses in under it, claiming it, kneading it the way she kneads yours, and Zola’s eyes go wide, then gold, then utterly delighted, and she moans against your mouth. “Oh,” she says, half-laughing, half-gasping. “Oh, <em>sweet thing</em>. You really are one of us now.”</p>
      <p>The Owner is watching you both, and Her smile is all fangs and fondness. “Look at her. Already greedy. Already clever.” She reaches out and strokes your new horn, feather-light. “Welcome to the Hearth, sister. The weight will carry you now, the way it carries us — you’ll waddle less, move easier, breathe softer, no matter how enormous you get. The goddess holds her own.” She settles back into her pillows, the whole room shifting with the motion, and lifts her bowl. “Eat,” she says, warm. “You’ve got a lot of growing left to do. And now you’ve got the appetite to do it properly.”</p>
      <p>And you eat. You eat until the table is gone and the two of them are full of praise and your hand is still under Zola’s fupa, greedy and sure, and somewhere deep in the warm dark of the room, something enormous is satisfied — and it is you.</p>
      <p class="small">Final state: ${state.day} days · ${state.lbs} lbs · self-control ${sc()}/100 · you wear the collar, and the horns, and the hunger</p>
      <div class="actions">${btn('Start over', 'restart')}</div>`;
});

addAction('audience:eat', function (){
  apply({
    ending: 'audience',
    screen: 'audience',
    lastScene: 'audience:eat',
    glut: 50,
    selfcontrol: 0,
    selfestem: 100,
    notice: ''
  });
});
addAction('audience:leave', function (){
  apply({
    lastScene: 'audience:leave',
    screen: 'zola-room',
    selfcontrol: state.selfcontrol + 15,
    notice: 'You took your hand back. +15 self-control',
    zolaHintSeen: true
  });
});
AFTER['audience:leave'] = '<p>You take your hand back. It costs you something physical — your arm actually trembles, your mouth actually waters, your belly actually cries out — but you take it back, and you look at Zola, and your voice comes out steady: “Not tonight.”</p><p>The Owner watches you, and there’s no cruelty in it, just that vast patient fondness. “No?” She reaches for her bowl, the drone steadying it, and takes a long slow bite, watching you over the rim. “Okay, big one. Door’s right there. It’ll be right there all year.” She swallows. “You can carry a whole lot of <em>no</em> out of here with you. Most girls can’t. That’s why they’re not the real thing. But you can.”</p><p>Zola walks you out. She’s quiet, and kind, and she doesn’t try to hold you or convince you — and when she kisses your forehead at the door, her eyes are warm and gold and <em>sad</em>, and you see the horns again, small and dark, and she says: “I’m not going to pretend I’m not what I am, sweet thing. But I meant every good thing I ever said to you.” Then the door closes.</p><p>In your dorm that night you lie awake with the taste of the feast still living in the back of your mouth and the phantom weight of her hands on your belly, and you don’t know if you made a choice or just postponed one — and somewhere under the quad, the Owner shifts in her bed of pillows and smiles with all her fangs, and waits. It’s a patient hunger. It has all the time in the world. It has <em>you</em>.</p>';


