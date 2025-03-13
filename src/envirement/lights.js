import { AmbientLight, DirectionalLight } from "three";

export default function createLights() {
  const ambientLight = new AmbientLight(0xffffff, 5);

  const directionalLight = new DirectionalLight(0xffffff, 5);
  directionalLight.position.set(-50, 50, 50);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 500;
  directionalLight.shadow.camera.right = 550;
  directionalLight.shadow.camera.left = -550;
  directionalLight.shadow.camera.top = 550;
  directionalLight.shadow.camera.bottom = -550;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;

  return { ambientLight, directionalLight };
}
