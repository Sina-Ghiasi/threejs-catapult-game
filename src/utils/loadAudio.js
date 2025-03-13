import { AudioLoader } from "three";

export function loadAudio(path, manager) {
  const audioLoader = new AudioLoader(manager);
  return new Promise((resolve, reject) => {
    audioLoader.load(
      path,
      (buffer) => resolve(buffer),
      undefined,
      (error) => reject(error)
    );
  });
}

export async function loadAudios(audioPaths, manager) {
  const entries = Object.entries(audioPaths);
  const audioBuffers = await Promise.all(
    entries.map(([key, path]) => loadAudio(path, manager))
  );

  return entries.reduce((acc, [key], index) => {
    acc[key] = audioBuffers[index];
    return acc;
  }, {});
}
