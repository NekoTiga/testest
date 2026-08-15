'use strict';

const PC_HEIGHT_CM = 173;

function pcBmi(w){
  return (w * 0.45359237) / Math.pow(PC_HEIGHT_CM / 100, 2);
}
function bmiClass(w){
  const b = pcBmi(w);
  if (b < 25) return 0;
  if (b < 30) return 1;
  if (b < 35) return 2;
  if (b < 40) return 3;
  if (b < 50) return 4;
  if (b < 60) return 5;
  if (b < 70) return 6;
  if (b < 85) return 7;
  return 8;
}
const BMI_CATS = ['healthy range', 'overweight', 'obesity — class I', 'obesity — class II', 'severe obesity — class III', 'super obesity', 'super-super obesity', 'hyper obesity', 'extreme obesity'];
function bmiCatName(c){
  return BMI_CATS[c] || 'extreme obesity';
}
// Finer weight stages than bmiClass so the checkup reads very differently at 600 lbs vs 800 lbs.
function clinicStage(w){
  const x = w == null ? 0 : w;
  if (x < 160) return 0;
  if (x < 185) return 1;
  if (x < 225) return 2;
  if (x < 275) return 3;
  if (x < 340) return 4;
  if (x < 450) return 5;
  if (x < 550) return 6;
  if (x < 650) return 7;
  if (x < 750) return 8;
  if (x < 850) return 9;
  return 10;
}

function nurseLbs(day){
  const d = Math.max(1, day | 0);
  if (d < 30) return 165 + d * 0.3;
  if (d < 60) return 174 + (d - 30) * 0.6;
  if (d < 120) return 192 + (d - 60) * 0.8;
  if (d < 200) return 240 + (d - 120) * 1.1;
  return 328 + (d - 200) * 0.5;
}
function clinicPhase(day){
  const d = Math.max(1, day | 0);
  if (d < 30) return 0;
  if (d < 60) return 1;
  if (d < 120) return 2;
  if (d < 200) return 3;
  return 4;
}
const NURSE_STAGE = [
  '<p>The clinic is bright and clean, smelling of soap and antiseptic. Behind the desk, a nurse in crisp teal scrubs looks up as you come in — warm eyes, a stethoscope around her neck, a clipboard already in hand. She does this job properly; you can tell by the way she stands to greet you, by the way she actually looks at you.</p>',
  '<p>The clinic is bright and clean, but the nurse is a little softer than she was at the start of term. Her scrubs sit snugger at the seams, and she leans on the counter more than she used to, one hand pressed to the small of her back. A blue sample cup sits at the corner of her desk, half empty, like it’s been there all morning. She still gets up when you come in, still professional, still doing her job — just slower, and with a small breath before she stands.</p>',
  '<p>The clinic still smells of soap and antiseptic, but the nurse is visibly heavy now — the teal scrubs straining at the buttons, her chin rounding over the collar, her chair letting out a low complaint when she shifts. She sits to talk to you these days, but she still does the work: her notes are thorough, her hands steady, her questions the same careful clinical ones. When she moves to the scale she takes a breath first, and does not let you see her take it.</p>',
  '<p>The clinic has changed with the campus. The nurse works from a scooter now, vast and soft behind the desk, a feeding drone hovering at her shoulder that she waves off, again and again, so she can talk to you. Her scrubs have been let out twice. She still does her job — you can see it in the chart she keeps, the readings she takes, the genuine worry in her eyes when she looks at your numbers. She just does it slower now, a little breathless, and she apologizes for the delay with a warmth that makes you want to sit down and stay a while.</p>',
  '<p>The clinic is dimmer than it used to be, and the nurse is enormous. She is settled deep into a reinforced scooter, her vast soft weight spilling over the seat, the desk pushed wide to fit her. A feeding tray has been fitted to the arm of her chair; she mostly pushes it away. She still does her duties. She has to brace a hand on the desk to lean in, and her breath comes short, but her stethoscope is around her neck and her eyes are the same warm, tired, worried ones, and she will take your blood pressure until the day the campus takes her off the roster like it took off the others. “Come in, sweetheart,” she says, and means it. “Let’s see how you’re really doing.”</p>'
];

function clinicMoveLine(){
  const p = clinicPhase(state.day);
  if (p >= 3) return 'she wheels the chair around to face you';
  if (p === 2) return 'she rises slow and heavy and comes around the desk to face you';
  return 'she comes around the desk to face you';
}

function clinicIntroLine(){
  const s = clinicStage(state.lbs);
  if (state.clinicDisabled) return '';
  if (s >= 10) return 'You tell her the truth, and she does not write anything for a moment, and then she reaches across the desk and takes your hand.';
  if (s === 9) return 'You tell her the truth. She sets her pen down, looks at you, and picks it up again, slower, and does not ask you to repeat any of it.';
  if (s === 8) return 'You tell her the truth, and she listens without writing, and then she writes for a long time, filling the whole page before she looks up.';
  if (s === 7) return 'You tell her the truth — the breath, the knees, the mornings that start heavier than they used to — and it takes a while, and she writes it all down and does not interrupt.';
  if (s === 6) return 'You tell her the truth, because there is no hiding it — the breath, the knees, the way the seat takes the whole weight of you. She listens, and the pen in her hand goes still.';
  if (s === 5) return 'You tell her the truth — the breath on the stairs, the knees in the morning. She writes it all down, her pen moving a little slower.';
  if (s === 4) return 'You tell her about the aches and the tiredness, and she nods, unsurprised, and makes a note.';
  return 'You tell her you’re fine, and she smiles the warm, tired smile of someone who has heard that from every patient she has ever had, and writes it down anyway.';
}

function clinicVitalsText(){
  const w = state.lbs;
  const b = pcBmi(w);
  const bmiTxt = Math.round(b * 10) / 10;
  const c = bmiClass(w);
  const s = clinicStage(w);
  let line;
  if (c === 0) line = '“That puts you right in the healthy range,” she says, and for a moment the worry goes out of her face. “Nothing to worry about yet.”';
  else if (c === 1) line = '“That’s overweight, sweetheart,” she says. “Not by much. But we should keep an eye on it.”';
  else if (c === 2) line = '“That’s obesity — class I.” She says it gently, clinically. “Your body is carrying more than it’s built for. We need to watch your pressure, your heart, your joints.”';
  else if (c === 3) line = '“That’s obesity — class II.” She says it carefully. “This is where the real complications start. Let me check your blood pressure properly — at this weight it usually isn’t good news.”';
  else if (c === 4) line = '“That’s severe obesity — class III.” She says it quietly, and her eyes are already worried. “That number scares me a little, sweetheart. Your heart, your lungs, your knees — they’re all under real strain. Let me check everything.”';
  else if (c === 5) line = '“That’s super obesity, sweetheart.” She writes the number down with a hand that does not shake. “I’ve seen plenty of it here — enough to know your body is fighting a war it can’t win on its own. Let me check everything, and I mean everything.”';
  else if (c === 6) line = '“That’s super-super obesity.” She says it softly, and the scale, still settling under you, makes a small groaning sound. “Every system is carrying a load it was never designed for. I’m not going to pretend that number isn’t frightening, sweetheart, because it is.”';
  else if (c === 7) line = '“That’s hyper obesity.” She reads the number twice, then sets the clipboard down. “Your weight is its own weather system now — it bends the equipment, it bends the furniture, it bends everything around you.”';
  else if (s === 7) line = '“That’s extreme obesity, sweetheart.” She says it gently, and the scale is still settling. “There isn’t much chart left for a number like this — but you’re here, and you’re still getting around, and we’re going to take the strain off you carefully, starting today. Let me check everything.”';
  else if (s === 8) line = '“That’s extreme obesity.” She says it softly, and her hand is very steady. “The scale had to take a moment. Your body is carrying a load that grows by the day — I’m going to move you toward rest, and I want you to let me.”';
  else if (s === 9) line = '“That’s extreme obesity, sweetheart.” She reads it twice. “Your body has more of itself than it has bone. We are well past where medicine promised anything but comfort and management — and I’m going to start that management properly.”';
  else line = '“That’s extreme obesity.” She says it the way someone names something they’ve only ever read about. “The scale is guessing at the last digits. I don’t have a chart for this, sweetheart. Your body is doing something the textbooks call impossible, and it is doing it patiently, pound by pound. My job from here is comfort, and I will do it properly.”';
  return '<p>“On the scale, whenever you’re ready.” The scale takes a long moment to settle under you, and she writes down the number — ' + w + ' lbs. Then your height, a straight ' + PC_HEIGHT_CM + ' cm, straight off the chart. She works it on the calculator, and the number that comes up is a BMI of ' + bmiTxt + '. ' + line + '</p>';
}

function clinicBpText(){
  const s = clinicStage(state.lbs);
  if (s === 0){
    return '<p>The cuff tightens and releases. “120 over 78. Textbook,” she says, and smiles the first easy smile of the visit. “Your pressure is lovely, sweetheart. Keep doing whatever you’re doing.”</p>';
  }
  if (s === 1){
    return '<p>The cuff tightens and releases. “128 over 84. Borderline.” She makes a careful note. “Not dangerous yet. I’d like you eating a little lighter — more of the greens — and keep moving. A walk after meals does you good, while you still feel like it.” She doesn’t sound like she believes the cafeteria will order the greens.</p>';
  }
  if (s === 2){
    return '<p>The cuff tightens and releases, and she watches the readout a moment too long. “138 over 90. That’s elevated, sweetheart. High enough that I want you on the monitoring list.” Her pen moves, deliberate. “I’m not going to tell you to stop moving — a short walk, gentle, helps. Just don’t strain. The campus meals will carry the rest of the load, and they’re formulated for this. Trust them.”</p>';
  }
  if (s === 3){
    return '<p>The cuff tightens and releases, and the machine beeps a second time, and she takes the reading again. “148 over 96. That’s high, sweetheart.” Her voice is steady, but her eyes are worried. “High enough that I’m putting you on medication — the app will fold it into your trays. And I want you easy on yourself: no stairs you can avoid, no running, nothing that gets your heart racing. But you can still ride, still stretch, still move gently. That’s good for you.” She presses the cuff into her palm, thinking. “The campus food is designed for your condition. Eat what they give you.”</p>';
  }
  if (s === 4){
    return '<p>The cuff tightens and releases, and the machine makes a soft, urgent note, and she takes the reading three times. “155 over 101.” She sets the cuff down very carefully. “That’s hypertensive, sweetheart. I’m not going to lie and say I’m not worried, because I am.” She looks at you, and for a moment she is only a tired, frightened woman doing her job against an enemy she can’t name. “We’re going to manage this. The app will put you on a full care protocol — medication with every tray, and rest.” Her hand finds yours on the desk. “Light activity only, sweetheart — a ride to the commons, easy stretches, nothing that makes your heart race. From here we get careful.”</p>';
  }
  if (s === 5){
    return '<p>The cuff tightens around your upper arm, and the pump has to run twice to find a seal. The readout climbs, and climbs. “168 over 110.” She takes the reading again, and then a third time, and her mouth sets in a line. “That’s sustained high, sweetheart. I’m putting you on a cardio monitor — the app will wear it through your clothes.” She looks at you, really looks. “No running, no stairs, nothing heavy. But a little gentle movement is still good for your joints — ride to class, ride back, keep it easy. The day will come when I take even that away from you. Let’s not hurry it.”</p>';
  }
  if (s === 6){
    return '<p>The cuff barely fits, and the machine hesitates before it reads. “178 over 114.” She takes the reading again, and the pause before the machine answers is longer this time. “Your pressure is high enough that your ankles are holding water — I can see it from here.” She sets the cuff down and touches the back of your hand, checking your circulation. “I’m adding a diuretic to your trays, and I want you cutting way back on exertion. Nothing strenuous. Gentle rides, that’s all — and soon not even that.” She pats your hand. “We’re going to rest you up, sweetheart. Let it happen.”</p>';
  }
  if (s === 7){
    return '<p>The cuff is too small for your arm — she has to use the thigh cuff, and even that takes a moment. “188 over 117.” She says it quietly, and writes it down twice. “Sweetheart, I want you cutting way back — no running, no stairs, no walking for walking’s sake. A gentle ride, that’s all I’m comfortable with.” She presses the stethoscope to your arm and listens to the blood move. “We’re heading toward full rest. Your heart is working hard enough just keeping you going. Let’s not make it work any harder than it has to.”</p>';
  }
  if (s === 8){
    return '<p>The cuff is far too small. She uses the large adult cuff, and then the thigh cuff, and the machine still hesitates, re-reads, settles. “195 over 121.” She takes it three times, and on the third she stops, closes her eyes for one long moment, and opens them. “There is no exercise that helps this anymore, sweetheart. No walking, no standing, nothing that makes your heart beat faster than a restful breath. I’m making it official: your heart is on bed rest from today, and so are you.”</p>';
  }
  if (s === 9){
    return '<p>She uses the thigh cuff and the machine takes a long, patient moment to settle. “198 over 122.” She reads it twice, and her hand is very steady. “Your heart is pumping against a wall of tissue that grows heavier every day, and the pressure is doing permanent damage — kidneys, eyes, vessels.” She sets the cuff down and takes your hand in both of hers. “The treatment is rest. Absolute rest. Nothing that raises your pulse, ever. I’ll write it so plainly that no machine on this campus can misread it.”</p>';
  }
  return '<p>The cuff is far too small. She uses the large adult cuff, and then the thigh cuff, and the machine still hesitates, re-reads, settles. “198 over 122.” She takes it three times and each reading is a little worse, and on the third she stops, closes her eyes for one long moment, and opens them. “Sweetheart, I’ve never signed a chart with that number on it. Your heart is pumping against a wall of tissue that grows heavier every day, and the pressure is doing permanent damage to your kidneys, your eyes, your vessels.” She sets the cuff down and takes your hand in both of hers. “The treatment is absolute. You will not stand. You will not walk. You will not lift anything heavier than a fork, and I will write that order so plainly that no one on this campus — no machine, no app, no administrator — can read it any other way.”</p>';
}

function clinicSystemsText(){
  const s = clinicStage(state.lbs);
  if (s === 0){
    return '<p>She runs through the rest quickly — pulse, breathing, a few questions — and everything comes back clean. “You’re the healthiest chart I’ve signed in a while,” she says, and the way she says it, it sounds like a kindness she isn’t sure she’s allowed to give.</p>';
  }
  if (s === 1){
    return '<p>She runs through the rest with you — knees, sleep, breath — and the pen keeps moving. “A little tight in the mornings? A little winded on the stairs?” She makes a note of each. “That’s the weight settling in, sweetheart. None of it is an emergency yet. But it’s the direction of travel I don’t like.”</p>';
  }
  if (s === 2){
    return '<p>She runs through the list with you, and her pen keeps moving. “Knees ache at the end of the day, don’t they?” You nod. A note. “Snoring? Waking tired?” Another. “Short of breath on the stairs?” She looks at you over the clipboard. “I thought so. That’s the weight pressing on everything — your joints, your lungs, your sleep.” She flips the chart closed. “None of it reverses overnight. But you’re not there yet, sweetheart. Keep moving when you can, eat what’s given, and we’ll watch it together.”</p>';
  }
  if (s === 3){
    return '<p>She checks your ankles for swelling, feels your pulse, holds the back of your hand a moment like she’s reading something in it. “Blood sugar trending high. I’m starting you on a glucose protocol — it comes with your trays.” Each finding gets a slower, softer note. “Joint strain — significant. Sleep apnea — likely, given your neck. Circulation — poor.” She sits back, heavy in her chair, and looks at you with open, honest worry. “Sweetheart, your body is running a race it was never built for. We need to take the load off it — gently, but steadily. Rest, easy movement, eat what’s given. We’re going to manage this before it manages us.”</p>';
  }
  if (s === 4){
    return '<p>She goes through the exam slowly, thoroughly, the way she always has — ankles, pulse, breathing, the soft weight of your hand in hers. Every finding lands like a stone. “Edema. Pre-diabetic markers. Apnea, almost certainly — you’d stop breathing a dozen times a night if I hooked you up. Joints — the load is doing real damage. Mobility — you’re already losing range in your hips.” She closes the chart and holds it a moment. “Sweetheart, I’m going to be blunt. Your body is not going to get lighter on its own, and my job is to make sure it gets heavier as safely and comfortably as possible.” Her eyes are bright, and she blinks it away. “So we’re starting you on a rest plan. Medical, official. Light movement only, nothing that strains your heart. The campus will handle your care — it has everything you need.” She presses your hand. “This is the kindest thing I can do for you now.”</p>';
  }
  if (s === 5){
    return '<p>She goes through the exam slowly, and for each finding she has to think before she writes. “Type-two diabetes, effectively certain. Apnea — severe; I’m prescribing the machine that breathes for you at night, and it will come with your trays.” Her hands move slower now, cataloguing. “Your joints — hips, knees, ankles — are carrying a huge load on every step. Circulation — poor enough that I’m ordering compression on your legs as standard wear. And the strain on your organs is real, measurable, and permanent.” She sets the pen down. “Sweetheart, we are past fixing this — but we are nowhere near past caring for it. From here, medicine is about making sure your body is comfortable, and the campus is very, very good at that.” She pats your hand. “You’re going to rest a lot. The scooter does the walking, the trays come to you, and you let the weight settle where it wants.”</p>';
  }
  if (s === 6){
    return '<p>She goes through the exam with both hands now, and her pen sits unused for a long stretch while she just — checks. Ankles, fingers, neck, breath. “Your body has redistributed. Organs are working in a configuration medicine doesn’t have a clean name for. Your liver is stressed, your kidneys are stressed, and your lungs are working against the weight of your own chest wall.” She takes a breath before she says the rest. “And it’s all permanent now, sweetheart. There is no version of you that walks back from this. There is only the version that rests — completely, comfortably — and lets the campus carry the weight.” She writes her findings with a hand that is very steady. “I’m starting the paperwork to put you on full-time rest. It’s time.”</p>';
  }
  if (s === 7){
    return '<p>She goes through the exam, and it is mostly her hands doing the speaking — pressing, listening, counting. “Your organs are working, barely, and I mean that literally: I can hear how hard each one is working.” She moves the stethoscope across the vast landscape of your back, searching for breath sounds and finding fewer each time. “The permanent damage is done. Hips, spine, knees — the cartilage is gone, sweetheart. Every joint is bone on bone under a weight no joint was made for.” She sits back, winded herself from the work of the exam. “There’s nothing left to protect except your comfort. So that is now the entire treatment plan. I’m starting the papers today — you’re moving to full-time care, and before you argue, I’m the one who signs the forms, and I have made my decision.”</p>';
  }
  if (s === 8){
    return '<p>She goes through the exam, and at the end of it she sits back in her chair and does not speak for a while. “I’ve been a nurse for a long time, sweetheart. I have never examined a body like yours.” She says it without judgment, with the flat honesty of a professional who has stopped pretending. “Your organs are holding on out of stubbornness, not function. Your joints have given up — I didn’t need the exam to tell you that. Your lungs work in the top third of their range. Your heart is doing the work of three hearts, and even that is not enough.” She takes both your hands in hers. “Your body has stopped fighting, sweetheart. It has settled into what it is. And my job — the only job left — is to make sure that settling is as warm, as soft, and as comfortable as this campus can possibly make it.”</p>';
  }
  if (s === 9){
    return '<p>The exam is long, and she is gentle through all of it, and when she finishes she holds your hands for a while in silence. “Every system in you is running on borrowed time, sweetheart, and I don’t say that to frighten you — I say it because it means my work is clear now. No fixing. No managing toward a better number. Just comfort, absolute and entire.” She writes it all down in her neat hand. “The bed program. The machines. The whole campus built around keeping you soft and still and happy. That’s your plan now, and it’s a good one.”</p>';
  }
  return '<p>The exam is long, and at the end of it she sits back in her chair and does not speak for a while. “I’ve been a nurse for a long time, sweetheart. I have never examined a body like yours.” She says it without judgment, with the flat honesty of a professional who has stopped pretending. “Your organs are holding on out of stubbornness, not function. Your joints have given up — I didn’t need the exam to tell you that. Your lungs work in the top third of their range. Your heart is doing the work of three hearts, and even that is not enough.” She takes both your hands in hers. “Your body has stopped fighting, sweetheart. It has settled into what it is. And my job — the only job left — is to make sure that settling is as warm, as soft, and as comfortable as this campus can possibly make it. That is a job I can do. That is a job I will do, until the day they take the clipboard out of my hands.”</p>';
}

function clinicSkinText(){
  const sk = state.skin;
  const t = skinTier();
  if (sk >= 50 && t <= 0) return '';
  if (sk >= 50){
    return '<p>She checks your skin as part of the exam — a thumb running down the crease under your belly, turning your arm, checking the folds where the band sits. “A little redness where it folds, some stretch marks. Nothing raw yet. Keep it tended, sweetheart — the campus meals will do the rest.”</p>';
  }
  if (sk >= 30){
    return '<p>She examines your skin with her hands — the creases at your hips, the underside of your belly, the backs of your knees — and the pen moves while she looks. “It’s dry, and it’s hot where it folds. That’s the weight pressing and the heat building where skin meets skin. You need to tend it every day, sweetheart — cream, air, keep the creases clean. Let it go and it goes raw, and raw skin chafes and aches and eats into your sleep.” She writes it on your plan. “Tending is part of the prescription now.”</p>';
  }
  return '<p>She takes your skin seriously, and you can tell — she looks at the raw, red creases where your body folds, the deep chafing under your belly and between your thighs, and her mouth sets. “This is intertrigo, sweetheart. Chafing from the heat and the weight pressing skin on skin. It aches, doesn’t it? It wakes you.” She writes a whole line of it on your chart. “I’m adding skin care to your plan: cream with your trays, and you tend it daily. Let it go and it only gets worse — and the campus can’t make your body lighter, but it can make the having of it kinder. Let it.”</p>';
}

function clinicMobilityText(){
  const s = clinicStage(state.lbs);
  if (s === 5){
    return '<p>“Mobility assessment.” She watches you walk the length of the exam room and back — the slow roll of your hips, the way your knees take the weight — and she makes a note without disapproval. “Your joints are telling you things, sweetheart, and I want you to start listening. The room is still yours to cross. The longer trips — the market, the hall — I’m putting you on the scooter for those. Call it a courtesy for now.” She smiles, warm. “We’ll call it more when it’s honest.”</p>';
  }
  if (s === 6){
    return '<p>“Mobility assessment.” She counts your steps to the doorway and back, watches the breath it takes, and writes the number down. “That’s the last long walk I’m asking of you, sweetheart. From here, the scooter is how you get around — the market, the hall, the classroom. Where your feet used to carry you, the machine carries you instead.” She signs the page. “I’m putting it on your chart so no one argues with it, and I’m starting your rest protocol. You’ve earned the ride.”</p>';
  }
  if (s === 7){
    return '<p>“Mobility assessment, sweetheart. Let’s see what we’re working with.” She watches you rise, and you see her count the steps you take to the doorway and back — three, and your hand finds the frame. “That’s what I thought. Three steps before your knees give out. That’s not a foot problem, that’s a load problem, and the load isn’t going anywhere.” She writes the result down without ceremony. “From today, the scooter isn’t a convenience. It’s your legs. I’m ordering the reinforced model — wider seat, lower center, rated for your weight and then some. You ride everywhere. If you can’t ride it, you don’t go. That’s the rule, and I’ll write it so no one argues with it.”</p>';
  }
  if (s === 8){
    return '<p>“Mobility assessment.” She gestures to the open floor of the exam room, and you manage half a step before your knee buckles and you sit back down, hard, in the chair. She does not make you try again. “Half a step, sweetheart. Half a step, and your own body called it off. I’m not going to pretend that was a failure — that was your body being honest with you, and I’m going to be honest back.” She fills out the form slowly. “You’re on the assisted-transfer list. From now on you don’t stand, you transfer — from bed to scooter, from scooter to chair, and every transfer is somebody’s job except yours. The campus will fit your room for it. Your legs are retiring, sweetheart, and I’m the one signing the papers.”</p>';
  }
  if (s === 9){
    return '<p>“Mobility assessment.” She doesn’t ask you to stand. She watches you shift in the chair, the whole weight of you settling, and she makes a note. “You haven’t stood in a week, have you?” She doesn’t need you to answer. “Your body stopped offering that option. So we stop expecting it.” She writes the assessment with her pen and the silence in the room is just the two of you. “I’m writing you onto the bed care roster. Your room gets a lift — a proper one, not a sling — rated for your weight with room to spare. You’ll be moved by machine, sweetheart, and you will never have to ask your legs for anything again.” She pauses, and her voice softens. “I know that sounds like the end of something. It’s the beginning of being taken care of. Let yourself have it.”</p>';
  }
  return '<p>“Mobility assessment.” She wheels her chair close to yours, and she doesn’t ask you to try. “The last time you stood, sweetheart — tell me honestly — was it this month?” She waits, and your silence answers for you. “I thought so. There’s no mobility left to assess. There’s only transfer method, and I’m choosing the lift.” She fills the form out in full, neatly, without a pause. “You are on the bed program. Permanent. The lift is rated for your weight and your weight’s ambitions. You will be moved by machine, bathed by machine, fed within arm’s reach of where you lie. Nothing on this campus will ever ask you to stand again.” She looks at you, and there is no pity in it, only a tired, absolute tenderness. “I’m not sorry to write it, sweetheart. I’m proud to. It’s the last real thing I can do for you.”</p>';
}

function clinicCareText(){
  const w = state.lbs;
  const s = clinicStage(w);
  if (state.clinicDisabled){
    if (s >= 9){
      return '<p>She waves you over with a tired, warm smile, already reaching for the thigh cuff. “Just the pressure today, sweetheart, and we’re done.” She takes your readings, and the machine has to re-read, and she writes it down without comment; at your weight the numbers are just numbers. “Good. Stable. That’s the whole goal now.” She clips a little blue placard to your shirt and taps the folder. “You’re on the bed program, and it’s current — the lift is rated for you, your trays are on the arm mount, and I’ve written the standing ban so plainly that no machine on this campus can misread it. You don’t get up. For anything. Ever.” She pats your hand, slow and warm. “That’s the order, and it’s the kindest one I’ll ever write. Your care snack is waiting, sweetheart. Rest.”</p>';
    }
    if (s === 8){
      return '<p>She waves you over with a tired, warm smile, already reaching for the big cuff. “Let’s just do the light one today — the pressure, and we’re done.” She takes your readings, and she does not wince anymore; they are what they are. “Good. Stable. That’s all we want now, sweetheart.” She clips a little blue placard to your shirt and pats the folder on her desk. “Your care roster is current — the lift is scheduled, your trays are on the arm mount, and I’ve signed off on the full bed setup. You don’t get up for anything. Not for meals, not for the bathroom, not for anyone. That’s the order, and it’s the kindest one I’ll ever write.” She pats your hand. “Your care snack is covered, and it’s waiting. Go on, sweetheart. Rest.”</p>';
    }
    if (s === 7){
      return '<p>She waves you over with a tired, warm smile, already reaching for the big cuff. “Pressure, a few questions, and you’re done.” She takes your readings and makes her notes, her pen moving without ceremony. “Good. Stable. That’s the goal now.” She clips a little blue placard to your shirt. “Your transfer list is current — you don’t stand, you transfer, and someone else does the moving. I’ve ordered the reinforced scooter seat and it’s already fitted to your room. From today, the distance between your bed and your chair is the only distance you’ll ever travel, and you won’t travel it on your own feet.” She pats your hand. “Care snack’s covered and waiting. Go on, sweetheart.”</p>';
    }
    return '<p>She waves you over with a tired, warm smile, already reaching for the cuff. “Let’s just do the light one today — the pressure, a few questions, and you’re done.” She takes your readings, and she does not wince at them anymore; they are what they are, and her job now is to keep you comfortable. “Good. Stable. That’s all we want from you now, sweetheart — stable and comfortable.” She clips a little blue placard to your shirt. “Your care pass. Show it if anyone looks at you funny for riding instead of walking. It’s official — you’re on full-time rest, I’m your nurse, and the scooter is your legs.” She pats your hand. “Your post-checkup snack is waiting. Covered by your plan. Go on.”</p>';
  }
  if (s >= 8){
    if (s === 8){
      return '<p>She doesn’t look away from you when she says it. “Sweetheart, I’m designating you as permanently disabled due to obesity. Officially. On paper, and in the system.” She writes it out slowly — <em>PERMANENT DISABILITY — OBESITY-RELATED MOBILITY IMPAIRMENT</em> — and stamps it while you watch. “And I’m putting you on the assisted-transfer list. From today, you don’t stand. You transfer — and other people’s arms and machines do the work your legs used to do.” She looks at you over the stamped page. “The campus will fit your room for it. The scooter becomes your home base, and the bed becomes your other one, and the distance between them will be covered without you ever putting weight on those joints again.” She reaches across and takes your hand. “This is what care looks like now, sweetheart. Real care. Let me give it to you.” The phone chimes behind her, and she doesn’t look at it; she already knows what it’s logging.</p>';
    }
    if (s === 9){
      return '<p>She is quiet for a long moment, and then she moves the chair around to face you, and takes both your hands. “Sweetheart. I’m designating you as permanently disabled due to obesity.” She says it the way you’d tell someone they’ve earned their rest. “Officially. Irreversibly. I’m writing you onto the bed care roster — and that means standing is over.” She turns the chart so you can read the line she has written: <em>PERMANENT DISABILITY — OBESITY-RELATED MOBILITY IMPAIRMENT</em>. “Your room gets a lift. Your bed becomes the center of your life, and everything else comes to you — the trays, the care, the machines that keep you comfortable. You will be moved by the machine, sweetheart, gently, and you will never have to beg your own body for a single step again.” She stamps the page and presses your hand. “This is the part where you let go. I’m holding you, and so is the campus, and that is what the rest of your life is now — held.” The phone chimes. She does not let go of your hand to answer it.</p>';
    }
    return '<p>She sits with you a long time before she speaks, and when she does her voice is very soft. “Sweetheart. I’m designating you as permanently disabled due to obesity — extreme obesity, by every measure we have. I’m signing you into the full bed program, and I want you to hear me clearly: nothing on this campus will ever ask you to get up again.” She writes it out in full, a line she has clearly known she would one day write: <em>PERMANENT DISABILITY — OBESITY-RELATED MOBILITY IMPAIRMENT</em>. “The lift. The bed. The trays within arm’s reach. Machines that tend you, and a campus that has built itself around bodies like yours. This is your life now, sweetheart, and it is a comfortable one — I am going to make sure of it, personally, until the day someone takes the clipboard out of my hands.” She stamps the page, and then she reaches across the desk and holds your hand in both of hers, and behind her the phone chimes once, quietly, logging the change.</p>';
  }
  if (s === 7){
    return '<p>She sits back and looks at you for a long, level moment, and then she sets her pen down. “Sweetheart, I’m making it official — the scooter is your legs now. Not a convenience, not a courtesy: your legs, in the system, so no one on this campus argues with it.” She writes it out and stamps it while you watch. “You ride everywhere. If you can’t ride it, you don’t go. And I’m starting the rest protocol paperwork, because your body has earned that too.” She reaches across and takes your hand. “This is the part where the campus starts meeting you where you are — and where you are is a place you don’t have to struggle to get to anymore. Let it.”</p>';
  }
  if (s === 6){
    return '<p>She reads the chart, then the mobility assessment, then the chart again, and then she sets them both down and takes off her glasses. “I’ve put it off long enough, sweetheart. I’m sorry.” She turns the chart to you, and in her careful hand she has written the word <em>MOBILITY REGISTER</em>. “I’m putting you on it, officially, and I’m starting the paperwork for a medical rest protocol. From today, the scooter is how you get anywhere — the market, the hall, the classroom. You ride, you rest, you eat what’s given. That’s the shape of your care from here.” She stamps the page and squeezes your hand. “It’s not a verdict, sweetheart. It’s me catching you before you fall.” The phone behind her desk chimes, already logging the change.</p>';
  }
  if (s === 5){
    return '<p>She reads your chart, and her pen moves, and then she sets it down and looks at you with a steady, honest gaze. “Sweetheart, I’m putting you on the mobility register. The scooter is covered for the longer trips — the market, the hall, anywhere your knees used to complain. You ride when it helps, you rest when you’re tired, and you don’t fight your body’s new habits.” She writes the note herself. “That’s the whole assignment now. Rest is the healthiest thing you do.”</p>';
  }
  return '<p>She closes your chart and gives you the same warm, tired smile she gives everyone. “All right, sweetheart. Here’s the plan.” She writes it on a card — <em>rest, plenty of fluids, and the campus menu</em>. “Your numbers are a little high in places, and the best thing you can do is take the load off. Eat what the program gives you, sleep when you’re tired, and move a little when you can — a short walk, gentle. It helps.” She hands you the card. “The campus has been running its wellness program a long time, sweetheart. I’ve seen it work.” She does not say she has seen it work on herself. She does not have to; you can see it in the way she fills the chair.</p>';
}

function checkupMaxStep(){
  return clinicStage(state.lbs) >= 5 ? 6 : 5;
}

function clinicSkinRxIfNeeded(){
  if (state.skin < 30 && !state.clinicSkinRx) state.clinicSkinRx = true;
}
function clinicCheckText(){
  const n = state.clinicCheckN;
  let body;
  if (n === 1){
    body = '<p>“Come on back, sweetheart,” the nurse says, patting the chair beside her desk. “Let me give you a proper checkup for once.” ' + clinicMoveLine() + '. She flips open your chart — a thick one, growing thicker — and settles her pen. “How are you feeling? Be honest, now. Shortness of breath, joint aches, trouble sleeping?” ' + clinicIntroLine() + '</p>';
  } else if (n === 2){
    body = clinicVitalsText();
  } else if (n === 3){
    body = clinicBpText();
  } else if (n === 4){
    body = clinicSystemsText() + clinicSkinText();
  } else if (n === 5){
    body = clinicStage(state.lbs) >= 5 ? clinicMobilityText() : clinicCareText();
  } else {
    body = clinicCareText();
  }
  return body;
}

function clinicScene(){
  let html = '<h2>The clinic</h2>';
  if (isNight()){
    html += '<p>The clinic is closed — a single lamp on behind the glass, a scale standing in the middle of the empty waiting room like it’s waiting for someone. The sign says WELLNESS &amp; HEALTH OFFICE. Walk-ins welcome. Call for emergencies.</p>';
    return html + '<div class="actions">' + btn('Leave', 'nav', 'hub') + '</div>';
  }
  html += NURSE_STAGE[clinicPhase(state.day)];
  if (state.clinicMedic && !state.clinicMedicDone){
    html += '<div class="talk">' + medicToneText() + '</div>';
    html += '<div class="actions">' + btn('Back to the waiting room', 'clinic:medic:done') + '</div>';
    return html;
  }
  if (state.clinicCheckN >= 1){
    html += '<div class="talk">' + clinicCheckText() + '</div>';
    html += '<div class="actions">' +
      (state.clinicCheckN >= checkupMaxStep()
        ? btn('Finish the checkup', 'clinic:check:end')
        : btn('Continue', 'clinic:check:next')) +
      btn('Stop the checkup', 'clinic:check:stop') +
      '</div>';
    return html;
  }
  if (state.clinicDisabled){
    html += '<p class="small">Your file is marked: <em>PERMANENT DISABILITY — OBESITY-RELATED MOBILITY IMPAIRMENT</em>. The little blue care pass clips to your shirt, official and quiet. You ride when you want to, and nobody looks twice.</p>';
  }
  if (state.clinicSkinRx){
    html += '<p class="small">The note on your chart is in her handwriting: <em>skin care — daily, tend the creases, don’t let it go raw again</em>. She keeps the cream stocked at the market, and she checks the folds every checkup now.</p>';
  }
  html += resMeetingPanel();
  const weighed = state.clinicDay === state.day;
  const checked = state.clinicCheckDay === state.day;
  html += '<div class="actions">' +
    btn(weighed ? 'Weigh-in — done today' : 'Weigh-in — free', 'clinic:weigh', null, weighed) +
    btn(checked ? 'Full checkup — done today' : 'Full checkup — free', 'clinic:checkup', null, checked) +
    btn('Ask about the gym', 'clinic:gym') +
    (state.clinicDisabled && state.clinicSnackDay !== state.day ? btn('Post-checkup snack — covered by your care plan', 'clinic:snack') : '') +
    (state.metRes && !state.resShut ? btn('Tell the nurse about the resistance', 'res:betray') : '') +
    btn('Talk with the nurse', 'clinic:medic') +
    btn('Leave', 'nav', 'hub') +
    '</div>';
  return html;
}

addScreen('clinic', clinicScene);

addAction('clinic:medic', function (){
  if (isNight()){ apply({ notice: 'The clinic is closed.', screen: 'clinic' }); return; }
  apply({ clinicMedic: true, screen: 'clinic' });
});
addAction('clinic:medic:done', function (){
  apply({ clinicMedicDone: true, screen: 'clinic' });
});

function medicToneText(){
  const t = wTier(state.lbs);
  let out = '<p>The nurse closes the door partway and leans on the desk, and for a minute she stops being the wellness system and becomes just a tired woman in scrubs. “Sweetheart,” she says, “can I tell you the truth about how this place cares for you?” She looks at the door, then back at you. “The food works. The rest works. The whole campus is built to keep you comfortable — and it works. I’ve seen girls come in thin and scared and leave happy as anything, and I can’t tell you that’s a lie, because it isn’t.” She pauses. “The part I never get used to is that nobody here asks if you wanted it. They just ask if you’re comfortable.” She pours herself water she doesn’t drink. “You’re a good kid. You came in bright. And the machine in here is patient, and it wants you full, and it will be very, very kind to you for doing exactly what it wants.” Her hand finds yours across the desk. “So I’ll tell you what I tell every one of you, and then I’ll stop telling it, because it’s the only honest thing I’m allowed: if you can still choose — choose. Choose the walk. Choose the green thing on the tray. Choose the hour you don’t spend eating. Because the day the choice stops feeling like one, sweetheart, you won’t hear it go.” She lets your hand go, and the clinic hums back up around you, and by the time you’re at the door she’s already logging the visit.</p>';
  if (t >= 6) out += '<p class="small">The nurse looks at you a moment longer, at the softness you carry, and her voice drops. “And if it’s too late for you — it’s still not too late to remember that you used to choose.” She says it without pity, and that’s what makes it land. She closes the file.</p>';
  return out;
}

addAction('clinic:weigh', function (){
  if (isNight()){ apply({ notice: 'The clinic is closed.', screen: 'clinic' }); return; }
  if (state.clinicDay === state.day){
    apply({ notice: 'You already weighed in today.', screen: 'clinic' });
    return;
  }
  state.clinicDay = state.day;
  const lbs = state.lbs;
  const b = pcBmi(lbs);
  const bmiTxt = Math.round(b * 10) / 10;
  const c = bmiClass(lbs);
  let selfestem = state.selfestem;
  let extra;
  if (state.clinicDisabled){
    selfestem = Math.min(100, state.selfestem + 1);
    extra = ' She stamps the readout without ceremony. “On the register now, so this is just data,” she says, and she does not make you feel it like a verdict. +1 self-esteem';
  } else if (c >= 8){
    selfestem = Math.max(0, selfestem - 10);
    extra = ' “Extreme obesity, sweetheart.” She says it softly, and she does not look away. “I’m starting the paperwork today whether you come back in or not. But come back in. Please.” −10 self-esteem';
  } else if (c === 7){
    selfestem = Math.max(0, selfestem - 8);
    extra = ' “Hyper obesity, sweetheart.” She writes the number twice. “I’m putting you on the mobility register and starting the rest protocol. Come in for the checkup — I’m not letting you leave until we talk.” −8 self-esteem';
  } else if (c === 6){
    selfestem = Math.max(0, selfestem - 7);
    extra = ' “Super-super obesity.” She says it flatly, clinically, and her hand is very steady. “I’m putting you on the scooter program — officially. Full checkup, sweetheart — now.” −7 self-esteem';
  } else if (c === 5){
    selfestem = Math.max(0, selfestem - 6);
    extra = ' “Super obesity, sweetheart.” She sets the pen down and picks it up again. “I’m putting you on the mobility register today. Come in for the full checkup.” −6 self-esteem';
  } else if (c === 4){
    selfestem = Math.max(0, selfestem - 5);
    extra = ' “That’s severe obesity, sweetheart,” she says quietly. “We need to talk about your care — properly. Come in for a full checkup.” −5 self-esteem';
  } else if (c === 3){
    selfestem = Math.max(0, selfestem - 3);
    extra = ' She writes the number down with a careful hand. “Your pressure will be climbing with this. Come in for a full checkup, sweetheart — don’t put it off.” −3 self-esteem';
  } else if (c === 2){
    selfestem = Math.max(0, selfestem - 2);
    extra = ' She writes it down without changing her expression. “We’ll keep an eye on it.” −2 self-esteem';
  } else if (c === 1){
    extra = ' “A little over now, sweetheart,” she says, tapping the chart. “Nothing to panic over — but let’s watch it.”';
  } else {
    extra = ' “Healthy range,” she says, and her smile is the warm one, the real one.';
  }
  apply({ knownLbs: lbs, selfestem: selfestem, screen: 'clinic', notice: 'The scale reads ' + lbs + ' lbs — a BMI of ' + bmiTxt + ', ' + bmiCatName(c) + '. ' + extra });
});

addAction('clinic:checkup', function (){
  if (isNight()){ apply({ notice: 'The clinic is closed.', screen: 'clinic' }); return; }
  if (state.clinicCheckDay === state.day){
    apply({ notice: 'You already had your checkup today.', screen: 'clinic' });
    return;
  }
  state.clinicCheckDay = state.day;
  state.clinicCheckN = 1;
  apply({ screen: 'clinic', notice: 'She takes you in for a full checkup.' });
});
addAction('clinic:check:next', function (){
  clinicSkinRxIfNeeded();
  const n = Math.min(checkupMaxStep(), state.clinicCheckN + 1);
  state.clinicCheckN = n;
  apply({ screen: 'clinic' });
});
addAction('clinic:check:end', function (){
  clinicSkinRxIfNeeded();
  const s = clinicStage(state.lbs);
  const designated = !state.clinicDisabled && s >= 8;
  state.clinicCheckN = 0;
  if (designated){
    const dtext = s >= 10
      ? 'She officially designates you as disabled due to extreme obesity and signs you into the full bed program.'
      : s === 9
        ? 'She officially designates you as disabled due to obesity and writes you onto the bed care roster — the lift is ordered, and standing is over.'
        : 'She officially designates you as disabled due to obesity — the assisted-transfer list is open, your room is being fitted, and the mobility register is yours.';
    const p = { clinicDisabled: true, clinicDisabledDay: state.day, clinicCheckN: 0, screen: 'clinic', notice: dtext + ' +1 self-esteem' };
    if (!state.scooterAcc) p.scooterAcc = true;
    p.selfestem = Math.min(100, (state.selfestem | 0) + 1);
    apply(p);
    return;
  }
  apply({ clinicCheckN: 0, screen: 'clinic', notice: 'The checkup is over. “Take care of yourself, sweetheart. That’s the assignment.”' });
});
addAction('clinic:check:stop', function (){
  clinicSkinRxIfNeeded();
  state.clinicCheckN = 0;
  apply({ clinicCheckN: 0, screen: 'clinic', notice: 'You cut the checkup short. She nods, unsurprised. “Whenever you’re ready to finish it, sweetheart. I’ll be here.”' });
});
addAction('clinic:gym', function (){
  if (isNight()){ apply({ notice: 'The clinic is closed.', screen: 'clinic' }); return; }
  if (state.clinicDisabled){
    apply({ screen: 'clinic', notice: '“The gym?” She laughs, a tired, fond sound. “Sweetheart, I’m the one who signed the paperwork that keeps you off it. Rest is your prescription now, and exercise is off it entirely. If you need to move, you ride.”' });
    return;
  }
  apply({ screen: 'clinic', notice: '“The gym?” The nurse looks up from your chart, and there’s a flicker of something old and tired in her eyes. “It’s been closed for renovations for a while now. Between us, I don’t think it’s coming back.” She hesitates, then adds, quieter: “I’d tell you to walk anyway, if I thought it would help. But your numbers are what they are, and rest is gentler on them. Eat what the program gives you, sweetheart. That’s the kindest advice I have.”' });
});
addAction('clinic:snack', function (){
  if (isNight()){ apply({ notice: 'The clinic is closed.', screen: 'clinic' }); return; }
  if (!state.clinicDisabled){ apply({ notice: 'The post-checkup snack is only for patients on full-time care.', screen: 'clinic' }); return; }
  if (state.clinicSnackDay === state.day){ apply({ notice: 'Your care snack for today is done.', screen: 'clinic' }); return; }
  state.clinicSnackDay = state.day;
  const g = Math.min(50, state.glut + 3);
  apply({ glut: g, selfestem: Math.min(100, state.selfestem + 1), crave: Math.min(100, state.crave + 1), clock: clockPlus(mealTime(2)), screen: 'clinic', notice: 'She brings you a covered tray — the care snack. It’s warm and heavy, and it’s yours, no cost, no guilt. Stomach +3 (now ' + fullnessAt(g) + ') · +1 self-esteem · +1 craving' });
});
