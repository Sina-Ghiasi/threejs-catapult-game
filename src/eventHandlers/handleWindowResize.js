import { gameAssets } from "../game/gameAssets";
import gameStore from "../game/gameStore";
import { getWindowAspectRatio, isMobileView } from "../utils/viewportTools";

export default function handleWindowResize() {
  if (isMobileView()) {
    gameAssets.cameras.camera1.position.set(-66, 13, 8);
  } else {
    gameAssets.cameras.camera1.position.set(-65, 14, 7);
  }

  const activeCamera = gameStore.getState().activeCamera;
  activeCamera.aspect = getWindowAspectRatio();
  activeCamera.updateProjectionMatrix();
  gameAssets.renderer.setSize(window.innerWidth, window.innerHeight);
}
