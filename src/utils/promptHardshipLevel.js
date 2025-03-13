export default function promptHardshipLevel(startGameCallback) {
  do {
    let userResponse = prompt(
      "Please enter the hardship level you want.\nChoose between 1 and 4",
      1
    );

    if (userResponse === null) return;

    const level = parseInt(userResponse, 10);

    if (!isNaN(level) && level >= 1 && level <= 4) {
      return level;
    } else {
      alert("Invalid input. Please enter a number between 1 and 4.");
    }
  } while (true);
}
