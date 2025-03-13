import GUI from "lil-gui";
import gameStore from "../game/gameStore";
import { gameAssets } from "../game/gameAssets";

const gui = new GUI();
const { ambientLight, directionalLight } = gameAssets.lights;
const { camera1 } = gameAssets.cameras;

const ambientLightFolder = gui.addFolder("Three.js Ambient Light");
ambientLightFolder.add(ambientLight, "intensity", 0, 20, 0.1);
ambientLightFolder.close();

const directionalLightFolder = gui.addFolder("Three.js  DirectionalLight");
directionalLightFolder.add(directionalLight, "intensity", 0, 20, 0.1);
directionalLightFolder.close();

const camera1Folder = gui.addFolder("Three.js active camera Folder");
camera1Folder.add(camera1.position, "x", -100, 100, 0.1).name("X");
camera1Folder.add(camera1.position, "y", -100, 100, 0.1).name("Y");
camera1Folder.add(camera1.position, "z", -100, 100, 0.1).name("Z");
camera1Folder.close();

gameStore.subscribe((state) => {
  console.log("State updated:", state);
});
