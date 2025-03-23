import { gameAssets } from "../game/gameAssets";
import gameStore from "../game/gameStore";

export function handleAutoPauseBlur() {
  gameAssets.audioObjects["background"]?.pause();
  if (!gameStore.getState().isPaused) {
    gameStore.dispatch({ type: "AUTO_PAUSE" });
  }
}

export function handleAutoPauseFocus() {
  gameAssets.audioObjects["background"]?.play();
  if (gameStore.getState().isAutoPaused) {
    gameStore.dispatch({ type: "AUTO_UNPAUSE" });
  }
}
