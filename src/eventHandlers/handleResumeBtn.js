import { menuScreenElement } from "../domElements";
import gameStore from "../game/gameStore";

export default function handleResumeBtn() {
  const { isLoading, isAutoPaused } = gameStore.getState();
  if (!isLoading && !isAutoPaused) {
    gameStore.dispatch({ type: "TOGGLE_PAUSE" });
    menuScreenElement.classList.toggle("hidden");
  }
}
