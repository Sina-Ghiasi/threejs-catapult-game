import { gameAssets } from "../game/gameAssets";
import gameStore from "../game/gameStore";

export default function handleWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const activeCamera = gameStore.getState().activeCamera;
  activeCamera.aspect = width / height;
  activeCamera.updateProjectionMatrix();
  gameAssets.renderer.setSize(width, height);
}
