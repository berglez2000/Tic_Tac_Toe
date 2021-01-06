const playBtn = document.querySelector(".start-game");
const playerOne = document.querySelector("#player-1");
const playerTwo = document.querySelector("#player-2");
let checked = false;
const images = document.querySelectorAll(".box img");
const boxes = document.querySelectorAll(".box");
let xTurn = true;
let rounds = 0;

const main = () => {
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

  const imgSrc = () => {
    images.forEach(img => {
      if (xTurn && !img.classList.contains("clicked")){
        img.src = "img/times.png";
      } else if (!xTurn && !img.classList.contains("clicked")) {
        img.src = "img/circle.png";
      }
    });
  }

  const switchTurns = () => {
    if (xTurn){
      xTurn = false;
    } else {
      xTurn = true;
    }
  }

  const game = () => {
    boxes.forEach(box => {
      box.addEventListener("click", () => {
        // img variable
        const img = box.children[0];
        // adds up new round
        rounds++;
        // switch turns
        switchTurns();
        // adds classlists
        box.classList.add("clicked");
        img.classList.add("clicked");
        // Change img source
        imgSrc();
      });
    });
  }
  
  playBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    checkInputs();
    // Start game
    if (checked){
      startGame();
      imgSrc();
      game();
    }
  });
}


window.addEventListener("load", main);