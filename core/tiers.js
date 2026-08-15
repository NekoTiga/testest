'use strict';

const STOMACH_BASE = 8;
const STOMACH_MAX = 30;
const STOMACH_LB_PER_UNIT = 1 / 6;
const HEAVY_MEAL_UNITS = 6;

function wTier(w){
  const x = w == null ? 0 : w;
  if (x < 160) return 0;
  if (x < 185) return 1;
  if (x < 225) return 2;
  if (x < 275) return 3;
  if (x < 340) return 4;
  if (x < 450) return 5;
  if (x < 600) return 6;
  if (x < 800) return 7;
  return 8;
}
function rTier(w){
  if (w < 140) return 0;
  if (w < 175) return 1;
  if (w < 215) return 2;
  if (w < 280) return 3;
  return 4;
}
function piperTier(w){
  if (w >= 800) return 8;
  if (w >= 600) return 7;
  if (w >= 450) return 6;
  if (w >= 340) return 5;
  if (w >= 275) return 4;
  if (w >= 225) return 3;
  if (w >= 185) return 2;
  if (w >= 160) return 1;
  return 0;
}
function minaTier(w){
  if (w >= 800) return 8;
  if (w >= 600) return 7;
  if (w >= 450) return 6;
  if (w >= 340) return 5;
  if (w >= 275) return 4;
  if (w >= 225) return 3;
  if (w >= 185) return 2;
  if (w >= 160) return 1;
  return 0;
}
function talkStage(w){
  const t = w >= 800 ? 8 : w >= 600 ? 7 : w >= 450 ? 6 : w >= 340 ? 5 : w >= 275 ? 4 : w >= 225 ? 3 : w >= 185 ? 2 : w >= 160 ? 1 : 0;
  if (t >= 6) return 3;
  if (t >= 4) return 2;
  if (t >= 2) return 1;
  return 0;
}
function pcTone(){
  const t = wTier(state.lbs);
  if (t >= 7 || state.selfcontrol < 30 || state.selfestem < 20) return 2;
  if (t >= 5 || state.selfcontrol < 55 || state.selfestem < 40) return 1;
  return 0;
}
function pcLockedRoom(){
  return wTier(state.lbs) >= 8;
}
function pcNaked(){
  return pcLockedRoom();
}
function pcCorrupt(){
  return wTier(state.lbs) >= 8 && state.selfcontrol <= 0;
}
function piperSlob(){
  return piperTier(state.piperLbs) >= 8;
}
function minaSlob(){
  return minaTier(state.minaLbs) >= 8;
}
function mateIndulge(rmLbs, rmSc){
  return state.selfcontrol < 50 && rmSc < 50 && state.lbs >= 350 && rmLbs >= 350;
}
function dormGain(w){
  return 0.5 + 0.25 * rTier(w);
}
function roommateScDelta(w, wearing, handout){
  const erode = w >= 340 ? 1.5 : w >= 280 ? 1.0 : 0.5;
  return wearing ? -(erode + 0.5) : handout ? (1 - erode) : -erode;
}

const PC_TIERS = [5, 5, 5, 5, 5, 5, 10, 4, 4];
function sliceTier(arr, counts, tier){
  let start = 0;
  for (let i = 0; i < tier; i++) start += counts[i];
  return arr.slice(start, start + counts[tier]).join('');
}

function piperStage(){
  if (state.day <= 14) return 0;
  if (state.day <= 29) return 1;
  if (state.day <= 44) return 2;
  return 3;
}

function lazy(){
  return state.selfcontrol < 30;
}

const BODY_WORDS = {
  belly: ['belly','soft belly','round belly','heavy belly','big heavy belly','vast belly','enormous belly','immense belly','colossal belly'],
  thigh: ['thighs','soft thighs','heavy thighs','thick thighs','very heavy thighs','enormous thighs','vast thighs','immense thighs','colossal thighs'],
  fold: ['soft roll','soft rolls','heavy rolls','deep rolls','very deep rolls','huge rolls','enormous folds','immense folds','colossal folds'],
  hu: ['lean','a little soft','soft','heavy','heavier','very big','huge','enormous','colossal']
};

function greaseStage(){
  const w = state.lbs;
  const sc = state.selfcontrol;
  if (w >= 600 && sc < 20) return 5;
  if (w >= 450 && sc < 30) return 4;
  if (w >= 340 && sc < 45) return 3;
  if (w >= 275 && sc < 60) return 2;
  if (w >= 225 && sc < 75) return 1;
  return 0;
}

function commonsPhase(){
  const d = state.day;
  if (d <= 13) return 0;
  if (d <= 29) return 1;
  if (d <= 59) return 2;
  if (d <= 119) return 3;
  if (d <= 179) return 4;
  if (d <= 239) return 5;
  return 6;
}

function raviLbs(day){
  const d = Math.max(1, day | 0);
  if (d < 20) return 160 + d * 0.5;
  if (d < 60) return 170 + (d - 20) * 0.8;
  if (d < 120) return 202 + (d - 60) * 1.5;
  if (d < 200) return 292 + (d - 120) * 1.9;
  return 444 + (d - 200) * 1.2;
}
function raviTier(w){
  if (w < 170) return 0;
  if (w < 200) return 1;
  if (w < 240) return 2;
  if (w < 290) return 3;
  if (w < 350) return 4;
  if (w < 420) return 5;
  return 6;
}
const RAVI_TIERS = ['lean and restless', 'a little softer', 'visibly softening', 'properly heavy', 'soft and heavy', 'huge', 'enormous'];
function raviBody(){
  return RAVI_TIERS[raviTier(raviLbs(state.day))];
}
function zolaLbs(day){
  const d = Math.max(1, day | 0);
  return Math.min(900, 500 + Math.max(0, d - 30) * 2.5);
}
function zolaTier(w){
  return minaTier(w);
}
