export default function createPool(createMesh, createBody, size = 20) {
  let bodyPool = Array.from({ length: size }, createBody);
  let meshPool = Array.from({ length: size }, createMesh);

  return {
    getObject: () => ({
      body: bodyPool.length > 0 ? bodyPool.pop() : createBody(),
      mesh: meshPool.length > 0 ? meshPool.pop() : createMesh(),
    }),
    releaseObject: (mesh, body) => {
      meshPool.push(mesh);
      bodyPool.push(body);
    },
    size,
  };
}
