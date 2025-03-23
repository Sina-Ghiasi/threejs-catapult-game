import createModal from "../utils/createModal";

export default function handleInstructionBtn() {
  createModal({
    title: "How to Play",
    content: `<p>
         <b>C</b> ➔ Switch camera (2 times)<br />
         <b>Space</b> ➔ Start game (restart)<br />
         <b>A</b> ➔ Shoot enemies <br />
         <b>P</b> ➔ Pause (menu) <br />
        </p>`,

    confirmText: "Got It",
    allowClose: true,
  });
}
