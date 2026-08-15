'use strict';

function dinePcGarment(n){
  const w = state.worn;
  const g = {
    rigid: [
      'Your jeans are a little snugger at the table, the button pressing into the pad of your belly, so you loosen them',
      'Your shirt rides up over the soft curve of your belly, the hem catching in the crease, and you pull it down once, twice, and then stop.',
      'Your stomach presses against the waistband of your jeans, a red line forming above your hips, and you unbutton the top button without anyone noticing, or without you caring if they do.'
    ],
    active: [
      'Your running shorts are a little snugger at the table, the drawstring biting into the soft roll over your hips, so you tug it loose',
      'Your sports bra cuts into the soft curve of your belly, a red crease left in the skin, and you tug at it once, twice, and then stop.',
      'Your stomach presses against the waistband of your running shorts, spilling over the top of it, and you pull the drawstring loose without anyone noticing, or without you caring if they do.'
    ],
    soft: [
      'Your leggings are a little snugger at the table, the seam pressing into your soft middle, so you pull at the waistband',
      'Your tee rides up over the soft curve of your belly, baring the fold of skin beneath, and you pull it down once, twice, and then stop.',
      'Your stomach presses against the waistband of your leggings, rolling over it, and you roll it down without anyone noticing, or without you caring if they do.'
    ],
    baggy: [
      'Your joggers are a little snugger at the table, the drawstring pulled tight across the swell of your belly, so you ease it',
      'The hem of your hoodie rides up over the soft curve of your belly, the fabric sticking in the damp fold, and you tug it down once, twice, and then stop.',
      'Your stomach presses against the waistband of your joggers, hanging heavy over it, and you ease the drawstring without anyone noticing, or without you caring if they do.'
    ],
    robe: [
      'The robe pulls a little snugger across you at the table, the belt strained over the curve of your belly, and you don’t bother closing it',
      'The robe falls open over the soft curve of your belly, the panels parting over the creases of it, and you don’t pull it closed anymore.',
      'Your stomach presses against the belt of your robe, the knot digging in, and you let it hang open without anyone noticing, or without you caring if they do.'
    ]
  };
  return (g[w] || g.rigid)[n - 1];
}

const DINE_PC = [
  '<p>You take your tray to the table by the window and eat quickly, clearing the plate and sipping water while you check your phone. You swing your legs over the bench, your hips settling easily against the seat, get up to refill your drink, come back and finish your dessert. Your belly lies flat against the line of your waistband, your thighs sliding together without pressing. You look around the hall and everyone looks ordinary, and so do you. Somewhere across the room a vending machine hums, waiting for restocking.</p>',
  function (){
    return '<p>You eat a little more than you used to. You clear the tray and reach for the extra bread basket, and then for the dessert cup. There’s a new softness to your middle, a give in the skin that wasn’t there before, the waistband pressing a little deeper. ' + dinePcGarment(1) + ', and Piper slides the pastry basket toward you and you take one without deciding to. Your belly rounds against the top of your jeans, the button leaving a red mark in the skin.</p>';
  },
  function (){
    return '<p>You sit down and the bench takes your weight a beat slower than it used to, the seat groaning once under you. You order the full tray, and then seconds, and you eat with a steady, practiced rhythm that takes no thought at all. ' + dinePcGarment(2) + ' Across the table, Piper and Mina are eating too, rounder than they were, and the three of you eat steadily, to the bottom of your trays, without once looking up.</p>';
  },
  function (){
    return '<p>You waddle a little as you carry your tray back from the line — your thighs rub at the top, damp from the walk, your belly presses against the edge of the table as you settle in, its weight pushing your hips back into the seat. You eat fast, hungrily, and your hand moves toward the bread before you’re done, and then toward Piper’s plate before you catch it and pull back. ' + dinePcGarment(3) + ' When you burp, quietly, into your fist, the wet sound swallowed by the room, nobody at the table looks up.</p>';
  },
  '<p>You take the chair that doesn’t have arms, and even so it creaks when you settle into it, the frame straining under your weight. Your belly rests against the table edge, its soft weight pressing a crease across your middle, and you have to reach around it to eat. You eat slowly, steadily, hungrily — the tray emptying one square at a time, then a second tray, then dessert — and your hands are greasy and your jaw works and you don’t look up. When you finally sit back, breathless, full, your whole soft body pressing against the table, the underside of your belly damp against your lap, you catch Mina watching you. You don’t say anything. Neither does she.</p>',
  '<p>You get your food brought to you now, mostly — the line is a long walk, the trays are heavy, and there are drones that do it. You sit, huge and soft, your belly resting heavy on your thighs, its lowest fold wedged into the crease of your hip, and you eat steadily, one hand moving to your mouth while the other scrolls your phone. The tray empties. A drone brings another. You eat that too, your cheeks working, crumbs on your chest, and when a low, wet burp rolls up from your belly you let it out without breaking rhythm, the seat settling deeper under your weight.</p>',
  '<p>You don’t go to the line anymore. The tray comes to you, and then another, and the drones have learned to bring them without being asked. You sit, vast and soft, your belly resting on the table edge and spilling into your lap, its underfold sweaty against the fabric, and you eat with both hands, quickly, sloppily, grease shining on your fingers and your chin. The bench creaks under the spread of your hips, the seat edges pressing into your thighs. Across the table, Piper and Mina are eating their own trays, talking in low, easy voices, and the three of you sit in the hush of steady eating, and when you can’t reach the last of your plate you just let the drone feed it to you, your jaw working around each spoonful.</p>',
  '<p>You are brought to the commons on a scooter now, and you don’t get off it. A tray is fitted to the handlebars and you eat from it without lifting your hands much, your head bowed to the food, your enormous soft body spilling over the seat, thighs overflowing the edges, the heavy curve of your belly pressing against the tray. Drones circle, refilling your cup, wiping your chin, pressing a napkin into your slack grip. You eat and eat, and your phone glows in your other hand, and you burp, long and low, the scooter settling deeper under your weight. Nobody looks. The hall hums with eating, and your mouth stays open for the next spoonful.</p>',
  '<p>You don’t eat at the table anymore; the table eats you. You are rolled up to it on the wide platform, your belly huge before you, its full weight resting across your thighs and pressing into the table edge, and a drone lifts the spoon to your mouth and you open and swallow and open and swallow. The commons swims around you — scooters, drones, the low burp of the hall. You are fed, and then fed again, and your hands stay in your lap, soft and plump and unused, and your phone is propped where you can see it. When a long burp rolls out of you, wet and deep, the drone hums its approval and presses the next spoonful forward. You open your mouth and the spoon slides in, your throat working around the swallow.</p>'
];


