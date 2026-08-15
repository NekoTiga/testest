'use strict';

function dressMirrorGarments(base){
  const w = state.worn;
  if (w === 'active'){
    return base
      .split('the jeans sit a touch snugger').join('the shorts sit a touch snugger')
      .split('The jeans are snugger across the seat').join('The shorts are snugger across the seat')
      .split('You pull your shirt over your head').join('You pull the sports bra over your head')
      .split('You run a hand over the front of your torso').join('You run a hand over the front of your torso, passing over the collarbones, ribs, and the flat of your belly')
      .split('You lift your shirt and look at your bare stomach').join('Your stomach is bare between the sports bra and the shorts, and you look at it')
      .split('You lift your shirt and examine your abdomen').join('You lift the sports bra and examine your abdomen')
      .split('You pull your shirt down over your belly and it rides up at the hem. You pull it down again. It rides up.').join('You tug the sports bra down over the softness above it, and it rides up. You pull it down again. It rides up.')
      .split('You lift your shirt and the whole of your stomach pours forward').join('Your stomach, bare between the sports bra and the shorts, pours forward')
      .split('You lift your shirt and the mound of your belly pours forward').join('Your belly, bare below the sports bra, pours forward');
  }
  if (w === 'robe'){
    return base
      .split('the jeans sit a touch snugger').join('the robe sits a touch snugger')
      .split('The jeans are snugger across the seat').join('The robe is snugger across the seat')
      .split('the waistband of your shorts').join('the belt of your robe')
      .split('the band of your shorts').join('the belt of your robe')
      .split('the hem of your shorts').join('the hem of the robe')
      .split('the shorts ride up').join('the robe ride up')
      .split('your shorts can’t quite cover').join('the robe can’t quite cover')
      .split('You pull your shirt over your head').join('You let the robe fall open')
      .split('You run a hand over the front of your torso').join('The robe hangs open as you run a hand over the front of your torso')
      .split('You lift your shirt and look at your bare stomach').join('You let the robe fall open and look at your bare stomach')
      .split('You lift your shirt and examine your abdomen').join('You let the robe fall open and examine your abdomen')
      .split('You pull your shirt down over your belly and it rides up at the hem. You pull it down again. It rides up.').join('You tug the robe closed over your belly and it falls open again. You pull it closed again. It falls open.')
      .split('You lift your shirt and the whole of your stomach pours forward').join('You let the robe fall open and the whole of your stomach pours forward')
      .split('You lift your shirt and the mound of your belly pours forward').join('You let the robe fall open and the mound of your belly pours forward');
  }
  const n = { rigid: 'jeans', soft: 'leggings', baggy: 'joggers' }[w];
  if (!n) return base;
  let out = base;
  if (n === 'jeans'){
    out = out
      .split('the waistband of your shorts').join('the waistband of your jeans')
      .split('the band of your shorts').join('the band of your jeans')
      .split('the hem of your shorts').join('the hem of your jeans')
      .split('the shorts ride up').join('the jeans ride up')
      .split('your shorts can’t quite cover').join('your jeans can’t quite cover');
  } else {
    out = out
      .split('the jeans sit a touch snugger').join('the ' + n + ' sit a touch snugger')
      .split('The jeans are snugger across the seat').join('The ' + n + ' are snugger across the seat')
      .split('the waistband of your shorts').join('the waistband of your ' + n)
      .split('the band of your shorts').join('the band of your ' + n)
      .split('the hem of your shorts').join('the hem of your ' + n)
      .split('the shorts ride up').join('the ' + n + ' ride up')
      .split('your shorts can’t quite cover').join('your ' + n + ' can’t quite cover');
  }
  const t = { soft: 'tee', baggy: 'hoodie' }[w];
  if (t){
    out = out
      .split('your shirt').join('your ' + t)
      .split('the shirt').join('the ' + t);
  }
  return out;
}

const MIRROR_NAKED = '<p>The mirror shows a body that is no longer capable of standing unaided. You are supported on a wide platform surrounded by cushions, your enormous body spreading outward across the surface. Your hips extend far beyond your waist, resting heavily against the sides of the platform. Your ass forms a vast, rounded mass behind you, settling deeply into the cushions. Your belly is huge and rounded, rising and falling slowly with each breath, its lower edge forming deep folds against your thighs. Your breasts are extremely large and heavy, resting against the upper slopes of your abdomen.</p>' +
  '<p>Your arms have become thick and heavily padded, with deep dimples across the skin. Even your hands are broad and soft, with thick fingers and rounded knuckles. Your legs are almost completely surrounded by the weight of your thighs and hips, making their shape difficult to distinguish beneath the folds of fat.</p>' +
  '<p>You do not walk to the mirror anymore. You are positioned in front of it while cushions are adjusted around your body. Once you are settled, you look at your reflection for a long moment.</p>' +
  '<p>The view is dominated by your lower body. Your hips spread widely across the platform, while your ass sinks into the cushions behind you. Your belly rests heavily over your thighs, with several deep folds underneath it. You place one hand against your hip and press into the thick layer of fat. Your fingers disappear partly into the softness, finding the warm, tender skin where one fold rests against another.</p>' +
  '<p>You try to move yourself slightly higher on the platform. Your hands press down beside you, your arms tense, and your belly shifts forward as you attempt to reposition your weight. You manage only a small movement before stopping to catch your breath. The cushions are adjusted around you again, supporting the weight that you cannot easily reposition yourself.</p>' +
  '<p>You look down at your body. There are folds everywhere: beneath the belly, around the hips, between the thighs, along the sides of your back, and beneath your arms. Cellulite covers much of the visible skin, creating deep dimples across the hips, ass, and thighs. Stretch marks cross the abdomen and hips in pale, irregular lines.</p>' +
  '<p>Your reflection fills the mirror from side to side. Your belly rises and falls with your breathing while the rest of your body remains settled into the cushions. Your hips and ass carry much of your weight, spreading broadly across the platform. Your thighs merge into the lower folds of your abdomen, and your upper body rests heavily above them.</p>' +
  '<p>You raise one hand toward the mirror. Even that small movement takes effort. Your arm trembles slightly before you lower it again and let it rest against your side.</p>';

function mirrorText(){
  const texts = [
    '<p>You catch your reflection in the mirror. You are of average height and build, with a narrow waist and moderate hips. Your breasts are small and positioned high on the chest. Your abdomen is flat, with the lower ribs and the contours of the abdominal wall visible beneath the skin. Your navel forms a shallow depression at the center of the abdomen.</p>' +
    '<p>Your arms are slender, with relatively narrow wrists. Your thighs are moderately separated when you stand with your feet together.</p>' +
    '<p>You turn sideways and examine your profile. The abdomen curves slightly inward toward the waist before widening toward the hips. The skin and underlying soft tissue over the thighs compress slightly when you pinch them.</p>' +
    '<p>You pull your shirt over your head. Your torso is exposed from the collarbones to the hips. The nipples contract slightly in response to the cool air. Moisture and condensation remain on the skin from the shower.</p>' +
    '<p>You run a hand over the front of your torso, passing over the collarbones, ribs, abdomen, and pelvic region. You turn away from the mirror and then leave the bathroom.</p>' +
    '<p>You pause once more near the glass. Your face appears smooth, with the contours of the cheekbones and jaw visible beneath the skin. The collarbones form two shallow ridges at the base of the neck, and the shoulders extend laterally from the upper torso. You step away from the mirror and reach for the door.</p>',
    '<p>The shape of your body has changed slightly. Your hips are broader, with increased soft tissue along the sides. Your abdomen remains relatively flat, with a thin layer of soft tissue over the abdominal muscles. Your breasts have increased slightly in volume. Your thighs now make contact near the upper inner thighs when you stand with your feet together.</p>' +
    '<p>You turn sideways and examine your profile. The hips project slightly farther posteriorly, and the transition from the waist to the hips is less pronounced. You lift your shirt and examine your abdomen. The lower ribs remain faintly visible beneath the skin, while the abdominal wall has a slightly thicker layer of subcutaneous tissue. When you pinch the skin and underlying tissue at the hip, it compresses between your fingers and returns gradually to its original position.</p>' +
    '<p>You run your hands over the sides of your hips and across your abdomen. The breasts have increased slightly in volume and weight. The upper thighs are closer together, with the skin and soft tissue meeting near the groin. The navel appears slightly deeper within the surrounding abdominal tissue.</p>' +
    '<p>You look at your reflection again. The most noticeable changes are the increased width of the hips, the additional soft tissue along the abdomen and sides, the increased breast volume, and the greater contact between the upper thighs. Your body otherwise retains the same general proportions and skeletal structure.</p>',
    '<p>You look at yourself in the mirror for a while. Your hips are noticeably wider, with more softness along the sides and around the back. Your buttocks are fuller and heavier, projecting farther behind you than they did before. Your waist has thickened, and the inward curve between your ribs and hips is less defined. Your abdomen has become rounder, with a soft layer over the muscles that now curves outward below the navel. Your breasts are fuller and heavier, hanging lower from the chest. Your thighs have grown thicker, and the inner surfaces touch when you stand with your legs together.</p>' +
    '<p>You turn to the side and then look over your shoulder. The change is especially noticeable around your hips and buttocks. There is more fullness across the pelvis, with a broader curve from your waist into your hips and a deeper curve at the back. Your upper thighs are thicker as well, with more softness where they meet beneath the pelvis.</p>' +
    '<p>You place your hands against your hips. The added weight feels soft beneath your palms, yielding when you press into it. You move your hands across your abdomen, feeling the thicker layer of softness over the abdominal muscles. When you bend slightly, the skin and soft tissue of your lower abdomen gather into a shallow fold above the thighs.</p>' +
    '<p>You examine your face in the mirror. Your cheeks are fuller than before, and there is more softness beneath your chin, making the jawline less distinct. The lower part of your face has become rounder, matching the increase in fullness elsewhere.</p>' +
    '<p>The changes are now visible across most of your body: wider hips, fuller buttocks, a rounder abdomen, heavier breasts, thicker thighs, and a softer face. The additional weight is most noticeable around your hips, abdomen, and thighs.</p>',
    '<p>The person in the glass is unmistakably bigger now. Your hips have spread wider, carrying thick layers of soft fat over the sides and back. Your buttocks are large and heavy, rounded with enough weight that they wobble slightly when you shift from one leg to the other. Dimpled cellulite breaks up the surface of the skin. Your belly has grown into a broad, heavy curve, hanging softly over the lower abdomen. Thick rolls of fat gather at your sides and around your waist. Your breasts are large and full, their weight pulling them lower against your chest. Your upper arms have thickened as well, with soft flesh that shifts when you move.</p>' +
    '<p>You turn sideways and examine the change. Your belly projects prominently from your waist, rounded and heavy, while your buttocks extend far behind you. Between them, your waist has thickened until there is little of the old inward curve left. The fat around your hips hangs in soft folds, and the sides of your abdomen crease when you bend. Your upper thighs are thick and fleshy, their inner surfaces pressed together by their increased size.</p>' +
    '<p>You place both hands on your hips and press into the softness. The fat gives easily beneath your palms, shifting under your fingers before settling back into place. You move your hands across your belly, following the rounded surface and the folds along its lower edge. Cellulite dimples the skin of your thighs and buttocks, especially where the flesh has become thickest.</p>' +
    '<p>You turn and look over your shoulder. Your buttocks form a broad, heavy mass behind you, with soft folds where they meet the upper thighs. When you shift your weight, the flesh moves with a visible wobble. Your thighs press together from the hips downward, their soft surfaces rubbing against each other as you move.</p>' +
    '<p>Your face has changed too. Your cheeks are fuller and rounder, and fat has collected beneath your chin, softening the jawline. The fullness continues down into your neck, giving the lower half of your face a noticeably heavier appearance.</p>' +
    '<p>There is fat everywhere now: thick around your hips and waist, heavy across your belly and breasts, broad over your buttocks, and soft across your thighs and arms. Your body has become considerably larger, softer, and heavier than it was at the beginning of the semester.</p>',
    '<p>You are much bigger now, and the changes are impossible to miss. Your hips are extremely wide, covered in thick, soft layers of fat that extend around the sides and back. Your buttocks are enormous and heavy, forming a broad, rounded mass behind you, with dimples and cellulite visible across the skin. Your belly is large and rounded, hanging heavily over the lower abdomen. Your breasts are very large and heavy, extending downward until they rest against the upper part of your belly.</p>' +
    '<p>Several thick rolls of fat surround your waist and sides. The fullness around your hips has increased until the waist is barely distinguishable from the pelvis. Your thighs are broad and heavy, with the inner thighs pressing together from the hips toward the knees. Your arms have also become much thicker, with soft folds and dimples visible along the upper arms. Your back has widened, with additional rolls forming around the sides of your torso.</p>' +
    '<p>You turn sideways and examine your profile. Your belly projects far forward, while your buttocks extend heavily behind you. Your back is broad and rounded, and your arms hang with noticeably more weight around them. When you shift your stance, the flesh around your belly, hips, and thighs moves with you, wobbling slightly before settling.</p>' +
    '<p>You place both hands over your belly. There is considerable depth to the softness beneath your palms, and the fat gives deeply when you press into it. The lower part of your belly hangs heavily, forming a broad fold where it meets the lower abdomen and upper thighs. Stretch marks spread across your hips and the undersides of your arms, pale lines running through the stretched skin.</p>' +
    '<p>You turn and examine yourself from behind. Your hips and buttocks dominate your silhouette, extending broadly from side to side. The buttocks are heavy and rounded, with folds where they meet the upper thighs and cellulite visible across their surface. Your thighs are thick enough that their inner surfaces remain in contact when you stand normally.</p>' +
    '<p>The increase in size is now distributed throughout your body: enormous hips and buttocks, a large hanging belly, heavy breasts, thick thighs and arms, a broad back, and a noticeably fuller face. Your body is soft and heavily padded from head to toe.</p>',
    '<p>The mirror shows how much your body has changed. Your hips are enormous, with thick layers of soft fat extending outward and around the back. Your buttocks are extremely large and heavy, forming a broad mass that dominates your lower body. Your belly is enormous as well, rounded and hanging heavily over the lower abdomen and upper thighs. Your breasts are very large and soft, resting against the upper part of your belly. Thick rolls of fat surround your waist and back, while your arms have become thick from the shoulders down toward the wrists, with softness and dimpling visible across the skin.</p>' +
    '<p>You walk a few steps toward the mirror and back. Your belly, breasts, hips, and buttocks all shift with each movement, the weight of your body moving slowly as you walk. Your belly hangs heavily in front of you, with faint silver stretch marks crossing the skin. When you lift and support the lower part of it with both hands, the weight is immediately apparent. You release it and the soft mass settles back against your thighs.</p>' +
    '<p>You turn and look over your shoulder. There is very little definition left between your waist, hips, and back. Your lower body is especially broad, with the hips and buttocks extending far to either side. Your belly hangs low enough to overlap the upper thighs, creating a deep fold beneath it. The skin inside the fold is warm and damp from being pressed together. You place a hand against your hip, pressing into the thick layer of fat and feeling it give beneath your palm.</p>' +
    '<p>You examine your thighs next. They are extremely thick, with the inner surfaces pressed closely together. Cellulite covers much of the skin, forming dimples across the thighs, hips, and buttocks. Additional folds have developed wherever the increased weight causes the skin and flesh to meet.</p>' +
    '<p>Your face has changed considerably. Your cheeks are very round, your jawline is softened by additional fat, and your neck has thickened beneath your chin. The fullness gives your face a much broader, heavier appearance.</p>' +
    '<p>There is now very little of your body untouched by the weight gain. Your hips and buttocks are massive, your belly hangs heavily over your thighs, your breasts are large and heavy, and your arms, back, thighs, and face are all covered with considerably more soft fat than before.</p>',
    '<p>You hardly recognize your shape in the glass. Your belly is enormous, rounded and heavy, extending far forward and hanging down over your thighs. Deep folds form beneath it where the weight of your abdomen meets your upper thighs. Your hips are wider still, covered in thick layers of soft fat that extend far beyond your waist. Your buttocks are extremely large and heavy, forming a broad mass across your lower body. Your thighs are enormous and thick, with the inner surfaces pressed together from the hips downward.</p>' +
    '<p>You stand at the mirror, supporting yourself with one hand. Your body feels heavy, and each movement causes the soft weight around your belly, hips, breasts, and thighs to shift and settle. From the side, your silhouette has become almost entirely rounded: your belly projects strongly in front, your large breasts extend over it, and your buttocks form a heavy curve behind you. The waist is barely visible between the surrounding rolls of fat.</p>' +
    '<p>You run your hands over your belly, pressing into the thick softness. Your hands sink deeply into the fat, which shifts beneath your fingers. The lower part of your abdomen hangs heavily over your thighs. When you sit down, your belly settles into your lap and your thighs spread apart under their own size and weight.</p>' +
    '<p>You examine your hips and thighs. The hips are extremely broad, with multiple folds where the surrounding fat gathers. Cellulite covers much of the skin, especially across the hips, buttocks, and thighs. The folds beneath your belly and between your thighs are deep, with areas of skin pressed closely together.</p>' +
    '<p>You turn and look at yourself from behind. Your hips and buttocks dominate your lower body, spreading broadly from side to side. The buttocks are massive, soft, and heavily dimpled, while the upper thighs merge into their lower contours. Your back is broad and covered with several thick rolls of fat.</p>' +
    '<p>Your face has become very round. Your cheeks are full, your jawline is almost completely softened by the surrounding fat, and several folds have developed beneath your chin. Your neck is thick, adding to the overall heaviness of your face.</p>' +
    '<p>Your body is now covered in layers of soft fat from your face and arms down through your abdomen, hips, buttocks, and thighs. Every movement makes some part of that weight shift or wobble before settling again.</p>',
    '<p>The mirror can no longer show all of you at once. Your hips extend far beyond the sides of the bench, and your ass spreads heavily beneath you, so broad that you have to turn and crane your neck just to see part of its shape. Your belly fills the lower half of the reflection, a huge rounded mass hanging over your thighs. Deep folds gather underneath it, disappearing where your stomach meets your legs. Your breasts are enormous now, resting heavily against the upper curve of your belly.</p>' +
    '<p>You sit in front of the mirror because standing has become something you avoid unless you have to. Your belly settles into your lap as you lower yourself, followed by the weight of your hips and ass. The bench creaks beneath you. You shift once, then again, trying to distribute your weight more comfortably.</p>' +
    '<p>Your arms have become thick and heavy, the skin dimpled with cellulite. You reach down and gather the lower part of your belly in both hands. It takes both arms to lift a portion of it away from your thighs. The skin underneath is marked by deep creases, warm and damp where the folds remain pressed together. You let go, and the weight drops back into place, spreading across your lap and thighs.</p>' +
    '<p>You turn as far as you can and look over your shoulder. Your ass fills most of what you can see. It is broad, heavy, and deeply dimpled, with thick folds where it joins your thighs. Your hips spread outward from beneath your waist, carrying layer after layer of fat. Your thighs are so thick that they remain pressed together even when you adjust your position.</p>' +
    '<p>You try standing.</p>' +
    '<p>You plant both feet and push against the bench with your hands. Your body shifts forward, your belly dragging heavily against your thighs as you lean over it. You manage to lift yourself partway before having to stop. Your arms tense, your breathing becomes deeper, and you sit back down with a heavy drop.</p>' +
    '<p>For a moment you simply remain there, catching your breath.</p>' +
    '<p>You look at yourself from the side. Your belly projects far forward, your breasts hang above it, and your ass extends behind you in an equally heavy curve. The old distinction between waist, hips, and abdomen has almost disappeared beneath the layers of fat. When you shift your weight, your belly wobbles against your thighs, your breasts move across your stomach, and the heavy flesh of your hips and ass follows a moment later.</p>' +
    '<p>You reach down and press your palm into one of the deep folds at your hip. The fat gives beneath your hand. The crease is tender where the skin has been pressed together, and you withdraw your hand after a moment.</p>' +
    '<p>Your face has become round and heavily padded. Your cheeks are full, your chin blends into the thick folds beneath it, and your neck has widened considerably. Even here, sitting still in front of the mirror, the scale of the change is obvious.</p>' +
    '<p>You look down at yourself again. Your belly fills your lap. Your thighs spread widely beneath it. Your hips extend beyond the bench, and your ass hangs heavily behind you. When you finally reach for the arm of the chair and try once more to stand, you make it halfway before your legs begin to shake. You take a breath, lower yourself back down, and let the bench take your weight again.</p>',
    '<p>The mirror shows a body that no longer moves under its own power. You are supported on the wide platform, propped half-reclined against a mountain of cushions, your enormous body overflowing the edges of the surface on every side. Your belly is immense — a vast, rounded mound that rises and falls with each slow breath, its lower edge lying across your thighs in deep, permanent folds. Your breasts are enormous, resting high on the slopes of your abdomen, and your hips and ass spread so wide that the platform has been shaped around them. Your arms rest at your sides, thick and soft, and your hands barely lift even when the tray is set within reach.</p>' +
    '<p>Between your thick thighs, half-buried in the deep softness of the fold where they press together, a vibrator rests. The campus installed it — a smooth, warm shape that sits against you and never has to be held, its controls linked to the same app that feeds you. A drone adjusted it this morning, pressing it deeper into the soft weight, and the low hum has been running under everything since.</p>' +
    '<p>You do not move to eat. The tray is brought to you, and a drone holds it at the correct height while you eat. You eat continuously — small bites at a steady rhythm, your jaw working without pause, your mouth never empty for long. Between bites a low burp rolls up out of you, wet and heavy, and you swallow it back down without stopping, your throat working around the next mouthful. The drone waits, patient, and when the tray empties a second replaces it before you have finished the last of the first.</p>' +
    '<p>You watch a video on the screen propped at the foot of the platform. Your eyes are half-lidded, your head sunk back into the cushions. You eat through the whole length of it, and when it ends it loops and plays again, and you are still eating. A long, rolling burp escapes you — deeper than the last, rumbling up through your chest — and you shift your weight slightly, the only movement you make, and the cushions settle around you again. The hum between your thighs rises a notch, and you moan around the food in your mouth, a low, contented sound that you make the way you breathe.</p>' +
    '<p>Your hand moves from the tray to your belly and rests there, fingers spread across the soft mound, and you press once, slowly, feeling the depth of it beneath your palm. The vibrator pulses against you — the controls stepping up on their own, the way they do from time to time — and your hips shift, just barely, the vast mass of you settling deeper into the cushions, and the moan comes again, longer.</p>' +
    '<p>You eat from the tray without lifting your head, crumbs and drips falling onto the folds of your belly and chest. You do not brush them off. You wipe your mouth against the back of your hand and reach for the next piece, and a wet burp rolls out of you that you do not even pause for. Your lips are shiny with grease. The drone brings a napkin and holds it to your mouth, and you let it wipe you, and then you eat again. Between your thighs the vibrator throbs, steady and insistent, and your toes curl deep in the softness of your legs, and you keep eating.</p>' +
    '<p>Your belly rises and falls beneath the loose fabric of the robe. There is a deep crease where it folds against itself, and another where it presses into your thighs. You do not look at them anymore. Your eyes stay on the screen, your hand moves between the tray and your mouth, and every few swallows the low, satisfied moan comes again — half from the food, half from the hum between your legs, a sound you make without deciding to.</p>' +
    '<p>The drones keep the trays coming, removing the empties and setting full ones within reach, and you eat through them without interruption. You do not stop to speak. You do not sit up. You do not reach for anything beyond the food and the screen. When a particularly deep burp rolls through you, you shift your hips, the vast mass of you settling heavier into the cushions, and the vibrator presses deeper with the shift, and a long, trembling sound comes out of you — pleasure and fullness at once — and the video plays on.</p>' +
    '<p>You are fed, and you eat, and you burp, and you watch, and the day passes without a single decision from you. Your hand finds the tray again on its own. Your mouth opens for the drone without being asked. The robe has slipped open over the mountain of your belly, and you leave it. Your eyes are on the screen, and the tray is full again, and between your thighs the vibrator climbs and holds and climbs, and the moan comes once more, soft and full, and then you reach for the food.</p>' +
    '<p>Your reflection fills the mirror from edge to edge. The body in the glass is a vast, soft mass, propped and fed and utterly still except for the slow rhythm of your jaw and the rise and fall of your belly. You look at it for a moment through half-closed eyes, and then the tray is in front of you again, and you look back down, and the video loops, and you eat.</p>',
    '<p>The mirror shows a body that is no longer capable of standing unaided. You are supported on a wide platform surrounded by cushions, your enormous body spreading outward across the surface. Your hips extend far beyond your waist, resting heavily against the sides of the platform. Your ass forms a vast, rounded mass behind you, settling deeply into the cushions. Your belly is huge and rounded, rising and falling slowly with each breath, its lower edge forming deep folds against your thighs. Your breasts are extremely large and heavy, resting against the upper slopes of your abdomen.</p>' +
    '<p>Your arms have become thick and heavily padded, with deep dimples across the skin. Even your hands are broad and soft, with thick fingers and rounded knuckles. Your legs are almost completely surrounded by the weight of your thighs and hips, making their shape difficult to distinguish beneath the folds of fat.</p>' +
    '<p>You do not walk to the mirror anymore. You are positioned in front of it while cushions are adjusted around your body. Once you are settled, you look at your reflection for a long moment.</p>' +
    '<p>The view is dominated by your lower body. Your hips spread widely across the platform, while your ass sinks into the cushions behind you. Your belly rests heavily over your thighs, with several deep folds underneath it. You place one hand against your hip and press into the thick layer of fat. Your fingers disappear partly into the softness, finding the warm, tender skin where one fold rests against another.</p>' +
    '<p>You try to move yourself slightly higher on the platform. Your hands press down beside you, your arms tense, and your belly shifts forward as you attempt to reposition your weight. You manage only a small movement before stopping to catch your breath. The cushions are adjusted around you again, supporting the weight that you cannot easily reposition yourself.</p>' +
    '<p>You look down at your body. There are folds everywhere: beneath the belly, around the hips, between the thighs, along the sides of your back, and beneath your arms. Cellulite covers much of the visible skin, creating deep dimples across the hips, ass, and thighs. Stretch marks cross the abdomen and hips in pale, irregular lines.</p>' +
    '<p>Your reflection fills the mirror from side to side. Your belly rises and falls with your breathing while the rest of your body remains settled into the cushions. Your hips and ass carry much of your weight, spreading broadly across the platform. Your thighs merge into the lower folds of your abdomen, and your upper body rests heavily above them.</p>' +
    '<p>You raise one hand toward the mirror. Even that small movement takes effort. Your arm trembles slightly before you lower it again and let it rest against your side.</p>'
  ];
  let extra = '';
  if (state.lbs >= 300 && state.selfcontrol >= 40){
    extra = '<p>You look at the line under your jaw and think about the blue sample. For a second the world sharpens — you can almost see it.</p>';
  }
  if (lazy()){
    const d = [
      '<p class="quiet">You look fine. Healthy. The campus food hasn’t touched you yet.</p>',
      '<p class="quiet">It’s just a little softness at the hips. You’ve been busy.</p>',
      '<p class="quiet">Rounder is softer. You don’t bother pulling the shirt down all the way.</p>',
      '<p class="quiet">You look at the softness. The app says you’re right on schedule.</p>',
      '<p class="quiet">There’s more of you now. There’s more to hold onto. You stroke the round of your hip without thinking.</p>',
      '<p class="quiet">The shape in the glass is heavy, and yours. You run a hand down it and leave it there.</p>',
      '<p class="quiet">You catch yourself stroking the heavy curve of your hip with a flat hand. The scale knows your name.</p>',
      '<p class="quiet">The bed holds you. The tray comes. Nothing asks anything of you. You stay by the mirror a while longer.</p>',
      '<p class="quiet">You are enormous, and the drone hums, and the tray is already on the desk.</p>'
    ];
    extra += d[wTier(state.lbs)];
  }
  if (dressMirrorLine()){
    extra += '<p class="quiet">' + dressMirrorLine() + '</p>';
  }
  const t = wTier(state.lbs);
  const tierTxt = t >= 8 ? (state.lbs >= 900 ? texts[9] : MIRROR_NAKED) : dressMirrorGarments(texts[t]);
  let base = tierTxt;
  if (!bandWorn()){
    base = base
      .replace('the hum of the band on your wrist', 'the quiet of your bare wrist')
      .replace('The mirror holds you. The band hums.', 'The mirror holds you.');
  }
  if (bandWorn()){
    extra += '<p class="quiet">The band hums on your wrist, counting you as a success.</p>';
  } else if (state.bandHandout){
    extra += '<p class="quiet">Your wrist is bare. Somewhere a drone circles, waiting to be useful.</p>';
  }
  extra += zolaMedFeatureLine();
  return base + extra;
}

function mirrorErodeText(){
  const s = clinicStage(state.lbs);
  if (s <= 4){
    return '<p>You look at your reflection and rehearse the reasons, the way you used to rehearse presentations — chest out, voice steady. “I can stop anytime. I’m just enjoying the food. It’s a phase. The campus can’t make me do anything I don’t choose.” You hold your own eyes. “I’ve got this.” You say it twice. It sounds true.</p>';
  }
  if (s <= 6){
    return '<p>You look at your reflection and rehearse the reasons, and the lines come slower now. “I could stop if I wanted to. I’m just… comfortable. Nobody’s forcing me. I’m in control.” You pause. “Mostly.” The word hangs in the glass, and you don’t repeat it.</p>';
  }
  if (s <= 8){
    return '<p>You look at your reflection and open your mouth to rehearse the reasons, and only half of them come out. “I could stop. Probably. If I wanted to. It’s just…” You trail off, and the shape in the glass watches you trail off, and neither of you finishes the sentence.</p>';
  }
  return '<p>You look at your reflection and open your mouth to rehearse your reasons, and one line comes out, small and honest: “Why would I want to?” The glass doesn’t answer. It doesn’t have to. You already know the answer is written somewhere in you, in the same hand that wrote your usual order.</p>';
}

function showerText(){
  const w = state.lbs;
  if (w < 275) return '<p>The water runs hot and clean. Steam fills the room and, for a few minutes, you’re just someone in a shower — arms lifting, water finding your shoulders and your back, the day running off you in ribbons. You wash yourself the way you’ve always washed yourself, quickly and without thinking. The drain swallows the soap and the steam clears off the glass. You step out clean and easy.</p>';
  if (w < 500) return '<p>The shower stall has a seat now — a wide, tiled bench that wasn’t there at move-in, or maybe it was and you never needed it. You lower yourself onto it carefully, gripping the rail the campus installed without asking, and the seat takes your weight with a soft creak. Your belly rests in your lap, heavy, its underside folded against your thighs, and your hips spread wide over the edges of the bench. The spray from the fixed head only reaches the top half of you. You wash what you can reach — your face, your shoulders, the heavy curve of your breasts, the broad of your back — and then you sit with your arms hanging, breathing, because reaching the deep creases under your belly means lifting the weight of it, and lifting it takes both hands and a breath you don’t have to spare. You get one hand under it, then the other, and you lift, and the warm water runs down into the crease, and you scrub blind at skin you can’t see and feel only as dampness. It’s enough. You step out pink and clean where you could reach, and you don’t look at the places you couldn’t. The seat is already in the stall, and you sit in it.</p>';
  if (w < 600) return '<p>The shower is different now. There is a drone waiting in the stall, a flat silver disc hovering at shoulder height with a low hum, and it does not leave when you enter. It waits while you sit down — the bench is wider now, reinforced, and even so it creaks under the mass of your hips — and then it moves in, nozzles unfolding, a soft brush extending, and it begins to wash you the way you used to wash yourself, but thoroughly, the way you can’t anymore. It lifts your belly gently with a padded arm and washes the deep crease underneath, the tender damp skin that hasn’t seen daylight in weeks, and you hold your breath and let it. It washes between your thighs, careful and clinical, tilting you gently to reach every fold, and you sit there, enormous and soft and completely still, and you feel the heat of the water and the heat of your own blush and nothing else. A second drone arrives with a tray and holds a small piece of fruit to your mouth, and you eat it without thinking, because your hands are wet and your belly is being washed and it is easier to just open your mouth. The two of them work around you, humming, and when it is done they dry you with warm air, and you leave the stall cleaner than you have been in months, and the last thing you remember is the drone’s voice, soft and matter-of-fact: “There. That’s better.”</p>';
  if (w < 700) return '<p>You don’t undress for the shower anymore. You don’t have to. The drones do everything now, and they have learned your body the way staff learn a room. Three of them meet you at the stall — one takes the robe, one angles the water, one lowers the wide padded bench until it’s exactly right for your weight. You sit. Your hips spill over the edges of the bench, heavy and soft, and the bench settles under you without complaint. The water is warm before it touches you, angled to reach the vast of you without you having to move. A drone lifts your belly with a padded arm, holding the weight of it while another washes the deep creases underneath with long, careful strokes, and you sit with your hands in your lap, doing nothing, because there is nothing for you to do. One drone holds a cup to your lips and you drink without taking it. Another feeds you from the tray, small warm pieces at your mouth, and you eat without reaching, because your arms are thick and soft and the drone is faster. You are washed, and rinsed, and dried, and powdered, and dressed in the open robe, and fed, and none of it has required a single motion from you, and you sit there at the end, clean and full, hands in your lap. The drones hum and file out, and the mirror waits.</p>';
  if (w < 800) return '<p>The bathroom has been refitted for you, and you have stopped pretending to notice. The bench is a wide, padded platform now, big enough to hold you on your side, and there are three drones and a small machine that does nothing but hold your tray. You are brought in — you don’t walk; the platform rolls — and you are arranged like a thing being tended, the robe lifted away, the cushions set. The drones work in silence, with the calm efficiency of professionals who have done this a thousand times. One lifts your belly with a padded arm, holding its weight off your thighs so another can wash the deep creases underneath, warm water and soft cloth reaching skin that hasn’t been touched by human hands in months. Another washes your back, turning you gently on the platform, rolling the vast soft mass of you the way you’d turn a loaf in a pan — and the mass of you is heaviest at the bottom, hips and haunches that the platform has been shaped to hold. A third holds the tray and feeds you — small bites at your lips, a sip of something sweet — while the others work, and you eat without opening your eyes, because there is nothing in this room that requires them. You are washed, and fed, and dried, and powdered, and left arranged on the platform, enormous and soft and clean. You lie there, and the tray is refilled, and you reach for it without being asked, and the drone holds it steady for you while you eat.</p>';
  if (w < 900) return '<p>You don’t bother with the bathroom at all anymore. The platform comes to you, and you are rolled to the shower the way you are rolled everywhere, propped, arranged, lifted and turned by drones that have learned the exact geography of your softness. There are four of them now, and they work as one: one lifts your belly, one washes the deep creases beneath, one holds the tray to your mouth, and one — smaller, softer, with padded attachments meant for tender places — attends to you in ways that make your breath catch and your thighs tremble. It is clinical and gentle and absolutely thorough, the way everything about this campus is. It washes between your breasts, and between the heavy folds of your thighs, and in the deep creases of your hips, and it touches you where you used to touch yourself, and you lie there, enormous and soft and fed, and you can feel your pulse in the vast soft depth of you, and the drone notes it and moves on without comment. The tray never leaves your reach. One drone feeds you between the attentions of the others, and you eat and breathe and tremble, and by the time they are done you are clean, and full, and wrung out, and arranged on the platform with the robe draped over the mass of you, and you don’t move. The drone hums, and the sound settles into the softness of you.</p>';
  return '<p>You do not even bother anymore. When the platform comes, you are already awake, already hungry, and you do not move as the drones lift the sheet and roll you to the wide trough that serves as your shower now, a shallow basin built into the wall that fills with warm water and drains itself. You lie there, a vast soft mass, and the drones do the rest. One lifts your belly with a padded arm and holds it while another washes the deep creases underneath, slow and thorough. A third positions a soft funnel over your mouth — wide, gentle, padded — and begins to feed you, a stream of something thick and sweet that you swallow without thinking, without reaching, without any part of you having to want it. You drink and swallow and breathe and lie there, and the fourth drone attends to you between your legs, slow and practiced, until your thighs tremble and your breath comes in long shudders and the vast soft mass of you shivers once, from the center, and settles. The funnel is lifted. The water drains. You are dried with warm towels by padded arms and rolled back to the bed, enormous and soft and full and quiet, and the tray on the table has already been refilled for when you wake. The drone hums its low note, and you sleep, and the food is already waiting.</p>';
}

function refusedShowerText(){
  return '<p>The drone hovers at the edge of the stall, nozzles folded, and it retreats a few inches when you wave it off. The water is hot and clean. You wash yourself by hand, on your own time, and it is slower than it was at move-in, and harder, and yours. The drone does not leave. It hovers, watching, and when you step out, pink and clean and breathing hard, it is still there, waiting.</p>';
}

addScreen('mirror', function (){
  let html = '<h2>Dorm bathroom</h2>';
  const bathAfter = AFTER[state.lastScene];
  if (bathAfter && state.lastScene === 'bath:mirror'){
    html += '<div class="mirror-stage" style="background-image:url(\'GUI/PC_STAGES/NEW/' + pcStageImg() + '\')"></div>';
  }
  if (bathAfter) html += typeof bathAfter === 'function' ? bathAfter() : bathAfter;
  const erodeBtn = wTier(state.lbs) >= 1 ? btn('Argue with your reflection — rehearse your reasons', 'mirror:erode') : '';
  const shamelessBtn = (wTier(state.lbs) >= 6 && !state.shamelessDone && state.selfcontrol < 60)
    ? btn('Let the shirt ride up — it doesn’t matter anymore', 'mirror:shameless')
    : '';
  html += '<div class="actions">' +
    btn('Mirror — check yourself', 'bath:mirror') +
    btn('Take a shower', 'bath:shower') +
    btn('Step on the scale', 'bath:weigh') +
    erodeBtn +
    shamelessBtn +
    (pcLockedRoom() ? btn('Back to the room', 'nav', 'room') : btn('Leave', 'nav', 'hub')) +
    '</div>';
  return html;
});

addScreen('showerchoice', function (){
  return `
    <h2>The shower</h2>
    <p>A flat silver drone hovers in the stall at shoulder height, nozzles unfolding, a padded arm already reaching. It has been waiting for you. On the wall, a tray is already set out — a small piece of fruit, a cup of something warm.</p>
    <p>You can let it take over — be washed, be fed, be cared for. Or you can wave it off and wash yourself.</p>
    <div class="actions">
      ${btn('Let the drone handle it', 'shower:let')}
      ${btn('Refuse — wash yourself', 'shower:refuse')}
    </div>`;
});

addAction('bath:mirror', function (){
  if (!state.mirror){
    apply({ mirror: true, selfcontrol: state.selfcontrol + 10, lastScene: 'bath:mirror', notice: 'You looked. +10 self-control', screen: 'mirror' });
  } else {
    apply({ lastScene: 'bath:mirror', notice: 'You look again. The glass shows the same body.', screen: 'mirror' });
  }
});
addAction('bath:shower', function (){
  if (state.lbs >= 500 && state.lbs < 800 && !state.showerRefused && state.selfcontrol >= 50){
    apply({ screen: 'showerchoice', lastScene: '', notice: '' });
    return;
  }
  apply({ selfcontrol: state.selfcontrol + 5, selfestem: state.selfestem + 5, sweat: 0, lastScene: 'bath:shower', notice: '+5 self-control · +5 self-esteem · the shower washes the day off you', screen: 'mirror' });
});
addAction('bath:weigh', function (){
  if (state.lbs >= 300){
    apply({ lastScene: 'bath:weigh:hidden', notice: 'The readout is hidden behind the shelf of your belly. The clinic reads your weight aloud for you now.', screen: 'mirror' });
    return;
  }
  apply({ knownLbs: state.lbs, lastScene: 'bath:weigh', notice: 'The scale updates your chart.', screen: 'mirror' });
});
addAction('shower:let', function (){
  apply({ selfcontrol: state.selfcontrol - 3, selfestem: state.selfestem + 5, lastScene: 'bath:shower', notice: 'The drone washes and feeds you. −3 self-control · +5 self-esteem', screen: 'mirror' });
});
addAction('shower:refuse', function (){
  apply({ showerRefused: true, selfcontrol: state.selfcontrol + 8, selfestem: state.selfestem + 5, lastScene: 'shower-refused', notice: 'You wash yourself while the drone hovers. +8 self-control · +5 self-esteem', screen: 'mirror' });
});
addAction('mirror:appearance', function (){
  apply({
    resDlgMember: 'me',
    resDlgLoc: state.screen,
    resDlgTurn: 0,
    resDlgText: mirrorPrepText(),
    selfcontrol: state.selfcontrol + 4,
    selfestem: state.selfestem + 3,
    lastScene: 'mirror:appearance',
    notice: 'You fought the little shower, dressed, and met your own eyes in the glass. +4 self-control · +3 self-esteem',
    screen: 'res-talk'
  });
});
addAction('mirror:erode', function (){
  const s = clinicStage(state.lbs);
  const drop = s >= 9 ? 2 : s >= 7 ? 1 : 0;
  const gain = s <= 4 ? 1 : 0;
  const p = { lastScene: 'mirror:erode', screen: 'mirror' };
  if (drop > 0){
    p.selfcontrol = Math.max(0, state.selfcontrol - drop);
    p.notice = 'You rehearse your reasons. The lines come out smaller than they used to. −' + drop + ' self-control';
  } else if (gain > 0){
    p.selfcontrol = Math.min(100, state.selfcontrol + gain);
    p.notice = 'You rehearse your reasons. They still hold. +' + gain + ' self-control';
  } else {
    p.notice = 'You rehearse your reasons. They don’t quite land anymore.';
  }
  apply(p);
});
addAction('mirror:shameless', function (){
  apply({ shamelessDone: true, selfestem: Math.min(100, state.selfestem + 4), selfcontrol: Math.max(0, state.selfcontrol - 2), lastScene: 'mirror:shameless', notice: 'You stop pulling the shirt down. +4 self-esteem · −2 self-control', screen: 'mirror' });
});

const ROOM_SHOWER = [
  '<p>Your bathroom has a shower the size of a phone booth — the dorm bathroom down the hall is bigger, but this one is yours, and it’s where you prep for the day. The water runs hot and clean and the stall is small, but at this size it’s just a shower: your elbow grazes the wall when you lift your arms, the spray bounces off your shoulders, and you wash the way you always have, quick and easy, the day running off you in ribbons. You step out clean and ready, the little stall steaming behind you.</p>',
  '<p>Your shower is a tight, tiled box — the dorm bathroom has room to move, but this one was built for someone smaller than you are now. You turn carefully, shoulders brushing both walls, and the water finds your back in a narrow sheet. It’s snug, but it works: you wash quickly, the softness at your hips grazing the glass as you turn, and you’re out in minutes, toweling off in the room where there’s space to breathe.</p>',
  '<p>The little shower is cramped now. You have to mind the fold of your belly against the door handle, and turning around means your hips bump the walls in slow, soft collisions. The spray only reaches your front without fuss — reaching your back means pressing against the glass and craning, and you wash what you can reach first and the rest second. There are no drones in here; they’re all down the hall in the dorm bathroom. It’s just you and a stall that’s getting smaller every week, and you take your time, and you step out damp where you couldn’t quite reach, and it’s fine. It’s yours.</p>',
  '<p>The shower in your room is getting to be a squeeze. Your belly presses against the tiled wall in a soft, heavy fold, the water running off the crest of it before it reaches the floor, and turning around means the whole soft width of you meeting the glass. You brace one hand on the wall and wash the front of you in stages, lifting the overhang of your belly with both hands to get the crease underneath — it takes a breath and a shove of weight, and the warm water runs down into it, and you scrub blind at skin you can’t see. There’s no drone in here to help. You finish flushed and winded, and you stand a moment with your hands on the walls, letting the heat work, before you step out and get ready.</p>',
  '<p>This shower is too small for you now, and you both know it. You have to turn sideways to get in, and your belly rests against the far wall the whole time, the spray running off the soft shelf of it in a warm curtain. Reaching your back is nearly impossible — you get soap to your shoulders and call it done. There’s a little tiled bench now, because standing the whole time is more than the stall has room for and more than your legs want, and you sit on it, hips spilling over the edges, and wash what you can reach. The dorm bathroom has drones and a wide platform. In here, there’s just you, a cramped box of steam, and the slow, careful work of getting yourself clean at the size you are.</p>',
  '<p>You don’t fit the little shower anymore. The door won’t close all the way over the spread of your hips, and the stall is a tight, wet box around the whole soft mass of you. You sit on the bench — it creaks under you and settles — and wash the front of you in slow, reaching motions, your belly heavy in your lap, your thighs spilling wide over the edges. Behind you, a single drone hovers in the doorway, wedged between the frame, trying to reach in past your shoulder with a padded arm, and it can’t quite fit, and it retreats with a soft beep of apology. You wash what you can reach, and you leave the rest, and the water runs cold at the end because turning the taps means leaning past the shelf of your belly. You step out pink and clean where you could reach, and you don’t look at the places you couldn’t.</p>',
  '<p>You barely fit in your own shower now. The stall is a wet, tiled box and you fill it — your shoulders pinned against both walls, your belly resting on your thighs where you sit on the bench, the door pressed open a hand’s width by the soft width of you. The drone waits outside, out of reach, its nozzles folded, unable to get a padded arm past you in the tight space. You wash the front of you, and the crease under your belly, and you accept the rest. By the time you step out you’re winded from the bending and the reaching, and drying off is its own small negotiation, and dressing takes real effort. The dorm bathroom handles you easily these days. Your own shower just makes you work for it.</p>',
  '<p>You wedge yourself in, and it barely takes you. The shower is a box built for a smaller body, and yours no longer fits in it — you stand sideways, your belly resting against the wall, your hips pressed against the glass, the door open because it cannot close over you. The water only reaches the front of you. There is no drone that can fit in here; the one that tries hovers in the doorway and gives up. You wash the parts you can reach, and the rest stays, and by the time you step out your legs are shaking and the whole effort has taken twenty minutes. You towel off standing, leaning on the sink, and you look at the little stall — clean, closed, already steaming itself empty — and you know, without quite saying it, that this is close to the last time it will work at all.</p>',
  '<p>You can’t use this shower anymore. The stall is too small to hold you, and there is no way to turn you around inside it, and standing is not something you do. You stand at the door of the bathroom, enormous and soft, and the little shower stands closed and clean and unused, a relic of a body you used to have. Down the hall, the dorm bathroom knows what to do with you — the platform, the drones, the wide warm basin. You go there instead, and the little shower in your room stays shut, and neither of you mentions it.</p>'
];

function roomShowerText(){
  const t = wTier(state.lbs);
  return ROOM_SHOWER[Math.min(t, ROOM_SHOWER.length - 1)];
}

function mirrorPrepText(){
  const t = wTier(state.lbs);
  const dressed = [
    'You dry off and dress for the day — jeans and a clean shirt, nothing that fits quite like it did in August. In the mirror you meet your own eyes and hold them a second. Whatever the day brings, you’re still you in there.',
    'You dry off and dress. The waistband sits a little higher than it used to, the shirt a little looser at the shoulders and tighter at the hip. You check yourself in the glass and stand still a moment, taking the shape in. Then you go — the day won’t wait, and neither will you.',
    'Dressing is a small negotiation now — the jeans need a moment, the shirt covers less than it should. In the mirror you press a flat hand to the soft rise of your belly and hold your own eyes for a long second. You’re still you in there.',
    'You dress slowly, working around the weight — the waistband over the fold, the shirt tugged down where it rides up. Your reflection is unmistakably heavier, and you look at it longer than you mean to, and then you go. The day is waiting, and you refuse to be late to your own life.',
    'Dressing is a production now. You work around the soft weight of yourself — the waistband rolled under the shelf of your belly, the shirt riding up at the hem, the slow dance of getting the jeans past the spread of your hips. In the mirror, the shape of you is heavy and real, and you meet your own eyes in it, and you go anyway. The day is waiting. You refuse to be late to your own life.',
    'Getting dressed takes real work. The clothes fit where they still fit, and the rest of you spills out of them, and you dress in stages, breathing between buttons. You look at yourself in the glass — soft and heavy and unmistakably you — and you hold your own eyes for a long moment. Then you go, and you take the shape of you with you, and the day meets you where you are.',
    'Dressing is the hardest part of the morning. You sit on the edge of the bed to get the pants up, working them past the spread of your hips and thighs, and the shirt covers less than half of what it used to. There is no mirror that shows all of you, and you’ve stopped trying to find one. You get as ready as you get, and you go, and the day is big enough for all of you.',
    'You dress sitting down, and it takes a while. The pants are a project, the shirt a formality, the whole thing conducted in stages with breathers between. You don’t spend long in the mirror anymore — the glass only shows part of you, and you know the rest by heart. You get ready the way you get ready, and you go when you can, and the day waits for exactly as long as you need.',
    'You don’t dress for the day. The robe is enough, and the platform is where the dorm bathroom leaves you, arranged and clean. The day comes to you now. You meet it from the bed, and the mirror across the room holds your reflection, enormous and soft and still, and you are ready for whatever the day brings — because it comes to you.'
  ];
  return roomShowerText() + '<p>' + (dressed[Math.min(t, dressed.length - 1)] || dressed[0]) + '</p>';
}

AFTER['bath:mirror'] = function (){ return mirrorText(); };
AFTER['bath:shower'] = function (){
  if (state.showerRefused) return refusedShowerText();
  return showerText();
};
AFTER['shower-refused'] = function (){
  return refusedShowerText();
};
AFTER['bath:weigh'] = function (){
  const k = state.knownLbs;
  if (k == null) return '<p>The scale stays quiet. You haven’t weighed in yet.</p>';
  const d = [
    'You read the number off the display. It settles into the room and doesn’t change.',
    'You read the number. A little higher than you’d have guessed. The scale stays quiet.',
    'You read the number and feel your stomach press against the scale’s glass. The readout holds.',
    'You read the number and have to look twice. The scale doesn’t argue.',
    'The number is bigger than {jeans} say, bigger than the mirror showed. The scale doesn’t argue.',
    'You read the number and the scale creaks under you. The readout holds.',
    'The number scrolls up in large digits. You don’t say it out loud.',
    'The readout scrolls past where the dial used to stop. You step off, and the bed is waiting.',
    'The scale is brought to the bed for you now. The number goes onto the chart.'][wTier(k)];
  const bp = {
    rigid: 'your jeans',
    active: 'your shorts',
    soft: 'your leggings',
    baggy: 'your joggers',
    robe: 'the robe',
    zola: 'Zola’s clothes',
    'zola-tight': 'Zola’s torn clothes'
  }[state.worn];
  const dd = bp ? d.split('{jeans}').join(bp) : d;
  return '<p>The scale settles. <b>' + k + ' lbs.</b> ' + dd + '</p>';
};
AFTER['bath:weigh:hidden'] = function (){
  if (state.knownLbs == null) return '<p>You cannot get a look at the readout. The clinic greets you warmly when you come in for your check-in and tells you your weight before you have to ask.</p>';
  return '<p>The readout stays hidden behind the shelf of your belly. You step back, and the clinic’s chart already knows. They tell you the number when you come in for a check-in. <b>' + state.knownLbs + ' lbs.</b>, last weighed.</p>';
};
AFTER['mirror:erode'] = function (){
  return mirrorErodeText();
};
AFTER['mirror:shameless'] = '<p>You look at the soft, heavy spread of yourself and, for the first time in a long while, you don’t pull anything down. You don’t tug anything closed. You stand there in the glass, all of you, the shirt riding up over the mound of your belly, and the feeling that rises in your chest is not shame. It’s relief — a deep, quiet settling, like a joint finally finding the shape it was made for. The band hums its low success note, and you let it. It’s easier than fighting. It feels, almost, like being held.</p>';
