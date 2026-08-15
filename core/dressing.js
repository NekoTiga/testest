'use strict';

const DRESS_KEYS = ['rigid', 'active', 'soft', 'baggy', 'robe'];

function dressAvailable(key){
  if (pcNaked()) return false;
  const t = wTier(state.lbs);
  if (key === 'rigid') return state.selfcontrol >= 55;
  if (key === 'active') return state.selfcontrol >= 70;
  if (key === 'soft') return true;
  if (key === 'baggy') return true;
  if (key === 'robe') return t >= 4 || state.selfcontrol < 35;
  return false;
}

function dressLabel(key){
  const l = {
    rigid: 'The jeans from August and the tee that binds at the waist',
    active: 'Running shorts that ride up and a sports bra that cuts in',
    soft: 'Leggings that dig into your hips and an oversized tee',
    baggy: 'Joggers and the giant hoodie that strains across your shoulders',
    robe: 'The robe that doesn’t close over your hips',
    zola: 'Zola’s clothes — borrowed, warm, hers',
    'zola-tight': 'Zola’s clothes — too small, half-off, still hers',
    naked: 'Nothing. There’s nothing that fits anymore.'
  };
  return l[key] || 'Clothes';
}

function dressBand(){
  const t = wTier(state.lbs);
  if (t <= 1) return 0;
  if (t <= 3) return 1;
  if (t <= 5) return 2;
  return 3;
}

function dressText(key){
  if (pcNaked()){
    const nd = [
      '<p>There’s nothing to put on. Not a robe, not a sheet, not a stitch that fits. You wake naked and you stay naked, the whole soft length of you spread across the mattress, skin warm against the sheets. The sheet is a thing you kick aside, bunched under the weight of your hip. The door is a thing you don’t cross. The tray is a thing that comes to you, and you eat with the heavy bare sprawl of yourself open to the room.</p>',
      '<p>The drawer is full of old clothes — they hang there, smaller than they used to be — and the drawer stays shut. You are naked, enormous, breasts heavy against the soft curve of your belly, thighs parted and soft against the mattress. The drone that slides your tray through the door moves past the bare spread of you without interest.</p>',
      '<p>You are naked, and the tray is close, and the vast soft sprawl of you takes up most of the mattress — belly rising and falling in slow sweeps, hips spilling over the edge, the deep crease at your waist damp and warm. Nobody here covers themselves. Piper and Mina are naked across the room. The drones move through it all without interest.</p>',
      '<p>You are naked, and you have been for a while now. The bed takes the whole bare, enormous length of you — the soft mound of your belly riding over the sheets, breasts resting on it, the heat of your own skin rising around you. You don’t reach for anything. The tray comes, and the morning is already the shape of every other morning — heavy, soft, naked, fed.</p>'
    ];
    return nd[dressBand()] + '<p>There’s no hiding any of it — the bare soft mass of you lying open on the bed — and you don’t reach for anything to cover it.</p>';
  }
  const band = dressBand();
  const high = state.selfcontrol >= 55;
  const t = {
    rigid: [
      '<p>The jeans button in one clean pull and sit flat against the line of your hips. The tee is the one from move-in, loose at the ribs, cotton warm against your skin. You are dressed in under a minute, denim snug over your thighs, the hem of the tee settling at your waist.</p>',
      '<p>The jeans take work now. You rock your hips side to side, suck in, and the button goes over with a small pop. The waistband presses a pale line into the softness over your hips. The tee is snug across your ribs and shorter over the swell of your hips than it used to be, the hem riding up when you breathe.</p>',
      '<p>The jeans are a project. You sit on the edge of the bed to get them on, and the button only closes if you hold your breath the whole time. The waistband bites into the softness above your hips, a red line that stays, and the seams creak when you turn. You pull the tee down over the fold of your belly, the hem barely reaching the crease.</p>',
      '<p>You can’t get the jeans up over your hips anymore. The buttons won’t close. You leave them in the drawer, your fingers dragging over the soft wide span of your hips, and you pull on the biggest leggings you own instead.</p>'
    ],
    active: [
      '<p>The shorts and sports bra go on in one motion — light cotton, snug elastic. The bra cups your breasts and holds them up, and the shorts sit high against the tops of your thighs. You look like you could run.</p>',
      '<p>The sports bra is snugger than it used to be; it cuts into the softness over your ribs and leaves a red line. The shorts still fit, but they ride up at the top of your thighs now, elastic pressing into the fold where leg meets hip. You tug at them once, twice, and then you stop, the fabric still riding.</p>',
      '<p>The shorts have a drawstring now, and you pull it as tight as it will go. The bra holds you firmly, and when you look down there’s a soft fold spilling over each side of it, skin creased and warm. You wear them anyway.</p>',
      '<p>The sports bra hasn’t fit in months — the bands cut deep red lines and the cups barely hold the weight of you. You wear the shorts with a tank instead, the straps biting into your shoulders. Nobody at the door questions it.</p>'
    ],
    soft: [
      '<p>Leggings and a big tee — soft cotton, easy stretch. You’re dressed in under a minute, the fabric warm against your skin, the leggings smooth over your thighs.</p>',
      '<p>The leggings are forgiving, the waistband resting soft against your skin. The tee hangs loose over the beginning of your belly and the new weight of your hips, cotton skimming the swell.</p>',
      '<p>The leggings have a wide waistband that rolls down over the softness above your hips if you don’t tuck it, elastic pressing a pale line into the skin. The tee is a size you’d have called too big in August, and it still rides up over the curve of your belly.</p>',
      '<p>The leggings are the biggest pair the campus store sells, and even they leave a red crease across your hips by noon, the fabric digging into soft flesh. The tee is enormous and it still rides up at the hem over the curve of your belly.</p>'
    ],
    baggy: [
      '<p>The hoodie is too big for you, fabric hanging loose around your shoulders and over your chest. The joggers are loose at the ankles, soft cotton pooling over the floor. You look comfortable.</p>',
      '<p>The hoodie hangs loose over the roundness of you, cotton covering the swell of your belly and hips. In the mirror, the shape of you is hidden behind the fabric.</p>',
      '<p>The hoodie covers the belly, the love handles, the whole soft width of you. You look in the glass and the fabric hangs straight — until you turn sideways and the hem rides up over the curve of your stomach, baring a strip of skin.</p>',
      '<p>The hoodie barely fits anymore — the sleeves press into your arms, the hem rides up and stops somewhere around the top of your hips, leaving the lower softness of your belly bare. You pull it down over the widest part of you and it creeps back up.</p>'
    ],
    robe: [
      '<p>The robe goes on over the nightshirt, the belt tied loose at your waist. The fabric hangs open over your chest and settles around your hips.</p>',
      '<p>The robe goes over whatever you slept in, the belt done up over the softness of your waist. The fabric pulls across your chest and falls open at the knee.</p>',
      '<p>You pull the robe over the nightshirt. It doesn’t quite close over your hips — the two panels part over the soft width of you — and it hangs open, baring the tops of your thighs.</p>',
      '<p>You don’t get dressed anymore. The robe is the only thing that goes around you, and it doesn’t quite close — the panels strain over the mass of your belly and hips. You tie the belt over the roll where your waist used to be and sit down on the edge of the bed, breath heaving.</p>'
    ],
    zola: [
      '<p>You pull on Zola’s clothes and they hang loose around you — her shirt coming down to your thighs, the cuffs turned up twice, her jeans bagging at the hips and pooling at the ankles. The fabric is warm and soft, worn to your shape by years of her, and it smells faintly of her. You are swimming in her, a girl wrapped in another woman’s size, and it’s almost as comfortable as it is strange.</p>',
      '<p>Zola’s clothes fit like borrowed clothes — loose across the shoulders, snugger over the new softness of your belly, the jeans buttoning over your hips with a little room to spare. Her shirt hangs to mid-thigh and the fabric carries her scent. She dressed you this morning, patient and pleased, smoothing the fabric over you. “There,” she said. “You look like mine.”</p>',
      '<p>Zola’s clothes fit you the way her own fit her — close across the soft weight of your belly, the fabric stretched smooth over the curve, the waistband sitting exactly where it sits on her. They are her clothes, but they might as well be yours. She watched you dress with her arms crossed, delighted, like she was looking at a mirror. “Perfect,” she said. “You grew right into me.”</p>',
      '<p>Zola’s clothes are the only clothes that fit now. The fabric strains across the vast soft weight of you the way it strains across her, seams holding by memory, the shirt riding up over the mound of your belly where it no longer reaches. She lent them to you this morning and watched you get into them, satisfied. “They’re yours now,” she said. “Everything of mine ends up yours.”</p>'
    ],
    'zola-tight': [
      '<p>Zola’s clothes don’t fit. They’re too small — her shirt won’t close across your chest and rides up over the curve of your belly, and her jeans stop short of your hips, seams straining white. You’re half in and half out of them, bare skin showing at the waist and hip where the fabric won’t reach, and every time you move a seam complains. She sent you off like this on purpose, you’re sure of it — your face hot, your clothes a size too small, her laugh warm behind you.</p>',
      '<p>Her clothes are a size too small, and they show it — the shirt stretched taut across your chest, the waistband cutting into the softness above your hips, the zipper doing nothing but hiding the fact it’s half-open. You’re half-naked in her too-small things, and there’s no way to fix it without taking them off, and taking them off means going without, so you wear them, seams straining, skin showing, the whole of you loud about the fact that you’ve outgrown her.</p>',
      '<p>The borrowed clothes are far too small — she gave them to you with a kiss and a wink, and you spent the whole morning half in, half out of them, tugging at a hem that won’t come down over the soft mound of your belly. The waistband bites, the seams strain, and where the fabric ends, there’s you — bare, soft, enormous, spilling out of a woman’s clothes a size too small. She knew. She loves it. You’re starting to love that she loves it.</p>',
      '<p>Her clothes stopped fitting you long ago. The shirt sits across your shoulders like a bib, the waistband rolls under the shelf of your belly, and the seams have given up — split at the hip, at the shoulder, at the thigh. You are mostly out of them, the vast soft bare weight of you pushing through the gaps, and you’ve stopped trying to pull them closed. Zola sends you off like this, half-dressed in the ruins of her things, and she watches you go with a smile like a prayer answered.</p>'
    ]
  }[key][band];
  const c = high
    ? {
        rigid: '<p>The jeans close over the new width of your hips, the button pressed flat against the softness of your belly.</p>',
        active: '<p>The shorts and bra are on, elastic cutting into the softness at your ribs and the tops of your thighs.</p>',
        soft: '<p>The leggings press into your hips and the tee hangs over the curve of your belly.</p>',
        baggy: '<p>The hoodie hides the shape of you from the shoulders down, fabric hanging loose over the soft width of your body.</p>',
        robe: '<p>The robe is all that goes around you now, and it doesn’t quite close over your hips.</p>',
        zola: '<p>Her clothes fit you — loose where they’re loose, snug where it matters, warm with her scent.</p>',
        'zola-tight': '<p>Her clothes are a size too small, and you wear them anyway, seams straining around the softness of you.</p>'
      }[key]
    : {
        rigid: '<p>The jeans take a while, and then they’re on, the waistband cutting a red line into the softness above your hips.</p>',
        active: '<p>The shorts ride up at the thighs, elastic pressing into the soft crease there. You wear them anyway.</p>',
        soft: '<p>The first pair of leggings your hand finds, pulled up over the soft weight of your hips.</p>',
        baggy: '<p>Nothing smaller fits. The hoodie is the biggest thing in the drawer, and it still pulls across your shoulders.</p>',
        robe: '<p>The robe goes over the nightshirt, the belt tied as far as it will reach around your hips.</p>',
        zola: '<p>You’re in her clothes, and they fit the softness of you like they were always meant to.</p>',
        'zola-tight': '<p>The clothes are too small and you wear them anyway, half out of them, and you don’t care anymore.</p>'
      }[key];
  return t + c;
}

function dressDayLine(){
  if (pcNaked()) return 'You are naked, the bare soft mass of you spread across the bed, and nobody here so much as blinks.';
  const l = {
    rigid: 'Your jeans close over the new width of your hips, and leave a red line by noon.',
    active: 'Your running shorts are snug across your thighs now. You wear them anyway.',
    soft: 'Your leggings and tee cover the softness of your belly and leave a crease across your hips.',
    baggy: 'The hoodie hides the shape of you down to the top of your hips.',
    robe: 'The robe doesn’t close over your hips, and nobody mentions it. Nobody ever mentions it.',
    zola: 'You’re wearing Zola’s clothes, and they fit you the way they fit her.',
    'zola-tight': 'You’re wearing Zola’s clothes, and they’re too small, and you wear them anyway.'
  };
  return state.worn ? l[state.worn] : '';
}

function dressMirrorLine(){
  if (pcNaked()) return 'The glass shows all of you, and none of it is dressed — the heavy spread of belly and hips, the fold where the softness of your belly rests on your thighs. The whole vast naked span of you is there to be seen, and you see it, and you don’t reach for anything to cover it.';
  const l = {
    rigid: 'The waistband of your jeans is a red line around the softness above your hips, the button pressed into the soft flesh of your belly. The button held.',
    active: 'The sports bra cuts in over your ribs and the shorts dig into the tops of your thighs. The fit is snugger than it was in August.',
    soft: 'The leggings have a crease across your hips where they’ll spend the afternoon digging in, elastic pressing into soft skin.',
    baggy: 'You have to lift the hem of the hoodie to actually see yourself. You look, and let it drop.',
    robe: 'The robe doesn’t close over your hips, and the mirror shows the two panels parting over the soft width of your belly.',
    zola: 'The mirror shows you in Zola’s clothes — borrowed, loose in places, snug in others, warm with her scent. She dresses you, now. You let her.',
    'zola-tight': 'The mirror shows you in Zola’s clothes, and they are too small — seams straining, skin showing, the whole soft mass of you spilling out of a woman’s clothes a size too small. You wear them anyway.'
  };
  return state.worn ? l[state.worn] : '';
}

function dressGymLine(){
  if (pcNaked()) return 'The gym isn’t for you anymore.';
  const l = {
    active: '<p>You still have a pair of shorts that mean business, riding up at the tops of your thighs. Nobody looks at you twice as you cross the floor, hips swaying under the soft weight of you.</p>',
    rigid: '<p>You’re the least athletic-looking person in here. The jeans creak when you sit down on the bench, the waistband digging into the softness above your hips.</p>',
    soft: '<p>You’re the least athletic-looking person in here, and the leggings dig into your hips with every step.</p>',
    baggy: '<p>The hoodie stays on, hanging down over the roundness of you. Nobody looks at you twice.</p>',
    robe: '<p>The robe swings open over your hips with every step across the floor, and the attendant at the desk watches you the whole way.</p>',
    zola: '<p>You’re in Zola’s clothes, and they fit your softness better than anything in your own drawer. Nobody looks at you twice. You’re not here to run, and everyone knows it.</p>',
    'zola-tight': '<p>You’re in Zola’s clothes, a size too small, seams straining. You take the shortest route across the floor and out again, your face hot the whole way.</p>'
  };
  return state.worn ? l[state.worn] : '';
}

DRESS_KEYS.forEach(function (key){
  addAction('dress:' + key, function (){
    apply({ worn: key, screen: 'morning', notice: '', lastScene: '' });
  });
});
