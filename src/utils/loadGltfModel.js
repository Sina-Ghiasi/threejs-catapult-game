import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadGltfModel(path, manager) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader(manager);
    loader.load(
      path,
      (gltf) => {
        resolve(gltf);
      },
      undefined,
      (error) => {
        reject(error);
      }
    );
  });
}

export async function loadGltfModels(modelPaths, manager) {
  const entries = Object.entries(modelPaths);
  const promises = entries.map(([key, path]) => loadGltfModel(path, manager));

  const loadedModels = await Promise.all(promises);

  return entries.reduce((acc, [key], index) => {
    acc[key] = loadedModels[index];
    return acc;
  }, {});
}
