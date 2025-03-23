export const keyStates = {};
export function handleKeyboardDownTracking(event) {
  keyStates[event.code] = true;
}
export function handleKeyboardUpTracking(event) {
  keyStates[event.code] = false;
}
