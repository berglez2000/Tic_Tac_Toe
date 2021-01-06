const playBtn = document.querySelector(".start-game");
const playerOne = document.querySelector("#player-1");
const playerTwo = document.querySelector("#player-2");
let checked = false;


const checkInputs = () => {
  if (playerOne.value === null || playerOne.value === "" || playerTwo.value === null || playerTwo.value === ""){
    return alert("Prosim vnesite ime igralca");
  } else {
    checked = true;
  }
}

const startGame = () => {
  // Scroll to game section
  const a = document.createElement("a");
  a.href = "#game";
  a.click();
  a.style.pointerEvents = "none";
  a.style.display = "none";
  
}

playBtn.addEventListener("click", (e) => {
  e.preventDefault();

  checkInputs();
  // Start game
  if (checked){
    startGame();
  }
});