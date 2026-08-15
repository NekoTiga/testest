'use strict';

const SAVE_KEY = 'full-enrollment-demo-v7';

const CLOCK_START = 9;
const CLOCK_END = 24;

const DEFAULT = () => ({
  day: 1,
  clock: CLOCK_START,
  classDays: 0,
  lbs: 130,
  piperLbs: 125,
  minaLbs: 130,
  glut: 0,
  capacity: 8,
  selfcontrol: 100,
  selfestem: 60,
  credits: 150,
  infCredits: false,
  allowance300: false,
  vending: false,
  metRavi: false,
  clue1: false,
  clue2: false,
  clue3: false,
  clue4: false,
  clue5: false,
  piperq: false,
  piper1: false,
  ravi: 0,
  mirror: false,
  knownLbs: null,
  bandHandout: false,
  bandOn: true,
  piperBandOff: false,
  minaBandOff: false,
  piperSc: 100,
  minaSc: 100,
  sampleUsed: false,
  secondsUsed: false,
  showerRefused: false,
  worn: null,
  worked: false,
  minaQ: false,
  minaPress: false,
  s0done: false,
  s1done: false,
  s3done: false,
  cakeGone: false,
  piperPig: false,
  minaPig: false,
  collapse800: false,
  vibRoom: false,
  vibAd: false,
  vibPortable: false,
  vibAdPortable: false,
  vibOff: false,
  scooterAcc: false,
  scooterOff: false,
  lastScene: '',
  ending: null,
  screen: 'arrive',
  notice: '',
  scooters: 0,
  agrav: false,
  metZola: false,
  zola: 0,
  zolaIntro: '',
  zolaIntroDelay: 0,
  zolaSheKnows: false,
  zolaAutoDay: -1,
  zolaCorruptT: 0,
  zolaCorruptDone: false,
  piperZola: false,
  minaZola: false,
  piperCollar: false,
  minaCollar: false,
  zolaOutgrew: false,
  submission: 0,
  zolaOrderDay: 0,
  zolaCollar: false,
  zolaNaked: false,
  zolaPhotos: [],
  zolaDemand: '',
  zolaPhotoDay: 0,
  zolaStripDone: false,
  zolaPierced: false,
  zolaPierceDay: 0,
  zolaStayNight: false,
  zolaVisitDay: 0,
  zolaVisitN: 0,
  crave: 0,
  sweat: 0,
  grazing: false,
  zolaCallDay: 0,
  zolaReleaseDay: 0,
  releaseN: 0,
  skin: 100,
  creamType: '',
  creamUse: 0,
  skinDay: 0,
  fridgeNightDay: 0,
  classAte: false,
  classDozed: false,
  zolaHintSeen: false,
  items: {},
  clinicDay: 0,
  clinicCheckN: 0,
  clinicCheckDay: 0,
  clinicDisabled: false,
  clinicDisabledDay: 0,
  clinicSkinRx: false,
  clinicSnackDay: 0,
  clinicAccNoDay: 0,
  clinicBed: false,
  clinicBath: false,
  clinicRoom: false,
  clinicChair: false,
  clinicLift: false,
  clinicCareRoom: false,
  zolaReactBed: false,
  zolaReactBath: false,
  zolaReactRoom: false,
  zolaReactChair: false,
  zolaReactLift: false,
  zolaReactCare: false,
  marketVisits: 0,
  unionVisits: 0,
  bakeryVisits: 0,
  bakeryPunch: 0,
  parkVisits: 0,
  gateSeen: false,
  resTrust: 0,
  resMet: false,
  resShut: false,
  resTipDay: 0,
  resDlgMember: '',
  resDlgLoc: '',
  resDlgTurn: 0,
  resDlgText: '',
  libReply: '',
  zolaCollarOff: false,
  zolaRecollared: false,
  zolaGymDay: 0,
  zolaMedAsk: false,
  zolaMedGet: false,
  zolaMedSet: false,
  zolaMedCount: 0,
  hallucination: false,
  lucid: false,
  callHomeSeen: false,
  callHomeChoice: '',
  sisterNextCall: 30,
  sisterCalls: 0,
  sisterMissed: 0,
  sisterDeclinedDay: 0,
  sisterEat: false,
  sisterDenyOk: false,
  clinicDocSeen: false,
  clinicDocChoice: '',
  outsideHelp: false,
  outsideGone: false,
  newVictimDone: false,
  shamelessDone: false
});

function load(){
  try { const raw = localStorage.getItem(SAVE_KEY); return raw ? JSON.parse(raw) : null; }
  catch (e) { return null; }
}
function persist(){
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
  catch (e) {}
}

const SAVE_VERSION = 'v7';

function stateToFile(){
  return JSON.stringify({
    app: 'full-enrollment-demo',
    version: SAVE_VERSION,
    savedAt: new Date().toISOString(),
    day: state.day,
    state: state
  }, null, 2);
}
function stateFromFile(text){
  const parsed = JSON.parse(text);
  let raw = parsed;
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && parsed.state && typeof parsed.state === 'object'){
    raw = parsed.state;
  }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('Not a valid save file.');
  state = Object.assign(DEFAULT(), raw);
  clamp();
  if (!Array.isArray(state.zolaPhotos)) state.zolaPhotos = [];
  overnight = [];
  beddayScene = '';
  if (typeof SCREENS !== 'undefined' && !SCREENS[state.screen]) state.screen = 'room';
  if (state.screen === 'travel') state.screen = 'hub';
  persist();
  return state;
}

let state = Object.assign(DEFAULT(), load() || {});
let overnight = [];
let beddayScene = '';

function clamp(){
  state.day = Math.max(1, state.day | 0);
  state.clock = (state.clock == null) ? CLOCK_START : Math.max(CLOCK_START, Math.min(CLOCK_END, Number(state.clock) || CLOCK_START));
  state.classDays = Math.max(0, state.classDays | 0);
  state.lbs = Math.max(130, Math.min(1000, Number(state.lbs) || 130));
  state.piperLbs = (state.piperLbs == null) ? 125 : state.piperLbs;
  state.minaLbs = (state.minaLbs == null) ? 130 : state.minaLbs;
  state.glut = Math.max(0, Math.min(50, Number(state.glut) || 0));
  state.capacity = Math.max(4, Math.min(30, Number(state.capacity) || 8));
  state.selfcontrol = (state.selfcontrol == null) ? 100 : Math.max(0, Math.min(100, state.selfcontrol));
  state.selfestem = Math.max(0, Math.min(100, state.selfestem | 0));
  state.credits = Math.max(0, state.credits | 0);
  state.infCredits = !!state.infCredits;
  state.allowance300 = !!state.allowance300;
  state.scooters = Math.max(0, state.scooters | 0);
  state.agrav = !!state.agrav;
  state.bandOn = state.bandOn == null ? true : !!state.bandOn;
  state.piperBandOff = !!state.piperBandOff;
  state.minaBandOff = !!state.minaBandOff;
  state.piperSc = (state.piperSc == null) ? 100 : Math.max(0, Math.min(100, state.piperSc));
  state.minaSc = (state.minaSc == null) ? 100 : Math.max(0, Math.min(100, state.minaSc));
  state.sampleUsed = !!state.sampleUsed;
  state.secondsUsed = !!state.secondsUsed;
  state.cakeGone = !!state.cakeGone;
  state.piperPig = !!state.piperPig;
  state.minaPig = !!state.minaPig;
  state.collapse800 = !!state.collapse800;
  state.vibRoom = !!state.vibRoom;
  state.vibAd = !!state.vibAd;
  state.vibPortable = !!state.vibPortable;
  state.vibAdPortable = !!state.vibAdPortable;
  state.vibOff = !!state.vibOff;
  state.scooterAcc = !!state.scooterAcc;
  state.scooterOff = !!state.scooterOff;
  state.showerRefused = !!state.showerRefused;
  state.clue3 = !!state.clue3;
  state.clue4 = !!state.clue4;
  state.clue5 = !!state.clue5;
  state.worn = (typeof state.worn === 'string' && /^(rigid|active|soft|baggy|robe|zola|zola-tight)$/.test(state.worn)) ? state.worn : null;
  if (state.lbs >= 800) state.worn = null;
  state.metZola = !!state.metZola;
  state.zola = (state.zola == null) ? 0 : Math.max(0, Math.min(100, Number(state.zola) || 0));
  state.zolaIntro = (state.zolaIntro === 'piper' || state.zolaIntro === 'mina') ? state.zolaIntro : '';
  state.zolaIntroDelay = Math.max(0, state.zolaIntroDelay | 0);
  state.zolaSheKnows = !!state.zolaSheKnows;
  state.zolaAutoDay = Math.max(-1, state.zolaAutoDay | 0);
  state.zolaCorruptT = Math.max(0, state.zolaCorruptT | 0);
  state.zolaCorruptDone = !!state.zolaCorruptDone;
  state.piperZola = !!state.piperZola;
  state.minaZola = !!state.minaZola;
  state.piperCollar = !!state.piperCollar;
  state.minaCollar = !!state.minaCollar;
  state.zolaOutgrew = !!state.zolaOutgrew;
  state.submission = (state.submission == null) ? 0 : Math.max(0, Math.min(100, Number(state.submission) || 0));
  state.zolaOrderDay = Math.max(0, state.zolaOrderDay | 0);
  state.zolaCollar = !!state.zolaCollar;
  state.zolaCollarOff = !!state.zolaCollarOff;
  state.zolaRecollared = !!state.zolaRecollared;
  state.zolaGymDay = Math.max(0, state.zolaGymDay | 0);
  state.zolaNaked = !!state.zolaNaked;
  state.zolaPhotos = Array.isArray(state.zolaPhotos) ? state.zolaPhotos.filter(function (e){ return e && typeof e.day === 'number' && typeof e.lbs === 'number'; }).slice(0, 200) : [];
  state.zolaDemand = (typeof state.zolaDemand === 'string') ? state.zolaDemand : '';
  state.zolaPhotoDay = Math.max(0, state.zolaPhotoDay | 0);
  state.zolaStripDone = !!state.zolaStripDone;
  state.zolaPierced = !!state.zolaPierced;
  state.zolaPierceDay = Math.max(0, state.zolaPierceDay | 0);
  state.zolaStayNight = !!state.zolaStayNight;
  state.zolaVisitDay = Math.max(0, state.zolaVisitDay | 0);
  state.zolaVisitN = Math.max(0, state.zolaVisitN | 0);
  state.crave = (state.crave == null) ? 0 : Math.max(0, Math.min(100, Number(state.crave) || 0));
  state.sweat = (state.sweat == null) ? 0 : Math.max(0, Math.min(100, Number(state.sweat) || 0));
  state.grazing = !!state.grazing;
  state.zolaCallDay = Math.max(0, state.zolaCallDay | 0);
  state.zolaReleaseDay = Math.max(0, state.zolaReleaseDay | 0);
  state.releaseN = Math.max(0, state.releaseN | 0);
  state.skin = (state.skin == null) ? 100 : Math.max(0, Math.min(100, Number(state.skin) || 0));
  state.creamType = (state.creamType == null) ? '' : String(state.creamType);
  state.creamUse = Math.max(0, state.creamUse | 0);
  state.zolaHintSeen = !!state.zolaHintSeen;
  state.items = (state.items && typeof state.items === 'object') ? state.items : {};
  state.clinicDay = Math.max(0, state.clinicDay | 0);
  state.clinicCheckN = Math.max(0, Math.min(6, state.clinicCheckN | 0));
  state.clinicCheckDay = Math.max(0, state.clinicCheckDay | 0);
  state.clinicDisabled = !!state.clinicDisabled;
  state.clinicDisabledDay = Math.max(0, state.clinicDisabledDay | 0);
  state.clinicSkinRx = !!state.clinicSkinRx;
  state.clinicSnackDay = Math.max(0, state.clinicSnackDay | 0);
  state.clinicAccNoDay = Math.max(0, state.clinicAccNoDay | 0);
  state.clinicBed = !!state.clinicBed;
  state.clinicBath = !!state.clinicBath;
  state.clinicRoom = !!state.clinicRoom;
  state.clinicChair = !!state.clinicChair;
  state.clinicLift = !!state.clinicLift;
  state.clinicCareRoom = !!state.clinicCareRoom;
  state.zolaReactBed = !!state.zolaReactBed;
  state.zolaReactBath = !!state.zolaReactBath;
  state.zolaReactRoom = !!state.zolaReactRoom;
  state.zolaReactChair = !!state.zolaReactChair;
  state.zolaReactLift = !!state.zolaReactLift;
  state.zolaReactCare = !!state.zolaReactCare;
  state.marketVisits = Math.max(0, state.marketVisits | 0);
  state.unionVisits = Math.max(0, state.unionVisits | 0);
  state.bakeryVisits = Math.max(0, state.bakeryVisits | 0);
  state.bakeryPunch = Math.max(0, Math.min(4, state.bakeryPunch | 0));
  state.parkVisits = Math.max(0, state.parkVisits | 0);
  state.gateSeen = !!state.gateSeen;
  state.resTrust = Math.max(0, Math.min(100, state.resTrust | 0));
  state.resMet = !!state.resMet;
  state.resShut = !!state.resShut;
  state.resTipDay = Math.max(0, state.resTipDay | 0);
  state.zolaMedAsk = !!state.zolaMedAsk;
  state.zolaMedGet = !!state.zolaMedGet;
  state.zolaMedSet = !!state.zolaMedSet;
  state.zolaMedCount = Math.max(0, Math.min(500, state.zolaMedCount | 0));
  state.hallucination = !!state.hallucination;
  state.lucid = !!state.lucid;
  state.callHomeSeen = !!state.callHomeSeen;
  state.callHomeChoice = (state.callHomeChoice === 'accept' || state.callHomeChoice === 'decline') ? state.callHomeChoice : '';
  state.sisterNextCall = Math.max(30, Math.min(9999, state.sisterNextCall == null ? 30 : state.sisterNextCall | 0));
  state.sisterCalls = Math.max(0, state.sisterCalls | 0);
  state.sisterMissed = Math.max(0, state.sisterMissed | 0);
  state.sisterDeclinedDay = Math.max(0, state.sisterDeclinedDay | 0);
  state.sisterEat = !!state.sisterEat;
  state.sisterDenyOk = !!state.sisterDenyOk;
  state.clinicDocSeen = !!state.clinicDocSeen;
  state.clinicDocChoice = (state.clinicDocChoice === 'accept' || state.clinicDocChoice === 'decline') ? state.clinicDocChoice : '';
  state.outsideHelp = !!state.outsideHelp;
  state.outsideGone = !!state.outsideGone;
  state.newVictimDone = !!state.newVictimDone;
  state.shamelessDone = !!state.shamelessDone;
}

function apply(patch){
  const prevClock = state.clock;
  Object.assign(state, patch);
  clamp();
  if (!('sweat' in patch) && state.clock > prevClock){
    const gain = passiveSweat(state.clock - prevClock);
    if (gain > 0) state.sweat = Math.min(100, state.sweat + gain);
  }
  if (!state.ending){
    if (state.lbs >= 1000){
      state.ending = 'normalized';
      state.screen = 'normalized';
    } else if (state.day > 300){
      state.ending = 'complete';
      state.screen = 'complete';
    }
  }
  persist();
  render();
}

function displayLbs(){
  return state.knownLbs == null ? '???' : state.knownLbs;
}
function passiveSweat(hours){
  if (!(hours > 0)) return 0;
  const t = wTier(state.lbs);
  const rate = [0.2, 0.3, 0.5, 0.8, 1.2, 1.8, 2.6, 3.6, 5][t] != null ? [0.2, 0.3, 0.5, 0.8, 1.2, 1.8, 2.6, 3.6, 5][t] : 5;
  return rate * hours;
}
function sc(){
  return Math.round(state.selfcontrol);
}
function fullness(){
  return Math.round(state.glut) + '/' + Math.round(state.capacity);
}
function fullnessAt(g){
  return Math.round(g) + '/' + Math.round(state.capacity);
}
function mealUnits(){
  return 6;
}
function bandWorn(){
  return state.bandHandout && state.bandOn;
}
function piperWears(){
  return state.bandHandout && !state.piperBandOff;
}
function minaWears(){
  return state.bandHandout && !state.minaBandOff;
}
function canAfford(cost){
  return state.infCredits || state.credits >= cost;
}
function vibActive(){
  return (state.vibRoom || state.vibPortable) && !state.vibOff;
}
function vibPortableActive(){
  return state.vibPortable && !state.vibOff;
}
function vibInstalled(){
  return state.vibRoom || state.vibPortable;
}
function piperUsesVib(){
  return state.piperSc < 50 && state.piperLbs > 300;
}
function minaUsesVib(){
  return state.minaSc < 50 && state.minaLbs > 300;
}
function scooterActive(){
  return state.scooterAcc && !state.scooterOff && !state.agrav;
}
function scooterOwned(){
  return state.scooterAcc;
}
function piperHasScooter(){
  return state.piperSc < 50 && state.piperLbs >= 400;
}
function minaHasScooter(){
  return state.minaSc < 50 && state.minaLbs >= 400;
}

function clockHour(){
  return (state.clock == null) ? CLOCK_START : state.clock;
}
function clockPart(h){
  const hh = (h == null) ? clockHour() : h;
  if (hh < 12) return 'morning';
  if (hh < 16) return 'afternoon';
  if (hh < 20) return 'evening';
  return 'night';
}
function clockText(h){
  const hh = (h == null) ? clockHour() : h;
  const hr = Math.floor(hh);
  const mn = Math.round((hh - hr) * 60);
  const h12 = hr % 12 === 0 ? 12 : hr % 12;
  return h12 + ':' + (mn < 10 ? '0' : '') + mn + ' ' + (hr < 12 ? 'am' : 'pm');
}
function clockPlus(h){
  return Math.min(CLOCK_END, clockHour() + h);
}
function clockLeft(){
  return Math.max(0, CLOCK_END - clockHour());
}
function isNight(){
  return clockHour() >= CLOCK_END;
}
function classWindow(){
  const h = clockHour();
  return h >= CLOCK_START && h <= 15;
}
function timeText(h){
  const total = Math.round(h * 60);
  const hr = Math.floor(total / 60);
  const mn = total % 60;
  if (hr === 0) return mn + ' min';
  if (mn === 0) return hr + ' h';
  return hr + ' h ' + mn + ' min';
}
function mealTime(units){
  return 0.5 + units * 0.25;
}
