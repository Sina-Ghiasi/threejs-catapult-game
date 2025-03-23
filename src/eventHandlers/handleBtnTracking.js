export const btnStates = {};

export function handleButtonDownTracking(event) {
  btnStates[event.currentTarget.id] = true;
}

export function handleButtonUpTracking(event) {
  btnStates[event.currentTarget.id] = false;
}
