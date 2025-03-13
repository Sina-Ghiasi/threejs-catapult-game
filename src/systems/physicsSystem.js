import { ContactMaterial, Material, NaiveBroadphase } from "cannon-es";
import { gameAssets } from "../game/gameAssets";

export const physicsMaterial = new Material("baseMaterial");

export default function initPhysics() {
  gameAssets.world.gravity.set(0, -9.82, 0);
  gameAssets.world.broadphase = new NaiveBroadphase();
  gameAssets.world.solver.iterations = 10;
  gameAssets.world.solver.tolerance = 0.1;

  const physicsContactMaterial = new ContactMaterial(
    physicsMaterial,
    physicsMaterial,
    {
      friction: 0.6,
      restitution: 0.3,
    }
  );
  gameAssets.world.addContactMaterial(physicsContactMaterial);
}
