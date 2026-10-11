// superdough включает звук только по первому клику в окне (initAudioOnFirstClick): до него evaluate ждёт.
let unlocked = false;

export function markAudioUnlocked() {
  unlocked = true;
}

export function isAudioUnlocked() {
  return unlocked;
}
