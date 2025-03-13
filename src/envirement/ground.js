import { Body, Plane, Vec3 } from "cannon-es";
import {
  BackSide,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  SRGBColorSpace,
} from "three";
import { physicsMaterial } from "../systems/physicsSystem";

export function createGround(texture) {
  const body = createGroundBody();
  const mesh = createGroundMesh(texture);
  return { body, mesh };
}

function createGroundBody() {
  const groundShape = new Plane();
  const groundBody = new Body({ mass: 0, material: physicsMaterial });
  groundBody.addShape(groundShape);
  groundBody.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), -Math.PI / 2);
  groundBody.userData = {
    type: "plane",
    name: "ground_1",
  };
  return groundBody;
}

function createGroundMesh(texture) {
  texture.colorSpace = SRGBColorSpace;
  texture.repeat.set(20, 20);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;

  const groundGeometry = new PlaneGeometry(512, 512);
  const groundMaterial = new MeshStandardMaterial({
    color: 0x5f8228,
    side: BackSide,
    map: texture,
    bumpMap: texture,
    bumpScale: 0.1,
  });
  const groundMesh = new Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = Math.PI / 2;
  groundMesh.receiveShadow = true;
  return groundMesh;
}
