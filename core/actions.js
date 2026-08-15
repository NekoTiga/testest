'use strict';

function go(action, arg){
  if (action === 'nav'){
    if (arg === 'gym' && state.zolaCollar){
      apply({ notice: 'Zola’s rule holds: no gym, no burning off what she’s put on you. The path stays greyed on your map, and you don’t test it. The collar settles warm against your throat.', screen: state.screen, lastScene: '' });
      return;
    }
    const locked = pcLockedRoom();
    if (locked && (arg === 'mirror' || arg === 'room')){
      apply({ screen: arg, lastScene: '', notice: '' });
      return;
    }
    if (locked && (arg === 'hub' || arg === 'commons' || arg === 'gym' || arg === 'library' || arg === 'union' || arg === 'market' || arg === 'clinic' || arg === 'gate' || arg === 'bakery' || arg === 'park')){
      apply({ notice: 'The door opens. It always opens. You put your hand on the frame and your body pulls back toward the bed — hips wide, weight settling low, the tray within reach. You let go of the frame and go back.', screen: state.screen, lastScene: '' });
      return;
    }
    if (travelFrom(state.screen, arg)){
      travelTarget = arg;
      apply({ screen: 'travel', lastScene: '', notice: '' });
    } else {
      travelTarget = '';
      apply({ screen: arg, lastScene: '', notice: '' });
    }
    return;
  }
  const handler = ACTIONS[action];
  if (handler){ handler(arg); return; }
  switch (action){
    case 'save':
      saveToFile();
      return;
    case 'load':
      openLoadDialog();
      return;
    case 'reset':
    case 'restart':
      localStorage.removeItem(SAVE_KEY);
      state = DEFAULT();
      persist();
      render();
      return;
    default:
      return;
  }
}
