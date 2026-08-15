'use strict';

const SCREENS = {};
const ACTIONS = {};
const AFTER = {};

function addScreen(name, fn){ SCREENS[name] = fn; }
function addAction(name, fn){ ACTIONS[name] = fn; }
