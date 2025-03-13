import { CubeTextureLoader } from "three";
import { BASE_URL } from "../config/env";

export default function createSkyBox() {
  const reflectionCube = new CubeTextureLoader()
    .setPath(`${BASE_URL}textures/skybox/`)
    .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
  return reflectionCube;
}
