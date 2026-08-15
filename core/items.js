'use strict';

const ITEMS = {
  'flour': {
    name: 'Flour',
    desc: 'A small bag of campus flour.',
    space: 1,
    price: 4
  },
  'butter': {
    name: 'Butter',
    desc: 'A stick of butter, cold and pale.',
    space: 1,
    price: 4
  },
  'sugar': {
    name: 'Sugar',
    desc: 'A paper bag of sugar.',
    space: 1,
    price: 3
  },
  'herb': {
    name: 'Calming herbs',
    desc: 'A pouch of dried herbs. The label says "relax."',
    space: 1,
    price: 4
  },
  'snack-bag': {
    name: 'Snack bag',
    desc: 'A bag of chips, half-crushed from the shelf.',
    space: 1,
    price: 10,
    eat: { glut: 2, crave: 1, sweat: 0 },
    eatTxt: 'You open the bag one-handed and finish it walking, salt on your tongue, crumbs in the fold of your shirt. It’s not much. It’s never quite enough.'
  },
  'pastry-box': {
    name: 'Pastry box',
    desc: 'Four pastries in a flimsy box, still warm.',
    space: 1,
    price: 20,
    eat: { glut: 4, crave: 1, sweat: 0 },
    eatTxt: 'You eat them one after another standing at the counter, sugar on your fingers, the box empty before the coffee’s gone. Your belly rounds against the waistband, warm and full.'
  },
  'blue-bottle': {
    name: 'Blue wellness drink',
    desc: 'A little blue bottle. The label says nothing useful.',
    space: 1,
    price: 8,
    eat: { glut: 2, crave: 2, sweat: 1 },
    eatTxt: 'It’s sweet and thick and coats your throat, and it goes down too easy, and something in the hollow of you leans forward and wants another. The band hums once, counting it.'
  },
  'ff-special': {
    name: 'FreshFix special',
    desc: 'A whole warm meal in a box, with a blue drink on the side.',
    space: 2,
    price: 35,
    eat: { glut: 8, crave: 2, sweat: 1 },
    eatTxt: 'It’s a lot. You eat it anyway — the warm box, the blue drink, every bite — and your belly fills out hard and round against the waistband, the seam pressing a red line into your soft middle. You finish and sit a moment, breath heavy, and the empty box waits to be cleared like it knows the tray is already on its way.'
  },
  'skin-cream': {
    name: 'Skin cream',
    desc: 'A tube of shea butter cream — for the stretch marks, the creases, the places the weight presses.',
    space: 1,
    use: { skin: 15 },
    useTxt: 'You work the cream into the pale lines at your hips and the deep creases where the softness folds, patient, slow, the skin drinking it in until it’s cool and soft again. It won’t undo any of it. It makes the having of it a little more bearable.'
  },
  'gym-key': {
    name: 'A heavy key',
    desc: 'A rusted key on a ring. It has a sticker on it — a small, worn smiley, half peeled off.',
    space: 1,
    special: true
  }
};

const CRAFT = {
  'pastry-box': { name: 'Pastry box', from: { flour: 1, butter: 1, sugar: 1 }, txt: 'Flour, butter, sugar — you mix it into a rough dough, and the market’s oven is warm and waiting. It comes out as four pastries in a flimsy box, still steaming.' },
  'blue-bottle': { name: 'Blue wellness drink', from: { sugar: 1, herb: 1 }, txt: 'Sugar and herbs, steeped and bottled. It comes out blue — the same blue as the free samples, thick and sweet. The band hums like it approves.' },
  'skin-cream': { name: 'Skin cream', from: { butter: 1, herb: 1 }, txt: 'Butter worked soft and mixed with the calming herbs until it creams. It smells faintly of the campus’s blue drinks. You tube it and cap it.' },
  'ff-special': { name: 'FreshFix special', from: { 'pastry-box': 1, 'blue-bottle': 1 }, txt: 'A pastry box and a blue drink, boxed together — a whole warm meal, the way the app would have ordered it for you. The drones would be proud.' }
};

function craftPossible(id){
  const r = CRAFT[id];
  if (!r) return false;
  for (const k in r.from){
    if (itemCount(k) < r.from[k]) return false;
  }
  return true;
}

function craftItem(id){
  const r = CRAFT[id];
  if (!r || !craftPossible(id)) return false;
  for (const k in r.from){
    removeItem(k, r.from[k]);
  }
  addItem(id, 1);
  return true;
}

function itemSellPrice(id){
  const it = ITEMS[id];
  if (!it || it.special) return 0;
  return Math.floor((it.price || 0) / 2);
}

function invCap(){
  if (pcNaked()) return 0;
  const c = { rigid: 3, active: 3, soft: 4, baggy: 5, robe: 3, zola: 5, 'zola-tight': 4 };
  return c[state.worn] || 3;
}

function invUsed(){
  const items = state.items || {};
  let n = 0;
  for (const k in items){
    const it = ITEMS[k];
    if (it && (items[k] || 0) > 0) n += (it.space || 1) * items[k];
  }
  return n;
}

function invSpace(){
  return Math.max(0, invCap() - invUsed());
}

function itemCount(id){
  return (state.items && state.items[id]) || 0;
}

function hasItem(id){
  return itemCount(id) > 0;
}

function addItem(id, n){
  n = n || 1;
  const it = ITEMS[id];
  if (!it) return false;
  if (invUsed() + (it.space || 1) * n > invCap()) return false;
  state.items[id] = (state.items[id] || 0) + n;
  return true;
}

function removeItem(id, n){
  n = n || 1;
  const cur = state.items[id] || 0;
  if (cur <= 0) return false;
  state.items[id] = Math.max(0, cur - n);
  if (state.items[id] === 0) delete state.items[id];
  return true;
}

function invFullNotice(){
  return 'You can’t carry that — ' + (state.worn ? 'your ' + (dressLabel(state.worn).toLowerCase()) : 'naked') + ' won’t hold it.';
}

addAction('items:use', function (id){
  const it = ITEMS[id];
  if (!it || !hasItem(id)){
    apply({ screen: state.screen, notice: 'You don’t have that.' });
    return;
  }
  if (it.special){
    apply({ screen: state.screen, notice: 'It’s heavy and rusted, and the smiley peels off when you touch it. It looks like it fits something. You don’t know what.' });
    return;
  }
  let patch = { screen: state.screen };
  let txt = it.eatTxt;
  const eff = it.eat || it.use || {};
  if (eff.glut) patch.glut = Math.min(state.capacity, state.glut + eff.glut);
  if (eff.crave) patch.crave = Math.min(100, state.crave + eff.crave);
  if (eff.sweat) patch.sweat = Math.min(100, state.sweat + eff.sweat);
  if (eff.skin) patch.skin = Math.min(100, state.skin + eff.skin);
  const bits = [];
  if (eff.glut) bits.push('+' + eff.glut + ' stomach');
  if (eff.crave) bits.push('+' + eff.crave + ' craving');
  if (eff.sweat) bits.push('+' + eff.sweat + ' sweat');
  if (eff.skin) bits.push('+' + eff.skin + ' skin');
  if (it.eat) txt += ' <em>' + bits.join(', ') + '.</em>';
  patch.notice = txt;
  if (!it.eat && it.use) patch.notice = txt + ' <em>+' + eff.skin + ' skin.</em>';
  removeItem(id, 1);
  apply(patch);
});

addAction('items:craft', function (id){
  const r = CRAFT[id];
  if (!r || !craftPossible(id)){
    apply({ screen: state.screen, notice: 'You can’t make that yet — not with what you’re carrying.' });
    return;
  }
  if (invUsed() - craftIngredientSpace(id) + (ITEMS[id] ? ITEMS[id].space : 1) > invCap()){
    apply({ screen: state.screen, notice: 'You can’t carry the result — your pockets are too full.' });
    return;
  }
  craftItem(id);
  apply({ screen: state.screen, notice: r.txt + ' Crafted: ' + r.name + '.' });
});

addAction('items:sell', function (id){
  const p = itemSellPrice(id);
  if (!p || !hasItem(id)){
    apply({ screen: state.screen, notice: 'You can’t sell that.' });
    return;
  }
  const name = ITEMS[id] ? ITEMS[id].name : id;
  removeItem(id, 1);
  apply({ credits: state.credits + p, screen: state.screen, notice: 'You sell the ' + name + ' for ' + p + ' cr. +' + p + ' credits' });
});

function craftIngredientSpace(id){
  const r = CRAFT[id];
  if (!r) return 0;
  let n = 0;
  for (const k in r.from) n += (ITEMS[k] ? ITEMS[k].space : 1) * r.from[k];
  return n;
}
