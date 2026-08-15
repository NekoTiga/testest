'use strict';

const MAP_NODES = [
  { id: 'gate',    label: 'Town gate',  x: 118, y: 2,  w: 84,  h: 26, nav: 'gate' },
  { id: 'gym',     label: 'Gym',        x: 8,   y: 12, w: 66,  h: 40, nav: 'gym', req: function (){ return !state.zolaCollar; } },
  { id: 'library', label: 'Library',    x: 246, y: 12, w: 66,  h: 40, nav: 'library' },
  { id: 'clinic',  label: 'Clinic',     x: 8,   y: 68, w: 66,  h: 34, nav: 'clinic' },
  { id: 'commons', label: 'Commons',    x: 246, y: 68, w: 66,  h: 34, nav: 'commons' },
  { id: 'union',   label: 'Union',      x: 8,   y: 118, w: 66, h: 34, nav: 'union' },
  { id: 'market',  label: 'Market',     x: 246, y: 118, w: 66, h: 34, nav: 'market' },
  { id: 'dorms',   label: 'Dorm',       x: 8,   y: 168, w: 66, h: 50, nav: 'room' },
  { id: 'zola',    label: 'Zola',       x: 246, y: 168, w: 66, h: 50, nav: 'zola-room', req: function (){ return state.metZola && state.zola >= 40; } },
  { id: 'bakery',  label: 'Bakery',     x: 90,  y: 184, w: 66, h: 34, nav: 'bakery' },
  { id: 'park',    label: 'Park',       x: 164, y: 184, w: 66, h: 34, nav: 'park' },
  { id: 'hub',     label: 'Quad',       x: 90,  y: 56, w: 140, h: 118, nav: 'hub' }
];

const MAP_ROADS = [
  [160, 28, 160, 56],   // gate -> quad top
  [41, 32, 90, 90],     // gym -> quad left
  [279, 32, 230, 90],   // library -> quad right
  [41, 85, 90, 110],    // clinic -> quad left
  [279, 85, 230, 110],  // commons -> quad right
  [41, 135, 90, 135],   // union -> quad left
  [279, 135, 230, 135], // market -> quad right
  [41, 193, 90, 160],   // dorms -> quad lower left
  [279, 193, 230, 160], // zola -> quad lower right
  [123, 201, 123, 174], // bakery -> quad bottom left
  [197, 201, 197, 174]  // park -> quad bottom right
];

const MAP_SCREEN_NODE = {
  hub: 'hub', room: 'dorms', mirror: 'dorms', 'zola-room': 'zola',
  commons: 'commons', gym: 'gym', library: 'library',
  clinic: 'clinic', union: 'union', market: 'market', 'market-sell': 'market', 'market-craft': 'market',
  bakery: 'bakery', park: 'park',
  gate: 'gate', travel: 'hub'
};

function mapCurrentNode(){
  return MAP_SCREEN_NODE[state.screen] || 'hub';
}

function mapLocked(node){
  if (node.req && !node.req()) return true;
  return false;
}

function mapSvg(){
  const cur = mapCurrentNode();
  let s = '<svg viewBox="0 0 320 226" class="townmap" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Campus map">';
  s += '<rect x="90" y="56" width="140" height="118" rx="10" fill="#f3ecdb" stroke="#ded2bd" stroke-dasharray="4 3"/>';
  s += '<text x="160" y="150" text-anchor="middle" class="mplabel" fill="#b9ab8f" font-size="11" font-style="italic">quad</text>';
  for (let i = 0; i < MAP_ROADS.length; i++){
    const r = MAP_ROADS[i];
    s += '<line x1="' + r[0] + '" y1="' + r[1] + '" x2="' + r[2] + '" y2="' + r[3] + '" stroke="#ded2bd" stroke-width="2"/>';
  }
  for (let i = 0; i < MAP_NODES.length; i++){
    const n = MAP_NODES[i];
    const here = n.id === cur;
    const locked = mapLocked(n);
    let attrs;
    if (n.go){
      attrs = 'data-go="' + n.go + '"';
    } else if (locked){
      attrs = 'data-go="map:soon" data-arg="' + n.id + '"';
    } else if (n.nav){
      attrs = 'data-go="nav" data-arg="' + n.nav + '"';
    }
    s += '<g ' + attrs + ' class="mapnode' + (here ? ' here' : '') + (locked ? ' locked' : '') + '">';
    s += '<rect x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="' + n.h + '" rx="8"/>';
    s += '<text x="' + (n.x + n.w / 2) + '" y="' + (n.y + n.h / 2 + 4) + '" text-anchor="middle" class="mnlabel">' + n.label + '</text>';
    if (here){
      s += '<circle cx="' + (n.x + n.w / 2) + '" cy="' + (n.y + n.h + 7) + '" r="3" class="mn-dot"/>';
    }
    if (locked){
      s += '<text x="' + (n.x + n.w - 8) + '" y="' + (n.y + 12) + '" text-anchor="middle" class="mnlock">🔒</text>';
    }
    s += '</g>';
  }
  s += '</svg>';
  return s;
}

addAction('map:soon', function (arg){
  if (arg === 'gym' && state.zolaCollar){
    apply({ lastScene: 'map:soon', screen: state.screen, notice: 'Zola’s word is law: no gym. The moment you drift toward the path, the collar tugs at your throat — not physically, but you stop anyway. Her rules hold. The gym stays greyed out.' });
    return;
  }
  if (arg === 'zola'){
    apply({ lastScene: 'map:soon', screen: state.screen, notice: 'The path to Zola’s dorm is barred to you for now. Warm light shows in the far windows, and you are not welcome there yet.' });
    return;
  }
  apply({ lastScene: 'map:soon', screen: state.screen, notice: 'That part of campus isn’t open yet — workers are still fitting it out behind a wall of plastic sheeting.' });
});
