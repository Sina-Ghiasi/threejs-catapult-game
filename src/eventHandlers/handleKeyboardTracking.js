export const keys = {};
export function handleKeyboardTrackingDown(event) {
  keys[event.code] = true;
}
export function handleKeyboardTrackingUp(event) {
  keys[event.code] = false;
}
