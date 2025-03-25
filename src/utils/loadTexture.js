import { TextureLoader } from "three";

export function loadTexture(path, manager) {
  return new Promise((resolve, reject) => {
    const loader = new TextureLoader(manager);
    loader.load(
      path,
      (texture) => resolve(texture),
      undefined,
      (error) => reject(error)
    );
  });
}

export async function loadTextures(texturePaths, manager) {
  const entries = Object.entries(texturePaths);
  const promises = entries.map(([, path]) => loadTexture(path, manager));
  const loadedTextures = await Promise.all(promises);

  return entries.reduce((acc, [key], index) => {
    acc[key] = loadedTextures[index];
    return acc;
  }, {});
}
