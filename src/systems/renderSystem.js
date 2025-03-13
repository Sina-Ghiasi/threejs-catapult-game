import { Color } from "three";
import { webglElement } from "../domElements";
import { gameAssets } from "../game/gameAssets";

export default function initRenderer() {
  gameAssets.renderer.setClearColor(new Color(0x000000));
  gameAssets.renderer.setSize(window.innerWidth, window.innerHeight);
  gameAssets.renderer.shadowMap.enabled = true;
  webglElement.appendChild(gameAssets.renderer.domElement);
  if (gameAssets.stats !== null) webglElement.appendChild(gameAssets.stats.dom);
}
