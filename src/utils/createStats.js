import Stats from "stats.js";
export default function createStats() {
  const stats = new Stats();
  stats.showPanel(0);
  stats.dom.style.position = "absolute";
  stats.dom.style.left = "5px";
  stats.dom.style.top = "5px";
  stats.dom.style.zIndex = "100";
  return stats;
}
