import { PerspectiveCamera, Vector3 } from "three";

export default function createCameras() {
  const camera1 = new PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera1.position.set(-64, 14, 7);
  camera1.lookAt(new Vector3(-47, 10, 0));

  const camera2 = new PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera2.position.set(-65, 16, 0);
  camera2.lookAt(new Vector3(-47, 14, 0));

  return { camera1, camera2 };
}
