import gameStore from "../game/gameStore";

export default function handleSwitchCamera() {
  const { remainingCameraSwitch } = gameStore.getState();
  if (remainingCameraSwitch > 0) {
    gameStore.dispatch({
      type: "SWITCH_CAMERA",
    });
  }
}
