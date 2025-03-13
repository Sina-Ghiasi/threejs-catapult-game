import { Body, Sphere } from "cannon-es";
import { physicsMaterial } from "../systems/physicsSystem";
import handleCollision from "../eventHandlers/handleCollision";
import {
  FrontSide,
  LinearMipMapLinearFilter,
  Mesh,
  MeshLambertMaterial,
  NearestFilter,
  RepeatWrapping,
  SphereGeometry,
  TextureLoader,
} from "three";

export function createStoneBody() {
  const stoneShape = new Sphere(0.3);
  const stoneBody = new Body({
    mass: 80,
    material: physicsMaterial,
    shape: stoneShape,
  });
  stoneBody.userData = { type: "stone" };
  stoneBody.collisionResponse = true;
  stoneBody.addEventListener("collide", handleCollision);
  return stoneBody;
}

export function createStoneMesh(texture) {
  texture.repeat.set(1, 1);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = NearestFilter;
  texture.minFilter = LinearMipMapLinearFilter;
  const stoneGeometry = new SphereGeometry(0.3, 16, 16);
  const stoneMaterial = new MeshLambertMaterial({
    color: 0x6f6b5e,
    side: FrontSide,
    map: texture,
  });
  const stoneMesh = new Mesh(stoneGeometry, stoneMaterial);
  stoneMesh.castShadow = true;
  return stoneMesh;
}
