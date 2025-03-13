import gameStore from "../game/gameStore";

export function handleAutoPauseBlur() {
  if (!gameStore.getState().isPaused) {
    gameStore.dispatch({ type: "AUTO_PAUSE" });
  }
}

export function handleAutoPauseFocus() {
  if (gameStore.getState().isAutoPaused) {
    gameStore.dispatch({ type: "AUTO_UNPAUSE" });
  }
}
