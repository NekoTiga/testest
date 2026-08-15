'use strict';

const SISTER_CALL_DAYS = [30, 40, 50, 60, 75, 90, 120, 150, 180, 210, 240, 270, 300];

function sisterNextCallDay(){
  for (let i = 0; i < SISTER_CALL_DAYS.length; i++){
    if (SISTER_CALL_DAYS[i] > state.day) return SISTER_CALL_DAYS[i];
  }
  return 9999;
}

function sisterCallPanel(){
  if (state.sisterMissed >= 5) return '';
  if (state.sisterDeclinedDay === state.day) return '';
  if (state.day < state.sisterNextCall) return '';
  return '<div class="panel"><p><em>Your phone lights up on the nightstand — a video call from your sister. The screen pulses with her name, her contact photo a year old and smiling.</em></p><div class="actions">' + btn('Answer the call', 'sister:answer') + btn('Decline — you’ll call her back', 'sister:decline') + '</div></div>';
}

function sisterEating(){
  const t = wTier(state.lbs);
  if (state.crave >= 60) return true;
  if (lazy()) return true;
  if (t >= 7) return true;
  if (t >= 5) return Math.random() < 0.5;
  if (t >= 3) return Math.random() < 0.35;
  return Math.random() < 0.2;
}

function sisterDenyCheck(){
  const t = wTier(state.lbs);
  const need = t >= 8 ? 95 : t >= 7 ? 85 : t >= 6 ? 70 : t >= 5 ? 55 : 40;
  return state.selfcontrol >= need;
}

function sisterSceneText(){
  const t = wTier(state.lbs);
  if (t <= 1) return '<p>“Hey! There you are.” Your sister’s face fills the screen, bright and familiar, the same squint she’s always had when she smiles. She tilts her head, taking you in. “God, you look good. Have you been running or something? Your face looks… clear. Fresh.” She launches into campus gossip without waiting for an answer, and you nod along, and her eyes keep flicking to your shoulders like she’s looking for something she can’t find. The call is easy. Nothing to hide, yet.</p>';
  if (t <= 3) return '<p>“Hey you!” Your sister’s face lights up, then does that thing it does — the quick scan, top to bottom, practiced from a lifetime of keeping an eye on you. “You look… good. Rested. The food there must be decent.” She says it like she’s testing the air. “You’re eating okay, right? Like, vegetables and stuff?” You tell her yes, and she lets it go, and you can feel the two of you watching each other around the edges of the conversation. “Don’t let that place get its hooks in you,” she says, half a joke, and you laugh, and your laugh is a beat too late.</p>';
  if (t <= 4) return '<p>“Oh.” It’s the first word out of her mouth, and it wasn’t the one she meant to say. Your sister recovers fast, but you’ve seen that look — the one that scans your middle and then hurries back up to your face. “You look good! Just… full of life.” She busies herself with something off-camera. “So. How’s the food there? You’re getting three squares, right?” The questions are careful, spaced out, the kind you ask when you don’t want to hear the answer. You give careful answers back, and the call ends with her saying she’ll call again soon, and you know she will.</p>';
  if (t <= 6) return '<p>The call connects and your sister’s smile does something complicated. “Hi,” she says, too bright. “Hi, sweetheart.” She looks at you the way people look at a door they’re not sure opens anymore. “You look like you’ve been comfortable.” A long pause. “How much do you weigh?” The question lands flat and honest, and you can see her knuckles go white on her phone. “I’m not mad. I just — how much?” You deflect, and she lets you, and neither of you believes the deflection, and you can see her cataloguing your shoulders, your neck, the way the frame fills with you. “We’re going to talk about this,” she says at the end. “Not now. But we’re going to talk.”</p>';
  if (t <= 8) return '<p>“Hey.” Your sister’s voice is small. She’s been crying — you can see it around her eyes, the careful flatness of her mouth. “I needed to see you.” She looks at you for a long, terrible moment, cataloguing. “Sweetheart, you’re… you’re extremely obese.” She says it like it costs her something to say it, like she’s been saying it to herself in the mirror so it comes out steady. “I looked it up. I looked it all up. The number on your chart, the — the rest of it.” Her hand covers her mouth. “How do you even get around? How do you—” She stops. “I’m not going to cry. I’m not going to cry, and I’m not going to pretend this is fine. You tell me the truth, right now. What are they doing to you?”</p>';
  return '<p>The call connects and there’s nothing on your sister’s face but that terrible, steady grief. “I had to see you,” she says. “I had to see it for myself.” She looks at you filling the frame, and the silence is so long you can hear the hum of her fridge. “You’re extremely obese, sweetheart. That’s the clinical word for it, and I’m saying it so you hear it from me and not from some nurse with a clipboard.” Her voice cracks. “How much do you weigh? No — don’t answer. I know what the answer looks like. I just needed to see your face. I needed to see if you were still in there.” She keeps the phone up, both hands, like she’s holding you at arm’s length so she doesn’t have to put you down. “I’m coming to get you. I don’t know how, but I’m coming to get you out of there.” The call holds, trembling, neither of you ending it.</p>';
}

function sisterEatText(){
  const t = wTier(state.lbs);
  if (t >= 6) return '<p class="small">While she talks, your hand finds the bag of chips on the bed beside you. You don’t decide to open it — you just do, and you eat through the whole thing without looking down, crumbs catching in the crease of your throat, and you answer her with your mouth full, and neither of you mentions it.</p>';
  if (t >= 3) return '<p class="small">A bowl of something salty sits on your nightstand, and your hand keeps drifting to it while she talks. You eat one handful, then another, listening with your head tilted, and by the end of the call the bowl is empty and you can’t remember deciding to finish it.</p>';
  return '<p class="small">You snack on whatever was on your desk while you talk — a few bites here, a few there, nothing you’d call a meal. You tell yourself it doesn’t count, and your sister chatters on, and the crumbs end up on your shirt.</p>';
}

addScreen('sister-call', function (){
  const t = wTier(state.lbs);
  const resolved = state.lastScene === 'sister:listen' || state.lastScene === 'sister:deny' || state.lastScene === 'sister:hangup';
  let html = '<h2>Video call — your sister</h2>';
  html += '<p class="small">' + clockText() + ' — a video call.</p>';
  html += '<div class="call-frame">…connected…</div>';
  if (!resolved){
    html += sisterSceneText();
    if (state.sisterEat) html += sisterEatText();
    html += '<div class="actions">';
    html += btn('Just listen — let her talk', 'sister:listen');
    if (t >= 5 && state.selfcontrol >= 40) html += btn(t >= 7 ? '“You’re wrong. I’m not extremely obese.”' : '“You’re overreacting. I’m not that big.”', 'sister:deny');
    html += btn('Hang up', 'sister:hangup');
    html += '</div>';
  } else {
    const after = AFTER[state.lastScene];
    html += typeof after === 'function' ? after() : after;
    html += '<div class="actions">' + btn('End the call', 'sister:end') + '</div>';
  }
  return html;
});

addAction('sister:answer', function (){
  if (state.sisterMissed >= 5 || state.day < state.sisterNextCall){ apply({ screen: 'room', lastScene: '' }); return; }
  const eat = sisterEating();
  const patch = {
    sisterCalls: state.sisterCalls + 1,
    sisterDeclinedDay: 0,
    sisterNextCall: sisterNextCallDay(),
    sisterEat: eat,
    sisterDenyOk: sisterDenyCheck(),
    lastScene: 'sister-call',
    screen: 'sister-call',
    notice: 'Your sister answers. The camera finds your face.'
  };
  if (eat){
    patch.glut = state.glut + 1;
    patch.crave = Math.min(100, state.crave + 1);
    patch.selfcontrol = Math.max(0, state.selfcontrol - 1);
    patch.notice = 'Your sister answers. The snack in your lap disappears while she talks. Stomach +1 · +1 craving · −1 self-control';
  }
  apply(patch);
});

addAction('sister:decline', function (){
  const m = state.sisterMissed + 1;
  const patch = {
    sisterMissed: m,
    sisterDeclinedDay: state.day,
    selfestem: Math.max(0, state.selfestem - 1),
    lastScene: 'sister:decline',
    screen: 'room',
    notice: 'You let it ring. It stops. −1 self-esteem' + (m >= 5 ? ' She doesn’t call again.' : '')
  };
  apply(patch);
});

AFTER['sister:decline'] = function (){
  const m = state.sisterMissed;
  if (m >= 5) return '<p>You watch the call ring out. The phone buzzes one last time and goes quiet, and a message arrives: <em>“Okay. I hear you. I’ll stop calling.”</em> You stare at it for a long time, and the tray on your nightstand is already warm, and you eat, and you tell yourself this is what you wanted. The phone doesn’t ring again. It never rings again.</p>';
  return '<p>You let the call ring out. The screen pulses with her name, once, twice, and then it stops, and a message follows a minute later: <em>“Okay. Call me when you can.”</em> You set the phone face-down, and the room is quiet, and the quiet sits on you heavier than the tray in your lap.</p>';
};

addAction('sister:listen', function (){
  const t = wTier(state.lbs);
  const es = t >= 4 ? 1 : 2;
  apply({ lastScene: 'sister:listen', selfcontrol: Math.min(100, state.selfcontrol + 1), selfestem: Math.min(100, state.selfestem + es), screen: 'sister-call', notice: 'You listen. +1 self-control · +' + es + ' self-esteem' });
});

AFTER['sister:listen'] = function (){
  const t = wTier(state.lbs);
  if (t <= 3) return '<p>You let her talk — about work, about mom, about the noise in her apartment that keeps her up. You don’t fix anything. You just listen, and you can see her shoulders drop a little on the tiny screen, and for a while the call is normal, and normal feels like something you forgot you could have.</p>';
  if (t <= 6) return '<p>You let her talk. About the gym she joined, the way she googled your school at 2 a.m., the folder of articles she saved about campus wellness programs. Her voice is unsteady in places. You listen, and you don’t argue, and you can see her holding onto the call like a handhold. “Promise me you’ll be careful,” she says. You promise. She knows you’re promising something you can’t keep, and you know it too, and neither of you says that part out loud.</p>';
  return '<p>You let her talk. She talks for a long time — about the school, about the bands everyone wears, about the article she found on appetite normalization and what it does to a body. Her voice is wrecked and steady at once, a person keeping a promise to herself. You listen, and you don’t correct her, because she isn’t wrong. At the end she goes quiet. “I’m not going to stop calling,” she says. “Even if you don’t want me to. Even if it makes it worse. I’m going to keep calling until I hear you say you’re okay, and I’m going to believe that the day it’s true.” You say okay. The word comes out smaller than you meant it to.</p>';
};

addAction('sister:deny', function (){
  const ok = state.sisterDenyOk;
  if (ok){
    apply({ lastScene: 'sister:deny', selfestem: Math.min(100, state.selfestem + 1), selfcontrol: Math.max(0, state.selfcontrol - 1), screen: 'sister-call', notice: 'She believes you, or pretends to. +1 self-esteem · −1 self-control' });
  } else {
    apply({ lastScene: 'sister:deny', selfestem: Math.max(0, state.selfestem - 3), selfcontrol: Math.max(0, state.selfcontrol - 2), screen: 'sister-call', notice: 'She doesn’t believe you. −3 self-esteem · −2 self-control' });
  }
});

AFTER['sister:deny'] = function (){
  if (state.sisterDenyOk) return '<p>“You’re overreacting.” The words come out steadier than you expected. “I’m not that big. It’s the camera — it adds fifteen pounds.” Your sister laughs, uncertain, and you hear the relief in it. “Right,” she says. “Cameras.” She lets it go, or half-lets it go, and the call warms back up, and by the end she’s making plans for the holidays like nothing happened. You hang up and look at your reflection in the dark screen, and you almost believe it yourself. Almost.</p>';
  return '<p>“You’re overreacting. I’m not that big.” The lie sits in the air between you, heavy as you are. Your sister looks at you, and the grief on her face is worse than anger. “Sweetheart. Look at your hands. Look at the frame of the camera.” Her voice is gentle, and it is devastating. “That’s not a camera. That’s not fifteen pounds. I’m not going to let you lie to yourself, because that’s exactly what they want.” You open your mouth and nothing comes out, and she’s right, and you know she’s right, and the worst part is the denial didn’t even feel like a lie. It felt like the truth — a comfortable, well-fed truth with a tray within reach.</p>';
};

addAction('sister:hangup', function (){
  apply({ lastScene: 'sister:hangup', selfcontrol: Math.max(0, state.selfcontrol - 1), selfestem: Math.max(0, state.selfestem - 1), screen: 'sister-call', notice: 'You end the call. −1 self-control · −1 self-esteem' });
});

AFTER['sister:hangup'] = function (){
  const t = wTier(state.lbs);
  if (t <= 3) return '<p>“—okay, well, call me later, promise?” “Promise.” You end the call and the room goes quiet, and the quiet is fine. You’ll call her back. You mean it, and for now that’s enough.</p>';
  if (t <= 6) return '<p>“We’re not done talking about this.” “I know.” You end the call and the screen goes dark, and your own face stares back at you in the reflection — the weight of it — and you put the phone face-down on the bed so you don’t have to look. You’ll call her back. You tell yourself that, and the tray at your elbow makes it a little harder to believe.</p>';
  return '<p>“Sweetheart—” You end the call. The screen goes dark, and for a second your reflection is there, filling the glass, and then the phone clicks off and even that is gone. You sit in the quiet, your hand still on the phone, and the tray is already in reach, and the food is warm, and it is the only thing tonight that won’t ask you anything.</p>';
};

addAction('sister:end', function (){
  apply({ lastScene: 'sister:end', screen: 'room', notice: '' });
});

AFTER['sister:end'] = function (){
  return '<p>The call ends. The room settles back into its quiet hum — the fridge, the band, the tray on the nightstand waiting like it always does.</p>';
};
