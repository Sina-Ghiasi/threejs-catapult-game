import { Body, Box, Vec3 } from "cannon-es";
import {
  BoxGeometry,
  LinearMipMapLinearFilter,
  Mesh,
  MeshPhongMaterial,
  NearestFilter,
  RepeatWrapping,
} from "three";
import { physicsMaterial } from "../systems/physicsSystem";

export function createStandBody() {
  const halfExt = new Vec3(2.2, 0.6, 2.5);
  const standShape = new Box(halfExt);
  const standBody = new Body({
    mass: 0,
    material: physicsMaterial,
    shape: standShape,
  });
  standBody.userData = { type: "stand" };
  return standBody;
}
export function createStandMesh(texture) {
  texture.repeat.set(2, 2);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = NearestFilter;
  texture.minFilter = LinearMipMapLinearFilter;
  const halfExt = new Vec3(2.2, 0.6, 2.5);
  const standGeometry = new BoxGeometry(
    halfExt.x * 2,
    halfExt.y * 2,
    halfExt.z * 2
  );
  const material = new MeshPhongMaterial({
    color: 0x646f6e,
    map: texture,
  });
  const standMesh = new Mesh(standGeometry, material);
  return standMesh;
}
