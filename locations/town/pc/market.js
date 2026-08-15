'use strict';

function marketScene(){
  state.marketVisits = (state.marketVisits || 0) + 1;
  const night = isNight();
  const pt = wTier(state.lbs);
  let html = '<h2>The market</h2>';
  if (night){
    html += '<p>The market is shuttered — steel grilles down over the doors, the cold-case lights off. A single drone sits on the sill, charging, watching the street. Whatever it sells, it’ll open again in the morning.</p>';
  } else {
    if (pt >= 5){
      html += '<p>The market is small and warm, aisle by aisle: snack shelves, a cold case, a counter of pastries under glass. A few students move slowly between the shelves, a little heavier every week, their trays and bags already full. Nobody’s in a hurry to leave.</p>';
    } else if (pt >= 3){
      html += '<p>The market is small and warm, aisle by aisle: snack shelves, a cold case, a counter of pastries under glass. Students come and go with bags of chips and trays of pastries, and a couple of them look rounder than they did in August.</p>';
    } else {
      html += '<p>The market is small and warm — a few aisles of snacks, a cold case, a counter of pastries under glass. It smells like fresh bread and sugar. A normal campus market, and you’re just browsing.</p>';
    }
  }
  html += '<p class="small">You can carry ' + invSpace() + ' more item' + (invSpace() === 1 ? '' : 's') + '.</p>';
  html += resMeetingPanel();
  html += '<div class="actions">' +
    (night
      ? ''
      : btn('Buy flour — 4 cr', 'market:buy', 'flour') +
        btn('Buy butter — 4 cr', 'market:buy', 'butter') +
        btn('Buy sugar — 3 cr', 'market:buy', 'sugar') +
        btn('Buy calming herbs — 4 cr', 'market:buy', 'herb') +
        btn('Buy a pastry box — 20 cr', 'market:buy', 'pastry-box') +
        btn('Buy a snack bag — 10 cr', 'market:buy', 'snack-bag') +
        btn('Buy a blue drink — 8 cr', 'market:buy', 'blue-bottle') +
        btn('Buy the FreshFix special — 35 cr', 'market:buy', 'ff-special') +
        btn('Sell from your bag', 'nav', 'market-sell') +
        btn('Craft at the prep counter', 'nav', 'market-craft')) +
    btn('Leave', 'nav', 'hub') +
    '</div>';
  return html;
}

addScreen('market', marketScene);

const MARKET_BUY_TXT = {
  flour: '−4 cr. A small bag of campus flour.',
  butter: '−4 cr. A cold stick of butter.',
  sugar: '−3 cr. A paper bag of sugar.',
  herb: '−4 cr. A pouch of dried herbs — the label says "relax."',
  'pastry-box': '−20 cr. A box of four pastries, warm in your hands. It’s in your bag now.',
  'snack-bag': '−10 cr. A bag of chips, half-crushed. It’s in your pocket now.',
  'blue-bottle': '−8 cr. A little blue bottle. It’s in your pocket now.',
  'ff-special': '−35 cr. The FreshFix special — a whole warm meal in a box, plus a blue drink on the side. It’s in your bag now.'
};

addAction('market:buy', function (id){
  const it = ITEMS[id];
  if (!it){
    apply({ screen: 'market', notice: 'That isn’t for sale.' });
    return;
  }
  if (isNight()){
    apply({ notice: 'The market is closed.', screen: 'market' });
    return;
  }
  if (!canAfford(it.price)){
    apply({ notice: 'Not enough credits.', screen: 'market' });
    return;
  }
  if (!addItem(id, 1)){
    apply({ notice: invFullNotice(), screen: 'market' });
    return;
  }
  apply({ credits: state.credits - it.price, screen: 'market', notice: MARKET_BUY_TXT[id] || ('−' + it.price + ' cr. Bought: ' + it.name + '.') });
});

function marketSellScene(){
  const night = isNight();
  const items = state.items || {};
  const list = Object.keys(items).filter(function (k){ return (items[k] || 0) > 0 && itemSellPrice(k) > 0; });
  let html = '<h2>The market — selling</h2>';
  if (night){
    html += '<p>The market is shuttered. Even the back door, where you’d sell, is locked and dark.</p>';
  } else {
    html += '<p>The clerk at the back counter — a soft, tired-looking man who never quite meets your eyes — slides a scale across the counter. "Anything you want to unload?" He says it like he already knows the answer is no.</p>';
    if (!list.length){
      html += '<p class="small">Nothing here worth selling. Everything in your bag is food, or you’ve already eaten it.</p>';
    }
  }
  html += '<div class="actions">' +
    (night
      ? ''
      : list.map(function (k){
          const it = ITEMS[k];
          const p = itemSellPrice(k);
          return btn('Sell ' + it.name + ' x' + items[k] + ' — ' + p + ' cr', 'items:sell', k);
        }).join('')) +
    btn('Back to the market', 'nav', 'market') +
    '</div>';
  return html;
}

addScreen('market-sell', marketSellScene);

function craftScene(){
  const night = isNight();
  let html = '<h2>The market — craft corner</h2>';
  if (night){
    html += '<p>The market is closed. The little prep counter is dark and cold.</p>';
  }
  const have = [];
  for (const k in ITEMS){
    if (itemCount(k) > 0) have.push('<span class="invn">' + ITEMS[k].name + ' x' + itemCount(k) + '</span>');
  }
  html += '<p>The prep counter at the back of the market is open — a warm oven, a few bowls, the same smell as the bakery. A sign reads: <em>make something of it.</em></p>';
  html += '<p class="small">Carrying: ' + (have.length ? have.join(', ') : 'nothing.') + ' — ' + invUsed() + '/' + invCap() + '.</p>';
  html += '<div class="actions">';
  for (const id in CRAFT){
    const r = CRAFT[id];
    const can = craftPossible(id);
    const ing = Object.keys(r.from).map(function (k){
      return ITEMS[k].name + ' x' + r.from[k] + (itemCount(k) >= r.from[k] ? '' : ' <span class="rf">(need)</span>');
    }).join(', ');
    html += btn(can ? 'Craft ' + r.name : 'Craft ' + r.name + ' — needs ' + ing, 'items:craft', id, night || !can);
  }
  html += btn('Back to the market', 'nav', 'market');
  html += '</div>';
  return html;
}

addScreen('market-craft', craftScene);
